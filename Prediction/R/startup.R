library('plyr')
library('MASS')
library('msme')
library('gee')
library('geepack')
library('geeM')
library('ggplot2')

runParams = list(monthColName='mn_num', dataCols=4:17, numFacilities=139)

runParams$monthRange = 17
runParams$numMonthsToFit = 14
