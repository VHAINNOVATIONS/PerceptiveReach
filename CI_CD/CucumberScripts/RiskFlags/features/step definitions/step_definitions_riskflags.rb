Given(/^I navigate to the http:\/\/localhost:(\d+)\/$/) do |arg1|
   visit ('http://localhost:7003') # express the regexp above with the code you wish you had
end

Then(/^I click on Add a Widget$/) do
  click_button("Add a Widget") # express the regexp above with the code you wish you had
end

Then(/^I select Veteran's Patient Risk Flags$/) do
  click_button("Veteran's Patient Risk Flags")# express the regexp above with the code you wish you had
end

Then(/^I should see the widget "(.*?)"$/) do |arg1|
  expect(page).to have_content("Veteran's Patient Risk Flags") # express the regexp above with the code you wish you had
end

#close_widget_PR-1406
When(/^I click on close on the "(.*?)" widget$/) do |widgetname|
  title = widgetname
  page.find(:xpath, "//span[normalize-space(text())='#{title}']/following-sibling::span[2]").click # express the regexp above with the code you wish you had
end

When(/^I click on save changes$/) do
   click_button("save changes") # express the regexp above with the code you wish you had
end

Then(/^I should not see the widget "(.*?)" widget$/) do |arg1|
   expect(page).to have_no_content("Veteran's Patient Risk Flags") # express the regexp above with the code you wish you had
end


#detail_widget_PR-1406
When(/^I click on Individual Veteran View$/) do
  (/^I click on the "(.*?)"$/) do |view|
title=viewpage.find(:xpath, "//span[contains(text(),'#{title}')]").click 
end
 # express the regexp above with the code you wish you had
end

Then(/^I should see active flags displayed on the screen$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see inactive flags displayed on the screen$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I toggle among the active flags$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I toggle among the inactive flags$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I toggle among Class I flags$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I toggle among Class II flags$/) do
  pending # express the regexp above with the code you wish you had
end
