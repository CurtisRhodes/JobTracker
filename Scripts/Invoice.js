var payToCompany = "Intelligent Design Software";
var payToParty = "Curtis Rhodes";
var payToAddress = "3410 Brookhaven Club Drive";
var payToCityStZip = "Framers Branch, TX 75234";


$(document).ready(function () {
    $(function () {
        $('#txtDateInvoiced').val(today());
        jobCostViewModel.ListWithCost('INV');
    });
    $('#btnSetAsInvoiced').click(function () {
        $.getJSON(relativeUrl + 'Data/UpdateJobStatus',
            { whichDate: 'DateBilled', statusTypeCode: 'S08', date: $('#txtDateInvoiced').val(), projectId: jobCostViewModel.ProjectId() },
            function (success) {
                if (success[0] == "ok")
                    window.location.href = relativeUrl + 'View/QueueList/?statusType=Invoice';
                else
                    alert(success[0])
            })
    })

    $('#lkInvoiceItem').click(function () {
        jobCostViewModel.Clear();
        jobCostViewModel.CostType('INV');
        $('#divJobCostPopup').dialog({
            width: 600,
            title: "Add New Invoice Item"
        })
    });

});


$('#btnShowPrintInvoicePopup').click(function () {
    $('#woPrntJobNum').html(projectHeaderViewModel.GrahamsonId())
    $('#woPrntDate').html(today())
    $('#woPrntCustomer').html(projectHeaderViewModel.Customer())
    $('#woPrntProperty').html(projectHeaderViewModel.Property())
    $('#woPrntContact').html(projectHeaderViewModel.ContactName())
    $('#woPrntPhone').html(projectHeaderViewModel.ContactPhone())
    $('#woPrntJob').html(projectHeaderViewModel.JobName())
    $('#woJobDescription').html(projectHeaderViewModel.JobDescription())

    var ttlJobCosts = 0;
    var invoiceRows = 0;

    $.getJSON(relativeUrl + 'Data/GetJobCosts', { projectId: jobCostViewModel.ProjectId(), costType: 'INV' }, function (data) {
        var aList = "<ul>"
        $.each(data, function () {
            aList += "<li>" + this.CostDescription + "<span class='floatRight'> $" + numeral(this.CostAmount).format("0,0.00") + "</span></li>";
            invoiceRows++;
            ttlJobCosts += Number(this.CostAmount);
        });
        aList += '</ul>';
        $('#divInvoiceItemList').html(aList);

        while (invoiceRows < 20) {
            invoiceRows++;
            $('#divInvoiceItemList').append("<br/>")
        }
        $('#divInvoiceItemList').append("<div class='floatRight'>Total Invoice Amount: $" + numeral(ttlJobCosts).format("0,0.00") + "</div>")
        $('#divInvoiceItemList').append("<br/>")

        $('#divPrintInvoicePopup').dialog({
            width: 900,
            title: "Invoice"
        })
    })
});

$('#btnPrintInvoice').click(function () {
    $('#divInvoicePrintArea').print();
});

$('#btnPrintInvoicePopupClose').click(function () {
    $('#divPrintInvoicePopup').dialog("close");
});
