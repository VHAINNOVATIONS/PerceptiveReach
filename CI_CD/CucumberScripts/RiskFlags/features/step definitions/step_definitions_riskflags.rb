Given(/^I navigate to the http:\/\/localhost:(\d+)\/$/) do |arg1|
   visit ('http://localhost:7003') # express the regexp above with the code you wish you had
end

Then(/^I click on Add a Widget$/) do
  click_button("Add a Widget") # express the regexp above with the code you wish you had
end

Then(/^I select Veteran's Patient Risk Flags$/) do
  click_button("Veteran's Patient Risk Flags")# express the regexp above with the code you wish you had
end

Then(/^I should see the widget "(.*?)"$/) do |arg1|
  expect(page).to have_content("Veteran's Patient Risk Flags") # express the regexp above with the code you wish you had
end

