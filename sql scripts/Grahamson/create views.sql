use JobTracker
go
alter view vProperty as
select p.PropertyId, c.CustomerName, PropertyName, PropertyAddressCity, PropertyAddressState 
from CustomerProperty p
join Customer c on c.CustomerId = p.CustomerId
go
alter view vProject as
select j.ProjectId, j.GrahamsonId, c.CustomerName Customer, p.PropertyName + ' ' + p.PropertyAddressCity + ', '+ p.PropertyAddressState Property, 
j.JobDescription, j.JobName, rJobType.RefDescription JobType, rJobStatus.RefDescription JobStatus,
p.PropertyContactName ContactName, p.PropertyContactPhone ContactPhone
--j.DateRequested --, j.DateBidSent, j.DateAwarded, j.DateStarted, j.DateCompleted, j.DateBilled, j.DatePaymentReceived
from Project j
join CustomerProperty p on p.PropertyId = j.PropertyId
join Customer c on c.CustomerId = p.CustomerId
join Refs rJobType on j.JobType = rJobType.RefCode
join Refs rJobStatus on j.JobStatus = rJobStatus.RefCode
go
alter view vJobList as
select j.ProjectId Id, j.GrahamsonId [Job Number], rs.RefDescription [Status] , SUBSTRING(p.PropertyName,0,20) Property, 
p.PropertyAddressCity City, p.PropertyAddressState [State], 
rT.refDescription JobType, j.JobName [Job Name],
convert(varchar(8),j.DateRequested,11) Requested,
coalesce(convert(varchar(8),j.DateBidSent,11),'') Bid, coalesce(convert(varchar(8),j.DateAwarded,11),'') Awarded,
coalesce(convert(varchar(8),j.DateStarted,11),'') [Started], coalesce(convert(varchar(8),j.DateCompleted,11),'') Completed
from Project j
join CustomerProperty p on p.PropertyId = j.PropertyId
join Customer c on c.CustomerId = p.CustomerId
join Refs rS on rS.RefCode = j.JobStatus
join Refs rT on rT.RefCode = j.JobType
go
alter view vStatusCounts as
select
(select count(*) from Project where JobStatus = 'S00') Requested,
(select count(*) from Project where JobStatus = 'S01') Scope,
(select count(*) from Project where JobStatus = 'S02') Estimate,
(select count(*) from Project where JobStatus = 'S03') Proposal,
(select count(*) from Project where JobStatus = 'S04') Awarded,
(select count(*) from Project where JobStatus = 'S05') Scheduled,
(select count(*) from Project where JobStatus = 'S06') WorkInProgress,
(select count(*) from Project where JobStatus = 'S07') WorkComplete,
(select count(*) from Project where JobStatus = 'S08') Invoiced,
(select count(*) from Project where JobStatus = 'S09') PaymentReceived
go







