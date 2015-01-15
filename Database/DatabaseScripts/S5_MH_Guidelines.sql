-- *** ADDED During Sprint 7

CREATE TABLE RiskFactors( 
 RiskFactorCode varchar(10),
 RiskFactorName varchar(50),
 RiskfactorDescription varchar(255))
GO

CREATE TABLE RiskFactorGuidelines(
 RiskFactorCode varchar(10),
 Priority int,
 Guideline varchar(1000))
GO

INSERT INTO RiskFactors
VALUES('SUD', 'Substance Abuse Disorder', 'Substance Abuse Disorder')
INSERT INTO RiskFactors
VALUES('MDD', 'Major Depressive Disorder', 'Major Depressive Disorder')
INSERT INTO RiskFactors
VALUES('UNEMP', 'Unemployment', 'Unemployment or lack of a job that provides adequate income and/or fully uses person’s training and skills')
INSERT INTO RiskFactors
VALUES('FINAN', 'Financial Difficulties', 'Financial Difficulties')
INSERT INTO RiskFactors
VALUES('LEGAL', 'Legal Issues', 'Legal issues')
INSERT INTO RiskFactors
VALUES('RLTN', 'Relationship ', 'Relationship (Lack of family or friends that are knowledgeable and actively supportive)')
INSERT INTO RiskFactors
VALUES('HOME', 'Homelessness', 'Homelessness (Lack of safe, decent, affordable, stable housing that is consistent with treatment goals)')
INSERT INTO RiskFactors
VALUES('SOCL', 'Lack of Social Support', 'Lack of social support (i.e. self-induced or circumstantial, and is socially inactive or isolated)')
INSERT INTO RiskFactors
VALUES('PRSN', 'Personal Services', 'Inability to coordinate and locate personal services')
INSERT INTO RiskFactors
VALUES('INFORM', 'Inform', 'Patient/family and other significant social supports are not fully informed about aspects of health needs')
INSERT INTO RiskFactors
VALUES('SPIRIT', 'Requests Spiritual Support', 'Requests spiritual support')

INSERT INTO RiskFactorGuidelines
VALUES('SUD', 1, 'Ongoing management of suicidal patients with SUD should include treatment by a licensed mental health practitioner')
INSERT INTO RiskFactorGuidelines
VALUES('SUD', 2, 'In addition to suicidality-focused interventions, treatment should be provided for an underlying SUD condition (e.g., addiction). Ensure that management of suicide risk is coordinated or integrated with treatment for substance use disorder and comorbid conditions')
INSERT INTO RiskFactorGuidelines
VALUES('SUD', 3, 'Intervention strategies in patients in whom suicide risk is associated with using substances should emphasize safety, relapse prevention, and addressing the substance use')
INSERT INTO RiskFactorGuidelines
VALUES('SUD', 4, 'In the effort to limit access to lethal means, pay special attention in this population to restriction of lethal means as firearms, and prescribed medication (dosage and quantities)')
INSERT INTO RiskFactorGuidelines
VALUES('MDD', 1, 'Screening should be done using a standardized tool such as the Patient Health Questionnaire (PHQ-2), a 2 item screen.  A standardized assessment tool such as the PHQ-9 should be used as an aid for diagnosis measurement of symptom severity and to assess treatment response')
INSERT INTO RiskFactorGuidelines
VALUES('MDD', 2, 'Mild depression can be effectively treated with either medication or psychotherapy. Moderate depression should include a combination of therapy and medication')
INSERT INTO RiskFactorGuidelines
VALUES('MDD', 3, 'Patients treated with antidepressants should be closely observed for possible worsening of
depression or suicidality, especially at the beginning of therapy or when the dose increases or decreases')
INSERT INTO RiskFactorGuidelines
VALUES('MDD', 4, 'Evidence-based short-term psychotherapies, such as Cognitive Behavioral Therapy (CBT),
Interpersonal Therapy (IPT) and Problem Solving Therapy (PST) are recommended treatment options for major depression. Other psychotherapies are treatment options for specific populations or are based on patient preference. Patients require frequent visits early in treatment to assess response to intervention, suicidalideation, side effects, and psychosocial support systems')
INSERT INTO RiskFactorGuidelines
VALUES('MDD', 5, 'See full link http://www.healthquality.va.gov/guidelines/MH/mdd/CPGMDDCorrectedSummary053013.pdf')
INSERT INTO RiskFactorGuidelines
VALUES('UNEMP', 1, 'Implement vocational rehabilitation training; comprehensive employment readiness through training, resume building, and referral')
INSERT INTO RiskFactorGuidelines
VALUES('FINAN', 1, 'Social services referral and evaluation; consider housing, employment, or public assistance requirements')
INSERT INTO RiskFactorGuidelines
VALUES('LEGAL', 1, 'Consider to referral to Veteran’s Justice Outreach, military base Community Services, or local community resources')
INSERT INTO RiskFactorGuidelines
VALUES('RLTN', 1, 'Family advocacy & counseling. Implement family skills training, spiritual counseling, group therapy, social engagement')
INSERT INTO RiskFactorGuidelines
VALUES('HOME', 1, 'Address independent living skills, refer to supported housing services, and reconnection with family members HCHV')
INSERT INTO RiskFactorGuidelines
VALUES('SOCL', 1, 'Implement social skills training, assessment of personal support network and re-engagement')
INSERT INTO RiskFactorGuidelines
VALUES('PRSN', 1, 'Use of case management services')
INSERT INTO RiskFactorGuidelines
VALUES('INFORM', 1, 'Provide education, include in treatment planning as patient allows')
INSERT INTO RiskFactorGuidelines
VALUES('SPIRIT', 1, 'Provide information /access to religious and spiritual advisors or other support')