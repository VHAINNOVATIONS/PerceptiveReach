Given(/^I navigate to the http:\/\/localhost:(\d+)\/$/) do |arg1|
  visit ('http://localhost:7003')
  expect(page).to have_content 'Description' #load IRDS and wait for some content to appear
end

When(/^I click on "(.*?)"$/) do |view|
  title = view
  page.find(:xpath, "//span[contains(text(),'#{title}')]").click 
end

When(/^I Click on "(.*?)"$/) do |view|
  title = view
  page.find(:xpath, "//span[contains(text(),'#{title}')]").click #find and click National/State/Facility/Individual View tabe
end

When(/^I click on close on the "(.*?)" widget$/) do |widgetname|
  title = widgetname
  page.find(:xpath, "//span[normalize-space(text())='#{title}']/following-sibling::span[2]").click #find widget and click close button
end

When(/^I click on edit on the "(.*?)" widget$/) do |widgetname|
  title = widgetname
  page.find(:xpath, "//span[normalize-space(text())='#{title}']/following-sibling::span[3]").click #find widget and click edit button
end

When(/^I click on save changes$/) do
   click_button("save changes") # express the regexp above with the code you wish you had
end

#Ambiguous match for When/Then - commenting out Then
#Then(/^I click the "(.*?)"$/) do |view|
#  title = view
#  page.find(:xpath, "//span[contains(text(),'#{title}')]").click #find and click National/State/Facility/Individual View tabe
#end
#
#Then(/^I click on close on the "(.*?)" widget$/) do |widgetname|
#  title = widgetname
#  page.find(:xpath, "//span[normalize-space(text())='#{title}']/following-sibling::span[2]").click #find widget and click close button
#end
#
#Then(/^I click on edit on the "(.*?)" widget$/) do |widgetname|
#  title = widgetname
#  page.find(:xpath, "//span[normalize-space(text())='#{title}']/following-sibling::span[3]").click #find widget and click edit button
#end
#
#Then(/^I click on save changes$/) do
#   click_button("save changes") # express the regexp above with the code you wish you had
#end
#
#