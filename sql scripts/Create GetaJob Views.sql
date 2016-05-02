
use GetaJob
go

alter view vJobListing as 
select PostedDate, rListingStatus.RefDescription [Listing Status], targetCompany.Name targetCompany, targetCompany.City,targetCompany.[State],
	JobTitle,Rate, rEmploymentType.RefDescription [Employment Type],Comments,Distance, rListingSource.RefDescription [Listing Source],
	rDesirability.RefDescription Desitability, rFit.RefDescription Fit
from JobListing
left join TargetCompany on CompanyId = TargetCompanyId
left join Ref rListingStatus on rListingStatus.RefCode = ListingStatus
left join ref rEmploymentType on rEmploymentType.RefCode = EmploymentType 
left join ref rListingSource on rListingSource.RefCode = ListingSource
left join ref rDesirability on rDesirability.RefCode = Desirability
left join ref rFit on rFit.RefCode = Fit

