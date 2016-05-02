--create database Grahamson
use Grahamson

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
  JobType char(3),
  JobStatus char(3),
  DateRequested Date,
  DateBidSent Date,
  DateAwarded Date,
  DateStarted Date,
  DateCompleted Date,
  DateBilled Date,
  DatePaymentReceived Date
)


