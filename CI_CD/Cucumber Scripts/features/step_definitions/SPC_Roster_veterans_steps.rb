Then(/^I should see the widget with roster of high risk Veterans "(.*?)"$/) do |
arg1|
  #pending # express the regexp above with the code you wish you had
   expect(page).to have_content(arg1)
end

When(/^I click on high risk Individual veteran "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  page.find(arg1).click
end

Then(/^I should see high risk veteran contact information "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end

Then(/^I should see the name "(.*?)"of high risk veteran$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end

Then(/^I should see the ssn "(.*?)"of high risk veteran$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end

Then(/^I should see the phone "(.*?)"of high risk veteran$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end

Then(/^I should see the dft "(.*?)"of high risk veteran$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end

Then(/^I should see the date updated "(.*?)"of high risk veteran$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end

Then(/^I should see the srl "(.*?)"of high risk veteran$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end

Then(/^I should see the last va visit "(.*?)"of high risk veteran$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end

When(/^I select the filter "(.*?)"for newly identified high risk veterans for past (\d+) days$/) do |arg1, arg2|
  #pending # express the regexp above with the code you wish you had
  page.select(arg1)
end

Then(/^I should see list of newly identified high risk veterans for past (\d+) days$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
    expect(page).to have_content(arg1)
end

When(/^I click on a high risk veteran "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  page.find(arg1).click
end

Then(/^I should see high risk veteran contact information for "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
     expect(page).to have_content(arg1)
end 