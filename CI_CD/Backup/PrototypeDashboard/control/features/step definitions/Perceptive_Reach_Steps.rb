Given(/^I navigate to the http:\/\/localhost:(\d+)\/$/) do |arg1|
  visit ('http://localhost:7003')
  expect(page).to have_content 'Description' #load IRDS and wait for some content to appear
end

When(/^I click on the VAMC dropdown$/) do
  find(:xpath, "//select[@ng-model='result.dataModel.vamc']").click  
end

When(/^I choose "(.*?)" as VAMC$/) do |arg1|
  find(:xpath, '//select[@ng-model="result.dataModel.vamc"]/option[contains(text(),"(V01) (405) White River Junction, VT")]').click
  #find(:xpath, '//select[@ng-model="result.dataModel.vamc"]/option[2]').click
end


When(/^I select "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  find(:xpath, '//*[@id="sampleVet"]/tbody/tr[1]').click

end

When(/^I click on "(.*?)"$/) do |view|
  title = view
  page.find(:xpath, "//span[contains(text(),'#{title}')]").click #find and click National/State/Facility/Individual View tabe
  #page.save_screenshot('screenshot1.png')
end

When(/^I Click on "(.*?)"$/) do |view|
  title = view
  page.find(:xpath, "//span[contains(text(),'#{title}')]").click #find and click National/State/Facility/Individual View tabe
  #page.save_screenshot('screenshot2.png')
end

When(/^I click on close on the "(.*?)" widget$/) do |widgetname|
  title = widgetname
  page.find(:xpath, "//span[normalize-space(text())='#{title}']/following-sibling::span[2]").click #find widget and click close button
end

When(/^I click on edit on the "(.*?)" widget$/) do |widgetname|
  title = widgetname
  page.find(:xpath, "//span[normalize-space(text())='#{title}']/following-sibling::span[3]").click #find widget and click edit button
end

When(/^I click on "(.*?)" button$/) do |buttonname|
  find_button(buttonname).click 
  #click_button(buttonname) exact match
end

Then(/^I click the Add a Widget button$/) do
  find_button('Add a Widget').click 
  find_button('Add a Widget').click 
end

Then(/^I click on the Add a widget button$/) do
  #pending # express the regexp above with the code you wish you had
  find_button('Add a Widget').click
  find_button('Add a Widget').click
end

When(/^I check "(.*?)" and "(.*?)" orders$/) do |arg1, arg2|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end

Then(/^I should see the "(.*?)" widget$/) do |pagecontent|
  expect(page).to have_content(pagecontent)
end

Then(/^I should see "(.*?)" widget$/) do |pagecontent|
  expect(page).to have_content(pagecontent)
end

Then(/^I should not see the "(.*?)" widget$/) do |pagecontent|
  expect(page).to have_no_content(pagecontent)
end

And(/^I should see "(.*?)"$/) do |pagecontent|
  expect(page).to have_content(pagecontent)
end

And(/^I should see "(.*?)" column$/) do |pagecontent|
  #page.save_screenshot('screenshot3.png')
  expect(page).to have_content(pagecontent)
end

Then(/^I should see my default widgets$/) do
  #sql query get the default widgets for the user profile
  expect(page).to have_content'Veteran Roster by VAMC'
end

And(/^I add the "(.*?)" widget$/) do |widgetname|
  find_button(widgetname).click 
end

And(/^I change the title to "(.*?)" on the pop\-up$/) do |widgetname|
  fill_in('widgetTitle',:with=>widgetname)
end

And(/^I should see "(.*?)" option in the dropdown$/) do |dropdownoption|
  page.find(:xpath, "//*[@id='vet_652427-button']/span[1]").click #click the dropdown - vet_#-button need to figure param for #value
  expect(page).to have_content(dropdownoption)
end

Then(/^I put in my VA username$/) do
  fill_in('Username', :with => 'VA Username') # express the regexp above with the code you wish you had
end

Then(/^I put in my VA password$/) do
  fill_in('Password', :with => 'VA Password')# express the regexp above with the code you wish you had
end

#pending steps
Then(/^I should see search function for Veteran's health record$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I type in the Veteran's name "(.*?)"$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see the Veteran's health record$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should be able to toggle categories of data or or off$/) do
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

Then(/^I should see a view that summarizes data for a specific state$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see a view that summarizes data for a specific region$/) do
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

Then(/^I drag the "(.*?)" widget to the top left of the screen$/) do |arg1|
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

Then(/^I click on a Veteran's name$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see Relationship "(.*?)" in emergency contact information$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see Phone in emergency contact information$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see Alternate Phone in emergency contact information$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see Address in emergency contact information$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see City in emergency contact information$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see State in emergency contact information$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see Zip code in emergency contact information$/) do
  pending # express the regexp above with the code you wish you had
end

When(/^I click on the top bar of the "(.*?)" widget$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should be able to drag the "(.*?)" widget to anywhere on the page$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see a column "(.*?)" in  the veterans roster widget$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see not contacted "(.*?)" in the outreach status dropdown$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see outreach initiated "(.*?)" in the outreach status column$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see outreach attempted "(.*?)" in the outreach status column$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see service refused "(.*?)" in the outreach status column$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see no additional outreach "(.*?)" in the outreach status column$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

When(/^I click on edit on "(.*?)" widget$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end


When(/^I click on save button$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see the widget (\d+) title change to "(.*?)"$/) do |arg1, arg2|
  pending # express the regexp above with the code you wish you had
end
