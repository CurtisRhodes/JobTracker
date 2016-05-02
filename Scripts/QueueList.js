
var statusType;
var statusTypeCode;
$(document).ready(function () {

    $(function () {

        //switch (statusType) {            
        //    case "Scope":
        //        break;
        //    case "Estimate":
        //        $('#queueListHeader').html('SELECT ITEM TO ESTIMATE');
        //        break;
        //    case "Proposal": statusTypeCode = "S02"; break;
        //    case "AwardOrCancel": statusTypeCode = "S03"; break;
        //    case "Schedule": statusTypeCode = "S04"; break;
        //    case "WorkInProgress": statusTypeCode = "S06"; break;
        //    case "WorkCompleted": statusTypeCode = "S07"; break;
        //    case "Invoice": statusTypeCode = "S07"; break;
        //    case "PaymentReceived": statusTypeCode = "S08"; break;
        //    default:
        //        statusTypeCode = "Unknown"; break;
        //}
        GetQueueList()
    });

    function GetQueueList() {
        if (statusTypeCode == "Unknown")
            $('#queueList').html("Unknown statusTypeCode");
        else {
            $.getJSON(relativeUrl + 'Data/GetQueueList', { statusTypeCode: statusTypeCode }, function (data) {
                var qList = "<table>";
                $.each(data, function () {
                    qList += "<tr><td>" + this['Job Number'] + "</td>";
                    qList += "<td>" + this.Property + "</td><td>" + this.City + "</td><td>" + this.State + "</td>";
                    qList += "<td>" + this['Job Name'] + "</td><td class='qActionRow linky' id='" + this.Id + "'>" + statusType + "</td></tr>";
                });
                qList += "<table>";

                $('#queueList').html(qList);

                $('#queueList table tr:odd').css('background-color', '#e5ebeb');

                $('.qActionRow').click(function () {
                    window.location.href = relativeUrl + 'View/' + statusType + '/' + $(this).attr('id');
                })

            });
        }
    };

});