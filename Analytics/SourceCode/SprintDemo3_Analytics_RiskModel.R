
require("RODBC")

## Connect to the database
channel <- odbcConnect("db", uid="user", "pw")
data <- sqlQuery(channel, "select * from VeteranRiskAnalytics")
ind <- runif(20000, min=0, max=1)
data$ind <- ind
data$comp <- 0  
data$comp[data$ind <= 0.05] <- 1
data$ind <- NULL

keep <- c("UrbanArea",
          "Age",
          "Gender",
          "Race",
          "HistSubstanceAbuse",
          "PreviousPsychiatricHospitalization",
          "PreviousSuicideAttempts",
          "DiagnosedTBI",
          "comp") 

modelingData <- data[keep]

model <- glm(formula = comp ~ .,
             data = modelingData,
             family = "binomial")

data$Score <- 1000*(model$fitted.values)
data$comp <- NULL

keep2 <- c('ReachID','Score')
data2 <- data[keep2]

rm(data)

sqlUpdate(channel, data2, tablename="VeteranRiskAnalytics") 