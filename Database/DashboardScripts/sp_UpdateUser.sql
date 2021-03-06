USE [Reach_Dev]
GO

IF NOT EXISTS(SELECT TOP 1 1 FROM INFORMATION_SCHEMA.ROUTINES WHERE SPECIFIC_NAME = 'sp_UpdateUser' and SPECIFIC_SCHEMA = 'prsystem')
        EXEC('CREATE PROCEDURE [prsystem].[sp_UpdateUser] as select 1 as one')
GO
Alter PROCEDURE [prsystem].[sp_UpdateUser] 
	@UserName NVARCHAR(50),
	@Status NVARCHAR(25) -- 'loginsuccess,loginerror,logout'
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
		SET NOCOUNT ON;

		DECLARE @ActiveSessionCounter INT,@UserID INT

		select @ActiveSessionCounter = ActiveSessionCounter, @UserID = UserID FROM prsystem.Users
		WHERE UserName = @UserName	

		IF @Status = 'loginsuccess'
		BEGIN
			UPDATE prsystem.Users
			SET LastLoggedinDateTime = GETDATE(),
					ActiveSessionCounter = ActiveSessionCounter + 1,
					LoginAttemptCount = 0
			WHERE UserName = @UserName

			INSERT INTO [prsystem].[UserAccessLog]
           ([UserID]
           ,[Action]
           ,[CreatedDateTime]
           ,[MachineIP])
			VALUES
           (@UserID
           ,'LOGIN'
           ,GETDATE()
           ,NULL)
		END
		ELSE IF @Status = 'loginerror'
		BEGIN
			UPDATE prsystem.Users
			SET LoginAttemptCount = LoginAttemptCount +1,
					LastLoginAttemptDateTime = GETDATE()
			WHERE UserName = @UserName
		END
		ELSE IF @Status = 'logout' AND @ActiveSessionCounter > 0
		BEGIN
			UPDATE prsystem.Users
			SET ActiveSessionCounter = ActiveSessionCounter - 1
			WHERE UserName = @UserName	

			INSERT INTO [prsystem].[UserAccessLog]
           ([UserID]
           ,[Action]
           ,[CreatedDateTime]
           ,[MachineIP])
			VALUES
           (@UserID
           ,'LOGOUT'
           ,GETDATE()
           ,NULL)
		END
		ELSE
		BEGIN
			RAISERROR ('Invalid value passed to the param @Status, Valid values are: loginsuccess,loginerror,logout',16,1)
		END

END

GO


