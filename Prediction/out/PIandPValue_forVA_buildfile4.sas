******************************************************************************************************************************************************************************************
******************************************************************************************************************************************************************************************

 Project:Suicide Surveillance - III
 Investigators:Dr. Katz and Dr. Bossarte

******************************************************************************************************************************************************************************************
******************************************************************************************************************************************************************************************;
*Data management section;
libname save "/folders/myfolders/save";
Options symbolgen mlogic mfile mprint mprintnest mlogicnest;
options RLANG;
goptions reset=all;

proc contents data=save.finalmonth13to29uptoDec2012;
run;

proc sort data=save.Vacount out=Vacount_sorted;
	by new_facility;
run;

data facilitynames(keep=new_facility Name);
	set Vacount_sorted;
	by new_facility;

	if first.new_facility;
run;

proc sort data=facilitynames;
	by new_facility;
run;

proc export data=facilitynames
   outfile='/folders/myfolders/out/facilityname.csv'
   dbms=csv
   replace;
run;

proc export data=save.finalmonth13to29uptoDec2012
   outfile='/folders/myfolders/out/input.csv'
   dbms=csv
   replace;
run;


data save.finalmonth13to29uptoDec2012_v2;
	set save.finalmonth13to29uptoDec2012;

	If New_VISN=118 then
		Real_VISN=1;

	If New_VISN=110 then
		Real_VISN=2;

	If New_VISN=114 then
		Real_VISN=3;

	If New_VISN=116 then
		Real_VISN=4;

	If New_VISN=109 then
		Real_VISN=5;

	If New_VISN=111 then
		Real_VISN=6;

	If New_VISN=119 then
		Real_VISN=7;

	If New_VISN=107 then
		Real_VISN=8;

	If New_VISN=103 then
		Real_VISN=9;

	If New_VISN=112 then
		Real_VISN=10;

	If New_VISN=105 then
		Real_VISN=11;

	If New_VISN=115 then
		Real_VISN=12;

	If New_VISN=113 then
		Real_VISN=15;

	If New_VISN=121 then
		Real_VISN=16;

	If New_VISN=120 then
		Real_VISN=17;

	If New_VISN=106 then
		Real_VISN=18;

	If New_VISN=117 then
		Real_VISN=19;

	If New_VISN=104 then
		Real_VISN=20;

	If New_VISN=101 then
		Real_VISN=21;

	If New_VISN=102 then
		Real_VISN=22;

	If New_VISN=108 then
		Real_VISN=23;

	If New_facility=112 then
		Real_facility=402;

	If New_facility=71 then
		Real_facility=405;

	If New_facility=60 then
		Real_facility=436;

	If New_facility=132 then
		Real_facility=437;

	If new_facility=138 then
		Real_facility=442;

	If new_facility=86 then
		Real_facility=452;

	If new_facility=83 then
		Real_facility=438;

	If new_facility=59 then
		Real_facility=459;

	If new_facility=108 then
		Real_facility=460;

	If new_facility=48 then
		Real_facility=463;

	If new_facility=32 then
		Real_facility=500;

	If new_facility=127 then
		Real_facility=501;

	If new_facility=102 then
		Real_facility=502;

	If new_facility=34 then
		Real_facility=503;

	If new_facility=16 then
		Real_facility=504;

	If new_facility=114 then
		Real_facility=506;

	If new_facility=44 then
		Real_facility=508;

	If new_facility=119 then
		Real_facility=509;

	If new_facility=89 then
		Real_facility=512;

	If new_facility=55 then
		Real_facility=514;

	If new_facility=53 then
		Real_facility=515;

	If new_facility=3 then
		Real_facility=516;

	If new_facility=95 then
		Real_facility=517;

	If new_facility=79 then
		Real_facility=518;

	If new_facility=49 then
		Real_facility=519;

	If new_facility=81 then
		Real_facility=520;

	If new_facility=19 then
		Real_facility=521;

	If new_facility=39 then
		Real_facility=523;

	If new_facility=78 then
		Real_facility=526;

	If new_facility=96 then
		Real_facility=528;

	If new_facility=1 then
		Real_facility=529;

	If new_facility=74 then
		Real_facility=531;

	If new_facility=4 then
		Real_facility=532;

	If new_facility=70 then
		Real_facility=534;

	If new_facility=61 then
		Real_facility=537;

	If new_facility=130 then
		Real_facility=538;

	If new_facility=25 then
		Real_facility=539;

	If new_facility=104 then
		Real_facility=540;

	If new_facility=111 then
		Real_facility=541;

	If new_facility=69 then
		Real_facility=542;

	If new_facility=62 then
		Real_facility=543;

	If new_facility=137 then
		Real_facility=544;

	If new_facility=23 then
		Real_facility=546;

	If new_facility=54 then
		Real_facility=548;

	If new_facility=28 then
		Real_facility=549;

	If new_facility=68 then
		Real_facility=550;

	If new_facility=6 then
		Real_facility=552;

	If new_facility=27 then
		Real_facility=553;

	If new_facility=84 then
		Real_facility=554;

	If new_facility=107 then
		Real_facility=555;

	If new_facility=98 then
		Real_facility=556;

	If new_facility=105 then
		Real_facility=557;

	If new_facility=42 then
		Real_facility=558;

	If new_facility=99 then
		Real_facility=561;

	If new_facility=57 then
		Real_facility=562;

	If new_facility=139 then
		Real_facility=564;

	If new_facility=91 then
		Real_facility=565;

	If new_facility=64 then
		Real_facility=568;

	If new_facility=87 then
		Real_facility=570;

	If new_facility=90 then
		Real_facility=573;

	If new_facility=101 then
		Real_facility=575;

	If new_facility=13 then
		Real_facility=578;

	If new_facility=125 then
		Real_facility=580;

	If new_facility=38 then
		Real_facility=581;

	If new_facility=135 then
		Real_facility=583;

	If new_facility=82 then
		Real_facility=584;

	If new_facility=51 then
		Real_facility=585;

	If new_facility=50 then
		Real_facility=586;

	If new_facility=30 then
		Real_facility=589;

	If new_facility=26 then
		Real_facility=590;

	If new_facility=129 then
		Real_facility=593;

	If new_facility=10 then
		Real_facility=595;

	If new_facility=21 then
		Real_facility=596;

	If new_facility=128 then
		Real_facility=598;

	If new_facility=7 then
		Real_facility=600;

	If new_facility=11 then
		Real_facility=603;

	If new_facility=121 then
		Real_facility=605;

	If new_facility=120 then
		Real_facility=607;

	If new_facility=80 then
		Real_facility=608;

	If new_facility=93 then
		Real_facility=609;

	If new_facility=9 then
		Real_facility=610;

	If new_facility=12 then
		Real_facility=612;

	If new_facility=52 then
		Real_facility=613;

	If new_facility=14 then
		Real_facility=614;

	If new_facility=41 then
		Real_facility=618;

	If new_facility=46 then
		Real_facility=619;

	If new_facility=117 then
		Real_facility=620;

	If new_facility=118 then
		Real_facility=621;

	If new_facility=29 then
		Real_facility=623;

	If new_facility=88 then
		Real_facility=626;

	If new_facility=136 then
		Real_facility=629;

	If new_facility=22 then
		Real_facility=630;

	If new_facility=75 then
		Real_facility=631;

	If new_facility=133 then
		Real_facility=632;

	If new_facility=67 then
		Real_facility=635;

	If new_facility=58 then
		Real_facility=636;

	If new_facility=97 then
		Real_facility=637;

	If new_facility=35 then
		Real_facility=640;

	If new_facility=103 then
		Real_facility=642;

	If new_facility=63 then
		Real_facility=644;

	If new_facility=85 then
		Real_facility=646;

	If new_facility=45 then
		Real_facility=647;

	If new_facility=115 then
		Real_facility=648;

	If new_facility=36 then
		Real_facility=649;

	If new_facility=40 then
		Real_facility=650;

	If new_facility=116 then
		Real_facility=652;

	If new_facility=65 then
		Real_facility=653;

	If new_facility=94 then
		Real_facility=654;

	If new_facility=5 then
		Real_facility=655;

	If new_facility=31 then
		Real_facility=656;

	If new_facility=76 then
		Real_facility=657;

	If new_facility=126 then
		Real_facility=658;

	If new_facility=106 then
		Real_facility=659;

	If new_facility=43 then
		Real_facility=660;

	If new_facility=37 then
		Real_facility=662;

	If new_facility=109 then
		Real_facility=663;

	If new_facility=56 then
		Real_facility=664;

	If new_facility=17 then
		Real_facility=666;

	If new_facility=20 then
		Real_facility=667;

	If new_facility=92 then
		Real_facility=668;

	If new_facility=122 then
		Real_facility=670;

	If new_facility=110 then
		Real_facility=671;

	If new_facility=33 then
		Real_facility=672;

	If new_facility=47 then
		Real_facility=673;

	If new_facility=131 then
		Real_facility=674;

	If new_facility=124 then
		Real_facility=675;

	If new_facility=8 then
		Real_facility=676;

	If new_facility=2 then
		Real_facility=677;

	If new_facility=100 then
		Real_facility=678;

	If new_facility=15 then
		Real_facility=679;

	If new_facility=24 then
		Real_facility=687;

	If new_facility=123 then
		Real_facility=688;

	If new_facility=18 then
		Real_facility=689;

	If new_facility=77 then
		Real_facility=691;

	If new_facility=73 then
		Real_facility=692;

	If new_facility=72 then
		Real_facility=693;

	If new_facility=134 then
		Real_facility=695;

	If new_facility=113 then
		Real_facility=756;

	If new_facility=66 then
		Real_facility=757;
	label Month="Month Number from Aug. 2010";
	Rename attempters=sumattempters;
	Rename logMonth=lnmonth;
