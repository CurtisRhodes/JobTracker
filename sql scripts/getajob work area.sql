use GetaJob

select * from sysobjects
where type = 'U'


select * from GetaJob_User
select * from JobSearch
select * from JobListing
 
select * from Ref where RefType='000'
select * from TargetCompany
select * from Agent
select * from Agency
select * from vJobListing
select * from JobSearchActivity

select * from Ref where RefType='AST'
insert JobSearchActivity(JobListingId,ActivityDate,ActivityStatus,comments) values (2,'2/11/16','LAA','this is a test')
insert JobSearchActivity(JobListingId,ActivityDate,ActivityStatus,comments) values (3,'2/11/16','LAA','this is a test')





insert GetaJob_User(FirstName,LastName,UserName,UserId,Password,dob) values('Curtis','Rhodes','Cooler','crhodes','R@quel11','7/3/55')
insert JobSearch(Start,Description,UserId)values('2/2/16','Groundhog Day','crhodes')
insert TargetCompany(Name,StreetAddress) values ('Some Nice Company','123 Any Street')
insert Agency(Name,StreetAddress,City) values ('Some Damn Agency','123 Any Street','Dallas')

insert JobListing(JobSearchId,PostedDate,ListingStatus,TargetCompanyId,JobTitle,Rate,EmploymentType,Comments,Distance,ListingSource,Desirability,Fit)
values(1,'2/9/16','LSA',1,'lackey','$45/hr','CH2','what a way to wates a day','9 miles','LI2','DE1','FI2')

update JobListing set JobSearchId=1


update agent set agentname = 'Kristina Sedjo' where agentId = 4
update agency set name = 'Digital Intelligence Systems, LLC (DISYS)' where AgencyId=3

