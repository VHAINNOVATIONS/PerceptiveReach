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


