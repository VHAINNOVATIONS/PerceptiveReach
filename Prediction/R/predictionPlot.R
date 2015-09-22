library('ggplot2')

predictionPlot = function(r) {
  ggplot(r, aes(LogMonth)) + geom_line(aes(y=Pred)) + geom_line(aes(y=Lower)) + geom_line(aes(y=Upper)) + geom_point(aes(y=IPWResponse)) + geom_point(aes(y=SA_new), colour="red")
}
