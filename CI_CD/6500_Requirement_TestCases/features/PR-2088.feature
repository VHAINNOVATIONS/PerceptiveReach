Feature: As a system administrator, I want the application to reject user login attempts that have the attributes(username or password with more than 32 characters) listed in the acceptance criteria of this story PR-2088

Scenario: I open a web browser and navigate to http://localhost:7003/ to put the  username or password with more than 32 characters 

Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
When I put in "email" field as "vaphsfequia@wlkemufpqihgdr5kneoid"
And I put in "password" field as "FeAn#011819"
And I click on check box "checky"
And I click on "Login" button
And I should see "Username/Password should be less than or equal to 32 characters."