weightInputToVADelay = function(weightInputFile, vaDelayFile, modifiedVADelayFile) {
  weightInput = read.table(weightInputFile, header=FALSE, fill=TRUE)
  vaDelayData = read.csv(vaDelayFile, TRUE, check.names=FALSE)
  class(vaDelayData[,1]) = 'character'  # to match original files
  
  numVaMonths = nrow(vaDelayData) / 139
  numWeightInputMonths = nrow(weightInput) / 139
  numDelaySize = ncol(weightInput)
  
  for (i in 1:139) {
    toLastRow = i * numVaMonths
    toFirstRow = toLastRow - numWeightInputMonths + 1 
    fromLastRow = i * numWeightInputMonths
    fromFirstRow = fromLastRow - numWeightInputMonths + 1 
    vaDelayData[toFirstRow:toLastRow, 3:(numDelaySize + 3 - 1)] =weightInput[fromFirstRow:fromLastRow, 1:numDelaySize]
  }

  write.csv(vaDelayData, modifiedVADelayFile, row.names=FALSE)
  return(vaDelayData)
}
