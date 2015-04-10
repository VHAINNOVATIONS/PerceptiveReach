
Given(/^I am on http:\/\/localhost:(\d+)\/$/) do |arg1|
visit('http://localhost:7003/')
end

When(/^I click on Individual "(.*?)" view$/) do |arg1|
 page.find('span',:text=> 'Individual View').click
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