CREATE TABLE PatientDiagnosis(
 ReachID int,
 ICD_Code varchar(50),
 ICD_Desc Varchar(255),
 DiagnosisDate Date,
 CONSTRAINT PK_ReachID_ICDCode PRIMARY KEY CLUSTERED (ReachID, ICD_Code))
GO

ALTER TABLE PatientDiagnosis ADD CONSTRAINT FK_PatientDiagnosis_ReachID FOREIGN KEY (ReachID) REFERENCES Patient (ReachID)
GO

-- ***

INSERT INTO PatientDiagnosis
SELECT ReachID, '427.31', 'ATRIAL FIBRILLATION',
cast(cast(ABS(Checksum(NewID()) % 12) + 1 as varchar(2)) + '/' + cast(ABS(Checksum(NewID()) % 28) + 1 as varchar(2)) + '/' + cast(ABS(Checksum(NewID()) % 3) + 2012 as varchar(4)) as date) 
FROM Patient

INSERT INTO PatientDiagnosis
SELECT ReachID, '428.0', 'CONGESTIVE HEART FAILURE, UNSPECIFIED',
cast(cast(ABS(Checksum(NewID()) % 12) + 1 as varchar(2)) + '/' + cast(ABS(Checksum(NewID()) % 28) + 1 as varchar(2)) + '/' + cast(ABS(Checksum(NewID()) % 3) + 2012 as varchar(4)) as date) 
FROM Patient

INSERT INTO PatientDiagnosis
SELECT ReachID, '780.60', 'EVER, UNSPECIFIED',
cast(cast(ABS(Checksum(NewID()) % 12) + 1 as varchar(2)) + '/' + cast(ABS(Checksum(NewID()) % 28) + 1 as varchar(2)) + '/' + cast(ABS(Checksum(NewID()) % 3) + 2012 as varchar(4)) as date) 
FROM Patient

INSERT INTO PatientDiagnosis
SELECT ReachID, '331.0', 'ALZHEIMER''S DISEASE',
cast(cast(ABS(Checksum(NewID()) % 12) + 1 as varchar(2)) + '/' + cast(ABS(Checksum(NewID()) % 28) + 1 as varchar(2)) + '/' + cast(ABS(Checksum(NewID()) % 3) + 2012 as varchar(4)) as date) 
FROM Patient

INSERT INTO PatientDiagnosis
SELECT ReachID, '300.01', 'PANIC DISORDER WITHOUT AGORAPHOBIA',
cast(cast(ABS(Checksum(NewID()) % 12) + 1 as varchar(2)) + '/' + cast(ABS(Checksum(NewID()) % 28) + 1 as varchar(2)) + '/' + cast(ABS(Checksum(NewID()) % 3) + 2012 as varchar(4)) as date) 
FROM Patient

