###############################################################################
# Pull in all the raw data that will be used in the simulation. This code will
# need to be heavily edited to ensure the correct data connections are made. As
# of 12/18/2014, there are no confirmed databases the data will be pulled from.
# When these databases are deployed, a connection will be made to connect R to
# the correct databases using this program.
###### INPUTS:
## DATA SOURCES:
# Access to the databases to pull data
###### OUTPUTS:
## DATAFRAMES:
# cases - dataframe with all case observations
# controls - dataframe with all control observations
# data - dataframe with all observations
###############################################################################

## Connect to the database
# channel <- odbcConnect("PR", uid="sa", "agile_123")
## Pull Data
# data <- sqlQuery(channel, "select * from VeteranRisk")

## Create suicide indicator for some observations since there is no suicide
## indicator in the current data. Once there is access to the actual data, this
## step will no longer be needed.
ind <- runif(20000, min=0, max=1)
data$ind <- ind
data$ind[data$DiagnosedTBI == "1"] <- data$ind[data$DiagnosedTBI == "1"]*1.1
data$ind[data$PreviousSuicideAttempts == "1"] <- data$ind[data$PreviousSuicideAttempts == "1"]*1.1
data$ind[data$PreviousPsychiatricHospitalization == "1"] <- data$ind[data$PreviousPsychiatricHospitalization == "1"]*1.1
data$ind[data$Gender == "M"] <- data$ind[data$Gender == "M"]*1.1
data$ind[data$HistSubstanceAbuse == "1"] <- data$ind[data$HistSubstanceAbuse == "1"]*1.1

data$comp <- 1  
data$comp[data$ind <= quantile(data$ind, c(.95))] <- 0
data$ind <- NULL

## Create case control datasets based on the suicide indicator just generated
controls <- subset(data, comp == 0)
cases <- subset(data, comp == 1)

rm(ind)


