﻿

var ObjWorkFlow = new WorkFlow();
var isValidation = 0;
function WorkFlow() {



    this.init = function () {

        try {
            this.Show(1);
            this.Clear();
            // this.FillDepartmentDropdown();
            this.FillGrid();
        }
        catch (ex) {
            alert(ex + 'Initialize WorkFlow')
        }
    };


    this.Clear = function () {

        $('#WorkFlowId').val("");
        $('#ddlDepartment').val(0);
        $("#ddlDepartment").removeClass("validateerror");
        $('#txtWorkFlowCode').val("");
        $("#txtWorkFlowCode").removeClass("validateerror");
        $('#txtWorkFlowName').val("");
        $("#txtWorkFlowName").removeClass("validateerror");
        $('#txtWorkFlowSortOrder').val("");
        $("#txtWorkFlowSortOrder").removeClass("validateerror");
        $('#chkActive').prop("checked", true);
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


            if ($('#txtWorkFlowCode').val().trim() == "") {
                $('#txtWorkFlowCode').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtWorkFlowCode').removeClass("validateerror");
            }

            if ($('#txtWorkFlowName').val().trim() == "") {
                $('#txtWorkFlowName').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtWorkFlowName').removeClass("validateerror");
            }

            //if ($('#txtWorkFlowSortOrder').val() == "") {
            //    $('#txtWorkFlowSortOrder').addClass("validateerror");
            //    _Error++;
            //}
            //else {
            //    $('#txtWorkFlowSortOrder').removeClass("validateerror");
            //}

            return _Error;
        }

    }

    this.Submit = function () {

        isValidation = 1;
        if (this.Validate() <= 0) {

            ObjWorkFlow.Save();
        }
        else {

            return false;
        }
    };


    this.Save = function () {
        try {
            var ObjBlWorkFlow = {
                MasterID: $('#WorkFlowId').val() == '' ? '0' : $('#WorkFlowId').val(),
                WorkFlowCode: $('#txtWorkFlowCode').val().trim(),
                WorkFlowName: $('#txtWorkFlowName').val().trim(),
                SortOrder: $('#txtWorkFlowSortOrder').val(),
                Active: $('#chkActive').is(":checked")

            };

            var DATA = JSON.stringify(ObjBlWorkFlow);
            $.ajax({
                url: api_url + '/WorkFlow/UpdateWorkFlow',
                cache: false,
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                data: DATA,
                dataType: 'json',
                success: function (data) {
                    try {
                        if (data.statusCode > 0) {
                            if ($('#WorkFlowId').val() == '' ? '0' : $('#WorkFlowId').val() == 0) {
                                MessageText(data.statusCode, 'Saved Successfully', '#txtWorkFlowCode');
                            }
                            else {
                                MessageText(data.statusCode, 'Updated Successfully', '#txtWorkFlowCode');
                            }

                            ObjWorkFlow.init();
                        }
                        else {
                            MessageText(data.statusCode, '', '#txtWorkFlowCode');
                        }
                    }
                    catch (ex) {
                        alert(ex + 'return issue');
                    }
                },
                error: function (error) {
                    alert(error + ' : UpdateWorkFlow');

                }

            });
        }
        catch (e) {
            alert(e + '   : /WorkFlow/UpdateWorkFlow');
        }




    }


    this.FillGrid = function (PageIndex) {

        try {
            $.ajax({
                url: api_url + "/WorkFlow/SelectWorkFlowAll",
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
                                          "<th style = 'display:none' width  = '10%' >ID_WorkFlow</th>" +
                                          //"<th style = 'display:none' width  = '10%' >ID_Department</th>" +
                                           "<th width  = '20%' >SlNo</th>" +
                                          "<th width  = '20%' >Code</th>" +
                                          "<th width  = '25%' >Name</th>" +
                                          "<th width  = '15%' >SortOrder</th>" +
                                          "</tr>" +
                                      "</thead>";

                            $.each(Mydata, function (key, val) {
                                var htmlActionTd = "<td>" +
                                                   "<a href ='javascript:void(0)' onclick = 'ObjWorkFlow.FillWorkFlow(" + val.ID_WorkFlow + ")' class='edit'><i class='glyphicon glyphicon-edit'></i>" + "</a>" +
                                                   "<a href ='javascript:void(0)' onclick = 'ObjWorkFlow.DeleteWorkFlow(" + val.ID_WorkFlow + ")' class='remove'><i class='glyphicon glyphicon-trash'></i>" + "</a>" +
                                                   "</td>";
                                html += "<tr>" +

                                            "<td style = 'display:none'>" + val.ID_WorkFlow + "</td>" +
                                            //"<td style = 'display:none'>" + val.FK_DefaultDepartment + "</td>" +
                                            "<td>" + val.SlNo + "</td>" +
                                            "<td>" + val.WFCode + "</td>" +
                                            "<td>" + val.WFName + "</td>" +
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
                                        "<li><a href ='javascript:void(0)' onclick = 'ObjWorkFlow.FillGrid(1)' class= '" + (parseInt(PageIndex) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>First</a></li>" +
                                   "<li><a href ='javascript:void(0)'  onclick = 'ObjWorkFlow.FillGrid(" + (parseInt(i) - parseInt(10)) + ")'   class= '" + (parseInt(i) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>«</a></li>"
                                    while (parseInt(i) <= parseInt(pageCount)) {
                                        html += "<li><a href ='javascript:void(0)' onclick = 'ObjWorkFlow.FillGrid(" + i + ")'  class='" + (parseInt(i) != parseInt(PageIndex) ? "activeAnchor" : "not-activeAnchorSelected") + "'   >" + i + "</a></li>"
                                        if (parseInt(i) % parseInt(10) == 0) {
                                            break;
                                        }
                                        i++;
                                    }
                                    html += "<li><a href ='javascript:void(0)' onclick = 'ObjWorkFlow.FillGrid(" + (parseInt(i) + parseInt(1)) + ")'   class= '" + ((parseInt(pageCount) - parseInt(PageIndex)) > 10 ? "activeAnchor" : "not-activeAnchor") + " ' >»</a></li>" +
                                    "<li><a href ='javascript:void(0)' onclick = 'ObjWorkFlow.FillGrid(" + pageCount + ")'   class= '" + (parseInt(PageIndex) < parseInt(pageCount) ? "activeAnchor" : "not-activeAnchor") + "'>Last</a></li>" +
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


    this.FillWorkFlow = function (ID_WorkFlow) {
        $.ajax({
            url: api_url + "/WorkFlow/FillWorkFlow",
            data: { 'ID_WorkFlow': ID_WorkFlow },
            cache: false,
            type: 'Get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                try {
                    var Mydata = JSON.parse(data);
                    if (Mydata.length > 0) {
                        $.each(Mydata, function (key, value) {
                            var ObjBlWorkFlow = value;
                            $('#WorkFlowId').val(ObjBlWorkFlow.ID_WorkFlow);

                            $('#txtWorkFlowCode').val(ObjBlWorkFlow.WFCode);
                            $('#txtWorkFlowName').val(ObjBlWorkFlow.WFName);
                            $('#txtWorkFlowSortOrder').val(ObjBlWorkFlow.SortOrder);
                            if (ObjBlWorkFlow.Active == true) {
                                $('#chkActive').prop("checked", true);
                            }
                            else {
                                $('#chkActive').prop("checked", false);
                            }
                        }
                        )
                    };
                    ObjWorkFlow.Show(2);
                }
                catch (e) {
                    alert(e + 'FillWorkFlow');
                }

            }
        });
WF
    }

    this.DeleteWorkFlow = function (ID_WorkFlow) {
        if (confirm('Do you want to delete..?')) {
            $.ajax({
                url: api_url + "/WorkFlow/DeleteWorkFlow",
                data: { 'ID_WorkFlow': ID_WorkFlow },
                cache: false,
                type: 'Get',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    var msg = "";
                    if (data.statusCode > 0) {
                        MessageText(data.statusCode, 'Deleted Successfully', '#txtWorkFlowCode');
                    }
                    else {
                        MessageText(data.statusCode, '', '#txtWorkFlowCode');
                    }
                    ObjWorkFlow.init();


                }
            });
        }


    }
}