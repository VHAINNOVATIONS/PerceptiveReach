Given(/^I navigate to the http:\/\/localhost:(\d+)\/$/) do |arg1|
sleep(30)
  visit ('http://localhost:7003')
 
  
end


When(/^I click on the VAMC dropdown$/) do
  find(:xpath, "//select[@ng-model='result.dataModel.vamc']").click 
end

When(/^I choose "(.*?)" as VAMC$/) do |arg1|
  find(:xpath, '//select[@ng-model="result.dataModel.vamc"]/option[contains(text(),"(V01) (405) White River Junction, VT")]').click
  #find(:xpath, '//select[@ng-model="result.dataModel.vamc"]/option[2]').click
end

When(/^I select middle risk veteran row in the widget$/) do 
  #pending # express the regexp above with the code you wish you had
 # row=number
  #find(:xpath, '//*[@id="sampleVet"]/tbody/tr["+row+"]').click
   #find(:xpath, '//select[@ng-model="result.dataModel.vamc"]/option[2]').click
      #find(:xpath, '//*[@id="sampleVet"]/tbody/tr[9]').click 
	expect(page).to have_content '3799'
	find(:xpath, '//td[contains(text(),"1966")]').click 
	 #click_link('vet_566384')
end

#To test active sessions
When(/^I open a new browser and navigate to http:\/\/localhost:(\d+)\/$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
   
  
  #page.driver.browser.close
  
  page.driver.browser.navigate.to 'http://localhost:7003'
    page.driver.browser.switch_to.window(page.driver.browser.window_handles.last)
 
 
 
 
  
end

When(/^I select top risk veteran row in the widget$/) do 
  #pending # express the regexp above with the code you wish you had
 # row=number
  #find(:xpath, '//*[@id="sampleVet"]/tbody/tr["+row+"]').click
   #find(:xpath, '//select[@ng-model="result.dataModel.vamc"]/option[2]').click
     # find(:xpath, '//*[@id="sampleVet"]/tbody/tr[9]').click 
	  find(:xpath, '//td[contains(text(),"4669")]').click 
	  # click_link('vet_652427')
end


When(/^I select "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  find(:xpath, '//*[@id="sampleVet"]/tbody/tr[1]').click

end
Then(/^I click on check box "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
   check(arg1)
   sleep(5)
end

When(/^I leave the page inactive for (\d+) seconds$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  sleep(132)
  end

When(/^I click on "(.*?)"$/) do |view|
  title = view
  page.find(:xpath, "//span[contains(text(),'#{title}')]").click #find and click National/State/Facility/Individual View tabe
  #page.save_screenshot('screenshot1.png')
end

When(/^I Click on "(.*?)"$/) do |view|
  title = view
  page.find(:xpath, "//span[contains(text(),'#{title}')]").click #find and click National/State/Facility/Individual View tabe
  #page.save_screenshot('screenshot2.png')
end

When(/^I click on close on the "(.*?)" widget$/) do |widgetname|
  title = widgetname
  page.find(:xpath, "//span[normalize-space(text())='#{title}']/following-sibling::span[2]").click #find widget and click close button
end

When(/^I click on edit on the "(.*?)" widget$/) do |widgetname|
  title = widgetname
  page.find(:xpath, "//span[normalize-space(text())='#{title}']/following-sibling::span[3]").click #find widget and click edit button
  expect(page).to have_content 'Widget Options'
end

When(/^I click on "(.*?)" button$/) do |buttonname|
  begin
    find_button(buttonname).click
  rescue
    #scroll to top of page
    page.execute_script("scroll(250, 0)");
    find_button(buttonname).click 
  end
end

Then(/^I click the Add a Widget button$/) do
  find_button('Add a Widget').click 
  find_button('Add a Widget').click 
end

Then(/^I click on the Add a widget button$/) do
  #pending # express the regexp above with the code you wish you had
  find_button('Add a Widget').click
  find_button('Add a Widget').click
end

When(/^I check "(.*?)" and "(.*?)" orders$/) do |arg1, arg2|
  #pending # express the regexp above with the code you wish you had
  expect(page).to have_content(arg1)
end

Then(/^I should see the "(.*?)" widget$/) do |pagecontent|
  expect(page).to have_content(pagecontent)
end

Then(/^I should see "(.*?)" widget$/) do |pagecontent|
  expect(page).to have_content(pagecontent)
end

Then(/^I should not see the "(.*?)" widget$/) do |pagecontent|
  expect(page).to have_no_content(pagecontent)
end

And(/^I should see "(.*?)"$/) do |pagecontent|
  expect(page).to have_content(pagecontent)
end

And(/^I should see "(.*?)" column$/) do |pagecontent|
  #page.save_screenshot('screenshot3.png')
  expect(page).to have_content(pagecontent)
end

Then(/^I should see my default widgets$/) do
  #sql query get the default widgets for the user profile
  expect(page).to have_content'Veteran Roster by VAMC'
end

And(/^I add the "(.*?)" widget$/) do |widgetname|
  #find_button(widgetname).click
 title=widgetname
  page.find(:xpath, "//span[contains(text(),'#{title}')]").click  
  
  
end

And(/^I change the title to "(.*?)" on the pop\-up$/) do |widgetname|
  fill_in('widgetTitle',:with=>widgetname)
end

And(/^I should see "(.*?)" option in the dropdown$/) do |dropdownoption|
  #page.find(:xpath, "//*[@id='vet_652427-button']/span[1]").click #click the dropdown - vet_#-button need to figure param for #value
  #expect(page).to have_content(dropdownoption)
  page.find(:xpath, '//*[@id="sampleVet"]/tbody/tr[1]').find('select').find(:option,dropdownoption).select_option
end

Then(/^I put in my VA username$/) do
  fill_in('Username', :with => 'VA Username') # express the regexp above with the code you wish you had
end

Then(/^I put in my VA password$/) do
  fill_in('Password', :with => 'VA Password')# express the regexp above with the code you wish you had
end

Then(/^I put in "(.*?)" field as "(.*?)"$/) do |arg1, arg2|
fill_in(arg1, :with => arg2)
end

Then(/^I check the page for a Veteran's SSN$/) do
  expect(page).to have_content 'Veteran Roster'
  client1 = TinyTds::Client.new username: 'sa', password: 'agile_123', host: '54.225.232.25', database: 'Reach_Test'
  result1 = client1.execute("SELECT TOP 1 * FROM Ref_VAMC")
  #{"VAMCID"=>1, "VISN"=>1, "STA3N"=>"402", "STA6AID"=>"402", "VAMC"=>"(V01) (402) Togus, ME", "StateAbbr"=>"ME"}
  result1.each(:as => :array) do |row|
    #check for data in row
    #if row = null
    print row[0]
    DerNumber = row[0]
    print row[4]
    DerName = row[4]
    expect(page).to have_content 'Veteran Roster'
    #edit the VAMC in the Veteran Roster Widget 
    page.find(:xpath, "//span[normalize-space(text())='Veteran Roster by VAMC']/following-sibling::span[3]").click
    #VAMC Dropwdown  
    find(:xpath, "//select[@ng-model='result.dataModel.vamc']").click  
    #chose VAMC find(:xpath, '//select[@ng-model="result.dataModel.vamc"]/option[contains(text(),"(V01) (405) White River Junction, VT")]').click
    #number works but not text (V01) (402) Togus, ME
    find(:xpath, "//select[@ng-model='result.dataModel.vamc']/option[#{DerNumber}]").click
    #click ok
    find_button('OK').click
    #wait for page to load
    expect(page).to have_content 'Veteran Roster'
    #query that VAMC for veterans
    client2 = TinyTds::Client.new username: 'sa', password: 'agile_123', host: '54.225.232.25', database: 'Reach_Test'
    result2 = client2.execute("SELECT TOP 2 SSN, ReachID, Phone, AltPhone, Address, City, State, Zip, RiskLevel from VeteranRisk WHERE (RiskLevel = 1 or RiskLevel=2) and VAMC = #{DerNumber}")
      result2.each(:as => :array) do |row|
        #only want to do this 5 times
        print row
        #print fields
        # Each row is now an array of values ordered by #fields.
        vetssn = row[0]
        vetreachid = row[1]
        #SQL SNN = 000649041
        trimmed = vetssn[5..9]
        #trimmed the SSN to the last 4 digits
        expect(page).to have_content(trimmed)
        #checking the page for the SSN
        #click veteran and check that the other widgets update correctly
        find(:xpath, "//td[contains(text(),'xxx-xx-#{trimmed}')]").click        
        #check the veteran contact info
        #SSN, ReachID, Phone, AltPhone, Address, City, State, Zip
        #Phoner::Phone.default_country_code = '1'
        #pn = Phoner::Phone.parse('row[2]')
        #pn.format(:us) # => "(234) 123-4567"
        #print pn
        #fixedphonenumber = Phoner::Phone.parse'row[2]' 
        #print fixedphonenumber
        #expect(page).to have_content(row[2]) #phone
        #expect(page).to have_content(row[3]) #altphone 
        expect(page).to have_content(row[4]) #address
        expect(page).to have_content(row[5]) #city
        expect(page).to have_content(row[6]) #state
        expect(page).to have_content(row[7]) #zip
        #check clinical decision support
        if row[8] = 1
          print 'Intermediate'
          expect(page).to have_content("Chronic Intermediate Risk")
        elsif row[8] = 2
          print 'High'
          expect(page).to have_content("Chronic High Risk")
        end
        #query and check other widgets
        #check the emergency contact
        client3 = TinyTds::Client.new username: 'sa', password: 'agile_123', host: '54.225.232.25', database: 'Reach_Test'
        result3 = client3.execute("SELECT NameOfContact, StreetAddress1, StreetAddress2, StreetAddress3, City, State, Zip, Zip4, Phone, PhoneWork FROM EmergencyContact WHERE ReachID = #{vetreachid}")
        result3.each(:as => :array) do |row|
        #result3.each(:symbolize_keys => true) do |field|
          #ReachID, NameOfContact, StreetAddress1, StreetAddress2, StreetAddress3, City, State, Zip, Zip4, Phone, PhoneWork
          print row
          expect(page).to have_content(row[0]) #NameOfContact
          expect(page).to have_content(row[1]) #StreetAddress1
          expect(page).to have_content(row[2]) #StreetAddress2
          expect(page).to have_content(row[3]) #StreetAddress3
          expect(page).to have_content(row[4]) #City
          expect(page).to have_content(row[5]) #State
          expect(page).to have_content(row[6]) #Zip
        end
        result3.cancel
        client3.close
        #check the emergency contact
        end
      #close connection and close result
      result2.cancel
      client2.close
    end 
  #close connection and close result
  result1.cancel  
  client1.close
end

#pending steps
Then(/^I should see search function for Veteran's health record$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I type in the Veteran's name "(.*?)"$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see the Veteran's health record$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should be able to toggle categories of data or or off$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see high risk veteran notification$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I click on high risk veteran notification$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see the direct message which highlights high risk veterans$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I click on notification for high risk veteran due to a trigger or event$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see details of high risk veteran$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see the navigation menu$/) do
  pending # express the regexp above with the code you wish you had
end

When(/^I click on  "(.*?)"$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see at risk veterans for the state facility OHIO$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I click on specific time frame$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see the at\-risk veterans for the specific time frame$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I select the previous month$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see the at\-risk veterans for the previous months$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see a view that summarizes data for a specific state$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see a view that summarizes data for a specific region$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see a view that summarizes data on a National level$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see list of facility's for OHIO$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I select the data attributes$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see the groups of at\-risk Veterans filtered by data attributes$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I drag the "(.*?)" widget to the top left of the screen$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see the direct message which highlights high risk trigger or event$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I login as a Clinician$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see form that lists all of the data elements I can update in a patient's record$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I click on a Veteran's name$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see Relationship "(.*?)" in emergency contact information$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see Phone in emergency contact information$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see Alternate Phone in emergency contact information$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see Address in emergency contact information$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see City in emergency contact information$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see State in emergency contact information$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see Zip code in emergency contact information$/) do
  pending # express the regexp above with the code you wish you had
end

When(/^I click on the top bar of the "(.*?)" widget$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should be able to drag the "(.*?)" widget to anywhere on the page$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see a column "(.*?)" in  the veterans roster widget$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see not contacted "(.*?)" in the outreach status dropdown$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see outreach initiated "(.*?)" in the outreach status column$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see outreach attempted "(.*?)" in the outreach status column$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see service refused "(.*?)" in the outreach status column$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see no additional outreach "(.*?)" in the outreach status column$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end

When(/^I click on edit on "(.*?)" widget$/) do |arg1|
  pending # express the regexp above with the code you wish you had
end


When(/^I click on save button$/) do
  pending # express the regexp above with the code you wish you had
end

Then(/^I should see the widget (\d+) title change to "(.*?)"$/) do |arg1, arg2|
  pending # express the regexp above with the code you wish you had
end
