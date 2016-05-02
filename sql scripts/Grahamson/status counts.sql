use JobTracker


select * from Refs where RefType = 'JST'
select * from Project order by ProjectId desc  --  292

set nocount on
update Project set JobStatus = 'S11'                         -- Archived
update Project set JobStatus = 'S10' where ProjectId > 170  -- Canceled
update Project set JobStatus = 'S09' where ProjectId > 180  -- Payment Received
update Project set JobStatus = 'S08' where ProjectId > 200  -- Invoice Sent
update Project set JobStatus = 'S07' where ProjectId > 210  -- Work Completed
update Project set JobStatus = 'S06' where ProjectId > 220  -- Work In Progress
update Project set JobStatus = 'S05' where ProjectId > 230  -- Scheduled
update Project set JobStatus = 'S04' where ProjectId > 240  -- Awarded
update Project set JobStatus = 'S03' where ProjectId > 250  -- Proposal Submitted 
update Project set JobStatus = 'S02' where ProjectId > 260  -- Estimate Completed
update Project set JobStatus = 'S01' where ProjectId > 270  -- Scope Completed
update Project set JobStatus = 'S00' where ProjectId > 280  -- Requested
set nocount off

select * from vStatusCounts

select distinct Status from vJobList 

select * from vJobList where Status = (select refdescription from refs where RefCode = 'S00')









