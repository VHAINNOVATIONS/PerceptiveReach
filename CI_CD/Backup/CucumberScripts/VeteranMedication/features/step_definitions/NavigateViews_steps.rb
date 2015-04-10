Given(/^I navigate to the "(.*?)"$/) do |arg1|
   visit ('http://localhost:7003')  # express the regexp above with the code you wish you had
end

When(/^the webpage loads$/) do
  expect(page).to have_content('National View') # express the regexp above with the code you wish you had
end

Then(/^I see the National View$/) do
 expect(page).to have_content('National View') # express the regexp above with the code you wish you had
end

Then(/^I click the National View$/) do
  page.find(:xpath, "/html/body/div[2]/div/ul/li[1]/a/span[1]").click# express the regexp above with the code you wish you had
end

Then(/^I see the State View$/) do
  expect(page).to have_content('State View') # express the regexp above with the code you wish you had
end

Then(/^I click the State View$/) do
 page.find(:xpath, "/html/body/div[2]/div/ul/li[2]/a/span[1]").click# express the regexp above with the code you wish you had
end

Then(/^I see the Facility View$/) do
  expect(page).to have_content('Facility View') # express the regexp above with the code you wish you had
end

Then(/^I click the Facility View$/) do
  page.find(:xpath, "/html/body/div[2]/div/ul/li[3]/a/span[1]").click # express the regexp above with the code you wish you had
end

Then(/^I see the Individual View$/) do
  expect(page).to have_content('Individual View') # express the regexp above with the code you wish you had
end

Then(/^I click the Individual View$/) do
  page.find(:xpath, "/html/body/div[2]/div/ul/li[4]/a/span[1]").click# express the regexp above with the code you wish you had
end
