###############################################################################
# Use the logistic regression created in the previous code to evaluate how well
# the model performed on testing data. The statistic used to evaluate the model
# include: Adjusted McFaddens R^2, Hosmer-Lemeshow test, and the C Statistic
# (AUC). Calculating these statistics across all the runs of the simulation
# will provide assistance in evaluating the current risk model.
####### INPUTS:
## DATAFRAMES:
# train - dataframe with randomly selected training observations
# * train must contain field "predictedRS"
## OBJECTS:
# modelResults - object with the developed logistic regression
###### OUTPUTS:
## DATAFRAMES:
# trainSummaryResults - dataframe with adjMcF, HL, AUC for training data
###############################################################################

# Adjusted McFaddens R^2
adjMcF <- as.data.frame(PseudoR2(modelResults)[2])

# Hosmer-Lemeshow test 
HL <- as.data.frame(hoslem.test(train$comp, train$predictedRS,g=10)$p.value)

# C Stat
AUC <- as.data.frame(auc(roc(train$comp ~ train$predictedRS))[1])


trainSummary <- cbind(iter, adjMcF, HL, AUC)
colnames(trainSummary) <- c("iter" ,"adjMcF", "HL", "AUC")
rownames(trainSummary) <- NULL

trainSummaryResults <- if(exists("trainSummaryResults")){
  rbind(trainSummaryResults, trainSummary)
} else {
  trainSummaryResults <- trainSummary
}


rm(adjMcF, AUC, HL, trainSummary)
