#####################################################################
## Load needed packages into R
#####################################################################

require("sqldf")
require("ggplot2")

#####################################################################
## Data Importing
#####################################################################

## Read in the raw CDC data
file <- "C:/Users/khoover004/Desktop/Home/Perceptive Reach/External Data/Compressed Mortality, 1999-2012.txt"
rawCdc <- read.table(file, 
  sep = "\t", 
  nrows = 2822, 
  header = TRUE)

## Read in the raw County to ZIP file
file <- "C:/Users/khoover004/Desktop/Home/Perceptive Reach/External Data/ZIP_COUNTY_062014.txt"
rawZip <- read.table(file,
  sep = "\t",
  header = TRUE)

#### Crosswalk Column Dictionary
## ZIP - 5 digit USPS ZIP code
## COUNTY - 5 digit unique 2000 Census county code consisting of state + county. 
## RES_RATIO - The ratio of residential addresses in the ZIP – Tract, County, or CBSA part to the total number of residential addresses in the entire ZIP.
## BUS_RATIO - The ratio of business addresses in the ZIP – Tract, County, or CBSA part to the total number of residential addresses in the entire ZIP.
## OTH_RATIO - The ratio of other addresses in the ZIP – Tract, County, or CBSA part to the total number of other addresses in the entire ZIP.
## TOTAL_RATIO - The ratio of all addresses in the ZIP – Tract, County, or CBSA part to the total number of all types of addresses in the entire ZIP.

#####################################################################
## Data manipulation and Merging
#####################################################################

#### Manipulate the CDC data
# Add leading zeros to make every County Code have length of 5
rawCdc$County.Code <- formatC(
  rawCdc$County.Code, 
  width = 5, 
  format = "d", 
  flag = "0") 
# Calculate County rate of suicide per 100,000
rawCdc$rate <- 100000*(rawCdc$Deaths/rawCdc$Population)
# Create new field for County Code
rawCdc$CDC_COUNTY <- rawCdc$County.Code

#### Manipulate the ZIP Xwalk data
rawZip <- subset(rawZip, ZIP != "NA")
rawZip$X <- NULL
# Add leading zeros to make every County Code have length of 5at 
rawZip$COUNTY <- formatC(
  rawZip$COUNTY, 
  width = 5, 
  format = "d", 
  flag = "0") 
# Add leading zeros to make every ZIP Code have length of 5at 
rawZip$ZIP <- formatC(
  rawZip$ZIP, 
  width = 5, 
  format = "d", 
  flag = "0") 

#####################################################################
## Merge County Data with the Zip Code Crosswalk
#####################################################################

# Select the County for a Zip to be associated with based upon the
# based upon the total addresses from a Zip that fall into each of
# the counties. The County with the highest number of a Zip's 
# addresses will have the Zip associated with it.
zip2 <- sqldf("
select
  f.ZIP as ZIP,
  f.COUNTY as COUNTY,
  f.TOT_RATIO as TOT_RATIO
from(
    select
      o.ZIP,
      o.COUNTY,
      o.TOT_RATIO
    from(
            select 
              ZIP, 
              RES_RATIO, 
              max(TOT_RATIO) as MAX_TOT
            from rawZip
            group by ZIP
    ) as i
    inner join 
      rawZip as o on
      o.ZIP = i.ZIP and
      o.TOT_RATIO = i.MAX_TOT
  ) as f
group by f.ZIP
")

# Merge the Zip Codes to the CDC data
zipRates <- sqldf("
select
  a.ZIP,
  a.COUNTY,
  b.rate
from zip2 as a
left join rawCdc as b
on a.COUNTY = b.CDC_COUNTY
")

#####################################################################
## Plot the data in a histogram
#####################################################################

# Plot a histogram of suicide rates per county
plot1 <- ggplot(rawCdc, aes(x=rate)) + geom_histogram(binwidth=1, alpha=.5,)
plot1 + ggtitle("Distribution of County Suicide Rates per 100,000") +
  xlab("Suicides per 100,000") + ylab("County Frequency")+
  geom_bar(fill="#99CCFF", colour="black")+
  geom_vline(xintercept=c(12), color = "red")

# Plot a histogram of suicide rates per Zip
plot2 <- ggplot(zipRates, aes(x=rate)) + geom_histogram(binwidth=1, alpha=.5,)
plot2 + ggtitle("Distribution of ZIP Code Suicide Rates per 100,000") +
  xlab("Suicides per 100,000") + ylab("Zip Code Frequency")+
  geom_bar(fill="#99FF99", colour="black")+
  geom_vline(xintercept=c(12), color = "red")

#####################################################################
## Identify the 20 Counties with the highest suicide rates
#####################################################################

# Order CDC based on suicide rate
ordered <- rawCdc[order(-rawCdc$rate),] 
ordered$Notes <- NULL
ordered$County.Code <- NULL
ordered$Crude.Rate <- NULL

# Display results
head(ordered,20)
