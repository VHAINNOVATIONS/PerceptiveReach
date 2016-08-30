Feature: As a user, I want to have a 128 character limit in the free text fields. PR-3552

Scenario: I open a web browser and navigate to http://localhost:7003/ where I can view Consolidated Surveillance View widgets
Given I navigate to the http://localhost:7003/
Then I should see "Perceptive Reach"
When I put in "email" field as "TESTER_3522"
And I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
When I click on "Individual View"
Then I click on the Default Widgets button
Then I should see "Data Entry" widget
Then I put in "hrText" field as "The patient has coronary artery disease, hypertension, hypercholesterolemia, COPD and tobacco abuse. He reports that doing well. He did have some more knee pain for a few weeks, but this has resolved."
And I click on "Logout" button