Given(/^I navigate to the http:\/\/localhost:(\d+)\/$/) do |arg1|
   visit ('http://localhost:7003') # express the regexp above with the code you wish you had
end

When(/^I click on Individual View$/) do
  page.find('span',:text=> 'Individual View').click# express the regexp above with the code you wish you had
end

Then(/^I should see the "(.*?)" widget$/) do |arg1|
  expect(page).to have_content("Pain Level") # express the regexp above with the code you wish you had
end