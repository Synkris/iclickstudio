function approveBlog(blogId) {
    $.ajax({
        type: 'Post',
        dataType: 'Json',
        url: '/Admin/ApproveBlog',
        data: {
            blogId: blogId
        },
        success: function (result) {
            if (!result.isError) {
                var url = "/Admin/UnapprovedBlogs";
                successAlertWithRedirect(result.msg, url);
            }
            else {
                errorAlert(result.msg);
            }
        },
        error: function (ex) {
            errorAlert("Error Occured,try again.");
        }
    });
}

function declineBlog(blogId){
    $.ajax({
        type: 'Post',
        dataType: 'Json',
        url: '/Admin/DeclineBlog',
        data: {
            blogId: blogId
        },
        success: function (result) {
            if (!result.isError) {
                var url = "/Admin/UnapprovedBlogs";
                successAlertWithRedirect(result.msg, url);
            }
            else {
                errorAlert(result.msg);
            }
        },
        error: function (ex) {
            errorAlert("Error Occured,try again.");
        }
    });
}

function CreateBlog() {
    var defaultBtnValue = $('#submit').html();
    $('#submit').html("Please wait...");
    $('#submit').attr("disabled", true);
    var blogViewModel = {};
    var formData = new FormData();
    var picture = document.getElementById("blogCoverPicture").files[0];
    formData.append("file", picture);
    blogViewModel.Name = $('#title').val();
    blogViewModel.BlogCategoryId = $('#blogCategoryId').val();
    blogViewModel.BlogContent = $('#blogContent').val();
    blogViewModel.AboutMe = $('#aboutMe').val();
    if (blogViewModel.Name == "") {
        $('#submit').html(defaultBtnValue);
        $('#submit').attr("disabled", false);
        errorAlert("Title is required");
        return;
    }
    if (blogViewModel.BlogCategoryId == "" || blogViewModel.BlogCategoryId == "0") {
        $('#submit').html(defaultBtnValue);
        $('#submit').attr("disabled", false);
        errorAlert("Blog category is required");
        return;
    }
    if (blogViewModel.BlogContent == "") {
        $('#submit').html(defaultBtnValue);
        $('#submit').attr("disabled", false);
        errorAlert("Blog content is required");
        return;
    }
    formData.append("blogViewModel", JSON.stringify(blogViewModel));
    $.ajax({
        type: 'Post',
        dataType: 'Json',
        url: '/Blog/Add',
        data: formData,
        contentType: false,
        processData: false,
        success: function (result) {
            if (!result.isError) {
                var url = window.location.href;
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
            errorAlert("Error Occured,try again.");
        }
    });
}
function addComment() {
    var defaultBtnValue = $('#submit').html();
    $('#submit').html("Please wait...");
    $('#submit').attr("disabled", true);
    var data = {};
    data.BlogId = $('#blogId').val();
    data.Comment = $('#comment').val();
    if (data.Comment == "") {
        $('#submit').html(defaultBtnValue);
        $('#submit').attr("disabled", false);
        errorAlert("Comment is required");
        return;
    }
    $.ajax({
        type: 'Post',
        dataType: 'Json',
        url: '/Blog/AddComment',
        data:
        {
            blogCommentViewModel: JSON.stringify(data)
        },
        success: function (result) {
            if (!result.isError) {
                var url = '/Blog/SingleBlog?blogId=' + result.data;
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
            errorAlert("Error Occurred,try again.");
        }
    });
}