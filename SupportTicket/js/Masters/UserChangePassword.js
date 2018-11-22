﻿
var ObjUserChangePassword = new UserChangePassword();
var isValidation = 0;
function UserChangePassword() {

    this.init = function () {

        try {
            this.Show(2);
            this.Clear();
            this.FillUserChangePassword();
        }
        catch (ex) {
            alert(ex + 'Initialize UserChangePassword')
        }
    };


    this.Clear = function () {

        $('#txtUserPasswordcurrent').val("");
        $("#txtUserPasswordcurrent").removeClass("validateerror");
        $('#txtUserPasswordnew').val("");
        $("#txtUserPasswordnew").removeClass("validateerror");
        $('#txtUserPasswordconfirm').val("");
        $("#txtUserPasswordconfirm").removeClass("validateerror");
      

        $("#txtUserNamecurrent").attr("disabled", "disabled");
      
        isValidation = 0;
    };


    this.Show = function (id) {

        if (id == 1) {
           
            $("#Changepassword").hide();
        }
        else {
          
            $("#Changepassword").show();
        }
       
    };
    this.Validate = function () {

        if (isValidation == 1) {
            var _Error = 0;

            if ($('#txtUserNamecurrent').val() == "") {
                $('#txtUserNamecurrent').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtUserNamecurrent').removeClass("validateerror");
            }

            if ($('#txtUserPasswordcurrent').val() == "") {
                $('#txtUserPasswordcurrent').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtUserPasswordcurrent').removeClass("validateerror");
            }


            if ($('#txtUserPasswordnew').val() == "" || CheckPasswordSubmit('txtUserPasswordnew')) {
                $('#txtUserPasswordnew').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtUserPasswordnew').removeClass("validateerror");
            }

           
            if ($('#txtUserPasswordconfirm').val() == "" || compare('txtUserPasswordnew', 'txtUserPasswordconfirm') || CheckPasswordSubmit('txtUserPasswordconfirm')) {
                $('#txtUserPasswordconfirm').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtUserPasswordconfirm').removeClass("validateerror");
            }
            return _Error;
        }

    }

    this.Submit = function () {
        isValidation = 1;
        if (this.Validate() <= 0) {
            ObjUserChangePassword.Save();
        }
        else {

            return false;
        }
    };


    this.Save = function () {
        try {
            var ObjBlUser = {
                MasterID: $('#UserId').val() == '' ? '0' : $('#UserId').val(),
                UsName: $('#txtUserNamecurrent').val(),               
                UsPassword: $('#txtUserPasswordnew').val(),
                CurrentPassword: $('#txtUserPasswordcurrent').val()
            };

            var DATA = JSON.stringify(ObjBlUser);
            $.ajax({
                url: api_url + '/UserDashboard/UpdateUserChangePassword',
                cache: false,
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                data: DATA,
                dataType: 'json',
                success: function (data) {
                    try {
                        if (data.statusCode > 0) {
                            if ($('#UserId').val() == '' ? '0' : $('#UserId').val() == 0) {
                                MessageText(data.statusCode, 'Saved Successfully', '#txtUserNamecurrent');
                            }
                            else {
                                MessageText(data.statusCode, 'Updated Successfully', '#txtUserNamecurrent');
                            }

                            ObjUserChangePassword.Show(1);
                        }
                        else {
                            MessageText(data.statusCode, '', '#txtUserNamecurrent');
                        }
                    }
                    catch (ex) {
                        alert(ex + 'return issue');
                    }


                },
                error: function (error) {
                    alert(error + ' : UpdateUserChangePassword');

                }

            });
        }
        catch (e) {
            alert(e + '   : /User/UpdateUserChangePassword');
        }

    }
    this.FillUserChangePassword = function () {
        $.ajax({
            url: api_url + "/UserDashboard/FillUserChangePassword",
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
                            $('#txtUserNamecurrent').val(ObjBlUser.UsName);
                        }
                        )
                    };
                    ObjUserChangePassword.Show(2);
                }
                catch (e) {
                    alert(e + 'FillUserChangePassword');
                }

            }
        });

    }

}