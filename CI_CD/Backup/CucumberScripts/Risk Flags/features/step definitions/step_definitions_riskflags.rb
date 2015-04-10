Given(/^I navigate to the http:\/\/localhost:(\d+)\/$/) do |arg1|
  visit ('http://localhost:7003') # express the regexp above with the code you wish you had
end

When(/^I click on "(.*?)"$/) do |arg1|
   page.find('span',:text=> 'Individual View').click # express the regexp above with the code you wish you had
end

Then(/^I should see the widget "(.*?)"$/) do |arg1|
  expect(page).to have_content("Veteran's Patient Risk Flags") # express the regexp above with the code you wish you had
end

#close_widget_PR-1406
When(/^I click on close on the "(.*?)" widget$/) do |arg1|
   title = widgetname page.find(:xpath, "//span[normalize-space(text())='#{title}']/following-sibling::span[2]").click # express the regexp above with the code you wish you had
end

When(/^I click on save changes$/) do
   click_button("save changes") # express the regexp above with the code you wish you had
end

Then(/^I should not see the widget "(.*?)" widget$/) do |arg1|
   expect(page).to have_content("Veteran's Patient Risk Flags")# express the regexp above with the code you wish you had
end

#detail_widget_PR-1406
Then(/^I should see active flags displayed on the screen$/) do
    expect(page).to have_content("Active Flags") # express the regexp above with the code you wish you had
end

Then(/^I should see inactive flags displayed on the screen$/) do
    expect(page).to have_content("Inactive Flags") # express the regexp above with the code you wish you had
end

Then(/^I click on the active flags$/) do
  click_button("Active Flags") # express the regexp above with the code you wish you had
end

Then(/^I just see active flags$/) do
 expect(page).to have_content("Active Flags") # express the regexp above with the code you wish you had
end

Then(/^I click on the inactive flags$/) do
  click_button("Inactive Flags") # express the regexp above with the code you wish you had
end

Then(/^I see just inactive flags$/) do
  expect(page).to have_content("Inactive Flags")# express the regexp above with the code you wish you had
end

Then(/^I click on Class I flags$/) do
click_button("Class I Flags") # express the regexp above with the code you wish you had
end

Then(/^I see just Class I flags$/) do
  expect(page).to have_content("Class I Flags") # express the regexp above with the code you wish you had
end

Then(/^I click among Class II flags$/) do
 click_button("Class II Flags") # express the regexp above with the code you wish you had
end

Then(/^I see just Class II flags$/) do
 expect(page).to have_content("Class II Flags")# express the regexp above with the code you wish you had
end
