Given(/^I navigate to the http:\/\/localhost:(\d+)\/$/) do |arg1|
  visit ('http://localhost:7003')
  expect(page).to have_content 'Description'
end

When(/^I Click on "(.*?)"$/) do |view|
  title = view
  page.find(:xpath, "//span[contains(text(),'#{title}')]").click 
end

When(/^I click on "(.*?)"$/) do |view|
  title = view
  page.find(:xpath, "//span[contains(text(),'#{title}')]").click 
end

Then(/^I should see the widget with list of Veterans$/) do
   expect(page).to have_content("Veteran Roster") # express the regexp above with the code you wish you had
end

When(/^I click on a Veteran's name "(.*?)"$/) do |arg1|
  click_link('Link Text')# express the regexp above with the code you wish you had
end

Then(/^I see Veteran emergency contact information "(.*?)"$/) do |arg1|
   expect(page).to have_content("Emergency Contact Information")# express the regexp above with the code you wish you had
end

When(/^I click on close on the "(.*?)" widget$/) do |arg1|
   # express the regexp above with the code you wish you had
end

Then(/^I should not see the widget "(.*?)" widget$/) do |arg1|
  expect(page).to have_no_content("Emergency Contact Information") # express the regexp above with the code you wish you had
end

# @Detail_PR-1268
When(/^I click on individual Veteran$/) do
   click_link('Link Text')# express the regexp above with the code you wish you had
end

Then(/^I should see Relationship "(.*?)" in emergency contact information$/) do
  expect(page).to have_content("Relationship") # express the regexp above with the code you wish you had
end

Then(/^I should see Phone in emergency contact information$/) do
  expect(page).to have_content("Phone") # express the regexp above with the code you wish you had
end

Then(/^I should see Alternate Phone in emergency contact information$/) do
  expect(page).to have_content("Alternate Phone")# express the regexp above with the code you wish you had
end

Then(/^I should see Address in emergency contact information$/) do
  expect(page).to have_content("Address") # express the regexp above with the code you wish you had
end

Then(/^I should see City in emergency contact information$/) do
  expect(page).to have_content("City")# express the regexp above with the code you wish you had
end

Then(/^I should see State in emergency contact information$/) do
  expect(page).to have_content("State")# express the regexp above with the code you wish you had
end

Then(/^I should see Zip code in emergency contact information$/) do
  expect(page).to have_content("Zip code")# express the regexp above with the code you wish you had
end

#@Drag_Widget_PR-1268
When(/^I click on the top bar of the "(.*?)" widget$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should be able to drag the "(.*?)" widget to anywhere in the page$/) do |arg1|
  source.drag_to("Individual Contact Information") # express the regexp above with the code you wish you had
end

#@Info_PR-1268

Then(/^I should see search function for Veteran's health record$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I type in the Veteran's name "(.*?)"$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see the Veteran's health record$/) do
  pending # express the regexp above with the code you wish you had
end

When(/^I Click on Individual Veteran View$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see a widget "(.*?)"$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see medications$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see appointments$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see problems$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see flags$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should be able to toggle categories of data or or off$/) do
  pending # express the regexp above with the code you wish you had
end

When(/^I Click on notifications$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see high risk veteran notification$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I click on high risk veteran notification$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see the direct message which highlights high risk veterans$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I click on notification for high risk veteran due to a trigger or event$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see details of high risk veteran$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see the navigation menu$/) do
  pending # express the regexp above with the code you wish you had
end

When(/^I click on  "(.*?)"$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see at risk veterans for the state facility OHIO$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I click on specific time frame$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see the at\-risk veterans for the specific time frame$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I select the previous month$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see the at\-risk veterans for the previous months$/) do
  pending # express the regexp above with the code you wish you had
end

When(/^I click on State View$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see a view that summarizes data for a specific state$/) do
  pending # express the regexp above with the code you wish you had
end

When(/^I click on VISN View$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see a view that summarizes data for a specific region$/) do
  pending # express the regexp above with the code you wish you had
end

When(/^I click on National View$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see a view that summarizes data on a National level$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see list of facility's for OHIO$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I select the data attributes$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see the groups of at\-risk Veterans filtered by data attributes$/) do
  pending # express the regexp above with the code you wish you had
end

When(/^I go to the Facility, State, VISN and National View$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see the widget "(.*?)"$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see the widget displaying information related to change in suicide$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see changes in suicide rates over time periods$/) do
  pending # express the regexp above with the code you wish you had
end

When(/^I click on Individual Veteran View$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see a drop down list with widget names$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I select the widgets I want to see on my customized dashboard$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I click Save$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see the widgets I selected appear on my customized dashboard$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see my default widgets$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I click on the top bar of widget (\d+)$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I drag the Widget to the left of the screen$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see the Widget placed on the left of the screen$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see the direct message which highlights high risk trigger or event$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I login as a Clinician$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see form that lists all of the data elements I can update in a patient's record$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I click on the drop down for widgets$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I select "(.*?)" widget$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I click save$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I click on the Facility View$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I see a widget "(.*?)"$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

When(/^I click on delete of "(.*?)"$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should not see the widget "(.*?)"$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

When(/^I click on a veteran "(.*?)"$/) do |arg1|
  page.fin('td',:text=> '000261537').click
end

Then(/^I should see the  widget with list of Medications "(.*?)" for "(.*?)"$/) do |arg1, arg2|
  expect(page).to have_content(arg1)
end

Then(/^I should see a list of active medication "(.*?)" in  the veteran medication widget$/) do |arg1|
  expect(page).to have_content(arg1)
end

Then(/^I should see "(.*?)" in the medication status widget$/) do |arg1|
  expect(page).to have_content(arg1)
end

Then(/^I should see "(.*?)" in the medication widget$/) do |arg1|
  expect(page).to have_content(arg1)
end

Then(/^I click on   "(.*?)" in the medication status widget$/) do |arg1|
  page.fin('a',:text=> 'View All').click
end

Then(/^I should see list of all medications$/) do
  expect(page).to have_content(arg1)
end

Then(/^I should see the  widget with list of Medications widget "(.*?)"$/) do |arg1|
  expect(page).to have_content(arg1)
end

Then(/^I should see "(.*?)"$/) do |arg1|
  expect(page).to have_content(arg1)
end

Given(/^I navigate to the "(.*?)"$/) do |arg1|
   visit ('http://localhost:7003')  # express the regexp above with the code you wish you had
   expect(page).to have_content 'Description'
end

When(/^the webpage loads$/) do
  expect(page).to have_content('National View') # express the regexp above with the code you wish you had
end

Then(/^I see the National View$/) do
 expect(page).to have_content('National View') # express the regexp above with the code you wish you had
end

Then(/^I click the National View$/) do
  page.find(:xpath, "/html/body/div[2]/div/ul/li[1]/a/span[1]").click# express the regexp above with the code you wish you had
end

Then(/^I see the State View$/) do
  expect(page).to have_content('State View') # express the regexp above with the code you wish you had
end

Then(/^I click the State View$/) do
 page.find(:xpath, "/html/body/div[2]/div/ul/li[2]/a/span[1]").click# express the regexp above with the code you wish you had
end

Then(/^I see the Facility View$/) do
  expect(page).to have_content('Facility View') # express the regexp above with the code you wish you had
end

Then(/^I click the Facility View$/) do
  page.find(:xpath, "/html/body/div[2]/div/ul/li[3]/a/span[1]").click # express the regexp above with the code you wish you had
end

Then(/^I see the Individual View$/) do
  expect(page).to have_content('Individual View') # express the regexp above with the code you wish you had
end

Then(/^I click the "(.*?)"$/) do |view|
  title = view
  page.find(:xpath, "//span[contains(text(),'#{title}')]").click 
end

Then(/^I should see the widget with roster of high risk Veterans "(.*?)"$/) do |
arg1|
  #pending # express the regexp above with the code you wish you had
   expect(page).to have_content(arg1)
end

When(/^I click on high risk Individual veteran "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  page.find(arg1).click
end

Then(/^I should see high risk veteran contact information "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end

Then(/^I should see the name "(.*?)"of high risk veteran$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end

Then(/^I should see the ssn "(.*?)"of high risk veteran$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end

Then(/^I should see the phone "(.*?)"of high risk veteran$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end

Then(/^I should see the dft "(.*?)"of high risk veteran$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end

Then(/^I should see the date updated "(.*?)"of high risk veteran$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end

Then(/^I should see the srl "(.*?)"of high risk veteran$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end

Then(/^I should see the last va visit "(.*?)"of high risk veteran$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end

When(/^I select the filter "(.*?)"for newly identified high risk veterans for past (\d+) days$/) do |arg1, arg2|
  #pending # express the regexp above with the code you wish you had
  page.select(arg1)
end

Then(/^I should see list of newly identified high risk veterans for past (\d+) days$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
    expect(page).to have_content(arg1)
end

When(/^I click on a high risk veteran "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  page.find(arg1).click
end

Then(/^I should see high risk veteran contact information for "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
     expect(page).to have_content(arg1)
end 

Then(/^I should see the widget with list of Veterans "(.*?)"$/) do |arg1|
  expect(page).to have_content(arg1)
end

When(/^I click on Individual veteran "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  page.find(arg1).click
end

Then(/^I should see veteran contact information "(.*?)"$/) do |arg1|
  expect(page).to have_content(arg1)
end

Then(/^I should see  SSN "(.*?)" in veteran contact information$/) do |arg1|
  expect(page).to have_content(arg1)
end
Then(/^I should see AP "(.*?)" in veteran contact information$/) do |arg1|
  expect(page).to have_content(arg1)
end

Then(/^I should see Address "(.*?)" in veteran contact information$/) do |arg1|
  expect(page).to have_content(arg1)
end

Then(/^I should see city "(.*?)" in veteran contact information$/) do |arg1|
  expect(page).to have_content(arg1)
end

Then(/^I should see state "(.*?)" in veteran contact information$/) do |arg1|
  expect(page).to have_content(arg1)
end

Then(/^I should see zcode "(.*?)" in veteran contact information$/) do |arg1|
  expect(page).to have_content(arg1)
end


Then(/^I should see Individual veteran "(.*?)"$/) do |arg1|
  expect(page).to have_content(arg1)
end


Then(/^I should see the roster widget with list of Veterans "(.*?)"$/) do |arg1|

 #press the regexp above with the code you wish you had
 expect(page).to have_content(arg1)
end

Then(/^I should see a column "(.*?)" in  the veterans roster widget$/) do |arg1|

 # pending # express the regexp above with the code you wish you had
 #expect(page).to have_content(arg1)
 expect(page).to have_content(arg1)
end

Then(/^I should see "(.*?)" in the outreach status column$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
  end
  
Then(/^I should see not contacted "(.*?)" in the outreach status dropdown$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end

Then(/^I should see outreach initiated "(.*?)" in the outreach status column$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end

Then(/^I should see outreach attempted "(.*?)" in the outreach status column$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end

Then(/^I should see service refused "(.*?)" in the outreach status column$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end

Then(/^I should see no additional outreach "(.*?)" in the outreach status column$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end
Given(/^I am on http:\/\/localhost:(\d+)\/$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  visit ('http://localhost:7003')
  expect(page).to have_content 'Description'
end

When(/^I click on edit of widget (\d+)$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  page.find(:xpath, "html/body/div[2]/div/div/div/div[2]/div[1]/div/div[1]/h3/span[4]").click
end

When(/^I change the title on pop\-up to "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  fill_in('widgetTitle',:with=>'Example')
end

When(/^I click on ok button$/) do
  #pending # express the regexp above with the code you wish you had
  page.find(:xpath,"html/body/div[4]/div/div/div[3]/button[2]").click
end

Then(/^I should see the widget (\d+) title change to "(.*?)"$/) do |arg1, arg2|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg2)
end


When(/^I click on "(.*?)"$/) do |arg1|
  page.find(:xpath,"html/body/div[2]/div/ul/li[1]/a/span[1]").click
end

Then(/^I should see the "(.*?)" on page for National view$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end


When(/^I click on individual "(.*?)"$/) do |arg1|
  page.find(:xpath,"html/body/div[2]/div/ul/li[4]/a/span[1]").click
  
  
end

Then(/^I should see the widget "(.*?)" on page for Individual view$/) do |arg1|
  expect(page).to have_content(arg1)
end


#edit widget
When(/^I click on individual view of "(.*?)"$/) do |arg1|
  page.find(:xpath,"html/body/div[2]/div/ul/li[4]/a/span[1]").click
end

When(/^I click on edit of "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  page.find(:xpath,"html/body/div[2]/div/div/div/div[2]/div[1]/div/div[1]/h3/span[4]").click
end

When(/^I click on "(.*?)" button$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  #page.find(:xpath,"html/body/div[4]/div/div/div[3]/button[2]").click
  click_button("OK")
end



When(/^I click on save button$/) do
  page.find(:xpath,"html/body/div[2]/div/div/div/div[1]/button[2]").click
end


#delete widget

When(/^I click on delete of widget (\d+)$/) do |arg1|
sleep(2)
  page.find(:xpath,"html/body/div[2]/div/div/div/div[2]/div[1]/div/div[1]/h3/span[3]").click
end

When(/^I click on save changes$/) do
  #pending # express the regexp above with the code you wish you had
  sleep(2)
  page.find(:xpath,"html/body/div[2]/div/div/div/div[1]/button[2]").click
end


Then(/^i should not see the widget "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_no_content(arg1)
end