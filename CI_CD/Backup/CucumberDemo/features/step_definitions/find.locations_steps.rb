Given(/^I am on (.+)$/) do |url|
  visit ('http://www.va.gov/bluebutton/') #open firefox and go to va.gov
end

When(/^I enter my zip code$/) do
  fill_in('inputaddress', :with => '20001') # enter the zip code
  click_button('Click here to submit')
end

Then(/^I should see a nearby hospitals$/) do
  expect(page).to have_content('Washington DC VA Medical Center') # validate the webpage that is returned
end
