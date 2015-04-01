DELETE FROM Appointments
GO

INSERT INTO Appointments
SELECT ReachID, 
 cast(cast(ABS(Checksum(NewID()) % 12) + 1 as varchar(2)) + '/' + cast(ABS(Checksum(NewID()) % 28) + 1 as varchar(2)) + '/' + cast(ABS(Checksum(NewID()) % 15) + 2000 as varchar(4)) 
 as date),
 CASE ABS(Checksum(NewID()) % 11)
  when 0 then 'Sharing Agreement'
  When 1 then 'Collateral of Vet.'
  when 2 then 'Employee'
  when 3 then 'Organ Donors'
  when 4 then 'Regular'
  when 5 then 'Prima Facia'
  when 6 then 'Class ii Dental'
  when 7 then 'Research'
  when 8 then 'Service Connected'
  when 9 then 'Computer Generated'
  when 10 then 'Compensation & Pension'
 END,
 CASE
  when ReachID % 4 = 0 then
    CASE ABS(Checksum(NewID()) % 4)
      when 0 then 'C'
      when 1 then 'CA'
      when 2 then 'PC'
      when 3 then 'PCA'
    END
 END
FROM Patient
WHERE ReachID % 2 = 0
