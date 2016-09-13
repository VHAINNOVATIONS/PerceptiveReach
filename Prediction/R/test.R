runRegression = function(args) {
  directory <- args[1]
  source(file.path(directory, 'prPredictor.R'))
  regressionTest(directory)
} 

runRegression(commandArgs(TRUE))

