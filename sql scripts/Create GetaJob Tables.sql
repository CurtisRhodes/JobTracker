--create database GetaJob

USE GetaJob
/*
drop table JobSearchActivity
drop table JobListingRequirement 
drop table JobSkill  
drop table Job
drop table JobListing
drop table Agent
drop table Agency
drop table JobSearch
drop table TargetCompany
drop table GetaJob_User
--drop table Ref
*/

create table GetaJob_User(
	UserId varchar(50) primary key clustered,
	FirstName varchar(50),
	LastName varchar(50),
	UserName varchar(50) unique,	
	[Password] varchar(500),
	CurrentJobSearchId int,
	dob date 
)
create table JobSearch(
	JobSearchId int identity(1,1) primary key clustered,
	Start date not null,
	Completed date,
	[Description] varchar(950),
	UserId varchar(50) foreign key references GetaJob_User(UserId) not null
)
create table TargetCompany(
	CompanyId int identity(1,1) primary key clustered,
	Name varchar(200),
	StreetAddress varchar(150),
	City varchar(150),
	State char(2),
	Zip varchar(15)
)
create table Agency(
	AgencyId int identity(1,1) primary key clustered,
	Name varchar(200),
	StreetAddress varchar(150),
	City varchar(150),
	State char(2),
	Zip varchar(15),
	WorkPhone varchar(50),
	CellPhone varchar(50),
	Email varchar(50)
)
create table Agent(
	AgentId int identity(1,1) primary key clustered,
	AgencyId int foreign key references Agency(AgencyId),
	AgentName varchar(350),
	WorkPhone varchar(50),
	CellPhone varchar(50),
	Email varchar(50)
)
create table JobListing(
	JobListingId int identity(1,1) primary key clustered,
	JobSearchId int foreign key references JobSearch(JobSearchId),
	PostedDate date,
	ListingStatus int,
	AgentId int foreign key references Agent(AgentId), 
	TargetCompanyId int foreign key references TargetCompany(CompanyId), 
	JobTitle varchar(250),
	Rate varchar(50),
	EmploymentType int,
	Comments text,
	Distance varchar(150), 
	ListingSource int,
	Desirability int,
	Fit int,
)
create table JobSearchActivity(
	JobSearchActivityId int identity(1,1) primary key clustered,
	JobListingId int foreign key references JobListing(JobListingId),
	ActivityDate date not null,
	ActivityStatus int,
	Comments varchar(600),
)

create table Job(
	JobId int identity(1,1) primary key clustered,
	UserId varchar(50) foreign key references GetaJob_User(UserId) not null, 
	CompanyId int foreign key references TargetCompany(CompanyId) not null, 
	DateOfEmployment date,
	Terminated date,
	Explanation varchar(max),
	JobTitle varchar(50)
)
create table JobSkill(
	JobSkillId int identity(1,1) primary key clustered,
	JoId int foreign key references Job(JobId) not null, 
	JobSkillTitle varchar(250),
	JobSkill varchar(max),
	JobSkillType int,
)
create table JobListingRequirement (
	JobListingRequirementId int identity(1,1) primary key clustered,
	JobListingId int foreign key references JobListing(JobListingId),
	JobSkillId int foreign key references JobSkill(JobSkillId),
	DesiredId int
)
















