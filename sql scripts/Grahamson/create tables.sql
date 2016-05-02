--create database Grahamson
use JobTracker

create table Customer (
  CustomerId int identity(1,1) primary key clustered,
  CustomerName varchar(300),
  BillingAddressStreet varchar(300), 
  BillingAddressCity varchar(300), 
  BillingAddressState varchar(2), 
  BillingAddressZip varchar(30), 
  ContactName varchar(300),
  ContactPhone varchar(100),
  ContactEmail varchar(200)
)

create table CustomerProperty(
  PropertyId int identity(1,1) primary key clustered,
  CustomerId int foreign key references Customer(CustomerId),
  PropertyName varchar(300),
  PropertyAddressStreet varchar(300), 
  PropertyAddressCity varchar(300), 
  PropertyAddressState varchar(2), 
  PropertyAddressZip varchar(30), 
  PropertyContactName varchar(300),
  PropertyContactPhone varchar(100),
  PropertyContactEmail varchar(200)
)

create table Project(
  ProjectId int identity(1,1) primary key clustered,
  PropertyId int foreign key references CustomerProperty(PropertyId),
  GrahmsonId varchar(300),
  JobName varchar(300),
  JobDescription varchar(4000),
  JobType char(3),
  JobStatus char(3),
  EstimatedDays varchar(20),
  DateRequested Date,
  DateScoped Date,
  DateEstimated Date,
  DateBidSent Date,
  DateAwarded Date,
  DateStarted Date,
  DateCompleted Date,
  DateBilled Date,
  DatePaymentReceived Date
)

alter table Project add DateEstimated Date
alter table Project add DateScoped Date
alter table Project add JobDescription varchar(4000)
alter table Project add EstimatedDays varchar(20)


drop table Estimate

create table Estimate(
  ProjectId int foreign key references Project(ProjectId) primary key clustered,
  SupervisorHours decimal(10,2),
  SupervisorPerHour decimal(10,2),
  WorkerHours decimal(10,2),
  WorkerPerHour decimal(10,2),
  LiabilityInsurance decimal(10,2),
  MarginTax decimal(10,2),
  Trucks int,
  TruckCost decimal(10,2),
  TotalLaborCost decimal(10,2),
  TotalSpecialCharges decimal(10,2),
  TotalEquipmentCost decimal(10,2),
  TotalMaterialCost decimal(10,2),
  TotalDays int
)
alter table Estimate add MarkUp decimal(10,2)
alter table Estimate add Taxes decimal(10,2)
alter table Estimate add TotalDays int

create table JobCost(
  JobCostId int identity(1,1) primary key clustered,
  ProjectId int foreign key references Project(ProjectId),
  CostType char(3),
  CostDescription varchar(600),
  CostAmount decimal(10,2)
)



