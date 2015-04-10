Given(/^I navigate to the http:\/\/localhost:(\d+)\/$/) do |arg1|
 visit ('http://localhost:7003') # express the regexp above with the code you wish you had
end

Then(/^I should see the Sign In page$/) do
  expect(page).to have_content("Sign In") # express the regexp above with the code you wish you had
end

Then(/^I put in amy VA username$/) do
  fill_in('Username', :with => 'VA Username') # express the regexp above with the code you wish you had
end

Then(/^I put in my VA password$/) do
  fill_in('Password', :with => 'VA Password')# express the regexp above with the code you wish you had
end

Then(/^I click on Sign In$/) do
  click_button('Sign In') # express the regexp above with the code you wish you had
end

Then(/^I should be able to see my Home page$/) do
  expect(page).to have_content("Home") # express the regexp above with the code you wish you had
end
