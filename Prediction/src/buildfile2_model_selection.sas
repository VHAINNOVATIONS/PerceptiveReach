%macro Vuongva(version, data=_last_, response=, freq=, weight=,
             model1=, p1=, dist1=, 
             model2=, p2=, dist2=, 
             nparm1=, nparm2=, test=both,
             pzero1=, pzero2=,
             event=, trials=,
             scale1=, scale2= 
             );         

%if &model1= %then %let model1=Model 1;
%if &model2= %then %let model2=Model 2;
%let dist1=%upcase(&dist1);
%let dist2=%upcase(&dist2);
%let test=%upcase(%substr(&test,1,1));
%let calc=0;

%do i=1 %to 2;
  %if &&p&i= %then %do;
    %put ERROR: The P&i= parameter is required.;
    %goto exit;
  %end;
   %if &&dist&i ne NB and
      &&dist&i ne POI     
  %then %do;
    %put ERROR: DIST&i= must beNB, POI;
    %goto exit;
  %end;
 
  %if (&&dist&i=NB) and &&scale&i= %then %do;
    %put ERROR: SCALE&i= must be specified with this distribution.;
    %goto exit;
  %end; 
%end;

%let dsid=%sysfunc(open(&data));
%if &dsid %then %do;
  %if %sysfunc(varnum(&dsid,%upcase(&response)))=0 %then %do;
    %put ERROR: RESPONSE= variable &response not found.;
    %let rc=%sysfunc(close(&dsid));
    %goto exit;
  %end;
  %if %sysfunc(varnum(&dsid,%upcase(&p1)))=0 %then %do;
    %put ERROR: P1= variable &p1 not found.;
    %let rc=%sysfunc(close(&dsid));
    %goto exit;
  %end;
  %if %sysfunc(varnum(&dsid,%upcase(&p2)))=0 %then %do;
    %put ERROR: P2= variable &p2 not found.;
    %let rc=%sysfunc(close(&dsid));
    %goto exit;
  %end;
   %let rc=%sysfunc(close(&dsid));
%end;
%else %do;
  %put ERROR: Could not open DATA= data set.;
  %goto exit;
%end;

proc sql;
 reset noprint;
 
 select
   sum( ((&p1 is missing) and (&p2 is not missing)) or
        ((&p1 is not missing) and (&p2 is missing)) ) as _chk
   into :chk
   from &data;
   
 create table _m(drop=_n _BINresp) as
 select 
   count(&p1) as _n, 
   %if &freq ne %then sum(&freq) as _sumf,;
   %else calculated _n as _sumf,;
   %if (&dist1=BIN or &dist2=BIN) and &trials= %then %do;
     (&response = &event) as _BINresp,
     %let trials=1; %let calc=1;
   %end;
   %else &response as _BINresp,;
   %do _i=1 %to 2;    
     %if &&dist&_i=POI %then 
       logpdf("poisson",&response,&&p&_i);    
     %else %if &&dist&_i=NB %then 
       logpdf("negbinomial",&response,1/(1+&&scale&_i*&&p&_i),1/&&scale&_i);     
     as _l&_i,

	  %end;   
   (calculated _l1) - (calculated _l2) as _m
   %if &nparm1 ne and &nparm2 ne %then %do;
     ,
     (calculated _l1 - &nparm1/(calculated _n)) - 
     (calculated _l2 - &nparm2/(calculated _n)) as _mA,
     
     (calculated _l1 - (log(calculated _sumf)*&nparm1)/(2*(calculated _n))) - 
     (calculated _l2 - (log(calculated _sumf)*&nparm2)/(2*(calculated _n))) as _mS
   %end;
 from &data;

%if &chk=1 %then %do;
  %put ERROR: Predicted values from both models must exist in every observation.;
  %goto exit;
%end;

ods exclude all;
proc univariate data=_m vardef=n; 
 %if &nparm1 ne and &nparm2 ne %then %do;
   var _m _mA _mS _l1 _l2; 
   output out=_VC 
        sum=sumM sumMA sumMS LL1 LL2 n=n std=stdm 
        msign=signM signMA signMS probm=prsignM prsignMA prsignMS;
 %end;
 %else %do;
   var _m _l1 _l2; 
   output out=_VC 
        sum=sumM LL1 LL2 n=n std=stdm 
        msign=signM probm=prsignM;
 %end;
 run;
 
data _VC;
 set _VC;
 length type $16 PrefModC $40 PrefModV $40;
 %if &test ne L %then %do;
   type="Unadjusted";
   Z = summ/(sqrt(n)*stdm);  PrZ = 2*(1-probnorm(abs(Z)));
   if Z>0 then PrefModV="&model1"; if Z<0 then PrefModV="&model2";
   sign=signM;  prsign=prsignM;
   if sign>0 then PrefModC="&model1"; if sign<0 then PrefModC="&model2";
   output;
   %end;
  run;
ods select all;

title "The Vuong Macro";
title2 " ";
data _head;
  if _n_=1 then set _VC;
  length item $40 value $40;

  item="Data Set"; value="&data"; output;
  item="Response"; value="&response"; output;
  %if &dist1=BIN %then %do;
    %if &event ne %then %do;
      item="Event Level"; value=cats(&event); output;
    %end;
    %if &trials ne %then %do;
      item="Number of Trials"; value="&trials"; output;
    %end;
  %end;
  %if &freq ne %then %do;
    item="Frequency Variable"; value="&freq"; output;
  %end;
  %if &weight ne %then %do;
    item="Weight Variable"; value="&weight"; output;
  %end;
  item="Number of Observations Used"; value=cats(n); output;

  item="Model 1"; value="&model1"; output;
  item="   Distribution"; value="&dist1"; output;
  item="   Predicted Variable"; value="&p1"; output;
  %if &nparm1 ne %then %do;
    item="   Number of Parameters"; value="&nparm1"; output;
  %end;
  %if &scale1 ne %then %do;
    item="   Scale"; value="&scale1"; output;
  %end;
  %if &pzero1 ne %then %do;
    item="   Zero-inflation Probability"; value="&pzero1"; output;
  %end;
  item="   Log Likelihood"; value=cats(put(LL1,best10.)); output;

  item="Model 2"; value="&model2"; output;
  item="   Distribution"; value="&dist2"; output;
  item="   Predicted Variable"; value="&p2"; output;
  %if &nparm2 ne %then %do;
    item="   Number of Parameters"; value="&nparm2"; output;
  %end;
  %if &scale2 ne %then %do;
    item="   Scale"; value="&scale2"; output;
  %end;
  %if &pzero2 ne %then %do;
    item="   Zero-inflation Probability"; value="&pzero2"; output;
  %end;
  item="   Log Likelihood"; value=cats(put(LL2,best10.)); output;
  stop;
  run;
proc print noobs data=_head label;
  var item value;
  label item='00'x value='00'x;
  title3 "Model Information";
  run;

%if &test=B or &test=V %then %do;
proc print data=_VC noobs label;
 var type Z PrZ PrefModV;
 format Z 8.4 PrZ pvalue6.;
 label type="Vuong Statistic" PrZ="Pr>|Z|"
       PrefModV="Preferred Model";
 title3 "Vuong Test";
 title4 "H0: models are equally close to the true model";
 title5 "Ha: one of the models is closer to the true model";
 run;
%end;

%exit:
title;
%mend;
