﻿var objTickets = new Tickets();
function Tickets() {

    this.init = function () {
        try {
            this.Show(1);
            this.Clear();
            this.ClearDescription();
            this.FillGrid();
            this.FillProductDropdown();
            this.FillTopicDropdown();
            this.FillTeamDropdown();
            this.FillDepartmentDropdown();
            this.FillClientDropdown();
            this.FillStatusDropdown();

            var MyID_Tickets = this.getParameterByName('ID_Tickets', '');
            if (parseFloat(MyID_Tickets) > 0) {
                this.FillTimeline(MyID_Tickets);
            }


        } catch (ex) {
            alert(ex + 'Initialise Tickets')

        }
    }

    this.getParameterByName = function (name, url) {
        try {
            if (!url) {
                url = window.location.href;
            }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
        catch (ex) {
            alert(ex + 'getParameterByName')

        }
    }

    this.Clear = function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();
        if (dd < 10) { dd = '0' + dd } if (mm < 10) { mm = '0' + mm } today = dd + '/' + mm + '/' + yyyy;

        $('#txtDate').attr('value', today);
        $('#hfTicketsId').val("");
        $('#txtTicketNo').val("");
        $("#txtTicketNo").removeClass("validateerror");
        $('#ddlPriority').val(0);
        $("#ddlPriority").removeClass("validateerror");
        $('#ddlStatus').val(0);
        $("#ddlStatus").removeClass("validateerror");
        $('#ddlProduct').val(0);
        $("#ddlProduct").removeClass("validateerror");
        $('#ddlTopic').val(0);
        $("#ddlTopic").removeClass("validateerror");
        $('#ddlClient').val(0);
        $("#ddlClient").removeClass("validateerror");
        $('#ddlDepartmentAdd').val(0);
        $("#ddlDepartmentAdd").removeClass("validateerror");
        $('#txtSubject').val("");
        $("#txtSubject").removeClass("validateerror");
        $('#txtUserName').val("");
        $("#txtUserName").removeClass("validateerror");
        $('#txtUserMobile').val("");
        $("#txtUserMobile").removeClass("validateerror");
        $('#txtUserEmailId').val("");
        $("#txtUserEmailId").removeClass("validateerror");
        $('#txtDescription').val("");
        $("#txtDescription").removeClass("validateerror");

        jQuery('#selectedFiles div').html('');

        $('#fileToUpload').val("");
        document.getElementById('btnRemove').style.display = "none";
        document.getElementById('fileToUpload').style.display = "block";

        jQuery('#selectedFilesAdd div').html('');

        $('#fileMultiUpload').val("");
        document.getElementById('btnRemoveMulti').style.display = "none";
        document.getElementById('fileMultiUpload').style.display = "block";
        this.AutoGenTktNo();
        isValidation = 0;
    };
    this.ClearDescription = function () {
        $('#hfTicketsId').val("0");
        $('#ddlStatus1').val(0);
        $("#ddlStatus1").removeClass("validateerror");
        $('#txtUserDescription').val("");
        $("#txtUserDescription").removeClass("validateerror");
        $('#txtAgentNotes').val("");
        jQuery('#selectedFiles div').html('');

        $('#fileToUpload').val("");
        document.getElementById('btnRemove').style.display = "none";
        document.getElementById('fileToUpload').style.display = "block";

        jQuery('#selectedFilesAdd div').html('');

        $('#fileMultiUpload').val("");
        document.getElementById('btnRemoveMulti').style.display = "none";
        document.getElementById('fileMultiUpload').style.display = "block";
        isValidation = 0;
    };
    this.ClearAssign = function () {

        $('#hfTicketsId').val("0");
        $('#ddlDepartment').val(0);
        $("#ddlDepartment").removeClass("validateerror");
        $('#ddlTeam').val(0);
        $("#ddlTeam").removeClass("validateerror");
        $('#ddlAgent').val(0);
        $("#ddlAgent").removeClass("validateerror");
        $('#txtAgentNotesPop').val("");
        $('[class*= chk]').prop("checked", false);
        $('[id*= checkAll]').prop("checked", false);

        isValidation = 0;
    };
    this.Show = function (id) {
        if (id == 1) {
            $("#AddTickets").hide();
            $("#ViewTickets").show();
            $("#divDetails").attr("style", "display:none");
        }
        else {
            $("#ViewTickets").hide();
            $("#AddTickets").show();
            $("#divDetails").attr("style", "display:none");
        }
    };

    this.FillStatusDropdown = function () {
        try {
            $.ajax({

                url: api_url + '/Resumes/StatusDropDownFill',
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
                                optionhtml += '<option value=' + value.ID_Status + '>' + value.StatusName + '</option>';
                            });
                        }
                        catch (exx) {
                            alert(exx);
                        }
                    }
                    $('#ddlStatus1').html(optionhtml);
                    $('#ddlStatus').html(optionhtml);
                },

                error: function (xhr, status, error) {
                    var err = eval('(' + xhr.responseText + ')');
                    alert(err.Message);
                }

            });
        }
        catch (ex) {
            alert(ex + ' Exception FillProductDropdown');
        }
    }
    this.FillProductDropdown = function () {
        try {
            $.ajax({

                url: api_url + '/Resumes/ProductDropDownFill',
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
                    $('#ddlProduct').html(optionhtml);
                },

                error: function (xhr, status, error) {
                    var err = eval('(' + xhr.responseText + ')');
                    alert(err.Message);
                }

            });
        }
        catch (ex) {
            alert(ex + ' Exception FillProductDropdown');
        }
    }
    this.FillTopicDropdown = function () {
        try {
            $.ajax({

                url: api_url + '/Resumes/TopicDropDownFill',
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
                                optionhtml += '<option value=' + value.ID_Topic + '>' + value.TopicName + '</option>';
                            });
                        }
                        catch (exx) {
                            alert(exx);
                        }
                    }
                    $('#ddlTopic').html(optionhtml);
                },

                error: function (xhr, status, error) {
                    var err = eval('(' + xhr.responseText + ')');
                    alert(err.Message);
                }

            });
        }
        catch (ex) {
            alert(ex + ' Exception FillTopicDropdown');
        }
    }
    this.Validate = function () {

        if (isValidation == 1) {
            var _Error = 0;

            if ($('#txtTicketNo').val() == "") {
                $('#txtTicketNo').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtTicketNo').removeClass("validateerror");
            }

            if ($('#ddlPriority option:selected').val() == '0') {
                $('#ddlPriority').addClass("validateerror");
                _Error++;
            }
            else {
                $('#ddlPriority').removeClass("validateerror");
            }
            if ($('#ddlStatus option:selected').val() == '0') {
                $('#ddlStatus').addClass("validateerror");
                _Error++;
            }
            else {
                $('#ddlStatus').removeClass("validateerror");
            }
            
            if ($('#ddlTopic option:selected').val() == '0') {
                $('#ddlTopic').addClass("validateerror");
                _Error++;
            }
            else {
                $('#ddlTopic').removeClass("validateerror");
            }
            if ($('#ddlClient option:selected').val() == '0') {
                $('#ddlClient').addClass("validateerror");
                _Error++;
            }
            else {
                $('#ddlClient').removeClass("validateerror");
            }
            if ($('#ddlDepartmentAdd option:selected').val() == '0') {
                $('#ddlDepartmentAdd').addClass("validateerror");
                _Error++;
            }
            else {
                $('#ddlDepartmentAdd').removeClass("validateerror");
            }
            
            if ($('#txtSubject').val() == "") {
                $('#txtSubject').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtSubject').removeClass("validateerror");
            }
            if ($('#txtUserName').val() == "") {
                $('#txtUserName').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtUserName').removeClass("validateerror");
            }
            if ($('#txtUserMobile').val() == "") {
                $('#txtUserMobile').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtUserMobile').removeClass("validateerror");
            }
            if ($('#txtUserEmailId').val() == "") {
                $('#txtUserEmailId').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtUserEmailId').removeClass("validateerror");
            }
            if ($('#txtDescription').val() == "") {
                $('#txtDescription').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtDescription').removeClass("validateerror");
            }
            return _Error;
        }
    }
    this.ValidateDescription = function () {
        if (isValidation == 1) {
            var _Error = 0;
            if ($('#ddlStatus1 option:selected').val() == '0') {
                $('#ddlStatus1').addClass("validateerror");
                _Error++;
            }
            else {
                $('#ddlStatus1').removeClass("validateerror");
            }
            if ($('#txtUserDescription').val() == "") {
                $('#txtUserDescription').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtUserDescription').removeClass("validateerror");
            }
            return _Error;
        }
    }
    this.ValidateAssign = function () {
        if (isValidation == 1) {
            var _Error = 0;
            if ($('#ddlDepartment option:selected').val() == '0') {
                $('#ddlDepartment').addClass("validateerror");
                _Error++;
            }
            else {
                $('#ddlDepartment').removeClass("validateerror");
            }
            if ($('#ddlTeam option:selected').val() == '0') {
                $('#ddlTeam').addClass("validateerror");
                _Error++;
            }
            else {
                $('#ddlTeam').removeClass("validateerror");
            }
            if ($('#ddlAgent option:selected').val() == '0') {
                $('#ddlAgent').addClass("validateerror");
                _Error++;
            }
            else {
                $('#ddlAgent').removeClass("validateerror");
            }
            return _Error;
        }
    }
    this.Submit = function () {
        isValidation = 1;
        
        if (this.Validate() <= 0) {
            objTickets.Save();
            
        }
        else {

            return false;
        }
    };
    this.Save = function () {
        try {
            var ObjBlTickets = {
                MasterID: $('#hfTicketsId').val() == '' ? '0' : $('#hfTicketsId').val(),
                TickNo: $('#txtTicketNo').val(),
                TickDate: $('#txtdate').val(),
                TickSubject: $('#txtSubject').val(),
                Description: $('#txtDescription').val(),
                TickPriority: $('#ddlPriority option:selected').val(),
                TickStatus: $('#ddlStatus option:selected').val(),
                FK_Product: $('#ddlProduct option:selected').val(),
                FK_Topic: $('#ddlTopic option:selected').val(),
                FK_Client: $('#ddlClient option:selected').val(),
                FK_Department: $('#ddlDepartmentAdd option:selected').val(),
                UserName: $('#txtUserName').val(),
                UserMob: $('#txtUserMobile').val(),
                UserEmail: $('#txtUserEmailId').val()
                

            };
            alert('a');

            var DATA = JSON.stringify(ObjBlTickets);
            $.ajax({
                url: api_url + '/Resumes/UpdateTickets',
                cache: false,
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                data: DATA,
                dataType: 'json',
                success: function (data) {
                    try {
                        if (data.statusCode > 0) {
                            if ($('#hfTicketsId').val() == '' ? '0' : $('#hfTicketsId').val() == 0) {
                                MessageText(data.statusCode, 'Saved Successfully', '#txtTicketNo');
                            }
                            else {
                                MessageText(data.statusCode, 'Updated Successfully', '#txtTicketNo');
                            }
                            objTickets.init();
                            jQuery('#myModal').modal('hide');
                        }
                        else {
                            MessageText(data.statusCode, '', '#txtTicketNo');
                        }
                    }
                    catch (ex) {
                        alert(ex + 'return issue');
                    }
                },
                error: function (error) {
                    alert(error + ' : UpdateTickets');

                }

            });
        }
        catch (e) {
            alert(e + '   : /Resumes/UpdateTickets');
        }
    }
    this.SubmitDescription = function () {
        isValidation = 1;
        if (this.ValidateDescription() <= 0) {
            objTickets.SaveDescription();
        }
        else {
            return false;
        }
    };
    this.SaveDescription = function () {
        try {
            var ObjBlTickets = {
                MasterID: $('#hfTicketsId').val() == '' ? '0' : $('#hfTicketsId').val(),
                Description: $('#txtUserDescription').val(),
                AgentNotes: $('#txtAgentNotes').val(),
                TickStatus: $('#ddlStatus1 option:selected').val()
            };

            var DATA = JSON.stringify(ObjBlTickets);
            this.JavascriptFunction(1);
            $.ajax({
                url: api_url + '/Resumes/UpdateTicketDetails',
                cache: false,
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                data: DATA,
                dataType: 'json',
                success: function (data) {
                    try {
                        if (data.statusCode > 0) {
                            if ($('#hfTicketsId').val() == '' ? '0' : $('#hfTicketsId').val() == 0) {
                                MessageText(data.statusCode, 'Saved Successfully', '#txtTicketNo');
                                
                            }
                            else {
                                MessageText(data.statusCode, 'Updated Successfully', '#txtTicketNo');
                            }
                            objTickets.JavascriptFunction(2);
                            objTickets.FillTimeline($('#hfTicketsId').val());
                            objTickets.ClearDescription();
                            jQuery('#myModal').modal('hide');
                        }
                        else {
                            MessageText(data.statusCode, '', '#txtTicketNo');
                        }
                    }
                    catch (ex) {
                        alert(ex + 'return issue');
                    }
                },
                error: function (error) {
                    alert(error + ' : UpdateTicketDetails');

                }

            });
        }
        catch (e) {
            alert(e + '   : /Resumes/UpdateTicketDetails');
        }
    }
    this.SubmitAssign = function () {
        isValidation = 1;
        if (this.ValidateAssign() <= 0) {
            objTickets.SaveAssign();
        }
        else {
            return false;
        }
    };
    this.SaveAssign = function () {
        try {
            if ($('#hfTicketsId').val() == 0) {
                var xmltkt = "";
                xmltkt += "<root>";
                $(".chk:checked").each(function () {
                    xmltkt += "<Tickets>";
                    xmltkt += "<ID_Tickets>";
                    xmltkt += $(this).attr("id");
                    xmltkt += "</ID_Tickets>";
                    xmltkt += "</Tickets>";
                });

                xmltkt += "</root>";
            }
            else {
                var xmltkt = ""
            }
            var ObjBlTickets = {
                MasterID: $('#hfTicketsId').val() == '' ? '0' : $('#hfTicketsId').val(),
                AgentTo: $('#ddlAgent option:selected').val(),
                AgentNotes: $('#txtAgentNotesPop').val(),
                XmlTickets: xmltkt,
            };
            var DATA = JSON.stringify(ObjBlTickets);
            $.ajax({
                url: api_url + '/Resumes/UpdateTicketAssign',
                cache: false,
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                data: DATA,
                dataType: 'json',
                success: function (data) {
                    try {
                        if (data.statusCode > 0) {
                            if ($('#hfTicketsId').val() == '' ? '0' : $('#hfTicketsId').val() == 0) {
                                MessageText(data.statusCode, 'Saved Successfully', '#txtTicketNo');
                            }
                            else {
                                MessageText(data.statusCode, 'Updated Successfully', '#txtTicketNo');
                            }
                            jQuery('#myModal').modal('hide');
                            if ($('#hfMode').val() == 1)
                                objTickets.FillTimeline($('#hfTicketsId').val());
                            objTickets.ClearAssign();
                        }
                        else {
                            MessageText(data.statusCode, '', '#txtTicketNo');
                        }
                    }
                    catch (ex) {
                        alert(ex + 'return issue');
                    }
                },
                error: function (error) {
                    alert(error + ' : UpdateTicketDetails');
                }
            });
        }
        catch (e) {
            alert(e + '   : /Resumes/UpdateTicketDetails');
        }
    }


    this.AutoGenTktNo = function () {

        $.ajax({
            url: api_url + "/Resumes/AutoGenTktNo",
            data: {},
            cache: false,
            type: 'Get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                try {
                    var Mydata = JSON.parse(data);
                    if (Mydata.length > 0) {
                        $.each(Mydata, function (key, value) {
                            var ObjBlAutogen = value;
                            $('#txtTicketNo').val(ObjBlAutogen.TicketNo);

                            if (ObjBlAutogen.AutoGen == 1) {
                                $("#txtTicketNo").attr("disabled", "disabled");
                            }
                            else {
                                //$("#txtTicketNo").attr("disabled", "");
                                // $('#txtTicketNo').val("");
                            }
                        }
                        )
                    };
                }
                catch (e) {
                    alert(e + 'AutoGenTktNo');
                }
            }
        });


    }


    this.FillGrid = function (PageIndex) {
        try {
            $.ajax({
                url: api_url + "/Resumes/SelectTicketsAll",
                cache: false,
                type: "GET",
                data: { 'PageIndex': PageIndex, 'SearchItem': $('#txtSearch').val(), 'Status': pageStatus },
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
                                          "<th style = 'display:none' width  = '10%' >ID_Tickets</th>" +
                                           "<th width  = '2%' ><input type='checkbox' id='checkAll' name='checkAllAssign'  ></th>" +
                                           "<th width  = '5%' >SlNo</th>" +
                                          "<th width  = '10%' >Resumes No</th>" +
                                          "<th width  = '7%' >Date</th>" +
                                "<th width  = '20%' >Name</th>" +
                                "<th width  = '20%' >Mob</th>" +
                                "<th width  = '20%' >email</th>" +
                                          "<th width  = '15%' >Status</th>" +
                                          //"<th width  = '5%' >Details</th>" +
                                          "<th width  = '5%' >Assign</th>" +

                                          "</tr>" +
                                      "</thead>";

                            $.each(Mydata, function (key, val) {

                                var htmlActionTd = "<td>" +
                                                   //"<a href ='javascript:void(0)' onclick = 'objTickets.FillTimeline(" + val.ID_Tickets + ")' class='edit'><i class='glyphicon glyphicon-list-alt'></i>" + "</a>" +
                                                   //"</td>"+
                                                   //"<td>" +
                                                   "<a href ='javascript:void(0)' onclick = 'objTickets.TicketAssign(" + val.ID_Tickets + ")' class='remove'><i class='glyphicon glyphicon-transfer'></i>" + "</a>"
                                "</td>";
                                html += "<tr>" +

                                            "<td style = 'display:none'>" + val.ID_Tickets + "</td>" +
                                           "<td>" +
                                                   "<input type ='checkbox' class='chk' name= 'checkassign' id=" + val.ID_Tickets + ">" + "</input>" +
                                                   "</td>" +
                                            "<td>" + val.SlNo;
                                if (val.Attchment > 0) {
                                    html += "<i class='fa fa-paperclip md pull-right' style='color:#0594C3;'></i>"
                                }
                                html +=  "</td>" +

                                            "<td><a href='#' onclick = 'objTickets.FillTimeline(" + val.ID_Tickets + ")'>" + val.TickNo + "</a>";
                                if (val.UserCount > 0) {
                                    html += "&nbsp<a class='link-black text-sm'style='color:#05C335;'><i class='fa fa-comments' style='color:#05C335;'></i>&nbsp" + val.UserCount + "</a>" + "&nbsp";
                                }
                                if (val.AgentCount > 0) {
                                    html += "<a class='link-black text-sm'style='color:#0cc5d2;'><i class='fa fa-comments' style='color:#0cc5d2;'></i>&nbsp" + val.AgentCount + "</a>";

                                }
                                if ((val.AgentNotSeen > 0 && val.DefaultDepartment==1) || val.LastAssignedAgent > 0) {
                                    html += "<span class='pull-right-container'> <small class='label pull-right bg-green'>Pending</small></span>"

                                }
                                if (val.OverDueAgent > 0) {
                                    html += "<span class='pull-right-container'> <small class='label pull-right bg-red'>Overdue</small></span>"

                                }
                                html += "</td><td>" + ToJavaScriptDate(val.TickDate) + "</td>" +
                                    "<td>" + val.UserCodeName + "</td>" +
                                    "<td>" + val.UsMob + "</td>" +
                                    "<td>" + val.Usemail + "</td>" +
                                    "<td>" + val.TickStatusName ;
                                 
                                   html += "</td>" +
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
                                        "<li><a href ='javascript:void(0)' onclick = 'objTickets.FillGrid(1)' class= '" + (parseInt(PageIndex) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>First</a></li>" +
                                   "<li><a href ='javascript:void(0)'  onclick = 'objTickets.FillGrid(" + (parseInt(i) - parseInt(10)) + ")'   class= '" + (parseInt(i) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>«</a></li>"
                                    while (parseInt(i) <= parseInt(pageCount)) {
                                        html += "<li><a href ='javascript:void(0)' onclick = 'objTickets.FillGrid(" + i + ")'  class='" + (parseInt(i) != parseInt(PageIndex) ? "activeAnchor" : "not-activeAnchorSelected") + "'   >" + i + "</a></li>"
                                        if (parseInt(i) % parseInt(10) == 0) {
                                            break;
                                        }
                                        i++;
                                    }
                                    html += "<li><a href ='javascript:void(0)' onclick = 'objTickets.FillGrid(" + (parseInt(i) + parseInt(1)) + ")'   class= '" + ((parseInt(pageCount) - parseInt(PageIndex)) > 10 ? "activeAnchor" : "not-activeAnchor") + " ' >»</a></li>" +
                                    "<li><a href ='javascript:void(0)' onclick = 'objTickets.FillGrid(" + pageCount + ")'   class= '" + (parseInt(PageIndex) < parseInt(pageCount) ? "activeAnchor" : "not-activeAnchor") + "'>Last</a></li>" +
                                   "</ul></div>";

                                }
                            }   //Page Indexing Starts here
                            catch (er) {
                                alert(er + 'Page Indexing');
                            }
                        }
                        $("#Grid").html(html);
                        objTickets.CheckAllAssign();
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
    this.FillTickets = function (ID_Tickets) {
        $.ajax({
            url: api_url + "/Resumes/FillTickets",
            data: { 'ID_Tickets': ID_Tickets },
            cache: false,
            type: 'Get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                try {
                    var Mydata = JSON.parse(data);
                    if (Mydata.length > 0) {
                        $.each(Mydata, function (key, value) {
                            var ObjBlTickets = value;
                            $('#hfTicketsId').val(objTickets.ID_Tickets);
                            $('#txtTicketNo').val(objTickets.TickNo);
                            $('#txtdate').val(objTickets.TickDate);
                            $('#txtSubject').val(objTickets.TickSubject);
                            $('#ddlPriority').val(objTickets.TickPriority);
                            $('#ddlStatus').val(objTickets.TickStatus);
                            $('#ddlProduct').val(objTickets.FK_Product);
                            $('#ddlTopic').val(objTickets.FK_Topic);

                        }
                        )
                    };
                    objTickets.Show(2);
                }
                catch (e) {
                    alert(e + 'FillTickets');
                }

            }
        });

    }
    this.FillTimeline = function (ID_Tickets) {

        $('#fileToUpload').val("");
        $("#ViewTickets").hide();
        $("#AddTickets").hide();
        $("#divDetails").attr("style", "display:block");
        try {
            $.ajax({
                url: api_url + "/Resumes/SelectAgentTicketDetails",
                cache: false,
                type: "GET",
                data: { 'ID_Tickets': ID_Tickets },
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    try {

                        var Mydata = JSON.parse(data);
                        var RecordCount = "0";
                        var html = "";
                        if (Mydata.length > 0) {
                            html += "<div id='TimeLineTickets'>" +
                                          "<ul class='timeline'>";

                            $.each(Mydata, function (key, val) {
                                if (key == 0) {

                                    $('#hfTicketsId').val(val.ID_Tickets);
                                    $('#lblTicketNo').text(val.TickNo);
                                    $('#lblSubject').text(val.TickSubject);
                                    $('#lblStatus').text(val.TickStatus);
                                    $('#lblUser').text(val.TickUser);
                                    $('#lblPriority').text(val.TickPriority);
                                    $('#lblDepartment').text(val.DepName);
                                    $('#lblProduct').text(val.ProdName);
                                    $('#lblClient').text(val.CliName);
                                    $('#lblTopic').text(val.TopicName);
                                    $('#lblUserEmail').text(val.Usemail);
                                    
                                    $('#lblCreateDate').text(val.UserDate);
                                    $('#lblLastMsg').text(val.LastMsg == "Sun, 31 Dec 1899 18:30:00" ? "" : val.LastMsg);
                                    $('#lblLastResp').text(val.LastResp == "Sun, 31 Dec 1899 18:30:00" ? "" : val.LastResp);
                                    $('#lblUserLastCloseDate').text(val.LastCloseDt == "Sun, 31 Dec 1899 18:30:00" ? "" : val.LastCloseDt);
                                    $('#lblUserClosedby').text(val.LastClose);


                                }
                                var datecolor;
                                if (val.EnteredDate != undefined) {
                                    if (val.UserCode > 0) { datecolor = 'bg-green' } else { datecolor = 'bg-blue' }
                                    html += "<li class='time-label'>" +
                                            "<span class='" + datecolor + "'>" +
                                             val.EnteredDate +
                                            "</span>" +
                                            "</li>";
                                }

                                if (val.AgentFrom > 0) {



                                    html += "<li>" +
                                            "<i class='fa fa-mail-forward bg-blue'></i>" +
                                            "<div class='timeline-item'>" +
                                            "<span class='time' data-toggle='tooltip'  data-original-title='" + val.EnteredOn + "' ><i class='fa fa-clock-o'></i>  " +
                                             relative_time(val.EnteredOn) +
                                            "</span>" +
                                            "<h3 class='timeline-header' style='background-color: #b5f2f6;'>" +
                                            "<a href='#' style='pointer-events: none;cursor: default;font-size: 22px'>" + val.AgentFromName + "</a>    Assigned to    <a href='#' style='pointer-events: none;cursor: default;font-size: 22px;'>" + val.AgentToName + "</a>";
                                    if (val.AgentOverDue > 0)
                                    { html += "<a class='label label-info pull-right'>OverDue</a>"; }
                                   html += "</h3>";
                                    if (val.AgentNotes != '') {
                                        html += "<div class='timeline-body'  style='font-style: italic; background-color:#b5f2f6;'>" +
                                        val.AgentNotes + "</div>";
                                    }
                                }

                                else {
                                    var color; var Icon; var person; var statuscolor;
                                    if (val.UserCode > 0) { color = '#a0f8b6;'; Icon = 'fa fa-user bg-green'; person = '<a href="#" style="pointer-events: none;cursor: default;font-size: 22px;">' + val.UsName + '</a>  Posted'; }
                                    else { color = '#88eff6;'; Icon = 'fa fa-user-md bg-blue'; person = '<a href="#" style="pointer-events: none;cursor: default;font-size: 22px;">' + val.AgentName + '</a>  Posted'; }
                                    if (val.TransStatus == 1) { statuscolor = 'btn btn-danger'; } else if (val.TransStatus == 2) { statuscolor = 'btn btn-warning'; } else { statuscolor = 'btn btn-success'; }
                                    html += "<li>" +
                                            "<i class='" + Icon + "'></i>" +
                                            "<div class='timeline-item'>" +
                                            "<span class='time' data-toggle='tooltip' data-original-title='" + val.EnteredOn + "'><i class='fa fa-clock-o'></i>  " +
                                            relative_time(val.EnteredOn) +
                                            "</span>" +
                                            "<h3 class='timeline-header' style='background-color: " + color + "'>" + person ;
                                            if (val.AgentOverDue > 0)
                                            { html += "<a class='label label-info pull-right'>OverDue</a>"; }
                                            html += "</h3>" +
                                            "<div class='timeline-body'  style='Color:#000; background-color: " + color + "'>" +
                                            val.Description +
                                            "</div>";

                                    if (val.AttachmentDetails != '') {
                                        html += "<div class='timeline-body'  style='background-color: " + color + "'>";
                                        var mySplitResult = val.AttachmentDetails.split("<AttachmentName>");
                                        for (i = 0; i < mySplitResult.length; i++) {
                                            if (mySplitResult[i] != '') {
                                                html += "<a href='" + val.AttachmentPath + mySplitResult[i] + "' download>" + mySplitResult[i] + "</a><br>";
                                            }
                                        }
                                        html += "</div>";
                                    }

                                    html += "<div class='timeline-body'  style='font-style: italic; background-color: " + color + "'>" +
                                   val.AgentNotes + "</div>" +
                                   "<div class='timeline-footer'  style='background-color: " + color + "'>" +
                                   "<button class='" + statuscolor + "'>" +
                                   val.TransStatusName +
                                        "</button>" +

                                        //<button type="button" class="btn bg-purple margin">.btn.bg-purple</button>

                                   "</div>" +
                                   "</div>" +
                                   "</li>";
                                }


                            });

                            html += "<li>" +
                                        "<i class='fa fa-clock-o bg-gray'></i>" +
                                        "</li>" +
                                        "</ul>" +
                                         "</div>";
                        }

                        $("#divTimeline").html(html);
                        objTickets.scroll();
                        objTickets.scrollup();
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
    this.FillTeamDropdown = function () {
        try {
            $.ajax({

                url: api_url + '/Resumes/TeamDropDownFill',
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
                                optionhtml += '<option value=' + value.ID_Team + '>' + value.TeamName + '</option>';
                            });
                        }
                        catch (exx) {
                            alert(exx);
                        }
                    }
                    $('#ddlTeam').html(optionhtml);

                },

                error: function (xhr, status, error) {
                    var err = eval('(' + xhr.responseText + ')');
                    alert(err.Message);
                }

            });
        }
        catch (ex) {
            alert(ex + ' Exception FillTeamDropdown');
        }
    }
    this.FillDepartmentDropdown = function () {
        try {
            $.ajax({
                url: api_url + '/Resumes/DepartmentDropDownFill',
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
                    
                    $('#ddlDepartmentAdd').html(optionhtml);

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
    this.FillAgentDropdown = function () {
        try {
            $.ajax({
                url: api_url + '/Resumes/AgentDropDownFill',
                data: { 'FK_Department': $('#ddlDepartment option:selected').val(), 'FK_Team': $('#ddlTeam option:selected').val() },
                cache: false,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    var Mydata = JSON.parse(data);
                    var optionhtml = '<option value=' + 0 + '>Select</option>';
                    if (Mydata.length > 0) {
                        try {
                            $.each(Mydata, function (i, value) {
                                optionhtml += '<option value=' + value.ID_Agent + '>' + value.AgName + '</option>';
                            });
                        }
                        catch (exx) {
                            alert(exx);
                        }
                    }
                    $('#ddlAgent').html(optionhtml);

                },

                error: function (xhr, status, error) {
                    var err = eval('(' + xhr.responseText + ')');
                    alert(err.Message);
                }

            });
        }
        catch (ex) {
            alert(ex + ' Exception FillAgentDropdown');
        }
    }
    this.FillClientDropdown = function () {
        try {
            $.ajax({

                url: api_url + '/Resumes/ClientDropDownFill',
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
                                optionhtml += '<option value=' + value.ID_Client + '>' + value.CliName + '</option>';
                            });
                        }
                        catch (exx) {
                            ticket
                            alert(exx);
                        }
                    }
                    $('#ddlClient').html(optionhtml);
                },

                error: function (xhr, status, error) {
                    var err = eval('(' + xhr.responseText + ')');
                    alert(err.Message);
                }

            });
        }
        catch (ex) {
            alert(ex + ' Exception FillClientDropdown');
        }
    }
    this.selectcheck = function () {

        var chkArray = [];
        chkArray = $(".chk:checked").each(function () { $(this).attr("id").count });
        var str = "";
        if (chkArray.length > 0) {
            this.TicketAssign(0);
        }
        else {
            MessageText("-34", '', '#checkAll');
            return;
        }
    }

    this.TicketAssign = function (ID_Tickets) {
        $('#ddlDepartment').val(0);
        $("#ddlDepartment").removeClass("validateerror");
        $('#ddlTeam').val(0);
        $("#ddlTeam").removeClass("validateerror");
        $('#hfTicketsId').val(ID_Tickets);
        $('#hfMode').val(0);
        $('#txtAgentNotesPop').val("");
        jQuery('#myModal').modal('show');
    }

    this.TicketAssignDetails = function () {
        $('#ddlDepartment').val(0);
        $("#ddlDepartment").removeClass("validateerror");
        $('#ddlTeam').val(0);
        $("#ddlTeam").removeClass("validateerror");
        $('#hfMode').val(1);
        $('#txtAgentNotesPop').val("");
        jQuery('#myModal').modal('show');
    }

    var totalsizeOfUploadFiles = 0;
    this.UploadAttachments = function () {
        try {
            var sizeVlaue = 0;
            var files = $('#fileToUpload').prop("files");
            var names = $.map(files, function (val) { return val.name; });
            var data = new FormData();
            for (var i = 0; i < files.length; i++) {

                data.append("MyImages" + i, files[i]);


                document.getElementById('btnRemove').style.display = "block";
                document.getElementById('fileToUpload').style.display = "none";

                sizeVlaue = sizeVlaue + files[i].size;
            }

            if (sizeVlaue > 67108864) {
                MessageText('-35', '', '');
            }
            else {
                this.JavascriptFunction(1);
                $.ajax({
                    url: api_url + '/Resumes/UploadAction',
                    type: "POST",
                    processData: false,
                    contentType: false,
                    data: data,
                    success: function (response) {
                        //code after success
                        try {
                            if (response != '') {
                                MessageText('1', 'Uploaded Successfully');
                                objTickets.JavascriptFunction(2);
                            }

                        }
                        catch (ex) {
                            alert(ex + 'return issue');
                        }
                    },
                    error: function (er) {
                        MessageText('-33', '', '');

                    }

                });
            }







        }
        catch (ex) {
            alert(ex);
        }
    }


    this.UploadMultiAttachments = function () {
        try {
            var sizeVlaue = 0;
            var files = $('#fileMultiUpload').prop("files");
            var names = $.map(files, function (val) { return val.name; });

            var data = new FormData();
            for (var i = 0; i < files.length; i++) {

                data.append("MyImages" + i, files[i]);


                document.getElementById('btnRemoveMulti').style.display = "block";
                document.getElementById('fileMultiUpload').style.display = "none";
                sizeVlaue = sizeVlaue + files[i].size;
            }


            if (sizeVlaue > 67108864) {
                MessageText('-35', '', '');
            }
            else {
                this.JavascriptFunction(1);
                $.ajax({
                    url: api_url + '/Resumes/UploadAction',
                    type: "POST",
                    processData: false,
                    contentType: false,
                    data: data,
                    success: function (response) {
                        //code after success
                        try {
                            if (response != '') {
                                MessageText('1', 'Uploaded Successfully');
                                objTickets.JavascriptFunction(2);
                            }

                        }
                        catch (ex) {
                            alert(ex + 'return issue');
                        }
                    },
                    error: function (er) {
                        MessageText('-33', '', '');

                    }

                });

            }
            //jQuery('#selectedFiles div').html('');




        }
        catch (ex) {
            alert(ex);
        }
    }

    this.Remove = function () {
        try {
            var files = $("#fileToUpload").prop("files");
            $('#fileToUpload').val("");
            //   $('#selectedFiles').remove();
            $('#selectedFiles').empty();

            document.getElementById('btnRemove').style.display = "none";
            document.getElementById('fileToUpload').style.display = "block";
            $.ajax({
                url: api_url + "/Resumes/Remove",
                data: {},
                cache: false,
                type: 'Get',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    if (data.statusCode > 0) {

                    }
                    else {

                    }
                }
            });


        }
        catch (ex) {
            alert(ex + 'return issue');
        }
    }


    this.RemoveMulti = function () {
        try {
            var files = $("#fileMultiUpload").prop("files");
            $('#fileMultiUpload').val("");
            $('#selectedFilesAdd').empty();
            document.getElementById('btnRemoveMulti').style.display = "none";
            document.getElementById('fileMultiUpload').style.display = "block";
            $.ajax({
                url: api_url + "/Resumes/Remove",
                data: {},
                cache: false,
                type: 'Get',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    if (data.statusCode > 0) {

                    }
                    else {

                    }
                }
            });


        }
        catch (ex) {
            alert(ex + 'return issue');
        }
    }

    this.scroll = function () {
        $('html, body').animate({
            scrollTop: $("#scrollbottomdiv").offset().top
        }, 3000);
    }

    this.scrollup = function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('#scroll').fadeIn();
            } else {
                $('#scroll').fadeOut();
            }
        });
        $('#scroll').click(function () {
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        });


    }

    this.CheckAllAssign = function () {
        $('[name*= checkAllAssign]').bind('click', function () {
            if ($('[name*= checkAllAssign]').prop('checked') == true) {
                $('[name*= checkassign]').prop('checked', true);
            }
            else {
                $('[name*= checkassign]').prop('checked', false);
            }

        });
        $('[name*= checkassign]').bind('click', function () {
            if ($(this).prop('checked') == false) {
                $('[name*= checkAllAssign]').prop('checked', false);
            }
            if ($('[name*= "checkassign"]:checked').length == $('[name*= checkassign]').length) {
                $('[name*= checkAllAssign]').prop('checked', true);
            }
        });
        if ($('[name*= "checkassign"]:checked').length == $('[name*= checkassign]').length) {
            $('[name*= checkAllAssign]').prop('checked', true);
        }
        else { $('[name*= checkAllAssign]').prop('checked', false); }
    };



    function relative_time(date_str) {
        if (!date_str) { return; }
        date_str = $.trim(date_str);
        date_str = date_str.replace(/\.\d\d\d+/, ""); // remove the milliseconds
        date_str = date_str.replace(/-/, "/").replace(/-/, "/"); //substitute - with /
        date_str = date_str.replace(/T/, " ").replace(/Z/, " UTC"); //remove T and substitute Z with UTC
        date_str = date_str.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // +08:00 -> +0800
        var parsed_date = new Date(date_str);
        var relative_to = (arguments.length > 1) ? arguments[1] : new Date(); //defines relative to what ..default is now
        var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
        delta = (delta < 2) ? 2 : delta;
        var r = '';
        if (delta < 60) {
            r = delta + ' seconds ago';
        } else if (delta < 120) {
            r = 'a minute ago';
        } else if (delta < (60 * 60)) {
            r = (parseInt(delta / 60, 10)).toString() + ' minutes ago';
        } else if (delta < (2 * 60 * 60)) {
            r = 'an hour ago';
        } else if (delta < (24 * 60 * 60)) {
            r = '' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
        } else if (delta < (48 * 60 * 60)) {
            r = 'a day ago';
        } else if (delta < (30 * 24 * 60 * 60)) {
            r = (parseInt(delta / 86400, 10)).toString() + ' days ago';
        }
        else if (delta < (60 * 24 * 60 * 60)) {
            r = ' a month ago';
        }
        else if (delta < (12 * 30.5 * 24 * 60 * 60)) {
            r = (parseInt(delta / 2626560, 10)).toString() + ' months ago';
        }
        else if (delta < (2 * 12 * 30 * 24 * 60 * 60)) {
            r = ' a year ago';
        }
        else {
            r = (parseInt(delta / 31557600, 10)).toString() + ' years ago';
        }


        return 'about ' + r;
    };

    this.JavascriptFunction = function (s) {
        if (s == 1) {
            $("#divLoading").show();
        }
        else {
            $("#divLoading").hide();
        }
    }
}