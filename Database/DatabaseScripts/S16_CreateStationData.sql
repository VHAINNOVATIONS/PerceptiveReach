DELETE FROM PatientStation

SELECT ROW_NUMBER() OVER(ORDER BY sta3n) AS RowNum, sta3n 
INTO #station
FROM Ref_VAMC

SELECT ReachID, ABS(Checksum(NewID()) % 138) + 1 as RowNum
INTO #patient
FROM Patient

INSERT INTO PatientStation
SELECT p.ReachID, ABS(Checksum(NewID()) % 10000000) + 1, s.STA3N, cast(ABS(Checksum(NewID()) % 10000000) + 1 as varchar(20))  
FROM #patient p INNER JOIN #station s ON p.RowNum = s.RowNum
GO

-- ***

UPDATE Patient
SET city = left(right(r.VAMC_Name, len(r.VAMC_Name) - 12), len(right(r.VAMC_Name, len(r.VAMC_Name) - 12)) - 4), State = r.StateAbbr
FROM Patient p INNER JOIN PatientStation s ON p.ReachID = s.ReachID
 INNER JOIN Ref_VAMC r ON s.sta3n = r.sta3n

UPDATE Patient
SET Zip = r.StateCode + '001', zip4 = cast(ABS(Checksum(NewID()) % 8000) + 1000 as varchar(4))  
FROM Patient p INNER JOIN (SELECT distinct StateCode, StateAbbr FROM SDR_Prod.dbo.Ref_CountyFIPS) r ON p.State = r.StateAbbr