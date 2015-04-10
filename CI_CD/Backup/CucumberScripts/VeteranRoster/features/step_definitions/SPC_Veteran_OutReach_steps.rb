Given(/^I am on http:\/\/localhost:(\d+)\/$/) do |arg1|
  
  visit('http://localhost:7003/')
end

When(/^I click on Individual "(.*?)" view$/) do |arg1|
 #page.find('span',:text=> 'Individual View').click
page.find(:xpath, "//span[contains(text(),'Individual View')]").click
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