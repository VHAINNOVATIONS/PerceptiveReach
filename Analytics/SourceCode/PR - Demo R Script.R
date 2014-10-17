#install.packages("RODBC")
#install.packages("randomForest")
require("RODBC")
require("randomForest")


## Connect to the database
channel <- odbcConnect("PR", uid="sa", "agile_123")

## Pull data from the database
veterans <- sqlQuery(channel, "select * from Veterans")

## Model on this subset of variables
keep <- c("Sex",
          "PTSD",
          "Divorced",
          "NoAttempts",
          "Branch",
          "Suceeded")
veterans2 <- veterans[keep]

## Train a random forest model to predict risk
modelResults <- randomForest(Suceeded ~ ., data = veterans2)
veterans$num <- unlist(modelResults[3])

## Convert a risk number to risk category
veterans$Score[veterans$num > .9] <- "HIGH"
veterans$Score[(veterans$num >= .85) & (veterans$num <= .9)] <- "MEDIUM"
veterans$Score[veterans$num < .85] <- "LOW"

## Show to distribution
table(veterans$Score)

veterans$num <- NULL

## Remove the output in the database from previous runs
sqlQuery(channel, "DROP TABLE AnalyticsOutput")

## Upload the data with the risk score categories
sqlSave(channel, veterans, tablename = "AnalyticsOutput")
sqlQuery(channel, "ALTER TABLE AnalyticsOutput DROP COLUMN rownames")

testPull <- sqlQuery(channel, "select * from AnalyticsOutput")
