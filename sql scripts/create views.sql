use Grahamson
go
alter view vProperty as
select p.PropertyId, c.CustomerName, PropertyName, PropertyAddressCity, PropertyAddressState 
from CustomerProperty p
join Customer c on c.CustomerId = p.CustomerId
go
alter view vProject as
select j.ProjectId, j.GrahmsonId, c.CustomerName Customer, p.PropertyName Property, p.PropertyAddressCity City, p.PropertyAddressState [State], 
j.DateRequested, j.DateBidSent, j.DateAwarded, j.DateStarted, j.DateCompleted, j.DateBilled, j.DatePaymentReceived
from Project j
join CustomerProperty p on p.PropertyId = j.PropertyId
join Customer c on c.CustomerId = p.CustomerId

