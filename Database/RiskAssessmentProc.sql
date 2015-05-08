CREATE PROCEDURE sp_AssessPatients
as
BEGIN

  DECLARE @VALUE decimal(21,19), @VALUE2 decimal(21,19), @VALUE3 decimal(21,19), @VALUE4 decimal(21,19), @VALUE5 decimal(21,19), @VALUE6 decimal(21,19)

  SELECT p.ReachID, cast(0 as decimal(21,19)) as Score,
   r.alprazolam12,
   r.alprazolam24,
   r.ami12,
   r.ami24,
   r.amp12,
   r.amp24,
   r.analgesic12,
   r.analgesic24,
   r.anticonvulsant12,
   r.anticonvulsant24,
   r.antidep12,
   r.antidep24,
   r.antipsy12,
   r.antipsy24,
   r.anyattempt1,
   r.anyattempt12,
   r.anyattempt18,
   r.anyattempt2,
   r.anyattempt24,
   r.anyattempt3,
   r.anyattempt6,
   r.AnyEDvisits_prior1,
   r.AnyEDvisits_prior12,
   r.AnyEDvisits_prior18,
   r.AnyEDvisits_prior2,
   r.AnyEDvisits_prior24,
   r.AnyEDvisits_prior3,
   r.AnyEDvisits_prior6,
   r.anyipsub_prior12,
   r.anyipsub_prior24,
   r.anymhdisprior12mos,
   r.anymhdisprior1mos,
   r.anymhdisprior24mos,
   r.anymhdisprior3mos,
   r.anymhdisprior6mos,
   r.anymhdx12,
   r.anymhdx24,
   r.anymhtx12,
   r.anymhtx24,
   r.anypain12,
   r.anypain24,
   r.anyresbed_prior12,
   r.anyresbed_prior24,
   r.anyressub_prior12,
   r.anyressub_prior24,
   r.AnyUCvisits_prior1,
   r.AnyUCvisits_prior12,
   r.AnyUCvisits_prior18,
   r.AnyUCvisits_prior2,
   r.AnyUCvisits_prior24,
   r.AnyUCvisits_prior3,
   r.AnyUCvisits_prior6,
   r.anyusein12moprior,
   r.anyusein18moprior,
   r.anyusein2moprior,
   r.anyusein3moprior,
   r.anyusein6moprior,
   r.apnea12,
   r.apnea24,
   r.arb12,
   r.arb24,
   r.arth12,
   r.arth24,
   r.attempt1,
   r.attempt12,
   r.attempt18,
   r.attempt2,
   r.attempt24,
   r.attempt3,
   r.attempt6,
   r.auto12,
   r.auto24,
   r.backpain12,
   r.backpain24,
   r.bipoli12,
   r.bipoli24,
   r.bipolii12,
   r.bipolii24,
   r.ca_head12,
   r.ca_head24,
   r.ca_prost12,
   r.ca_prost24,
   r.ca12,
   r.ca24,
   r.cad12,
   r.cad24,
   r.cess12,
   r.cess24,
   r.change_Sq,
   r.change_subtract,
   r.chronic12,
   r.chronic24,
   r.clonazepam12,
   r.clonazepam24,
   r.conc12,
   r.conc24,
   r.copd12,
   r.copd24,
   r.CumDaysUsein12MoPrior,
   r.CumDaysUsein18MoPrior,
   r.CumDaysUsein1MoPrior,
   r.CumDaysUsein24MoPrior,
   r.CumDaysUsein2MoPrior,
   r.CumDaysUsein3MoPrior,
   r.CumDaysUsein6MoPrior,
   r.cva12,
   r.cva24,
   r.cvd12,
   r.cvd24,
   r.DaysUsein10MoPrior,
   r.DaysUsein11MoPrior,
   r.DaysUsein12MoPrior,
   r.DaysUsein13MoPrior,
   r.DaysUsein14MoPrior,
   r.DaysUsein15MoPrior,
   r.DaysUsein16MoPrior,
   r.DaysUsein17MoPrior,
   r.DaysUsein18MoPrior,
   r.DaysUsein19MoPrior,
   r.DaysUsein1MoPrior,
   r.DaysUsein20MoPrior,
   r.DaysUsein21MoPrior,
   r.DaysUsein22MoPrior,
   r.DaysUsein23MoPrior,
   r.DaysUsein24MoPrior,
   r.DaysUsein2MoPrior,
   r.DaysUsein3MoPrior,
   r.DaysUsein4MoPrior,
   r.DaysUsein5MoPrior,
   r.DaysUsein6MoPrior,
   r.DaysUsein7MoPrior,
   r.DaysUsein8MoPrior,
   r.DaysUsein9MoPrior,
   r.dementia12,
   r.dementia24,
   r.depr12,
   r.depr24,
   r.dt12,
   r.dt24,
   r.dysthymia12,
   r.dysthymia24,
   r.EDvisits_prior1,
   r.EDvisits_prior12,
   r.EDvisits_prior18,
   r.EDvisits_prior2,
   r.EDvisits_prior24,
   r.EDvisits_prior3,
   r.EDvisits_prior6,
   r.ep12,
   r.ep24,
   r.fib12,
   r.fib24,
   r.FirstUse1Yr,
   r.FirstUse2Yr,
   r.FirstUse3Yr,
   r.FirstUse4Yr,
   r.gu12,
   r.gu24,
   r.ha24,
   r.hc12,
   r.hear12,
   r.hear24,
   r.hemi12,
   r.hemi24,
   r.hiv24,
   r.homeless12,
   r.homeless24,
   r.hyp12,
   r.hyp24,
   r.IPDaysUsein10MoPrior,
   r.IPDaysUsein11MoPrior,
   r.IPDaysUsein12MoPrior,
   r.IPDaysUsein13MoPrior,
   r.IPDaysUsein14MoPrior,
   r.IPDaysUsein15MoPrior,
   r.IPDaysUsein16MoPrior,
   r.IPDaysUsein17MoPrior,
   r.IPDaysUsein18MoPrior,
   r.IPDaysUsein19MoPrior,
   r.IPDaysUsein1MoPrior,
   r.IPDaysUsein20MoPrior,
   r.IPDaysUsein21MoPrior,
   r.IPDaysUsein22MoPrior,
   r.IPDaysUsein23MoPrior,
   r.IPDaysUsein24MoPrior,
   r.IPDaysUsein2MoPrior,
   r.IPDaysUsein3MoPrior,
   r.IPDaysUsein4MoPrior,
   r.IPDaysUsein5MoPrior,
   r.IPDaysUsein6MoPrior,
   r.IPDaysUsein7MoPrior,
   r.IPDaysUsein8MoPrior,
   r.IPDaysUsein9MoPrior,
   r.IPMHDaysUsein10MoPrior,
   r.IPMHDaysUsein11MoPrior,
   r.IPMHDaysUsein12MoPrior,
   r.IPMHDaysUsein13MoPrior,
   r.IPMHDaysUsein14MoPrior,
   r.IPMHDaysUsein15MoPrior,
   r.IPMHDaysUsein16MoPrior,
   r.IPMHDaysUsein17MoPrior,
   r.IPMHDaysUsein18MoPrior,
   r.IPMHDaysUsein19MoPrior,
   r.IPMHDaysUsein1MoPrior,
   r.IPMHDaysUsein20MoPrior,
   r.IPMHDaysUsein21MoPrior,
   r.IPMHDaysUsein22MoPrior,
   r.IPMHDaysUsein23MoPrior,
   r.IPMHDaysUsein24MoPrior,
   r.IPMHDaysUsein2MoPrior,
   r.IPMHDaysUsein3MoPrior,
   r.IPMHDaysUsein4MoPrior,
   r.IPMHDaysUsein5MoPrior,
   r.IPMHDaysUsein6MoPrior,
   r.IPMHDaysUsein7MoPrior,
   r.IPMHDaysUsein8MoPrior,
   r.IPMHDaysUsein9MoPrior,
   r.lagca12,
   r.lagca24,
   r.lorazepam12,
   r.lorazepam24,
   r.mig12,
   r.mig24,
   r.mirtazepam12,
   r.mirtazepam24,
   r.moodst12,
   r.moodst24,
   r.ms12,
   r.ms24,
   r.mst,
   r.neuro12,
   r.neuro24,
   r.OPDaysUsein10MoPrior,
   r.OPDaysUsein11MoPrior,
   r.OPDaysUsein12MoPrior,
   r.OPDaysUsein13MoPrior,
   r.OPDaysUsein14MoPrior,
   r.OPDaysUsein15MoPrior,
   r.OPDaysUsein16MoPrior,
   r.OPDaysUsein17MoPrior,
   r.OPDaysUsein18MoPrior,
   r.OPDaysUsein19MoPrior,
   r.OPDaysUsein1MoPrior,
   r.OPDaysUsein20MoPrior,
   r.OPDaysUsein21MoPrior,
   r.OPDaysUsein22MoPrior,
   r.OPDaysUsein23MoPrior,
   r.OPDaysUsein24MoPrior,
   r.OPDaysUsein2MoPrior,
   r.OPDaysUsein3MoPrior,
   r.OPDaysUsein4MoPrior,
   r.OPDaysUsein5MoPrior,
   r.OPDaysUsein6MoPrior,
   r.OPDaysUsein7MoPrior,
   r.OPDaysUsein8MoPrior,
   r.OPDaysUsein9MoPrior,
   r.opioid12,
   r.opioid24,
   r.OPMHDaysUsein10MoPrior,
   r.OPMHDaysUsein11MoPrior,
   r.OPMHDaysUsein12MoPrior,
   r.OPMHDaysUsein13MoPrior,
   r.OPMHDaysUsein14MoPrior,
   r.OPMHDaysUsein15MoPrior,
   r.OPMHDaysUsein16MoPrior,
   r.OPMHDaysUsein17MoPrior,
   r.OPMHDaysUsein18MoPrior,
   r.OPMHDaysUsein19MoPrior,
   r.OPMHDaysUsein1MoPrior,
   r.OPMHDaysUsein20MoPrior,
   r.OPMHDaysUsein21MoPrior,
   r.OPMHDaysUsein22MoPrior,
   r.OPMHDaysUsein23MoPrior,
   r.OPMHDaysUsein24MoPrior,
   r.OPMHDaysUsein2MoPrior,
   r.OPMHDaysUsein3MoPrior,
   r.OPMHDaysUsein4MoPrior,
   r.OPMHDaysUsein5MoPrior,
   r.OPMHDaysUsein6MoPrior,
   r.OPMHDaysUsein7MoPrior,
   r.OPMHDaysUsein8MoPrior,
   r.OPMHDaysUsein9MoPrior,
   r.orh,
   r.OthAnxDis12,
   r.othanxdis24,
   r.OthPsych12,
   r.othpsych24,
   r.par12,
   r.par24,
   r.Persond12,
   r.persond24,
   r.psy12,
   r.psy24,
   r.ptsd12,
   r.ptsd24,
   r.rd12,
   r.rd24,
   r.region,
   r.relax12,
   r.relax24,
   r.schizo12,
   r.schizo24,
   r.sci12,
   r.sci24,
   r.sedative_anxiolytic12,
   r.sedative_anxiolytic24,
   r.serviceconnectedgroup,
   r.sildenafil12,
   r.sildenafil24,
   r.sle12,
   r.sle24,
   r.sleep12,
   r.sleep24,
   r.statin12,
   r.statin24,
   r.sud12,
   r.sud24,
   r.symptom24,
   r.tbi12,
   r.tbi24,
   r.tca12,
   r.tca24,
   r.thy12,
   r.thy24,
   r.tobacco12,
   r.tobacco24,
   r.topical12,
   r.topical24,
   r.trazodone12,
   r.trazodone24,
   r.UCvisits_prior1,
   r.UCvisits_prior12,
   r.UCvisits_prior18,
   r.UCvisits_prior2,
   r.UCvisits_prior24,
   r.UCvisits_prior3,
   r.UCvisits_prior6,
   r.vet12,
   r.vet24,
   r.vision12,
   r.vision24,
   r.zolpidem12,
   r.zolpidem24,
   p.age, --DATEDIFF(yy, p.DOB, getdate()) as Age,
   p.Race,
   p.MaritalStatus,
   p.Gender,
   r.dm12,
   r.dm24,
   r.ra12,
   r.ra24  
  INTO #PatientScore
  -- FROM Patient p INNER JOIN PatientRiskFactors r ON p.ReachID = r.ReachID
  FROM Analytics.Patient p INNER JOIN Analytics.PatientRiskFactors r ON p.ReachID = r.ReachID
  WHERE p.ScoringStatus = 0
  AND p.dob is not null and p.gender is not null

  -- *** INTERCEPT (Ref_Level)

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'Intercept'
  UPDATE #PatientScore SET Score = @VALUE

  -- *** Risk Factors That Map to Single Coefficient

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'alprazolam12'
  UPDATE #PatientScore SET Score = Score + CASE alprazolam12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'alprazolam24'
  UPDATE #PatientScore SET Score = Score + CASE alprazolam24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'ami12'
  UPDATE #PatientScore SET Score = Score + CASE ami12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'ami24'
  UPDATE #PatientScore SET Score = Score + CASE ami24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'amp12'
  UPDATE #PatientScore SET Score = Score + CASE amp12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'amp24'
  UPDATE #PatientScore SET Score = Score + CASE amp24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'analgesic12'
  UPDATE #PatientScore SET Score = Score + CASE analgesic12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'analgesic24'
  UPDATE #PatientScore SET Score = Score + CASE analgesic24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anticonvulsant12'
  UPDATE #PatientScore SET Score = Score + CASE anticonvulsant12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anticonvulsant24'
  UPDATE #PatientScore SET Score = Score + CASE anticonvulsant24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'antidep12'
  UPDATE #PatientScore SET Score = Score + CASE antidep12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'antidep24'
  UPDATE #PatientScore SET Score = Score + CASE antidep24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'antipsy12'
  UPDATE #PatientScore SET Score = Score + CASE antipsy12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'antipsy24'
  UPDATE #PatientScore SET Score = Score + CASE antipsy24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anyattempt1'
  UPDATE #PatientScore SET Score = Score + CASE anyattempt1 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anyattempt12'
  UPDATE #PatientScore SET Score = Score + CASE anyattempt12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anyattempt18'
  UPDATE #PatientScore SET Score = Score + CASE anyattempt18 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anyattempt2'
  UPDATE #PatientScore SET Score = Score + CASE anyattempt2 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anyattempt24'
  UPDATE #PatientScore SET Score = Score + CASE anyattempt24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anyattempt3'
  UPDATE #PatientScore SET Score = Score + CASE anyattempt3 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anyattempt6'
  UPDATE #PatientScore SET Score = Score + CASE anyattempt6 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'AnyEDvisits_prior1'
  UPDATE #PatientScore SET Score = Score + CASE AnyEDvisits_prior1 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'AnyEDvisits_prior12'
  UPDATE #PatientScore SET Score = Score + CASE AnyEDvisits_prior12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'AnyEDvisits_prior18'
  UPDATE #PatientScore SET Score = Score + CASE AnyEDvisits_prior18 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'AnyEDvisits_prior2'
  UPDATE #PatientScore SET Score = Score + CASE AnyEDvisits_prior2 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'AnyEDvisits_prior24'
  UPDATE #PatientScore SET Score = Score + CASE AnyEDvisits_prior24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'AnyEDvisits_prior3'
  UPDATE #PatientScore SET Score = Score + CASE AnyEDvisits_prior3 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'AnyEDvisits_prior6'
  UPDATE #PatientScore SET Score = Score + CASE AnyEDvisits_prior6 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anyipsub_prior12'
  UPDATE #PatientScore SET Score = Score + CASE anyipsub_prior12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anyipsub_prior24'
  UPDATE #PatientScore SET Score = Score + CASE anyipsub_prior24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anymhdisprior12mos'
  UPDATE #PatientScore SET Score = Score + CASE anymhdisprior12mos when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anymhdisprior1mos'
  UPDATE #PatientScore SET Score = Score + CASE anymhdisprior1mos when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anymhdisprior24mos'
  UPDATE #PatientScore SET Score = Score + CASE anymhdisprior24mos when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anymhdisprior3mos'
  UPDATE #PatientScore SET Score = Score + CASE anymhdisprior3mos when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anymhdisprior6mos'
  UPDATE #PatientScore SET Score = Score + CASE anymhdisprior6mos when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anymhdx12'
  UPDATE #PatientScore SET Score = Score + CASE anymhdx12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anymhdx24'
  UPDATE #PatientScore SET Score = Score + CASE anymhdx24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anymhtx12'
  UPDATE #PatientScore SET Score = Score + CASE anymhtx12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anymhtx24'
  UPDATE #PatientScore SET Score = Score + CASE anymhtx24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anypain12'
  UPDATE #PatientScore SET Score = Score + CASE anypain12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anypain24'
  UPDATE #PatientScore SET Score = Score + CASE anypain24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anyresbed_prior12'
  UPDATE #PatientScore SET Score = Score + CASE anyresbed_prior12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anyresbed_prior24'
  UPDATE #PatientScore SET Score = Score + CASE anyresbed_prior24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anyressub_prior12'
  UPDATE #PatientScore SET Score = Score + CASE anyressub_prior12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anyressub_prior24'
  UPDATE #PatientScore SET Score = Score + CASE anyressub_prior24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'AnyUCvisits_prior1'
  UPDATE #PatientScore SET Score = Score + CASE AnyUCvisits_prior1 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'AnyUCvisits_prior12'
  UPDATE #PatientScore SET Score = Score + CASE AnyUCvisits_prior12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'AnyUCvisits_prior18'
  UPDATE #PatientScore SET Score = Score + CASE AnyUCvisits_prior18 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'AnyUCvisits_prior2'
  UPDATE #PatientScore SET Score = Score + CASE AnyUCvisits_prior2 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'AnyUCvisits_prior24'
  UPDATE #PatientScore SET Score = Score + CASE AnyUCvisits_prior24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'AnyUCvisits_prior3'
  UPDATE #PatientScore SET Score = Score + CASE AnyUCvisits_prior3 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'AnyUCvisits_prior6'
  UPDATE #PatientScore SET Score = Score + CASE AnyUCvisits_prior6 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anyusein12moprior'
  UPDATE #PatientScore SET Score = Score + CASE anyusein12moprior when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anyusein18moprior'
  UPDATE #PatientScore SET Score = Score + CASE anyusein18moprior when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anyusein2moprior'
  UPDATE #PatientScore SET Score = Score + CASE anyusein2moprior when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anyusein3moprior'
  UPDATE #PatientScore SET Score = Score + CASE anyusein3moprior when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'anyusein6moprior'
  UPDATE #PatientScore SET Score = Score + CASE anyusein6moprior when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'apnea12'
  UPDATE #PatientScore SET Score = Score + CASE apnea12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'apnea24'
  UPDATE #PatientScore SET Score = Score + CASE apnea24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'arb12'
  UPDATE #PatientScore SET Score = Score + CASE arb12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'arb24'
  UPDATE #PatientScore SET Score = Score + CASE arb24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'arth12'
  UPDATE #PatientScore SET Score = Score + CASE arth12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'arth24'
  UPDATE #PatientScore SET Score = Score + CASE arth24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'auto12'
  UPDATE #PatientScore SET Score = Score + CASE auto12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'auto24'
  UPDATE #PatientScore SET Score = Score + CASE auto24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'backpain12'
  UPDATE #PatientScore SET Score = Score + CASE backpain12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'backpain24'
  UPDATE #PatientScore SET Score = Score + CASE backpain24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'bipoli12'
  UPDATE #PatientScore SET Score = Score + CASE bipoli12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'bipoli24'
  UPDATE #PatientScore SET Score = Score + CASE bipoli24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'bipolii12'
  UPDATE #PatientScore SET Score = Score + CASE bipolii12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'bipolii24'
  UPDATE #PatientScore SET Score = Score + CASE bipolii24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'ca_head12'
  UPDATE #PatientScore SET Score = Score + CASE ca_head12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'ca_head24'
  UPDATE #PatientScore SET Score = Score + CASE ca_head24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'ca_prost12'
  UPDATE #PatientScore SET Score = Score + CASE ca_prost12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'ca_prost24'
  UPDATE #PatientScore SET Score = Score + CASE ca_prost24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'ca12'
  UPDATE #PatientScore SET Score = Score + CASE ca12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'ca24'
  UPDATE #PatientScore SET Score = Score + CASE ca24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'cad12'
  UPDATE #PatientScore SET Score = Score + CASE cad12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'cad24'
  UPDATE #PatientScore SET Score = Score + CASE cad24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'cess12'
  UPDATE #PatientScore SET Score = Score + CASE cess12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'cess24'
  UPDATE #PatientScore SET Score = Score + CASE cess24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'chronic12'
  UPDATE #PatientScore SET Score = Score + CASE chronic12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'chronic24'
  UPDATE #PatientScore SET Score = Score + CASE chronic24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'clonazepam12'
  UPDATE #PatientScore SET Score = Score + CASE clonazepam12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'clonazepam24'
  UPDATE #PatientScore SET Score = Score + CASE clonazepam24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'conc12'
  UPDATE #PatientScore SET Score = Score + CASE conc12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'conc24'
  UPDATE #PatientScore SET Score = Score + CASE conc24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'copd12'
  UPDATE #PatientScore SET Score = Score + CASE copd12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'copd24'
  UPDATE #PatientScore SET Score = Score + CASE copd24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'cva12'
  UPDATE #PatientScore SET Score = Score + CASE cva12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'cva24'
  UPDATE #PatientScore SET Score = Score + CASE cva24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'cvd12'
  UPDATE #PatientScore SET Score = Score + CASE cvd12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'cvd24'
  UPDATE #PatientScore SET Score = Score + CASE cvd24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'dementia12'
  UPDATE #PatientScore SET Score = Score + CASE dementia12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'dementia24'
  UPDATE #PatientScore SET Score = Score + CASE dementia24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'depr12'
  UPDATE #PatientScore SET Score = Score + CASE depr12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'depr24'
  UPDATE #PatientScore SET Score = Score + CASE depr24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'dt12'
  UPDATE #PatientScore SET Score = Score + CASE dt12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'dt24'
  UPDATE #PatientScore SET Score = Score + CASE dt24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'dysthymia12'
  UPDATE #PatientScore SET Score = Score + CASE dysthymia12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'dysthymia24'
  UPDATE #PatientScore SET Score = Score + CASE dysthymia24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'ep12'
  UPDATE #PatientScore SET Score = Score + CASE ep12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'ep24'
  UPDATE #PatientScore SET Score = Score + CASE ep24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'fib12'
  UPDATE #PatientScore SET Score = Score + CASE fib12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'fib24'
  UPDATE #PatientScore SET Score = Score + CASE fib24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'FirstUse1Yr'
  UPDATE #PatientScore SET Score = Score + CASE FirstUse1Yr when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'FirstUse2Yr'
  UPDATE #PatientScore SET Score = Score + CASE FirstUse2Yr when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'FirstUse3Yr'
  UPDATE #PatientScore SET Score = Score + CASE FirstUse3Yr when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'FirstUse4Yr'
  UPDATE #PatientScore SET Score = Score + CASE FirstUse4Yr when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'gu12'
  UPDATE #PatientScore SET Score = Score + CASE gu12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'gu24'
  UPDATE #PatientScore SET Score = Score + CASE gu24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'ha24'
  UPDATE #PatientScore SET Score = Score + CASE ha24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'hc12'
  UPDATE #PatientScore SET Score = Score + CASE hc12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'hear12'
  UPDATE #PatientScore SET Score = Score + CASE hear12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'hear24'
  UPDATE #PatientScore SET Score = Score + CASE hear24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'hemi12'
  UPDATE #PatientScore SET Score = Score + CASE hemi12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'hemi24'
  UPDATE #PatientScore SET Score = Score + CASE hemi24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'hiv24'
  UPDATE #PatientScore SET Score = Score + CASE hiv24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'homeless12'
  UPDATE #PatientScore SET Score = Score + CASE homeless12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'homeless24'
  UPDATE #PatientScore SET Score = Score + CASE homeless24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'hyp12'
  UPDATE #PatientScore SET Score = Score + CASE hyp12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'hyp24'
  UPDATE #PatientScore SET Score = Score + CASE hyp24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'lagca12'
  UPDATE #PatientScore SET Score = Score + CASE lagca12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'lagca24'
  UPDATE #PatientScore SET Score = Score + CASE lagca24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'lorazepam12'
  UPDATE #PatientScore SET Score = Score + CASE lorazepam12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'lorazepam24'
  UPDATE #PatientScore SET Score = Score + CASE lorazepam24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'mig12'
  UPDATE #PatientScore SET Score = Score + CASE mig12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'mig24'
  UPDATE #PatientScore SET Score = Score + CASE mig24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'mirtazepam12'
  UPDATE #PatientScore SET Score = Score + CASE mirtazepam12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'mirtazepam24'
  UPDATE #PatientScore SET Score = Score + CASE mirtazepam24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'moodst12'
  UPDATE #PatientScore SET Score = Score + CASE moodst12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'moodst24'
  UPDATE #PatientScore SET Score = Score + CASE moodst24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'ms12'
  UPDATE #PatientScore SET Score = Score + CASE ms12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'ms24'
  UPDATE #PatientScore SET Score = Score + CASE ms24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'neuro12'
  UPDATE #PatientScore SET Score = Score + CASE neuro12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'neuro24'
  UPDATE #PatientScore SET Score = Score + CASE neuro24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'opioid12'
  UPDATE #PatientScore SET Score = Score + CASE opioid12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'opioid24'
  UPDATE #PatientScore SET Score = Score + CASE opioid24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OthAnxDis12'
  UPDATE #PatientScore SET Score = Score + CASE OthAnxDis12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'othanxdis24'
  UPDATE #PatientScore SET Score = Score + CASE othanxdis24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OthPsych12'
  UPDATE #PatientScore SET Score = Score + CASE OthPsych12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'othpsych24'
  UPDATE #PatientScore SET Score = Score + CASE othpsych24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'par12'
  UPDATE #PatientScore SET Score = Score + CASE par12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'par24'
  UPDATE #PatientScore SET Score = Score + CASE par24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'Persond12'
  UPDATE #PatientScore SET Score = Score + CASE Persond12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'persond24'
  UPDATE #PatientScore SET Score = Score + CASE persond24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'psy12'
  UPDATE #PatientScore SET Score = Score + CASE psy12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'psy24'
  UPDATE #PatientScore SET Score = Score + CASE psy24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'ptsd12'
  UPDATE #PatientScore SET Score = Score + CASE ptsd12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'ptsd24'
  UPDATE #PatientScore SET Score = Score + CASE ptsd24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'rd12'
  UPDATE #PatientScore SET Score = Score + CASE rd12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'rd24'
  UPDATE #PatientScore SET Score = Score + CASE rd24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'relax12'
  UPDATE #PatientScore SET Score = Score + CASE relax12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'relax24'
  UPDATE #PatientScore SET Score = Score + CASE relax24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'schizo12'
  UPDATE #PatientScore SET Score = Score + CASE schizo12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'schizo24'
  UPDATE #PatientScore SET Score = Score + CASE schizo24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'sci12'
  UPDATE #PatientScore SET Score = Score + CASE sci12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'sci24'
  UPDATE #PatientScore SET Score = Score + CASE sci24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'sedative_anxiolytic12'
  UPDATE #PatientScore SET Score = Score + CASE sedative_anxiolytic12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'sedative_anxiolytic24'
  UPDATE #PatientScore SET Score = Score + CASE sedative_anxiolytic24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'sildenafil12'
  UPDATE #PatientScore SET Score = Score + CASE sildenafil12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'sildenafil24'
  UPDATE #PatientScore SET Score = Score + CASE sildenafil24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'sle12'
  UPDATE #PatientScore SET Score = Score + CASE sle12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'sle24'
  UPDATE #PatientScore SET Score = Score + CASE sle24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'sleep12'
  UPDATE #PatientScore SET Score = Score + CASE sleep12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'sleep24'
  UPDATE #PatientScore SET Score = Score + CASE sleep24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'statin12'
  UPDATE #PatientScore SET Score = Score + CASE statin12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'statin24'
  UPDATE #PatientScore SET Score = Score + CASE statin24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'sud12'
  UPDATE #PatientScore SET Score = Score + CASE sud12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'sud24'
  UPDATE #PatientScore SET Score = Score + CASE sud24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'symptom24'
  UPDATE #PatientScore SET Score = Score + CASE symptom24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'tbi12'
  UPDATE #PatientScore SET Score = Score + CASE tbi12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'tbi24'
  UPDATE #PatientScore SET Score = Score + CASE tbi24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'tca12'
  UPDATE #PatientScore SET Score = Score + CASE tca12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'tca24'
  UPDATE #PatientScore SET Score = Score + CASE tca24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'thy12'
  UPDATE #PatientScore SET Score = Score + CASE thy12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'thy24'
  UPDATE #PatientScore SET Score = Score + CASE thy24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'tobacco12'
  UPDATE #PatientScore SET Score = Score + CASE tobacco12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'tobacco24'
  UPDATE #PatientScore SET Score = Score + CASE tobacco24 when 0 then @VALUE else -@VALUE END
 
  -- SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'topical12'
  UPDATE #PatientScore SET Score = Score + CASE topical12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'topical24'
  UPDATE #PatientScore SET Score = Score + CASE topical24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'trazodone12'
  UPDATE #PatientScore SET Score = Score + CASE trazodone12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'trazodone24'
  UPDATE #PatientScore SET Score = Score + CASE trazodone24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'vet12'
  UPDATE #PatientScore SET Score = Score + CASE vet12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'vet24'
  UPDATE #PatientScore SET Score = Score + CASE vet24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'vision12'
  UPDATE #PatientScore SET Score = Score + CASE vision12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'vision24'
  UPDATE #PatientScore SET Score = Score + CASE vision24 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'zolpidem12'
  UPDATE #PatientScore SET Score = Score + CASE zolpidem12 when 0 then @VALUE else -@VALUE END
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'zolpidem24'
  UPDATE #PatientScore SET Score = Score + CASE zolpidem24 when 0 then @VALUE else -@VALUE END

  -- ***

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'dm12'
  UPDATE #PatientScore SET Score = Score + CASE dm12 when 0 then @VALUE else -@VALUE END

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'dm24'
  UPDATE #PatientScore SET Score = Score + CASE dm24 when 0 then @VALUE else -@VALUE END

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'ra12'
  UPDATE #PatientScore SET Score = Score + CASE ra12 when 0 then @VALUE else -@VALUE END

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'ra24'
  UPDATE #PatientScore SET Score = Score + CASE ra24 when 0 then @VALUE else -@VALUE END


  -- *** Continuos Variables
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'change_Sq'
  UPDATE #PatientScore SET Score = Score + isNull(change_Sq, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'attempt1'
  UPDATE #PatientScore SET Score = Score + isNull(attempt1, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'attempt12'
  UPDATE #PatientScore SET Score = Score + isNull(attempt12, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'attempt18'
  UPDATE #PatientScore SET Score = Score + isNull(attempt18, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'attempt2'
  UPDATE #PatientScore SET Score = Score + isNull(attempt2, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'attempt24'
  UPDATE #PatientScore SET Score = Score + isNull(attempt24, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'attempt3'
  UPDATE #PatientScore SET Score = Score + isNull(attempt3, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'attempt6'
  UPDATE #PatientScore SET Score = Score + isNull(attempt6, 0) * @VALUE
 
  --SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'change_subtract'
  --UPDATE #PatientScore SET Score = Score + isNull(change_subtract, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'CumDaysUsein12MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(CumDaysUsein12MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'CumDaysUsein18MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(CumDaysUsein18MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'CumDaysUsein1MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(CumDaysUsein1MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'CumDaysUsein24MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(CumDaysUsein24MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'CumDaysUsein2MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(CumDaysUsein2MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'CumDaysUsein3MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(CumDaysUsein3MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'CumDaysUsein6MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(CumDaysUsein6MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein10MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein10MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein11MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein11MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein12MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein12MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein13MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein13MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein14MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein14MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein15MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein15MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein16MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein16MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein17MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein17MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein18MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein18MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein19MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein19MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein1MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein1MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein20MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein20MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein21MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein21MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein22MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein22MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein23MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein23MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein24MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein24MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein2MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein2MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein3MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein3MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein4MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein4MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein5MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein5MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein6MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein6MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein7MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein7MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein8MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein8MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'DaysUsein9MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(DaysUsein9MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'EDvisits_prior1'
  UPDATE #PatientScore SET Score = Score + isNull(EDvisits_prior1, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'EDvisits_prior12'
  UPDATE #PatientScore SET Score = Score + isNull(EDvisits_prior12, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'EDvisits_prior18'
  UPDATE #PatientScore SET Score = Score + isNull(EDvisits_prior18, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'EDvisits_prior2'
  UPDATE #PatientScore SET Score = Score + isNull(EDvisits_prior2, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'EDvisits_prior24'
  UPDATE #PatientScore SET Score = Score + isNull(EDvisits_prior24, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'EDvisits_prior3'
  UPDATE #PatientScore SET Score = Score + isNull(EDvisits_prior3, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'EDvisits_prior6'
  UPDATE #PatientScore SET Score = Score + isNull(EDvisits_prior6, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein10MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein10MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein11MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein11MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein12MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein12MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein13MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein13MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein14MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein14MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein15MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein15MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein16MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein16MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein17MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein17MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein18MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein18MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein19MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein19MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein1MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein1MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein20MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein20MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein21MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein21MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein22MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein22MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein23MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein23MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein24MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein24MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein2MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein2MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein3MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein3MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein4MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein4MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein5MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein5MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein6MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein6MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein7MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein7MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein8MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein8MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPDaysUsein9MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPDaysUsein9MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein10MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein10MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein11MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein11MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein12MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein12MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein13MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein13MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein14MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein14MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein15MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein15MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein16MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein16MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein17MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein17MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein18MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein18MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein19MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein19MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein1MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein1MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein20MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein20MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein21MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein21MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein22MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein22MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein23MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein23MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein24MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein24MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein2MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein2MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein3MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein3MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein4MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein4MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein5MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein5MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein6MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein6MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein7MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein7MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein8MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein8MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'IPMHDaysUsein9MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(IPMHDaysUsein9MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein10MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein10MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein11MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein11MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein12MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein12MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein13MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein13MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein14MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein14MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein15MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein15MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein16MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein16MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein17MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein17MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein18MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein18MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein19MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein19MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein1MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein1MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein20MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein20MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein21MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein21MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein22MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein22MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein23MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein23MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein24MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein24MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein2MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein2MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein3MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein3MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein4MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein4MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein5MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein5MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein6MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein6MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein7MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein7MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein8MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein8MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPDaysUsein9MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPDaysUsein9MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein10MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein10MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein11MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein11MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein12MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein12MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein13MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein13MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein14MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein14MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein15MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein15MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein16MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein16MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein17MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein17MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein18MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein18MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein19MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein19MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein1MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein1MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein20MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein20MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein21MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein21MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein22MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein22MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein23MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein23MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein24MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein24MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein2MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein2MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein3MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein3MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein4MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein4MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein5MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein5MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein6MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein6MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein7MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein7MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein8MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein8MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OPMHDaysUsein9MoPrior'
  UPDATE #PatientScore SET Score = Score + isNull(OPMHDaysUsein9MoPrior, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'UCvisits_prior1'
  UPDATE #PatientScore SET Score = Score + isNull(UCvisits_prior1, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'UCvisits_prior12'
  UPDATE #PatientScore SET Score = Score + isNull(UCvisits_prior12, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'UCvisits_prior18'
  UPDATE #PatientScore SET Score = Score + isNull(UCvisits_prior18, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'UCvisits_prior2'
  UPDATE #PatientScore SET Score = Score + isNull(UCvisits_prior2, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'UCvisits_prior24'
  UPDATE #PatientScore SET Score = Score + isNull(UCvisits_prior24, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'UCvisits_prior3'
  UPDATE #PatientScore SET Score = Score + isNull(UCvisits_prior3, 0) * @VALUE
 
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'UCvisits_prior6'
  UPDATE #PatientScore SET Score = Score + isNull(UCvisits_prior6, 0) * @VALUE

  -- *** Category Type Risk Factors that map to mulitple coefficients ***

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'agegroup(< 30)'
  SELECT @VALUE2 = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'agegroup(30 - < 40)'
  SELECT @VALUE3 = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'agegroup(40 - < 50)'
  SELECT @VALUE4 = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'agegroup(50 - < 60)'
  SELECT @VALUE5 = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'agegroup(60 - < 70)'
  SELECT @VALUE6 = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'agegroup(70 - < 80)'
  UPDATE #PatientScore SET Score = Score +
   CASE
     when Age < 30 then @VALUE
     when Age >= 30 AND Age < 40 then @VALUE2
     when Age >= 40 AND Age < 50 then @VALUE3
     when Age >= 50 AND Age < 60 then @VALUE4
     when Age >= 60 AND Age < 70 then @VALUE5
     when Age >= 70 AND Age < 80 then @VALUE6
     else -@VALUE + -@VALUE2 + -@VALUE3 + -@VALUE4 + -@VALUE5 + -@VALUE6
   END

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'white(Unknown)'
  SELECT @VALUE2 = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'white(Non-white)'
  UPDATE #PatientScore SET Score = Score +
   CASE
     when Race is NULL then @VALUE
     when Race = 4 then -@VALUE + -@VALUE2
     else @VALUE2
   END

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital(Unknown)'
  SELECT @VALUE2 = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital(Separated)'
  SELECT @VALUE3 = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital(Never Married)'
  SELECT @VALUE4 = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital(Married)'
  SELECT @VALUE5 = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital(Divorced)'
  UPDATE #PatientScore SET Score = Score +
   CASE
     when MaritalStatus is NULL then @VALUE
     when MaritalStatus = 1 then @VALUE3
     when MaritalStatus = 2 then @VALUE4
     when MaritalStatus = 3 then @VALUE2
     when MaritalStatus = 4 then @VALUE5
     when MaritalStatus = 5 then -@VALUE + -@VALUE2 + -@VALUE3 + -@VALUE4 + -@VALUE5
   END

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'Female'
  UPDATE #PatientScore SET Score = Score + CASE Gender when 'F' then @VALUE else -@VALUE END

  -- *** mst codes (Y=yes(Ref Level),N=no,D=declined,u=Unknown) ***
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'mst(Unknown)'
  SELECT @VALUE2 = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'mst(No)'
  SELECT @VALUE3 = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'mst(Declined)'
  UPDATE #PatientScore SET Score = Score +
   CASE
     when mst = 'Y' then -@VALUE + -@VALUE2 + -@VALUE3
     when mst = 'N' then @VALUE2
     when mst = 'D' then @VALUE3
     when mst = 'U' then @VALUE
   END

  -- *** orh codes (U=urban(Ref Level),R=rural,M=unknown) ***
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'orh(Unknown)'
  SELECT @VALUE2 = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'orh(Rural)'
  UPDATE #PatientScore SET Score = Score +
   CASE
     when orh = 'R' then @VALUE2
     when orh = 'U' then -@VALUE + -@VALUE2
     when orh = 'M' then @VALUE
   END

  -- *** serviceconnectedgroup codes (1=< 30(Ref Level),2=service connected and 30 - 70%,3=service connected and > 70%, 0=no service connection) ***
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'serviceconnectedgroup(service connected and > 70%)'
  SELECT @VALUE2 = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'serviceconnectedgroup(service connected and 30 - 70%)'
  SELECT @VALUE3 = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'serviceconnectedgroup(no service connection)'
  UPDATE #PatientScore SET Score = Score +
   CASE
     when serviceconnectedgroup = 1 then -@VALUE + -@VALUE2 + -@VALUE3
     when serviceconnectedgroup = 2 then @VALUE2
     when serviceconnectedgroup = 3 then @VALUE
     when serviceconnectedgroup = 0 then @VALUE3
   END

  -- *** region codes (1=Northeast,2=Midwest,3=South, 4=West(Ref Level), Unknown=0) ***
  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'region(Unknown)'
  SELECT @VALUE2 = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'region(South)'
  SELECT @VALUE3 = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'region(Northeast)'
  SELECT @VALUE4 = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'region(Midwest)'
  UPDATE #PatientScore SET Score = Score +
   CASE
     when region = 0 then @VALUE
     when region = 1 then @VALUE3
     when region = 2 then @VALUE4
     when region = 3 then @VALUE2
     when region = 4 then -@VALUE + -@VALUE2 + -@VALUE3 + -@VALUE4
   END

  -- *** Interactions ***

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OthAnxDis24*OthPsych24(No,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE OthAnxDis24 = 0 AND OthPsych24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE OthAnxDis24 <> 0 OR OthPsych24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OthAnxDis24*anybipol24(No,No)' 
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE OthAnxDis24 = 0 AND (bipoli24 = 0 AND bipolii24 = 0)
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE OthAnxDis24 <> 0 OR (bipoli24 <> 0 OR bipolii24 <> 0)

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OthAnxDis24*Persond24(No,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE OthAnxDis24 = 0 AND Persond24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE OthAnxDis24 <> 0 OR Persond24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OthAnxDis24*ptsd24(No,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE OthAnxDis24 = 0 AND ptsd24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE OthAnxDis24 <> 0 OR ptsd24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OthAnxDis24*schizo24(No,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE OthAnxDis24 = 0 AND schizo24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE OthAnxDis24 <> 0 OR schizo24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OthPsych24*anybipol24(No,No)'  
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE OthPsych24 = 0 AND (bipoli24 = 0 AND bipolii24 = 0)
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE OthPsych24 <> 0 OR (bipoli24 <> 0 OR bipolii24 <> 0)

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OthPsych24*Persond24(No,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE OthPsych24 = 0 AND Persond24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE OthPsych24 <> 0 OR Persond24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OthPsych24*ptsd24(No,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE OthPsych24 = 0 AND ptsd24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE OthPsych24 <> 0 OR ptsd24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'OthPsych24*schizo24(No,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE OthPsych24 = 0 AND schizo24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE OthPsych24 <> 0 OR schizo24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'Persond24*anybipol24(No,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE Persond24 = 0 AND (bipoli24 = 0 AND bipolii24 = 0)
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE Persond24 <> 0 OR (bipoli24 <> 0 OR bipolii24 <> 0)

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'Persond24*ptsd24(No,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE Persond24 = 0 AND ptsd24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE Persond24 <> 0 OR ptsd24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'Persond24*schizo24(No,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE Persond24 = 0 AND schizo24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE Persond24 <> 0 OR schizo24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'depr12*anybipol12(No,No)' 
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE depr12 = 0 AND (bipoli12 = 0 AND bipolii12 = 0)
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE depr12 <> 0 OR (bipoli12 <> 0 OR bipolii12 <> 0)

  --- *********

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'depr12*marital(No,Separated)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE depr12 = 0 AND MaritalStatus = 3
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE depr12 <> 0 OR MaritalStatus <> 3

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'depr12*marital(No,Never Married)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE depr12 = 0 AND MaritalStatus = 1
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE depr12 <> 0 OR MaritalStatus <> 1

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'depr12*marital(No,Married)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE depr12 = 0 AND MaritalStatus = 2
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE depr12 <> 0 OR MaritalStatus <> 2

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'depr12*marital(No,Unknown)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE depr12 = 0 AND MaritalStatus is NULL
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE depr12 <> 0 OR MaritalStatus is not NULL

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'depr12*marital(No,Divorced)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE depr12 = 0 AND MaritalStatus = 4
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE depr12 <> 0 OR MaritalStatus <> 4

  --- ********

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'depr24*OthAnxDis24(No,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE depr24 = 0 AND OthAnxDis24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE depr24 <> 0 OR OthAnxDis24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'depr24*OthPsych24(No,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE depr24 = 0 AND OthPsych24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE depr24 <> 0 OR OthPsych24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'depr24*Persond24(No,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE depr24 = 0 AND Persond24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE depr24 <> 0 OR Persond24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'depr24*anybipol24(No,No)'  
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE depr24 = 0 AND (bipoli24 = 0 AND bipolii24 = 0)
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE depr24 <> 0 OR (bipoli24 <> 0 OR bipolii24 <> 0)

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'depr24*marital(No,Unknown)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE depr24 = 0 AND MaritalStatus is NULL
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE depr24 <> 0 OR MaritalStatus is not NULL

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'depr24*marital(No,Never Married)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE depr24 = 0 AND MaritalStatus = 1
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE depr24 <> 0 OR MaritalStatus <> 1

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'depr24*marital(No,Married)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE depr24 = 0 AND MaritalStatus = 2
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE depr24 <> 0 OR MaritalStatus <> 2

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'depr24*marital(No,Divorced)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE depr24 = 0 AND MaritalStatus = 4
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE depr24 <> 0 OR MaritalStatus <> 4

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'depr24*marital(No,Separated)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE depr24 = 0 AND MaritalStatus = 3
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE depr24 <> 0 OR MaritalStatus <> 3

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'depr24*ptsd24(No,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE depr24 = 0 AND ptsd24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE depr24 <> 0 OR ptsd24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'depr24*schizo24(No,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE depr24 = 0 AND schizo24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE depr24 <> 0 OR schizo24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*OthAnxDis24(Separated,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 3 AND OthAnxDis24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 3 OR OthAnxDis24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*OthAnxDis24(Married,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 2 AND OthAnxDis24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 2 OR OthAnxDis24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*OthAnxDis24(Divorced,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 4 AND OthAnxDis24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 4 OR OthAnxDis24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*OthAnxDis24(Never Married,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 1 AND OthAnxDis24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 1 OR OthAnxDis24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*OthAnxDis24(Unknown,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus is NULL AND OthAnxDis24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus is NULL OR OthAnxDis24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*Persond24(Unknown,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus is NULL AND Persond24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus is not NULL OR Persond24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*Persond24(Separated,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 3 AND Persond24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 3 OR Persond24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*Persond24(Never Married,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 1 AND Persond24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 1 OR Persond24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*Persond24(Married,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 2 AND Persond24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 2 OR Persond24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*Persond24(Divorced,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 4 AND Persond24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 4 OR Persond24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*anybipol12(Unknown,No)'  
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus is NULL AND (bipoli12 = 0 AND bipolii12 = 0)
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus is not NULL OR (bipoli12 <> 0 OR bipolii12 <> 0)

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*anybipol12(Separated,No)'  
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 3 AND (bipoli12 = 0 AND bipolii12 = 0)
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 3 OR (bipoli12 <> 0 OR bipolii12 <> 0)

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*anybipol12(Married,No)'  
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 2 AND (bipoli12 = 0 AND bipolii12 = 0)
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 2 OR (bipoli12 <> 0 OR bipolii12 <> 0)

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*anybipol12(Divorced,No)'  
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 4 AND (bipoli12 = 0 AND bipolii12 = 0)
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 4 OR (bipoli12 <> 0 OR bipolii12 <> 0)

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*anybipol12(Never Married,No)'  
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 1 AND (bipoli12 = 0 AND bipolii12 = 0)
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 1 OR (bipoli12 <> 0 OR bipolii12 <> 0)

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*anybipol24(Unknown,No)'  
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus is NULL AND (bipoli24 = 0 AND bipolii24 = 0)
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus is NULL OR (bipoli24 <> 0 OR bipolii24 <> 0)

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*anybipol24(Separated,No)' 
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 3 AND (bipoli24 = 0 AND bipolii24 = 0)
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 3 OR (bipoli24 <> 0 OR bipolii24 <> 0)

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*anybipol24(Never Married,No)'  
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 1 AND (bipoli24 = 0 AND bipolii24 = 0)
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 1 OR (bipoli24 <> 0 OR bipolii24 <> 0)

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*anybipol24(Married,No)'    
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 2 AND (bipoli24 = 0 AND bipolii24 = 0)
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 2 OR (bipoli24 <> 0 OR bipolii24 <> 0)

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*anybipol24(Divorced,No)' 
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 4 AND (bipoli24 = 0 AND bipolii24 = 0)
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 4 OR (bipoli24 <> 0 OR bipolii24 <> 0)

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*ptsd24(Unknown,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus is NULL AND ptsd24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus is not NULL OR ptsd24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*ptsd24(Separated,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 3 AND ptsd24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 3 OR ptsd24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*ptsd24(Never Married,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 1 AND ptsd24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 1 OR ptsd24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*ptsd24(Married,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 2 AND ptsd24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 2 OR ptsd24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*ptsd24(Divorced,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 4 AND ptsd24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 4 OR ptsd24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*schizo24(Separated,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 3 AND schizo24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 3 OR schizo24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*schizo24(Never Married,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 1 AND schizo24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 1 OR schizo24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*schizo24(Married,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 2 AND schizo24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 2 OR schizo24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*schizo24(Divorced,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 4 AND schizo24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus <> 4 OR schizo24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*schizo24(Unknown,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus is NULL AND schizo24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus is not NULL OR schizo24 <> 0

  -- ***

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*sex(Unknown,Female)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus is NULL AND Gender = 'F'
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus is NULL OR Gender <> 'F'

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*sex(Separated,Female)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 3 AND Gender = 'F'
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus = 3 OR Gender <> 'F'

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*sex(Never Married,Female)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 1 AND Gender = 'F'
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus = 1 OR Gender <> 'F'

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*sex(Married,Female)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 2 AND Gender = 'F'
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus = 2 OR Gender <> 'F'

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*sex(Divorced,Female)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE MaritalStatus = 4 AND Gender = 'F'
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE MaritalStatus = 4 OR Gender <> 'F'

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*sex(Unknown,Female)'  
  SELECT @VALUE2 = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*sex(Separated,Female)'
  SELECT @VALUE3 = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*sex(Never Married,Female)'
  SELECT @VALUE4 = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*sex(Married,Female)'
  SELECT @VALUE5 = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'marital*sex(Divorced,Female)'

  UPDATE #PatientScore SET Score = Score -(@VALUE + @VALUE2 + @VALUE3 + @VALUE4 + @VALUE5) WHERE MaritalStatus = 5 AND Gender = 'F'
  UPDATE #PatientScore SET Score = Score + @VALUE + @VALUE2 + @VALUE3 + @VALUE4 + @VALUE5 WHERE MaritalStatus = 5 AND Gender = 'F'

  -- ***

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'ptsd24*anybipol24(No,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE ptsd24 = 0 AND (bipoli24 = 0 AND bipolii24 = 0)
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE ptsd24 <> 0 OR (bipoli24 <> 0 OR bipolii24 <> 0)

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'ptsd24*schizo24(No,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE ptsd24 = 0 AND schizo24 = 0
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE ptsd24 <> 0 OR schizo24 <> 0

  SELECT @VALUE = Coefficient FROM analytics.RiskFactorCoefficient WHERE RiskFactor = 'schizo24*anybipol24(No,No)'
  UPDATE #PatientScore SET Score = Score + @VALUE WHERE schizo24 = 0 AND (bipoli24 = 0 AND bipolii24 = 0)
  UPDATE #PatientScore SET Score = Score - @VALUE WHERE schizo24 <> 0 OR (bipoli24 <> 0 OR bipolii24 <> 0)

  -- *** Enter tallied score into logistic regression equation ***

  UPDATE #PatientScore SET Score = EXP(score) / (1 + EXP(Score))

  -- *** update score in patient table ***

  --UPDATE Patient
  --SET RiskScore = cast(s.Score as decimal(11,10)), ScoringStatus = 1
  --FROM Patient p INNER JOIN #PatientScore s ON p.ReachID = s.ReachID

  UPDATE Analytics.Patient
  SET RiskScore = cast(s.Score as decimal(11,10)), ScoringStatus = 1
  FROM Analytics.Patient p INNER JOIN #PatientScore s ON p.ReachID = s.ReachID

END