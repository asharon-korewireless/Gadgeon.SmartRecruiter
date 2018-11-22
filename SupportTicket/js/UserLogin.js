﻿

var ObjUserLogin = new UserLogin();
var isValidation = 0;
function UserLogin() {


    this.init = function () {

        try {
            this.Clear();
            this.DrawCaptcha();
           
          
        }
        catch (ex) {
            alert(ex + 'Initialise Product')
        }
    };

    this.Clear = function () {      
       
        $('#txtUserName').val("");
        $("#txtUserName").removeClass("validateerror");
        $('#txtPassword').val("");
        $("#txtPassword").removeClass("validateerror");       
        isValidation = 0;

    };

    this.Validate = function () {
        try {
        if (isValidation == 1) {
            var _Error = 0;
            if (($('#txtUserName').val() == "") || ($('#txtUserName').val() == "User Name")) {
                $('#txtUserName').focus();
                $('#txtUserName').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtUserName').removeClass("validateerror");
            }
            if (_Error == 0) {
                if (($('#txtPassword').val() == "") || ($('#txtPassword').val() == "Password")) {
                    $('#txtPassword').focus()
                    $('#txtPassword').addClass("validateerror");
                    _Error++;
                }
                else {
                    $('#txtPassword').removeClass("validateerror");
                }
            }
            return _Error;
        }
    } catch (e) {
        alert(e + '  Validate');
    }
    }
    this.Submit = function () {
        isValidation = 1;
        if (this.Validate() <= 0) {
            ObjUserLogin.UserLoginCheck();
        }
        else {
            return false;
        }
    };

    this.UserLoginCheck = function () {
        try {
            var ObjBlUser = {
                UsUserName: $('#txtUserName').val(),
                UsPassword: $('#txtPassword').val(),

            };
            var DATA = JSON.stringify(ObjBlUser);          
            $.ajax({
                url: api_url + '/Home/UserLoginCheck',
                cache: false,
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                data: DATA,
                dataType: 'json',
                success: function (Mydata) {
                    try {
                        if (Mydata.statusCode == 2) {

                            //alert('UserName and password mismatch');
                            $('#lblLogin').text('*UserName and password mismatch');
                            //window.location.href = data.Url;
                            ObjUserLogin.DrawCaptcha();
                            $('#txtCaptchaInput').val('');
                        }
                        else {
                            $('#lblLogin').html('');
                            window.location.href = Mydata.Url;
                        }



                    }
                    catch (ex) {
                        alert('llll');
                        alert(ex + 'return issue');
                    }

                }
                 ,

                error: function (error) {
                    alert(error + ' : UserLoginCheck');

                }

            });
        }
        catch (e) {
            alert(e + '   : /Home/UserLoginCheck');
        }
    }

    this.DrawCaptcha = function () {
        function randString(x) {
            var s = "";
            while (s.length < x && x > 0) {
                var r = Math.random();
                s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 27) + (r > 0.5 ? 97 : 65)));
            }
            return s;
        }
        document.getElementById("txtCaptcha").value = randString(2);
    }





}