###############################################################################
# The last part of the simulation identifies the percentile a Vet falls into
# for each iteration. The code will generate an exact percentile, and a grouped
# percentile based upon previously identified percentile cut-points.
# Calculating the percetiles and grouped percentiles will provide insight into
# if a Vet's risk score fluctuates heavily between simulation iterations.
# Ideally, the percentile a Vet falls into will remain the exact same across
# model runs. This would show stability within the model.
####### INPUTS:
## DATAFRAMES:
# data - dataframe with all observations
# * data must contain fields "predictedRS"
###### OUTPUTS:
## DATAFRAMES:
# percentilesGroupedResults - dataframe with grouped percentiles for each Vet
# percentilesResults - dataframe with percentiles for each Vet
###############################################################################
########## REGULAR PERCENTILES ###########

# CHECK TO MAKE SURE PERCENTILES ARE BETWEEN 0 and 1. min() and max() when
# using the real data.

keep <- c("ReachID", "predictedRS")

dataResults <- data[,keep]

dataResults <- dataResults[order(-dataResults$predictedRS),]
dataResults$percentile <- seq(1:nrow(dataResults))/nrow(dataResults)

dataResults$predictedRS <- NULL

percentilesGrouped <- dataResults


colnames(dataResults) <- c("ReachID", paste0("iter",iter))

percentiles <- dataResults[order(dataResults$ReachID),]

percentilesResults <- if(exists("percentilesResults")){
  percentilesResults <- cbind(percentilesResults, percentiles[2] )
} else {
  percentilesResults <- percentiles
}


###### GROUPED PERCENTILES #########
percentilesGrouped$percentileG <- 1
percentilesGrouped$percentileG[percentilesGrouped$percentile <= 0.5] <- 0.5
percentilesGrouped$percentileG[percentilesGrouped$percentile <= 0.2] <- 0.2
percentilesGrouped$percentileG[percentilesGrouped$percentile <= 0.1] <- 0.1
percentilesGrouped$percentileG[percentilesGrouped$percentile <= 0.05] <- 0.05
percentilesGrouped$percentileG[percentilesGrouped$percentile <= 0.01] <- 0.01
percentilesGrouped$percentileG[percentilesGrouped$percentile <= 0.005] <- 0.005
percentilesGrouped$percentileG[percentilesGrouped$percentile <= 0.001] <- 0.001
percentilesGrouped$percentileG[percentilesGrouped$percentile <= 0.0005] <- 0.0005
percentilesGrouped$percentileG[percentilesGrouped$percentile <= 0.0001] <- 0.0001

percentilesGrouped$percentile <- NULL

colnames(percentilesGrouped) <- c("ReachID", paste0("iter",iter))

percentilesGrouped <- percentilesGrouped[order(percentilesGrouped$ReachID),]


percentilesGroupedResults <- if(exists("percentilesGroupedResults")){
  percentilesGroupedResults <- cbind(percentilesGroupedResults, percentilesGrouped[2] )
} else {
  percentilesGroupedResults <- percentilesGrouped
}

rm(dataResults, keep, percentiles, percentilesGrouped)

