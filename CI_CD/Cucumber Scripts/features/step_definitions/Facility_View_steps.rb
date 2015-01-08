##
Given(/^I am on (.+)$/) do |url|

  visit ('http://localhost:9000/') #open firefox and go to PR dashboard

  visit ('http://localhost:7001/') #open firefox and go to PR dashboard

end

When(/^I click on Arizona$/) do
	#page.find(:css, '#map > div > svg > g:nth-child(2) > path:nth-child(25)').click
	page.find(:xpath, "//*[@data-code='US-AZ']").click
	#//*[@id="map"]/div/svg/g[1]/path[25]
end



When(/^I click on OHIO$/) do
	#page.find(:css, '#map > div > svg > g:nth-child(2) > path:nth-child(25)').click
	page.find(:xpath, "//*[@data-code='US-OH']").click
	#//*[@id="map"]/div/svg/g[1]/path[25]
end

Then(/^I should see the "(.*?)"$/) do |text|
  expect(page).to have_content(text) # validate the webpage that is returned
end
When(/^I select on VAMCID "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code u wish you had
  #page.has_selector?(:xpath, '//table/tr[1]').click
  #page.find(:xpath,".//table/tbody/tr[1]/td[2][contains('649')]" ).click
  #page.find(:xpath,".//[@id='exampleFacility']/[]@id='odd_selected']").click
  #find(page.has_selector?('title',text:'649',visible:false)).click
  #page.find('#table.dataTable',:match => :first).click
  #puts(:xpath ,".//*[@id='exampleFacility']/tbody/tr[2]/td[1]")
  page.find(:xpath ,".//*[@id='exampleFacility']/tbody/tr[2]/td[1]").click
end


When(/^When I click on "(.*?)" button$/) do |arg1|
 # pending # express the regexp above with the code you wish you had
 click_button('Ok')
end

#Then(/^I should see the  "(.*?)" page$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  #expect(page).to have_content(arg1) # validate the webpage that is returned
  #find('header').text
  #page.should have_content(header_text)
  #page.has_content?('VA Medical Center')
#  assert has_content?('VA Medical Center')
 # end
Then(/^I should see the  "(.*?)"$/) do |arg1|
 #pending # express the regexp above with the code you wish you had
 expect(page).to have_content(arg1) 
end
 
 
Then(/^When I click on Specific Veteran SSN  "(.*?)"$/) do |arg1|
 # pending # express the regexp above with the code you wish you had
 page.find(:xpath ,".//*[@id='example']/tbody/tr[1]/td[2]").click
 
end

Then(/^I should see the Individual Veteran info in detail having "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1) 
end
# #map > div > svg > g:nth-child(2) > path:nth-child(6)

# data-code = "US-TX"

# data-code = "US-TX"



When(/^I click on Widgets$/) do
  #pending # express the regexp above with the code you wish you had
  sleep(3)
  page.find(:xpath,"./html/body/div[1]/div/aside[1]/section/ul/li[2]/a").click
  
end


Then(/^I should see  "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1) 
end


