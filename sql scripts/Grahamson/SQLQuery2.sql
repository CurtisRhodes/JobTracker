use JobTracker

select * from Estimate

select * from Project where JobStatus = 'S07'
select * from Project where JobStatus = 'S08'

select * from Project order by ProjectId desc

select * from Refs where RefType = 'STA'




select * from vProject
order by ProjectId desc
select * from OrderManagement..OrderMasters

select * from vStatusCounts
select * from CustomerProperty
update CustomerProperty set PropertyContactName = 'Contact Name', PropertyContactPhone = '214-123-4567'

select * from JobTracker..vJobList where Status = (select refdescription from refs where RefCode = 'S01')

select * from vJobList
where [status] != 'Archived'
order by [status], Id desc
  

select * from JobTracker..Estimate 
where ProjectId = 291

update Project set EstimatedDays = 2

select * from JobTracker..Project
select * from JobTracker..JobCost 
select * from JobTracker..Estimate 

select * from JobTracker..vJobList where Status = (select refdescription from refs where RefCode = 'S08')
select * from JobTracker..Project where projectid = 285





