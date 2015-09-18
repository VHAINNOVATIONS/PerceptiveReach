outFileName = function(name, facilityId) {
  directory = rsd
  result = paste(directory, 'testout/', name, "_", facilityId, ".csv", sep="")
}

monthWeights = function(delay) {
  nMonths = nrow(delay)
  nDelays = ncol(delay)
  pro=rep(0, nMonths)
  pro[1]=1
  for (i in 2:nMonths) {
    maxDelay = nMonths - i + 2
    if (maxDelay > nDelays) {
      maxDelay = nDelays
    }
    numerator = sum(delay[1:(i-1), maxDelay])
    denominator = sum(delay[1:(i-1), 1:maxDelay]) + 0.001
    pro[i]=pro[i-1]*(1-numerator/denominator)
    if (pro[i] < 0.001) {
      pro[i] = 0.001
    }
  }
  weight=1/pro
  return(weight)
}

reduceVADataToRange = function(vaData, monthRange) {
  maxMonth = max(vaData['mn_num'])
  minMonth = maxMonth - monthRange
  vaDataInRange = subset(vaData, mn_num > minMonth)
  vaDataInRange$Month_No = vaDataInRange$mn_num - minMonth
  vaDataInRange$Month = vaDataInRange$Month_No + 12
  return(vaDataInRange)  
}

facilityMonthWeights = function(vaDataInRange, params) {
  monthRange = params$monthRange
  result = data.frame(weight=double())
  for (i in 1:(params$numFacilities)) {
    start = (i - 1) * monthRange + 1;
    end = i * monthRange;
    input = vaDataInRange[start:end, params$dataCols]
    weights = monthWeights(input)
    result[start:end, 'weight'] = weights
  }
  return(result)  
}

arrangeData = function(params) {
  attemptsData = read.csv(params$attemptsFileName, TRUE, check.names=FALSE, row.names = NULL)
  attemptsData = reduceVADataToRange(attemptsData[order(attemptsData$new_facility),], params$monthRange)
  
  facilitySizeData = read.csv(runParams$facilitySizeFileName, TRUE, check.names=FALSE, row.names = NULL)
  
  facilityNameData = read.csv(runParams$facilityNameFileName, TRUE, check.names=FALSE, row.names = NULL)
  facilityNameData = unique(facilityNameData[c('new_facility', 'Name')])
  facilityNameData = facilityNameData[order(facilityNameData$new_facility),]
  
  weights = facilityMonthWeights(attemptsData, params)
  
  result = data.frame(new_facility=attemptsData$new_facility, New_VISN=attemptsData$New_VISN)
  result$covariate1 = facilitySizeData$covariate1
  result$sumattempters = attemptsData$attempters
  result$Month = attemptsData$Month
  result$Month_No = attemptsData$Month_No
  result$weight = weights$weight
  result$id = 1:nrow(attemptsData)
  result$lcov1 = log(facilitySizeData$covariate1)
  result$IPWResponse = round(attemptsData$attempters * weights$weight)

  result = merge(result, runParams$visns)
  result = merge(result, runParams$facility)
  result = merge(result, facilityNameData)
  
  result$LogMonth = log(result$Month_No)
  
  resultOrder = order(result$new_facility, result$Month_No)
  result = result[resultOrder,]
  
  input = subset(result, Month_No < 15)
  input = input[c("new_facility", "New_VISN", "covariate1", "sumattempters", "Month_No", "weight", "id", "lcov1", "IPWResponse", "Real_VISN", "Real_facility", "Name", "LogMonth")]
  input = input[order(input$Month_No),]
  
  expected = subset(result, Month_No < 18 & Month_No > 14)
  expected = expected[c("new_facility", "sumattempters", "Month_No", "LogMonth")]
  
  return(list(result=result, input=input, expected=expected, size=facilitySizeData))
}

