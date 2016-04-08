
Given(/^I am on http:\/\/localhost:(\d+)\/$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  visit('http://localhost:7003/')
end

When(/^I click on Individual view$/) do
  page.find(:xpath, "//span[contains(text(),'Individual View')]").click
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