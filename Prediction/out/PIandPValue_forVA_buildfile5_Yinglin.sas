***************************************************************************************************************************************************************************************
 Main Aim: To replicate Yinglin's program.
 Aim: Prepare the dataset by merging the be used in the main program. The weights .csv file sent by Naiji is imported and then merged with the 
      datasets provided by Brady. The original month numbers used for Surveillance III are from 35-51 (total of 17 months). The first month being Oct'2008 (Month - 1)
      and the last month being Dec'2012 (Month - 51). 
 Programmer: Jyoti Arora
 Date: 03/03/14
***************************************************************************************************************************************************************************************;
libname save "/folders/myfolders/save";

Options symbolgen mlogic mfile mprint mprintnest mlogicnest ;

options RLANG;
goptions reset=all;

*Contents of the datasets provided by Brady;
ods rtf file='/folders/myfolders/contents_1.rtf';
proc contents data=save.facsize;
run;

proc contents data=save.fn_mnthrpting_fac_updt_3;
run;
ODS rtf close;

*Sort the 2 datasets sent by VA;
proc sort data=save.facsize out=facsizesorted;
   by new_facility;
run;

proc sort data=save.fn_mnthrpting_fac_updt_3 out=fnsorted;
   by new_facility;
run;

*Merge the two sorted datasets;
data a;
   merge facsizesorted fnsorted ;
   by  new_facility;
run;

proc contents data=a;
run;

*Keep only months 35 to 51 ( 17 months) on datafile as required for Surveillance III;
data b(keep= attempters mn_num New_VISN New_facility covariate1);
   set a;
   if mn_num > = 35;
run;

*Renumber the months;
data c(drop=j);
   set b;
   do j=35 to 51;
      if mn_num=j then do;
         Month=j-22;
		 Month_No=j-34;
	  end;
   end;
run;
 
data save.c;
	set c;
run;

proc export data=c
   outfile='/folders/myfolders/out/c.csv'
   dbms=csv
   replace;
run;

*Rename the variables in the weights datafile. The .csv version was provided by Naiji which was imported in sas and was names as save.weightsforall3.;
data d;
   set save.weightsforall3;
   rename fac=new_facility;
   rename time=Month_No;
run;

*Keep only the last 17 months beginning with month 13 to match with the datasets created above for surveillance III;
data e;
   set d(drop=id);
   if nmiss(weight) = 0;
*   if Month > = 13;
run;

data save.e;
	set e;
run;

proc export data=e
   outfile='/folders/myfolders/out/e.csv'
   dbms=csv
   replace;
run;

*Merge;
data f;
   merge c e;
   by new_facility Month_No;
run;

data save.f;
	set f;
run;

proc export data=f
   outfile='/folders/myfolders/out/f.csv'
   dbms=csv
   replace;
run;

*The following data step creates a data file which is to be used as the main input file by the main program.
 This dataset matches the datafile SAVE.FINALMONTH13to29uptoDEC2012, which was prepared by Yinglin;
data save.ToTest(drop=mn_num);
   set f;
   id=_N_;
   lcov1=log(covariate1);
   logMonth=log(Month);
   IPWResponse=round(attempters*weight);
   label Month=Month Number from Oct. 2008;
run;
   
proc contents data=save.ToTest;
run;

proc export data=save.ToTest
   outfile='/folders/myfolders/out/totest.csv'
   dbms=csv
   replace;
run;


   

