library('plyr')
library('MASS')
library('msme')
library('gee')
library('geepack')
library('geeM')
library('ggplot2')

rsd = '/Work/git/PerceptiveReach/Prediction/'

runParams = list(monthColName='mn_num', dataCols=4:17, numFacilities=139)
runParams$attemptsFileName = paste(rsd, 'R/fn_mnthrpting_fac_updt_3.csv', sep='')
runParams$facilitySizeFileName = paste(rsd, 'R/facsize.csv', sep='')

runParams$monthRange = 17
runParams$numMonthsToFit = 14
