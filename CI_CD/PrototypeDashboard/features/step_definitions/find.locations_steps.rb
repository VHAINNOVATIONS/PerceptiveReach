##
Given(/^I am on (.+)$/) do |url|
  visit ('http://localhost:9000/') #open firefox and go to PR dashboard
end

When(/^I click on Colorado$/) do
	#page.find(:css, '#map > div > svg > g:nth-child(2) > path:nth-child(25)').click
	page.find(:xpath, "//*[@data-code='US-CO']").click
	#//*[@id="map"]/div/svg/g[1]/path[25]
end

Then(/^I should see the "(.*?)"$/) do |text|
  expect(page).to have_content(text) # validate the webpage that is returned
end

# #map > div > svg > g:nth-child(2) > path:nth-child(6)
# data-code = "US-TX"