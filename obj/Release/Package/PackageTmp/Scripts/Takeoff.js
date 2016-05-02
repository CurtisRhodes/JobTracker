var fileName = "";
$(document).ready(function () {

    $('#btnAddAttachment').click(function () {
        alert('comming soon')
    })

    $('#btnSaveJobDescription').click(function () {
        $.getJSON(relativeUrl + 'Data/UpdateJobDescription',
                { projectId: projectId, jobDescription: $('#txtJobDescription').text().replace(/(')/gm, "''") }, function (success) {
                    if (success[0] == "ok") {
                        $('#divStatusMsg').show().html("description saved for: " + projectId);
                        setTimeout(function () { $('#divStatusMsg').hide().html('') }, 1200);
                        projectHeaderViewModel.Load(projectId)
                    }
                    else
                        alert(success[0])
                });
    });
});

function showImages(projectId) {
    $.getJSON(relativeUrl + 'File/GetImages', { projectId: projectId }, function (data) {
        var pics = "";
        $.each(data, function () {
            fileName = '/Upload/' + projectId + '/' + this;
            var ext = this.substr(this.indexOf("."));
            if ((ext.toLowerCase() == ".jpg") || (ext.toLowerCase() == ".jpeg") || (ext.toLowerCase() == ".png")) {
                pics += "<img id='" + fileName + "' src='" + fileName + "' height='150' />|";
            }
            if ((ext.toLowerCase() == ".doc") || (ext.toLowerCase() == ".docx")) {
                pics += "<img id='" + fileName + "' src='/Images/doc.png' height='150' />|";
            }


            //pics += "<img src='/Upload/" + projectId + "/" + this + "' height='150' />|";

        });
        $('#divImages').html(pics);

        $('#divImages img').dblclick(function () {
            fileName = $(this).attr("id");
            var msgHtml = "<div id='divFileChoices'><div onclick='javascript:launchFile()'>Open in New Window</div>" +
                "<div onclick='javascript:deleteFile(" + projectId + ")' >Delete</div>" +
                "<div onclick='javascript:hideStatusMessage()' >Cancel</div></div>";
            $('#divStatusMsg').show().html(msgHtml);
        });

        $(window).resize();
    })
}
function hideStatusMessage() {
    $('#divStatusMsg').hide().html('')
}
function launchFile() {
    window.open(fileName, "_blank");
    $('#divStatusMsg').hide().html('');
}

function deleteFile(projectId) {
    if (confirm('  delete this image?')) {
        $.getJSON(relativeUrl + 'File/DeleteImage', { fileName: fileName }, function (success) {
            if (success == "ok") {
                showImages(projectId);
            }
            else
                alert(success);
        })
        $('#divStatusMsg').hide().html('');
    }
}

function getJobDescription(projectId) {
    $.getJSON(relativeUrl + 'Data/GetProjectHeader', { projectId: projectId }, function (data) {
        $('#txtJobDescription').text(data[0].JobDescription)
    })
}
