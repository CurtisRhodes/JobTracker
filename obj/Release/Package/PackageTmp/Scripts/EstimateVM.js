var estimateViewModel = {
    ProjectId: ko.observable(),
    SupervisorHours: ko.observable(),
    SupervisorPerHour: ko.observable(),
    WorkerHours: ko.observable(),
    WorkerPerHour: ko.observable(),
    LiabilityInsurance: ko.observable(),
    MarginTax: ko.observable(),
    Trucks: ko.observable(),
    TruckCost: ko.observable(),
    TotalLaborCost: ko.observable(),
    TotalSpecialCharges: ko.observable(),
    TotalEquipmentCost: ko.observable(),
    TotalMaterialCost: ko.observable(),
    MarkUp: ko.observable(),
    Taxes: ko.observable(),
    TotalDays: ko.observable(),
    Load: function () {
        $.getJSON(relativeUrl + 'Data/GetEstimate', { projectId: estimateViewModel.ProjectId() }, function (data) {
            $.each(data, function (index, value) {
                if (value !== "NULL") {
                    eval('estimateViewModel.' + index + '("' + value.replace(/(\r\n|\n|\r)/gm, "") + '")');
                }
            })
            OnEstimateloaded();
        })
    },
    Save: function () {
        if (estimateViewModel.Validate())
            $.ajax({
                url: relativeUrl + 'Data/AddEditEstimate',
                data: ko.toJSON({ vm: this }),
                type: "post", contentType: "application/json; charset=utf-8",
                success: function (success) {
                    if (success[0] == "ok") {
                        $('#divStatusMsg').show().html("record saved");
                        setTimeout(function () { $('#divStatusMsg').hide().html('') }, 500);
                    }
                    else
                        alert('estimateViewModel.Save: ' + success[0])
                },
                error: function (request, status, error) {
                    alert('Error estimateViewModel.Save: ' + error);
                    $('#ErrorMsg').html('estimateViewModel.Save error:' + request.responseText);
                }
            })
    },
    Validate: function () {
        if (estimateViewModel.SupervisorHours() == "")
            estimateViewModel.SupervisorHours(null)
        else
            if (!isDecimal(estimateViewModel.SupervisorHours())) {
                alert('SupervisorHours not a number: ' + estimateViewModel.SupervisorHours())
                return false;
            }
        if (estimateViewModel.SupervisorPerHour() == "")
            estimateViewModel.SupervisorPerHour(null)
        else
            if (!isDecimal(estimateViewModel.SupervisorPerHour())) {
                alert('SupervisorPerHour not a number: ' + estimateViewModel.SupervisorPerHour())
                return false;
            }
        if (estimateViewModel.WorkerHours() == "")
            estimateViewModel.WorkerHours(null)
        else
            if (!isDecimal(estimateViewModel.WorkerHours())) {
                alert('WorkerHours not a number: ' + estimateViewModel.WorkerHours())
                return false;
            }
        if (estimateViewModel.WorkerPerHour() == "")
            estimateViewModel.WorkerPerHour(null)
        else
            if (!isDecimal(estimateViewModel.WorkerPerHour())) {
                alert('WorkerPerHour not a number: ' + estimateViewModel.WorkerPerHour())
                return false;
            }
        if (estimateViewModel.LiabilityInsurance() == "")
            estimateViewModel.LiabilityInsurance(null)
        else
            if (!isDecimal(estimateViewModel.LiabilityInsurance())) {
                alert('LiabilityInsurance not a number: ' + estimateViewModel.LiabilityInsurance())
                return false;
            }
        if (estimateViewModel.MarginTax() == "")
            estimateViewModel.MarginTax(null)
        else
            if (!isDecimal(estimateViewModel.MarginTax())) {
                alert('MarginTax not a number: ' + estimateViewModel.MarginTax())
                return false;
            }
        if ((estimateViewModel.Trucks() == "") || (estimateViewModel.Trucks() == undefined))
            estimateViewModel.Trucks(null)
        else
            if (isNaN(estimateViewModel.Trucks())) {
                alert('Trucks not a number: ' + estimateViewModel.Trucks())
                return false;
            }
        if ((estimateViewModel.TruckCost() == "") || (estimateViewModel.TruckCost() == undefined))
            estimateViewModel.TruckCost(null)
        else
            if (!isDecimal(estimateViewModel.TruckCost())) {
                alert('TruckCost not a number: ' + estimateViewModel.TruckCost())
                return false;
            }
        if (estimateViewModel.TotalLaborCost() == "")
            estimateViewModel.TotalLaborCost(null)
        else
            if (!isDecimal(estimateViewModel.TotalLaborCost())) {
                alert('TotalLaborCost not a number: ' + estimateViewModel.TotalLaborCost())
                return false;
            }
        if (estimateViewModel.TotalSpecialCharges() == "")
            estimateViewModel.TotalSpecialCharges(null)
        else
            if (!isDecimal(estimateViewModel.TotalSpecialCharges())) {
                alert('TotalSpecialCharges not a number: ' + estimateViewModel.TotalSpecialCharges())
                return false;
            }
        if (estimateViewModel.TotalEquipmentCost() == "")
            estimateViewModel.TotalEquipmentCost(null)
        else
            if (!isDecimal(estimateViewModel.TotalEquipmentCost())) {
                alert('TotalEquipmentCost not a number: ' + estimateViewModel.TotalEquipmentCost())
                return false;
            }
        if (estimateViewModel.TotalMaterialCost() == "")
            estimateViewModel.TotalMaterialCost(null)
        else
            if (!isDecimal(estimateViewModel.TotalMaterialCost())) {
                alert('TotalMaterialCost not a number: ' + estimateViewModel.TotalMaterialCost())
                return false;
            }
        if (estimateViewModel.MarkUp() == "")
            estimateViewModel.MarkUp(null)
        else
            if (!isDecimal(estimateViewModel.MarkUp())) {
                alert('MarkUp not a number: ' + estimateViewModel.MarkUp())
                return false;
            }
        if (estimateViewModel.Taxes() == "")
            estimateViewModel.Taxes(null)
        else
            if (!isDecimal(estimateViewModel.Taxes())) {
                alert('Taxes not a number: ' + estimateViewModel.Taxes())
                return false;
            }
        if (estimateViewModel.TotalDays() == "")
            estimateViewModel.TotalDays(null)
        else
            if (!isDecimal(estimateViewModel.TotalDays())) {
                alert('Total Days not a number: ' + estimateViewModel.TotalDays())
                return false;
            }


        return true;
    }
}

function isDecimal(val) {
    if (val == null)
        return true;
    if (isNaN(val))
        return false;
    return true; //(val.match(/^\d+(?:\.\d+)?$/));
}
