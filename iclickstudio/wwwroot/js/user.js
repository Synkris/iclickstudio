function editUserProfile() {
	var defaultBtnValue = $('.submit_btn').html();
	$('.submit_btn').html("Please wait...");
	$('.submit_btn').attr("disabled", true);
	var data = {};
	data.Id = $('#editProfile_Id').val();
	data.firstName = $('#firstName').val();
	data.middleName = $('#middleName').val();
	data.lastName = $('#lastName').val();
	data.DateOfBirth = $('#birthDate').val();
	data.userName = $('#userName').val();
	data.phoneNumber = $('#phoneNumber').val();
	data.graduationYear = $('#gradYear').val();
	data.TitleId = $('#titleId').val();
	data.shortBio = $('#shortBio').val();
	data.email = $('#email').val();
	data.countryId = $('#countryId').val();
	data.stateId = $('#stateId').val();
	data.genderId = $('#genderId').val();
	var formData = new FormData();
	formData.append("userDetails", JSON.stringify(data));
	var picture = document.getElementById("profilePicture").files[0];
	formData.append("profilePicture", picture);
	$.ajax({
		type: 'Post',
		url: '/User/UpdateProfile',
		data: formData,
		contentType: false, 
		processData: false,
		success: function (result) {
			if (!result.isError) {
				var url = window.location.href;
				successAlertWithRedirect(result.msg, url);
				$('.submit_btn').html(defaultBtnValue);
			}
			else {
				$('.submit_btn').html(defaultBtnValue);
				$('.submit_btn').attr("disabled", false);
				errorAlert(result.msg);
			}
		},
		error: function (ex) {
			$('.submit_btn').html(defaultBtnValue);
			$('.submit_btn').attr("disabled", false);
			errorAlert("Please fill the form properly");
		}
	});
}
function dateToInput(dateString) {

	var now = new Date(dateString);
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);

	var today = now.getFullYear() + "-" + (month) + "-" + (day);

	return today;
}
function getUserProfileToBeEdited(id) {
	$.ajax({
		type: 'Get',
		url: '/User/UserProfileForEdit',
		data: {
			userId: id,
		},
		success: function (result) {
			if (!result.isError) {
				$.each(result.states, function (i, getdropdown) {
					if (result.data.stateId == getdropdown.id) {
						$("#stateId").append('<option selected value="' + getdropdown.id + '">' + getdropdown.name + '</option>');
					} $("#stateId").append('<option value="' + getdropdown.id + '">' + getdropdown.name + '</option>');
				});
				$.each(result.genders, function (i, getdropdown) {
					if (result.data.genderId == getdropdown.id) {
						$("#genderId").append('<option selected value="' + getdropdown.id + '">' + getdropdown.name + '</option>');
					} $("#genderId").append('<option value="' + getdropdown.id + '">' + getdropdown.name + '</option>');
				});
				$.each(result.countries, function (i, getdropdown) {
					if (result.data.countryId == getdropdown.id) {
						$("#countryId").append('<option selected value="' + getdropdown.id + '">' + getdropdown.name + '</option>');
					}
					$("#countryId").append('<option value="' + getdropdown.id + '">' + getdropdown.name + '</option>');
				});
				$.each(result.titles, function (i, getdropdown) {
					if (result.data.titleId == getdropdown.id) {
						$("#titleId").append('<option selected value="' + getdropdown.id + '">' + getdropdown.name + '</option>');
					} $("#titleId").append('<option value="' + getdropdown.id + '">' + getdropdown.name + '</option>');
				});
				$('#editProfile_Id').val(result.data.id);
				$('#firstName').val(result.data.firstName);
				$('#middleName').val(result.data.middleName);
				$('#userProfilePicture').attr('src', result.data.userProfilePicture);
				$('#lastName').val(result.data.lastName);
				$('#birthDate').val(dateToInput(result.data.birthDate));
				$('#userName').val(result.data.userName);
				$('#shortBio').val(result.data.shortBio);
				$('#gradYear').val(result.data.graduationYear);
				$('#phoneNumber').val(result.data.phoneNumber);
				$('#email').val(result.data.email);
				$('#profilePicture').val(result.data.userProfilePicture);
			}
			else {
				errorAlert(result.msg);
			}
		},
		error: function (ex) {
			errorAlert("An error has occurred, try again. Please contact support if the error persists");
		}
	});
}
function proceedToPayment() {
	var userId = document.getElementById('userPaymentId').getAttribute('data-user-payment-id');
	$.ajax({
		type: 'POST',
		dataType: 'Json',
		url: '/Payment/ProceedToPayment',
		data: { userId: userId },
		success: function (response) {
			// Redirect the user to Paystack for payment
			window.location.href = response;
		},
		error: function (ex) {
			errorAlert(ex);
		}
	});
}
function deactivateUser(id) {
	$("#deleteUserId").val(id);
}
function deactivatedeUser() {
	var userId = $("#deleteUserId").val();
	$.ajax({
		type: 'Post',
		url: "/Admin/DeactivatedUser",
		dataType: 'Json',
		data:
		{
			userId: userId
		},
		success: function (result) {
			if (!result.isError) {
				var url = window.location.href;
				newSuccessAlert(result.msg, url);

			} else {
				errorAlert(result.msg);
			}
		}
	});
}
function reactivateUser(id) {
	$("#reactivateUserId").val(id);
}
function reactivatedUserId() {
	var userId = $("#reactivateUserId").val();
	$.ajax({
		type: 'Post',
		url: "/Admin/ReactivateUser",
		dataType: 'Json',
		data:
		{
			userId: userId
		},
		success: function (result) {
			if (!result.isError) {
				var url = window.location.href;
				newSuccessAlert(result.msg, url);

			} else {
				errorAlert(result.msg);
			}
		}
	});
}
function previewProfilePicture() {
	var input = document.getElementById('profilePicture');
	var image = document.getElementById('userProfilePicture');
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			image.src = e.target.result;
		};
		reader.readAsDataURL(input.files[0]);
	}
}