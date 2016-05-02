


select * from [dbo].['2014 Job #s$']
select * from Jobs2013
select * from Jobs2014
select * from Jobs2015
select * from CustomerProperty
select * from Project

update Jobs2015 set [City/State] = 'Abilene, TX' where [City/State] = 'Abilene'
update Jobs2015 set [City/State] = 'Denton, TX' where [City/State] = 'Denton'
update Jobs2015 set [City/State] = 'Denton, TX' where [City/State] = 'Denton TX'
update Jobs2015 set [City/State] = 'Plano, TX' where [City/State] = 'Plano TX'
update Jobs2015 set [City/State] = 'Nacogdoches, Tx' where [City/State] = 'Nacogdoches Tx'
update Jobs2015 set [City/State] = 'Seattle, WA' where [City/State] = 'Washington'

drop table propTemp
select [Job Number] JobNumber, [property/location] property, [City/State] location into propTemp from Jobs2015

insert Customer (CustomerName) values ('Grove Management Company')
insert Customer (CustomerName) values ('Campus Property Management Company')
insert Customer (CustomerName) values ('Hotel Management Company')

select distinct property,location from proptemp
where property != 'The Grove'

update propTemp set location = 'Abilene, TX' where property = 'The Grove' and location = 'Abilene'
update propTemp set location = 'Denton, TX' where property = 'The Grove' and location = 'Denton'
update propTemp set location = 'Denton, TX' where property = 'City Parc' and location = 'Denton TX'
update propTemp set location = 'Denton, TX' where property = 'Midtown' and location = 'Denton TX'
update propTemp set location = 'Denton, TX' where property = 'Uptown' and location = 'Denton TX'

insert CustomerProperty (CustomerId,PropertyName,PropertyAddressStreet)
select distinct 3,property,location from proptemp
where property != 'The Grove'

update CustomerProperty set PropertyAddressCity = SUBSTRING(PropertyAddressStreet,0,CHARINDEX(',',PropertyAddressStreet)) 
update CustomerProperty set PropertyAddressState = SUBSTRING(PropertyAddressStreet,CHARINDEX(',',PropertyAddressStreet)+2,2)
update CustomerProperty set PropertyAddressCity = PropertyAddressStreet where PropertyId in (10,18)
update CustomerProperty set PropertyAddressCity = 'Plano', PropertyAddressState = 'TX' where PropertyId = 33
update CustomerProperty set PropertyAddressCity = 'Nacogdoches', PropertyAddressState = 'TX' where PropertyId = 10
update CustomerProperty set PropertyAddressState = 'TN' where PropertyId = 2
update CustomerProperty set PropertyAddressCity = 'Seattle', PropertyAddressState = 'WA' where PropertyId = 18

select * from CustomerProperty
select * from Jobs2015 where [Job Number] is null

insert Project (PropertyId,GrahmsonId,JobName,DateRequested,DateAwarded,DateStarted,DateCompleted,DateBilled)
select p.PropertyId, j.[Job Number],[job name], j.[Date Request'd], j.[Date Awarded], j.[Date Started], j.[Date Complete], j.[Date Billed] -- 299
 from Jobs2015 j
 left join vProperty p on p.PropertyName = j.[Property/Location] and SUBSTRING([City/State],0,CHARINDEX(',',[City/State])) = p.PropertyAddressCity
 where j.[Job Number] is not null

select * from vproject
select * from project


