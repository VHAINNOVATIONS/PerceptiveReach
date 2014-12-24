###############################################################################
# Main code to run the entire model assessment simulation (MAS). The code calls
# each of the subsequent programs that perform each of the needed steps to
# complete the model assessment simulation. Any changes to the specifications
# of the simulation should be made in the individual files. All code 
# corresponding to the analysis of the simulation results should take place
# after the 'for' loop.
####### INPUTS:
## DATA SOURCE:
# Access to the databases to pull data
###### OUTPUTS:
## DATAFRAMES:
# paramSigResults - dataframe with P-Value for each model parameter
# paramTableResults - dataframe with coefficients for each model parameter
# percentilesGroupedResults - dataframe with grouped percentiles for each Vet
# percentilesResults - dataframe with percentiles for each Vet
# testSummaryResults - dataframe with HL, AUC, precision, accuracy, recall for
#                      testing data
# trainSummaryResults - dataframe with adjMcF, HL, AUC for training data
###############################################################################
load("Sprint3 Demo Data.RData")

source('MAS 1 - Packages.R')
source('MAS 2 - Pull Data.R')

for(iter in 1:1000){

  print(paste0("***** Iteration ", iter," Start *****"))
  
  source('MAS 3a - Create Train Test.R')
  print("Create Train Test - Complete")
  
  source('MAS 3b - Create Model and Predictions.R')
  print("Create Model and Predictions - Complete")
  
  source('MAS 3c - Training Data GoF.R')
  print("Training Data GoF - Complete")
  
  source('MAS 3d - Testing Data GoF.R')
  print("Testing Data GoF - Complete")
  
  source('MAS 3e - Param Persistence.R')
  print("Param Persistence - Complete")
  
  source('MAS 3f - Vet Risk Percentile.R')
  print("Vet Risk Percentile - Complete")
  
  print(paste0("***** Iteration ", iter," End *****"))
  print("")
  print("")
  
  
  rm(modelResults, test, train)
  data$predictedRS <- NULL
  data$predictedClass <- NULL
  
}

rm(cases, controls, iter)

# source('MAS 4 - Assessment Calculations.R')