$(document).ready(function () {
    var selectedLeftMenuItem;
    $('.adminEditTable table input').attr("disabled", true);
    $('.adminEditTable  TextArea').attr("disabled", true);
    $('.adminEditTable  table select').attr("disabled", true);
    $('.tdLeftMenuArea ul li')
        .mouseover(function () { $(this).addClass('listHighlight') })
        .mouseout(function () { $(this).removeClass('listHighlight') })
        .click(function () {
            if (selectedLeftMenuItem != null)
                selectedLeftMenuItem.removeClass('selectedListItem')
            $(this).removeClass('listHighlight')
            $(this).addClass('selectedListItem')
            selectedLeftMenuItem = $(this);
            $('.adminWorkAreaDiv').hide();
        })
});

function btnClickAddSave(crudForm, btn) {
    try {
        if ($(btn).html() == "Add") {
            $(btn).html("Save")
            $('#btn' + crudForm + 'EditCancel').html("Cancel");
            window['tableActive' + crudForm] = false;
            $('#div' + crudForm + 'Edit table input').attr("disabled", false);
            $('#div' + crudForm + 'Edit table textarea').attr("disabled", false);
            $('#div' + crudForm + 'Edit table select').attr("disabled", false);
            $('#div' + crudForm + 'Edit table input').val("");
            $('#div' + crudForm + 'Edit table textarea').val("");
            $('#div' + crudForm + 'Edit .kendoEditorTextArea').val("");
            $('#div' + crudForm + 'List').attr("disabled", true);
            window['viewModel' + crudForm].Clear();
        }
        else {
            window['viewModel' + crudForm].Save();
            $(btn).html("Add")
            window['tableActive' + crudForm] = true;
            $('#btn' + crudForm + 'EditCancel').html("Edit")
            $('#div' + crudForm + 'List').attr("disabled", false);
            $('#div' + crudForm + 'Edit table input').attr("disabled", true);
            $('#div' + crudForm + 'Edit table textarea').attr("disabled", true);
            $('#div' + crudForm + 'Edit table select').attr("disabled", true);
        }
    } catch (e) {
        alert('btnClickAddSave: ' + e)
    }
}
function btnClickEditCancel(crudForm, btn) {
    try {
        if ($(btn).html() == "Edit") {
            window['tableActive' + crudForm] = false;
            $('#div' + crudForm + 'Edit table input').attr("disabled", false);
            $('#div' + crudForm + 'Edit table textarea').attr("disabled", false);
            $('#div' + crudForm + 'Edit table select').attr("disabled", false);
            $('#div' + crudForm + 'List').attr("disabled", true);
            $('#btn' + crudForm + 'AddSave').html("Save")
            $(btn).html("Cancel")
        }
        else {
            $('#btn' + crudForm + 'AddSave').html("Add")
            $(btn).html("Edit")
            window['tableActive' + crudForm] = true;
            $('#div' + crudForm + 'List').attr("disabled", false);
            $('#div' + crudForm + 'Edit table input').attr("disabled", true);
            $('#div' + crudForm + 'Edit table textarea').attr("disabled", true);
            $('#div' + crudForm + 'Edit table select').attr("disabled", true);
        }
    } catch (e) {
        alert('btnClickEditCancel' + e)
    }
}
