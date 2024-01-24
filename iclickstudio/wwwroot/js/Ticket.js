function createTicket(isFromEvent) {
	debugger
	if (isFromEvent) {
		isFromEvent == true;
    }
	var defaultBtnValue = $('.submit-btn').html();
	$('.submit-btn').html("Please wait...");
	$('.submit-btn').attr("disabled", true);
    var data = {};
	data.Name = $("#name").val();
	data.TicketType = $("#ticketType").val();
	data.TicketPrice = $("#ticketPrice").val();
	if (data.TicketPrice == "") {
		data.TicketPrice = 0;
	}
	data.SalesStartTime = $("#salesStartTime").val();
	data.SalesEndTime = $("#salesEndTime").val();
	data.SalesStartDate = $("#salesStartDate").val();
	data.SalesEndDate = $("#salesEndDate").val();
	data.TicketQuantity = $("#ticketQuantityType").val();
	data.SpacePlannedFor = $("#spacePlannedFor").val();
	if (data.Name == "") {
		$('.submit-btn').html(defaultBtnValue);
		$('.submit-btn').attr("disabled", false);
		errorAlert("Name is required");
		return;
	}
	if (data.TicketType == "" || data.TicketType == "0") {
		$('.submit-btn').html(defaultBtnValue);
		$('.submit-btn').attr("disabled", false);
		errorAlert("Ticket Type is required");
		return;
	}
	if (data.SalesStartTime == "") {
		$('.submit-btn').html(defaultBtnValue);
		$('.submit-btn').attr("disabled", false);
		errorAlert("Sales Start Time is required");
		return;
	}
	if (data.SalesEndTime == "") {
		$('.submit-btn').html(defaultBtnValue);
		$('.submit-btn').attr("disabled", false);
		errorAlert("Sales End Time is required");
		return;
	}
	if (data.SalesStartDate == "") {
		$('.submit-btn').html(defaultBtnValue);
		$('.submit-btn').attr("disabled", false);
		errorAlert("Sales Start Time is required");
		return;
	}
	if (data.SalesEndDate == "") {
		$('.submit-btn').html(defaultBtnValue);
		$('.submit-btn').attr("disabled", false);
		errorAlert("Sales Start Date is required");
		return;
	}
	$.ajax({
		type: 'Post',
		url: '/Ticket/Add',
		dataType: 'json',
		data:
		{
			ticketViewModel: JSON.stringify(data),
			ticket: isFromEvent
		},
		success: function (result) {
			if (!result.isError) {
				if (isFromEvent) {
					$("#ticketId").append('<option selected value="' + result.data.id + '">' + result.data.name + '</option>');
					$('.submit-btn').html(defaultBtnValue);
					$('.submit-btn').attr("disabled", false);
					$('#add_ticket').modal('hide');
				} else {
					var url = '/Ticket/Index/';
					successAlertWithRedirect(result.msg, url)
				}
						
			}
			else {
				$('.submit-btn').html(defaultBtnValue);
				$('.submit-btn').attr("disabled", false);
				errorAlert(result.msg)
			}
		},
		error: function (ex) {
			$('.submit-btn').html(defaultBtnValue);
			$('.submit-btn').attr("disabled", false);
			errorAlert("Network failure, please try again");
		}
	});
};
function dateToInput(dateString) {

	var now = new Date(dateString);
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);

	var today = now.getFullYear() + "-" + (month) + "-" + (day);

	return today;
}
function getTicketToEdit(ticketId) {
	$.ajax({
		type: 'GET',
		url: '/Ticket/TicketById',
		dataType: 'json',
		data:
		{
			ticketId: ticketId
		},
		success: function (data) {
			if (!data.isError) {
				$.each(data.ticketTypes, function (i, getdropdown) {
					var option = '<option value="' + getdropdown.id + '">' + getdropdown.name + '</option>';
					if (data.data.ticketType == getdropdown.id) {
						option = '<option selected value="' + getdropdown.id + '">' + getdropdown.name + '</option>';
					}
					$("#editTicketType").append(option);
				});

				$.each(data.ticketQuantities, function (i, getdropdown) {
					var option = '<option value="' + getdropdown.id + '">' + getdropdown.name + '</option>';
					if (data.data.ticketQuantity == getdropdown.id) {
						option = '<option selected value="' + getdropdown.id + '">' + getdropdown.name + '</option>';
					}
					$("#editTicketQuantityType").append(option);
				});
				
				$('#editTicketId').val(data.data.id);
				$('#editTicketName').val(data.data.name);
				$('#editTicketType').val(data.data.ticketType);
				$('#editTicketPrice').val(data.data.ticketPrice);
				$('#editTicketQuantityType').val(data.data.ticketQuantity);
				$('#editSpacePlannedFor').val(data.data.spacePlannedFor);
				$('#editSalesStartDate').val(dateToInput(data.data.salesStartDate));
				$('#editSalesStartTime').val(data.data.salesStartTime);
				$('#editSalesEndDate').val(dateToInput(data.data.salesEndDate));
				$('#editSalesEndTime').val(data.data.salesEndTime);
			}
		},
	});
};
function editTicket() {
	var defaultBtnValue = $('.submit_btn').html();
	$('.submit_btn').html("Please wait...");
	$('.submit_btn').attr("disabled", true);
	var data = {};
	data.Id = $("#editTicketId").val();
	data.Name = $("#editTicketName").val();
	data.TicketType = $("#editTicketType").val();
	data.TicketQuantity = $("#editTicketQuantityType").val();
	data.TicketPrice = $("#editTicketPrice").val();
	if (data.TicketPrice == "") {
		data.TicketPrice = 0;
	}
	data.SalesStartTime = $("#editSalesStartTime").val();
	data.SalesEndTime = $("#editSalesEndTime").val();
	data.SalesStartDate = $("#editSalesStartDate").val();
	data.SalesEndDate = $("#editSalesEndDate").val();
	data.SpacePlannedFor = $("#editSpacePlannedFor").val();
	if (data.Name == "") {
		$('.submit-btn').html(defaultBtnValue);
		$('.submit-btn').attr("disabled", false);
		errorAlert("Name is required");
		return;
	}
	if (data.TicketType == "" || data.TicketType == "0") {
		$('.submit-btn').html(defaultBtnValue);
		$('.submit-btn').attr("disabled", false);
		errorAlert("Ticket Type is required");
		return;
	}
	if (data.SalesStartTime == "") {
		$('.submit-btn').html(defaultBtnValue);
		$('.submit-btn').attr("disabled", false);
		errorAlert("Sales Start Time is required");
		return;
	}
	if (data.SalesEndTime == "") {
		$('.submit-btn').html(defaultBtnValue);
		$('.submit-btn').attr("disabled", false);
		errorAlert("Sales End Time is required");
		return;
	}
	if (data.SalesStartDate == "") {
		$('.submit-btn').html(defaultBtnValue);
		$('.submit-btn').attr("disabled", false);
		errorAlert("Sales Start Time is required");
		return;
	}
	if (data.SalesEndDate == "") {
		$('.submit-btn').html(defaultBtnValue);
		$('.submit-btn').attr("disabled", false);
		errorAlert("Sales Start Date is required");
		return;
	}
	$.ajax({
		type: 'Post',
		url: '/Ticket/Edit',
		dataType: 'json',
		data:
		{
			ticketViewModel: JSON.stringify(data)
		},
		success: function (result) {
			if (!result.isError) {
				var url = '/Ticket/Index/';
				successAlertWithRedirect(result.msg, url)
			}
			else {
				$('.submit-btn').html(defaultBtnValue);
				$('.submit-btn').attr("disabled", false);
				errorAlert(result.msg)
			}
		},
		error: function (ex) {
			$('.submit-btn').html(defaultBtnValue);
			$('.submit-btn').attr("disabled", false);
			errorAlert("Network failure, please try again");
		}
	});
};
$(document).on('change', '#ticketType', function (e) {
	e.preventDefault();
	var ticketType = $(this).val();
	if (ticketType == 1) {
		$("#ticketPrice").prop("disabled", true);
	} else {
		$("#ticketPrice").prop("disabled", false);
	}
});
$(document).on('change', '#ticketQuantityType', function (e) {
	e.preventDefault();
	var ticketType = $(this).val();
	if (ticketType == 1) {
		$("#spacePlannedFor").prop("disabled", true);
	} else {
		$("#spacePlannedFor").prop("disabled", false);
	}
});
$(document).on('change', '#editTicketType', function (e) {
	e.preventDefault();
	var ticketType = $(this).val();
	if (ticketType == 1) {
		$("#editTicketPrice").prop("disabled", true);
	} else {
		$("#editTicketPrice").prop("disabled", false);
	}
});
$(document).on('change', '#editTicketQuantityType', function (e) {
	e.preventDefault();
	var ticketType = $(this).val();
	if (ticketType == 1) {
		$("#editSpacePlannedFor").prop("disabled", true);
	} else {
		$("#editSpacePlannedFor").prop("disabled", false);
	}
});

function DeleteTicketById(id) {
	$("#deleteTicketId").val(id);
}

function DeleteTicket() {
	var ticketId = $("#deleteTicketId").val();
	$.ajax({
		type: 'Post',
		url: "/Ticket/DeleteTicket",
		dataType: 'Json',
		data:
		{
			ticketId: ticketId
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