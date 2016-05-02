
use JobTracker

--select * from Refs
drop table Refs
create table Refs(
  RefType char(3),
  RefCode char(3) unique,
  RefDescription varchar(200),
)
set nocount on

insert Refs values ('000','000','RefTypes')
insert Refs values ('000','TYP','Job Type')
insert Refs values ('TYP','CAM','Campus Housing')
insert Refs values ('TYP','TUR','Turn')
insert Refs values ('TYP','HOT','Hotel')
insert Refs values ('TYP','LWN','Lawn')

insert Refs values ('000','STA','Job Status')
insert Refs values ('STA','S00','New Request')
insert Refs values ('STA','S01','Scope Completed')
insert Refs values ('STA','S02','Bid Estimate Completed')
insert Refs values ('STA','S03','Prposal Submitted')
insert Refs values ('STA','S04','Awarded')
insert Refs values ('STA','S05','Scheduled')
insert Refs values ('STA','S06','Work In Progress')
insert Refs values ('STA','S07','Work Complete')
insert Refs values ('STA','S08','Invoice Sent')
insert Refs values ('STA','S09','Payment Received')
insert Refs values ('STA','S10','Canceled')
insert Refs values ('STA','S11','Archived')

set nocount off



