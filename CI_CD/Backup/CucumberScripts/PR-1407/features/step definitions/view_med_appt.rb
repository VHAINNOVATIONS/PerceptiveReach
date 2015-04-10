Given(/^I navigate to the http:\/\/localhost:(\d+)\/$/) do |arg1|
   visit ('http://localhost:7003') # express the regexp above with the code you wish you had
end

When(/^I click on Individual View$/) do
    page.find('span',:text=> 'Individual View').click # express the regexp above with the code you wish you had
end

Then(/^I should see the "(.*?)" widget$/) do |arg1|
  expect(page).to have_content("Medical Appointments") # express the regexp above with the code you wish you had
end

Then(/^I should also see "(.*?)"$/) do |arg1|
   expect(page).to have_content("Upcoming Appointments") # express the regexp above with the code you wish you had
end

Then(/^I should be able to click on "(.*?)"$/) do |arg1|
  page.find('span',:text=> 'Upcoming Appointments').click# express the regexp above with the code you wish you had
end

Then(/^I should be able to see all "(.*?)"$/) do |arg1|
   expect(page).to have_content("Upcoming Appointments") # express the regexp above with the code you wish you had
end

Then(/^I should click on "(.*?)"$/) do |arg1|
  page.find('span',:text=> 'Previously Completed Appointments').click# express the regexp above with the code you wish you had
end

Then(/^I should be able to see "(.*?)"$/) do |arg1|
  expect(page).to have_content("Previously Completed Appointments")# express the regexp above with the code you wish you had
end