###############################################################################
# This code will determine how well the logistic regression developed during
# each iteration of the simulation will work on out of sample testing data. To 
# properly evaluate the logistic regression, the following statistics are
# captured: Hosmer Lemeshow test, C Statistic (AUC), percision, recall, and
# accuracy. Aggregating these statistics across all the simulations will help
# in the evaluation of the current risk model.
####### INPUTS:
## DATAFRAMES:
# test - dataframe with randomly selected testing observations
# * test must contain fields "predictedRS", "predictedClass"
###### OUTPUTS:
## DATAFRAMES:
# testSummaryResults - dataframe with HL, AUC, precision, accuracy, recall for
#                      testing data
###############################################################################

# Hosmer-Lemeshow test 
HL <- as.data.frame(hoslem.test(test$comp, test$predictedRS,g=10)$p.value)

# AUC Statistic
AUC <- as.data.frame(auc(roc(test$comp ~ test$predictedRS))[1])



test$conf[(test$predictedClass == 1) & (test$comp == 1)] <- "TP"
test$conf[(test$predictedClass == 0) & (test$comp == 0)] <- "TN"
test$conf[(test$predictedClass == 1) & (test$comp == 0)] <- "FP"
test$conf[(test$predictedClass == 0) & (test$comp == 1)] <- "FN"

TP <- nrow(subset(test, conf == "TP"))
TN <- nrow(subset(test, conf == "TN"))
FP <- nrow(subset(test, conf == "FP"))
FN <- nrow(subset(test, conf == "FN"))

test$conf <- NULL

precision <- TP/(TP + FP)
recall <- TP/(TP + FN)
accuracy <- (TP + TN)/(TP + TN + FP + FN)

testSummary <- cbind(iter, HL, AUC, precision, recall, accuracy)
colnames(testSummary) <- c("iter", "HL", "AUC", "precision", "recall", 
                           "accuracy")


testSummaryResults <- if(exists("testSummaryResults")){
  rbind(testSummaryResults, testSummary)
} else {
  testSummaryResults <- testSummary
}

rm(accuracy, AUC, FN, FP, HL, recall, TN, TP, precision, testSummary)
