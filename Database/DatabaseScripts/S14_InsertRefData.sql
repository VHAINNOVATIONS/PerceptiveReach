-- *** Risk Level ***

DELETE FROM Ref_ClinicalGuidelines
GO
DELETE FROM Ref_RiskLevel
GO
DBCC CHECKIDENT (Ref_RiskLevel, RESEED, 1)
GO

INSERT INTO Ref_RiskLevel(RiskLevelDesc, RiskLevelFullDesc) VALUES('High', 'High Risk')
INSERT INTO Ref_RiskLevel(RiskLevelDesc, RiskLevelFullDesc) VALUES('Medium', 'Medium Risk')
GO

-- *** Clinical Guidelines ***

INSERT INTO Ref_ClinicalGuidelines
VALUES(1, 'CHRONIC HIGH RISK
Features 
Examples of warning signs (WS) and risk factors (RF) that are likely to be include: 
•Chronic Axis I and/or Axis II condition(s) (RF) 
•History of prior suicide attempt(s) (RF) 
•History of substance abuse/dependence (RF) 
•Chronic pain (RF) 
•Chronic suicidal ideation (WS) 
•Chronic medical condition (RF) 
•Limited coping skills (RF) 
•Unstable or turbulent psychosocial status (e.g. unstable housing, erratic relationships, marginal employment) (RF) 
•Limited ability to identify reasons for living (RF) 
Action 
Conceptually, these individuals should be considered to be at chronic risk for becoming acutely suicidal, often in the context of unpredictable situational contingencies (e.g., job loss, relationship dissolution, relapse on alcohol). Hence, they require routine mental health follow-up, a well an articulated safety plan, and routine screening regarding risk of suicide. Means restriction should be part of their management (e.g., no access to guns, limited medication supply). Coping skills building will be important to mitigate chronic risk. Outpatient mental health treatment should also address co-occurring psychiatric symptoms which may or may not be driving suicidal thoughts and/or behaviors.   

For more information visit the full Clinical Practice Guide at http://www.healthquality.va.gov/guidelines/MH/srb/

For guidance on proactive outreach and intervention strategies visit the Toolkit for Interventions for Patients at High Risk for Suicide as Identified through Predictive Modeling at http://www.hyperlink.va.gov'
)

INSERT INTO Ref_ClinicalGuidelines
VALUES(2, 'CHRONIC INTERMEDIATE RISK
Features 
These individuals may feature chronicity of psychiatric, substance abuse, medical, and painful conditions. However, protective factors, coping skills, reasons for living, and relative psychosocial stability suggest a relatively enhanced ability to endure future crisis without resorting to self-directed violence and/or suicide.
Action 
Routine mental health care to optimize psychiatric condition and maintain/enhance coping skills and protective factors is indicated. A safety plan should be in place. Outpatient mental health treatment should also address co-occurring psychiatric symptoms which may or may not be driving suicidal thoughts and/or behaviors.  

For more information visit the full Clinical Practice Guide at http://www.healthquality.va.gov/guidelines/MH/srb/

For guidance on proactive outreach and intervention strategies visit the Toolkit for Interventions for Patients at High Risk for Suicide as Identified through Predictive Modeling at http://www.hyperlink.va.gov'
)

-- *** Marital Status ***

DELETE FROM Ref_MaritalStatus
DBCC CHECKIDENT (Ref_MaritalStatus, RESEED, 1)

INSERT INTO Ref_MaritalStatus(MaritalStatusDesc) VALUES('Single/Never Married')
INSERT INTO Ref_MaritalStatus(MaritalStatusDesc) VALUES('Married')
INSERT INTO Ref_MaritalStatus(MaritalStatusDesc) VALUES('Seperated')
INSERT INTO Ref_MaritalStatus(MaritalStatusDesc) VALUES('Divorced')

-- *** Military Branch ***

DELETE FROM Ref_MilitaryBranch
DBCC CHECKIDENT (Ref_MilitaryBranch, RESEED, 1)

INSERT INTO Ref_MilitaryBranch(BranchDesc) VALUES('Air Force')
INSERT INTO Ref_MilitaryBranch(BranchDesc) VALUES('Army')
INSERT INTO Ref_MilitaryBranch(BranchDesc) VALUES('B.E.C.')
INSERT INTO Ref_MilitaryBranch(BranchDesc) VALUES('Coast Guard')
INSERT INTO Ref_MilitaryBranch(BranchDesc) VALUES('F.Commonwealth')
INSERT INTO Ref_MilitaryBranch(BranchDesc) VALUES('F.Guerilla')
INSERT INTO Ref_MilitaryBranch(BranchDesc) VALUES('F.Scouts New')
INSERT INTO Ref_MilitaryBranch(BranchDesc) VALUES('F.Scouts Old')
INSERT INTO Ref_MilitaryBranch(BranchDesc) VALUES('Marine Corps')
INSERT INTO Ref_MilitaryBranch(BranchDesc) VALUES('Merchant Seaman')
INSERT INTO Ref_MilitaryBranch(BranchDesc) VALUES('Navy')
INSERT INTO Ref_MilitaryBranch(BranchDesc) VALUES('NOAA')
INSERT INTO Ref_MilitaryBranch(BranchDesc) VALUES('USPHS')
INSERT INTO Ref_MilitaryBranch(BranchDesc) VALUES('Other')

-- *** Outreach Status ***

DELETE FROM Ref_OutreachStatus
DBCC CHECKIDENT (Ref_OutreachStatus, RESEED, 1)

INSERT INTO Ref_OutreachStatus(StatusDesc) VALUES('Not Contacted')
INSERT INTO Ref_OutreachStatus(StatusDesc) VALUES('Outreach Initiated')
INSERT INTO Ref_OutreachStatus(StatusDesc) VALUES('Outreach Attempted – No Response')
INSERT INTO Ref_OutreachStatus(StatusDesc) VALUES('Services Refused')
INSERT INTO Ref_OutreachStatus(StatusDesc) VALUES('No Additional Outreach Required')

-- *** Cancel Code ***

INSERT INTO Ref_VistACancelNoShowCode(CancelNoShowCodeID, CancelNoShowCodeDesc) VALUES('C', 'Clinic Cancelled')

INSERT INTO Ref_VistACancelNoShowCode(CancelNoShowCodeID, CancelNoShowCodeDesc) VALUES('CA', 'Clinic Cancelled and Auto Re-Book')
INSERT INTO Ref_VistACancelNoShowCode(CancelNoShowCodeID, CancelNoShowCodeDesc) VALUES('PC', 'Patient Cancelled')
INSERT INTO Ref_VistACancelNoShowCode(CancelNoShowCodeID, CancelNoShowCodeDesc) VALUES('PCA', 'Patient Cancelled and Auto Re-Book')

-- *** Race ***

DELETE FROM Ref_Race
DBCC CHECKIDENT (Ref_Race, RESEED, 1)

INSERT INTO Ref_Race(RaceDesc) VALUES('American Indian or Alaska Native')
INSERT INTO Ref_Race(RaceDesc) VALUES('Asian or Pacific Islander')
INSERT INTO Ref_Race(RaceDesc) VALUES('Black or African American')
INSERT INTO Ref_Race(RaceDesc) VALUES('Caucasian')
INSERT INTO Ref_Race(RaceDesc) VALUES('Hispanic, Black')
INSERT INTO Ref_Race(RaceDesc) VALUES('Hispanic, White')
INSERT INTO Ref_Race(RaceDesc) VALUES('Mexican American')