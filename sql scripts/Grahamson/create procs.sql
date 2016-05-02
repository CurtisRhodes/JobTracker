use JobTracker
go
alter proc ProjectAddEdit
  @ProjectId int,
  @PropertyId int,
  @GrahamsonId varchar(300),
  @JobName varchar(300),
  @JobDescription varchar(4000) = null,
  @JobType char(3),
  @JobStatus char(3),
  @EstimatedDays varchar(20) = null,
  @DateRequested Date,
  @DateBidSent Date = null,
  @DateAwarded Date = null,
  @DateStarted Date = null,
  @DateCompleted Date = null,
  @DateBilled Date = null,
  @DatePaymentReceived Date = null,
  @DateScoped Date = null,
  @DateEstimated Date = null
as
 if(@ProjectId = 0)
  begin
    insert Project(PropertyId,GrahamsonId,JobName,JobDescription, JobStatus,JobType,EstimatedDays, 
	   DateRequested,DateBidSent,DateAwarded,DateStarted,DateCompleted,DatePaymentReceived)
	values(@PropertyId,@GrahamsonId,@JobName,@JobDescription,@JobStatus,@JobType,@EstimatedDays, 
	   @DateRequested,@DateBidSent,@DateAwarded,@DateStarted,@DateCompleted,@DatePaymentReceived)
	   select @@identity
  end
 else
  begin
    update Project set PropertyId = @PropertyId, GrahamsonId = @GrahamsonId, JobName = @JobName, JobType = @JobType, JobStatus = @JobStatus,
	   JobDescription = @JobDescription , EstimatedDays = @EstimatedDays,
	   DateRequested = @DateRequested, DateBidSent = @DateBidSent, DateAwarded = @DateAwarded, DateStarted = @DateStarted, 
	   DateCompleted = @DateCompleted, DateBilled = @DateBilled, DatePaymentReceived = @DatePaymentReceived 	   
	   where ProjectId = @ProjectId
	   select @ProjectId 
  end
go
alter proc CustomerAddEdit
  @CustomerId int,
  @CustomerName varchar(300),
  @BillingAddressStreet varchar(300) = null, 
  @BillingAddressCity varchar(300) = null, 
  @BillingAddressState varchar(2) = null, 
  @BillingAddressZip varchar(30) = null, 
  @ContactName varchar(300) = null,
  @ContactPhone varchar(100) = null,
  @ContactEmail varchar(200) = null
as
 if(@CustomerId = 0)
  begin
   insert Customer (CustomerName,BillingAddressStreet,BillingAddressCity,BillingAddressState,BillingAddressZip,
     ContactName,ContactPhone,ContactEmail)
   values (@CustomerName,@BillingAddressStreet,@BillingAddressCity,@BillingAddressState,@BillingAddressZip,
     @ContactName,@ContactPhone,@ContactEmail)
	   select @@identity
  end
 else
  begin
   update Customer set CustomerName = @CustomerName, BillingAddressStreet = @BillingAddressStreet, BillingAddressCity = @BillingAddressCity,
     BillingAddressState = @BillingAddressState, BillingAddressZip = @BillingAddressZip,
	 ContactName = @ContactName, ContactPhone = @ContactPhone, ContactEmail = @ContactEmail
    where CustomerId = @CustomerId
	select @CustomerId
  end
go
alter proc CustomerPropertyAddEdit
  @PropertyId int,
  @CustomerId int,
  @PropertyName varchar(300),
  @PropertyAddressStreet varchar(300), 
  @PropertyAddressCity varchar(300), 
  @PropertyAddressState varchar(2), 
  @PropertyAddressZip varchar(30), 
  @PropertyContactName varchar(300),
  @PropertyContactPhone varchar(100),
  @PropertyContactEmail varchar(200)
as
 if(@PropertyId = 0)
  begin
	insert CustomerProperty (CustomerId,PropertyName, PropertyAddressStreet, PropertyAddressCity, PropertyAddressState, PropertyAddressZip,
	   PropertyContactName, PropertyContactPhone, PropertyContactEmail)
	   values(@CustomerId, @PropertyName, @PropertyAddressStreet, @PropertyAddressCity, @PropertyAddressState, @PropertyAddressZip,
	     @PropertyContactName, @PropertyContactPhone, @PropertyContactEmail)
	   select @@identity
  end
 else
  begin
	update CustomerProperty set CustomerId = @CustomerId, PropertyAddressStreet = @PropertyAddressStreet, PropertyAddressCity = @PropertyAddressCity,
		PropertyAddressState = @PropertyAddressState, PropertyAddressZip = @PropertyAddressZip,
		PropertyContactName = @PropertyContactName, PropertyContactPhone = @PropertyContactPhone, PropertyContactEmail = @PropertyContactEmail
	  where PropertyId = @PropertyId
	select @PropertyId
  end


go
alter proc EstimateAddEdit
  @ProjectId int,
  @SupervisorHours decimal(10,2) = null,
  @SupervisorPerHour decimal(10,2) = null,
  @WorkerHours decimal(10,2) = null,
  @WorkerPerHour decimal(10,2) = null,
  @LiabilityInsurance decimal(10,2) = null,
  @MarginTax decimal(10,2) = null,
  @Trucks int = null,
  @TruckCost decimal(10,2) = null,
  @TotalLaborCost decimal(10,2) = null,
  @TotalEquipmentCost decimal(10,2) = null,
  @TotalMaterialCost decimal(10,2) = null,
  @TotalSpecialCharges decimal(10,2) = null,
  @MarkUp decimal(10,2) = null,
  @Taxes decimal(10,2) = null,
  @TotalDays int = null
as
 if(not exists(select * from Estimate where ProjectId = @ProjectId))
  begin
	insert Estimate values(@ProjectId, @SupervisorHours, @SupervisorPerHour, @WorkerHours, @WorkerPerHour,@LiabilityInsurance,@MarginTax,
	@Trucks,@TruckCost,@TotalLaborCost,@TotalEquipmentCost,@TotalMaterialCost,@TotalSpecialCharges,@MarkUp,@Taxes,@TotalDays)
  end
 else
  begin
	update Estimate set SupervisorHours=@SupervisorHours, SupervisorPerHour=@SupervisorPerHour, WorkerHours = @WorkerHours, 
		WorkerPerHour = @WorkerPerHour,	@LiabilityInsurance=@LiabilityInsurance,MarginTax=@MarginTax,Trucks=@Trucks,TruckCost=@TruckCost,
		TotalLaborCost=@TotalLaborCost,TotalEquipmentCost=@TotalEquipmentCost,TotalMaterialCost=@TotalMaterialCost,TotalSpecialCharges=@TotalSpecialCharges,
		MarkUp = @MarkUp, Taxes = @Taxes, TotalDays = @TotalDays
	  where ProjectId = @ProjectId
  end
  select @ProjectId
go
alter proc JobCostsAddEdit
  @JobCostId int,
  @ProjectId int,
  @CostType char(3),
  @CostDescription varchar(600),
  @CostAmount decimal(10,2)
as
 if(@JobCostId = 0)
  begin
	insert JobCost (ProjectId,CostType,CostDescription,CostAmount)
		values(@ProjectId, @CostType, @CostDescription, @CostAmount)
	select @@identity
  end
 else
  begin
	update JobCost set CostDescription = @CostDescription, CostAmount = @CostAmount 
	  where JobCostId = @JobCostId
	select @JobCostId
  end

