function addEvent() {
    var defaultBtnValue = $('#submit').html();
    $('#submit').html("Please wait...");
    $('#submit').attr("disabled", true);
    var data = {};
    var formData = new FormData();
    var picture = document.getElementById("eventPhoto").files[0];
    formData.append("eventPhoto", picture);
    data.Name = $('#eventName').val();
    data.HostName = $('#hostName').val();
    data.HostId = $('#hostName').val();
    data.HostContactEmail = $('#hostContactEmail').val();
    data.EventVenueType = $('#eventVenueTypeId').val();
    data.TicketId = $('#ticketId').val();
    data.StartDate = $('#startDate').val();
    data.StartTime = $('#startTime').val();
    data.EndDate = $('#endDate').val();
    data.EndTime = $('#endTime').val();
    data.Location = $('#location').val();
    data.MeetingLink = $('#location').val();
    data.EventOverView = $('#eventOverView').val();
    if (data.Name == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Event name is required.");
        return;
    }
    if (data.HostName == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Host Name is required");
        return;
    }
    if (data.HostContactEmail == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Host Contact Email is required");
        return;
    }
    if (data.EventVenueType == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Event Venue Type is required");
        return;
    }
    if (data.EventStatus == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Event Status is required");
        return;
    }
    if (data.StartDate == "0000-00-00" || data.StartDate == "0001-01-01" || data.StartDate == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Start Date is required");
        return;
    }
    if (data.StartTime == "00:00:00" || data.StartTime == "00:00:00.000" || data.StartTime == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Start Time is required");
        return;
    }
    if (data.EndDate == "0000-00-00" || data.EndDate == "0001-01-01" || data.EndDate == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("End Date is required");
        return;
    }
    if (data.EndTime == "00:00:00" || data.EndTime == "00:00:00.000" || data.EndTime == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("End Time is required");
        return;
    }
    if (data.TicketId == "" || data.TicketId == "0") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Ticket is required");
        return;
    }
    if (data.EventVenueType == "1") {
        if (data.Location == "") {
            $('.submit-btn').html(defaultBtnValue);
            $('.submit-btn').attr("disabled", false);
            errorAlert("Location is required.");
            return;
        }
    }
    else if (data.EventVenueType == "2") {
        if (data.MeetingLink == "") {
            $('.submit-btn').html(defaultBtnValue);
            $('.submit-btn').attr("disabled", false);
            errorAlert("Meeting link is required.");
            return;
        }
    }
    if (data.EventOverView == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Event OverView is required");
        return;
    }

    formData.append("eventsModel", JSON.stringify(data));
    $.ajax({
        type: 'POST',
        dataType: 'Json',
        url: '/Events/Add',
        data: formData,
        contentType: false,
        processData: false,
        success: function (result) {
            $('#submit').html(defaultBtnValue);
            $('#submit').attr("disabled", false);
            if (!result.isError) {
                var url = '/Events/Index';
                successAlertWithRedirect(result.msg, url);
            }
            else {
                $('#submit').html(defaultBtnValue);
                $('#submit').attr("disabled", false);
                errorAlert(result.msg);
            }
        },
        error: function (ex) {
            $('#submit').html(defaultBtnValue);
            $('#submit').attr("disabled", false);
            errorAlert(ex);
        }
    });
}

function editEvent(id) {
    $.ajax({
        type: 'GET',
        url: '/Events/EditEvents', // we are calling json method
        dataType: 'json',
        data:
        {
            eventId: id
        },
        success: function (data) {
            if (!data.data.isError) {
                $('#editEventId').val(data.data.id);
                $('#editName').val(data.data.name);
                $('#select2-editHostName-container').text(data.data.host.fullName);
                $('#hostId').val(data.data.host.id);
                $('#editHostContactEmail').val(data.data.host.email);
                $('#editEventVenueTypeId').val(data.data.eventVenueType);
                $('#editStatusId').val(data.data.eventStatus);
                $('#select2-editTicketId-container').text(data.data.ticket.name);
                $('#ticketId').val(data.data.ticket.id);
                var startdate = data.data.startDate.split("T");
                $('#editStartDate').val(startdate[0]);
                $('#editStartTime').val(data.data.startTime);
                var endDate = data.data.endDate.split("T");
                $('#editEndDate').val(endDate[0]);
                $('#editEndTime').val(data.data.endTime);
                $('#editLocation').val(data.data.location);
                $('#editEventOverView').val(data.data.eventOverView);
                $('#editEventPhoto').val(data.data.mediaType.name);
            }
        },
        error: function (ex) {
            errorAlert("An error has occurred, try again. Please contact support if the error persists");
        }
    });
};

