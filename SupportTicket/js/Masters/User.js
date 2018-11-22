﻿
var ObjUser = new User();
var isValidation = 0;
function User() {

    this.init = function () {

        try {
            this.Show(1);
            this.Clear();
            this.FillGrid();
            this.FillClientDropdown();
        }
        catch (ex) {
            alert(ex + 'Initialize User')
        }
    };


    this.Clear = function () {
        try{

            $('#UserId').val("");
            $('#txtUserCode').val("");
            $("#txtUserCode").removeClass("validateerror");
            $('#txtImgNameTemp').val("");
            $('#fileUpload').val("");
            $('#ImageUser').attr('src', '../Images/avatar_default.png');
            $('#txtUserName').val("");
            $("#txtUserName").removeClass("validateerror");
            $('#txtUserMobile').val("");
            $("#txtUserMobile").removeClass("validateerror");
            $('#txtUserEmailId').val("");
            $("#txtUserEmailId").removeClass("validateerror");
            $('#txtUserUserName').val("");
            $("#txtUserUserName").removeClass("validateerror");
            $('#txtUserPassword').val("");
            $("#txtUserPassword").removeClass("validateerror");

            $('#ddlClient').val("0");
            $("#select2-ddlClient-container").text("Select");
            $(".select2-selection").css("border-color", "#d2d6de");

            $('#txtUserSortOrder').val("");
            $("#txtUserSortOrder").removeClass("validateerror");
            $('#chkActive').prop("checked", true);
            $("#txtUserPassword").removeAttr("disabled");

            document.getElementById('btnRemove').style.display = "none";
            document.getElementById('fileUpload').style.display = "block";
            isValidation = 0;
        }
        catch (ex)
        {
            alert(ex + 'Clear users');
        }
    };


    this.Show = function (id) {

        if (id == 1) {
            $("#AddUser").hide();
            $("#ViewUser").show();

        }
        else {
            $("#ViewUser").hide();
            $("#AddUser").show();

        }
    };
    this.Validate = function () {
        if (isValidation == 1) {
            var _Error = 0;

            if ($('#txtUserCode').val().trim() == "") {
                $('#txtUserCode').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtUserCode').removeClass("validateerror");
            }

            if ($('#txtUserName').val().trim() == "") {
                $('#txtUserName').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtUserName').removeClass("validateerror");
            }

            if ($('#txtUserMobile').val() == "" || CheckMobileNumberSubmit('txtUserMobile')) {
                $('#txtUserMobile').addClass("validateerror");
                _Error++;

            }
            else {
                $('#txtUserMobile').removeClass("validateerror");
            }

            if ($('#txtUserEmailId').val() == "" || CheckEmailSubmit('txtUserEmailId')) {
                $('#txtUserEmailId').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtUserEmailId').removeClass("validateerror");
            }

            if ($('#txtUserUserName').val().trim() == "") {
                $('#txtUserUserName').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtUserUserName').removeClass("validateerror");
            }

            if ($('#UserId').val() == '' || $('#AdminId').val() == 1) {

            if ($('#txtUserPassword').val() == "" || CheckPasswordSubmit('txtUserPassword')) {
                $('#txtUserPassword').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtUserPassword').removeClass("validateerror");
            }
            }
           
            if ($('#ddlClient option:selected').val() == '0' ) {             
                $('.select2-selection').css("border-color", "red");
                _Error++;
            }
            else {
                $('.select2-selection').css("border-color", "#d2d6de");
            }

            return _Error;
           
        }

    }

    this.Submit = function () {
        
        isValidation = 1;
        if (this.Validate() <= 0) {
       
            ObjUser.Save();
        }
        else {

            return false;
        }
    };


    this.Save = function () {
        try {
            var ObjBlUser = {
                MasterID: $('#UserId').val() == '' ? '0' : $('#UserId').val(),
                ImageName: $('#txtImgNameTemp').val().trim(),
                UsCode: $('#txtUserCode').val().trim(),
                UsName: $('#txtUserName').val().trim(),
                UsMob: $('#txtUserMobile').val(),
                Usemail: $('#txtUserEmailId').val(),
                UsUserName: $('#txtUserUserName').val().trim(),
                UsPassword: $('#txtUserPassword').val(),
                FK_Client: $('#ddlClient option:selected').val(),
                SortOrder: $('#txtUserSortOrder').val(),
                Active: $('#chkActive').is(":checked")
            };
            var DATA = JSON.stringify(ObjBlUser);
            $.ajax({
                url: api_url + '/Users/UpdateUser',
                cache: false,
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                data: DATA,
                dataType: 'json',
                success: function (data) {
                    try {
                        if (data.statusCode > 0) {
                            if ($('#UserId').val() == '' ? '0' : $('#UserId').val() == 0) {
                                MessageText(data.statusCode, 'Saved Successfully', '#txtUserCode');
                            }
                            else {
                                MessageText(data.statusCode, 'Updated Successfully', '#txtUserCode');
                            }

                            ObjUser.init();
                        }
                        else {
                            MessageText(data.statusCode, '', '#txtUserCode');
                        }
                    }
                    catch (ex) {
                        alert(ex + 'return issue');
                    }
                },
                error: function (error) {
                    alert(error + ' : UpdateUser');

                }

            });
        }
        catch (e) {
            alert(e + '   : /Users/UpdateUser');
        }




    }

   

    this.FillGrid = function (PageIndex) {

        try {
            $.ajax({
                url: api_url + "/Users/SelectUserAll",
                cache: false,
                type: "GET",
                data: { 'PageIndex': PageIndex, 'SearchItem': $('#txtSearch').val() },
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    try {
                        var Mydata = JSON.parse(data);
                        var RecordCount = "0";
                        var html = "";
                        if (Mydata.length > 0) {

                            html += "<table width = '100%' id='example1' class='table table-bordered table-striped'>" +
                                      "<thead background-color='rgb(60, 141, 188)'>" +
                                          "<tr>" +
                                          "<th style = 'display:none' width  = '10%' >ID_user</th>" +
                                           "<th width  = '20%' >SlNo</th>" +
                                          "<th width  = '20%' >Code</th>" +
                                          "<th width  = '25%' >Name</th>" +
                                          "<th width  = '15%' >Email</th>" +
                                          "</tr>" +
                                      "</thead>";


                                    $.each(Mydata, function (key, val) {
                                        var htmlActionTd = "<td>" +
                                                           "<a href ='javascript:void(0)' onclick = 'ObjUser.FillUser(" + val.ID_Users + ")' class='edit'><i class='glyphicon glyphicon-edit'></i>" + "</a>" +
                                                           "<a href ='javascript:void(0)' onclick = 'ObjUser.DeleteUser(" + val.ID_Users + ")' class='remove'><i class='glyphicon glyphicon-trash'></i>" + "</a>" +
                                                           "</td>";
                                        html += "<tr>" +

                                            "<td style = 'display:none'>" + val.ID_user + "</td>" +
                                            "<td>" + val.SlNo + "</td>" +
                                            "<td>" + val.UsCode + "</td>" +
                                            "<td>" + val.UsName + "</td>" +
                                            "<td>" + val.Usemail + "</td>" +
                                            htmlActionTd +
                                            "</tr>";
                                RecordCount = val.RecordCount;

                            });

                            try   //Page Indexing Starts here
                            {
                                var temppagecount = parseInt(RecordCount) / 10

                                var pageCount = parseInt(Math.ceil(parseFloat(temppagecount)))
                                if (!PageIndex) {
                                    PageIndex = 1;
                                }

                                var i;

                                if (parseInt(PageIndex) <= 10) {
                                    i = 1;
                                }
                                else {

                                    i = PageIndex;
                                    var j = parseInt(i) % 10;
                                    if (parseInt(j) == parseInt(0)) {
                                        i = parseInt(i) - parseInt(9);
                                    }
                                    else {
                                        i = (parseInt(i) - parseInt(j) + parseInt(1));
                                    }

                                }

                                if (parseInt(pageCount) > 0) {
                                    html += "</table><div class='box-footer clearfix'><ul class='pagination pagination-sm no-margin pull-right'>" +
                                        "<li><a href ='javascript:void(0)' onclick = 'ObjUser.FillGrid(1)' class= '" + (parseInt(PageIndex) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>First</a></li>" +
                                   "<li><a href ='javascript:void(0)'  onclick = 'ObjUser.FillGrid(" + (parseInt(i) - parseInt(10)) + ")'   class= '" + (parseInt(i) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>«</a></li>"
                                    while (parseInt(i) <= parseInt(pageCount)) {
                                        html += "<li><a href ='javascript:void(0)' onclick = 'ObjUser.FillGrid(" + i + ")'  class='" + (parseInt(i) != parseInt(PageIndex) ? "activeAnchor" : "not-activeAnchorSelected") + "'   >" + i + "</a></li>"
                                        if (parseInt(i) % parseInt(10) == 0) {
                                            break;
                                        }
                                        i++;
                                    }
                                    html += "<li><a href ='javascript:void(0)' onclick = 'ObjUser.FillGrid(" + (parseInt(i) + parseInt(1)) + ")'   class= '" + ((parseInt(pageCount) - parseInt(PageIndex)) > 10 ? "activeAnchor" : "not-activeAnchor") + " ' >»</a></li>" +
                                    "<li><a href ='javascript:void(0)' onclick = 'ObjUser.FillGrid(" + pageCount + ")'   class= '" + (parseInt(PageIndex) < parseInt(pageCount) ? "activeAnchor" : "not-activeAnchor") + "'>Last</a></li>" +
                                   "</ul></div>";

                                }
                            }   //Page Indexing Starts here
                            catch (er) {
                                alert(er + 'Page Indexing');
                            }
                        }
                        $("#Grid").html(html);
                    }
                    catch (ex) {
                        alert(ex);
                    }

                },
                Error: function (response) {
                    try {
                        alert('ExceptionType: ' + r.ExMessge);
                    }
                    catch (ex) {
                        alert(ex);
                    }
                }


            });
        }
        catch (e) {
            alert(e);
        }
    }


    this.FillUser = function (ID_User) {

        $.ajax({

            url: api_url + '/Users/FillUser',
            data: { 'ID_User': ID_User },
            cache: false,
            type: 'Get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',

            success: function (data) {
                try {
                    var Mydata = JSON.parse(data);
                    if (Mydata.length > 0) {
                        $.each(Mydata, function (key, value) {
                            var ObjBlUser = value;
                           // $('#ddlClient').val(ObjBlUser.FK_Client);
                            $('#UserId').val(ObjBlUser.ID_Users);
                            $('#AdminId').val(ObjBlUser.adminbit);
                           // $('#txtUserCode').val(ObjBlUser.UsCode);
                            $('#txtImgNameTemp').val(ObjBlUser.ImageName);
                            $('#ImageUser').attr('src', ObjBlUser.FullImage);
                            $('#txtUserName').val(ObjBlUser.UsName);
                            $('#txtUserMobile').val(ObjBlUser.UsMob);
                            $('#txtUserEmailId').val(ObjBlUser.Usemail);
                          //  $('#txtUserUserName').val(ObjBlUser.UsUserName);
                            $('#txtUserPassword').val(ObjBlUser.UsPassword);
                            
                            //alert(ObjBlUser.FK_Client);

                            var arraytest = [];
                            if (Mydata.length > 0) {
                                var i = 0;
                                $.each(Mydata, function (key, value) {
                                    arraytest[i] = value.FK_Client;
                                    i++;
                                }
                                )
                            }
                            var $Multi = $("#ddlClient.form-control").select2();
                            $Multi.val(arraytest).trigger("change");

                            $('#txtUserSortOrder').val(ObjBlUser.SortOrder);

                            if (ObjBlUser.ImageName != null) {
                                document.getElementById('btnRemove').style.display = "block";
                                document.getElementById('fileUpload').style.display = "none";
                            }
                            else {
                                document.getElementById('btnRemove').style.display = "none";
                                document.getElementById('fileUpload').style.display = "block";
                            }

                            if (ObjBlUser.Active == true) {
                                $('#chkActive').prop("checked", true);
                            }
                            else {
                                $('#chkActive').prop("checked", false);
                            }
                            $('#txtUserCode').val(ObjBlUser.UsCode);
                            $('#txtUserUserName').val(ObjBlUser.UsUserName);

                            if (ObjBlUser.adminbit == 0) {
                                $("#txtUserPassword").attr("disabled", "disabled");
                            }

                         
                        }
                        )

                    };
                    ObjUser.Show(2);
                }
                catch (e) {
                    alert(e + 'FillUser');
                }

            }
        });

    }


    this.FillClientDropdown = function () {
        try {
            $.ajax({

                url: api_url + '/Users/ClientDropDownFill',
                cache: false,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    var Mydata = JSON.parse(data);
                    if (Mydata.length > 0) {
                        var optionhtml = '<option value=' + 0 + '>Select</option>';
                        try {
                        
                            $.each(Mydata, function (i, value) {
                                optionhtml += "<option onclick = 'ObjUser.FillField(this)' name='" + value.CliShortName + "' value='" + value.ID_Client + "'>" + value.CliName + "</option>";
                            });
                        }
                        catch (exx) {
                            alert(exx);
                        }
                    }
                    $('#ddlClient').html(optionhtml);
                },

                error: function (xhr, status, error) {
                    var err = eval('(' + xhr.responseText + ')');
                    alert(err.Message);
                }

            });
        }
        catch (ex) {
            alert(ex + ' Exception FillClientDropdown');
        }
    }

    this.DeleteUser = function (ID_User) {
        if (confirm('Do you want to delete..?')) {
            $.ajax({
                url: api_url + '/Users/DeleteUser',
                data: { 'ID_User': ID_User },
                cache: false,
                type: 'Get',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    var msg = "";
                    if (data.statusCode > 0) {
                        MessageText(data.statusCode, 'Deleted Successfully', '#txtUserCode');
                    }
                    else {
                        MessageText(data.statusCode, '', '#txtUserCode');
                    }
                    ObjUser.init();



                }
            });
        }


    }

    this.FillField = function (e) {
        //if ($('#UserId').val() == '') {
            $('#txtUserCode').val($('#ddlClient option:selected').attr("name"));
            $('#txtUserUserName').val($('#ddlClient option:selected').attr("name"));
        //}
    }




    this.UploadImg = function () {
        try{
        var data = new FormData();
        var files = $("#fileUpload").get(0).files;
        if (files.length > 0) {
            data.append("MyImages", files[0]);
            document.getElementById('btnRemove').style.display = "block";
            document.getElementById('fileUpload').style.display = "none";
        }
        $.ajax({
            url: api_url + '/Users/UploadFile',
            type: "POST",
            processData: false,
            contentType: false,
            data: data,
            success: function (response) {
                //code after success
                if (response != '') {
                    $("#txtImgNameTemp").val(response);
                    $("#ImageUser").attr('src', '../UploadedImages/UserUpload/' + response);
                }
                else {
                    $("#ImageAgent").attr('src', '../Images/avatar_default.png');
                    document.getElementById('btnRemove').style.display = "none";
                    document.getElementById('fileUpload').style.display = "block";
                    $('#fileUpload').val("");
                    MessageText('-32', '', '#fileUpload');
                }
            },
            error: function (er) {
                $("#ImageAgent").attr('src', '../Images/avatar_default.png');
                document.getElementById('btnRemove').style.display = "none";
                document.getElementById('fileUpload').style.display = "block";
                $('#fileUpload').val("");
                MessageText('-32', '', '#fileUpload');
            }

        });
        }
        catch (ex) {

            alert(ex + ': UploadImg');
            $("#ImageAgent").attr('src', '../Images/avatar_default.png');
            document.getElementById('btnRemove').style.display = "none";
            document.getElementById('fileUpload').style.display = "block";
            $('#fileUpload').val("");
        }
    }

    this.Remove = function () {
        var data = new FormData();
        var files = $("#fileUpload").get(0).files;
        $('#txtImgNameTemp').val("");
        $('#fileUpload').val("");
        $('#ImageUser').attr('src', '../Images/avatar_default.png');
        document.getElementById('btnRemove').style.display = "none";
        document.getElementById('fileUpload').style.display = "block";
    }

}


