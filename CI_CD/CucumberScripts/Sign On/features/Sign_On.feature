Feature: As a Dashboard User, I want to log in to the Perceptive Reach application. @PR-349
   
@sign_in_PR-349

Scenario: I open a web browser and navigate to http://localhost:7003/, where I can sign in to the PR Dashboard
Given I navigate to the http://localhost:7003/
Then I should see the Sign In page
Then I put in amy VA username
Then I put in my VA password
And I click on Sign In 
Then I should be able to see my Home page