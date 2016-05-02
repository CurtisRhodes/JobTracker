
$(document).ready(function () {

    $('#btnEditSave').click(function () {
        projectViewModel.Save();
    })

});

function GetRefs() {
    $.getJSON(relativeUrl + 'Data/GetProperties', function (data) {
        $('#selProperty').append("<option value='000'>-- Select Property --</option>");
        $.each(data, function () {
            $('#selProperty').append("<option value='" + this.PropertyId + "'>" + this.Property + "</option>");
        })

        $.getJSON(relativeUrl + 'Data/GetAllRefs', function (data) {
            GetDropdownValues('STA', 'selJobStatus', 'select Job Status', data);
            GetDropdownValues('TYP', 'selJobType', 'select Job Type', data);
            onDropDownsLoaded();
        });
    });
}

function GetDropdownValues(refType, ddName, selMessage, data) {
    $('#' + ddName).append("<option value='000'>-- " + selMessage + " --</option>");
    $.each(data, function () {
        if (this.RefType === refType)
            $('#' + ddName).append("<option value='" + this.RefCode + "'>" + this.RefDescription + "</option>");
    })
}

var projectViewModel = {
    ProjectId: ko.observable(),
    PropertyId: ko.observable(),
    GrahamsonId: ko.observable(),
    JobName: ko.observable(),
    JobDescription: ko.observable(),
    JobType: ko.observable(),
    JobStatus: ko.observable(),
    EstimatedDays: ko.observable(),
    DateRequested: ko.observable(),
    DateBidSent: ko.observable(),
    DateAwarded: ko.observable(),
    DateStarted: ko.observable(),
    DateCompleted: ko.observable(),
    DateBilled: ko.observable(),
    DatePaymentReceived: ko.observable(),
    DateEstimated: ko.observable(),
    DateScoped: ko.observable(),
    Load: function (projectId) {
        $.getJSON(relativeUrl + 'Data/GetProject', { projectId: projectId }, function (data) {
            $.each(data[0], function (index, value) {
                if (value !== "NULL") {
                    if (index.indexOf('Date') > -1)
                        eval('projectViewModel.' + index + '("' + moment(value).format("MM/DD/YYYY") + '")');
                    else
                        eval('projectViewModel.' + index + '("' + value.replace(/(\r\n|\n|\r)/gm, "\\n") + '")');
                }
            })

        })
    },
    Save: function (nextForm) {
        if (projectViewModel.Validate()) {
            $.ajax({
                url: relativeUrl + 'Data/SaveProject',
                data: ko.toJSON({ vm: this }),
                type: "post",
                contentType: "application/json; charset=utf-8",
                success: function (success) {
                    if (success[0] == "ok") {
                        switch (nextForm) {
                            case "takeoff":
                                window.location.href = relativeUrl + 'View/Takeoff/' + success[1];
                                break;
                            case "scope":
                                window.location.href = relativeUrl + 'View/Scope/' + success[1];
                                break;
                            case "estimate":
                                window.location.href = relativeUrl + 'View/Estimate/' + success[1];
                                break;
                            case "proposal":
                                window.location.href = relativeUrl + 'View/Proposal/' + success[1];
                                break;
                            case "award":
                                window.location.href = relativeUrl + 'View/AwardOrCancel/' + success[1];
                                break;
                            case "schedule":
                                window.location.href = relativeUrl + 'View/Schedule/' + success[1];
                                break;
                            case "complete":
                                window.location.href = relativeUrl + 'View/WorkInProgress/' + success[1];
                                break;
                            case "invoice":
                                window.location.href = relativeUrl + 'View/Invoice/' + success[1];
                                break;
                            case "receive": window.location.href = relativeUrl + 'View/PaymentReceived/' + success[1]; break;
                            default:
                                if (success[1] != projectViewModel.ProjectId())
                                    $('#divStatusMsg').show().html("record saved");
                                    window.location.href = relativeUrl + 'View/Project/' + success[1];
                                break;
                        }
                        $('#divStatusMsg').show().html("record saved");
                    }
                    else {
                        $('#divStatusMsg').show().html(success[0]);
                    }
                    setTimeout(function () { $('#divStatusMsg').hide().html('') }, 1500);
                },
                error: function (request, status, error) {
                    alert('SaveOrder Error:' + error);
                    $('#ErrorMsg').html('SaveOrder :' + request.responseText);
                }
            })
        }
    },
    Validate: function () {
        var success = true;
        if (IsEmpty(projectViewModel.GrahamsonId())) {
            alert('please enter a job Number');
            return false;
        }
        if (IsEmpty(projectViewModel.PropertyId())) {
            alert('please select a Property');
            return false;
        }
        if (IsEmpty(projectViewModel.JobType())) {
            alert('please select a Job Type');
            return false;
        }
        if (IsEmpty(projectViewModel.JobName())) {
            alert('please enter a job Name');
            return false;
        }
        //var test1 = projectViewModel.JobDescription()
        //projectViewModel.JobDescription(projectViewModel.JobDescription().replace(/\r?\n/g, '<br />'));
        //var test2 = projectViewModel.JobDescription()

        return true;

    }
}