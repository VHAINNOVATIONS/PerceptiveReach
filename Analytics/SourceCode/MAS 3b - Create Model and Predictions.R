###############################################################################
# Create a logistic regression model on the training data. Use this same model
# to create predicted scores for training data, testing data, and population
# data. The scores that will be created for all 3 datasets will have a numeric
# risk probability, and a binary categorical response for what the model
# predicts will be the outcome for each Veteran. The R object that
# differentiates 0's from 1's is called 'cutoff'. This object will be updated
# to reflect the current risk model when the real data is made available.
####### INPUTS:
## DATAFRAMES:
# data - dataframe with all observations
# test - dataframe with randomly selected testing observtions
# train - dataframe with randomly selected training observations
###### OUTPUTS:
## DATAFRAME VARIABLES:
# data$predictedClass - predicted class response based on the model and cutoff
# data$predictedRS - predicted numerical risk from the model
# test$predictedClass - predicted class response based on the model and cutoff
# test$predictedRS - predicted numerical risk from the model
# train$predictedClass - predicted class response based on the model and cutoff
# train$predictedRS - predicted numerical risk from the model
## OBJECTS:
# modelResults - object with the developed logistic regression
###############################################################################

keep <- c("UrbanArea",
          "Age",
          "Gender",
          "Race",
          "HistSubstanceAbuse",
          "PreviousPsychiatricHospitalization",
          "PreviousSuicideAttempts",
          "DiagnosedTBI",
          "comp")
modelData <- train[,keep]
modelResults <- glm(formula = comp ~ ., data = modelData, family = "binomial")
# stepwise(modelResults, trace = FALSE)
# stepwise(modelResults, direction="forward/backward")
# http://www.inside-r.org/packages/cran/Rcmdr/docs/stepwise

#### MAKE THIS A CHANGABLE PARAMETER
cutoff <- 0.1

train$predictedRS <- predict(modelResults, newdata = train, type = "response")

test$predictedRS <- predict(modelResults, newdata = test, type = "response")
test$predictedClass <- 0
test$predictedClass[test$predictedRS > cutoff] <- 1

data$predictedRS <- predict(modelResults, newdata = data, type = "response")

rm(cutoff, keep, modelData)
