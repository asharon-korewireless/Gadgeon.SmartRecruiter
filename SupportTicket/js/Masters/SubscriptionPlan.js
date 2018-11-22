﻿

var ObjSubscriptionPlan = new SubscriptionPlan();
var isValidation = 0;
function SubscriptionPlan() {



    this.init = function () {

        try {
            this.Show(1);
            this.Clear();
            // this.FillDepartmentDropdown();
            this.FillGrid();
        }
        catch (ex) {
            alert(ex + 'Initialize Topic')
        }
    };


    this.Clear = function () {

        $('#SubscriptionPlanId').val("");
        $('#txtSubscriptionPlanCode').val("");
        $("#txtSubscriptionPlanCode").removeClass("validateerror");
        $('#txtSubscriptionPlanName').val("");
        $("#txtSubscriptionPlanName").removeClass("validateerror");
        $('#txtSubscriptionPlanHours').val("");
        $("#txtSubscriptionPlanHours").removeClass("validateerror");
        $('#txtSubscriptionPlanSortOrder').val("");
        $("#txtSubscriptionPlanSortOrder").removeClass("validateerror");
        $('#chkActive').prop("checked", true);
        isValidation = 0;


    };


    this.Show = function (id) {

        if (id == 1) {
            $("#AddSubscriptionPlan").hide();
            $("#ViewSubscriptionPlan").show();

        }
        else {
            $("#ViewSubscriptionPlan").hide();
            $("#AddSubscriptionPlan").show();

        }
    };
    this.Validate = function () {

        if (isValidation == 1) {
            var _Error = 0;


            if ($('#txtSubscriptionPlanCode').val().trim() == "") {
                $('#txtSubscriptionPlanCode').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtSubscriptionPlanCode').removeClass("validateerror");
            }

            if ($('#txtSubscriptionPlanName').val().trim() == "") {
                $('#txtSubscriptionPlanName').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtSubscriptionPlanName').removeClass("validateerror");
            }
            if ($('#txtSubscriptionPlanHours').val() == "") {
                $('#txtSubscriptionPlanHours').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtSubscriptionPlanHours').removeClass("validateerror");
            }

            //if ($('#txtTopicSortOrder').val() == "") {
            //    $('#txtTopicSortOrder').addClass("validateerror");
            //    _Error++;
            //}
            //else {
            //    $('#txtTopicSortOrder').removeClass("validateerror");
            //}

            return _Error;
        }

    }

    this.Submit = function () {

        isValidation = 1;
        if (this.Validate() <= 0) {

            ObjSubscriptionPlan.Save();
        }
        else {

            return false;
        }
    };


    this.Save = function () {
        try {
            var ObjBlSubscriptionPlan = {
                MasterID: $('#SubscriptionPlanId').val() == '' ? '0' : $('#SubscriptionPlanId').val(),
                SubscriptionPlanCode: $('#txtSubscriptionPlanCode').val().trim(),
                SubscriptionPlanName: $('#txtSubscriptionPlanName').val().trim(),
                SubscriptionPlanHours: $('#txtSubscriptionPlanHours').val(),
                SortOrder: $('#txtSubscriptionPlanSortOrder').val(),
                Active: $('#chkActive').is(":checked")

            };

            var DATA = JSON.stringify(ObjBlSubscriptionPlan);
            $.ajax({
                url: api_url + '/SubscriptionPlan/UpdateSubscriptionPlan',
                cache: false,
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                data: DATA,
                dataType: 'json',
                success: function (data) {
                    try {
                        if (data.statusCode > 0) {
                            if ($('#SubscriptionPlanId').val() == '' ? '0' : $('#SubscriptionPlanId').val() == 0) {
                                MessageText(data.statusCode, 'Saved Successfully', '#txtSubscriptionPlanCode');
                            }
                            else {
                                MessageText(data.statusCode, 'Updated Successfully', '#txtSubscriptionPlanCode');
                            }

                            ObjSubscriptionPlan.init();
                        }
                        else {
                            MessageText(data.statusCode, '', '#txtSubscriptionPlanCode');
                        }
                    }
                    catch (ex) {
                        alert(ex + 'return issue');
                    }
                },
                error: function (error) {
                    alert(error + ' : UpdateSubscriptionPlan');

                }

            });
        }
        catch (e) {
            alert(e + '   : /SubscriptionPlan/UpdateSubscriptionPlan');
        }




    }


    this.FillGrid = function (PageIndex) {

        try {
            $.ajax({
                url: api_url + "/SubscriptionPlan/SelectSubscriptionPlanAll",
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
                                          "<th style = 'display:none' width  = '10%' >ID_SubscriptionPlan</th>" +
                                          //"<th style = 'display:none' width  = '10%' >ID_Department</th>" +
                                           "<th width  = '8%' >SlNo</th>" +
                                          "<th width  = '20%' >Code</th>" +
                                          "<th width  = '20%' >Name</th>" +
                                          "<th width  = '18%' >Hours</th>" +
                                          "</tr>" +
                                      "</thead>";

                            $.each(Mydata, function (key, val) {
                                var htmlActionTd = "<td>" +
                                                   "<a href ='javascript:void(0)' onclick = 'ObjSubscriptionPlan.FillSubscriptionPlan(" + val.ID_SubscriptionPlan + ")' class='edit'><i class='glyphicon glyphicon-edit'></i>" + "</a>" +
                                                   "<a href ='javascript:void(0)' onclick = 'ObjSubscriptionPlan.DeleteSubscriptionPlan(" + val.ID_SubscriptionPlan + ")' class='remove'><i class='glyphicon glyphicon-trash'></i>" + "</a>" +
                                                   "</td>";
                                html += "<tr>" +

                                            "<td style = 'display:none'>" + val.ID_SubscriptionPlan + "</td>" +
                                            //"<td style = 'display:none'>" + val.FK_DefaultDepartment + "</td>" +
                                            "<td>" + val.SlNo + "</td>" +
                                            "<td>" + val.SPCode + "</td>" +
                                            "<td>" + val.SPName + "</td>" +
                                            "<td>" + val.SPHours + "</td>" +
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
                                        "<li><a href ='javascript:void(0)' onclick = 'ObjSubscriptionPlan.FillGrid(1)' class= '" + (parseInt(PageIndex) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>First</a></li>" +
                                   "<li><a href ='javascript:void(0)'  onclick = 'ObjSubscriptionPlan.FillGrid(" + (parseInt(i) - parseInt(10)) + ")'   class= '" + (parseInt(i) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>«</a></li>"
                                    while (parseInt(i) <= parseInt(pageCount)) {
                                        html += "<li><a href ='javascript:void(0)' onclick = 'ObjSubscriptionPlan.FillGrid(" + i + ")'  class='" + (parseInt(i) != parseInt(PageIndex) ? "activeAnchor" : "not-activeAnchorSelected") + "'   >" + i + "</a></li>"
                                        if (parseInt(i) % parseInt(10) == 0) {
                                            break;
                                        }
                                        i++;
                                    }
                                    html += "<li><a href ='javascript:void(0)' onclick = 'ObjSubscriptionPlan.FillGrid(" + (parseInt(i) + parseInt(1)) + ")'   class= '" + ((parseInt(pageCount) - parseInt(PageIndex)) > 10 ? "activeAnchor" : "not-activeAnchor") + " ' >»</a></li>" +
                                    "<li><a href ='javascript:void(0)' onclick = 'ObjSubscriptionPlan.FillGrid(" + pageCount + ")'   class= '" + (parseInt(PageIndex) < parseInt(pageCount) ? "activeAnchor" : "not-activeAnchor") + "'>Last</a></li>" +
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


    this.FillSubscriptionPlan = function (ID_SubscriptionPlan) {
    
        $.ajax({
            url: api_url + "/SubscriptionPlan/FillSubscriptionPlan",
            data: { 'ID_SubscriptionPlan': ID_SubscriptionPlan },
            cache: false,
            type: 'Get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                try {
                    var Mydata = JSON.parse(data);
                    if (Mydata.length > 0) {
                        $.each(Mydata, function (key, value) {
                            var ObjBlSubscriptionPlan = value;
                            $('#SubscriptionPlanId').val(ObjBlSubscriptionPlan.ID_SubscriptionPlan);
                            $('#txtSubscriptionPlanCode').val(ObjBlSubscriptionPlan.SPCode);
                            $('#txtSubscriptionPlanName').val(ObjBlSubscriptionPlan.SPName);
                            $('#txtSubscriptionPlanHours').val(ObjBlSubscriptionPlan.SPHours);
                           $('#txtSubscriptionPlanSortOrder').val(ObjBlSubscriptionPlan.SortOrder);
                           if (ObjBlSubscriptionPlan.Active == true) {
                               $('#chkActive').prop("checked", true);
                           }
                           else {
                               $('#chkActive').prop("checked", false);
                           }
                        }
                        )
                    };
                    ObjSubscriptionPlan.Show(2);
                }
                catch (e) {
                    alert(e + 'FillSubscriptionPlan');
                }

            }
        });

    }

    this.DeleteSubscriptionPlan = function (ID_SubscriptionPlan) {
        if (confirm('Do you want to delete..?')) {
            $.ajax({
                url: api_url + "/SubscriptionPlan/DeleteSubscriptionPlan",
                data: { 'ID_SubscriptionPlan': ID_SubscriptionPlan },
                cache: false,
                type: 'Get',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    var msg = "";
                    if (data.statusCode > 0) {
                        MessageText(data.statusCode, 'Deleted Successfully', '#txtSubscriptionPlanCode');
                    }
                    else {
                        MessageText(data.statusCode, '', '#txtSubscriptionPlanCode');
                    }
                    ObjSubscriptionPlan.init();


                }
            });
        }


    }
}