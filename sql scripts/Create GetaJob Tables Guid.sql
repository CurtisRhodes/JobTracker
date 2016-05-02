--create database GetaJob

USE GetaJob

drop table JobSearchActivity
drop table Job
drop table EntityDevice
drop table JobSkill  
drop table JobListing
drop table Headhunter
drop table Agency
drop table JobSearch
drop table Company
drop table PostalCode
drop table Person
drop table Ref

create table Person(
	PersonId uniqueidentifier rowguidcol primary key clustered default newid(),
	FirstName varchar(50),
	LastName varchar(50),
	dob date 
)
create table PostalCode(	
	Code varchar(10) primary key clustered not null,
	City varchar(150) not null,
	PostOffice varchar(150),
	State char(2)
)
create table Company(
	CompanyId uniqueidentifier rowguidcol primary key clustered default newid(),
	Name varchar(200),
	StreetAddress varchar(150),
	PostalCode varchar(10) foreign key references PostalCode(Code)
)
create table Agency(
	CompanyId uniqueidentifier primary key clustered foreign key references Company(CompanyId)
)
create table Headhunter(
	HeadhunterId uniqueidentifier rowguidcol primary key clustered default newid(),
	AgencyId uniqueidentifier foreign key references Agency(CompanyId),
	PersonId uniqueidentifier foreign key references Person(PersonId)
)
create table Ref(
	RefId uniqueidentifier rowguidcol primary key clustered default newid(),
	RefType char(3) not null,
	RefCode char(3) not null unique,
	RefDescription varchar(250) not null,
    unique(RefCode,RefType)
)
create table JobSearch(
	JobSearchId uniqueidentifier rowguidcol primary key clustered default newid(),
	Start date not null,
	Completed date,
	[Description] varchar(950),
	PersonId uniqueidentifier foreign key references Person(PersonId) not null
)
create table JobListing(
	JobListingId uniqueidentifier rowguidcol primary key clustered default newid(),
	JobSearchId uniqueidentifier foreign key references JobSearch(JobSearchId),
	PostedDate date,
	ListingStatus char(3) foreign key references Ref(RefCode),
	AgentId uniqueidentifier foreign key references Headhunter(HeadhunterId), 
	TargetCompany uniqueidentifier foreign key references Company(CompanyId), 
	JobTitle varchar(250),
	Rate varchar(50),
	EmploymentType char(3) foreign key references Ref(RefCode),
	Comments text,
	Distance varchar(150), 
	ListingSource char(3) foreign key references Ref(RefCode),
	Desirability char(3) foreign key references Ref(RefCode), 
	Fit char(3) foreign key references Ref(RefCode),
)
create table JobSkill(
	JobSkillId uniqueidentifier rowguidcol primary key clustered default newid(),
	JobOrListingId uniqueidentifier not null,
	SkillId char(3) foreign key references Ref(RefCode),
	RequiredId char(3) foreign key references Ref(RefCode)
)
create table JobSearchActivity(
	JobSearchActivityId uniqueidentifier rowguidcol primary key clustered default newid(),
	JobListingId uniqueidentifier foreign key references JobListing(JobListingId),
	ActivityDate date not null,
	ActivityType char(3) foreign key references Ref(RefCode),
	ActivityStatus char(3) foreign key references Ref(RefCode),
)
create table EntityDevice(
	EntityDeviceId uniqueidentifier rowguidcol primary key clustered default newid(),
	EntityId uniqueidentifier not null,
	DeviceType char(3) foreign key references Ref(RefCode) not null,
	Endpoint varchar(150) not null
) 	
create table Job(
	JobId uniqueidentifier rowguidcol primary key clustered default newid(),
	PersonId uniqueidentifier foreign key references Person(PersonId) not null, 
	CompanyId uniqueidentifier foreign key references Company(CompanyId) not null, 
	DateOfEmployment date,
	Terminated date,
	JobTitle varchar(50)
)
set nocount on
insert Ref (RefType, RefCode, RefDescription)  values
('000','000','Reference Types'),
('000','DEV','DeviceType'),
('DEV','HPH','Home Phone'),
('DEV','WPH','Work Phone'),
('DEV','CPH','Cell Phone'),
('DEV','EM1','Primary Email'),
('DEV','EM2','Second Email'),

('000','LIS','Listing Status'),
('LIS','LA1','Active Hot'),
('LIS','LA2','Unsolicited Resume Sent'),
('LIS','LA3','Submitted'),
('LIS','LA4','phone interview scheduled'),
('LIS','LA5','Face to Face interview scheduled'),
('LIS','LA6','Rejected'),
('LIS','LA7','past interview still active'),
('LIS','LA8','Offered the job'),
('LIS','LA9','Accepted Offer'),

('000','EMP','Employment Type'),	
('EMP','CW2','Contract W2'),
('EMP','CH2','Contract to Hire W2'),
('EMP','FLT','Fulltime'),
('EMP','C2C','Contract 1099'),

('000','LIT','Listing Source'),
('LIT','LI1','Headhunter cold call'),
('LIT','LI2','Career Builder'),
('LIT','LI3','Dice'),
('LIT','LI4','Monster'),

('000','DES','Desirability'),
('DES','DE1','meeh'),
('DES','DE2','hey its a job'),
('DES','DE3','sweet'),
('DES','DE4','dream job'),

('000','FIT','Fit'),
('FIT','FI1','no problem'),
('FIT','FI2','a bit of a stretch')














