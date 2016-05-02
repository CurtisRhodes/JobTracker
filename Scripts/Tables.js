$(document).ready(function () {

    $(function () {
        $('#divUserDetails').attr('disabled', 'disabled');
        ko.applyBindings(viewModelCustomer, document.getElementById("divCustomerEdit"));
        ko.applyBindings(viewModelProperty, document.getElementById("divPropertyEdit"));
    });

    $('.tdLeftMenuArea ul li').click(function () {
        switch ($(this).attr('Id')) {
            case 'adminUsers':
                $('#divUsers').show();
                //kpiAuthorizedUserViewModel.List();
                break;
            case 'adminCustomers':
                $('#divCustomers').show();
                viewModelCustomer.List();
                break;
            case 'adminProperties':
                $('#divProperties').show();
                viewModelProperty.List();
                loadCustomerDropDown()
                break;
            case 'adminmenuDropDowns':
                $('#divDropDowns').show();
                if ($('#selRefTypes').html() == "")
                    GetRefTypes();
                break;
            case 'adminmenuOptions':
                $('#divOptions').show();
                break;
            default:
                alert('default: ' + $(this).attr('Id'));
                break;
        }
    })

});

var selectedCustomer;
var customerTableActive = true;
var customerEditMode;
$('#btnCustomerDelete').click(function () {
    if (confirm('Delete [' + viewModelCustomer.CustomerName() + ']')) {
        viewModelCustomer.Delete();
    }
})
$('#btnCustomerAddSave').click(function () {
    if ($(this).html() == "Save")
        if (!validateCustomer())
            return;
    btnClickAddSave("Customer", this)
})
$('#btnCustomerEditCancel').click(function () {
    btnClickEditCancel("Customer", this)
})
var viewModelCustomer = {
    CustomerId: ko.observable(),
    CustomerName: ko.observable(),
    BillingAddressStreet: ko.observable(),
    BillingAddressCity: ko.observable(),
    BillingAddressState: ko.observable(),
    BillingAddressZip: ko.observable(),
    ContactName: ko.observable(),
    ContactPhone: ko.observable(),
    ContactEmail: ko.observable(),
    Load: function (Id) {
        if (Id) {
            $('#divLoadingMsg').show();
            $.getJSON(relativeUrl + 'Data/GetCustomer', { customerId: Id }, function (data) {
                $.each(data, function (index, value) {
                    if (value !== "NULL") {
                        eval('viewModelCustomer.' + index + '("' + value.replace(/(\r\n|\n|\r)/gm, "") + '")');
                    }
                })
                $('#divLoadingMsg').hide();
            })
        }
    },
    List: function () {
        $('#divLoadingMsg').show();
        $.getJSON(relativeUrl + 'Data/GetCustomers', function (data) {
            var atable = "<table width='100%' id='tbCustomers'>";
            atable += "<tr><th>Customer Name</th><th>Location</th></tr>"
            $.each(data, function () {
                atable += "<tr id='" + this.CustomerId + "'>";
                atable += "<td>" + this.CustomerName + "</td>";
                atable += "<td>" + this.BillingAddressCity + ', ' + this.BillingAddressState + "</td></tr>";
            })
            atable += "</table>";
            $('#divCustomerList').html(atable);

            $('#tbCustomers tr')
                .mouseover(function () { if (customerTableActive) { $(this).addClass('listHighlight') } })
                .mouseout(function () { if (customerTableActive) { $(this).removeClass('listHighlight') } })
                  .click(function () {
                      if ($(this).attr('id'))
                          if (customerTableActive) {
                              if (selectedCustomer != null)
                                  selectedCustomer.removeClass('selectedListItem')
                              $(this).removeClass('listHighlight')
                              $(this).addClass('selectedListItem')
                              selectedCustomer = $(this);
                              viewModelCustomer.Load($(this).attr('id'));
                          }
                  });

            $('#divLoadingMsg').hide();
        })
    },
    Save: function () {
        $.ajax({
            url: relativeUrl + 'Data/AddEditCustomer',
            data: ko.toJSON({ vm: this }),
            type: "post", contentType: "application/json; charset=utf-8",
            success: function (success) {
                if (success[0] == "ok") {
                    viewModelCustomer.List(viewModelCustomer.CustomerId())
                }
                else
                    alert('viewModelCustomer.Save: ' + success[0])
            },
            error: function (request, status, error) {
                alert('Error viewModelCustomer.Save: ' + error);
                $('#ErrorMsg').html('viewModelCustomer.Save error:' + request.responseText);
            }
        })
    },
    Delete: function (Id) {
        $.getJSON(relativeUrl + 'Data/DeleteCustomer', { customerId: Id }, function (data) {
            if (success == "ok")
                viewModelCustomer.List(viewModelCustomer.CustomerId())
            else
                alert('unable to delete product: ' + success)
        })
    },
    Clear: function () {
        viewModelCustomer.CustomerId(0)
        viewModelCustomer.CustomerName('')
        viewModelCustomer.BillingAddressStreet('')
        viewModelCustomer.BillingAddressCity('')
        viewModelCustomer.BillingAddressZip('')
        viewModelCustomer.ContactName('')
        viewModelCustomer.ContactPhone('')
        viewModelCustomer.ContactEmail('')
    }
}
function validateCustomer() {
    return true;
}

