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

CREATE VIEW vw_VISNRosterASSELECT c.TotalPat as TotalPatients, c.TotalAtRisk as AtRisk, r.VISN, r.NetworkName, r.RegionServedFROM Ref_VISN r INNER JOIN(SELECT vi.visn, sum(a.TotalPat) as TotalPat, sum(b.TotalAtRisk) as TotalAtRiskFROM Ref_VAMC va INNER JOIN Ref_VISN vi ON va.VISN = vi.VISNINNER JOIN(SELECT count(*) as TotalPat, ps.sta3N  FROM patient p inner join PatientStation ps on p.ReachID = ps.ReachID  GROUP BY ps.sta3N) a on va.STA3N = a.sta3n INNER JOIN(SELECT count(*) as TotalAtRisk, ps1.sta3N  FROM patient p1 inner join PatientStation ps1 on p1.ReachID = ps1.ReachID  WHERE p1.RiskLevel is not null GROUP BY ps1.sta3N) b on va.sta3n = b.sta3nGROUP BY vi.visn) c on r.VISN = c.VISN

GO


