var currSortColumn = "";
var currSortDirection = "asc";
var previousRowCount = 24;
var acsys_columnList;
var acsys_viewName;

function listInit(viewName) {
    if (viewName) {
        acsys_viewName = viewName;
        $.getJSON(relativeUrl + 'List/GetDefaultColumnList', { viewName: viewName },
        function (headerDic) {
            acsys_columnList = [];
            $.each(headerDic, function () {
                acsys_columnList.push(this.FieldName);
            })
            getHeader(headerDic);
            getSearchAndFilterSelectItems(headerDic);
            ClearFilter()
            loadPage("GoTop");
        });
    }
}

function customInit(viewName, headerDic) {
    acsys_viewName = viewName;


    getHeader(headerDic);
    getSearchAndFilterSelectItems(headerDic);
    ClearFilter();
    $(window).resize();
    loadPage("Init");
}


$(document).ready(function () {

    $('#imgRefresh').click(function () {
        loadPage("GoTop");
    });

    $('.btnpgNav').click(function () {
        loadPage($(this).attr('Id'));
    });

    $('#icoRefresh').click(function () {
        loadPage("Refresh");
    });

    $('#spnSearch').click(function () {
        $('#SearchArea').show();
        $('#filterArea').hide();
    });

    $('#spnFilter').click(function () {
        $('#filterArea').show();
        $('#SearchArea').hide();
    });

    $('#applySearch').click(function () {
        showLoadingMessage('Loading Search Results');
        $.getJSON(relativeUrl + 'List/ApplySearch',
            { searchField: $('#selSearchField').val(), searchOperator: $('#selSearchOperator').val(), searchValue: $('#txtSearch').val() },
            function () { loadPage("GoTop") });
    });

    $('#applyFilter').click(function () {
        showLoadingMessage('Applying Filter');

        var fieldName = $('#selFilterField').children(":selected").attr("id");
        $.getJSON(relativeUrl + 'List/ApplyFilter',
            { filterColumn: fieldName, filterValue: $('#selFilterValues').val() },
            function () { loadPage("GoTop") })
    });

    $('#selFilterField').change(function () {
        if (true) {
            var fieldName = $(this).children(":selected").attr("id");

            $.getJSON(relativeUrl + 'List/getFilterList', { filterColumn: fieldName, viewName: viewName },
                function (data) {
                    $("#selFilterValues").html(data)
                })
        }
    })

    $('.clearFilter').click(function () {
        $.getJSON(relativeUrl + 'List/ClearFilter', null,
            function () {
                $('#filterArea').hide();
                $('#SearchArea').hide();
                loadPage("GoTop")
            })
    })
});

//$(window).resize(function () {
//    var windowHeight = $(window).height()
//    var tableBodyTop = $('#listTableBody').offset().top;
//    var footerHeight = $('#nsnToolingfooter').height();
//    var tableSize = windowHeight - tableBodyTop - footerHeight;
//    var trHeight = 27; // $('#tableBody tr').height();
//    var newRowCount = Math.floor(tableSize / trHeight) - 4;

//    if ((newRowCount != null) && (newRowCount > 0) && (trHeight != Infinity)) {
//        if (previousRowCount != newRowCount) {
//            previousRowCount = newRowCount;
//            $.getJSON(relativeUrl + 'List/ResizeTable', { rows: newRowCount }, function () {
//                //alert('resize')
//                loadPage("Resize")
//            })
//        }
//    }
//})

