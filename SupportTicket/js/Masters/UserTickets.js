﻿var ObjUserTickets = new UserTickets();
var isValidation = 0;
function UserTickets() {

    this.init = function (viewdata) {
        try {
            if (viewdata == 5)
            {
                this.Show(2);
                this.Clear();
                this.FillProductDropdown();
                this.FillTopicDropdown();
               }
            else{
            this.Show(1);
            this.Clear();
            this.FillGrid();
            this.FillProductDropdown();
            this.FillTopicDropdown();
    }
        }
        catch (ex) {
            alert(ex + 'Initialize Team')
        }
    };
    this.SubmitDescription = function () {
        try {
            if (this.ValidateDescription() == 0) {
                var ObjBlTickets = {
                    MasterID: $('#hfTicketsId').val() == '' ? '0' : $('#hfTicketsId').val(),
                    TickDescription: $('#txtUserDescription').val()
                };
                var DATA = JSON.stringify(ObjBlTickets);
                this.JavascriptFunction(1);
                $.ajax({
                    url: api_url + '/UserRegister/UpdateUserTickets',
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
                                ObjUserTickets.JavascriptFunction(2);
                                ObjUserTickets.init();
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
        }
        catch (e) {
            alert(e + '   : /Tickets/UpdateTickets');
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
        //$('#txtTicketNo').val("");
        $("#txtTicketNo").removeClass("validateerror");
        $('#ddlPriority').val(0);
        $("#ddlPriority").removeClass("validateerror");
        $('#ddlStatus').val(0);
        $("#ddlStatus").removeClass("validateerror");
        $('#ddlProduct').val(0);
        $("#ddlProduct").removeClass("validateerror");
        $('#ddlTopic').val(0);
        $("#ddlTopic").removeClass("validateerror");
        $('#txtSubject').val("");
        $("#txtSubject").removeClass("validateerror");
        $('#txtDescription').val("");
        $("#txtDescription").removeClass("validateerror");
        $('#txtUserDescription').val("");
        $("#txtUserDescription").removeClass("validateerror");

        jQuery('#selectedFiles div').html('');

        $('#fileToUpload').val("");
        document.getElementById('btnRemove').style.display = "none";
        document.getElementById('fileToUpload').style.display = "block";

        jQuery('#selectedFilesAdd div').html('');

        $('#fileMultiUpload').val("");
        document.getElementById('btnRemoveMulti').style.display = "none";
        document.getElementById('fileMultiUpload').style.display = "block";
        isValidation = 0;

        this.AutoGenTktNo();
    };


    this.Show = function (id) {
        $("#divTimeLineTickets").hide();
        $("#divTicketDetails").hide();
        if (id == 1) {
            $("#AddBranch").hide();
            $("#ViewBranch").show();
        }
        else {
            $("#ViewBranch").hide();
            $("#AddBranch").show();
            

        }
    };
    this.ValidateDescription = function () {
        var _Error = 0;
        if ($('#txtUserDescription').val() == "") {
            $('#txtUserDescription').addClass("validateerror");
            _Error++;
        }
        else {
            $('#txtUserDescription').removeClass("validateerror");
        }
        return _Error;
    }
    this.Validate = function () {

        if (isValidation == 1) {
            var _Error = 0;

            if ($('#txtTicketNo').val().trim() == "") {
                $('#txtTicketNo').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtTicketNo').removeClass("validateerror");
            }
            if ($('#ddlProduct option:selected').val() == '0') {
                $('#ddlProduct').addClass("validateerror");
                _Error++;
            }

            else {
                $('#ddlProduct').removeClass("validateerror");
            }
            if ($('#ddlTopic option:selected').val() == '0') {
                $('#ddlTopic').addClass("validateerror");
                _Error++;
            }
            else {
                $('#ddlTopic').removeClass("validateerror");
            }
            if ($('#txtDescription').val().trim() == "") {
                $('#txtDescription').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtDescription').removeClass("validateerror");
            }
            if ($('#txtSubject').val().trim() == "") {
                $('#txtSubject').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtSubject').removeClass("validateerror");
            }
            return _Error;
        }
    }
    this.Submit = function () {
        isValidation = 1;
        if (this.Validate() <= 0) {

            ObjUserTickets.Save();
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
                TickDescription: $('#txtDescription').val(),
                FK_Product: $('#ddlProduct option:selected').val(),
                FK_Topic: $('#ddlTopic option:selected').val()
            };

            var DATA = JSON.stringify(ObjBlTickets);
            this.JavascriptFunction(1);
            $.ajax({
                url: api_url + '/UserRegister/UpdateTickets',
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
                            ObjUserTickets.JavascriptFunction(2);
                            ObjUserTickets.init();
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
            alert(e + '   : /Tickets/UpdateTickets');
        }
    }


    this.FillTopicDropdown = function () {
        try {
            $.ajax({

                url: api_url + '/UserRegister/TopicDropDownFill',
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

    this.FillProductDropdown = function () {
        try {
            $.ajax({

                url: api_url + '/UserRegister/ProductDropDownFill',
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

    this.FillGrid = function (PageIndex) {
        try {
            $.ajax({
                url: api_url + "/UserRegister/SelectAllTickets",
                cache: false,
                type: "GET",
                data: { 'PageIndex': PageIndex, 'Status': pageStatus, 'SearchItem': $('#txtSearch').val() },
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
                                           "<th width  = '5%' >SlNo</th>" +
                                          "<th width  = '20%' >Resume No</th>" +
                                          "<th width  = '25%' >Subject</th>" +
                                          "<th width  = '15%' >Name</th>" +
                                          "<th width  = '15%' >Date</th>" +
                                          "</tr>" +
                                      "</thead>";

                            $.each(Mydata, function (key, val) {

                                html += "<tr>" +
                                            "<td style = 'display:none'>" + val.ID_Tickets + "</td>" +
                                            "<td>" + val.SlNo;
                                if (val.Attchment > 0) {
                                    html += "<i class='fa fa-paperclip md pull-right' style='color:#0594C3;'></i>"
                                }
                                html += "</td>" +
                                            "<td><a href='#' onclick = 'ObjUserTickets.FillTicketDetails(" + val.ID_Tickets + ")'>" + val.TickNo + "</a>";
                                if (val.Replay > 0) {
                                    html += "<span class='pull-right-container'> <small class='label pull-right bg-green'>Replied</small></span>"
                                }
                                html += "</td><td>" + val.TickSubject + "</td>" +
                                    "<td>" + val.ProdName + "</td>" +
                                "<td>" + ToJavaScriptDate(val.TickDate) + "</td>" +
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
                                        "<li><a href ='javascript:void(0)' onclick = ' ObjUserTickets.FillGrid(1)' class= '" + (parseInt(PageIndex) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>First</a></li>" +
                                   "<li><a href ='javascript:void(0)'  onclick = ' ObjUserTickets.FillGrid(" + (parseInt(i) - parseInt(10)) + ")'   class= '" + (parseInt(i) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>«</a></li>"
                                    while (parseInt(i) <= parseInt(pageCount)) {
                                        html += "<li><a href ='javascript:void(0)' onclick = ' ObjUserTickets.FillGrid(" + i + ")'  class='" + (parseInt(i) != parseInt(PageIndex) ? "activeAnchor" : "not-activeAnchorSelected") + "'   >" + i + "</a></li>"
                                        if (parseInt(i) % parseInt(10) == 0) {
                                            break;
                                        }
                                        i++;
                                    }
                                    html += "<li><a href ='javascript:void(0)' onclick = ' ObjUserTickets.FillGrid(" + (parseInt(i) + parseInt(1)) + ")'   class= '" + ((parseInt(pageCount) - parseInt(PageIndex)) > 10 ? "activeAnchor" : "not-activeAnchor") + " ' >»</a></li>" +
                                    "<li><a href ='javascript:void(0)' onclick = ' ObjUserTickets.FillGrid(" + pageCount + ")'   class= '" + (parseInt(PageIndex) < parseInt(pageCount) ? "activeAnchor" : "not-activeAnchor") + "'>Last</a></li>" +
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
    this.FillTicketDetails = function (FK_Tickets) {
        $('#fileToUpload').val("");
        $("#divTimeLineTickets").show();
        $("#divTicketDetails").show();
        $("#AddBranch").hide();
        $("#ViewBranch").hide();
        $('#hfTicketsId').val(FK_Tickets);
        $.ajax({
            url: api_url + "/UserRegister/GetTicketDetails",
            data: { 'FK_Tickets': FK_Tickets },
            cache: false,
            type: 'Get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                try {
                    var Mydata = JSON.parse(data);
                    var html = "";
                    $('#lblUserLastMessageDate').text(Mydata[0].LastMessageDate == "Sun, 31 Dec 1899 18:30:00" ? "" : Mydata[0].LastMessageDate);
                    $('#lblUserLastResponseDate').text(Mydata[0].LastResponseDate == "Sun, 31 Dec 1899 18:30:00" ? "" :Mydata[0].LastResponseDate);
                    $("#lblUserLastCloseDate").text(Mydata[0].LastCloseDate);
                    $("#lblUserDate").text(Mydata[0].TickDate);
                    $("#lblUserTickNo").text(Mydata[0].TickNo);                  
                    $("#lblUserProduct").text(Mydata[0].Product);
                    $("#lblUserTopic").text(Mydata[0].Topic);
                    $("#lblUserClient").text(Mydata[0].ClientName);
                    $("#lblUserSubject").text(Mydata[0].TickSubject);                
                    $("#lblUserEmail").text(Mydata[0].Email);                 
                    $("#lblUserClosedby").html(Mydata[0].Closedby);
                    $("#lblUserStatus").html(Mydata[0].TickStatus);
                    if (Mydata.length > 0) {
                        $.each(Mydata, function (key, value) {
                            if (value.AgentCode == 0) {
                                html += "<li class='time-label'>";
                                html += value.EnteredDate == null ? "" : "<span class='bg-green'>" + value.EnteredDate+ "</span>";
                                html += "</li><li><i class='fa fa-user-md bg-green'></i><div class='timeline-item'>" +
                                    "<span class='time'  data-toggle='tooltip'  data-original-title='" + value.EnteredOn + "'><i class='fa fa-clock-o'></i>  " + relative_time(value.EnteredOn) + "</span>";
                                html += "<h3 class='timeline-header' style='background-color: #a0f8b6;'><a href='#'>";
                                html += value.UsName;
                                html += "</a> posted a request</h3>";
                                html += "<div class='timeline-body'  style='background-color: #a0f8b6;'>";
                                html += value.Description;
                                html += "</div>";
                                if (value.AttachmentDetails != '')
                                {                                
                                    html += "<div class='timeline-body'  style='background-color: #a0f8b6;'>";
                                    var mySplitResult = value.AttachmentDetails.split("<AttachmentName>");
                                    for (i = 0; i < mySplitResult.length; i++) {
                                        if (mySplitResult[i] != '') {                                          
                                            html += "<a href='"+value.AttachmentPath+mySplitResult[i]+"' download>" + mySplitResult[i] + "</a><br>";                                          
                                        }
                                    }
                                    html += "</div>";
                                }
                                html += " <div class='timeline-footer'  style='background-color: #a0f8b6;'>";
                                if (value.TransStatus == 1) { html += "<a class='btn btn-StatusOpen btn-xs';> Open</a>"; }
                                else if (value.TransStatus == 2) { html += "<a class='btn btn-StatusResolved btn-xs';> Resolved</a>"; }
                                else { html += "<a class='btn btn-StatusClosed btn-xs';> Closed</a>"; }
                                html += "</div></li>";
                            }
                            else {
                                html += "<li class='time-label'>";
                                html += value.EnteredDate == null ? "" : "<span class='bg-blue'>" + value.EnteredDate + "</span>";
                                html += "</li><li><i class='fa fa-user-md bg-blue'></i><div class='timeline-item'> <span class='time'  data-toggle='tooltip'  data-original-title='" + value.EnteredOn + "'><i class='fa fa-clock-o'></i>  " + relative_time(value.EnteredOn) + "</span>";
                                html += "<h3 class='timeline-header' style='background-color: #88eff6;'><a href='#'>";
                                html += value.UsName;
                                html += "</a> sent you a response</h3>";
                                html += "<div class='timeline-body'  style='background-color:#88eff6;'>";
                                html += value.Description;
                                html += "</div>";
                                if (value.AttachmentDetails != '') {                              
                                    html += "<div class='timeline-body'  style='background-color: #88eff6;'>";
                                    var mySplitResult = value.AttachmentDetails.split("<AttachmentName>");
                                    for (i = 0; i < mySplitResult.length; i++) {
                                        if (mySplitResult[i] != '') {
                                            html += "<a href='" + value.AttachmentPath + mySplitResult[i] + "' download>" + mySplitResult[i] + "</a><br>";
                                        }
                                    }
                                    html += "</div>";
                                }
                                html += " <div class='timeline-footer'  style='background-color: #88eff6;'>";
                                if (value.TransStatus == 1) { html += "<a class='btn btn-StatusOpen btn-xs';> Open</a>"; }
                                else if (value.TransStatus == 2) { html += "<a class='btn btn-StatusResolved btn-xs';> Resolved</a>"; }
                                else { html += "<a class='btn btn-StatusClosed btn-xs';> Closed</a>"; }
                                html += "</div></li>";
                            }
                        }
                        )
                        html += "<li><i class='fa fa-clock-o bg-gray'></i></li>";
                    };

                    $("#UlBind").html(html);
                    ObjUserTickets.scroll();
                    ObjUserTickets.scrollup();
                }
                catch (e) {
                    alert(e + 'FillTeam');
                }

            }
        });

    }



    this.FillTeam = function (ID_Team) {
        $.ajax({
            url: api_url + "/Team/FillTeam",
            data: { 'ID_Team': ID_Team },
            cache: false,
            type: 'Get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                try {
                    var Mydata = JSON.parse(data);
                    if (Mydata.length > 0) {
                        $.each(Mydata, function (key, value) {
                            var ObjBlTeam = value;
                            $('#TeamId').val(ObjBlTeam.ID_Team);
                            $('#txtTeamCode').val(ObjBlTeam.TeamCode);
                            $('#txtTeamName').val(ObjBlTeam.TeamName);
                            $('#txtSortOrder').val(ObjBlTeam.SortOrder);
                            if (ObjBlTeam.Active == true) {
                                $('#chkActive').prop("checked", true);
                            }
                            else {
                                $('#chkActive').prop("checked", false);
                            }
                        }
                        )
                    };
                    ObjUserTickets.Show(2);
                }
                catch (e) {
                    alert(e + 'FillTeam');
                }

            }
        });

    }

   

    this.AutoGenTktNo = function () {
      
            $.ajax({
                url: api_url + "/UserRegister/AutoGenTktNo",
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




    this.DeleteBranch = function (ID_Team) {
        if (confirm('Do you want to delete..?')) {
            $.ajax({
                url: api_url + "/Team/DeleteTeam",
                data: { 'ID_Team': ID_Team },
                cache: false,
                type: 'Get',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    if (data.statusCode > 0) {
                        MessageText(data.statusCode, 'Deleted Successfully', '#txtTicketNo');
                    }
                    else {
                        MessageText(data.statusCode, '', '#txtTicketNo');
                    }
                    ObjUserTickets.init();


                }
            });
        }


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
                    url: api_url + '/UserRegister/UploadAction',
                    type: "POST",
                    processData: false,
                    contentType: false,
                    data: data,
                    success: function (response) {
                        

                        //code after success
                        try {
                            if (response != '') {
                                
                                MessageText('1', 'Uploaded Successfully');
                                ObjUserTickets.JavascriptFunction(2);
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
            alert(ex + 'UploadAttachments');
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
                    url: api_url + '/UserRegister/UploadAction',
                    type: "POST",
                    processData: false,
                    contentType: false,
                    data: data,
                    success: function (response) {
                        //code after success
                        try {
                            if (response != '') {
                                MessageText('1', 'Uploaded Successfully');
                                ObjUserTickets.JavascriptFunction(2);
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
        try{
            var files = $("#fileToUpload").prop("files");
            $('#fileToUpload').val("");
            //   $('#selectedFiles').remove();
            $('#selectedFiles').empty();
           
            document.getElementById('btnRemove').style.display = "none";
            document.getElementById('fileToUpload').style.display = "block";
            $.ajax({
                url: api_url + "/UserRegister/Remove",
                data: { },
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
        catch (ex)
        {
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
                url: api_url + "/UserRegister/Remove",
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

   this.scroll= function() {
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
       else if (delta < (12 * 31 * 24 * 60 * 60)) {
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