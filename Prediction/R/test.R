sd = dirname(sys.frame(1) $ofile)

source(file.path(sd, 'startup.R'))
source(file.path(sd, 'prPredictor.R'))
source(file.path(sd, 'predictionPlot.R'))

r = predictAttempts(runParams, 1)
r = predictAttempts(runParams, 4)
#r = predictAttempts(runParams, 5)