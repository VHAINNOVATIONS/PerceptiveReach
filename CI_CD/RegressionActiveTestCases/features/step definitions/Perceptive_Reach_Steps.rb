Given(/^I navigate to the http:\/\/localhost:(\d+)\/$/) do |arg1|
#sleep(5)
  visit ('http://localhost:7003')
 begin
    #scroll to top of page
    page.execute_script("scroll(250, 0)");
    find_button('Logout').click 
  rescue
    expect(page).to have_content 'I accept the terms and conditions for accessing the system described above'
  end  
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
	#expect(page).to have_content '3799'
	#find(:xpath, '//td[contains(text(),"1966")]').click 
  find(:xpath, '(//tr/td[contains(text(),\'MIDDLE\')])[1]').click 
	 #click_link('vet_566384')
end

Then(/^I select the veteran "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  find(:xpath, '//*[@id="tblPatient"]/tbody/tr[1]/td[1]').click
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
	 find(:xpath, '(//tr/td[contains(text(),\'TOP\')])[1]').click 
	
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
  sleep(912)
end

When(/^I click on "(.*?)"$/) do |view|
  title = view
  page.find(:xpath, "//span[contains(text(),'#{title}')]").click #find and click National/State/Facility/Individual View tabe
  #page.save_screenshot('screenshot1.png')
end

Then(/^I click on save changes button$/) do
  page.find(:xpath,"/html/body/div/div/div/div/div[1]/div/button[2]").click
end

Then(/^I click on "(.*?)" button in the menu$/) do |arg1|
  title = arg1
  page.find(:xpath, "//span[contains(text(),'#{title}')]",:match => :prefer_exact).click #find and click National/State/Facility/Individual View tabe
end

When(/^I Click on "(.*?)"$/) do |view|
  title = view
  page.find(:xpath, "//span[contains(text(),'#{title}')]").click #find and click National/State/Facility/Individual View tabe
  #page.save_screenshot('screenshot2.png')
end

When(/^I click on close on the "(.*?)" widget$/) do |widgetname|
  title = widgetname
#page.find(:xpath, "//span[normalize-space(text())='emergency']/following::button[3]",:match => :prefer_exact).click
#all(:xpath, "//span[normalize-space(text())='#{title}']/following::button[1]")[1].click
#page.find(:xpath, ".//span[text()='Emergency Contact Information']/following-sibling::div/child::button").click
#el = page.find(:xpath, ".//span[text()='Emergency Contact Information']/following-sibling::div/child::button")
#jScript = "$($('.panel-title>span:contains(\""+ widgetname +"\")').siblings()[1]).find('button').click()"
#page.execute_script(jScript)
page.find(:xpath, ".//span[text()='#{title}']/following-sibling::div/child::button").click
end



When(/^I select VISN Roster "(.*?)" veteran row in the widget$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
  page.find(:xpath,"//td[contains(text(),'#{arg1}')]").click
end


When(/^I Select VAMC facility "(.*?)" in facility roster widget$/) do |arg1|
  page.find(:xpath,"//td[contains(text(),'#{arg1}')]").click
end

When(/^I click on edit on the "(.*?)" widget$/) do |widgetname|
  title = widgetname
   #page.find(:xpath, "//span[normalize-space(text())='emergency']/following::button[2]",:match => :prefer_exact).click #find widget and click edit button
   all(:xpath, "//span[normalize-space(text())='#{title}']/following::button[2]")[1].click
  #expect(page).to have_content 'Widget Options'
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
  #find_button('Add a Widget').click 
  find_button('Add a Widget').click 
end

Then(/^I click on the Add a widget button$/) do
  #pending # express the regexp above with the code you wish you had
  #find_button('Add a Widget').click
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

Then(/^I should not see the "(.*?)" widget$/) do |arg1|
  title = arg1
  expect(page).to have_no_xpath("//span[contains(text(),'#{title}')]")
  #expect(page).to have_no_content(pagecontent)
end

Then(/^I should not be able to see the "(.*?)" widget$/) do |arg1|
  expect(page).to have_no_content(pagecontent)
end

And(/^I should see "(.*?)"$/) do |pagecontent|
  sleep(1)
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
  client1 = TinyTds::Client.new username: 'user', password: 'pw', host: 'host', database: 'db'
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
    client2 = TinyTds::Client.new username: 'user', password: 'pw', host: 'host', database: 'db'
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
        client3 = TinyTds::Client.new username: 'user', password: 'pw', host: 'host', database: 'db'
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

When(/^I click on Add Data$/) do
  pending # express the regexp above with the code you wish you had
  find_button('Add Data').click
end


Then(/^I should see the widget (\d+) title change to "(.*?)"$/) do |arg1, arg2|
  pending # express the regexp above with the code you wish you had
end

Then(/^I click on the Default Widgets button$/) do
  #pending # express the regexp above with the code you wish you had
  #find_button('Add a Widget').click
  find_button('Default Widgets').click
end

Then(/^I should wait$/) do
  # pending # express the regexp above with the code you wish you had
  sleep(30)
end

Then (/^I send an email following the link$/) do 
	click_link('Contact Help Desk')
	open_email('vaperceptivereachsupport@va.gov')
	expect(current_email).to eq "vaperceptivereachsupport@va.gov"
	expect(current_email).subject eq "Perceptive Reach Dashboard Support"
	clear_emails
end 

Then(/^I select the 3rd row from Patient Roster Widget$/) do
  find(:xpath, './/*[@id=\'tblPatient\']/tbody/tr[3]').click
end

Then(/^I should see the SSN in patient contact equal to SSN in 3rd row of Patient Roster$/) do
  ssn = find(:xpath, './/*[@id=\'tblPatient\']/tbody/tr[3]/td[2]').text
  expect(find(:xpath,'.//div[@wt-contact=\'\']/div[@class=\'ng-binding\']')).to have_content(ssn)
end

Then(/^I should wait for inactivity$/) do
  # pending # express the regexp above with the code you wish you had
  sleep(1020)
end

Then (/^I should see "(.*?)" in "(.*?)" $/) do |arg1,arg2|
	#find(:xpath, '//*[@id=/'hrText/']')
  	fill_in('hrText', :with => 'The patient has coronary artery disease, hypertension, hypercholesterolemia, COPD and tobacco abuse. He reports that doing well. He did have some more knee pain for a few weeks, but this has resolved.')
end

Then(/^I see only max length in "(.*?)" $/) do |arg1|
	find(:xpath, arg1).value.length.should_be 128
end

Then(/^I click on Add Data button$/) do
  #find_button('Add Data').click 
  page.execute_script("$(\"button:contains('Add Data')\")[0].scrollIntoView( true );")
  page.execute_script("$(window).scrollTop( 600 );")
  #find_button('Add Data').trigger('click')
   find_button('Add Data').click 
end

Then(/^I should not see "(.*?)"$/) do |arg1|
	expect(page).to_not have_content(arg1)
end

Then(/^I should see Facility "(.*?)"$/) do |arg1|
	expect(page).to have_content(arg1)
end

Then(/^I select first Veteran$/) do 
 find(:xpath, '//*[@id="tblPatient"]/tbody/tr[1]/td[1]').click
end 

Then(/^I see the same SSN and VeteranID displayed on top of page for first veteran$/) do
 #pending # express the regexp above with the code you wish you had
  veteranID = find(:xpath, './/*[@id=\'tblPatient\']/tbody/tr[1]/td[1]').text
  ssn = find(:xpath, './/*[@id=\'tblPatient\']/tbody/tr[1]/td[2]').text
 expect(find(:xpath, '/html/body/div[1]/div/div/div/div[2]/div[2]/div[2]/label/span')).to have_content(ssn)
 expect(find(:xpath, '/html/body/div[1]/div/div/div/div[2]/div[2]/div[2]/label/span')).to have_content(veteranID)
end

Then(/^I see the same SSN and VeteranID displayed on top of page for another veteran$/) do
 #pending # express the regexp above with the code you wish you had
  veteranID = find(:xpath, './/*[@id=\'tblPatient\']/tbody/tr[4]/td[1]').text
  ssn = find(:xpath, './/*[@id=\'tblPatient\']/tbody/tr[4]/td[2]').text
 expect(find(:xpath, '/html/body/div[1]/div/div/div/div[2]/div[2]/div[2]/label/span')).to have_content(ssn)
 expect(find(:xpath, '/html/body/div[1]/div/div/div/div[2]/div[2]/div[2]/label/span')).to have_content(veteranID)
end

Then(/^I click on the Clear button$/) do
  #pending # express the regexp above with the code you wish you had
   find_button('Clear').click
end

Then(/^I should not see any widgets$/) do
   expect(page).to have_no_xpath("//span[contains(text(),'Patient Roster by VAMC')]")
   expect(page).to have_no_xpath("//span[contains(text(),'Clinical Decision Support')]")
   expect(page).to have_no_xpath("//span[contains(text(),'Patient Contact')]")
   expect(page).to have_no_xpath("//span[contains(text(),'Data Entry')]")
   expect(page).to have_no_xpath("//span[contains(text(),'Diagnoses')]")
   expect(page).to have_no_xpath("//span[contains(text(),'Medication')]")
   expect(page).to have_no_xpath("//span[contains(text(),'Appointment')]")
   expect(page).to have_no_xpath("//span[contains(text(),'CDS Questionnaire')]")
   expect(page).to have_no_xpath("//span[contains(text(),'Emergency Contact Information')]")
end

Then(/^I should see all the  widgets$/) do
   expect(page).to have_xpath("//span[contains(text(),'Patient Roster by VAMC')]")
   expect(page).to have_xpath("//span[contains(text(),'Clinical Decision Support')]")
   expect(page).to have_xpath("//span[contains(text(),'Patient Contact')]")
   expect(page).to have_xpath("//span[contains(text(),'Data Entry')]")
   expect(page).to have_xpath("//span[contains(text(),'Diagnoses')]")
   expect(page).to have_xpath("//span[contains(text(),'Medication')]")
   expect(page).to have_xpath("//span[contains(text(),'Appointment')]")
   expect(page).to have_xpath("//span[contains(text(),'CDS Questionnaire')]")
   expect(page).to have_xpath("//span[contains(text(),'Emergency Contact Information')]")
end

Then(/^I select Another Veteran$/) do 
 find(:xpath, '//*[@id="tblPatient"]/tbody/tr[1]/td[4]').click
end 

Then(/^I should wait for twenty seconds$/) do  
  # pending # express the regexp above with the code you wish you had
  sleep(20)
end    

Then(/^I click on link "(.*?)"$/) do |arg1|
  #pending # express the regexp above with the code you wish you had
# find_link(arg1).click
find(:xpath, '//*[@id="tblPatient_wrapper"]/div[1]/a/span/a').click
end

When(/^I click on "(.*?)" button multiple times$/) do |arg1|
i = 0 
count = 10
  while i < count do
  find_button(arg1).click 
  i = i+1
  end
end

Then(/^I see "(.*?)" in field "(.*?)"$/) do |arg1,arg2|
	#assert page.has_field?(arg2, :with => arg1) 
	 textValue = find(:xpath, './/*[@id="hrText"]').text
	 #expect(arg1).to equal(textValue)
end

Then(/^I should not see "(.*?)" in the Outreach Status column$/) do |pagecontent|
    expect(page).to have_no_content(pagecontent)
end

And(/^I should see "Remove Widget" button$/) do
        #sql query get the default widgets for the user profile
        page.find(:xpath,"/html/body/div/div/div/div/div[3]/ul/li[3]/div[1]/div[1]/div/div/button").click
end




And(/^I select first VISN Roster in the widget$/) do
          #pending # express the regexp above with the code you wish you had
        page.find(:xpath,"/html/body/div/div/div/div/div[3]/ul/li[1]/div[1]/div[2]/div/div/table/tbody/tr[1]/td[1]").click
end

And(/^I Select first VAMC facility in facility roster widget$/) do
          #pending # express the regexp above with the code you wish you had
        page.find(:xpath,"/html/body/div/div/div/div/div[3]/ul/li[2]/div[1]/div[2]/div/div/table/tbody/tr[1]/td[1]").click
end



And(/^I click X in upper right of Prediction Chart widget$/) do
        #find_button('Individualididual view').click
        page.find(:xpath,"/html/body/div/div/div/div/div[3]/ul/li[3]/div[1]/div[1]/div/div/button").click
end

And(/^I click the "Add a Widget" button$/) do
  #find_button('Add a Widget').click
  find_button('Add a Widget').click
end

Then(/^I should not see "(.*?)" in Prediction Chart$/) do |pagecontent|
  expect(page).to have_no_content(pagecontent)
end

Then (/^I should see Remove Patient button$/) do
     find_button('Remove Patient')
end

Then(/^I should click on Condition1 button/) do
	#find(:xpath, './/*[@id="cdsConditionDiv"]/div/div[1]/div[1]/div[2]').click
	page.choose('Condition_1')
end

Then(/^I click on CDSNext1 button/) do
	find(:xpath, './/*[@id="cdsConditionDiv"]/div/div[2]/button[2]').click

end

Then(/^I should select the first option in dropdown/) do
  find(:xpath, './/*[@id="question_55"][1]').select_option
end


Then(/^I should select "(.*?)" in the Data Entry widget$/) do |pagecontent|
 page.find(:xpath , '//*[@ng-model="NotifiedProvider"]').set(true)
end


Then(/^I should select "Add Data" button in the Data Entry widget$/) do
 page.find(:xpath , '//*[@ng-click="addNewData()"]').set(true)
end


Then(/^I should see the "date and time" in the outreach status checklist$/) do
 #page.find(:xpath , '//*[@id="identifiedprimaryproviderdate"]')
 page.find(:xpath , './/*[@id="enterWdgtDataForm"]/div/div/div[1]/div[3]/div[4]/label')
end

Then(/^I should see "(.*?)" in the About Perceptive Reach widget$/) do |pagecontent|
    page.find(:xpath, '//*[@href="http://vaww.mirecc.va.gov/reachvet/"]')
end

Then(/^I should see "(.*?)" in the About Perceptive Reach widget content$/) do |pagecontent|
  expect(page).to have_content(pagecontent)
end