getPredictorInfo = function(predictionData) {
  r = glm.nb(IPWResponse ~ Month_No + offset(lcov1), predictionData)
  dism0 = round(1/r$theta, 4)

  rL = glm.nb(IPWResponse ~ LogMonth + offset(lcov1), predictionData)
  dislm0 = round(1/rL$theta, 4)

  n = nrow(predictionData)
  table = data.frame(sumf=rep(n, n))
  result = list()
  
  if (dism0 <= 0) {
    rL = glm(IPWResponse ~ LogMonth, data=predictionData, family = poisson(), offset=lcov1)
    r = glm(IPWResponse ~ Month_No, data=predictionData, family = poisson(), offset=lcov1)
    
    table$l1 = dpois(predictionData$IPWResponse, rL$fitted.values, TRUE)
    table$l2 = dpois(predictionData$IPWResponse, r$fitted.values, TRUE)
    
    result$distribution = 'Poisson'
  } else if (dislm0 <= 0) {
    print('OTH here I am')
  } else {
    probNB = 1.0 / (1.0 + dism0 * r$fitted.values)
    probNBL = 1.0 / (1.0 + dislm0 * rL$fitted.values)

    table$l1 = dnbinom(predictionData$IPWResponse, 1.0/dislm0, probNBL, log=TRUE)
    table$l2 = dnbinom(predictionData$IPWResponse, 1.0/dism0, probNB, log=TRUE)
    
    result$distribution = 'NB'
  }
  
  table$m = table$l1 - table$l2
  
  stdm = sd(table$m)
  summ = sum(table$m)
  ll1 = sum(table$l1)
  ll2 = sum(table$l2)
  
  z = summ/(sqrt(n)*stdm)
  
  if (z > 0) {
    result$type = 'LogMonth'
    result$glm = rL
  } else {
    result$type = 'Month_No'
    result$glm = r
  }

  return(result);
}

