ALTER TABLE Patient ADD OutreachStatus smallint
GO

CREATE TABLE Ref_OutreachStatus(
 OutReachStatusID smallint IDENTITY,
 StatusDesc varchar(50),
 CONSTRAINT PK_OutreachStatus PRIMARY KEY CLUSTERED (OutReachStatusID))
GO

ALTER TABLE Patient ADD CONSTRAINT FK_Patient_OutreachStatus FOREIGN KEY (OutreachStatus) REFERENCES Ref_OutreachStatus (OutReachStatusID)
GO

ALTER TABLE Ref_RiskLevel ADD RiskLevelFullDesc varchar(255)
GO


ALTER TABLE Appointments DROP CONSTRAINT FK_Appointments_CancelCode
GO
ALTER TABLE Ref_VistACancelNoShowCode DROP CONSTRAINT PK_VistACancelNoShowCode
GO
ALTER TABLE Ref_VistACancelNoShowCode ALTER COLUMN CancelNoShowCodeID varchar(5) not null
GO
ALTER TABLE Appointments ALTER COLUMN CancelNoShowCode varchar(5)
GO
ALTER TABLE Ref_VistACancelNoShowCode ADD CONSTRAINT PK_VistACancelNoShowCode PRIMARY KEY CLUSTERED (CancelNoShowCodeID)
GO
ALTER TABLE Appointments ADD CONSTRAINT FK_Appointments_CancelCode FOREIGN KEY (CancelNoShowCode) REFERENCES Ref_VistACancelNoShowCode (CancelNoShowCodeID)
GO

ALTER TABLE Ref_VistACancelNoShowCode ALTER COLUMN CancelNoShowCodeDesc varchar(100)
ALTER TABLE Ref_Race ALTER COLUMN RaceDesc varchar(50)