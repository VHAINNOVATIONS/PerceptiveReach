Given(/^I am on http:\/\/localhost:(\d+)\/$/) do |arg1|
  visit ('http://localhost:7003') # express the regexp above with the code you wish you had
end

When(/^I click on Individual view$/) do
  .find(:xpath, "/html/body/div[2]/div/ul/li[4]/a/span[1]").click # express the regexp above with the code you wish you had
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

When(/^I click on save changes$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should not see the widget "(.*?)" widget$/) do |arg1|
  expect(page).to have_no_content("Emergency Contact Information") # express the regexp above with the code you wish you had
end
