﻿var objDepartment = new Department();

function Department() {

    this.init = function () {
        try {
            this.Show(1);
            this.Clear();
            this.FillGrid();
        } catch (ex) {
            alert(ex + 'Initialise Department')

        }
    }
    this.Show = function (id) {

        if (id == 1) {
            $("#AddDepartment").hide();
            $("#ViewDepartment").show();

        }
        else {
            $("#ViewDepartment").hide();
            $("#AddDepartment").show();

        }
    };
    this.Clear = function () {

        $('#hfDepartmentId').val("");
        $('#txtDepartmentCode').val("");
        $("#txtDepartmentCode").removeClass("validateerror");
        $('#txtDepartmentName').val("");
        $("#txtDepartmentName").removeClass("validateerror");
        $('#txtDepartmentSortOrder').val("");
        $("#txtDepartmentSortOrder").removeClass("validateerror");
        $('#chkActive').prop("checked", true);
        isValidation = 0;
    };
    this.Validate = function () {

        if (isValidation == 1) {
            var _Error = 0;
            if ($('#txtDepartmentCode').val().trim() == "") {
                $('#txtDepartmentCode').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtDepartmentCode').removeClass("validateerror");
            }

            if ($('#txtDepartmentName').val().trim() == "") {
                $('#txtDepartmentName').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtDepartmentName').removeClass("validateerror");
            }

            return _Error;
        }

    }
    this.Submit = function () {

        isValidation = 1;
        if (this.Validate() <= 0) {

            objDepartment.Save();
        }
        else {

            return false;
        }
    };
    this.Save = function () {
        try {
            var ObjBlDepartment = {
                MasterID: $('#hfDepartmentId').val() == '' ? '0' : $('#hfDepartmentId').val(),
                DepCode: $('#txtDepartmentCode').val().trim(),
                DepName: $('#txtDepartmentName').val().trim(),
                SortOrder: $('#txtDepartmentSortOrder').val(),
                Active: $('#chkActive').is(":checked"),
            };

            var DATA = JSON.stringify(ObjBlDepartment);
            $.ajax({
                url: api_url + '/Department/UpdateDepartment',
                cache: false,
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                data: DATA,
                dataType: 'json',
                success: function (data) {
                    try {
                        if (data.statusCode > 0) {
                            if ($('#hfDepartmentId').val() == '' ? '0' : $('#hfDepartmentId').val() == 0) {
                                MessageText(data.statusCode, 'Saved Successfully', '#txtDepartmentCode');
                            }
                            else {
                                MessageText(data.statusCode, 'Updated Successfully', '#txtDepartmentCode');
                            }

                            objDepartment.init();
                        }
                        else {
                            MessageText(data.statusCode, '', '#txtDepartmentCode');
                        }
                    }
                    catch (ex) {
                        alert(ex + 'return issue');
                    }
                },
                error: function (error) {
                    alert(error + ' : UpdateDepartment');

                }

            });
        }
        catch (e) {
            alert(e + '   : /Department/UpdateDepartment');
        }
    }
    this.FillDepartment = function (ID_Department) {
        $.ajax({
            url: api_url + "/Department/FillDepartment",
            data: { 'ID_Department': ID_Department },
            cache: false,
            type: 'Get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                try {
                    var Mydata = JSON.parse(data);
                    if (Mydata.length > 0) {
                        $.each(Mydata, function (key, value) {
                            var ObjBlDepartment = value;
                            $('#hfDepartmentId').val(ObjBlDepartment.ID_Department);
                            $('#txtDepartmentCode').val(ObjBlDepartment.DepCode);
                            $('#txtDepartmentName').val(ObjBlDepartment.DepName);
                            $('#txtDepartmentSortOrder').val(ObjBlDepartment.SortOrder);
                            if (ObjBlDepartment.Active == true) {
                                $('#chkActive').prop("checked", true);
                            }
                            else {
                                $('#chkActive').prop("checked", false);
                            }
                        }
                        )
                    };
                    objDepartment.Show(2);
                }
                catch (e) {
                    alert(e + 'FillDepartment');
                }

            }
        });

    }
    this.FillGrid = function (PageIndex) {

        try {
            $.ajax({
                url: api_url + "/Department/SelectDepartmentAll",
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
                                          "<th style = 'display:none' width  = '10%' >ID_Department</th>" +
                                          "<th style = 'display:none' width  = '10%' >ID_Department</th>" +
                                           "<th width  = '20%' >SlNo</th>" +
                                          "<th width  = '20%' >Code</th>" +
                                          "<th width  = '25%' >Name</th>" +
                                          "<th width  = '15%' >SortOrder</th>" +
                                          "</tr>" +
                                      "</thead>";

                            $.each(Mydata, function (key, val) {
                                var htmlActionTd = "<td>" +
                                                   "<a href ='javascript:void(0)' onclick = 'objDepartment.FillDepartment(" + val.ID_Department + ")' class='edit'><i class='glyphicon glyphicon-edit'></i>" + "</a>" +
                                                   "<a href ='javascript:void(0)' onclick = 'objDepartment.DeleteDepartment(" + val.ID_Department + ")' class='remove'><i class='glyphicon glyphicon-trash'></i>" + "</a>" +
                                                   "</td>";
                                html += "<tr>" +

                                            "<td style = 'display:none'>" + val.ID_Department + "</td>" +
                                            "<td>" + val.SlNo + "</td>" +
                                            "<td>" + val.DepCode + "</td>" +
                                            "<td>" + val.DepName + "</td>" +
                                            "<td>" + val.SortOrder + "</td>" +
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
                                        "<li><a href ='javascript:void(0)' onclick = 'objDepartment.FillGrid(1)' class= '" + (parseInt(PageIndex) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>First</a></li>" +
                                   "<li><a href ='javascript:void(0)'  onclick = 'objDepartment.FillGrid(" + (parseInt(i) - parseInt(10)) + ")'   class= '" + (parseInt(i) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>«</a></li>"
                                    while (parseInt(i) <= parseInt(pageCount)) {
                                        html += "<li><a href ='javascript:void(0)' onclick = 'objDepartment.FillGrid(" + i + ")'  class='" + (parseInt(i) != parseInt(PageIndex) ? "activeAnchor" : "not-activeAnchorSelected") + "'   >" + i + "</a></li>"
                                        if (parseInt(i) % parseInt(10) == 0) {
                                            break;
                                        }
                                        i++;
                                    }
                                    html += "<li><a href ='javascript:void(0)' onclick = 'objDepartment.FillGrid(" + (parseInt(i) + parseInt(1)) + ")'   class= '" + ((parseInt(pageCount) - parseInt(PageIndex)) > 10 ? "activeAnchor" : "not-activeAnchor") + " ' >»</a></li>" +
                                    "<li><a href ='javascript:void(0)' onclick = 'objDepartment.FillGrid(" + pageCount + ")'   class= '" + (parseInt(PageIndex) < parseInt(pageCount) ? "activeAnchor" : "not-activeAnchor") + "'>Last</a></li>" +
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
    this.DeleteDepartment = function (ID_Department) {
        if (confirm('Do you want to delete..?')) {
            $.ajax({
                url: api_url + "/Department/DeleteDepartment",
                data: { 'ID_Department': ID_Department },
                cache: false,
                type: 'Get',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    if (data.statusCode > 0) {
                        MessageText(data.statusCode, 'Deleted Successfully', '#txtDepartmentCode');
                    }
                    else {
                        MessageText(data.statusCode, '', '#txtDepartmentCode');
                    }
                    objDepartment.init();


                }
            });
        }


    }
}