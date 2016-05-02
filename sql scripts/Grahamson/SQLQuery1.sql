use Grahamson

select PropertyId, PropertyName +' ' + PropertyAddressCity + ', ' + PropertyAddressState Property from CustomerProperty
where CustomerId = 3

select * from vProperty

select * from vJobList
order by Id desc

select * from Project
select * from Refs where RefType = 'JST'

update Project set JobStatus = 'CMP'
update Project set JobType = 'CAM'
update Project set JobStatus = 'REQ' where DateRequested > '11/11/15'

-- select name from Grahamson..syscolumns where id = (select id from Grahamson..sysobjects where name='vProject') order by colorder

select c.CustomerName, c.CustomerId, p.ProjectId, cp.PropertyName from Project p
join CustomerProperty cp on p.PropertyId = cp.PropertyId
join Customer c on c.CustomerId = cp.CustomerId

update Project set JobType = 'HOT' where ProjectId in (select p.ProjectId from Project p
join CustomerProperty cp on p.PropertyId = cp.PropertyId where cp.CustomerId =3)
