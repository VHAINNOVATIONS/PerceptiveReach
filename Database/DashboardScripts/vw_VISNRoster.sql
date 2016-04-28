USE [Reach_Dev]
GO

/****** Object:  View [dbo].[vw_VISNRoster]    Script Date: 4/28/2016 12:24:50 PM ******/
DROP VIEW [dbo].[vw_VISNRoster]
GO

/****** Object:  View [dbo].[vw_VISNRoster]    Script Date: 4/28/2016 12:24:50 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[vw_VISNRoster] as

WITH cte1 
AS
-- Define the CTE query.
(
  SELECT COUNT( DISTINCT P.ReachID) AS TOTAL, vi.VISN, vi.NetworkName,vi.RegionServed FROM Ref_VISN vi
	INNER JOIN Ref_VAMC va
	ON vi.VISN = va.VISN
	INNER JOIN PatientStation ps 
	ON va.STA3N = ps.sta3N
	INNER JOIN Patient p
	ON ps.ReachID = p.ReachID
	GROUP BY vi.VISN,vi.NetworkName,vi.RegionServed
),
cte2 
AS
(
SELECT COUNT( DISTINCT P.ReachID) AS TOTAL, vi.VISN, vi.NetworkName,vi.RegionServed FROM Ref_VISN vi
INNER JOIN Ref_VAMC va
ON vi.VISN = va.VISN
INNER JOIN PatientStation ps 
ON va.STA3N = ps.sta3N
INNER JOIN Patient p
ON ps.ReachID = p.ReachID
WHERE p.RiskLevel IS NOT NULL
GROUP BY vi.VISN,vi.NetworkName,vi.RegionServed
)
SELECT t1.total AS TotalPatients,t2.total AS AtRisk, t1.VISN,T1.NetworkName,t1.RegionServed FROM 
cte1 t1
INNER JOIN cte2 t2
ON t1.visn = t2.visn


GO


