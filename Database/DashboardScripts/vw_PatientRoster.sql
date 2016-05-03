DROP VIEW [dbo].[vw_PatientRoster]
GO

/****** Object:  View [dbo].[vw_PatientRoster]    Script Date: 4/29/2016 2:59:51 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[vw_PatientRoster] as
SELECT LastName+','+FirstName as Name, 
p.ReachID, FirstName, 
LastName, 'xxx-xx-'+RIGHT(SSN,4) AS SSN,
HomePhone, 
convert(varchar, DateIdentifiedAsAtRisk, 101) AS DateIdentifiedAsAtRisk, 
rl.RiskLevelDesc as RiskLevel, 
RiskLevel AS RiskLevelID, 
OutreachStatus, 
ps.sta3N,
ps.Active,
p.RiskScore
FROM  Patient p 
INNER JOIN Ref_RiskLevel rl ON rl.RiskLevelID = p.RiskLevel
INNER JOIN PatientStation ps ON p.ReachID = ps.ReachID 
INNER JOIN prsystem.PatientDashboardFilter f on p.ReachID = f.ReachIDWHERE f.Patient = 1


GO

