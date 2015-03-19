Given(/^I navigate to the http:\/\/localhost:(\d+)\/$/) do |arg1|
  visit ('http://localhost:7003')# express the regexp above with the code you wish you had
end

When(/^I click on Individual View$/) do
 page.find('span',:text=> 'Individual View').click # express the regexp above with the code you wish you had
end

Then(/^I should see the "(.*?)" widget$/) do |arg1|
   expect(page).to have_content("Veteran's Medication") # express the regexp above with the code you wish you had
end

Then(/^I should also see "(.*?)"$/) do |arg1|
   expect(page).to have_content("Name of Medication") # express the regexp above with the code you wish you had
end

Then(/^I should be able to click on "(.*?)"$/) do |arg1|
  page.find('span',:text=> 'Medication Orders').click # express the regexp above with the code you wish you had
end

Then(/^I should be able to see "(.*?)" and "(.*?)"$/) do |arg1, arg2|
  expect(page).to have_content("Inactive Orders")# express the regexp above with the code you wish you had
end

Then(/^I should be able to see all "(.*?)"$/) do |arg1|
 expect(page).to have_content("Active Orders")# express the regexp above with the code you wish you had
end
