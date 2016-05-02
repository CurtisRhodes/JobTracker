use GetaJob

drop table Ref
create table Ref(
	RefType char(3) not null,
	RefCode char(3) primary key,
	RefDescription varchar(250) not null
)

set nocount on
insert Ref (RefType, RefCode, RefDescription)  values
('000','000','Reference Types'),

('000','AST','Activity Status'),
('AST','LAA','You need to do something'),
('AST','LAC','Resume Sent'),
('AST','LAD','phone interview scheduled'),
('AST','LAE','phone interview taken'),
('AST','LAF','Face to Face interview scheduled'),
('AST','LAG','Face to Face interview taken'),
('AST','LAH','Rejected'),
('AST','LAI','Offered the job'),
('AST','LAJ','Passed on Offer'),
('AST','LAK','Accepted Offer'),

('000','LST','Listing Status'),
('LST','LSA','Activie'),
('LST','LSB','Stale'),
('LST','LSC','Closed'),

('000','EMP','Employment Type'),	
('EMP','CW2','Contract W2'),
('EMP','CH2','Contract to Hire W2'),
('EMP','FLT','Fulltime'),
('EMP','C2C','Contract 1099'),

('000','LTS','Listing Source'),
('LTS','LI1','Headhunter cold call'),
('LTS','LI2','Unsolicited Email'),
('LTS','LI3','Career Builder'),
('LTS','LI4','Dice'),
('LTS','LI5','Monster'),

('000','DES','Desirability'),
('DES','DE1','meeh'),
('DES','DE2','hey its a job'),
('DES','DE3','sweet'),
('DES','DE4','dream job'),

('000','FIT','Fit'),
('FIT','FI1','no problem'),
('FIT','FI2','a bit of a stretch'),

('000','DEV','DeviceType'),
('DEV','HPH','Home Phone'),
('DEV','WPH','Work Phone'),
('DEV','CPH','Cell Phone'),
('DEV','EM1','Primary Email'),
('DEV','EM2','Second Email')











