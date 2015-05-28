USE [Reach_Dev]
GO

IF NOT EXISTS(SELECT TOP 1 1 FROM INFORMATION_SCHEMA.ROUTINES WHERE SPECIFIC_NAME = 'sp_GetUser' AND SPECIFIC_SCHEMA = 'prsystem')
        EXEC('CREATE PROCEDURE [prsystem].[sp_GetUser] as select 1 as one')
GO
ALTER PROCEDURE [prsystem].[sp_GetUser]
	@UserName nvarchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @IsAccountLocked Bit,@IsActive Bit,
	@ActiveSessionCounter int, @UserRole int, 
	@UserID Int,@LastLoginAttemptDateTime Datetime,
	@LastLoggedInDateTime DateTime, @CreatedDateTime Datetime

	SELECT @UserID = UserId, 
	@IsAccountLocked = IsAccountLocked,
	@ActiveSessionCounter = ActiveSessionCounter,
	@UserRole = UserRole,
	@LastLoginAttemptDateTime = LastLoginAttemptDateTime,
	@CreatedDateTime = CreatedDateTime,
	@LastLoggedInDateTime = LastLoggedinDateTime
	FROM prsystem.USERS 
	WHERE UserName = @UserName

	IF @UserID is not null
	BEGIN

		IF @IsAccountLocked = 1 AND DATEDIFF(HOUR, @LastLoginAttemptDateTime, GetDate()) > 24 
		BEGIN
			--Unlock the account
			UPDATE prsystem.Users
			SET LoginAttemptCount = 0
			WHERE UserName = @UserName
		END
		ELSE IF @IsAccountLocked = 1
		BEGIN
			RAISERROR ('Account locked, Please contact system admin.',16,1)
			RETURN
		END
		ELSE IF @IsActive = 0
		BEGIN
			RAISERROR ('Account is disabled due to inactivity.',16,1)
			RETURN
		END
		ELSE IF (@ActiveSessionCounter >= 3 AND @UserRole = 5) OR (@ActiveSessionCounter >= 1 AND @UserRole <> 5)
		BEGIN
			RAISERROR ('Max number of sessions reached, Please log out from your active sessions.',16,1)
			RETURN
		End

		IF(DATEDIFF(DAY,ISNULL(@LastLoggedInDateTime,@CreatedDateTime),GETDATE()) > 30)
		BEGIN
			--Deactivate account
			UPDATE prsystem.Users
			SET isActive = 0
			WHERE UserName = @UserName
			RAISERROR ('Account is disabled due to inactivity, Contact system admin.',16,1)
			RETURN
		END

		SELECT u.UserID, u.UserName, u.FirstName, u.LastName, u.UserStateLocation, u.UserHomeFacility, u.UserDomain, u.isActive, r.RoleCode AS UserRole, r.Individual_View_Access, r.Facility_View_Access, r.VISN_State_Reg_View_Access, r.Analytics_Reporting_Access, r.System_Admin_Access, u.UserDashboardID, d.DashboardData 
		FROM prsystem.Users u INNER JOIN prsystem.UserRole r ON u.UserRole = r.RoleID 
		LEFT JOIN prsystem.UserDashboard d ON u.UserDashboardID = d.DashboardID 
		INNER JOIN dbo.Ref_VAMC v ON u.UserHomeFacility = v.STA3N 
		WHERE UserName = @UserName
		 
	END
	ELSE
	BEGIN
		RAISERROR ('User not registered/Invalid user name',16,1)
		RETURN
	END

END

GO


