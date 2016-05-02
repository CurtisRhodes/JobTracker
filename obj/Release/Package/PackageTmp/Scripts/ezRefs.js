var selectedRefType;
var selectedRefCode;

function LoadRefType(refType) {
    selectedRefType = refType;
    $('#divRefItems').html('');
    $.getJSON(relativeUrl + 'Data/GetRefs', { refType: refType }, function (data) {
        try {
            $('#divRefItems').html("");
            $.each(data, function () {
                $('#divRefItems').append("<div id='" + this.RefCode + "'>" + this.RefDescription + "</div>");
            })
            $('#btnEditCancelRef').attr('disabled', 'disabled');
            $('#btnEditCancelRef').addClass('btnDisabled');
            $('#txtRefItem').attr('disabled', 'disabled');
            $('#txtRefItem').val('');

            $('#divRefItems div').click(function () {
                if ($('#divRefItems').attr('disabled') != 'disabled') {   //.is(":disabled")) {
                    $('#divRefItems div').removeClass('selectedRef');
                    selectedRefCode = $(this).attr('id');
                    $(this).addClass('selectedRef');
                    $('#txtRefItem').val($(this).html());
                    $('#btnEditCancelRef').removeAttr('disabled').removeClass('btnDisabled');
                }
            });
        } catch (e) {
            alert('nice try REF: ' + e);
        }
    });
}

function UpdateInsertRef() {
    if (true) {
        $.getJSON(relativeUrl + 'Data/AddEditRef',
            { refCode: selectedRefCode, refType: selectedRefType, refDescription: $('#txtRefItem').val() },
         function (success) {
             try {
                 if (success == "ok")
                     LoadRefType(selectedRefType)
                 else
                     alert("UpdateInsertRef: " + success);
             } catch (e) {
                 alert('nice try REF: ' + e);
             }
         });
    }
}

function GetRefTypes() {
    if (true) {
        $.getJSON(relativeUrl + 'Data/GetRefs', { refType: '000' }, function (data) {
            $('#selRefTypes').append("<option value='000'>-- select Ref --</option>");
            $.each(data, function () {
                if (this.RefCode != '000')
                    $('#selRefTypes').append("<option value='" + this.RefCode + "'>" + this.RefDescription + "</option>");
            })
        })
    }
}

$(document).ready(function () {
    $('#btnAddSaveRef').click(function () {
        //alert('$(btnAddSave).html(): ' + $('#btnAddSave').html());
        if ($('#btnAddSaveRef').html() == 'Add') {
            $('#txtRefItem').removeAttr('disabled');
            $('#btnEditCancelRef').removeAttr('disabled');
            $('#txtRefItem').val('');
            $('#btnAddSaveRef').html('Save');
            $('#btnEditCancelRef').html('Cancel');
            $('#selRefTypes').attr('disabled', 'disabled');
            $('#divRefItems').attr('disabled', 'disabled');
            selectedRefCode = 0;
        }
        else {
            UpdateInsertRef();
            $('#btnAddSaveRef').html('Add');
            $('#btnEditCancelRef').html('Edit');
            $('#selRefTypes').removeAttr('disabled');
            $('#divRefItems').removeAttr('disabled');
        }
    })

    $('#btnEditCancelRef').click(function () {
        //alert('btnEditCancel: ' + $('#btnEditCancel').html());
        if ($('#btnEditCancelRef').html() == 'Cancel') {
            $('#btnAddSaveRef').html('Add');
            $('#btnEditCancelRef').html('Edit');
            $('#txtRefItem').attr('disabled', 'disabled');
            $('#txtRefItem').val('');
            $('#selRefTypes').removeAttr('disabled');
            $('#divRefItems').removeAttr('disabled');
        }
        else {
            $('#txtRefItem').removeAttr('disabled');
            $('#btnAddSaveRef').html('Save');
            $('#btnEditCancelRef').html('Cancel');
            $('#selRefTypes').attr('disabled', 'disabled');
            $('#divRefItems').attr('disabled', 'disabled');
            editMode = "Edit";
        }
    })

    $(function () {
        $('#txtRefItem').attr('disabled', 'disabled');
        $('#btnAddSaveRef').html('Add');
        $('#btnEditCancelRef').html('Edit');
        $('#txtRefItem').attr('disabled', 'disabled');
        $('#txtRefItem').val('');
        $('#selRefTypes').removeAttr('disabled');
        $('#divRefItems').removeAttr('disabled');
        $(window).resize();
    });

    $('#selRefTypes').change(function () {
        selectedRefCode = $('#selRefTypes option:selected').val();
        LoadRefType(selectedRefCode);
    })

    $(window).resize(function () {
        var windowHeight = $(window).height()
        $('.tdLeftMenuArea').height(windowHeight - 160);
        $('.augBox').height(windowHeight - 188);
        $('.tdLRchoiceBox').height($('.augBox').height() - 390);

    })
});


