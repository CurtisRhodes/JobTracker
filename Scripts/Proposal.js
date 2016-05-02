
var ttlEstimatedCosts
$(document).ready(function () {

    $('#btnSetAsBidSent').click(function () {
        if (true)
            $.getJSON(relativeUrl + 'Data/UpdateJobStatus',
                { whichDate: 'DateBidSent', statusTypeCode: 'S03', date: $('#txtDateBidSent').val(), projectId: estimateViewModel.ProjectId() },
                function (success) {
                    if (success[0] == "ok")
                        window.location.href = relativeUrl + 'View/QueueList/?statusType=Proposal';
                    else
                        alert(success[0])
                })
    });

    var markUp = 0;
    var taxes = 0;
    $('.proposalTotals input').change(function () {
        if (!isNaN($('#txtMarkUp').val())) {
            markUp = Number($('#txtMarkUp').val())
            var sbTotal = ttlEstimatedCosts + markUp;
            taxes = 0;
            if (!isNaN($('#txtTaxes').val())) {
                taxes = Number($('#txtTaxes').val())
            }
            var grandTotal = ttlEstimatedCosts + markUp + taxes;
            $('#spnSubTotal').html(numeral(sbTotal).format("0,0.00"));
            $('#spnGrandTotal').html(numeral(grandTotal).format("0,0.00"));
        }
    });

    $('#btnSaveEstimate').click(function () {
        estimateViewModel.MarkUp(markUp)
        estimateViewModel.Taxes(taxes);
        estimateViewModel.Save();
    });

    $('#btnPrintProposal').click(function () {
        alert('comming soon')
    })
});

function OnEstimateloaded() {

}

function loadCosts(projectId) {

    $.getJSON(relativeUrl + 'Data/GetEstimate', { projectId: projectId }, function (data) {
        var laborCost = data.TotalLaborCost == undefined ? 0 : data.TotalLaborCost;
        var specialCharges = data.TotalSpecialCharges == undefined ? 0 : data.TotalSpecialCharges;
        var equipmentCost = data.TotalEquipmentCost == undefined ? 0 : data.TotalEquipmentCost;
        var materialCost = data.TotalMaterialCost == undefined ? 0 : data.TotalMaterialCost;
        markUp = data.MarkUp == undefined ? 0 : data.MarkUp;
        taxes = data.Taxes == undefined ? 0 : data.Taxes;

        $("#spTotalLaborCost").html(numeral(laborCost).format("0,0.00"))
        $("#spTotalSpecialCharges").html(numeral(specialCharges).format("0,0.00"))
        $("#spTotalEquipmentCost").html(numeral(equipmentCost).format("0,0.00"))
        $("#spTotalMaterialCost").html(numeral(materialCost).format("0,0.00"))
        ttlEstimatedCosts = Number(laborCost) + Number(specialCharges) + Number(equipmentCost) + Number(materialCost);
        var sbTotal = ttlEstimatedCosts + Number(markUp)
        $('#txtMarkUp').val(markUp)
        $('#txtTaxes').val(taxes)
        $('#spnSubTotal').html(numeral(sbTotal).format("0,0.00"))
        var gTotal = ttlEstimatedCosts + Number(markUp) + Number(taxes)
        $('#spnGrandTotal').html(numeral(gTotal).format("0,0.00"));
    })
}

