drop table ref_risklevel
drop table ref_outreachstatus

select cast(STA3N as smallint) as STA3N, cast(VISN as smallint) as VISN, VAMC as VAMC_Name, StateAbbr 
into Ref_VAMC2
from Ref_VAMC
where vamcid not in
(select y.VAMCID from
(select r.* from Ref_VAMC r inner join
(select count(*) as ctr, STA3N from Ref_VAMC group by STA3N having count(*) > 1) x on r.STA3N = x.STA3N) y
where sta6aid <> sta3n)
and vamcid not in (158, 159)
GO

EXEC sp_rename 'Ref_VAMC', 'Ref_VAMC_OLD'
GO
EXEC sp_rename 'Ref_VAMC2', 'Ref_VAMC'
GO

ALTER TABLE Ref_VAMC ALTER COLUMN STA3N smallint NOT NULL
GO
ALTER TABLE Ref_VAMC ADD CONSTRAINT PK_STA3N PRIMARY KEY CLUSTERED (STA3N)
GO

EXEC sp_rename 'pk_reachid', 'pk_temp'
GO

-- ***

CREATE TABLE Patient(
 ReachID int IDENTITY,
 LastName varchar(50),
 FirstName varchar(50),
 SSN varchar(50),
 Address1 varchar(50),
 Address2 varchar(50),
 Address3 varchar(50),
 City varchar(50),
 State varchar(30),
 Zip varchar(50),
 Zip4 varchar(50),
 HomePhone varchar(50),
 WorkPhone varchar(50),
 CellPhone varchar(50),
 MothersMaidenName varchar(50),
 DateofDeath date,
 EmailAddress varchar(50),
 Race smallint,
 Gender char(1),
 PatientICN varchar(50),
 MaritalStatus smallint,
 DOB date,
 RiskScore decimal(5,2),
 RiskLevel smallint,
 DateIdentifiedAsHighRisk date,
 CONSTRAINT PK_ReachID PRIMARY KEY CLUSTERED (ReachID))
GO

CREATE TABLE PatientStation(
 ReachID int,
 PatientSID int,
 sta3N smallint,
 PatientIEN varchar(50),
 CONSTRAINT PK_ReachID_Sta3N PRIMARY KEY CLUSTERED (ReachID, Sta3N))
GO

ALTER TABLE PatientStation ADD CONSTRAINT FK_PatientStation_ReachID FOREIGN KEY (ReachID) REFERENCES Patient (ReachID)
ALTER TABLE PatientStation ADD CONSTRAINT FK_PatientStation_sta3N FOREIGN KEY (sta3N) REFERENCES Ref_VAMC (sta3N)
GO

CREATE TABLE PatientRiskFactors(
 ReachID int,
 PTSD bit,
 CONSTRAINT PK_RiskFactorReachID PRIMARY KEY CLUSTERED (ReachID))
GO

ALTER TABLE PatientRiskFactors ADD CONSTRAINT FK_PatientRiskFactors_ReachID FOREIGN KEY (ReachID) REFERENCES Patient (ReachID)
GO

CREATE TABLE RiskScoreHistory(
 ReachID int,
 ScoreDate date,
 Score decimal(5,2),
 CONSTRAINT PK_ReachID_ScoreDate PRIMARY KEY CLUSTERED (ReachID, ScoreDate))
GO

ALTER TABLE RiskScoreHistory ADD CONSTRAINT FK_RiskScoreHistory_ReachID FOREIGN KEY (ReachID) REFERENCES Patient (ReachID)
GO

CREATE TABLE PatientMedications(
 ReachID int,
 MedicationName varchar(100),
 CONSTRAINT PK_ReachID_MedicationName PRIMARY KEY CLUSTERED (ReachID, MedicationName))
GO

ALTER TABLE PatientMedications ADD CONSTRAINT FK_PatientMedications_ReachID FOREIGN KEY (ReachID) REFERENCES Patient (ReachID)
GO

