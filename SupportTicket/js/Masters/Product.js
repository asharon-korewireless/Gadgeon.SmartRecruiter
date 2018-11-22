﻿

var ObjProduct = new Product();
var isValidation = 0;
function Product() {



    this.init = function () {

        try {
            this.Show(1);
            this.Clear();
            this.FillDepartmentDropdown();
            this.FillGrid();
        }
        catch (ex) {
            alert(ex + 'Initialize Product')
        }
    };


    this.Clear = function () {

        $('#ProductId').val("");
        $('#ddlDepartment').val(0);
        $("#ddlDepartment").removeClass("validateerror");
        $('#txtProductCode').val("");
        $("#txtProductCode").removeClass("validateerror");
        $('#txtProductName').val("");
        $("#txtProductName").removeClass("validateerror");
        $('#chkActive').prop("checked", true);
        $('#txtProductSortOrder').val("");
        $("#txtProductSortOrder").removeClass("validateerror");
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


            if ($('#ddlDepartment option:selected').val() == '0') {
                $('#ddlDepartment').addClass("validateerror");
                _Error++;
            }
            else {
                $('#ddlDepartment').removeClass("validateerror");
            }

            if ($('#txtProductCode').val().trim() == "") {
                $('#txtProductCode').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtProductCode').removeClass("validateerror");
            }

            if ($('#txtProductName').val().trim() == "") {
                $('#txtProductName').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtProductName').removeClass("validateerror");
            }
            return _Error;
        }

    }

    this.Submit = function () {

        isValidation = 1;
        if (this.Validate() <= 0) {

            ObjProduct.Save();
        }
        else {

            return false;
        }
    };


    this.Save = function () {
        try {
            var ObjBlProduct = {
                MasterID: $('#ProductId').val() == '' ? '0' : $('#ProductId').val(),
                FK_DefaultDepartment: $('#ddlDepartment option:selected').val(),
                ProdCode: $('#txtProductCode').val().trim(),
                ProdName: $('#txtProductName').val().trim(),
                Active: $('#chkActive').is(":checked"),
                SortOrder: $('#txtProductSortOrder').val()
            };

            var DATA = JSON.stringify(ObjBlProduct);
            $.ajax({
                url: api_url + '/Product/UpdateProduct',
                cache: false,
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                data: DATA,
                dataType: 'json',
                success: function (data) {
                    try {
                        if (data.statusCode > 0) {
                            if ($('#ProductId').val() == '' ? '0' : $('#ProductId').val() == 0) {
                                MessageText(data.statusCode, 'Saved Successfully', '#txtProductCode');
                            }
                            else {
                                MessageText(data.statusCode, 'Updated Successfully', '#txtProductCode');
                            }

                            ObjProduct.init();
                        }
                        else {
                            MessageText(data.statusCode, '', '#txtProductCode');
                        }
                    }
                    catch (ex) {
                        alert(ex + 'return issue');
                    }
                },
                error: function (error) {
                    alert(error + ' : UpdateProduct');

                }

            });
        }
        catch (e) {
            alert(e + '   : /Product/UpdateProduct');
        }




    }

    this.FillDepartmentDropdown = function () {
        try {
            $.ajax({
                url: api_url + '/Product/DepartmentDropDownFill',
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
                                optionhtml += '<option value=' + value.ID_Department + '>' + value.DepName + '</option>';
                            });
                        }
                        catch (exx) {
                            alert(exx);
                        }
                    }
                    $('#ddlDepartment').html(optionhtml);
                },

                error: function (xhr, status, error) {
                    var err = eval('(' + xhr.responseText + ')');
                    alert(err.Message);
                }

            });
        }
        catch (ex) {
            alert(ex + ' Exception FillDepartmentDropdown');
        }
    }


    this.FillGrid = function (PageIndex) {

        try {
            $.ajax({
                url: api_url + "/Product/SelectProductAll",
                cache: false,
                type: "GET",
                data: { 'PageIndex': PageIndex, 'SearchItem': $('#txtSearch').val() },
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
                                          "<th style = 'display:none' width  = '10%' >ID_Product</th>" +
                                          "<th style = 'display:none' width  = '10%' >ID_Department</th>" +
                                           "<th width  = '20%' >SlNo</th>" +
                                          "<th width  = '20%' >Code</th>" +
                                          "<th width  = '25%' >Name</th>" +
                                          "</tr>" +
                                      "</thead>";

                            $.each(Mydata, function (key, val) {
                                var htmlActionTd = "<td>" +
                                                   "<a href ='javascript:void(0)' onclick = 'ObjProduct.FillProduct(" + val.ID_Product + ")' class='edit'><i class='glyphicon glyphicon-edit'></i>" + "</a>" +
                                                   "<a href ='javascript:void(0)' onclick = 'ObjProduct.DeleteBranch(" + val.ID_Product + ")' class='remove'><i class='glyphicon glyphicon-trash'></i>" + "</a>" +
                                                   "</td>";
                                html += "<tr>" +

                                            "<td style = 'display:none'>" + val.ID_Product + "</td>" +
                                            "<td style = 'display:none'>" + val.FK_DefaultDepartment + "</td>" +
                                            "<td>" + val.SlNo + "</td>" +
                                            "<td>" + val.ProdCode + "</td>" +
                                            "<td>" + val.ProdName + "</td>" +
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
                                        "<li><a href ='javascript:void(0)' onclick = 'ObjProduct.FillGrid(1)' class= '" + (parseInt(PageIndex) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>First</a></li>" +
                                   "<li><a href ='javascript:void(0)'  onclick = 'ObjProduct.FillGrid(" + (parseInt(i) - parseInt(10)) + ")'   class= '" + (parseInt(i) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>«</a></li>"
                                    while (parseInt(i) <= parseInt(pageCount)) {
                                        html += "<li><a href ='javascript:void(0)' onclick = 'ObjProduct.FillGrid(" + i + ")'  class='" + (parseInt(i) != parseInt(PageIndex) ? "activeAnchor" : "not-activeAnchorSelected") + "'   >" + i + "</a></li>"
                                        if (parseInt(i) % parseInt(10) == 0) {
                                            break;
                                        }
                                        i++;
                                    }
                                    html += "<li><a href ='javascript:void(0)' onclick = 'ObjProduct.FillGrid(" + (parseInt(i) + parseInt(1)) + ")'   class= '" + ((parseInt(pageCount) - parseInt(PageIndex)) > 10 ? "activeAnchor" : "not-activeAnchor") + " ' >»</a></li>"+
                                    "<li><a href ='javascript:void(0)' onclick = 'ObjProduct.FillGrid(" + pageCount + ")'   class= '" + (parseInt(PageIndex) < parseInt(pageCount) ? "activeAnchor" : "not-activeAnchor") + "'>Last</a></li>" +
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


    this.FillProduct = function (ID_Product) {       
        $.ajax({
            url: api_url + "/Product/FillProduct",
            data: { 'ID_Product': ID_Product },
            cache: false,
            type: 'Get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                try {
                    var Mydata = JSON.parse(data);
                    if (Mydata.length > 0) {
                        $.each(Mydata, function (key, value) {
                            var ObjBlProduct = value;
                            $('#ProductId').val(ObjBlProduct.ID_Product);
                            $('#ddlDepartment').val(ObjBlProduct.FK_Department);
                            $('#txtProductCode').val(ObjBlProduct.ProdCode);
                            $('#txtProductName').val(ObjBlProduct.ProdName);
                            if (ObjBlProduct.Active == true) {
                                $('#chkActive').prop("checked", true);
                            }
                            else {
                                $('#chkActive').prop("checked", false);
                            }
                            $('#txtProductSortOrder').val(ObjBlProduct.SortOrder);

                        }
                        )
                    };
                    ObjProduct.Show(2);
                }
                catch (e) {
                    alert(e + 'FillProduct');
                }

            }
        });

    }

    this.DeleteBranch = function (ID_Product) {
        if (confirm('Do you want to delete..?')) {
            $.ajax({
                url: api_url + "/Product/DeleteProduct",
                data: { 'ID_product': ID_Product },
                cache: false,
                type: 'Get',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    if (data.statusCode > 0) {
                        MessageText(data.statusCode, 'Deleted Successfully', '#txtProductCode');
                    }
                    else {
                        MessageText(data.statusCode, '', '#txtProductCode');
                    }
                    ObjProduct.init();


                }
            });
        } 
       

    }
}