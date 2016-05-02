var projectHeaderViewModel = {
    ProjectId: ko.observable(),
    GrahamsonId: ko.observable(),
    Customer: ko.observable(),
    Property: ko.observable(),
    JobName: ko.observable(),
    JobDescription: ko.observable(),
    JobType: ko.observable(),
    JobStatus: ko.observable(),
    ContactName: ko.observable(),
    ContactPhone: ko.observable(),
    Load: function (projectId) {
        $.getJSON(relativeUrl + 'Data/GetProjectHeader', { projectId: projectId }, function (data) {
            $.each(data[0], function (index, value) {
                if (value !== "NULL") {
                    eval('projectHeaderViewModel.' + index + '("' + value.replace(/(\r\n|\n|\r)/gm, "\\n") + '")');
                }
            })
        })
    },
}

