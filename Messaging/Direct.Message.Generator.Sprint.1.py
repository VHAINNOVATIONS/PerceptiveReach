'''
Created on Oct 7, 2014

@author: asmith039
'''
import xml.etree.ElementTree as ET
import pymssql
def send_email():
            import smtplib

            gmail_user = ""
            gmail_pwd = ""
            FROM = ''
            TO = [''] #must be a list
            SUBJECT = "PR Notification"
            TEXT = "Outreach Person, \n A notification awaits your review on the PR. <LINK>"

            # Prepare actual message
            message = """\From: %s\nTo: %s\nSubject: %s\n\n%s
            """ % (FROM, ", ".join(TO), SUBJECT, TEXT)
            try:
                #server = smtplib.SMTP(SERVER) 
                server = smtplib.SMTP("smtp..com", 587) #or port 465 doesn't seem to work!
                server.ehlo()
                server.starttls()
                server.login(gmail_user, gmail_pwd)
                server.sendmail(FROM, TO, message)
                #server.quit()
                server.close()
                print 'successfully sent the mail'
            except:
                print "failed to send mail"

if __name__ == '__main__':
    pass

listofregions = ['1','2']
x = 1
for entry in listofregions:
    list_of_outreach_people = []
    array_of_risk_results = []
    array_of_risk_messages = []
    array_of_analysis_output = []
    #open DB connection
    conn = pymssql.connect(host='', port=1433, user='', password='', database='Reach')
    cur = conn.cursor()
    queryoutreachpersonnel = ("SELECT * FROM OutreachPersonnel WHERE Region = (%s)")
    cur.execute(queryoutreachpersonnel, entry)
    for r in cur.fetchall():
        list_of_outreach_people.append(r)
    queryriskresults = ("SELECT * FROM RiskResults WHERE Region = (%s)")
    cur.execute(queryriskresults, entry)
    for r in cur.fetchall():
        array_of_risk_results.append(r)
    queryriskmessages = ("SELECT * FROM DirectMessages")
    cur.execute(queryriskmessages)
    """for r in cur.fetchall():
        array_of_risk_messages.append(r)
    queryAnalyticsOutput = ("SELECT * FROM AnalyticsOutput")
    cur.execute(queryAnalyticsOutput) 
    for r in cur.fetchall():
        array_of_analysis_output.append(r)
        print r"""
    cur.close()
    conn.close()
    #Build XML File
    notification = ET.Element("notification")
    person = ET.SubElement(notification, "person")
    personname = ET.SubElement(person, "personname")
    personname.text = str(list_of_outreach_people[0][0])
    print str(list_of_outreach_people[0][0])
    email = ET.SubElement(person, "email")
    email.text = str(list_of_outreach_people[0][1])
    personregion = ET.SubElement(person, "region")
    personregion.text = str(list_of_outreach_people[0][2])   
    data = ET.SubElement(notification,"data")
    veteran = ET.SubElement(data, "veteran")
    name = ET.SubElement(veteran, "name")
    name.text = str(array_of_risk_results[0][0])    
    dob = ET.SubElement(veteran, "DOB")
    dob.text = str(array_of_risk_results[0][1])
    risk = ET.SubElement(veteran, "risk")
    risk.text = str(array_of_risk_results[0][2])
    category = ET.SubElement(veteran,"category")
    category.text = str(array_of_risk_results[0][3])
    veteranregion = ET.SubElement(veteran, "region")
    veteranregion.text = str(array_of_risk_results[0][4])
    riskmessage = ET.SubElement(veteran, "riskmessage")
    riskmessage.text = "Veteran is medium risk due to PTSD"
    tree = ET.ElementTree(notification)
    tree.write(str(list_of_outreach_people[0][0])+'notifications.xml')
    #XML file has been written to disk               
    #time to send a message
    send_email()

    
    
#where no cars go     
#print "\n""are we there yet"
