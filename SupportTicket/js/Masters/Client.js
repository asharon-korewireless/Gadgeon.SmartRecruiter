﻿var objClient = new Client();

function Client() {

    this.init = function () {
        try {
            this.Show(1);
            this.Clear();
            this.FillGrid();
            this.FillResellerDropdown();
            this.FillSubscriptionPlanDropdown();
           this.FillProductsMultipleDropdown();

        } catch (ex) {
            alert(ex + 'Initialise Client')

        }
    }
    this.Show = function (id) {

        if (id == 1) {
            $("#AddClient").hide();
            $("#ViewClient").show();

        }
        else {
            $("#ViewClient").hide();
            $("#AddClient").show();

        }
    };
    this.Clear = function () {

        $('#hfClientId').val("");
        $('#txtClientCode').val("");
        $("#txtClientCode").removeClass("validateerror");
        $('#txtClientShortName').val("");
        $("#txtClientShortName").removeClass("validateerror");
        $('#txtClientName').val("");
        $("#txtClientName").removeClass("validateerror");
        $('#txtAddress1').val("");
        $("#txtAddress1").removeClass("validateerror");
        $('#txtAddress2').val("");
        $("#txtAddress2").removeClass("validateerror");
        $('#txtAddress3').val("");
        $("#txtAddress3").removeClass("validateerror");
        $('#txtEmail').val("");
        $("#txtEmail").removeClass("validateerror");
        $('#txtMobile').val("");
        $("#txtMobile").removeClass("validateerror");
        $('#txtPhone').val("");
        $("#txtPhone").removeClass("validateerror");
        $('#ddlReseller').val("0");
        $('#ddlSubscriptionPlan').val("0");
        $('#ddlProducts').val("0");
        $('#txtClientSortOrder').val("");
        $("#txtClientSortOrder").removeClass("validateerror");      
        $('#chkActive').prop("checked", true);

        //var $Multi = $("#ddlProduct.form-control").select2();
        //$Multi.val(null).trigger("change");

        var $Multi = $("#ddlProduct.form-control").select2();
        $Multi.val('').trigger("change");

        isValidation = 0;
    };
    this.Validate = function () {
        if (isValidation == 1) {
            var _Error = 0;
            if ($('#txtClientCode').val().trim() == "") {
                $('#txtClientCode').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtClientCode').removeClass("validateerror");
            }
            if ($('#txtClientShortName').val().trim() == "") {
                $('#txtClientShortName').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtClientShortName').removeClass("validateerror");
            }
            if ($('#txtClientName').val().trim() == "") {
                $('#txtClientName').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtClientName').removeClass("validateerror");
            }
            if ($('#txtAddress1').val().trim() == "") {
                $('#txtAddress1').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtAddress1').removeClass("validateerror");
            }
            if ($('#txtAddress2').val().trim() == "") {
                $('#txtAddress2').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtAddress2').removeClass("validateerror");
            }
            if ($('#txtAddress3').val().trim() == "") {
                $('#txtAddress3').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtAddress3').removeClass("validateerror");
            }
            if ($('#txtEmail').val() == "" || CheckEmailSubmit('txtEmail')) {
                $('#txtEmail').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtEmail').removeClass("validateerror");
            }
            if ($('#txtMobile').val() == "" || CheckMobileNumberSubmit('txtMobile')) {
                $('#txtMobile').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtMobile').removeClass("validateerror");
            }
            if ($('#txtPhone').val() == "" || CheckMobileNumberSubmit('txtPhone')) {
                $('#txtPhone').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtPhone').removeClass("validateerror");
            }

            if ($('#ddlSubscriptionPlan option:selected').val() == '0') {
                $('#ddlSubscriptionPlan').addClass("validateerror");
                _Error++;
            }
            else {
                $('#ddlSubscriptionPlan').removeClass("validateerror");
            }


            //if ($('#ddlProducts option:selected').val() == '0') {
            //    $('#ddlProducts').addClass("validateerror");
            //    _Error++;
            //}
            //else {
            //    $('#ddlProducts').removeClass("validateerror");
            //}

            return _Error;
        }

    }
    this.Submit = function () {
        isValidation = 1;       
        if (this.Validate() <= 0) {

            objClient.Save();
        }
        else {

            return false;
        }
    };
    this.Save = function () {
        try {
            var e = document.getElementById("ddlProduct");
            var str = "";
            if (e.selectedOptions.length > 0) {
                for (var i = 0; i < e.selectedOptions.length; i++) {
                    str += "<root><Product>";
                    str += "<ID_Product>";
                    str += e.selectedOptions[i].value;
                    str += "</ID_Product>";
                    str += "</Product></root>";
                }
            }
            else {
                MessageText("-20", 'Select a Product', '#ddlProduct');
                return;
            }

            var blClient = {
                MasterID: $('#hfClientId').val() == '' ? '0' : $('#hfClientId').val(),
                CliCode: $('#txtClientCode').val().trim(),
                CliShortName: $('#txtClientShortName').val().trim(),
                CliName: $('#txtClientName').val().trim(),
                CliAddress1: $('#txtAddress1').val().trim(),
                CliAddress2: $('#txtAddress2').val().trim(),
                CliAddress3: $('#txtAddress3').val().trim(),
                CliEmail: $('#txtEmail').val(),
                CliMob: $('#txtMobile').val(),
                CliPhone: $('#txtPhone').val(),
                FK_Reseller: $('#ddlReseller option:selected').val(),
                FK_SubscriptionPlan: $('#ddlSubscriptionPlan option:selected').val(),
                SortOrder: $('#txtClientSortOrder').val(),
                XMLProduct: str,
                Active: $('#chkActive').is(":checked")
            };
            var DATA = JSON.stringify(blClient);
            $.ajax({
                url: api_url + '/Client/UpdateClient',
                cache: false,
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                data: DATA,
                dataType: 'json',
                success: function (data) {
                    try {
                        if (data.statusCode > 0) {
                            if ($('#hfClientId').val() == '' ? '0' : $('#hfClientId').val() == 0) {
                                MessageText(data.statusCode, 'Saved Successfully', '#txtClientCode');
                            }
                            else {
                                MessageText(data.statusCode, 'Updated Successfully', '#txtClientCode');
                            }

                            objClient.init();
                        }
                        else {
                            MessageText(data.statusCode, '', '#txtClientCode');
                        }
                    }
                    catch (ex) {
                        alert(ex + 'return issue');
                    }
                }
                 ,

                error: function (request, status, error) {
                    alert(error + ' : UpdateClient');

                }

            });
        }
        catch (e) {
            alert(e + '   : /Client/UpdateClient');
        }
    };
    this.FillClient = function (ID_Client) {
        $.ajax({
            url: api_url + "/Client/FillClient",
            data: { 'ID_Client': ID_Client },
            cache: false,
            type: 'Get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                try {
                    var Mydata = JSON.parse(data.table);
                    if (Mydata.length > 0) {
                        $.each(Mydata, function (key, value) {
                            var ObjBlclient = value;
                            $('#hfClientId').val(ObjBlclient.ID_Client);
                            $('#txtClientCode').val(ObjBlclient.CliCode);
                            $('#txtClientShortName').val(ObjBlclient.CliShortName);
                            $('#txtClientName').val(ObjBlclient.CliName);
                            $('#txtAddress1').val(ObjBlclient.CliAddress1);
                            $('#txtAddress2').val(ObjBlclient.CliAddress2);
                            $('#txtAddress3').val(ObjBlclient.CliAddress3);
                            $('#txtEmail').val(ObjBlclient.CliEmail);
                            $('#txtMobile').val(ObjBlclient.CliMob);
                            $('#txtPhone').val(ObjBlclient.CliPhone);
                            $('#txtClientSortOrder').val(ObjBlclient.SortOrder);
                            $('#ddlReseller').val(ObjBlclient.FK_Reseller);
                            $('#ddlSubscriptionPlan').val(ObjBlclient.FK_SubscriptionPlan);
                            if (ObjBlclient.Active == true) {
                                $('#chkActive').prop("checked", true);
                            }
                            else {
                                $('#chkActive').prop("checked", false);
                            }
                        }
                        )

                        var MyProduct = JSON.parse(data.table1);
                        var options = '';
                        var arraytest = [];
                        if (MyProduct.length > 0) {
                            var i = 0;
                            $.each(MyProduct, function (key, value) {
                                arraytest[i] = value.FK_Product;
                                i++;
                            }
                            )
                        }
                        var $Multi = $("#ddlProduct.form-control").select2();
                        $Multi.val(arraytest).trigger("change");

                    };
                    objClient.Show(2);
                }
                catch (e) {
                    alert(e + 'FillClient');
                }

            }
        });

    };
    this.FillGrid = function (PageIndex) {

        try {
            $.ajax({
                url: api_url + "/Client/SelectClientAll",
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
                                          "<th style = 'display:none' width  = '10%' >ID_Client</th>" +
                                          "<th style = 'display:none' width  = '10%' >ID_Client</th>" +
                                           "<th width  = '5%' >SlNo</th>" +
                                          "<th width  = '15%' >Code</th>" +
                                          "<th width  = '20%' >ShortName</th>" +
                                          "<th width  = '25%' >Name</th>" +
                                          "<th width  = '15%' >Reseller</th>" +
                                          "</tr>" +
                                      "</thead>";

                            $.each(Mydata, function (key, val) {
                                var htmlActionTd = "<td>" +
                                                   "<a href ='javascript:void(0)' onclick = 'objClient.FillClient(" + val.ID_Client + ")' class='edit'><i class='glyphicon glyphicon-edit'></i>" + "</a>" +
                                                   "<a href ='javascript:void(0)' onclick = 'objClient.DeleteClient(" + val.ID_Client + ")' class='remove'><i class='glyphicon glyphicon-trash'></i>" + "</a>" +
                                                   "</td>";
                                html += "<tr>" +

                                            "<td style = 'display:none'>" + val.ID_Client + "</td>" +
                                            "<td>" + val.SlNo + "</td>" +
                                            "<td>" + val.CliCode + "</td>" +
                                            "<td>" + val.CliShortName + "</td>" +
                                            "<td>" + val.CliName + "</td>" +
                                            "<td>" + val.Reseller + "</td>" +
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
                                        "<li><a href ='javascript:void(0)' onclick = 'objClient.FillGrid(1)' class= '" + (parseInt(PageIndex) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>First</a></li>" +
                                   "<li><a href ='javascript:void(0)'  onclick = 'objClient.FillGrid(" + (parseInt(i) - parseInt(10)) + ")'   class= '" + (parseInt(i) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>«</a></li>"
                                    while (parseInt(i) <= parseInt(pageCount)) {
                                        html += "<li><a href ='javascript:void(0)' onclick = 'objClient.FillGrid(" + i + ")'  class='" + (parseInt(i) != parseInt(PageIndex) ? "activeAnchor" : "not-activeAnchorSelected") + "'   >" + i + "</a></li>"
                                        if (parseInt(i) % parseInt(10) == 0) {
                                            break;
                                        }
                                        i++;
                                    }
                                    html += "<li><a href ='javascript:void(0)' onclick = 'objClient.FillGrid(" + (parseInt(i) + parseInt(1)) + ")'   class= '" + ((parseInt(pageCount) - parseInt(PageIndex)) > 10 ? "activeAnchor" : "not-activeAnchor") + " ' >»</a></li>" +
                                    "<li><a href ='javascript:void(0)' onclick = 'objClient.FillGrid(" + pageCount + ")'   class= '" + (parseInt(PageIndex) < parseInt(pageCount) ? "activeAnchor" : "not-activeAnchor") + "'>Last</a></li>" +
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
    };
    this.FillResellerDropdown = function () {
        try {
            $.ajax({
                url: api_url + '/Client/ResellerDropDownFill',
                cache: false,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    var Mydata = JSON.parse(data);
                    var optionhtml = '<option value=' + 0 + '>Select</option>';
                    if (Mydata.length > 0) {
                        try {
                            $.each(Mydata, function (i, value) {
                                optionhtml += '<option value=' + value.ID_Reseller + '>' + value.ResName + '</option>';
                            });
                        }
                        catch (exx) {
                            alert(exx);
                        }
                    }
                    $('#ddlReseller').html(optionhtml);
                },

                error: function (xhr, status, error) {
                    var err = eval('(' + xhr.responseText + ')');
                    alert(err.Message);
                }

            });
        }
        catch (ex) {
            alert(ex + ' Exception FillResellerDropdown');
        }
    };
    
    this.FillSubscriptionPlanDropdown = function () {
        try {
            $.ajax({
                url: api_url + '/Client/SubscriptionPlanDropDownFill',
                cache: false,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    var Mydata = JSON.parse(data);
                    var optionhtml = '<option value=' + 0 + '>Select</option>';
                    if (Mydata.length > 0) {
                        try {
                            $.each(Mydata, function (i, value) {
                                optionhtml += '<option value=' + value.ID_SubscriptionPlan + '>' + value.SPName + '</option>';
                            });
                        }
                        catch (exx) {
                            alert(exx);
                        }
                    }
                    $('#ddlSubscriptionPlan').html(optionhtml);
                },

                error: function (xhr, status, error) {
                    var err = eval('(' + xhr.responseText + ')');
                    alert(err.Message);
                }

            });
        }
        catch (ex) {
            alert(ex + ' Exception FillSubscriptionPlanDropdown');
        }
    };


    this.FillProductsMultipleDropdown = function () {
        try {
            $.ajax({

                url: api_url + '/Client/ProductsDropDownFill',
                cache: false,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    var Mydata = JSON.parse(data);
                    if (Mydata.length > 0) {
                        var optionhtml = '<option value=' + 0 + ' disabled>Select</option>';
                        try {
                            $.each(Mydata, function (i, value) {
                                optionhtml += '<option value=' + value.ID_Product + '>' + value.ProdName + '</option>';
                            });
                        }
                        catch (exx) {
                            alert(exx);
                        }
                    }
                    $('#ddlProduct').html(optionhtml);
                },

                error: function (xhr, status, error) {
                    var err = eval('(' + xhr.responseText + ')');
                    alert(err.Message);
                }

            });
        }
        catch (ex) {
            alert(ex + ' Exception FillProductsDropdown');
        }
    };



    this.FillProductsDropdown = function () {
        try {
            $.ajax({

                url: api_url + '/Client/ProductsDropDownFill',
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
                                optionhtml += '<option value=' + value.ID_Product + '>' + value.ProdName + '</option>';
                            });
                        }
                        catch (exx) {
                            alert(exx);
                        }
                    }
                    //   $('#ddlProducts').html(optionhtml);
                },

                error: function (xhr, status, error) {
                    var err = eval('(' + xhr.responseText + ')');
                    alert(err.Message);
                }

            });
        }
        catch (ex) {
            alert(ex + ' Exception FillProductsDropdown');
        }
    };




    this.DeleteClient = function (ID_Client) {
        if (confirm('Do you want to delete..?')) {
            $.ajax({
                url: api_url + "/Client/DeleteClient",
                data: { 'ID_Client': ID_Client },
                cache: false,
                type: 'Get',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    if (data.statusCode > 0) {
                        MessageText(data.statusCode, 'Deleted Successfully', '#txtClientCode');
                    }
                    else {
                        MessageText(data.statusCode, '', '#txtClientCode');
                    }
                    objClient.init();


                }
            });
        }


    };
}