run;


proc export data=save.finalmonth13to29uptoDec2012_v2
   outfile='/folders/myfolders/out/input_2.csv'
   dbms=csv
   replace;
run;


data save.finalmonth13to29uptoDec2012_v3;
	merge save.finalmonth13to29uptoDec2012_v2 facilitynames;
	by new_facility;
run;

data data17months;
	set save.finalmonth13to29uptoDec2012_v3;
	LogMonth=log(Month_No);
run;


proc export data=save.finalmonth13to29uptoDec2012_v3
   outfile='/folders/myfolders/out/input_3.csv'
   dbms=csv
   replace;
run;


proc sort data=data17months out=data17months_sorted;
	by New_facility Month_No;
run;

proc export data=data17months
   outfile='/folders/myfolders/out/data17months.csv'
   dbms=csv
   replace;
run;

data all_facilities;
	set data17months_sorted;
	by New_facility Month_No;

	if Month_No in (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14);
run;

proc export data=all_facilities
   outfile='/folders/myfolders/out/all_facilities.csv'
   dbms=csv
   replace;
run;

data all_facilities_II(keep=id sumattempters IPWResponse weight New_Facility 
		New_VISN Real_facility Real_VISN Month_No logMonth lcov1 covariate1 Name);
	set all_facilities;
