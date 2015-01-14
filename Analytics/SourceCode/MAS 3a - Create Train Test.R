###############################################################################
# Sample the data into training and testing datasets. The exact numbers of data
# points that will be put into training and testing are not yet included in
# this program because mock data is currently being used. Once the real data is
# available, the observation counts that are sampled to create the training and
# testing sets will be updated to reflect the same counts that were used to
# develop the current risk model.
###### INPUTS: 
## DATAFRAMES:
# cases - dataframe with all case observations
# controls - dataframe with all control observations
# data - dataframe with all observations
###### OUTPUTS:
## DATAFRAMES:
# test - dataframe with randomly selected testing observtions
# train - dataframe with randomly selected training observations
###############################################################################

##### Randomly Sample Cases and Controls
# The number of randomly sampled observations will be changed when real data is
# able to be used. The number rows sampled will be based upon the number of
# observations sampled for the currently developed risk model

selectIdControl <- sample(nrow(controls), 10 * (nrow(cases)/2))
trainControlSamp <- controls[selectIdControl, ]
remainingControl = controls[-selectIdControl, ]
testControlSamp <- remainingControl[sample(nrow(remainingControl), 10 * (nrow(cases)/2)), ]

selectIdCase <- sample(nrow(cases), nrow(cases)/2)
trainCaseSamp <- cases[selectIdCase, ]
testCaseSamp <- cases[-selectIdCase, ]

train <- rbind(trainCaseSamp, trainControlSamp)
test <- rbind(testCaseSamp, testControlSamp)

rm(remainingControl, selectIdCase, selectIdControl, 
   testCaseSamp, testControlSamp, trainCaseSamp, 
   trainControlSamp)
