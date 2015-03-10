Given(/^I navigate to the http:\/\/localhost:(\d+)\/$/) do |arg1|
  visit ('http://localhost:7003')
  expect(page).to have_content 'Description' #load IRDS and wait for some content to appear
end

When(/^I click on "(.*?)"$/) do |view|
  title = view
  page.find(:xpath, "//span[contains(text(),'#{title}')]").click #find and click National/State/Facility/Individual View tabe
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

When(/^I click on "(.*?)" button$/) do |buttonname|
  find_button(buttonname).click 
  #click_button(buttonname) exact match
end

Then(/^I should see the "(.*?)" widget$/) do |pagecontent|
  expect(page).to have_content(pagecontent)
end

Then(/^I should not see the "(.*?)" widget$/) do |pagecontent|
  expect(page).to have_no_content(pagecontent)
end

And(/^I should see "(.*?)"$/) do |pagecontent|
  expect(page).to have_no_content(pagecontent)
end

And(/^I should see "(.*?)" column$/) do |pagecontent|
  expect(page).to have_content(pagecontent)
end

And(/^I should see "(.*?)" widget$/) do |pagecontent|
  expect(page).to have_no_content(pagecontent)
end

Then(/^I should see my default widgets$/) do
  #sql query get the default widgets for the user profile
  expect(page).to have_content'Veteran Roster by VAMC'
end
