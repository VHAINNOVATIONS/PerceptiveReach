CREATE TABLE EmergencyContact(
 ReachID int NOT NULL,
 NameOfContact varchar(50),
 StreetAddress1 varchar(50),
 StreetAddress2 varchar(50),
 StreetAddress3 varchar(50),
 City varchar(50),
 State varchar(30),
 Zip varchar(50),
 Zip4 varchar(50),
 Phone varchar(50),
 PhoneWork varchar(50),
 CONSTRAINT [PK_ReachID_Name] PRIMARY KEY (ReachID, NameOfContact))
GO

ALTER TABLE EmergencyContact WITH CHECK ADD CONSTRAINT [FK_ReachID] FOREIGN KEY([ReachID])
REFERENCES VeteranRisk ([ReachID])
GO

UPDATE VeteranRisk SET City = left(city, charindex(',', city) - 1)

ALTER TABLE VeteranRisk DROP COLUMN EmergencyContact
ALTER TABLE VeteranRisk DROP COLUMN Relationship
ALTER TABLE VeteranRisk DROP COLUMN EC_Phone
ALTER TABLE VeteranRisk DROP COLUMN EC_AltPhone
ALTER TABLE VeteranRisk DROP COLUMN EC_Address
ALTER TABLE VeteranRisk DROP COLUMN EC_City
ALTER TABLE VeteranRisk DROP COLUMN EC_State
ALTER TABLE VeteranRisk DROP COLUMN EC_Zip