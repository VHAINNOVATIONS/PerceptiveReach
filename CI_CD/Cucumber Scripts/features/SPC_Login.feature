Feature: As a SPC I want Login dashboard as a msmith

@SPC_User_msmith
Scenario: I open a web browser and see the SPC dashboard page for SPC User

Given I navigate to the http://localhost:7003/			
When I enter email field "email" as "msmith"
And  I enter password field "password" as "Password1"
And I click on login "Login" button
	Then I should see the login page for SPC User "Mark Smith"
And I click on the User "Mark Smith"
     Then I should see  "Mark Smith - VAMC"
