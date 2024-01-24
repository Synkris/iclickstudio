function AddRole() {
    var defaultBtnValue = $('#submit').html();
    $('#submit').html("Please wait...");
    $('#submit').attr("disabled", true);
    var emptyValue = "00000000-0000-0000-0000-000000000000";
    var data = {};
    data.UserId = $('#userId').val();
    data.RoleId = $('#roleId').val();
    if (data.UserId == "" || data.UserId == emptyValue) {
        $('#submit').html(defaultBtnValue);
        $('#submit').attr("disabled", false);
        errorAlert("User is required");
        return;
    }
    if (data.RoleId == "" || data.RoleId == emptyValue) {
        $('#submit').html(defaultBtnValue);
        $('#submit').attr("disabled", false);
        errorAlert("Role is required");
        return;
    }
    $.ajax({
        type: 'Post',
        dataType: 'Json',
        url: '/SuperAdmin/AddUserRole',
        data:
        {
            userData: JSON.stringify(data)
        },
        success: function (result) {
            $('#submit_btn').html(defaultBtnValue);
            $('#submit_btn').attr("disabled", false);
            if (!result.isError) {
                var url = window.location.href;
                successAlertWithRedirect(result.msg, url);
            }
            else {
                $('#submit_btn').html(defaultBtnValue);
                $('#submit_btn').attr("disabled", false);
                errorAlert(result.msg);
            }
        },
        Error: function (ex) {
            errorAlert(ex);
        }
    });
    
}

function removeRole(id, userId) {
    $("#deletedRoleId").val(id);
    $("#userId").val(userId);
}

function roleRemove() {
    var roleId = $("#deletedRoleId").val();
    var userId = $("#userId").val();
    if (roleId != "" && userId != "") {
        $.ajax({
            type: 'POST',
            url: "/SuperAdmin/DeleteRole",
            dataType: 'json',
            data:
            {
                roleId: roleId,
                userId: userId,
            },
            success: function (result) {
                if (!result.isError) {
                    debugger;
                    var url = "/SuperAdmin/Roles";
                    newSuccessAlert(result.msg, url);

                }
                else {
                    //$('#preloader').show();
                    //$('#loaders-wraper').fadeOut(3000);
                    errorAlert(result.msg);
                }
            }
        });
    }
}

$(function () {
    $(".makeFilter").select2();
    $(".makeFilter2").select2();
});

function addDropdown() {
    var commonDropdown = {};
    commonDropdown.DropdownKey = $("#dropDownId").val();
    commonDropdown.Name = $("#dropDownName").val();
    $.ajax({
        type: 'POST',
        url: '/Admin/AddDropdown',
        dataType: 'Json',
        data:
        {
            dropDownDetails: JSON.stringify(commonDropdown)
        },
        success: function (result) {
            if (!result.isError) {
                var url = window.location.href;
                newSuccessAlert(result.msg, url);
            }
            else {
                errorAlert(result.msg);
            }
        },
        error: function (ex) {
            errorAlert(ex);
        }
    });
    
}

function editDropdown(id) {
    $.ajax({
        type: 'GET',
        url: '/Admin/EditDropdown',
        dataType: 'json',
        data: { dropdownId: id },
        success: function (result) {
            if (!result.isError) {
                $.each(result.drop, function (i, getdropdown) {
                    debugger;
                    $("#editDropDownKeyId").append('<option value="' + getdropdown.id + '">' + getdropdown.name + '</option>');
                });

                $("#editdropDownName").val(result.data.name);
                $("#editedDropDownId").val(result.data.id);

            }
            else {
                errorAlert(result.msg);
            }
        },
        error: function (ex) {
            errorAlert('Failed to retrieve dropdowns' + ex)
        }
    });
}

function submitEditDropDown() {
    var dropDownId = $("#editedDropDownId").val();
    var dropDownName = $("#editdropDownName").val();
    $.ajax({
        type: 'POST',
        url: '/Admin/EditDropDown',
        dataType: 'json',
        data:
        {
            dropDownName: dropDownName,
            dropDownId: dropDownId
        },
        success: function (result) {
            if (!result.isError) {
                var url = window.location.href;
                newSuccessAlert(result.msg, url);
            }
            else {
                errorAlert(result.msg);
            }
        },
        error: function (ex) {
            errorAlert(ex);
        }
    });
}

function deleteDropdown(id) {
    $("#deletedDropDownId").val(id);
}

function dropdownDelete() {
    var id = $("#deletedDropDownId").val();
    $.ajax({
        type: 'POST',
        url: "/Admin/DeleteDropDown",
        dataType: 'json',
        data:
        {
            dropDownId: id
        },
        success: function (result) {
            debugger;
            if (!result.isError) {
                debugger;
                var url = "/SuperAdmin/Dropdown";
                newSuccessAlert(result.msg, url);

            } else {
                $('#loader').show();
                $('#loader-wrapper').fadeOut(3000);
                errorAlert(result.msg);
            }
        }
    });
}