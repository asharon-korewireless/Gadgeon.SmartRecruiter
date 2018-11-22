﻿

var ObjTopic = new Topic();
var isValidation = 0;
function Topic() {



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

        $('#TopicId').val("");
        $('#ddlDepartment').val(0);
        $("#ddlDepartment").removeClass("validateerror");
        $('#txtTopicCode').val("");
        $("#txtTopicCode").removeClass("validateerror");
        $('#txtTopicName').val("");
        $("#txtTopicName").removeClass("validateerror");
        $('#txtTopicSortOrder').val("");
        $("#txtTopicSortOrder").removeClass("validateerror");
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


            if ($('#txtTopicCode').val().trim() == "") {
                $('#txtTopicCode').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtTopicCode').removeClass("validateerror");
            }

            if ($('#txtTopicName').val().trim() == "") {
                $('#txtTopicName').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtTopicName').removeClass("validateerror");
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

            ObjTopic.Save();
        }
        else {

            return false;
        }
    };


    this.Save = function () {
        try {
            var ObjBlTopic = {
                MasterID: $('#TopicId').val() == '' ? '0' : $('#TopicId').val(),             
                TopicCode: $('#txtTopicCode').val().trim(),
                TopicName: $('#txtTopicName').val().trim(),
                SortOrder: $('#txtTopicSortOrder').val(),
                Active: $('#chkActive').is(":checked")

            };

            var DATA = JSON.stringify(ObjBlTopic);
            $.ajax({
                url: api_url + '/Topic/UpdateTopic',
                cache: false,
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                data: DATA,
                dataType: 'json',
                success: function (data) {
                    try {
                        if (data.statusCode > 0) {
                            if ($('#TopicId').val() == '' ? '0' : $('#TopicId').val() == 0) {
                                MessageText(data.statusCode, 'Saved Successfully', '#txtTopicCode');
                            }
                            else {
                                MessageText(data.statusCode, 'Updated Successfully', '#txtTopicCode');
                            }

                            ObjTopic.init();
                        }
                        else {
                            MessageText(data.statusCode, '', '#txtTopicCode');
                        }
                    }
                    catch (ex) {
                        alert(ex + 'return issue');
                    }
                },
                error: function (error) {
                    alert(error + ' : UpdateTopic');

                }

            });
        }
        catch (e) {
            alert(e + '   : /Topic/UpdateTopic');
        }




    }


    this.FillGrid = function (PageIndex) {

        try {
            $.ajax({
                url: api_url + "/Topic/SelectTopicAll",
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
                                          "<th style = 'display:none' width  = '10%' >ID_Topic</th>" +
                                          //"<th style = 'display:none' width  = '10%' >ID_Department</th>" +
                                           "<th width  = '20%' >SlNo</th>" +
                                          "<th width  = '20%' >Code</th>" +
                                          "<th width  = '25%' >Name</th>" +
                                          "<th width  = '15%' >SortOrder</th>" +
                                          "</tr>" +
                                      "</thead>";

                            $.each(Mydata, function (key, val) {
                                var htmlActionTd = "<td>" +
                                                   "<a href ='javascript:void(0)' onclick = 'ObjTopic.FillTopic(" + val.ID_Topic + ")' class='edit'><i class='glyphicon glyphicon-edit'></i>" + "</a>" +
                                                   "<a href ='javascript:void(0)' onclick = 'ObjTopic.DeleteTopic(" + val.ID_Topic + ")' class='remove'><i class='glyphicon glyphicon-trash'></i>" + "</a>" +
                                                   "</td>";
                                html += "<tr>" +

                                            "<td style = 'display:none'>" + val.ID_Topic + "</td>" +
                                            //"<td style = 'display:none'>" + val.FK_DefaultDepartment + "</td>" +
                                            "<td>" + val.SlNo + "</td>" +
                                            "<td>" + val.TopicCode + "</td>" +
                                            "<td>" + val.TopicName + "</td>" +
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
                                        "<li><a href ='javascript:void(0)' onclick = 'ObjTopic.FillGrid(1)' class= '" + (parseInt(PageIndex) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>First</a></li>" +
                                   "<li><a href ='javascript:void(0)'  onclick = 'ObjTopic.FillGrid(" + (parseInt(i) - parseInt(10)) + ")'   class= '" + (parseInt(i) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>«</a></li>"
                                    while (parseInt(i) <= parseInt(pageCount)) {
                                        html += "<li><a href ='javascript:void(0)' onclick = 'ObjTopic.FillGrid(" + i + ")'  class='" + (parseInt(i) != parseInt(PageIndex) ? "activeAnchor" : "not-activeAnchorSelected") + "'   >" + i + "</a></li>"
                                        if (parseInt(i) % parseInt(10) == 0) {
                                            break;
                                        }
                                        i++;
                                    }
                                    html += "<li><a href ='javascript:void(0)' onclick = 'ObjTopic.FillGrid(" + (parseInt(i) + parseInt(1)) + ")'   class= '" + ((parseInt(pageCount) - parseInt(PageIndex)) > 10 ? "activeAnchor" : "not-activeAnchor") + " ' >»</a></li>" +
                                    "<li><a href ='javascript:void(0)' onclick = 'ObjTopic.FillGrid(" + pageCount + ")'   class= '" + (parseInt(PageIndex) < parseInt(pageCount) ? "activeAnchor" : "not-activeAnchor") + "'>Last</a></li>" +
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


    this.FillTopic = function (ID_Topic) {
        $.ajax({
            url: api_url + "/Topic/FillTopic",
            data: { 'ID_Topic': ID_Topic },
            cache: false,
            type: 'Get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                try {
                    var Mydata = JSON.parse(data);
                    if (Mydata.length > 0) {
                        $.each(Mydata, function (key, value) {
                            var ObjBlTopic = value;
                            $('#TopicId').val(ObjBlTopic.ID_Topic);
                        
                            $('#txtTopicCode').val(ObjBlTopic.TopicCode);
                            $('#txtTopicName').val(ObjBlTopic.TopicName);
                            $('#txtTopicSortOrder').val(ObjBlTopic.SortOrder);
                            if (ObjBlTopic.Active == true) {
                                $('#chkActive').prop("checked", true);
                            }
                            else {
                                $('#chkActive').prop("checked", false);
                            }
                        }
                        )
                    };
                    ObjTopic.Show(2);
                }
                catch (e) {
                    alert(e + 'FillTopic');
                }

            }
        });

    }

    this.DeleteTopic = function (ID_Topic) {
        if (confirm('Do you want to delete..?')) {
            $.ajax({
                url: api_url + "/Topic/DeleteTopic",
                data: { 'ID_Topic': ID_Topic },
                cache: false,
                type: 'Get',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    var msg = "";
                    if (data.statusCode > 0) {
                        MessageText(data.statusCode, 'Deleted Successfully', '#txtTopicCode');
                    }
                    else {
                        MessageText(data.statusCode, '', '#txtTopicCode');
                    }
                    ObjTopic.init();


                }
            });
        }


    }
}