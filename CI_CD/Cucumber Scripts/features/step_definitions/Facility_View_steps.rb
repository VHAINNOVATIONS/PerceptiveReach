##
Given(/^I am on (.+)$/) do |url|
  visit ('http://localhost:7003/') #open firefox and go to PR dashboard
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



When(/^I click on Widgets$/) do
  #pending # express the regexp above with the code you wish you had
  sleep(3)
  page.find(:xpath,"/html/body/div[1]/div[2]/div/aside/section/ul/li[2]/a/span").click
  
end


Then(/^I should see  "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1) 
end

Given(/^I navigate to the http:\/\/localhost:(\d+)\/$/) do |arg1|
  visit ('http://localhost:7003/')
  
end

When(/^I enter email field "(.*?)" as "(.*?)"$/) do |arg1, arg2|
  fill_in('email',:with=>'msmith')
end

When(/^I enter password field "(.*?)" as "(.*?)"$/) do |arg1, arg2|
  #pending # express the regexp above with the code you wish you had
  fill_in('password',:with=>'Password1')
end


When(/^I click on login "(.*?)" button$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  sleep(3)
  click_button('Login')
end

#widget steps

Then(/^I hover on PTSD "(.*?)" bar in barchart to see the tool tip as "(.*?)"$/) do |arg1, arg2|
   # pending # express the regexp above with the code you wish you had
  el = find('#widget1 > svg > g > g > g.nv-barsWrap > g > g > g > g > g:nth-child(1)')
 #e1=page.find(:xpath ,".//*[@id='widget1']/svg/g/g/g[3]/g/g/g/g/g[5]")
 page.driver.browser.action.move_to(el.native).perform
 sleep(5)
 #page.find(:xpath ,"//*[@id='widget1']/svg/g/g/g[3]/g/g/g/g/g[1]/rect").trigger(:mouseover)
 #page.should have_content "PTSD 245"
 expect(page).to have_content(arg2)
end


Then(/^I hover on Substance Abuse "(.*?)" bar in barchart to see the tool tip as "(.*?)"$/) do |arg1, arg2|
  el = find('#widget1 > svg > g > g > g.nv-barsWrap > g > g > g > g > g:nth-child(2)')
  page.driver.browser.action.move_to(el.native).perform
  sleep(5)
  expect(page).to have_content(arg2)
end

#Then(/^I hover on Hospitilized "(.*?)" bar in barchart to see the tool tip as "(.*?)"$/) do |arg1, arg2|
  #el = find('#widget1 > svg > g > g > g.nv-barsWrap > g > g > g > g > g:nth-child(3) > rect')
 # el = find('#widget1 > svg > g > g > g.nv-x.nv-axis > g > g > g:nth-child(3)',:visible => false)
  #widget1 > svg > g > g > g.nv-x.nv-axis > g > g > g:nth-child(3)
  #page.driver.browser.action.move_to(el.native).perform
  #sleep(5)
  #expect(page).to have_content(arg2)
 #page.should_have('#widget1 > svg > g > g > g.nv-x.nv-axis > g > g > g:nth-child(3) > text',:visible=>false,:text => arg2)
 #find('#widget1 > svg > g > g > g.nv-barsWrap > g > g > g > g > g:nth-child(3) > rect')['title'].should == arg2
  #e2="xyz"
  #puts e2
  #if(e2 == arg2)
  #puts true
  #else
  #puts false
  #end
  
  
#end
Then(/^I hover on Hospitilized "(.*?)" bar in barchart to see Hospitilized information$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  el = find('#widget1 > svg > g > g > g.nv-x.nv-axis > g > g > g:nth-child(3)',:visible => false)
  page.driver.browser.action.move_to(el.native).perform
  sleep(3)
end

Then(/^I see the tool tip as "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  #expect(page).to have_content(arg1)
  find('#widget1 > svg > g > g > g.nv-x.nv-axis > g > g > g:nth-child(3) > text',:visible => false)['title'].should == arg1
end
Then(/^I hover on Previous Attempts "(.*?)" bar in barchart to see Previous attempts information$/) do |arg1|
  el = find('#widget1 > svg > g > g > g.nv-barsWrap > g > g > g > g > g:nth-child(4)',:visible => false)
 # el = page.find('#widget1 > svg > g > g > g.nv-barsWrap > g > g > g > g > g:nth-child(4)')
  page.driver.browser.action.move_to(el.native).perform
  sleep(3)
  #expect(page).to have_content(arg2)
end

Then(/^I hover on Diagnosed TBI "(.*?)" bar in barchart to see Diagnosed TBI information$/) do |arg1|
  el = find('#widget1 > svg > g > g > g.nv-barsWrap > g > g > g > g > g:nth-child(5)',:visible => false)
  page.driver.browser.action.move_to(el.native).perform
  sleep(3)
  #expect(page).to have_content(arg2)
end


Then(/^I should see the login page for SPC User "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end

Then(/^I click on the User "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  sleep(5)
  page.find(:xpath,"/html/body/div[1]/div[1]/header/nav/div/ul/li[4]/a/span").click
end



#pie chart widget steps

Then(/^I hover on PTSD "(.*?)" sector in piechart to see the tool tip as "(.*?)"$/) do |arg1, arg2|
   el = find('#widget2 > svg > g > g > g.nv-pieWrap > g > g > g.nv-pie > g:nth-child(1) > path')
  page.driver.browser.action.move_to(el.native).perform
  sleep(3)
  expect(page).to have_content(arg2)
end

Then(/^I hover on Substance Abuse "(.*?)" sector in piechart to see Substance Abuse information$/) do |arg1|
   el = find('#widget2 > svg > g > g > g.nv-pieWrap > g > g > g.nv-pie > g:nth-child(2) > path',:visible => false)
  page.driver.browser.action.move_to(el.native).perform
  sleep(3)
  #expect(page).to have_content(arg2)
end

Then(/^I hover on Hospitilized "(.*?)" sector in piechart to see Hospitilized information$/) do |arg1|
   el = find('#widget2 > svg > g > g > g.nv-pieWrap > g > g > g.nv-pie > g:nth-child(3) > path',:visible => false)
  page.driver.browser.action.move_to(el.native).perform
  sleep(3)
  #expect(page).to have_content(arg2)
end

Then(/^I hover on Previous Attempts "(.*?)" sector in piechart to see the tool tip as "(.*?)"$/) do |arg1, arg2|
   el = find('#widget2 > svg > g > g > g.nv-pieWrap > g > g > g.nv-pie > g:nth-child(4) > path')
  page.driver.browser.action.move_to(el.native).perform
  sleep(3)
  expect(page).to have_content(arg2)
end

Then(/^I hover on Diagnosed TBI "(.*?)" sector in piechart to see the tool tip as "(.*?)"$/) do |arg1, arg2|
   el = find('#widget2 > svg > g > g > g.nv-pieWrap > g > g > g.nv-pie > g:nth-child(5) > path')
  page.driver.browser.action.move_to(el.native).perform
  sleep(3)
  expect(page).to have_content(arg2)
end
