$(document).ready(function () {
    $('#btnJobCostSave').click(function () {
        jobCostViewModel.Save();
        $('#divJobCostPopup').dialog("close");
    });

    $('#btnJobCostPopupClose').click(function () {
        $('#divJobCostPopup').dialog("close");
    });

});

var jobCostViewModel = {
    JobCostId: ko.observable(),
    ProjectId: ko.observable(),
    CostType: ko.observable(),
    CostDescription: ko.observable(),
    CostAmount: ko.observable(),
    Load: function (jobCostId) {
        $.getJSON(relativeUrl + 'Data/GetJobCost', { jobCostId: jobCostId }, function (data) {
            $.each(data[0], function (index, value) {
                if (value !== "NULL") {
                    eval('jobCostViewModel.' + index + '("' + value.replace(/(\r\n|\n|\r)/gm, "\\n") + '")');
                }
            })
        })
    },
    EstimateList: function (costType) {
        $.getJSON(relativeUrl + 'Data/GetJobCosts', { projectId: jobCostViewModel.ProjectId(), costType: costType }, function (data) {
            var aList = "<ul>"
            var ttlJobCosts = 0;
            var popUpTitle;
            $.each(data, function () {
                aList += "<li><img class='linky jobCostRemove' id='" + this.JobCostId + "' title='remove this cost item' height='15' src='" + relativeUrl + "Images/redXdelete.jpg'></img>"
                aList += "<img class='linky jobCostEdit' id='" + this.JobCostId + "' title='edit  this cost item'  height='15' src='" + relativeUrl + "Images/EditDoc.jpg'></img>"
                aList += "<div>" + this.CostDescription + "</div>"
                aList += "<span>" + this.CostAmount + "</span></li>"
                ttlJobCosts += Number(this.CostAmount);
            });
            aList += '</ul>';

            switch (costType) {
                case "LBR":
                    var supervisorHours = isNaN(estimateViewModel.SupervisorHours()) ? 0 : Number(estimateViewModel.SupervisorHours());
                    var supervisorPerHour = isNaN(estimateViewModel.SupervisorPerHour()) ? 0 : Number(estimateViewModel.SupervisorPerHour());
                    var workerHours = isNaN(estimateViewModel.WorkerHours()) ? 0 : Number(estimateViewModel.WorkerHours());
                    var workerPerHour = isNaN(estimateViewModel.WorkerPerHour()) ? 0 : Number(estimateViewModel.WorkerPerHour());

                    estimateViewModel.WorkerPerHour(numeral(estimateViewModel.WorkerPerHour()).format("0.00"))
                    estimateViewModel.SupervisorPerHour(numeral(estimateViewModel.SupervisorPerHour()).format("0.00"));

                    $('#shours').html(numeral(supervisorHours * supervisorPerHour).format("0,0.00"));
                    $('#whours').html(numeral(workerHours * workerPerHour).format("0,0.00"));
                    estimateViewModel.TotalLaborCost(Number(supervisorHours * supervisorPerHour) + Number(workerHours * workerPerHour) + ttlJobCosts);

                    estimateViewModel.TotalLaborCost(numeral(estimateViewModel.TotalLaborCost()).format("0.00"));

                    $('#spTotalOtherLabor').html(numeral(ttlJobCosts).format("0,0.00"));
                    $('#divOtherLaborItems').html(aList);
                    popUpTitle = "Edit Other Contract Labor Cost";
                    break;
                case "SPL":
                    var tt = estimateViewModel.LiabilityInsurance();

                    var liabilityInsurance = isNaN(estimateViewModel.LiabilityInsurance()) ? 0 : Number(estimateViewModel.LiabilityInsurance());
                    var marginTax = isNaN(estimateViewModel.MarginTax()) ? 0 : Number(estimateViewModel.MarginTax());
                    estimateViewModel.TotalSpecialCharges(liabilityInsurance + marginTax + ttlJobCosts);
                    $('#spTotalOtherCharges').html(numeral(ttlJobCosts).format("0,0.00"));

                    estimateViewModel.LiabilityInsurance(numeral(estimateViewModel.LiabilityInsurance()).format("0.00"));
                    estimateViewModel.MarginTax(numeral(estimateViewModel.MarginTax()).format("0.00"));

                    $('#divOtherSpecialCharges').html(aList);
                    popUpTitle = "Edit Other Special Charges";
                    break;
                case "EQP":
                    var numTrucks = isNaN(estimateViewModel.Trucks()) ? 0 : Number(estimateViewModel.Trucks());
                    var truckCost = isNaN(estimateViewModel.TruckCost()) ? 0 : Number(estimateViewModel.TruckCost());
                    $('#sTrucks').html(numeral(numTrucks * truckCost).format("0.00"));
                    estimateViewModel.TotalEquipmentCost(Number(numTrucks * truckCost) + ttlJobCosts);
                    $('#spTotalOtherEquipment').html(numeral(ttlJobCosts).format("0,0.00"));
                    $('#divOtherEquipmentItems').html(aList);

                    estimateViewModel.TruckCost(numeral(estimateViewModel.TruckCost()).format("0.00"));
                    estimateViewModel.TotalEquipmentCost(numeral(estimateViewModel.TotalEquipmentCost()).format("0.00"));

                    popUpTitle = "Edit Other Vehicle / Equipment Charge";
                    break;
                case "MAT":
                    estimateViewModel.TotalMaterialCost(Number(ttlJobCosts));
                    $('#spTotalMaterial').html(numeral(ttlJobCosts).format("0,0.00"));
                    $('#divMaterialItems').html(aList);
                    popUpTitle = "Edit Other Vehicle / Equipment Charge";
                    break;
            }
            var totalLaborCost = isNaN(estimateViewModel.TotalLaborCost()) ? 0 : Number(estimateViewModel.TotalLaborCost());
            var totalSpecialCharges = isNaN(estimateViewModel.TotalSpecialCharges()) ? 0 : Number(estimateViewModel.TotalSpecialCharges());
            var totalEquipmentCost = isNaN(estimateViewModel.TotalEquipmentCost()) ? 0 : Number(estimateViewModel.TotalEquipmentCost());
            var totalMaterialCost = isNaN(estimateViewModel.TotalMaterialCost()) ? 0 : Number(estimateViewModel.TotalMaterialCost());

            var gTotal = (totalLaborCost + totalSpecialCharges + totalEquipmentCost + totalMaterialCost);
            if (isNaN(gTotal))
                gTotal = 0;
            $('#spnGrandTotal').html(numeral(gTotal).format("0,0.00"));
            $('#spnTotalLaborCost').html(numeral(totalLaborCost).format("0,0.00"));
            $('#spnTotalSpecialCharges').html(numeral(totalSpecialCharges).format("0,0.00"));
            $('#spnTotalSpecialCharges2').html(numeral(totalSpecialCharges).format("0,0.00"));
            $('#spnTotalEquipmentCost').html(numeral(totalEquipmentCost).format("0,0.00"));
            $('#spnTotalMaterialCost').html(numeral(totalMaterialCost).format("0,0.00"));

            jobCostViewModel.CostType(costType);

            $('.jobCostEdit').unbind('click');
            $('.jobCostEdit').click(function () {


                jobCostViewModel.Load($(this).attr("id"))
                $('#divJobCostPopup').dialog({
                    width: 620,
                    title: popUpTitle
                })
            })


            $('.jobCostRemove').unbind('click');
            $('.jobCostRemove').click(function () {
                if (confirm('remove this Job Cost')) {
                    jobCostViewModel.Delete($(this).attr("id"), costType);
                }
            })
        });
    },
    ListWithCost: function (costType) {
        $.getJSON(relativeUrl + 'Data/GetJobCosts', { projectId: jobCostViewModel.ProjectId(), costType: costType }, function (data) {
            var aList = "<ul>"
            var ttlJobCosts = 0;
            $.each(data, function () {
                aList += "<li><img class='linky jobCostRemove' id='" + this.JobCostId + "' title='remove this cost item' height='15' src='" + relativeUrl + "Images/redXdelete.jpg'></img>"
                aList += "<img class='linky jobCostEdit' id='" + this.JobCostId + "' title='edit  this cost item'  height='15' src='" + relativeUrl + "Images/EditDoc.jpg'></img>"
                aList += "<div>" + this.CostDescription + "</div>"
                aList += "<span> $" + numeral(this.CostAmount).format("0,0.00") + "</span></li>"
                ttlJobCosts += Number(this.CostAmount);
            });
            aList += '</ul>';
            //alert('aList: ' + aList)
            $('#divJobCostItems').html(aList);
            $('.jobCostEdit').unbind('click');
            $('.jobCostEdit').click(function () {
                jobCostViewModel.Load($(this).attr("id"))
                $('#divJobCostPopup').dialog({
                    width: 600,
                    title: "Edit Existing Scope Item"
                })
            })
            $('.jobCostRemove').unbind('click');
            $('.jobCostRemove').click(function () {
                if (confirm('remove this Job Cost')) {
                    jobCostViewModel.Delete($(this).attr("id"), costType);
                }
            })
        })
    },
    List: function (costType) {
        $.getJSON(relativeUrl + 'Data/GetJobCosts', { projectId: jobCostViewModel.ProjectId(), costType: costType }, function (data) {
            var aList = "<ul>"
            var ttlJobCosts = 0;
            $.each(data, function () {
                aList += "<li><img class='linky jobCostRemove' id='" + this.JobCostId + "' title='remove this cost item' height='15' src='" + relativeUrl + "Images/redXdelete.jpg'></img>"
                aList += "<img class='linky jobCostEdit' id='" + this.JobCostId + "' title='edit  this cost item'  height='15' src='" + relativeUrl + "Images/EditDoc.jpg'></img>"
                aList += "<div>" + this.CostDescription.substring(0,100) + "</div></li>"
                //aList += "<span> $" + numeral(this.CostAmount).format("0,0.00") + "</span></li>"
                //ttlJobCosts += Number(this.CostAmount);
            });
            aList += '</ul>';
            //alert('aList: ' + aList)
            $('#divJobCostItems').html(aList);
            $('.jobCostEdit').unbind('click');
            $('.jobCostEdit').click(function () {
                jobCostViewModel.Load($(this).attr("id"))
                $('#divJobCostPopup').dialog({
                    width: 600,
                    title: "Edit Existing Scope Item"
                })
            })
            $('.jobCostRemove').unbind('click');
            $('.jobCostRemove').click(function () {
                if (confirm('remove this Job Cost')) {
                    jobCostViewModel.Delete($(this).attr("id"), costType);
                }
            })
        })
    },
    Delete: function (id, costType) {
        $.getJSON(relativeUrl + 'Data/DeleteJobCost', { id: id }, function (success) {
            if (success[0] == "ok")
                if (costType == "SCO") {
                    jobCostViewModel.List("SCO");
                }
                else {
                    if (jobCostViewModel.CostType() == "INV")
                        jobCostViewModel.ListWithCost("INV");
                    else
                        jobCostViewModel.EstimateList(costType);
                }
            else
                alert(success[0])
        });
    },
    Save: function () {
        if (jobCostViewModel.Validate())
            $.ajax({
                url: relativeUrl + 'Data/AddJobCosts',
                data: ko.toJSON({ vm: this }),
                type: "post", contentType: "application/json; charset=utf-8",
                success: function (success) {
                    if (success[0] == "ok") {
                        jobCostViewModel.JobCostId(success[1]);
                        if (jobCostViewModel.CostType() == "SCO") {
                            jobCostViewModel.List(jobCostViewModel.CostType());
                        }
                        else {
                            if (jobCostViewModel.CostType() == "INV")
                                jobCostViewModel.ListWithCost(jobCostViewModel.CostType());
                            else
                                jobCostViewModel.EstimateList(jobCostViewModel.CostType());
                        }
                    }
                    else
                        alert('jobCostViewModel.Save: ' + success[0])
                },
                error: function (request, status, error) {
                    alert('Error jobCostViewModel.Save: ' + error);
                    $('#ErrorMsg').html('jobCostViewModel.Save error:' + request.responseText);
                }
            })
    },
    Validate: function () {
        if (IsEmpty(jobCostViewModel.CostAmount())) {
            jobCostViewModel.CostAmount(0)
        }
        if (isNaN(jobCostViewModel.CostAmount())) {
            jobCostViewModel.CostAmount(0)
        }

        return true;
    },
    Clear: function () {
        jobCostViewModel.JobCostId(0);
        jobCostViewModel.CostDescription('');
        jobCostViewModel.CostAmount('');
    }
}
