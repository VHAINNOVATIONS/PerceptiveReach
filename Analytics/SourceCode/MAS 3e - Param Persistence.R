###############################################################################
# Another aspect of the simulations is to determine if there is significant
# fluctuation between simulation runs with the parameter coefficients. One
# major aspect of examining the parameter estimates is to determine if there
# are variables that commonly switch signs between positive and negative. This
# will demonstrate that in some of the simulated models that a parameter is a 
# protective factor, and in other simulated models, it is a risk factor. Aside
# from evaluating the estimates, the significance of each parameter will also
# be analyzed to determine the percentage of the time that a parameter is shown
# to be a significant predictor.
####### INPUTS:
## OBJECTS:
# modelResults - object with the developed logistic regression
###### OUTPUTS:
## DATAFRAMES:
# paramSigResults - dataframe with P-Value for each model parameter
# paramTableResults - dataframe with coefficients for each model parameter
###############################################################################

### Save the parameter coefficients for each simulation
paramTable <- cbind(iter,as.data.frame(unlist(t(modelResults$coefficients))))

paramTableResults <- if(exists("paramTableResults")){
  rbind(paramTableResults, paramTable)
} else {
  paramTableResults <- paramTable
}

rm(paramTable)


### Save the parameter significance for each simulation
summary <- as.data.frame(summary(modelResults)$coefficients[,4])
colnames(summary) <- c("pVal")

paramSig <- cbind(iter,as.data.frame(t(summary)))
rownames(paramSig) <- NULL

paramSigResults <- if(exists("paramSigResults")){
  rbind(paramSigResults, paramSig)
} else {
  paramSigResults <- paramSig
}

rm(paramSig, summary)