DECLARE @FirstName varchar(50), @LastName varchar(50), @MiddleName varchar(50), @SSN varchar(9), @Phone varchar(10), @AltPhone varchar(10), @Address varchar(100), @City varchar(50),
 @State varchar(2), @Zip varchar(5), @DateIdentifiedRisk datetime, @EmergencyContact varchar(100), @Relationship varchar(20), @EC_Phone varchar(10), @EC_AltPhone varchar(10),
 @EC_Address varchar(100), @EC_City varchar(50), @EC_State varchar(2), @EC_Zip varchar(5), @UrbanArea bit, @Age int, @Gender char(1), @Race varchar(20), @CriminalRecord bit,
 @HistSubstanceAbuse bit, @PreviousPsychiatricHospitalization bit, @PreviousSuicideAttempts bit, @DiagnosedTBI bit, @VAMC int, 
 @CTR int, @TempInt int, @CTRasText varchar(5)

DELETE FROM VeteranRisk
DBCC CHECKIDENT (VeteranRisk, RESEED, 0)

SET @CTR = 1
WHILE @CTR <= 20000
BEGIN

  SET @CTRasText = cast(@CTR as varchar(5))

  SET @FirstName = 'Vet' + @CTRasText
  SET @LastName = 'Veteran_' + @CTRasText
  SET @MiddleName = char(ABS(Checksum(NewID()) % 26) + 65)

  SET @SSN = '000' + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) +
   cast(ABS(Checksum(NewID()) % 10) as varchar(1)) + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) + cast(ABS(Checksum(NewID()) % 10) as varchar(1))

  SET @Phone = '800' + '555' + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) +
   cast(ABS(Checksum(NewID()) % 10) as varchar(1))

  SET @AltPhone = '866' + '444' + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) +
   cast(ABS(Checksum(NewID()) % 10) as varchar(1))

  SET @Address = @CTRasText + ' Main St. Apt. ' + @CTRasText

  -- *** POP IN AN UPDATE AT END ***
  SET @City = NULL SET @State = NULL SET @Zip = NULL SET @EC_City = NULL SET @EC_State = NULL SET @EC_Zip = NULL

  --- *** 35000 = 10/30/1995, 41900 = 09/20/2014
  SET @DateIdentifiedRisk = cast(ABS(Checksum(NewID()) % 6900) + 35000 as datetime)

  SET @EmergencyContact = 'Vet' + @CTRasText + ' Emergency Contact'

  SET @TempInt = ABS(Checksum(NewID()) % 5) + 1
  SET @Relationship = CASE @TempInt when 1 then 'PARENT' when 2 then 'SPOUSE' when 3 then 'CHILD' when 4 then 'FRIEND' when 5 then 'NEIGHBOR' END
  -- print cast(@TempInt as varchar(2)) + ' = ' + isNULL(@Relationship, 'NULL')

  SET @EC_Phone = '800' + '555' + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) +
   cast(ABS(Checksum(NewID()) % 10) as varchar(1))

  SET @EC_AltPhone = '866' + '444' + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) +
   cast(ABS(Checksum(NewID()) % 10) as varchar(1))

  SET @EC_Address = @CTRasText + ' Main St. Apt. ' + @CTRasText

  SET @Age = ABS(Checksum(NewID()) % 50) + 21 
  SET @Race = cast(ABS(Checksum(NewID()) % 9) + 1 as varchar(2))
  -- SET @Gender = CASE ABS(Checksum(NewID()) % 2) when 0 then 'M' when 1 then 'F' END
  SET @TempInt = ABS(Checksum(NewID()) % 2)
  SET @Gender = CASE @TempInt when 0 then 'M' when 1 then 'F' END

  SET @CriminalRecord = CASE when ABS(Checksum(NewID()) % 100) + 1 <= 25 then 1 else 0 END
  SET @HistSubstanceAbuse = CASE when ABS(Checksum(NewID()) % 100) + 1 <= 40 then 1 else 0 END
  SET @PreviousPsychiatricHospitalization = CASE when ABS(Checksum(NewID()) % 100) + 1 <= 10 then 1 else 0 END
  SET @PreviousSuicideAttempts = CASE when ABS(Checksum(NewID()) % 100) + 1 <= 5 then 1 else 0 END
  SET @DiagnosedTBI = CASE when ABS(Checksum(NewID()) % 100) + 1 <= 20 then 1 else 0 END

  SET @VAMC = ABS(Checksum(NewID()) % 158) + 1
  SET @VAMC = CASE when @VAMC > 27 AND @VAMC < 136 then @VAMC + 9 when @VAMC >= 136 then @VAMC + 10 else @VAMC END
  if @VAMC in (151,159) SET @VAMC = @VAMC + 1
  if @VAMC in (150,158) SET @VAMC = @VAMC + 3
  SET @UrbanArea = @VAMC % 2

  INSERT INTO VeteranRisk(FirstName, LastName, MiddleName, SSN, Phone, AltPhone, Address, City, State, Zip, DateIdentifiedRisk, EmergencyContact, Relationship, EC_Phone, EC_AltPhone, 
   EC_Address, EC_City, EC_State, EC_Zip, UrbanArea, Age, Gender, Race, CriminalRecord, HistSubstanceAbuse, PreviousPsychiatricHospitalization, PreviousSuicideAttempts, 
   DiagnosedTBI, VAMC)
  VALUES(@FirstName, @LastName, @MiddleName, @SSN, @Phone, @AltPhone, @Address, @City, @State, @Zip, @DateIdentifiedRisk, @EmergencyContact, @Relationship, @EC_Phone, @EC_AltPhone, 
   @EC_Address, @EC_City, @EC_State, @EC_Zip, @UrbanArea, @Age, @Gender, @Race, @CriminalRecord, @HistSubstanceAbuse, @PreviousPsychiatricHospitalization, @PreviousSuicideAttempts, 
   @DiagnosedTBI, @VAMC)

  SET @CTR = @CTR + 1

END

-- Print 'END OF LOOP'

UPDATE VeteranRisk SET Race = CASE r.RaceID when 8 then left(r.Value, 5) else r.Value END 
FROM VeteranRisk v INNER JOIN SDR_Prod.dbo.Ref_Race r ON cast(v.Race as int) = r.RaceID

UPDATE VeteranRisk
SET City = substring(r.VAMC, 13, charindex(',', r.VAMC) - 1), State = r.StateAbbr, EC_City = substring(r.VAMC, 13, charindex(',', r.VAMC) - 13), EC_State = r.StateAbbr 
FROM VeteranRisk v INNER JOIN Ref_VAMC r ON v.VAMC = r.VAMCID
WHERE charindex(',', r.VAMC) > 0

UPDATE VeteranRisk
SET Zip = r.StateCode + '001', EC_Zip = r.StateCode + '001'  
FROM VeteranRisk v INNER JOIN (SELECT distinct StateCode, StateAbbr FROM SDR_Prod.dbo.Ref_CountyFIPS) r ON v.State = r.StateAbbr