﻿

function MessageText(ReturnCode, Field, FocusControl) {
    try
    {       
        if (ReturnCode > 0) {
            ReturnCode = "1";           
        } 
        $.getScript('../Scripts/jquery.toastmessage.js', function () {
            switch (ReturnCode) {
                case "1":
                    $().toastmessage('showSuccessToast', Field);
                  
                    $(FocusControl).focus();
                    break;           
                case "-1":              
                    $().toastmessage('showErrorToast', Field + 'Transaction Failed...!');
                    $(FocusControl).focus();
                    break;
                case "-2":                                                                         
                    $().toastmessage('showWarningToast', Field + 'Already Exist..');
                    $(FocusControl).focus();
                    break;
                case "-3":
                    $().toastmessage('showWarningToast', Field + 'Reference Exist..');
                    $(FocusControl).focus();
                    break;
                case "-11":               
                    $().toastmessage('showWarningToast', Field + '"Can not Insert, No Access Permission, Please Verify"');
                    $(FocusControl).focus();
                    break;
                case "-12":
                    $().toastmessage('showWarningToast', Field + 'Can not Update, No Access Permission, Please Verify');
                    $(FocusControl).focus();
                    break;
                case "-13":
                    $().toastmessage('showWarningToast', Field + 'Can not Delete, No Access Permission, Please Verify');
                    $(FocusControl).focus();
                    break;
                case "-14":               
                    $().toastmessage('showWarningToast', Field + 'You dont have the permission');
                    $(FocusControl).focus();
                    break;
                case "-20":                   
                    $().toastmessage('showWarningToast', Field + '');
                    $(FocusControl).focus();
                    break;
                case "-21":
                    $().toastmessage('showWarningToast', Field + 'Old Password does not match');
                    $(FocusControl).focus();
                    break;
                case "-22":
                    $().toastmessage('showWarningToast', Field + 'Mismatch in password');
                    $(FocusControl).focus();
                    break;
                case "-23":
                    $().toastmessage('showWarningToast', Field + 'Criteria in password does not match:Contains 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character ');
                    $(FocusControl).focus();
                    break;
                case "-24":
                    $().toastmessage('showWarningToast', Field + 'User Limit Reached');
                    $(FocusControl).focus();
                    break;
                case "-26":
                    $().toastmessage('showWarningToast', Field + 'Agent Limit Reached');
                    $(FocusControl).focus();
                    break;
                case "-27":
                    $().toastmessage('showWarningToast', Field + 'Ticket Number Already Exist');
                    $(FocusControl).focus();
                    break;
                case "-31":
                    $().toastmessage('showWarningToast', Field + 'Settings Changed');
                    $(FocusControl).focus();
                    break;
                case "-32":
                    $().toastmessage('showWarningToast',Field +'Please Upload Proper Image');
                    //$(FocusControl).focus();
                    break;
                case "-33":
                    $().toastmessage('showWarningToast', Field + 'Uploaded file format not Supported..!');
                    //$(FocusControl).focus();
                    break;
                case "-34":
                    $().toastmessage('showWarningToast', Field + 'Select atleast Ticket..!');
                    //$(FocusControl).focus();
                    break;
                case "-35":
                    $().toastmessage('showWarningToast', Field + 'FileSize Limit Reached.. Total file size should less than 64mb!');
                    //$(FocusControl).focus();
                    break;
                case "-36":
                    $().toastmessage('showWarningToast', Field + 'Username and password does not match..!');
                    //$(FocusControl).focus();
                    break;
            }
        });
    }
    catch (ex)
    {
        alert(ex);
    }
};

