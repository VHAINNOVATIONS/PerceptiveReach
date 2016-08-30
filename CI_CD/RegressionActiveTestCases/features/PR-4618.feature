Feature: As a Dashboard user, I want the content of the old CDS widget to provide guidance specific for the September 2016 deployment so I know what actions I take with my assigned patients.

Scenario: I open a web browser and use http://localhost:7003/ to see the Veteran's Outreach Status in veteran roaster widget
 Given I navigate to the http://localhost:7003/
 Then I should see "Perceptive Reach"
 Then I put in "email" field as "TESTER252"
 Then I put in "password" field as "M2n#f5s4f7"
 And I click on check box "checky"
 And I click on "Login" button
 And I click on "Individual View"
 Then I should see "What is Perceptive Reach" widget
 Then I should see "Perceptive Reach uses predictive (statistical) modeling to identify Veterans at risk" in the About Perceptive Reach widget content
 Then I should see "http://vaww.mirecc.va.gov/reachvet" in the About Perceptive Reach widget
