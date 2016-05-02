
$(document).ready(function () {

    $(function () {
        $('#txtDateEstimateCompleted').val(today());
        $('.tabArea').hide();
        $('#tabLabor').addClass('tabSelected')
        $('#tabLaborArea').show();
    });

    $('.tab').click(function () {
        if ($(this).html() == "Attachments") {
            estimateViewModel.Save();
            window.location.href = relativeUrl + 'View/Takeoff/' + estimateViewModel.ProjectId();

        }
        else {
            $('.tab').removeClass('tabSelected')
            $(this).addClass('tabSelected')
            $('.tabArea').hide();
            switch ($(this).html()) {
                case "Labor Cost":
                    jobCostViewModel.EstimateList("LBR");
                    $('#tabLaborArea').show();
                    break;
                case "Equipment Cost":
                    jobCostViewModel.EstimateList("EQP");
                    $('#tabEquipArea').show();
                    break;
                case "Material Cost":
                    jobCostViewModel.EstimateList("MAT");
                    $('#tabMaterailArea').show();
                    break;
                case "Special Charges":
                    jobCostViewModel.EstimateList("SPL");
                    $('#tabChargesArea').show();
                    break;
            }
        }
    })
        
    $('.btnSaveEstimate').click(function () {
        estimateViewModel.Save();
    });

    $('#lkLabor').click(function () {
        jobCostViewModel.Clear();
        jobCostViewModel.CostType("LBR");
        $('#divJobCostPopup').dialog({
            width: 600,
            title: "Add Other Contract Labor Cost"
        })
    });
    $('#lkCharges').click(function () {
        jobCostViewModel.Clear();
        jobCostViewModel.CostType("SPL");
        $('#divJobCostPopup').dialog({
            title: "Add Other Special Charge"
        })
    });    
    $('#lkEquipment').click(function () {
        jobCostViewModel.Clear();
        jobCostViewModel.CostType("EQP");
        $('#divJobCostPopup').dialog({
            width: 600,
            title: "Add Other Vehicle / Equipment Charge"
        })
    });
    
    $('#lkMaterial').click(function () {
        jobCostViewModel.Clear();
        jobCostViewModel.CostType("MAT");
        $('#divJobCostPopup').dialog({
            width: 600,
            title: "Add Material Charge"
        })
    });

    $('#divShours input').change(function () {
        jobCostViewModel.EstimateList("LBR");
    });
    $('#divWhours input').change(function () {
        jobCostViewModel.EstimateList("LBR");
    });
    $('#divMarginTax input').change(function () {
        jobCostViewModel.EstimateList("SPL");
    });
    $('#divLibilityInsurance input').change(function () {
        jobCostViewModel.EstimateList("SPL");
    });
    $('#divTruckCost input').change(function () {
        jobCostViewModel.EstimateList("EQP");
    });

    $('#btnSetAsEstimateCompleted').click(function () {
        estimateViewModel.Save();
        $.getJSON(relativeUrl + 'Data/UpdateJobStatus',
            { whichDate: 'DateEstimated', statusTypeCode: 'S02', date: $('#txtDateEstimateCompleted').val(), projectId: jobCostViewModel.ProjectId() },
            function (success) {
                if (success[0] == "ok")
                    window.location.href = relativeUrl + 'View/QueueList/?statusType=Estimate';
                else
                    alert(success[0])
            })
    })

});

function OnEstimateloaded() {
    jobCostViewModel.EstimateList("LBR");
}