sd = dirname(sys.frame(1) $ofile)

source(file.path(sd, 'prPredictor.R'))

r = predictAttempts(1)
r = predictAttempts(4)
#r = predictAttempts(runParams, 5)