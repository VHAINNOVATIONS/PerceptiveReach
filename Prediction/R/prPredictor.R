library('base')
library('plyr')
library('methods')
library('MASS')
library('sandwich')

predictInR = function(rdata3) {
  
  ##-------------------------------------------------------------------------------------------------------------------
  ## Calculates the pdf of negative binomial distribution
  nb<-function(x){
    (gamma(y+(1/tau)))/((factorial(y))*(gamma(1/tau)))*
      ((1/(1+(tau*(m*exp(x)))))^(1/tau))*
      (((tau*(m*exp(x)))/(1+(tau*(m*exp(x)))))^y)*
      ((1/(((sqrt(2*pi))*sigma))*(exp(-(((x-esteta)^2)/(2*var))))))
  }
  ##-------------------------------------------------------------------------------------------------------------------
  
  
  ## Calculate the pdf of poisson distribution
  poi<-function(x){
    ((exp(-(m*exp(x))))*((m*(exp(x)))^y))*
      (1/factorial(y))*(1/((sqrt(2*pi))*sigma))*(exp((-((x-esteta)^2))/(2*var)))
  }
  
  ##-------------------------------------------------------------------------------------------------------------------
  
  alpha<-0.1
  beta<-(1-(alpha/2))
  Index<-1
  IMth<-15
  ##-------------------------------------------------------------------------------------------------------------------
  
  for (Index in 1:3){
    if (rdata3[Index,1]==IMth)  
    {
      flag<-0
      signal<-0
      distribution<-rdata3$dist[Index]
      month<-rdata3[Index,1]
      tau<-rdata3$Scale[Index]
      m<-rdata3$covariate1[Index]
      predmean<-rdata3$pred[Index]
      
      sigma<-rdata3$stdeta[Index]
      var<-(sigma*sigma)
      esteta<-rdata3$esteta[Index]
      ll<-esteta-(3*sigma)
      ul<-esteta+(3*sigma)
      cdf<-0
      pdf<-0
      cdf2<-cdf
      i<-rdata3$sumattempters[Index]
      
      lcl<-0
      ucl<-0
      j<-0
      k<-j+1
      n<-0
      pdflcl<-0
      uclprev<-0
      cdfuclprev<-0
      cdfucl<-0
      L<-0
      df<-data.frame(month=numeric(0),y=numeric(0),pdf=numeric(0),cdf=numeric(0),pvalue=numeric(0),lcl=numeric(0),ucl=numeric(0),L=numeric(0),R=numeric(0))
      
      for(y in 0:i){
        
        a<-y
        if (distribution == "Poisson"){
          pdfstr<-integrate(poi,lower=ll,upper=ul)
        }
        if (distribution == "NB"){
          pdfstr<-integrate(nb,lower=ll,upper=ul)
        }
        pdf<-as.numeric(pdfstr[1])
        cdf<-cdf+pdf
        
        if (i >= predmean)
          pvalue<-1-cdf
        else
          pvalue<-cdf
        
        if (y==0 && cdf>beta)
        {
          L<-0
          R<-0
          flag<-7
          signal<-1
        }
        
        ##-----------------------------------------------------------------------------------------------------------------------
        
        ##Set L as 0, if the cdf at y=0 is GT (alpha/2)
        if (flag==0 && y==0 && i>0)
        {
          cdf6<-cdf
          if (cdf6>alpha/2)
          {
            L<-0
            flag<-6
          }
        }
        
        ##Calculate lcl for y=0 when i=0
        if (flag==0 && y==0 && i==0)
        {
          w<-i
          cdf5<-cdf
          while (cdf5<=(alpha/2))
          {
            w<-w+1
            y<-w
            if (distribution == "Poisson"){
              
              pdfstr5<-integrate(poi,lower=ll,upper=ul)
            }
            if (distribution == "NB"){
              
              pdfstr5<-integrate(nb,lower=ll,upper=ul)
            }
            pdf5<-as.numeric(pdfstr5[1])
            cdf5<-cdf5+pdf5
            
          }
          lclprev5<-y-1
          if (lclprev5<0)
          {
            lclprev5<-0
            L<-0
            flag<-5
          }
          else
          {
            cdflclnext5<-cdf5
            cdflclprev5<-0
            y<-0
            for (y in 0:lclprev5)
            {
              if (distribution == "Poisson"){
                pdfstrlclprev5<-integrate(poi,lower=ll,upper=ul)
              }
              if (distribution == "NB"){
                pdfstrlclprev5<-integrate(nb,lower=ll,upper=ul)
              }
              pdflclprev5<-as.numeric(pdfstrlclprev5[1])
              cdflclprev5<-cdflclprev5+pdflclprev5
            }
            
            L<-(lclprev5) + (((alpha/2)-cdflclprev5)/(cdflclnext5-cdflclprev5))
            flag<-5
            y<-i
          }
        }
        
        ## Calculate lcl for y>=1
        if (flag==0 && y>=1 && y<i)
        {
          if (cdf>(alpha/2)){
            ##cdfcheck<-cdf
            lcl<-y-1
            n<-y
            if (lcl<0){
              lcl<-0
            }
            
            ##Code continues for corrected lower prediction interval
            cdfnext<-cdf
            cdflcl<-0
            y<-0
            for (y in 0:lcl)
            {
              if (distribution == "Poisson"){
                pdfstrlcl<-integrate(poi,lower=ll,upper=ul)
              }
              if (distribution == "NB"){
                pdfstrlcl<-integrate(nb,lower=ll,upper=ul)
              }
              pdflcl<-as.numeric(pdfstrlcl[1])
              cdflcl<-cdflcl+pdflcl
            }
            L<-(lcl) + (((alpha/2)-cdflcl)/(cdfnext-cdflcl))
            
            if (L < 0) 
            {
              L<-0
            }
            y<-n
            flag<-2
          }
        }
        
        ##----------------------------------------------------------------------------------------------------------------
        
        if (flag==0 && y==i && i > 0)
        {
          z<-i
          cdf4<-cdf
          while (cdf4<=(alpha/2))
          {
            z<-z+1
            y<-z
            if (distribution == "Poisson"){
              
              pdfstr4<-integrate(poi,lower=ll,upper=ul)
            }
            if (distribution == "NB"){
              
              pdfstr4<-integrate(nb,lower=ll,upper=ul)
            }
            pdf4<-as.numeric(pdfstr4[1])
            cdf4<-cdf4+pdf4
            
          }
          lclprev2<-y-1
          cdflclnext2<-cdf4
          cdflclprev2<-0
          y<-0
          for (y in 0:lclprev2)
          {
            if (distribution == "Poisson"){
              pdfstrlclprev2<-integrate(poi,lower=ll,upper=ul)
            }
            if (distribution == "NB"){
              pdfstrlclprev2<-integrate(nb,lower=ll,upper=ul)
            }
            pdflclprev2<-as.numeric(pdfstrlclprev2[1])
            cdflclprev2<-cdflclprev2+pdflclprev2
          }
          
          L<-(lclprev2) + (((alpha/2)-cdflclprev2)/(cdflclnext2-cdflclprev2))
          flag<-3
          y<-i
        }
        
        ##---------------------------------------------------------------------------------------------------------------
        
        
        
        ##--------------------------------------------------------------------------------------------------------------
        ## Calculate ucl and upper corrected prediction interval limit - First scenario
        if (signal==0 && y>=0 && y < i)
        {
          if (cdf>beta){
            b<-y
            ucl<-y
            signal<-1
            check<-1
            uclprev<-(ucl-1)
            cdfucl<-cdf
            ##q<-y
            cdfuclprev<-0
          }   
          
          y<-0
          for (y in 0:uclprev){
            if (distribution == "Poisson"){
              
              pdfstruclprev<-integrate(poi,lower=ll,upper=ul)
            }
            if (distribution == "NB"){
              
              pdfstruclprev<-integrate(nb,lower=ll,upper=ul)
            }
            pdfuclprev<-as.numeric(pdfstruclprev[1])
            cdfuclprev<-cdfuclprev+pdfuclprev
          }
          R<-(ucl-1) + ((1-(alpha/2))-cdfuclprev)/(cdfucl-cdfuclprev)
          
        }
        ## ucl and Upper prediction interval limit calculation - second scenario 
        if(y==i && signal==0){
          j<-i
          ##y<-j+1
          cdf2<-cdf
          cdf3<-cdf
          while (cdf2<=beta){
            j<-j+1
            y<-j
            if (distribution == "Poisson"){
              
              pdfstr2<-integrate(poi,lower=ll,upper=ul)
            }
            if (distribution == "NB"){
              
              pdfstr2<-integrate(nb,lower=ll,upper=ul)
            }
            pdf2<-as.numeric(pdfstr2[1])
            cdf2<-cdf2+pdf2
            ##j<-j+1
            ##y<-j
          }
          ucl<-y
          signal<-1
          
          check<-0
          uclprev2<-(ucl-1)
          cdfucl2<-cdf2
          cdfuclprev2<-0
          r<-y
          y<-0
          for (y in 0:uclprev2){
            if (distribution == "Poisson"){
              pdfstruclprev2<-integrate(poi,lower=ll,upper=ul)
            }
            if (distribution == "NB"){
              pdfstruclprev2<-integrate(nb,lower=ll,upper=ul)
            }
            pdfuclprev2<-as.numeric(pdfstruclprev2[1])
            cdfuclprev2<-cdfuclprev2+pdfuclprev2
          }
          R<-(ucl-1) + ((1-(alpha/2))-cdfuclprev2)/(cdfucl2-cdfuclprev2)
          
          
        }
        ##y<-a
      }  
      
      df<-rbind(df,c(month,i,pdf,cdf,pvalue,lcl,ucl,L,R))
      ##print(df)
      if ( month==IMth){
        if (Index==1)
          rdata4<-df
        else
          rdata4<-rbind(rdata4,c(month,i,pdf,cdf,pvalue,lcl,ucl,L,R))
      }
      ##y<-y+1
      
      
    } 
    
    IMth<-IMth+1
  }
  
  colnames(rdata4)<-c("Month_No","y","pdf","cdf","pvalue","lcl","ucl","L","R")
  rdata4<-rdata4[,1:9]
  return(rdata4)
}