prPredictor = function(params, facilityId) {
  monthRange = params$monthRange
  numMonthsToFit = params$numMonthsToFit
  numMonthsToPredict = monthRange - numMonthsToFit 
  
  fitMonthsRange = 1:numMonthsToFit
  predictMonthsRange = (numMonthsToFit+1):monthRange
  
  arrangedData = arrangeData(params)
  fullData = arrangedData$result
  input = arrangedData$input
  expected = arrangedData$expected
  sizeVector = subset(arrangedData$size, new_facility == facilityId);
  
  predictionData = subset(input, new_facility == facilityId)
  expectationData = subset(expected, new_facility == facilityId)

  predictionInfo = getPredictorInfo(predictionData)
  predictionInfo$size = sizeVector$covariate1[1]
  facilitySize = sizeVector$covariate[1]
  
  if (predictionInfo$distribution == 'Poisson') {
    if (predictionInfo$type == 'LogMonth') {
      
      r = gee(IPWResponse ~ LogMonth + offset(lcov1), data=predictionData, id = Month_No, family = poisson)
      rx = predictionInfo$glm
      
      x1 = rep(1.0, monthRange)
      x2 = log(1:monthRange)
      
      x = cbind(x1, x2)
      varB = r$robust.variance
      B = cbind(r$coefficients)
      xB = x %*% B
      vareta = diag(x %*% varB %*% t(x))
      etastd = sqrt(vareta)
      
      muki = facilitySize * exp(xB)
      lowerv = facilitySize * exp(xB - 1.645 * etastd)
      upperv = facilitySize * exp(xB + 1.645 * etastd)
      
      lkib = qpois(0.05, muki)
      rkib = qpois(0.95, muki)
      
      predLki = lkib - lowerv
      predRki = rkib + upperv
      
      rr = cbind(predLki, muki, predRki, rkib, xB, etastd)
      
      pred = data.frame(Month_No=predictionData$Month_No)
      pred$pred = muki[1:numMonthsToFit]
      std = etastd[1:numMonthsToFit]
      pred$lower = exp(rx$linear.predictors - 1.645 * std)
      pred$upper = exp(rx$linear.predictors + 1.645 * std)
        
      pred = pred[order(pred$Month_No),]
      
      var = data.frame(lower=predLki, pred=muki, upper=predRki, esteta=xB, stdeta=etastd)
      var = var[predictMonthsRange,]
      var$Month_No = predictMonthsRange

      facilityPlot = rbind.fill(pred, var)
      facilityPlot$LogMonth = log(facilityPlot$Month_No)
      facilityPlot$New_facility = rep(1, monthRange)
      facilityPlot$value = rep('OUTM_POI', monthRange)
      facilityPlot$predictor = rep('LogMonth', monthRange)
      facilityPlot$dist = rep('Poisson', monthRange)
      facilityPlot$New_VISN = rep(116, monthRange)
      facilityPlot$covariate1 = rep(facilitySize, monthRange)
      facilityPlot$sumattempters = c(predictionData$sumattempters, expectationData$sumattempters)
      facilityPlot$weight = c(predictionData$weight, rep(NA, numMonthsToPredict))
      facilityPlot$id = c(fitMonthsRange, rep(NA, numMonthsToPredict))
      facilityPlot$lcov1 = c(rep(log(facilitySize), numMonthsToFit), rep(NA, numMonthsToPredict))
      facilityPlot$IPWResponse = c(predictionData$IPWResponse, rep(NA, numMonthsToPredict)) 
      facilityPlot$Real_VISN = rep(4, monthRange)
      facilityPlot$Real_facility = rep(529, monthRange)
      facilityPlot$Name = rep('BUTLER', monthRange)
      facilityPlot$Fac_Name = rep('BUTLER', monthRange)
      facilityPlot$VISN = rep(116, monthRange)
      facilityPlot$R_VISN = rep(4, monthRange)
      facilityPlot$R_Facility = rep(529, monthRange)
      facilityPlot$Scale = rep(NA, monthRange)
      facilityPlot$facsize = rep(facilitySize, monthRange)
      facilityPlot$SA_new = c(rep(NA, numMonthsToFit), expectationData$sumattempters)

      write.csv(facilityPlot, file =  outFileName("fit", facilityId), row.names = FALSE)
      
      return(facilityPlot)
    } else {
      print('XXXXXXXXXXXXX222222222222222XXXXXXXXXX')
      return(2)
    }
  } else {
    if (predictionInfo$type == 'LogMonth') {
      rx = predictionInfo$glm
      #debugEnv$rx = rx
      r = geem(IPWResponse ~ LogMonth + offset(lcov1), data=predictionData, id = Month_No, family = negative.binomial(rx$theta), sandwich = TRUE)
      #debugEnv$r = r
    
      x1 = rep(1.0, monthRange)
      x2 = log(1:monthRange)
    
      x = cbind(x1, x2)
      varB = r$var
      B = cbind(r$beta)
      xB = x %*% B
      vareta = diag(x %*% varB %*% t(x))
      etastd = sqrt(vareta)
    
      muki = facilitySize * exp(xB)
      lowerv = facilitySize * exp(xB - 1.645 * etastd)
      upperv = facilitySize * exp(xB + 1.645 * etastd)
    
      lkib = qpois(0.05, muki)
      rkib = qpois(0.95, muki)
    
      predLki = lkib - lowerv
      predRki = rkib + upperv
    
      rr = cbind(predLki, muki, predRki, rkib, xB, etastd)
    
      pred = data.frame(Month_No=predictionData$Month_No)
      pred$pred = muki[1:numMonthsToFit]
      std = etastd[1:numMonthsToFit]
      pred$lower = exp(rx$linear.predictors - 1.645 * std)
      pred$upper = exp(rx$linear.predictors + 1.645 * std)
    
      pred = pred[order(pred$Month_No),]
    
      var = data.frame(lower=predLki, pred=muki, upper=predRki, esteta=xB, stdeta=etastd)
      var = var[predictMonthsRange,]
      var$Month_No = predictMonthsRange
    
      facilityPlot = rbind.fill(pred, var)
      facilityPlot$LogMonth = log(facilityPlot$Month_No)
      facilityPlot$New_facility = rep(1, monthRange)
      facilityPlot$value = rep('OUTM_POI', monthRange)
      facilityPlot$predictor = rep('LogMonth', monthRange)
      facilityPlot$dist = rep('NB', monthRange)
      facilityPlot$New_VISN = rep(116, monthRange)
      facilityPlot$covariate1 = rep(facilitySize, monthRange)
      facilityPlot$sumattempters = c(predictionData$sumattempters, expectationData$sumattempters)
      facilityPlot$weight = c(predictionData$weight, rep(NA, numMonthsToPredict))
      facilityPlot$id = c(fitMonthsRange, rep(NA, numMonthsToPredict))
      facilityPlot$lcov1 = c(rep(log(facilitySize), numMonthsToFit), rep(NA, numMonthsToPredict))
      facilityPlot$IPWResponse = c(predictionData$IPWResponse, rep(NA, numMonthsToPredict)) 
      facilityPlot$Real_VISN = rep(4, monthRange)
      facilityPlot$Real_facility = rep(529, monthRange)
      facilityPlot$Name = rep('BUTLER', monthRange)
      facilityPlot$Fac_Name = rep('BUTLER', monthRange)
      facilityPlot$VISN = rep(116, monthRange)
      facilityPlot$R_VISN = rep(4, monthRange)
      facilityPlot$R_Facility = rep(529, monthRange)
      facilityPlot$Scale = rep(1.0/rx$theta, monthRange)
      facilityPlot$facsize = rep(facilitySize, monthRange)
      facilityPlot$SA_new = c(rep(NA, numMonthsToFit), expectationData$sumattempters)
    
      write.csv(facilityPlot, file = outFileName("fit", facilityId), row.names = FALSE)
    
      return(facilityPlot)    
    } else {
      rx = predictionInfo$glm
      #debugEnv$rx = rx
      #print(predictionData$IPWResponse)
      #print(predictionData$Month_No)
      #print(predictionData$lcov1)
      #r = geem(IPWResponse ~ Month_No + offset(lcov1), data=predictionData, id = Month_No, family = poisson, sandwich = TRUE)
      r = geeglm(IPWResponse ~ Month_No, offset(lcov1), data=predictionData, id = Month_No, family = negative.binomial(rx$theta))
      
      #debugEnv$r = r

      x1 = rep(1.0, monthRange-3)
      x2 = 1:(monthRange-3)
      
      x = cbind(x1, x2)

      varB = vcov(rx)   #r$var
      
      print(varB)
      print(r$beta)
      
      B = cbind(rx$coefficients)
      xB = x %*% B

      vareta = diag(x %*% varB %*% t(x))
      etastd = sqrt(vareta)
      
      print(etastd)
      print("-----")
      print(xB)
      
      muki = facilitySize * exp(xB)
      lowerv = facilitySize * exp(xB - 1.645 * etastd)
      upperv = facilitySize * exp(xB + 1.645 * etastd)
      
      lkib = qpois(0.05, muki)
      rkib = qpois(0.95, muki)
      
      predLki = lkib - lowerv
      predRki = rkib + upperv
      
      rr = cbind(predLki, muki, predRki, rkib, xB, etastd)
      
      pred = data.frame(Month_No=predictionData$Month_No)
      pred$pred = muki[1:numMonthsToFit]
      std = etastd[1:numMonthsToFit]
      pred$lower = exp(rx$linear.predictors - 1.645 * std)
      pred$upper = exp(rx$linear.predictors + 1.645 * std)
      
      pred = pred[order(pred$Month_No),]
      
      var = data.frame(lower=predLki, pred=muki, upper=predRki, esteta=xB, stdeta=etastd)
      var = var[predictMonthsRange,]
      var$Month_No = predictMonthsRange
      
      facilityPlot = rbind.fill(pred, var)
      facilityPlot$LogMonth = log(facilityPlot$Month_No)
      facilityPlot$New_facility = rep(1, monthRange)
      facilityPlot$value = rep('OUTM_POI', monthRange)
      facilityPlot$predictor = rep('Month_No', monthRange)
      facilityPlot$dist = rep('NB', monthRange)
      facilityPlot$New_VISN = rep(116, monthRange)
      facilityPlot$covariate1 = rep(facilitySize, monthRange)
      facilityPlot$sumattempters = c(predictionData$sumattempters, expectationData$sumattempters)
      facilityPlot$weight = c(predictionData$weight, rep(NA, numMonthsToPredict))
      facilityPlot$id = c(fitMonthsRange, rep(NA, numMonthsToPredict))
      facilityPlot$lcov1 = c(rep(log(facilitySize), numMonthsToFit), rep(NA, numMonthsToPredict))
      facilityPlot$IPWResponse = c(predictionData$IPWResponse, rep(NA, numMonthsToPredict)) 
      facilityPlot$Real_VISN = rep(4, monthRange)
      facilityPlot$Real_facility = rep(529, monthRange)
      facilityPlot$Name = rep('BUTLER', monthRange)
      facilityPlot$Fac_Name = rep('BUTLER', monthRange)
      facilityPlot$VISN = rep(116, monthRange)
      facilityPlot$R_VISN = rep(4, monthRange)
      facilityPlot$R_Facility = rep(529, monthRange)
      facilityPlot$Scale = rep(1.0/rx$theta, monthRange)
      facilityPlot$facsize = rep(facilitySize, monthRange)
      facilityPlot$SA_new = c(rep(NA, numMonthsToFit), expectationData$sumattempters)
      
      write.csv(facilityPlot, file = outFileName("fit", facilityId), row.names = FALSE)
      
      #debugEnv$facilityPlot = facilityPlot

      return(rx)
    }
  }
}

predictAttempts = function(params, facilityId) {
  monthRange = params$monthRange
  numMonthsToFit = params$numMonthsToFit

  r = prPredictor(params, facilityId)
  q = predictInR(r[(numMonthsToFit+1):monthRange,])
  
  write.csv(q, file = outFileName("prediction", facilityId), row.names=FALSE)

  result = data.frame(LogMonth=r$LogMonth, Pred=r$pred)
  result$Lower = c(r$lower[1:numMonthsToFit], q$L) 
  result$Upper = c(r$upper[1:numMonthsToFit], q$R)
  result$IPWResponse = r$IPWResponse
  result$SA_new = r$SA_new
  
  result[result$Pred < 0] = 0
  result[result$Lower < 0]  = 0
  result[result$Upper < 0] = 0
  
  write.csv(result, file = outFileName("plot", facilityId), row.names=FALSE)
  
  return(result);
}
