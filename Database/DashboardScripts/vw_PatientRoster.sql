DROP VIEW [dbo].[vw_PatientRoster]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



ALTER VIEW [dbo].[vw_PatientRoster] as
SELECT ISNULL(LastName, '') + ',' + ISNULL(FirstName, '') as Name, 
p.ReachID, FirstName, 
LastName, 'xxx-xx-'+RIGHT(SSN,4) AS SSN,
HomePhone, 
CONVERT(varchar, DateIdentifiedAsAtRisk, 101) AS DateIdentifiedAsAtRisk, 
rl.RiskLevelDesc AS RiskLevel, 
RiskLevel AS RiskLevelID, 
OutreachStatus, 
ps.sta3N,
ps.Active,
p.RiskScore,
po.CurrentStatus
FROM  Patient p 
LEFT JOIN Ref_RiskLevel rl ON rl.RiskLevelID = p.RiskLevel
INNER JOIN PatientStation ps ON p.ReachID = ps.ReachID 
INNER JOIN prsystem.PatientDashboardFilter f ON p.ReachID = f.ReachID
INNER JOIN dbo.PatientOutReachStatus po ON p.ReachID = po.ReachID
WHERE f.Patient = 1
AND (p.RiskLevel IS NOT NULL OR p.DateIdentifiedAsAtRisk IS NOT NULL)



GO

