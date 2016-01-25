# Converts legacy data into input format

library('base')
library('plyr')
library('methods')

legacyToInput = function() {
  cwd = dirname(sys.frame(1) $ofile)
  
  fileAttempts = file.path(cwd, 'legacyinput', 'fn_mnthrpting_fac_updt_3.csv')
  attemptsData = read.csv(fileAttempts, TRUE, check.names=FALSE, row.names = NULL)
  attemptsData = attemptsData[order(attemptsData$new_facility),]

  visn_new = c(118,110,114,116,109,111,119,107,103,112,105,115,113,121,120,106,117,104,101,102,108)
  visn_real = c(1,2,3,4,5,6,7,8,9,10,11,12,15,16,17,18,19,20,21,22,23)
  visnMap = data.frame(New_VISN=visn_new, Real_VISN=visn_real)
  
  facility_new = c(112,71,60,132,138,86,83,59,108,48,32,127,102,34,16,114,44,119,89,55,53,3,95,79,49,81,19,39,78,96,1,74,4,70,61,130,25,104,111,69,62,137,23,54,28,68,6,27,84,107,98,105,42,99,57,139,91,64,87,90,101,13,125,38,135,82,51,50,30,26,129,10,21,128,7,11,121,120,80,93,9,12,52,14,41,46,117,118,29,88,136,22,75,133,67,58,97,35,103,63,85,45,115,36,40,116,65,94,5,31,76,126,106,43,37,109,56,17,20,92,122,110,33,47,131,124,8,2,100,15,24,123,18,77,73,72,134,113,66)
  facility_real = c(402,405,436,437,442,452,438,459,460,463,500,501,502,503,504,506,508,509,512,514,515,516,517,518,519,520,521,523,526,528,529,531,532,534,537,538,539,540,541,542,543,544,546,548,549,550,552,553,554,555,556,557,558,561,562,564,565,568,570,573,575,578,580,581,583,584,585,586,589,590,593,595,596,598,600,603,605,607,608,609,610,612,613,614,618,619,620,621,623,626,629,630,631,632,635,636,637,640,642,644,646,647,648,649,650,652,653,654,655,656,657,658,659,660,662,663,664,666,667,668,670,671,672,673,674,675,676,677,678,679,687,688,689,691,692,693,695,756,757)
  facilityMap = data.frame(new_facility=facility_new, Real_facility=facility_real)  
  
  fileSize = file.path(cwd, 'legacyinput', 'facsize.csv')
  facilitySizeData = read.csv(fileSize, TRUE, check.names=FALSE, row.names = NULL)
  facilitySizeData = unique(facilitySizeData)
  facilitySizeData = facilitySizeData[order(facilitySizeData$new_facility),]
  
  attemptsDataMerged = merge(attemptsData, facilitySizeData)
  attemptsDataMerged = attemptsDataMerged[order(attemptsDataMerged$new_facility),]
  attemptsData$covariate1 = attemptsDataMerged$covariate1
  attemptsData = attemptsData[order(attemptsData$new_facility, attemptsData$mn_num),]
  attemptsData = rename(attemptsData, c('new_facility'='VAMC', 'New_VISN'='VISN'))
  
  fileOutput = file.path(cwd, 'input.csv')
  write.csv(attemptsData, file =  fileOutput, row.names = FALSE)
  
  return(attemptsData)
}

r = legacyToInput()
