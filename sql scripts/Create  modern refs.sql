use GetaJob

--select * from DropDownValues where reftype = 0

drop table DropDownValues
create table DropDownValues(
	RefType int,
	RefCode int identity(0,1) primary key,
	RefDescription varchar(250) not null
)
--set nocount on
insert DropDownValues (RefType, RefDescription)  values
(null,'Reference Types'),
(0,'Activity Status'),
(0,'Listing Status'),
(0,'Listing Source'),
(0,'Desirability'),
(0,'Employment Type'),
(0,'Fit'),
(0,'Device Type'),

(1,'You need to do something'),
(1,'Resume Sent'),
(1,'phone interview scheduled'),
(1,'phone interview taken'),
(1,'Face to Face interview scheduled'),
(1,'Face to Face interview taken'),
(1,'Rejected'),
(1,'Offered the job'),
(1,'Passed on Offer'),
(1,'Accepted Offer'),

(2,'Activie'),
(2,'Stale'),
(2,'Closed'),

(3,'Headhunter cold call'),
(3,'Unsolicited Email'),
(3,'Career Builder'),
(3,'Dice'),
(3,'Monster'),

(4,'meeh'),
(4,'hey its a job'),
(4,'sweet'),
(4,'dream job'),

(5,'Contract W2'),
(5,'Contract to Hire W2'),
(5,'Fulltime'),
(5,'Contract 1099'),

(6,'Fit'),
(6,'no problem'),
(6,'a bit of a stretch'),

(7,'Home Phone'),
(7,'Work Phone'),
(7,'Cell Phone'),
(7,'Primary Email'),
(7,'Second Email')











