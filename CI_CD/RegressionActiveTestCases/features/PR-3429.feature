PR-3429-3434 As a clinical care team member, I want to click a �Next� button once I have selected all the conditions I think are present. 

Scenario: I open a web browser and navigate to http://localhost:7001/ where I can view CDS Questionnaire widget and select conditions and follow up Questions
Given I navigate to the http://localhost:7001/
Then I should see "Perceptive Reach"
When I put in "email" field as "TESTER254"
And I put in "password" field as "M1n@h3s4f9"
And I click on check box "checky"
And I click on "Login" button
And I click on "Survellience" View 
And I click on "CDSQuestionnaire" Widget 
Then I should see "CDS Questionnaire" Wiget
And I should see "Alcohol Use Disorder"
And I click on check box "checky"
And I should see "Antidepressants"
And I click on check box "checky"
And I click on "Next" button
Then I should see "Questions"
And I should see "1. Has there been a suicide attempt within the past year?"
And I should see "2.Have there ever been two or more suicide attempts?"
And I should see "3. Is there a diagnosis of a mood or anxiety disorder"
And I should select "Yes"
And I should And I click on "Next" button
Then I should see  "Treatment(s):"
And I should see "1. Cognitive therapy for suicide prevention"
And I should see "2. Problem Solving Therapy"
And I should see "3. Cognitive therapy for suicide prevention"
And I click on "Logout" button