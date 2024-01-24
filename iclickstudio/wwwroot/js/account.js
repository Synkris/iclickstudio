function PasswordShow() {
	$("#passwordHide").removeClass("d-none");
	$("#passwordShow").addClass("d-none");
	$("#password").attr("type", "text");

}
function PasswordHide() {
	$("#passwordShow").removeClass("d-none");
	$("#passwordHide").addClass("d-none");
	$("#password").attr("type", "password");

}
function login() {
	var defaultBtnValue = $('#submit_btn').html();
	$('#submit_btn').html("Please wait...");
	$('#submit_btn').attr("disabled", true);
    var isEmail = $('#isEmail').val();
	var email = $('#email').val();
	var password = $('#password').val();
    var userName = $('#userName').val();
    if (isEmail == "true") {
        if (email == "") {
            $('#submit_btn').html(defaultBtnValue);
            $('#submit_btn').attr("disabled", false);
            errorAlert("Email is required");
            return;
        }
    } else {
        if (userName == "") {
            $('#submit_btn').html(defaultBtnValue);
            $('#submit_btn').attr("disabled", false);
            errorAlert("User name is required");
            return;
        }
    }
    if (password == "") {
        $('#submit_btn').html(defaultBtnValue);
        $('#submit_btn').attr("disabled", false);
        errorAlert("Password is required");
        return;
    }
	$.ajax({
		type: 'Post',
		url: '/Account/Login',
		dataType: 'json',
		data:
		{
			email: email,
            password: password,
            userName: userName
		},
		success: function (result) {
			if (!result.isError) {
				var n = 1;
				localStorage.clear();
				localStorage.setItem("on_load_counter", n);
				location.href = result.url;

			}
			else {
				$('#submit_btn').html(defaultBtnValue);
				$('#submit_btn').attr("disabled", false);
				errorAlert(result.msg);
			}
		},
		error: function (ex) {
			$('#submit_btn').html(defaultBtnValue);
			$('#submit_btn').attr("disabled", false);
			errorAlert("An error has occurred, try again. Please contact support if the error persists");
		}
	});
}

function register() {
    var defaultBtnValue = $('#submit').html();
    $('.submit').html("Please wait...");
    $('.submit').attr("disabled", true);
    var data = {};
    data.FirstName = $('#firstName').val();
    data.LastName = $('#lastName').val();
    data.MiddleName = $('#middleName').val();
    data.UserName = $('#userName').val();
    data.Email = $('#email').val();
    data.PhoneNumber = $('#phoneNumber').val();
    data.GenderId = $('#genderId').val();
    data.CountryId = $('#countryId').val();
    data.StateId = $('#stateId').val();
    data.Password = $('#password').val();
    data.GraduationYear = $('#graduationYear').val();
    data.TitleId = $('#titleId').val();
    data.GraduationYear = $('#graduationYear').val();
    data.DateOfBirth = $('#dateOfBirth').val();
    data.ConfirmPassword = $('#confirmpassword').val();
    var formData = new FormData();
    var picture = document.getElementById("profilePiture").files[0];
    formData.append("profilePiture", picture);
    if (data.Password != data.ConfirmPassword) {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Password & confirm password must match");
        return;
    }
    if (data.FirstName == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("FirstName is required");
        return;
    }
    if (data.LastName == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("LastName type is required");
        return;
    }
    if (data.UserName == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("UserName is required");
        return;
    }
    var filterSpace = data.UserName.replace(/\s/g, '');
    data.UserName = filterSpace;
    if (data.Email == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Email is required");
        return;
    }
    if (data.PhoneNumber == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Phone number type is required");
        return;
    }
    if (data.Password == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Password is required");
        return;
    }
    if (data.ConfirmPassword == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Confirm password is required");
        return;
    }
    if (data.GraduationYear == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Graduation year is required");
        return;
    }
    if (data.GenderId == "" || data.GenderId == "0") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Gender is required");
        return;
    }
    if (data.StateId == "" || data.StateId == "0") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("State is required");
        return;
    }
    if (data.CountryId == "" || data.CountryId == "0") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Country is required");
        return;
    }
    if (data.TitleId == "" || data.TitleId == "0") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Title is required");
        return;
    }
    formData.append("applicationViewModel", JSON.stringify(data));
    $.ajax({
        type: 'POST',
        dataType: 'Json',
        url: '/Account/Register',
        data: formData,
        contentType: false,
        processData: false,
        success: function (result) {
            $('.submit_btn').html(defaultBtnValue);
            $('.submit_btn').attr("disabled", false);
            if (!result.isError) {
                var url = '/Account/Login';
                successAlertWithRedirect(result.msg, url);
            }
            else {
                $('.submit_btn').html(defaultBtnValue);
                $('.submit_btn').attr("disabled", false);
                errorAlert(result.msg);
            }
        },
        error: function (ex) {
               
            errorAlert(ex);
        }
    });
}

var checkedFeature = [];
var uncheckedFeature = [];
function getCheckedAccess() {
    var allCheckedFeatures = document.getElementsByClassName("feature");

    for (var i = 0; i < allCheckedFeatures.length; i++) {

        if (allCheckedFeatures[i].checked) {
            checkedFeature.push(allCheckedFeatures[i].name);
        }
        else {
            uncheckedFeature.push(allCheckedFeatures[i].name)
        }
    }
}

function saveAdminData() {
    var defaultBtnValue = $('#submit_btn').html();
    $('#submit_btn').html("Please wait...");
    $('#submit_btn').attr("disabled", true);
    $('#loader').show();
    $('#loader-wrapper').show();
    getCheckedAccess();
    var checkedListFeaturesJs = checkedFeature;
    var unCheckedListFeaturesJs = uncheckedFeature;
    var pageSize = $('#setPageSize').val();
    var registrationFee = $('#registrationFee').val();
    $.ajax({
        type: 'POST',
        dataType: 'Json',
        url: '/Admin/CustomAdminSetting',
        data:
        {
            checkedAdminSettings: checkedListFeaturesJs,
            uncheckedAdminSettings: unCheckedListFeaturesJs,
            pageSize: pageSize,
            registrationFee: registrationFee,
        },
        success: function (result) {
            $('#loader').show();
            $('#loader-wrapper').fadeOut(3000);
            if (!result.isError) {
                var reloadUrl = "/Admin/AdminSettings";
                newSuccessAlert(result.msg, reloadUrl);
                $('#submit_btn').html(defaultBtnValue);
            }

            else {
                $('#submit_btn').html(defaultBtnValue);
                $('#submit_btn').attr("disabled", false);
                $('#loader').show();
                $('#loader-wrapper').fadeOut(3000);
                errorAlert(result.msg);
            }
        },
        error: function (ex) {
            $('#loader').show();
            $('#loader-wrapper').fadeOut(3000);

            errorAlert("Network failure, please try again");
            $('#submit_btn').html(defaultBtnValue);
            $('#submit_btn').attr("disabled", false);
        }
    });
}