var selectedProperty;
var propertyTableActive = true;
var propertyEditMode;
$('#btnPropertyDelete').click(function () {
    if (confirm('Delete [' + viewModelProperty.PropertyName() + ']')) {
        viewModelProperty.Delete();
    }
})
$('#btnPropertyAddSave').click(function () {
    if ($(this).html() == "Save")
        if (!validateProperty())
            return;
    btnClickAddSave("Property", this)
})
$('#btnPropertyEditCancel').click(function () {
    btnClickEditCancel("Property", this)
})
var viewModelProperty = {
    PropertyId: ko.observable(),
    CustomerId: ko.observable(),
    PropertyName: ko.observable(),
    PropertyAddressStreet: ko.observable(),
    PropertyAddressCity: ko.observable(),
    PropertyAddressState: ko.observable(),
    PropertyAddressZip: ko.observable(),
    PropertyContactName: ko.observable(),
    PropertyContactPhone: ko.observable(),
    PropertyContactEmail: ko.observable(),
    Load: function (Id) {
        if (Id) {
            $('#divLoadingMsg').show();
            $.getJSON(relativeUrl + 'Data/GetCustomerProperty', { propertyId: Id }, function (data) {
                $.each(data, function (index, value) {
                    if (value !== "NULL") {
                        eval('viewModelProperty.' + index + '("' + value.replace(/(\r\n|\n|\r)/gm, "") + '")');
                    }
                })
                $('#divLoadingMsg').hide();
            })
        }
    },
    List: function () {
        $('#divLoadingMsg').show();
        $.getJSON(relativeUrl + 'Data/GetCustomerProperties', function (data) {
            var atable = "<table width='100%' id='tbProperty'>";
            atable += "<tr><th>Property Name</th><th>Location</th></tr>"
            $.each(data, function () {
                atable += "<tr id='" + this.PropertyId + "'>";
                atable += "<td>" + this.PropertyName + "</td>";
                atable += "<td>" + this.PropertyAddressCity + ', ' + this.PropertyAddressState + "</td></tr>";
            })
            atable += "</table>";
            $('#divPropertyList').html(atable);

            $('#tbProperty tr')
                .mouseover(function () { if (propertyTableActive) { $(this).addClass('listHighlight') } })
                .mouseout(function () { if (propertyTableActive) { $(this).removeClass('listHighlight') } })
                  .click(function () {
                      if ($(this).attr('id'))
                          if (propertyTableActive) {
                              if (selectedProperty != null)
                                  selectedProperty.removeClass('selectedListItem')
                              $(this).removeClass('listHighlight')
                              $(this).addClass('selectedListItem')
                              selectedProperty = $(this);
                              viewModelProperty.Load($(this).attr('id'));
                          }
                  });
            $('#divLoadingMsg').hide();
        })
    },
    Save: function () {
        $.ajax({
            url: relativeUrl + 'Data/AddEditCustomerProperty',
            data: ko.toJSON({ vm: this }),
            type: "post", contentType: "application/json; charset=utf-8",
            success: function (success) {
                if (success[0] == "ok") {
                    viewModelProperty.List(viewModelProperty.PropertyId())
                }
                else
                    alert('viewModelProperty.Save: ' + success[0])
            },
            error: function (request, status, error) {
                alert('Error viewModelCustomerProperty.Save: ' + error);
                $('#ErrorMsg').html('viewModelCustomerProperty.Save error:' + request.responseText);
            }
        })
    },
    Delete: function (Id) {
        $.getJSON(relativeUrl + 'Data/DeleteProperty', { propertyId: Id }, function (success) {
            if (success == "ok")
                viewModelProperty.List(viewModelProperty.CustomerId())
            else
                alert('unable to delete Property: ' + success)
        })
    },
    Clear: function () {
        viewModelProperty.PropertyId(0)
        viewModelProperty.PropertyName('')
        viewModelProperty.PropertyAddressStreet('')
        viewModelProperty.PropertyAddressCity('')
        viewModelProperty.PropertyAddressZip('')
        viewModelProperty.PropertyContactName('')
        viewModelProperty.PropertyContactPhone('')
        viewModelProperty.PropertyContactEmail('')
    }
}
function validateProperty() {
    return true;
}
function loadCustomerDropDown() {
    $.getJSON(relativeUrl + 'Data/GetCustomers', function (data) {
        $('#selCustomer').html("<option value='000'>-- Select Customer --</option>");
        $.each(data, function () {
            $('#selCustomer').append("<option value='" + this.CustomerId + "'>" + this.CustomerName + "</option>");
        })
    });
}