function loadPage(pageMove) {
    try {
        showLoadingMessage('Loading Page: ' + pageMove);
        $.ajax({
            type: "GET",
            url: relativeUrl + 'List/GetPage',
            data: { pageMove: pageMove, viewName: acsys_viewName, fieldList: acsys_columnList },
            traditional: true, // seems to allow arrays
            success: function (json) {
                $('#divloadArea').show();
                $('#spStartRec').html(json.startRec);
                $('#spEndRec').html(json.endRec);
                $('#spTotalRecs').html(json.totalRecs);
                if (typeof loadPageOverride != "undefined")
                    loadPageOverride(json)
                else {
                    var aTable;
                    if (json.view.length == 0) {
                        aTable = "<tr><td colspan='6'>no records found</td></tr>";
                    }
                    else {
                        $.each(json.view, function () {
                            aTable += "<tr>";
                            //for (i = 0; i < this.length; i++) {
                            for (key in this) {
                                //if (hasOwnProperty.call(this, key)) {
                                //    colName = key;
                                //}
                                if (key == "Id") {
                                    //aTable += "<td class='linky tdEdit' id='" + this[key] + "' >" + this[key] + "</td>";
                                    //aTable += "<td class='linky tdEdit' id='" + this[key] + "' title='" + this[key] + "'  >view/edit</td>";
                                    aTable += "<td class='linky tdEdit' id='" + this[key] + "' title='view/edit'  >" + this[key] + "</td>";
                                }
                                else
                                    aTable += "<td>" + this[key] + "</td>";
                            }
                            aTable += "</tr>";
                        })
                    }

                    $('#tableBody').html(aTable);


                    $('#tableBody tr').dblclick(function () {

                        var thisFirstId = $(this).children(":first").attr("id");
                        if (typeof OverrideGoToEditPage != "undefined")
                            OverrideGoToEditPage(thisFirstId)
                        else
                            window.location.href = editUrl + thisFirstId
                    })

                    $('.tdEdit').click(function () {
                        if (typeof OverrideGoToEditPage != "undefined") {
                            OverrideGoToEditPage($(this).attr("id"))
                        }
                        else
                            window.location.href = editUrl + $(this).attr("id")
                    })
                    $('.ltable tbody tr:odd').css('background-color', '#e5ebeb');
                }
                $('#divloadArea').show();
                $('#divLoadingMsg').hide();

                $(window).resize();

            },
            error: function (request, status, error) {
                $('#divLoadingMsg').hide();
                $('#ErrorMsg').html(status + " " + request.responseText + " " + error.message);
                alert(relativeUrl + 'List/GetPage: ' + request.responseText + " " + error.message);
            }
        })
    } catch (e) {
        alert('problem loading page: ' + e)
        $('#divLoadingMsg').hide();
    }
}

function getHeader(headerDic) {
    if (headerDic) {
        ahdr = "";
        $.each(headerDic, function () {
            ahdr += "<th id='" + this.FieldName + "'>" + this.HeaderLabel + "<span><img /></span></th>";
        })
        //for (i = 0; i < headerDic.length; i++) {
        //    ahdr += "<th id='" + headerDic["FieldName"] + "'>" + headerDic["HeaderLabel"] + "<span><img /></span></th>";
        //}
        $('#headerLabel').html(ahdr);

        $('#headerLabel th').click(function () {
            $('#headerLabel span img').hide();
            var mimg = $(this).find("img")
            if (currSortColumn == $(this).attr('id'))
                currSortDirection = currSortDirection == "desc" ? "asc" : "desc";
            else
                currSortDirection = "asc";
            currSortColumn = $(this).attr('id');
            if (currSortDirection == "desc")
                mimg.attr('src', relativeUrl + 'Images/up.png').show();
            else
                mimg.attr('src', relativeUrl + 'Images/down.png').show();
            $('#divLoadingMsg').show();
            $.getJSON(relativeUrl + 'List/ApplySort', { sortColumn: currSortColumn, sortDirection: currSortDirection }, function () {
                loadPage("GoTop")
            })
        })
    }
};

function getSearchAndFilterSelectItems(headerDic) {
    if (headerDic) {
        var selItems
        $.each(headerDic, function () {
            selItems += "<option id='[" + this.FieldName + "]'>" + this.HeaderLabel + "</option>";
        })
        $("#selSearchField").html(selItems)
        $("#selFilterField").html(selItems)
    }
}

function setDefaultSortColumn(sortColumn, sortDirection) {
    $.getJSON(relativeUrl + 'List/ApplySort', { sortColumn: sortColumn, sortDirection: sortDirection }, function () {
        if (typeof onDefaultSortColumnSet != "undefined")
            onDefaultSortColumnSet()
    })
}

function ClearFilter() {
    if (acsys_columnList) {
        $.getJSON(relativeUrl + 'List/ClearFilter', null,
        function () {
            $('#searchCol').hide();
            $('#filterArea').hide();
            $('#SearchArea').hide();
        })
    }
};

function ClearSortColumn() {
    if (acsys_columnList) {
        $.ajax({
            url: relativeUrl + 'List/ClearSortColumn', data: { fieldList: acsys_columnList }, traditional: true,
            success: function () {
                $('#filterArea').hide();
                $('#SearchArea').hide();
                if (typeof onDefaultSortColumnSet != "undefined")
                    onDefaultSortColumnSet()
            }
        })
    }
}
