Feature: As any IRDS user, I want to be automatically logged out of the application after 15 minutes of inactivity. PR-2084	

Scenario: I open a web browser and navigate to http://localhost:7003/ where I get an I am automatically logged out of the application after 15 minutes of inactivity.
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
Then I should see "If you have any further questions regarding Perceptive Reach and associated resources, Please contact the Help Desk at VAPerceptiveReachSupport@va.gov"
When I put in "email" field as "TESTER254"
And I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
And I click on "Surveillance View"
Then I should wait for inactivity
Then I should see "Perceptive Reach"
Then I should see "If you have any further questions regarding Perceptive Reach and associated resources, Please contact the Help Desk at VAPerceptiveReachSupport@va.gov"