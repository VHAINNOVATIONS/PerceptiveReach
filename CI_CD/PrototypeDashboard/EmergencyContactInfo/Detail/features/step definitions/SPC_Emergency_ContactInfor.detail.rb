Given(/^I am on http:\/\/localhost:(\d+)\/$/) do |arg1|
  visit ('http://localhost:7003') # express the regexp above with the code you wish you had
end

When(/^I click on Individual view$/) do
  page.find(:xpath, "/html/body/div[2]/div/ul/li[4]/a/span[1]").click # express the regexp above with the code you wish you had
end

Then(/^I should see the widget with list of Veterans$/) do
 expect(page).to have_content("Veteran Roster") # express the regexp above with the code you wish you had
end

When(/^I click on individual Veteran$/) do
   click_link('Link Text')# express the regexp above with the code you wish you had
end

Then(/^I see Veteran emergency contact information "(.*?)"$/) do |arg1|
  expect(page).to have_content("Emergency Contact Information") # express the regexp above with the code you wish you had
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