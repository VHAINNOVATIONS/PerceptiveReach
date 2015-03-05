
Given(/^I am on http:\/\/irdsdev\.vaftl\.us:(\d+)\/$/) do |arg1|
  visit('http://irdsdev.vaftl.us:7003/')
end

When(/^I click on Individual "(.*?)" view$/) do |arg1|
 #page.find.span(:text,'Individual View').click
 page.find('span',:text=> 'Individual View').click
end

Then(/^I should see the roster widget with list of Veterans "(.*?)"$/) do |arg1|

  pending # express the regexp above with the code you wish you had
end

Then(/^I should see a column "(.*?)" in  the veterans roster widget$/) do |arg1|

  pending # express the regexp above with the code you wish you had
end

Then(/^I should see "(.*?)" in the outreach status column$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end