sd = '/Work/git/PerceptiveReach/Prediction/R/'

source(paste(sd, 'startup.R', sep=''))
source(paste(sd, 'PIandPValue_Rcode_v1.R', sep=''))
source(paste(sd, 'prPredictor.R', sep=''))
source(paste(sd, 'predictionPlot.R', sep=''))

r = predictAttempts(runParams, 1)
r = predictAttempts(runParams, 4)
