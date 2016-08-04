Feature: When the outreach status loads, if there is nothing selected, it loads as a null. An error is thrown into the background. Currently the error is masked. When it comes to sorting, this error causes the sort to not work, which needs to be resolved for the outreach status to work.

Scenario: I open a web browser and use http://localhost:7003/ to see when no Outreach Status is selected, the drop down menu displays a blank, rather than a null value.
 Given I navigate to the http://localhost:7003/
 Then I should see "Perceptive Reach"
 Then I put in "email" field as "TESTER252"
 Then I put in "password" field as "M2n#f5s4f7"
 And I click on check box "checky"
 And I click on "Login" button
 And I click on "Individual View"
 Then I should see the "Patient Roster by VAMC" widget
 And I should see "Outreach Status" column
 And I should not see "NULL" in the Outreach Status column
 And I click on "Logout" button