outFileName = function(directory, name, facilityId) {
  fullName = paste(name, "_", facilityId, ".csv", sep="")
  result = file.path(directory, 'testout', fullName)
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

arrangeData = function(cwd, params) {
  fileAttempts = file.path(cwd, '/input.csv')
  attemptsData = read.csv(fileAttempts, TRUE, check.names=FALSE, row.names = NULL)
  attemptsData = reduceVADataToRange(attemptsData[order(attemptsData$VAMC),], params$monthRange)
  
  facilities = unique(attemptsData$VAMC)
  params$numFacilities = length(facilities) 

  weights = facilityMonthWeights(attemptsData, params)
  
  result = data.frame(VAMC=attemptsData$VAMC, VISN=attemptsData$VISN)

  result$covariate1 = attemptsData$covariate1
  result$sumattempters = attemptsData$attempters
  result$Month = attemptsData$Month
  result$Month_No = attemptsData$Month_No
  result$weight = weights$weight
  result$id = 1:nrow(attemptsData)
  result$lcov1 = log(attemptsData$covariate1)
  result$IPWResponse = round(attemptsData$attempters * weights$weight)

  result$LogMonth = log(result$Month_No)
  
  resultOrder = order(result$VAMC, result$Month_No)
  result = result[resultOrder,]

  input = subset(result, Month_No < 15)
  input = input[c("VAMC", "VISN", "covariate1", "sumattempters", "Month_No", "weight", "id", "lcov1", "IPWResponse", "LogMonth")]
  input = input[order(input$Month_No),]
  
  expected = subset(result, Month_No < 18 & Month_No > 14)
  expected = expected[c("VAMC", "sumattempters", "Month_No", "LogMonth")]
  
  return(list(result=result, input=input, expected=expected))
}

getPredictorInfo = function(predictionData) {
  r = glm.nb(IPWResponse ~ Month_No + offset(lcov1), predictionData)
  dism0 = round(1/r$theta, 4)

  rL = glm.nb(IPWResponse ~ LogMonth + offset(lcov1), predictionData)
  dislm0 = round(1/rL$theta, 4)

  n = nrow(predictionData)
  table = data.frame(sumf=rep(n, n))
  result = list()
  
  if ((dism0 <= 0) || (dislm0 <= 0)) {
    rL = glm(IPWResponse ~ LogMonth, data=predictionData, family = poisson(), offset=lcov1)
    r = glm(IPWResponse ~ Month_No, data=predictionData, family = poisson(), offset=lcov1)
    
    table$l1 = dpois(predictionData$IPWResponse, rL$fitted.values, TRUE)
    table$l2 = dpois(predictionData$IPWResponse, r$fitted.values, TRUE)
    
    result$distribution = 'Poisson'
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

prPredictor = function(arrangedData, params, facilityId) {
  monthRange = params$monthRange
  numMonthsToFit = params$numMonthsToFit
  numMonthsToPredict = monthRange - numMonthsToFit 
  
  fitMonthsRange = 1:numMonthsToFit
  predictMonthsRange = (numMonthsToFit+1):monthRange
  
  fullData = arrangedData$result
  input = arrangedData$input
  expected = arrangedData$expected

  predictionData = subset(input, VAMC == facilityId)
  expectationData = subset(expected, VAMC == facilityId)

  predictionInfo = getPredictorInfo(predictionData)
  facilitySize = predictionData$covariate[1]
  facilityVISN = predictionData$VISN[1]
  rx = predictionInfo$glm

  if (predictionInfo$distribution == 'Poisson') {
    if (predictionInfo$type == 'LogMonth') {
      x1 = rep(1.0, monthRange)
      x2 = log(1:monthRange)
    } else {
      x1 = rep(1.0, monthRange)
      x2 = 1:(monthRange)
    }
    scale = NA
  } else {
    if (predictionInfo$type == 'LogMonth') {
      x1 = rep(1.0, monthRange)
      x2 = log(1:monthRange)
    } else {
      x1 = rep(1.0, monthRange)
      x2 = 1:(monthRange)
    }
    scale = 1.0/rx$theta
  }
  
  varB = sandwich(rx)
  B = rx$coefficients
  
  x = cbind(x1, x2)
  
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
  facilityPlot$predictor = rep(predictionInfo$type, monthRange)
  facilityPlot$dist = rep(predictionInfo$distribution, monthRange)
  facilityPlot$covariate1 = rep(facilitySize, monthRange)
  facilityPlot$sumattempters = c(predictionData$sumattempters, expectationData$sumattempters)
  facilityPlot$weight = c(predictionData$weight, rep(NA, numMonthsToPredict))
  facilityPlot$id = c(fitMonthsRange, rep(NA, numMonthsToPredict))
  facilityPlot$lcov1 = c(rep(log(facilitySize), numMonthsToFit), rep(NA, numMonthsToPredict))
  facilityPlot$IPWResponse = c(predictionData$IPWResponse, rep(NA, numMonthsToPredict)) 
  facilityPlot$Scale = rep(scale, monthRange)
  facilityPlot$SA_new = c(rep(NA, numMonthsToFit), expectationData$sumattempters)
  facilityPlot$VAMC = rep(facilityId, monthRange)
  facilityPlot$VISN = rep(facilityVISN, monthRange)
  return(facilityPlot)
}

predictAttempts = function(params, arrangedData, cwd, facilityId, outDirectory) {
  if (! missing(outDirectory)) {
    outDir = file.path(cwd, outDirectory)
    dir.create(outDir, showWarnings = FALSE)
  }
  
  monthRange = params$monthRange
  numMonthsToFit = params$numMonthsToFit

  r = prPredictor(arrangedData, params, facilityId)
  if (! missing(outDirectory)) {
    write.csv(r, file = outFileName(cwd, "fit", facilityId), row.names = FALSE)
  }
  
  q = predictInR(r[(numMonthsToFit+1):monthRange,])
  if (! missing(outDirectory)) {
    write.csv(q, file = outFileName(cwd, "prediction", facilityId), row.names=FALSE)
  }
  
  result = data.frame(Month_No=r$Month_No, LogMonth=r$LogMonth, Pred=r$pred)
  result$Lower = c(r$lower[1:numMonthsToFit], q$L) 
  result$Upper = c(r$upper[1:numMonthsToFit], q$R)
  result$IPWResponse = r$IPWResponse
  result$SA_new = r$SA_new
  result$VAMC = r$VAMC
  result$VISN = r$VISN
  
  result[result$Pred < 0] = 0
  result[result$Lower < 0]  = 0
  result[result$Upper < 0] = 0
  
  if (! missing(outDirectory)) {
    write.csv(result, file = outFileName(cwd, "plot", facilityId), row.names=FALSE)
  }
  
  return(result);
}

regressionTest = function(directory) {
  params = list(dataCols=4:17, monthRange = 17, numMonthsToFit = 14)
  arrangedData = arrangeData(directory, params)
  for (VAMC in 1:139) {
    try({
      r = predictAttempts(params, arrangedData, directory, VAMC, 'testout')
    })
  }
}

blackbox = function(directory, outDirectory) {
  params = list(dataCols=4:17, monthRange = 17, numMonthsToFit = 14)
  arrangedData = arrangeData(directory, params)
  VAMCS = unique(arrangedData$input$VAMC)
  VAMCS = VAMCS[order(VAMCS)]
  result = NULL
  for (VAMC in VAMCS) {
    try({
      fr = predictAttempts(params, arrangedData, directory, VAMC)
      if (is.null(result)) {
        result = fr
      } else {
        result = rbind(result, fr)
      }
    })
  }

  if (! missing(outDirectory)) {
    outDir = file.path(directory, outDirectory)
    dir.create(outDir, showWarnings = FALSE)
  } else {
    outDir = directory
  }
  filePath = file.path(outDir, 'output.csv')
  write.csv(result, file = filePath, row.names=FALSE)
  
  return(result)
}
