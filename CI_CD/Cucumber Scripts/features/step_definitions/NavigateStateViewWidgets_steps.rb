Given(/^I navigate to the http:\/\/localhost:(\d+)\/$/) do |arg1|
visit ('http://localhost:7003') # express the regexp above with the code you wish you had
end

When(/^the webpage loads/) do
  expect(page).to have_content('State View')  # express the regexp above with the code you wish you had
end

Then(/^I expect to see the widgets in the State View$/) do
   expect(page).to have_content('Widget 1')# express the regexp above with the code you wish you had
   expect(page).to have_content('Widget 2')
   expect(page).to have_content('Widget 3')
   expect(page).to have_content('Widget 4')
   expect(page).to have_content('Widget 5')# express the regexp above with the code you wish you had
end

Then(/^I click Default Widget$/) do
  click_button('Default Widgets') # express the regexp above with the code you wish you had
end

Then(/^I see the default widgets$/) do
  expect(page).to have_content('Widget 1')
   expect(page).to have_content('Widget 2')
   expect(page).to have_content('Widget 3')
   expect(page).to have_content('Widget 4')
   expect(page).to have_content('Widget 5')# express the regexp above with the code you wish you had
end

Then(/^I click Clear$/) do
 click_button('Clear') # express the regexp above with the code you wish you had
end

Then(/^I expect to see all widgets have been cleared$/) do
 expect(page).to have_no_content('Widget 1') # express the regexp above with the code you wish you had
end

Then(/^I click save changes$/) do
  expect(page).to have_no_content('Widget 1') # express the regexp above with the code you wish you had
end

Then(/^I expect to see the Widgets in the order I placed them$/) do
   expect(page).to have_content('Widget 1')
   expect(page).to have_content('Widget 2')
   expect(page).to have_content('Widget 3')
   expect(page).to have_content('Widget 4')
   expect(page).to have_content('Widget 5') # express the regexp above with the code you wish you had
end