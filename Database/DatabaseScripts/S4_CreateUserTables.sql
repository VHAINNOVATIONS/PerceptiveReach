CREATE SCHEMA prsystem
GO
CREATE SCHEMA ssis
GO
CREATE SCHEMA staging
GO

CREATE TABLE prsystem.Users(
 UserID int IDENTITY, 
 UserName varchar(50) NOT NULL, 
 UserRole int,
 UserLocation int, 
 FirstName varchar(50), 
 LastName varchar(50),
 UserPassword varchar(50),
 CONSTRAINT [PK_UserID] PRIMARY KEY CLUSTERED ([UserID] ASC)
)
GO

CREATE TABLE prsystem.UserRole(
 RoleID int IDENTITY, 
 RoleCode varchar(10) NOT NULL, 
 RoleDesc varchar(255),
 CONSTRAINT [PK_RoleID] PRIMARY KEY CLUSTERED ([RoleID] ASC)
)
GO

CREATE TABLE prsystem.UserPreference(
 UserID int NOT NULL, 
 PrefID int NOT NULL,
 CONSTRAINT [UK_UserID_PrefID] UNIQUE (UserID, PrefID)
)
GO

CREATE TABLE prsystem.Preference(
 PrefID int IDENTITY, 
 PrefCode varchar(10) NOT NULL, 
 PrefDesc varchar(255),
 CONSTRAINT [PK_PrefID] PRIMARY KEY CLUSTERED ([PrefID] ASC)
)
GO

ALTER TABLE prsystem.Users WITH CHECK ADD CONSTRAINT [FK_UserRole] FOREIGN KEY([UserRole])
REFERENCES prsystem.UserRole ([RoleID])
GO

ALTER TABLE prsystem.Users WITH CHECK ADD CONSTRAINT [FK_UserLocation] FOREIGN KEY([UserLocation])
REFERENCES dbo.Ref_VAMC ([VAMCID])
GO

ALTER TABLE prsystem.UserPreference WITH CHECK ADD CONSTRAINT [FK_UserID] FOREIGN KEY([UserID])
REFERENCES prsystem.Users([UserID])
GO

ALTER TABLE prsystem.UserPreference WITH CHECK ADD CONSTRAINT [FK_PrefID] FOREIGN KEY([PrefID])
REFERENCES prsystem.Preference([PrefID])
GO

-- ***

INSERT INTO prsystem.UserRole(RoleCode, RoleDesc) VALUES('VAMC', 'VA Medical Center Employee')
INSERT INTO prsystem.UserRole(RoleCode, RoleDesc) VALUES('VISN', 'VISN Level Employee')
INSERT INTO prsystem.UserRole(RoleCode, RoleDesc) VALUES('STATE', 'State Level Employee')
INSERT INTO prsystem.UserRole(RoleCode, RoleDesc) VALUES('REGION', 'SP Regional Administrator')
INSERT INTO prsystem.UserRole(RoleCode, RoleDesc) VALUES('NATIONAL', 'SP Program Administrator')

INSERT INTO prsystem.Users(UserName, UserRole, UserLocation, FirstName, LastName, UserPassword) 
VALUES('User1', 1, 21, 'Mary', 'Smith', 'Password1')
INSERT INTO prsystem.Users(UserName, UserRole, UserLocation, FirstName, LastName, UserPassword) 
VALUES('User2', 2, 90, 'Tom', 'Jones', 'Password2')
INSERT INTO prsystem.Users(UserName, UserRole, UserLocation, FirstName, LastName, UserPassword) 
VALUES('User3', 3, 163, 'Nick', 'Saban', 'Password3')
INSERT INTO prsystem.Users(UserName, UserRole, UserLocation, FirstName, LastName, UserPassword) 
VALUES('User4', 4, 72, 'Rob', 'Bossarte', 'Password4')
INSERT INTO prsystem.Users(UserName, UserRole, UserLocation, FirstName, LastName, UserPassword) 
VALUES('User5', 5, 110, 'Jan', 'Kemp', 'Password5')