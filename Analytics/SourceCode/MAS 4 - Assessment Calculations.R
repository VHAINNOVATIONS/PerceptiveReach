### Training Analysis
## Training adjMcF
plot1 <- ggplot(trainSummaryResults, aes(x=adjMcF)) + geom_histogram(binwidth=.00025, alpha=.5,)
plot1 + ggtitle("Distribution of Adjusted McFadden's R-sq on Training Data") +
  xlab("Adjusted McFadden's R-sq") + ylab("Frequency")


## Training HL
plot2 <- ggplot(trainSummaryResults, aes(x=HL)) + geom_histogram(binwidth=.05, alpha=.5,)
plot2 + ggtitle("Distribution of Hosmer Lemeshow Statistic on Training Data") +
  xlab("Hosmer Lemeshow Statistic") + ylab("Frequency")


## Training C Statistic
plot3 <- ggplot(trainSummaryResults, aes(x=AUC)) + geom_histogram(binwidth=.005, alpha=.5,)
plot3 + ggtitle("Distribution of C Statistic on Training Data") +
  xlab("C Statistic") + ylab("Frequency")



### Testing Analysis
## Testing HL
plot4 <- ggplot(testSummaryResults, aes(x=HL)) + geom_histogram(binwidth=.05, alpha=.5,)
plot4 + ggtitle("Distribution of Hosmer Lemeshow Statistic on Testing Data") +
  xlab("Hosmer Lemeshow Statistic") + ylab("Frequency")


## Testing C Statistic
plot5 <- ggplot(testSummaryResults, aes(x=AUC)) + geom_histogram(binwidth=.005, alpha=.5,)
plot5 + ggtitle("Distribution of C Statistic on Testing Data") +
  xlab("C Statistic") + ylab("Frequency")


## Testing Precision
plot6 <- ggplot(testSummaryResults, aes(x=precision)) + geom_histogram(binwidth=.005, alpha=.5,)
plot6 + ggtitle("Distribution of Precision on Testing Data") +
  xlab("Precision") + ylab("Frequency")


## Testing Recall
plot7 <- ggplot(testSummaryResults, aes(x=recall)) + geom_histogram(binwidth=.01, alpha=.5,)
plot7 + ggtitle("Distribution of Recall on Testing Data") +
  xlab("Recall") + ylab("Frequency")


## Testing Accuracy
plot8 <- ggplot(testSummaryResults, aes(x=accuracy)) + geom_histogram(binwidth=.01, alpha=.5,)
plot8 + ggtitle("Distribution of Accuracy on Testing Data") +
  xlab("Accuracy") + ylab("Frequency")



### Parameter Analysis
## Parameter Coefficients Distribution
paramTableResultsPlotFunc <- function(x, na.rm = TRUE, ...) {
  nm <- names(x)
  for (i in seq_along(nm)) {
    plots <- ggplot(x,aes_string(x = nm[i])) + geom_histogram(alpha = .5) +
      ggtitle(paste0("Distribution of Coefficients for: ", nm[i])) + 
      xlab(paste0(nm[i]," Coefficient")) + ylab("Frequency")
    print(plots)
  }
}

paramTableResultsPlotData <- paramTableResults[3:ncol(paramTableResults)]
paramTableResultsPlotFunc(paramTableResultsPlotData)

## Parameter P-Value Distribution
paramSigResultsPlotFunc <- function(x, na.rm = TRUE, ...) {
  nm <- names(x)
  for (i in seq_along(nm)) {
    plots <- ggplot(x,aes_string(x = nm[i])) + geom_histogram(alpha = .5) +
      ggtitle(paste0("Distribution of P-Value for: ", nm[i])) + 
      xlab(paste0(nm[i]," P-Value")) + ylab("Frequency")
    print(plots)
  }
}

paramSigResultsPlotData <- paramSigResults[3:ncol(paramSigResults)]
paramSigResultsPlotFunc(paramSigResultsPlotData)







