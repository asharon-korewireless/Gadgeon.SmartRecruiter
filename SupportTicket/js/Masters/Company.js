﻿

var ObjCompany = new Company();
var isValidation = 0;
function Company() {



    this.init = function () {

        try {         
            this.Show(1);
            this.Clear();           
            this.FillGrid();
        }
        catch (ex) {
            alert(ex + 'Initialize Company')
        }
    };


    this.Clear = function () {

        $('#CompanyId').val("");       
        $('#txtCompanyCode').val("");
        $("#txtCompanyCode").removeClass("validateerror");
        $('#txtCompanyName').val("");
        $("#txtCompanyName").removeClass("validateerror");
        $('#txtCompanyAddr1').val("");
        $("#txtCompanyAddr1").removeClass("validateerror");
        $('#txtCompanyAddr2').val("");
        $("#txtCompanyAddr2").removeClass("validateerror");
        $('#txtCompanyAddr3').val("");
        $("#txtCompanyAddr3").removeClass("validateerror");
        $('#txtCompanyEmail').val("");
        $("#txtCompanyEmail").removeClass("validateerror");
        $('#txtCompanyMob').val("");
        $("#txtCompanyMob").removeClass("validateerror");
        $('#chkActive').prop("checked", true);
        $('#txtCompanyPhone').val("");
        $("#txtCompanyPhone").removeClass("validateerror");
        $('#txtSortOrder').val("");
        $("#txtSortOrder").removeClass("validateerror");
        isValidation = 0;


    };


    this.Show = function (id) {

        if (id == 1) {
            $("#AddBranch").hide();
            $("#ViewBranch").show();

        }
        else {
            $("#ViewBranch").hide();
            $("#AddBranch").show();

        }
    };
    this.Validate = function () {

        if (isValidation == 1) {
            var _Error = 0;
            if ($('#txtCompanyCode').val().trim() == "") {
                $('#txtCompanyCode').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtCompanyCode').removeClass("validateerror");
            }

            if ($('#txtCompanyName').val().trim() == "") {
                $('#txtCompanyName').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtCompanyName').removeClass("validateerror");
            }           
            if ($('#txtCompanyMob').val() == "" || CheckMobileNumberSubmit('txtCompanyMob')) {
                $('#txtCompanyMob').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtCompanyMob').removeClass("validateerror");
            }
            if ($('#txtCompanyEmail').val() == "" || CheckEmailSubmit('txtCompanyEmail')) {
                $('#txtCompanyEmail').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtCompanyEmail').removeClass("validateerror");
            }           
            if ($('#txtCompanyPhone').val() == "" || CheckMobileNumberSubmit('txtCompanyPhone')) {
                $('#txtCompanyPhone').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtCompanyPhone').removeClass("validateerror");
            }

            return _Error;
        }

    }

    this.Submit = function () {
        isValidation = 1;
        if (this.Validate() <= 0) {
            ObjCompany.Save();
        }
        else {

            return false;
        }
    };


    this.Save = function () {
        try {
            var ObjBlCompany = {
                MasterID: $('#CompanyId').val() == '' ? '0' : $('#CompanyId').val(),             
                CompanyCode: $('#txtCompanyCode').val().trim(),
                CompanyName: $('#txtCompanyName').val().trim(),
                CompanyAddr1: $('#txtCompanyAddr1').val() == null ? '' : $('#txtCompanyAddr1').val(),
                CompanyAddr2: $('#txtCompanyAddr2').val(),
                CompanyAddr3: $('#txtCompanyAddr3').val(),
                CompanyMob  : $('#txtCompanyMob').val(),
                CompanyPhone: $('#txtCompanyPhone').val(),
                CompanyEmail: $('#txtCompanyEmail').val(),
                SortOrder: $('#txtSortOrder').val(),
                Active: $('#chkActive').is(":checked")
            };

            var DATA = JSON.stringify(ObjBlCompany);
            $.ajax({
                url: api_url + '/Company/UpdateCompany',
                cache: false,
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                data: DATA,
                dataType: 'json',
                success: function (data) {                    
                try {
                    if (data.statusCode > 0) {
                        if ($('#CompanyId').val() == '' ? '0' : $('#CompanyId').val() == 0) {
                            MessageText(data.statusCode, 'Saved Successfully', '#txtCompanyCode');
                        }
                        else {
                            MessageText(data.statusCode, 'Updated Successfully', '#txtCompanyCode');
                        }
                        ObjCompany.init();
                    }
                    else {
                        MessageText(data.statusCode, '', '#txtCompanyCode');
                    }
                }
                catch (ex) {
                    alert(ex + 'return issue');
                }
                },
                error: function (error) {
                    alert(error + ' : UpdateCompany');

                }

            });
        }
        catch (e) {
            alert(e + '   : /Company/UpdateCompany');
        }




    }
    this.FillGrid = function (PageIndex) {

        try {
            $.ajax({
                url: api_url + "/Company/SelectCompanyAll",
                cache: false,
                type: "GET",
                data: { 'PageIndex': PageIndex ,'SearchItem': $('#txtSearch').val() },
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    try
                    {
                        var Mydata = JSON.parse(data);
                        var RecordCount = "0";
                        var html = "";
                        if (Mydata.length > 0) {

                            html += "<table width = '100%' id='example1' class='table table-bordered table-striped'>" +
                                      "<thead background-color='rgb(60, 141, 188)'>" +
                                          "<tr>" +
                                          "<th style = 'display:none' width  = '10%' >ID_Company</th>" +                                       
                                           "<th width  = '20%' >SlNo</th>" +
                                          "<th width  = '15%' >Code</th>" +
                                          "<th width  = '25%' >Name</th>" +
                                          "<th width  = '20%' >Email</th>" +
                                          "</tr>" +
                                      "</thead>";

                            $.each(Mydata, function (key, val) {
                                var htmlActionTd = "<td>" +
                                                   "<a href ='javascript:void(0)' onclick = 'ObjCompany.FillCompany(" + val.ID_Company + ")' class='edit'><i class='glyphicon glyphicon-edit'></i>" + "</a>" +
                                                   "<a href ='javascript:void(0)' onclick = 'ObjCompany.DeleteBranch(" + val.ID_Company + ")' class='remove'><i class='glyphicon glyphicon-trash'></i>" + "</a>" +
                                                   "</td>";
                                html += "<tr>" +

                                            "<td style = 'display:none'>" + val.ID_Company + "</td>" +                                           
                                            "<td>" + val.SlNo + "</td>" +
                                            "<td>" + val.CompanyCode + "</td>" +
                                            "<td>" + val.CompanyName + "</td>" +                                                                                      
                                            "<td>" + val.CompanyEmail + "</td>" +
                                            htmlActionTd +
                                            "</tr>";
                                RecordCount = val.RecordCount;

                            });
                          
                            try   //Page Indexing Starts here
                            {
                                var temppagecount = parseInt(RecordCount) / 10
                               
                                var pageCount = parseInt(Math.ceil(parseFloat(temppagecount)))
                                if (!PageIndex)
                                {
                                    PageIndex = 1;
                                }
                              
                                var i;
                              
                                if (parseInt(PageIndex) <= 10)
                                {
                                    i = 1;
                                }
                                else
                                {
                                   
                                    i = PageIndex;                                  
                                    var j = parseInt(i) % 10;                                   
                                    if (parseInt(j) == parseInt(0))
                                    {
                                        i = parseInt(i) - parseInt(9);                                      
                                    }
                                    else
                                    {
                                        i = (parseInt(i) - parseInt(j) + parseInt(1));                                       
                                    }
                                   
                                }
                              
                                if (parseInt(pageCount) > 0)
                                {                                   
                                    html += "</table><div class='box-footer clearfix'><ul class='pagination pagination-sm no-margin pull-right'>" +
                                        "<li><a href ='javascript:void(0)' onclick = 'ObjCompany.FillGrid(1)' class= '" + (parseInt(PageIndex) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>First</a></li>" +
                                   "<li><a href ='javascript:void(0)'  onclick = 'ObjCompany.FillGrid(" + (parseInt(i) - parseInt(10)) + ")'   class= '" + (parseInt(i) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>«</a></li>"
                                    while (parseInt(i) <= parseInt(pageCount)) {
                                        html += "<li><a href ='javascript:void(0)' onclick = 'ObjCompany.FillGrid(" + i + ")'  class='" + (parseInt(i) != parseInt(PageIndex) ? "activeAnchor" : "not-activeAnchorSelected") + "'   >" + i + "</a></li>"
                                        if (parseInt(i) % parseInt(10) == 0) {
                                            break;
                                        }
                                        i++;
                                    }
                                    html += "<li><a href ='javascript:void(0)' onclick = 'ObjCompany.FillGrid(" + (parseInt(i) + parseInt(1)) + ")'   class= '" + ((parseInt(pageCount) - parseInt(PageIndex)) > 10 ? "activeAnchor" : "not-activeAnchor") + " ' >»</a></li>"+
                                    "<li><a href ='javascript:void(0)' onclick = 'ObjCompany.FillGrid(" + pageCount + ")'   class= '" + (parseInt(PageIndex) < parseInt(pageCount) ? "activeAnchor" : "not-activeAnchor") + "'>Last</a></li>" +
                                   "</ul></div>";

                                }
                            }   //Page Indexing Starts here
                            catch (er)
                            {
                                alert(er + 'Page Indexing');
                            }                          
                        }
                        $("#Grid").html(html);
                    }
                    catch (ex)
                    {
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


    this.FillCompany = function (ID_Company) {       
        $.ajax({
            url: api_url + "/Company/FillCompany",
            data: { 'ID_Company': ID_Company },
            cache: false,
            type: 'Get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                try {
                    var Mydata = JSON.parse(data);
                    if (Mydata.length > 0) {
                        $.each(Mydata, function (key, value) {
                            var ObjBlCompany = value;
                            $('#CompanyId').val(ObjBlCompany.ID_Company);                           
                            $('#txtCompanyCode').val(ObjBlCompany.CompanyCode);
                            $('#txtCompanyName').val(ObjBlCompany.CompanyName);
                            $('#txtCompanyAddr1').val(ObjBlCompany.CompanyAddr1);
                            $('#txtCompanyAddr2').val(ObjBlCompany.CompanyAddr2);
                            $('#txtCompanyAddr3').val(ObjBlCompany.CompanyAddr3);
                            $('#txtCompanyEmail').val(ObjBlCompany.CompanyEmail);
                            $('#txtCompanyMob').val(ObjBlCompany.CompanyMob);
                            $('#txtCompanyPhone').val(ObjBlCompany.CompanyPhone);
                            $('#txtSortOrder').val(ObjBlCompany.SortOrder);
                            if (ObjBlCompany.Active == true) {
                                $('#chkActive').prop("checked", true);
                            }
                            else {
                                $('#chkActive').prop("checked", false);
                            }
                        }
                        )
                    };
                    ObjCompany.Show(2);
                }
                catch (e) {
                    alert(e + 'FillCompany');
                }

            }
        });

    }

    this.DeleteBranch = function (ID_Company) {
        if (confirm('Do you want to delete..?')) {
            $.ajax({
                url: api_url + "/Company/DeleteCompany",
                data: { 'ID_Company': ID_Company },
                cache: false,
                type: 'Get',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {                                     
                    if (data.statusCode > 0) {
                        MessageText(data.statusCode, 'Deleted Successfully', '#txtCompanyCode');
                    }
                    else {
                        MessageText(data.statusCode, '', '#txtCompanyCode');
                    }
                    ObjCompany.init();


                }
            });
        } 
       

    }
}