CREATE TABLE Appointments(
 ReachID int,
 ApptDate date,
 ApptType varchar(50),
 CancelNoShowCode varchar(2),
 CONSTRAINT PK_AppointmentsReachID PRIMARY KEY CLUSTERED (ReachID))
GO

ALTER TABLE Appointments ADD CONSTRAINT FK_Appointments_ReachID FOREIGN KEY (ReachID) REFERENCES Patient (ReachID)
GO

CREATE TABLE RiskFactorCoefficient(
 RiskFactor varchar(50),
 Coefficient decimal(5,2),
 CONSTRAINT PK_RiskFactorCoefficient PRIMARY KEY CLUSTERED (RiskFactor))
GO

-- *** Emergency contact already exists

TRUNCATE TABLE EmergencyContact
ALTER TABLE EmergencyContact DROP CONSTRAINT FK_ReachID
GO
ALTER TABLE EmergencyContact ADD CONSTRAINT FK_EmergencyContact_ReachID FOREIGN KEY (ReachID) REFERENCES Patient (ReachID)
GO

-- *** REF TABLES ***

CREATE TABLE Ref_RiskLevel(
 RiskLevelID smallint IDENTITY,
 RiskLevelDesc varchar(20),
 CONSTRAINT PK_RiskLevel PRIMARY KEY CLUSTERED (RiskLevelID))
GO

ALTER TABLE Patient ADD CONSTRAINT FK_Patient_RiskLevel FOREIGN KEY (RiskLevel) REFERENCES Ref_RiskLevel (RiskLevelID)
GO

CREATE TABLE Ref_Race(
 RaceID smallint IDENTITY,
 RaceDesc varchar(20),
 CONSTRAINT PK_Race PRIMARY KEY CLUSTERED (RaceID))
GO

ALTER TABLE Patient ADD CONSTRAINT FK_Patient_Race FOREIGN KEY (Race) REFERENCES Ref_Race (RaceID)
GO

CREATE TABLE Ref_MaritalStatus(
 MaritalStatusID smallint IDENTITY,
 MaritalStatusDesc varchar(20),
 CONSTRAINT PK_MaritalStatus PRIMARY KEY CLUSTERED (MaritalStatusID))
GO

ALTER TABLE Patient ADD CONSTRAINT FK_Patient_MaritalStatus FOREIGN KEY (MaritalStatus) REFERENCES Ref_MaritalStatus (MaritalStatusID)
GO

CREATE TABLE Ref_VistACancelNoShowCode(
 CancelNoShowCodeID varchar(2),
 CancelNoShowCodeDesc varchar(20),
 CONSTRAINT PK_VistACancelNoShowCode PRIMARY KEY CLUSTERED (CancelNoShowCodeID))
GO

ALTER TABLE Appointments ADD CONSTRAINT FK_Appointments_CancelCode FOREIGN KEY (CancelNoShowCode) REFERENCES Ref_VistACancelNoShowCode (CancelNoShowCodeID)
GO

CREATE TABLE Ref_ClinicalGuidelines(
 RiskLevelID smallint,
 Guidelines varchar(max),
 CONSTRAINT PK_GuidlinesRiskLevelID PRIMARY KEY CLUSTERED (RiskLevelID))
GO

ALTER TABLE Ref_ClinicalGuidelines ADD CONSTRAINT FK_ClinicalGuidelines_RiskLevelID FOREIGN KEY (RiskLevelID) REFERENCES Ref_RiskLevel (RiskLevelID)
GO

-- ***

drop table RiskFactorGuidelines
go
drop table riskfactors
go
drop table veteranrisk
go

alter table prsystem.users drop constraint fk_userlocation
go
update prsystem.users set userlocation = null
go
drop table ref_vamc_old
go
alter table prsystem.users alter column userlocation smallint
go
alter table prsystem.users add constraint fk_userlocation foreign key (userlocation) references ref_vamc (sta3n)
go