run;

proc export data=all_facilities_II
   outfile='/folders/myfolders/out/all_facilities_2.csv'
   dbms=csv
   replace;
run;

proc sort data=all_facilities_II out=all_facilities_III;
	by Month_No;
run;

proc export data=all_facilities_III
   outfile='/folders/myfolders/out/all_facilities_3.csv'
   dbms=csv
   replace;
run;

data vacount_b(keep=new_facility Month_No sumattempters logMonth);
	set data17months_sorted;
	by New_facility Month_No;

	If Month_No in (15, 16, 17);
run;

proc sort data=vacount_b out=vacount_b_sorted;
	by New_facility Month_No;
run;

proc export data=vacount_b_sorted
   outfile='/folders/myfolders/out/vacountbsorted.csv'
   dbms=csv
   replace;
run;

data mth;
	input Month_No;
	datalines;
      15
        16
        17
;
run;

**********************************************************************************************************************************************************************************************
**********************************************************************************************************************************************************************************************;
*Macro to output prediction values;
%Let fac_number=facility;

%Macro NextWord(string);
	%Let space=%Index(&&&string, %Str( ));
	%Let size=%Length(&&&string);

	%If %Eval(&space)>0 %Then
		%Do;
			%Let NextWord=%Substr(&&&string, 1, &space);
			%Let &string=%Substr(&&&string, &space+1, &size-&space);
		%End;
	%Else
		%Do;
			%Let NextWord=&&&string;
			%Let &string= ;
		%End;
	&NextWord
%Mend NextWord;

	%Macro PredictionCountM(i, param, paramvalue, afacility, size, out);
		options nodate nonumber center;

		proc genmod data=all_facilities_III;
			where New_facility=&afacility;
			%put '7' predtype=&Pred_type disttype=&Dist_type facility=&afacility facilitysize=&size n=&i;
			class id;
			model IPWResponse=&Pred_type/dist=&Dist_type link=log offset=lcov1 type3 
				covb pred CL alpha=0.10;
			Repeated subject=id/covb;
			ODS output GEEEmpPEst=Est&afacility GEERCov=Emp&afacility ObStats=Pred;
		run;

		%PUT '******************  I=' &i;

		proc iml ;
			use Est&afacility;
			read all var {Estimate} into B where(Estimate ^=0);
			close Est&afacility;
			use Emp&afacility;
			read all var _num_ into VarB;
			close Emp&afacility;
			x={1 &i};
			xB=x*B;
			vareta=diag(x*varB*x`);
			etastd=sqrt(vecdiag(vareta));
			eta=x*B;
			Lki=eta - 1.645*etastd;
			Rki=eta + 1.645*etastd;
			mki=&size;
			muki=mki#exp(xB);
			expLki=exp(Lki);
			expRki=exp(Rki);
			lower=mki#expLki;
			upper=mki#expRki;
			LkiB=quantile('POISSON', .05, muki);
			RkiB=quantile('POISSON', .95, muki);
			Prediction_Lki=LkiB-lower;
			Prediction_Rki=RkiB+upper;
			pred=Prediction_Lki||muki||Prediction_Rki||eta||etastd;
			create &out from pred;
			append from pred;
			close pred;
			quit;
		%Mend PredictionCountM;

		%Macro PredictionCountLM(param, paramvalue, afacility, size, out);
			options nodate nonumber center;

		proc genmod data=all_facilities_III;
			where New_facility=&afacility;
			%put '7' predtype=&Pred_type disttype=&Dist_type facility=&afacility facilitysize=&size n=&i;
			class id;
			model IPWResponse=&Pred_type/dist=&Dist_type link=log offset=lcov1 type3 
				covb pred CL alpha=0.10;
			Repeated subject=id/covb;
			ODS output GEEEmpPEst=Est&afacility GEERCov=Emp&afacility ObStats=Pred;
		run;

		%PUT '******************  I=' &i;

		proc iml ;
			use Est&afacility;
			read all var {Estimate} into B where(Estimate ^=0);
			close Est&afacility;
			use Emp&afacility;
			read all var _num_ into VarB;
			close Emp&afacility;
			logi=log(&paramvalue);
			x=1 || logi;
			xB=x*B;
			vareta=diag(x*varB*x`);
			etastd=sqrt(vecdiag(vareta));
			eta=x*B;
			Lki=eta - 1.645*etastd;
			Rki=eta + 1.645*etastd;
			mki=&size;
			muki=mki#exp(xB);
			expLki=exp(Lki);
			expRki=exp(Rki);
			lower=mki#expLki;
			upper=mki#expRki;
			LkiB=quantile('POISSON', .05, muki);
			RkiB=quantile('POISSON', .95, muki);
			Prediction_Lki=LkiB-lower;
			Prediction_Rki=RkiB+upper;
			pred=Prediction_Lki||muki||Prediction_Rki||eta||etastd;
			create &out from pred;
			append from pred;
			close pred;
			quit;
		%Mend PredictionCountLM;

		%Macro loop;
			%put '8' predtype=&Pred_type disttype=&Dist_type facility=&afacility facilitysize=&size;

			%if &Pred_type=LogMonth %then
				%do;

					%Do i=1 %To 17;
						%put '****************************************************************************' n=&i pred=&Pred_type;
						%PredictionCountLM(param, &i, &afacility, &size, outds&i);
					%End;
				%end;

			%if &Pred_type=Month_No %then
				%do;

					%Do i=1 %To 17;
						%put '****************************************************************************' n=&i pred=&Pred_type;
						%PredictionCountM(&i, param, paramvalue, &afacility, &size, outds&i) %End;
					%end;
				%Mend;

				***************************************************************************************************************************************************************************************************
