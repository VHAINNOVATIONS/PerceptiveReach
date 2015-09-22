runBlackbox = function(args) {
  directory <- args[1]
  source(file.path(directory, 'prPredictor.R'))
  blackbox(directory)
} 

runBlackbox(commandArgs(TRUE))

