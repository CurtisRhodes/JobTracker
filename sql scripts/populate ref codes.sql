
use Grahamson

--select * from Refs
drop table Refs
create table Refs(
  RefType char(3),
  RefCode char(3) unique,
  RefDescription varchar(200),
)
set nocount on

insert Refs values ('000','000','RefTypes')
insert Refs values ('000','JTP','Job Type')
insert Refs values ('JTP','CAM','Campus Housing')
insert Refs values ('JTP','TUR','Turn')
insert Refs values ('JTP','HOT','Hotel')
insert Refs values ('JTP','LWN','Lawn')

insert Refs values ('000','JST','Job Status')
insert Refs values ('JST','REQ','Requested')
insert Refs values ('JST','BID','Bid Completed')
insert Refs values ('JST','APR','Bid Approved and Submitted')
insert Refs values ('JST','AWD','Awarded')
insert Refs values ('JST','STR','Work Started')
insert Refs values ('JST','CMP','Job Completed')
insert Refs values ('JST','INV','Invoice Sent')
insert Refs values ('JST','PAI','Payment Received')

set nocount off