***************************************************************************************************************************************************************************************************;
				*Macro to create plots;

				%Macro plot;

				proc sort data=pred;
					by IPWResponse;
				run;

				data pred1;
					merge sorted_ipwresponse pred;
					by IPWResponse;
				run;

				data CLPred(rename=(Observation=Month_No) keep=Observation Pred Lower 
						Upper);
					set Pred1;
					Lower=exp(Xbeta - 1.645*Std);
					Upper=exp(Xbeta + 1.645*Std);
				run;

				data var(rename=(COL1=Lower COL2=Pred COL3=Upper COL4=eta COL5=stdeta));
					set outds1 outds2 outds3 outds4 outds5 outds6 outds7 outds8 outds9 outds10 
						outds11 outds12 outds13 outds14 outds15 outds16 outds17;
				run;

				data temp(rename=(COL1=Lower COL2=Pred COL3=Upper COL4=esteta COL5=stdeta));
					set outds15 outds16 outds17;
				run;

				data temp_II;
					merge temp mth;
				run;

				proc sort data=temp_II;
					by Month_No;
				run;

				proc sort data=CLPred;
					by Month_No;
				run;

				data current_facility_plot;
					merge CLPred temp_II;
					by Month_No;
					LogMonth=log(Month_No);
					New_facility=&afacility;
				run;

				proc sort data=current_facility_plot;
					by New_facility;
				run;

				proc sort data=Vtest_i;
					by New_facility;
				run;

				data current_facility_plot_merge;
					merge current_facility_plot Vtest_i;
					by New_facility;
				run;

				proc sort data=current_facility_plot_merge out=sorted_a;
					by New_facility Month_No;
				run;

				proc sort data=singlefacility out=sorted_b;
					by New_facility Month_No;
				run;

				data plot_a;
					merge sorted_a sorted_b;
					by New_facility Month_No;
				run;

				proc sort data=plot_a out=psorted_a;
					by New_facility Month_No;
				run;

				data plot_b;
					merge psorted_a vacount_subset;
					by New_facility Month_No;
				run;

				proc sort data=plot_b out=plot_b_sorted;
					by New_facility Month_No;
				run;

				data vacount_subset_I(keep=New_facility);
					set vacount_subset;
				run;

				proc sort data=vacount_subset_I;
					by New_facility;
				run;

				data plot_b_II;
					merge plot_b vacount_subset_I;
					by New_facility;
				run;

				data plot_b_III;
					set plot_b_II;
					by New_facility;
					retain Fac_Name VISN R_VISN R_Facility;

					if first.New_facility then
						do;
							Fac_Name=Name;
							VISN=New_VISN;
							R_VISN=Real_VISN;
							R_Facility=Real_facility;
						end;
					put '************************************ R_VISN=' R_VISN=;

					if Name="" then
						do;
							Name=Fac_Name;
						end;

					if New_VISN=. then
						do;
							New_VISN=VISN;
						end;

					if Real_VISN=. then
						do;
							Real_VISN=R_VISN;
						end;

					if Real_facility=. then
						do;
							Real_facility=R_Facility;
						end;
				run;

				data NB_M(keep=DispValue Predtype Distribution New_facility);
					set Pestm0;

					if Parameter="Dispersion";
					DispValue=Estimate;
					Predtype="Month_No";
					Distribution="NB";
					New_facility=&afacility;
				run;

				proc sort data=NB_M;
					by New_facility;
				run;

				data NB_LM(keep=DispValue Predtype Distribution New_facility);
					set Pestlm0;

					if Parameter="Dispersion";
					DispValue=Estimate;
					Predtype="logMonth";
					Distribution="NB";
					New_facility=&afacility;
				run;

				proc sort data=NB_LM;
					by New_facility;
				run;

				data POI_M(keep=DispValue Predtype Distribution New_facility);
					set Pestm;

					if Parameter="Dispersion";
					DispValue=Estimate;
					Predtype="Month_No";
					Distribution="Poisson";
					New_facility=&afacility;
				run;

				proc sort data=POI_M;
					by New_facility;
				run;

				data POI_LM(keep=DispValue Predtype Distribution New_facility);
					set Pestlm;

					if Parameter="Dispersion";
					DispValue=Estimate;
					Predtype="logMonth";
					Distribution="Poisson";
					New_facility=&afacility;
				run;

				proc sort data=POI_LM;
					by New_facility;
				run;

				data Dispersion;
					set NB_M NB_LM Poi_M POI_LM;
					by New_facility;
					rename New_facility=facility;
				run;

				proc sort data=Dispersion;
					by facility;
				run;

				data DispersionVtest;
					merge Dispersion Vtest;
					by facility;
				run;

				data DispersionSelection(keep=predictor dist value Scale New_facility);
					set DispersionVtest;
					by facility;

					if predictor="Month_No" and Predtype="Month_No" then
						do;

							if dist="NB" and Distribution="NB" then
								do;
									Scale=round(DispValue, 0.0001);
									output;
								end;

							if dist="Poisson" and Distribution="Poisson" then
								do;
									Scale=round(DispValue, 0.0001);
									output;
								end;
						end;

					if predictor="LogMonth" and Predtype="logMonth" then
						do;

							if dist="NB" and Distribution="NB" then
								do;
									Scale=round(DispValue, 0.0001);
									output;
								end;

							if dist="Poisson" and Distribution="Poisson" then
								do;
									Scale=round(DispValue, 0.0001);
									output;
								end;
						end;
					rename facility=New_facility;
				run;

				data plot_b_III;
					merge plot_b_III DispersionSelection;
					by New_facility;
				run;

				data plot_b_III;
					set plot_b_III;
					by New_facility;
					retain facsize;

					if first.New_facility then
						do;
							facsize=covariate1;
						end;

					if first.New_facility ne 1 then
						do;
							covariate1=facsize;
						end;

					if scale<0.008 and dist="NB" then
						do;
							dist="Poisson";
						end;
				run;

				proc sort data=plot_b_III out=plot_b_III_sorted;
					by New_facility Month_No;
				run;

				data plot_c;
					set plot_b_III_sorted;
					SA_new=.;

					if Month_No in (15, 16, 17) then
						do;
							SA_new=sumattempters;
						end;
				run;

				proc export data=plot_c outfile="/folders/myfolders/src/plot_c_R.csv" 
						DBMS=CSV REPLACE;
				run;

				FILENAME RProg "/folders/myfolders/src/PIandPValue_Rcode_v1.sas";
				%include RProg;

				/* Printing to test the output */
				proc print data=plot_c;
					var new_facility Month_No Pred IPWResponse sumattempters SA_new;
				run;

				proc print data=plot_c;
					where Month_No in (15, 16, 17);
					var new_facility Month_No Pred IPWResponse sumattempters SA_new;
				run;

				proc sort data=plot_c_sas out=plot_c_sas_sorted;
					by Month_No;
				run;

				data plot_c_intermediate;
					merge plot_c plot_c_sas_sorted;
					by Month_No;
				run;

				data plot_d;
					set plot_c_intermediate;

					if Month_No in (1:14) then
						do;

							if Lower<0 then
								Lower=0;

							if Pred<0 then
								Predicted=0;

							if Upper<0 then
								Upper=0;
							group=1;
							output;
							group=2;
							Pred=Lower;
							output;
							group=3;
							Pred=Upper;
							output;
							group=4;
							Pred=SA_new;
							output;
							group=5;
							Pred=IPWResponse;
							output;
						end;

					if Month_No in (15:17) then
						do;

							if Lower<0 then
								Lower=0;

							if Pred<0 then
								Predicted=0;

							if Upper<0 then
								Upper=0;
							group=1;
							output;
							group=2;
							Pred=L;
							output;
							group=3;
							Pred=R;
							output;
							group=4;
							Pred=SA_new;
							output;
							group=5;
							Pred=IPWResponse;
							output;
						end;
				run;

				Title1;
				footnote1;
				Goptions Display Fby=simplex Hby=3;
				Axis1 Width=2 Major=(Width=2) Minor=(Width=2) Value=(Font=simplex Height=1) 
					Label=(Angle=90 Rotate=0 Font=simplex Height=2);
				Axis2 Width=2 Major=(Width=2) Minor=(Width=2) Value=(Font=simplex Height=1) 
					Label=(Angle=90 Rotate=0 Font=simplex Height=2);
				Axis3 Width=2 Major=(Width=2) Minor=(Width=2) Value=(Font=simplex Height=1) 
					Label=(Font=simplex Height=2);
				Legend1 Label=none Value=(Font=simplex Height=2 j=l) Shape=Line(12) 
					Shape=symbol(8, 2) frame;
				Symbol1 Value=None Interpol=j Line=1 Width=2 Color=black;
				Symbol2 Value=None Interpol=j Line=2 Width=2 Color=black;
				Symbol3 Value=None Interpol=j Line=2 Width=2 Color=black;
				Symbol4 Value=Dot Interpol=none Line=1 Width=2 Color=blue;
				Symbol5 Value=Dot Interpol=none Line=2 Width=2 Color=red;
				Symbol6 Value=None Interpol=none Line=1 Width=1 Color=blue;
				Symbol7 Value=None Interpol=j Line=1 Width=2 Color=magenta;
				Symbol8 Value=None Interpol=j Line=2 Width=2 Color=magenta;
				Symbol9 Value=None Interpol=j Line=2 Width=2 Color=magenta;
				Symbol10 Value=None Interpol=j Line=1 Width=2 Color=red;
				Symbol11 Value=None Interpol=j Line=2 Width=2 Color=red;
				Symbol12 Value=None Interpol=j Line=2 Width=2 Color=red;
				Symbol13 Value=None Interpol=j Line=1 Width=2 Color=orange;
				Symbol14 Value=None Interpol=j Line=2 Width=2 Color=orange;
				Symbol15 Value=None Interpol=j Line=2 Width=2 Color=orange;
				Symbol16 Value=None Interpol=j Line=1 Width=2 Color=green;
				Symbol17 Value=None Interpol=j Line=2 Width=2 Color=green;
				Symbol18 Value=None Interpol=j Line=2 Width=2 Color=green;
				Symbol19 Value=None Interpol=j Line=1 Width=2 Color=big;
				Symbol20 Value=None Interpol=j Line=2 Width=2 Color=big;
				Symbol21 Value=None Interpol=j Line=2 Width=2 Color=big;
				Symbol22 Value=None Interpol=j Line=1 Width=2 Color=brown;
				Symbol23 Value=None Interpol=j Line=2 Width=2 Color=brown;
				Symbol24 Value=None Interpol=j Line=2 Width=2 Color=brown;
				Symbol25 Value=None Interpol=j Line=1 Width=2 Color=pink;
				Symbol26 Value=None Interpol=j Line=2 Width=2 Color=pink;
				Symbol27 Value=None Interpol=j Line=2 Width=2 Color=pink;
				Symbol28 Value=None Interpol=j Line=1 Width=2 Color=purple;
				Symbol29 Value=None Interpol=j Line=2 Width=2 Color=purple;
				Symbol30 Value=None Interpol=j Line=2 Width=2 Color=purple;

				Data _null;
					set plot_d;
					call symput("MonthT", predictor);
					call symput("FName", Name);
					%LET VISN_VAR=New_VISN;
					call symputx("NV", New_VISN);
					call symputx("RV", Real_VISN);
					call symputx("RF", Real_Facility);
					call symputx("Pvalue", pvalue);
					call symputx("DistType", dist);
				run;

				data anno;
					set plot_d;
					length function $ 8 text $ 15;
					retain xsys ysys '2' when 'a';
					function='LABEL';
					y=sumattempters;
					x=Month_No;

					if predictor="LogMonth" then
						x=LogMonth;

					if Month_No in (15, 16, 17) and group=4 then
						do;
							text="p=" || left(put(pvalue, Best6.));
							style='Thorndale AMT';
							color='red';
							size=1;
							position='2';
						end;
				run;

				%Put "  *********   MonthT=&MonthT VISN=&NV";

				Proc Gplot Data=plot_d;
					Plot Pred*&MonthT=group / Frame Vaxis=axis1 Haxis=axis3 nolegend anno=anno;
					title1 Justify=center Height=12pt color=Black 
						"         Facility" &RF":" &FName;
					title2 Justify=center Height=12pt color=Black "    VISN:" &RV;
					footnote Justify=Center Height=12pt color=Black 
						"                         Distribution:" &DistType;
					Run;

				data &fac_number.&afacility(keep=New_Facility Month_No pvalue Count_SA);
					set plot_c_intermediate;
					by New_facility;
					where New_facility=&afacility;

					if Month_No in (15, 16, 17);

					if Month_No=15 then
						do;

							if sumattempters <=pred then
								do;
									Count_SA="< Pred Mean ";
								end;
							else
								do;
									Count_SA=">= Pred Mean ";
								end;
						end;

					if Month_No=16 then
						do;

							if sumattempters < pred then
								do;
									Count_SA="< Pred Mean ";
								end;
							else
								do;
									Count_SA=">= Pred Mean ";
								end;
						end;

					if Month_No=17 then
						do;

							if sumattempters < pred then
								do;
									Count_SA="< Pred Mean ";
								end;
							else
								do;
									Count_SA=">= Pred Mean ";
								end;
						end;
				run;

				proc transpose data=&fac_number.&afacility out=&fac_number.&afacility.trans;
					var New_facility pvalue Count_SA;
					ID Month_No;
				run;

				data &fac_number.&afacility.pvalue(Drop=_Name_ _Label_ _15 _16 _17);
					set &fac_number.&afacility.trans;

					if _Name_="pvalue";
					New_facility=input(_Label_, 5.);
					pvalue15=input(_15, Best12.);
					pvalue16=input(_16, Best12.);
					pvalue17=input(_17, Best12.);
					New_facility=&afacility;
					Real_facility=&RF;
					Real_VISN=&RV;
					Name="&FName";

					if _Name_="pvalue" then
						do;
							pvalue15=_15;
							pvalue16=_16;
							pvalue17=_17;
						end;
				run;

				data &fac_number.&afacility.CountSA(Drop=_Name_ _Label_ _15 _16 _17);
					set &fac_number.&afacility.trans;

					if _Name_="Count_SA";
					New_facility=input(_Label_, 5.);
					New_facility=&afacility;
					Real_facility=&RF;
					Real_VISN=&RV;
					Name="&FName";

					if _Name_="Count_SA" then
						do;
							Count_SA15=_15;
							Count_SA16=_16;
							Count_SA17=_17;
						end;
				run;

				data &fac_number.&afacility.oneobs;
					merge &fac_number.&afacility.pvalue &fac_number.&afacility.CountSA;
					by New_facility;
				run;

				proc append base=save.Facility_pvalue data=&fac_number.&afacility.oneobs 
						force;
				run;

				proc append base=Facility_pvalue data=&fac_number.&afacility.oneobs force;
				run;

			%Mend;

			**************************************************************************************************************************************************************************************************;
			**************************************************************************************************************************************************************************************************;
			*Model Selection macro;

			%macro NBPOI(DepVar, afacility);
				options nodate center;
				title;

				proc genmod data=all_facilities_III;
					where New_facility=&afacility;
					model &DepVar=Month_No /dist=NEGBIN offset=lcov1 type3;
					ods output ParameterEstimates=PEstM0;
				run;

				proc genmod data=all_facilities_III;
					where New_facility=&afacility;
					model &DepVar=LogMonth /dist=NEGBIN offset=lcov1 type3;
					ods output ParameterEstimates=PEstLM0;
				run;

				data _null_;
					set PEstM0;

					if Parameter="Dispersion" then
						do;
							call symput("dism0", round(Estimate, 0.0001));
						end;
				run;

				%PUT **************************************************************************************************************************&dism0;

				data truncscaleM;
					set PEstM0;

					if Parameter="Dispersion" then
						do;
							call symput("dism0", round(Estimate, 0.0001));
						end;
				run;

				data _null_;
					set PEstLM0;

					if Parameter="Dispersion" then
						do;
							call symput("dislm0", round(Estimate, 0.0001));
						end;
				run;

				data truncscaleLM;
					set PEstLM0;

					if Parameter="Dispersion" then
						do;
							call symput("dislm0", round(Estimate, 0.00001));
						end;
				run;

				%PUT ************************************************************************************************************************&dislm0;

				data roundscaleLM;
					set PEstLM0;

					if Parameter="Dispersion" then
						do;
							call symput("dislm0", Estimate);
							scalelm0=round(Estimate, 0.00001);
							Distribution="POISSON";
							output;
						end;
				run;

				%if %SYSEVALF(&dism0 le 0) %then
					%do;

						proc genmod data=all_facilities_III;
							where New_facility=&afacility;
							model &DepVar=logMonth /dist=POI link=log offset=lcov1 type3 pred;
							output out=outLM_POI pred=predLM;
						run;

						proc genmod data=outLM_POI;
							model &DepVar=Month_No /dist=POI link=log offset=lcov1 type3 pred;
							output out=outM_POI pred=predM;
						run;

						%inc "/folders/myfolders/src/buildfile2_model_selection.sas";
						%Vuongva(data=outM_POI, response=&DepVar, model1=LogMonth, p1=predLM, 
							dist1=POI, model2=Month, p2=predM, dist2=POI, nparm1=2, nparm2=2, 
							test=VUONG);
					%end;
				%else %if %SYSEVALF(&dislm0 le 0) %then
					%do;

						proc genmod data=all_facilities_III;
							where New_facility=&afacility;
							model &DepVar=logMonth /dist=POI link=log offset=lcov1 type3 pred;
							output out=outLM_POI pred=predLM;
						run;

						proc genmod data=outLM_POI;
							model &DepVar=Month_No /dist=POI link=log offset=lcov1 type3 pred;
							output out=outM_POI pred=predM;
						run;

						%inc "/folders/myfolders/src/buildfile2_model_selection.sas";
						%Vuongva(data=outM_POI, response=&DepVar, model1=LogMonth, p1=predLM, 
							dist1=POI, model2=Month, p2=predM, dist2=POI, nparm1=2, nparm2=2, 
							test=VUONG);
					%end;
				%else
					%do;

						proc genmod data=all_facilities_III;
							where New_facility=&afacility;
							model &DepVar=logMonth /dist=NEGBIN link=log offset=lcov1 type3 pred;
							ods output ParameterEstimates=PEstLM;
						run;

						data _null_;
							set PEstLM;

							if Parameter="Dispersion" then
								do;
									call symput('disLM', Estimate);
								end;
						run;

						proc genmod data=all_facilities_III;
							where New_facility=&afacility;
							model &DepVar=Month_No /dist=NEGBIN link=log offset=lcov1 type3 pred;
							ods output ParameterEstimates=PEstM;
						run;

						data _null_;
							set PEstM;

							if Parameter="Dispersion" then
								do;
									call symput('disM', Estimate);
								end;
						run;

						proc genmod data=all_facilities_III;
							where New_facility=&afacility;
							model &DepVar=logMonth /dist=NEGBIN link=log offset=lcov1 type3 pred;
							output out=outLM pred=predLM;
						run;

						proc genmod data=outLM;
							model &DepVar=Month_No /dist=NEGBIN link=log offset=lcov1 type3 pred;
							output out=outM pred=predM;
						run;

						%inc "/folders/myfolders/src/buildfile2_model_selection.sas";
						%Vuongva(data=outM, response=&DepVar, model1=LogMonth, p1=predLM, 
							dist1=NB, scale1=&disLM, model2=Month, p2=predM, dist2=NB, scale2=&disM, 
							nparm1=3, nparm2=3, test=VUONG);
					%end;
				ods listing;
				%put '#####################################################  10' a=&afacility;

				data vacount_subset;
					set vacount_b_sorted;
					by new_facility;
					where new_facility=&afacility;
				run;

				data singlefacility;
					set all_facilities_III;
					by new_facility;
					where new_facility=&afacility;
				run;

				proc sort data=singlefacility out=singlefacility_out;
					by New_facility Month_No;
				run;

				data vtest(keep=value dist predictor facility);
					set _head;

					If value="outM_POI" then
						do;

							If PrefModV="LogMonth" then
								do;
									predictor="LogMonth";
									dist="Poisson";
									facility=&afacility;
									output;
								end;

							If PrefModV="Month" then
								do;
									predictor="Month_No";
									dist="Poisson";
									facility=&afacility;
									output;
								end;
						end;

					If value="outM" then
						do;

							If PrefModV="LogMonth" then
								do;
									predictor="LogMonth";
									dist="NB";
									facility=&afacility;
									output;
								end;

							If PrefModV="Month" then
								do;
									predictor="Month_No";
									dist="NB";
									facility=&afacility;
									output;
								end;
						end;
				run;

				data PestM_I(keep=New_facility Parameter Estimate_M Prob_M);
					set Pestm;
					New_facility=&afacility;

					if Parameter="Month_No";
					rename Estimate=Estimate_M;
					rename ProbChiSq=Prob_M;
				run;

				data PestM_II;
					set PestM_I;
					label Prob_M="Month_No Prob";
				run;

				proc sort data=PestM_I;
					by New_facility;
				run;

				proc sort data=PestM_II;
					by New_facility;
				run;

				data PestLM_I(keep=New_facility Parameter Estimate_LM Prob_LM);
					;
					set Pestlm;
					New_facility=&afacility;

					if Parameter="LogMonth";
					rename Estimate=Estimate_LM;
					rename ProbChiSq=Prob_LM;
				run;

				data PestLM_II;
					set PestLM_I;
					label Prob_LM="LogMonth Prob";
				run;

				proc sort data=PestLM_II;
					by New_facility;
				run;

				proc sort data=PestLM_I;
					by New_facility;
				run;

				data Vtest_I;
					set Vtest;
					rename facility=new_facility;
				run;

				proc sort data=Vtest_I;
					by New_facility;
				run;

				data singlefacility_model;
					merge singlefacility_out Vtest_I;
					by New_facility;
				run;

				data var_param;
					set singlefacility_model;
					call symput("Pred_type", Predictor);
					call symput("Dist_type", dist);
					call symput("Size", covariate1);
					output;
				run;

				proc sort data=singlefacility_model out=sorted_IPWresponse;
					by IPWResponse;
				run;

				data singlefacility_TimeTrend;
					merge singlefacility_model PestM_II PestLM_II;
					by New_facility;
				run;

				proc sort data=singlefacility_TimeTrend out=Timetrend_I;
					by Month_No;
				run;

				data Timetrend_II;
					set Timetrend_I;

					if Month_No=1;
				run;

				%put '5' predtype=&Pred_type;
				%put '6' disttype=&Dist_type;
				%Loop;
				%Plot;
			%mend NBPOI;

			*****************************************************************************************************************************************************************************************
