UPDATE VeteranRisk SET Score = (ABS(Checksum(NewID()) % 10000) + 1) * .01

ALTER TABLE VeteranRisk ADD RiskLevel smallint

-- ***

update VeteranRisk set RiskLevel = NULL

declare @top5 integer, @top_p1 integer
select @top5 = cast(count(*) * .05 as integer) from VeteranRisk 
select @top_p1 = cast(count(*) * .001 as integer) from VeteranRisk

update VeteranRisk
set RiskLevel = '2'
from VeteranRisk v inner join
(select top (@top5) ReachID from VeteranRisk order by score desc) a on v.ReachID = a.ReachID

update VeteranRisk
set RiskLevel = '1'
from VeteranRisk v inner join
(select top (@top_p1) ReachID from VeteranRisk order by score desc) a on v.ReachID = a.ReachID