function saveEditedEvent() {
    var defaultBtnValue = $('#submit').html();
    $('#submit').html("Please wait...");
    $('#submit').attr("disabled", true);
    var data = {};
    var formData = new FormData();
    var picture = document.getElementById("editEventPhoto").files[0];
    formData.append("editEventPhotos", picture);
    data.Id = $('#editEventId').val();
    data.Name = $('#editName').val();
    data.HostName = $('#select2-editHostName-container').text();
    data.HostId = $('#hostId').val();
    data.HostContactEmail = $('#editHostContactEmail').val();
    data.EventVenueType = $('#editEventVenueTypeId').val();
    data.EventStatus = $('#editStatusId').val();
    data.TicketId = $('#ticketId').val();
    data.StartDate = $('#editStartDate').val();
    data.StartTime = $('#editStartTime').val();
    data.EndDate = $('#editEndDate').val();
    data.EndTime = $('#editEndTime').val();
    data.Location = $('#editLocation').val();
    data.EventOverView = $('#editEventOverView').val();
    if (data.Name == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Event name is required.");
        return;
    }
    if (data.HostName == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Host Name is required");
        return;
    }
    if (data.HostContactEmail == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Host Contact Email is required");
        return;
    }
    if (data.EventVenueType == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Event Venue Type is required");
        return;
    }
    if (data.EventStatus == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Event Status is required");
        return;
    }
    if (data.StartDate == "0000-00-00" || data.StartDate == "0001-01-01" || data.StartDate == null) {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Start Date is required");
        return;
    }
    if (data.StartTime == "00:00:00" || data.StartTime == "00:00:00.000") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Start Time is required");
        return;
    }
    if (data.EndDate == "0000-00-00" || data.EndDate == "0001-01-01") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("End Date is required");
        return;
    }
    if (data.EndTime == "00:00:00" || data.EndTime == "00:00:00.000") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("End Time is required");
        return;
    }
    if (data.TicketId == "" || data.TicketId == "0") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Ticket is required");
        return;
    }
    if (data.Location == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Location is required");
        return;
    }
    if (data.EventOverView == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Event OverView is required");
        return;
    }
    formData.append("events", JSON.stringify(data));
    $.ajax({
        type: 'POST',
        dataType: 'Json',
        url: '/Events/EditedEvents',
        data: formData,
        contentType: false,
        processData: false,
        success: function (result) {
            $('#submit_btn').html(defaultBtnValue);
            $('#submit_btn').attr("disabled", false);
            if (!result.isError) {
                var url = '/Events/Index';
                successAlertWithRedirect(result.msg, url);
            }
            else {
                $('#submit_btn').html(defaultBtnValue);
                $('#submit_btn').attr("disabled", false);
                errorAlert(result.msg);
            }
        },
        error: function (ex) {

            errorAlert(ex);
        }
    });
}
function deleteEvent(id) {
    $("#deletedEventId").val(id);
}
function eventRemove() {
    let deleteEventId = $('#deletedEventId').val();
    $.ajax({
        type: 'POST',
        url: '/Events/DeleteEvent', 
        dataType: 'json',
        data:
        {
            eventId: deleteEventId,
        },
        success: function (result) {
            if (!result.isError) {
                var url = "/Events/Index";
                newSuccessAlert(result.msg, url);
            }
            else {
                $('#loader').show();
                $('#loader-wrapper').fadeOut(3000);
                errorAlert(result.msg);
            }
        },
        error: function (ex) {
            errorAlert("An error has occurred, try again. Please contact support if the error persists");
        }
    });
}

function addNewLetterAndSendEmail() {
    var defaultBtnValue = $('.submit-btn').html();
    $('.submit-btn').html("Please wait...");
    $('.submit-btn').attr("disabled", true);
    var data = {};
    data.Name = $('#title').val();
    data.Audience = $('#audience').val();
    data.Body = $('#messageBody').val();
    if (data.Title == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Title is required.");
        return;
    }
    if (data.Body == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Message Body is required");
        return;
    }
    $.ajax({
        type: 'POST',
        url: '/NewsLetter/Add',
        dataType: 'json',
        data:
        {
            newsLetterData: JSON.stringify(data)
        },
        success: function (result) {
            if (!result.isError) {
                var url = "/NewsLetter/Index";
                newSuccessAlert(result.msg, url);
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
function addNewLetterAndSaveAsDraft() {
    var defaultBtnValue = $('.submit-btn').html();
    $('.submit-btn').html("Please wait...");
    $('.submit-btn').attr("disabled", true);
    var data = {};
    data.Name = $('#title').val();
    data.Audience = $('#audience').val();
    data.Body = $('#messageBody').val();
    if (data.Title == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Title is required.");
        return;
    }
    if (data.Body == "") {
        $('.submit-btn').html(defaultBtnValue);
        $('.submit-btn').attr("disabled", false);
        errorAlert("Message Body is required");
        return;
    }
    $.ajax({
        type: 'POST',
        url: '/NewsLetter/AddAndSaveAsDraft',
        dataType: 'json',
        data:
        {
            newsLetterData: JSON.stringify(data)
        },
        success: function (result) {
            if (!result.isError) {
                var url = "/NewsLetter/Index";
                newSuccessAlert(result.msg, url);
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
function sendNewsLetter(newsLetterId) {
    $.ajax({
        type: 'POST',
        url: '/NewsLetter/SendNewsLetter',
        dataType: 'json',
        data:
        {
            newsLetterId: newsLetterId
        },
        success: function (result) {
            if (!result.isError) {
                var url = "/NewsLetter/Index";
                newSuccessAlert(result.msg, url);
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
function eventPayment(eventId, ticketType, ticketPrice) {
    $.ajax({
        type: 'POST',
        dataType: 'Json',
        url: '/Payment/ProceedToEventPayment',
        data: { eventId: eventId, ticketType: ticketType, ticketPrice: ticketPrice},
        success: function (response) {
            if (!response.isError && response.data == "Free") {
                var url = "/User/Index";
                successAlertWithRedirect(response.msg, url);
            } else if (response.msg) {
                if (!response.isError && response.msg) {
                    infoAlert(response.msg)
                } else {
                    errorAlert(response.msg);
                }
            }
            else {
                window.location.href = response;
            }
        },
        error: function (ex) {
            errorAlert("An error has occurred, try again. Please contact support if the error persists");
        }
    });
}