*****************************************************************************************************************************************************************************************;

			%Macro test;
				%Let afacility=%NextWord(sentence);
				%Let aDepVar=IPWResponse;
				%Let DepVar=%NextWord(aDepVar);
				%Let aSize=Covariate1;
				%Let Size=%NextWord(aSize);

				%Do %While(%Length(&afacility)>0);
					%Put '1' Word=&afacility depenvar=&DepVar Remaining sentence=&sentence size=&size;
					%NBPOI(&DepVar, &afacility);
					%Put '2' Word=&afacility depenvar=&DepVar size=&size;
					%Let afacility=%NextWord(sentence);
					%Put '3' Word=&afacility depenvar=&DepVar Remaining sentence=&sentence size=&size;
					%Let aDepVar=IPWResponse;
					%Let DepVar=%NextWord(aDepVar);
					%put '4' depenvar=&DepVar;
				%End;
			%Mend test;

			%Let sentence=1;
			***************************************************************************************************************************************************************************************************;
			***************************************************************************************************************************************************************************************************;
			*Create a table of p-values;

			proc sql noprint;
				create table work.Facility_PValue
(/* varname          type             size      format        label    */
				New_facility num label='New_facility', Real_facility num 
					label='Facility No.', Real_VISN num label='VISN No.', Name char 40 
					label='Facility Name', pvalue15 num label='pvalue15', pvalue16 num 
					label='pvalue16', pvalue17 num label='pvalue17', Count_SA15 char 20 
					label='Count_SA15', Count_SA16 char 20 label='Count_SA16', Count_SA17 char 
					20 label='Count_SA17');
				%Test;
				title;
				footnote;

			proc sort data=save.facility_pvalue out=save.facility_pvalue_II nodupkey;
				by New_facility;
			run;

			ODS TAGSETS.EXCELXP 
				file='V:\SurveillanceIII-plotsWithCorrectedPI\pvalues1to139.xls' 
				STYLE=Printer OPTIONS (Orientation='landscape' FitToPage='yes' 
				Pages_FitWidth='1' Pages_FitHeight='100' embedded_titles='yes');

			proc print data=save.facility_pvalue_II;
				title 'Table of PValues for facilities 1-139';
				var New_facility Real_facility Real_VISN Name pvalue15 pvalue16 pvalue17 
					Count_SA15 Count_SA16 Count_SA17;
			run;

			ods tagsets.excelxp close;
			title;
			footnote;
			ODS TAGSETS.EXCELXP 
				file='V:\SurveillanceIII-plotsWithCorrectedPI\pvalues1_II.xls' 
				STYLE=Printer OPTIONS (Orientation='landscape' FitToPage='yes' 
				Pages_FitWidth='1' Pages_FitHeight='100' embedded_titles='yes');

			proc print data=facility_pvalue;
				title 'Table of PValues - facility 1  ';
			run;

			ods tagsets.excelxp close;
			quit;
			*********************************************************************************************************************************************************************************************;
			*********************************************************************************************************************************************************************************************;