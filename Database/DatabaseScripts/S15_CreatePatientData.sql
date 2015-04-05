DECLARE @FirstName varchar(50), @LastName varchar(50), @SSN varchar(9), @Address1 varchar(100), @Address2 varchar(100), @Address3 varchar(100), @HomePhone varchar(10), 
 @WorkPhone varchar(10), @CellPhone varchar(10), @MothersMaidenName varchar(50), @EmailAddress varchar(100), @Race int, @Gender char(1), @PatientICN  varchar(100), @MaritalStatus int, 
 @DOB date, @MilitaryBranch int, @CTR int, @CTRasText varchar(10)


DELETE FROM Appointments
DELETE FROM EmergencyContact
DELETE FROM PatientMedications
DELETE FROM PatientRiskFactors
DELETE FROM PatientStation
DELETE FROM RiskScoreHistory

DELETE FROM Patient
DBCC CHECKIDENT (Patient, RESEED, 1)

SET @CTR = 1
WHILE @CTR <= 1000000
BEGIN

  SET @CTRasText = cast(@CTR as varchar(10))

  SET @FirstName = 'Vet' + @CTRasText
  SET @LastName = 'Veteran_' + @CTRasText
  SET @SSN = '000' + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) +
   cast(ABS(Checksum(NewID()) % 10) as varchar(1)) + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) + cast(ABS(Checksum(NewID()) % 10) as varchar(1))

  SET @Address1 = @CTRasText + ' Main St.' + @CTRasText
  SET @Address2 = 'Bldg. ' + @CTRasText
  SET @Address3 = 'Apt. ' + @CTRasText

  SET @HomePhone = '800' + '555' + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) +
   cast(ABS(Checksum(NewID()) % 10) as varchar(1))
  SET @WorkPhone = '866' + '444' + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) +
   cast(ABS(Checksum(NewID()) % 10) as varchar(1))
  SET @CellPhone = '855' + '333' + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) + cast(ABS(Checksum(NewID()) % 10) as varchar(1)) +
   cast(ABS(Checksum(NewID()) % 10) as varchar(1))

  SET @MothersMaidenName = 'Maiden ' + @CTRasText
  SET @EMailAddress = 'Email' + @CTRasText + '@va.gov'

  SET @Race = ABS(Checksum(NewID()) % 7) + 1
  SET @Gender = CASE ABS(Checksum(NewID()) % 2) when 0 then 'M' when 1 then 'F' END

  SET @PatientICN = cast(ABS(Checksum(NewID()) % 1000000) + 10000000000 as varchar(50))

  SET @MaritalStatus = ABS(Checksum(NewID()) % 4) + 1

  SET @DOB = cast(cast(ABS(Checksum(NewID()) % 12) + 1 as varchar(2)) + '/' + cast(ABS(Checksum(NewID()) % 28) + 1 as varchar(2)) + '/' + cast(ABS(Checksum(NewID()) % 53) + 1940 as varchar(4)) 
 as date)

  SET @MilitaryBranch = ABS(Checksum(NewID()) % 14) + 1
  INSERT INTO Patient(FirstName, LastName, SSN, Address1, Address2, Address3, HomePhone, WorkPhone, CellPhone, MothersMaidenName, EmailAddress, Race, 
   Gender, PatientICN, MaritalStatus, DOB, MilitaryBranch)
  VALUES(@FirstName, @LastName, @SSN, @Address1, @Address2, @Address3, @HomePhone, @WorkPhone, @CellPhone, @MothersMaidenName, @EmailAddress, @Race, 
   @Gender, @PatientICN, @MaritalStatus, @DOB, @MilitaryBranch)

  SET @CTR = @CTR + 1

END