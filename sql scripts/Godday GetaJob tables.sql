--select * from userprofile

create table getaJob.Refs(
	RefType char(3) not null,
	RefCode char(3) not null unique,
	RefDescription varchar(250) not null
)

create table getaJob.JobSearch(
	JobSearchId uniqueidentifier rowguidcol primary key clustered default newid(),
	Start date not null,
	Completed date,
	[Description] varchar(950),
	IsActive bit,
	--PersonId uniqueidentifier foreign key references Person(PersonId) 
	UserName varchar(200)
)

drop table getaJob.JobListing
drop table getaJob.JobSearchActivity

create table getaJob.JobListing(
	JobListingId uniqueidentifier rowguidcol primary key clustered default newid(),
	JobSearchId uniqueidentifier foreign key references getaJob.JobSearch(JobSearchId),
	PostedDate date,
	ListingStatus char(3),
	Agent varchar(250),
	Agency varchar(250),
	TargetCompany varchar(250),
	PhoneNumber varchar(100),
	CellPhone varchar(100),
	Email varchar(100),
	JobTitle varchar(250),
	Rate varchar(50),
	EmploymentType varchar(103),
	JobLocation varchar(150)
)
create table getaJob.JobSearchActivity(
	JobSearchActivityId uniqueidentifier rowguidcol primary key clustered default newid(),
	JobListingId uniqueidentifier foreign key references getaJob.JobListing(JobListingId),
	ActivityDate date not null,
	ActivityType char(3),
	ActivityStatus char(3),
	Comments text
)
