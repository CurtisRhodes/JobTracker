

$(document).ready(function () {
    $(function () {
        $('#txtDateScopeCompleted').val(today());
        jobCostViewModel.CostAmount(0);
        jobCostViewModel.List('SCO');
    });

    $('#lkScopeItem').click(function () {
        jobCostViewModel.Clear();
        jobCostViewModel.CostType('SCO');
        $('#divJobCostPopup').dialog({
            width: 600,
            title: "Add New Scope Item"
        })
    });

    $('#btnShowPrintWorkOrderPopup').click(function () {
        $('#woPrntJobNum').html(projectHeaderViewModel.GrahamsonId())
        $('#woPrntDate').html(today())
        $('#woPrntCustomer').html(projectHeaderViewModel.Customer())
        $('#woPrntProperty').html(projectHeaderViewModel.Property())
        $('#woPrntContact').html(projectHeaderViewModel.ContactName())
        $('#woPrntPhone').html(projectHeaderViewModel.ContactPhone())
        $('#woPrntJob').html(projectHeaderViewModel.JobName())
        $('#woJobDescription').html(projectHeaderViewModel.JobDescription())

        $.getJSON(relativeUrl + 'Data/GetJobCosts', { projectId: jobCostViewModel.ProjectId(), costType: 'SCO' }, function (data) {
            var aList = "<ul>"
            $.each(data, function () {
                aList += "<div> - " + this.CostDescription + "</div></li>"
            });
            aList += '</ul>';
            $('#divWorkOrderScopeList').html(aList);

            $('#divPrintWorkOrderPopup').dialog({
                width: 900,
                title: "Work Order"
            })
        })
    });

    $('#btnPrintWorkOrder').click(function () {
        $('#divWorkOrederPrintArea').print();
    });

    $('#btnPrintWorkOrderPopupClose').click(function () {
        $('#divPrintWorkOrderPopup').dialog("close");
    });

    $('#btnSetAsScopeCompleted').click(function () {
        $.getJSON(relativeUrl + 'Data/UpdateJobStatus',
            { whichDate: 'DateScoped', statusTypeCode: 'S01', date: $('#txtDateScopeCompleted').val(), projectId: jobCostViewModel.ProjectId() },
            function (success) {
                if (success[0] == "ok")
                    window.location.href = relativeUrl + 'View/QueueList/?statusType=Scope';
                else
                    alert(success[0])
            })
    });

    $('#btnSaveJobDescription').click(function () {
        $.getJSON(relativeUrl + 'Data/UpdateJobDescription', { projectId: jobCostViewModel.ProjectId(), jobDescription: $('#txtJobDescription').text().replace(/(')/gm, "''") }, function (success) {
            if (success[0] == "ok") {
                $('#divStatusMsg').show().html("description saved for: " + jobCostViewModel.ProjectId());
                setTimeout(function () { $('#divStatusMsg').hide().html('') }, 1500);
                projectHeaderViewModel.Load(jobCostViewModel.ProjectId())
            }
            else
                alert(success[0])
        });
    });
});
function getJobDescription(projectId) {
    $.getJSON(relativeUrl + 'Data/GetProjectHeader', { projectId: projectId }, function (data) {
        $('#txtJobDescription').text(data[0].JobDescription)
    })
}

