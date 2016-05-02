
use GetaJob

--select * into JobListingTemp from JobListing   

select * from JobListing   
select * from JobListingTemp

insert JobListing (jobsearchid,postedDate,agentid,targetcompanyId,rate,comments,distance)
select jobsearchId,postedDate,AgentId,targetcompanyid,rate,comments,distance from JobListingTemp

