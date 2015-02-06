Given(/^I navigate to the "(.*?)"$/) do |arg1|
 visit ('http://localhost:9001/client/index.html') # express the regexp above with the code you wish you had
end

When(/^the webpage loads$/) do
   expect(page).to have_content('National View') # express the regexp above with the code you wish you had
end

Then(/^I see the widgets in the National View$/) do
   expect(page).to have_content('Widget 1')# express the regexp above with the code you wish you had
   expect(page).to have_content('Widget 2')
   expect(page).to have_content('Widget 3')
   expect(page).to have_content('Widget 4')
   expect(page).to have_content('Widget 5')
end

Then(/^I click the State View$/) do
  #click_button("State View")
  #find("makeLayoutActive(layout)").click
  #click_button('State View') # express the regexp above with the code you wish you had
  #page.fill_in 'input.form-control ng-pristine ng-untouched ng-valid' with 'data-layout="2"'
  page.find(:xpath, "/html/body/div[2]/div/ul/li[2]/a").click #state view xpath /html/body/div[2]/div/ul/li[2]/a
end

Then(/^I see the State View$/) do
    expect(page).to have_content('State View')# express the regexp above with the code you wish you had
end

Then(/^I click the Facility View$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I see the Facility View$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I click the Individual View$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I see the Individual View$/) do
  pending # express the regexp above with the code you wish you had
end
