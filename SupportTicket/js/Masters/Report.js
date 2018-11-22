﻿var objReport = new Report();
function Report() {

    this.init = function () {
        try {
            //this.Show(1);
            this.Clear();
            //this.ClearDescription();
            //this.FillGrid();
            this.FillProductOnlyDropdown();
            this.FillClientDropdown();
            //this.FillProductDropdown();
            this.FillAgentDropdown();
        } catch (ex) {
            alert(ex + 'Initialize Report')

        }
    }
//fill clientWise product dropdown
    this.FillProductDropdown = function () {
        try {
            $.ajax({
                url: api_url + '/Reports/ProductDropDownFill',
                data: { 'FK_Client': $('#ddlClient option:selected').val() },
                cache: false,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    var Mydata = JSON.parse(data);
                    var optionhtml = '<option value=' + 0 + '>All</option>';
                    if (Mydata.length > 0) {
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


    this.FillAgentDropdown = function () {
        try {
            $.ajax({
                url: api_url + '/Reports/AgentDropDownFill',
                cache: false,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    var Mydata = JSON.parse(data);
                    if (Mydata.length > 0) {
                        var optionhtml = '<option value=' + 0 + '>All</option>';
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

                url: api_url + '/Reports/ClientDropDownFill',
                cache: false,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    var Mydata = JSON.parse(data);
                    if (Mydata.length > 0) {
                        var optionhtml = '<option value=' + 0 + '>All</option>';
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
//fill product only dropdown
    this.FillProductOnlyDropdown = function () {
        try {
            $.ajax({

                url: api_url + '/Reports/ProductOnlyDropDownFill',
                cache: false,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    var Mydata = JSON.parse(data);
                    if (Mydata.length > 0) {
                        var optionhtml = '<option value=' + 0 + '>All</option>';
                        try {
                            $.each(Mydata, function (i, value) {
                                optionhtml += '<option value=' + value.ID_Product + '>' + value.ProdName + '</option>';
                            });
                        }
                        catch (exx) {
                            ticket
                            alert(exx);
                        }
                    }
                    $('#ddlProductOnly').html(optionhtml);
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

    this.Validate = function () {
     

        if (isValidation == 1) {
           
           
            var _Error = 0;

            if ($('#datepickerfrom').val().trim() == "") {
                $('#datepickerfrom').addClass("validateerror");
                _Error++;
            }
            else {
                $('#datepickerfrom').removeClass("validateerror");
            }

            if ($('#datepickerto').val().trim() == "") {
                $('#datepickerto').addClass("validateerror");
                _Error++;
            }
            else {
                $('#datepickerto').removeClass("validateerror");
            }


            return _Error;
         

        }
        
    }

    this.SearchTicket = function () {
      
      
        isValidation = 1;
        if (this.Validate() <= 0) {
            objReport.SearchTicketWise();
        }
        else {

            return false;
        }
    };

    this.SearchAgentTicket = function () {
        isValidation = 1;
        if (this.Validate() <= 0) {
            objReport.SearchAgentWiseTicket();
        }
        else {

            return false;
        }
    };
    this.SearchProductTicket = function () {
        isValidation = 1;
        if (this.Validate() <= 0) {
            objReport.SearchProductWiseTicket();
        }
        else {

            return false;
        }
    };

    this.SearchClientTicket = function () {
        isValidation = 1;
        if (this.Validate() <= 0) {
            objReport.SearchClientWiseTicket();
        }
        else {

            return false;
        }
    };

    this.SearchAgentWiseTicket = function (PageIndex) {
        try {
            var ObjBlReport = {
                FromDate: $('#datepickerfrom').val().trim(),
                ToDate: $('#datepickerto').val().trim(),
                FK_Client: $('#ddlClient option:selected').val(),
                FK_Product: $('#ddlProduct option:selected').val(),
                //Agent: $('#ddlAgent option:selected').val(),
                PageIndex: PageIndex,
                Search: $('#txtSearch').val().trim()
            };
           
            var DATA = JSON.stringify(ObjBlReport);
            
            $.ajax({
                url: api_url + '/Reports/SelectAgentWiseReport',
                cache: false,
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                data: DATA,
                dataType: 'json',
                success: function (data) {
                    try {
                        var Mydata = JSON.parse(data);
                        var RecordCount = "0";
                        var html = "";
                        if (Mydata.length > 0) {
                            $("#divView").show();
                            html += "<table width = '100%' id='example1' class='table table-bordered table-striped'>" +
                                      "<thead background-color='rgb(60, 141, 188)'>" +
                                          "<tr>" +
                                          "<th style = 'display:none' width  = '10%' >ID_Tickets</th>" +
                                           "<th width  = '10%' >SlNo</th>" +
                                          "<th width  = '20%' >Agent</th>" +
                                          "<th width  = '10%' >Total</th>" +
                                          "<th width  = '10%' >Open</th>" +
                                          "<th width  = '10%' >Resolved</th>" +
                                           "<th width  = '10%' >Closed</th>" +
                                           "<th width  = '10%' >Pending</th>" +
                                           "<th width  = '10%' >Assigned</th>" +
                                           "<th width  = '10%' >Messaged</th>" +
                                          "<th width  = '10%' >OverDue</th>" +
                                          "</tr>" +
                                      "</thead>";

                            $.each(Mydata, function (key, val) {
                                html += "<tr>" +

                                            "<td style = 'display:none'>" + val.ID_Tickets + "</td>" +
                                            "<td>" + val.SlNo + "</td>" +
                                            "<td><a href='#'>" + val.AgentName + "</a>" +
                                            "</td>" +
                                            "<td>" + val.Total + "</td>" +
                                            "<td>" + val.Open + "</td>" +
                                            "<td>" + val.Resolved + "</td>" +
                                            "<td>" + val.Closed + "</td>" +
                                            "<td>" + val.Pending + "</td>" +
                                            "<td>" + val.Assigned + "</td>" +
                                            "<td>" + val.Messaged + "</td>" +
                                            "<td>" + val.OverDue + "</td>" +
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
                                        "<li><a href ='javascript:void(0)' onclick = 'objReport.SearchAgentWiseTicket(1)' class= '" + (parseInt(PageIndex) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>First</a></li>" +
                                   "<li><a href ='javascript:void(0)'  onclick = 'objReport.SearchAgentWiseTicket(" + (parseInt(i) - parseInt(10)) + ")'   class= '" + (parseInt(i) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>«</a></li>"
                                    while (parseInt(i) <= parseInt(pageCount)) {
                                        html += "<li><a href ='javascript:void(0)' onclick = 'objReport.SearchAgentWiseTicket(" + i + ")'  class='" + (parseInt(i) != parseInt(PageIndex) ? "activeAnchor" : "not-activeAnchorSelected") + "'   >" + i + "</a></li>"
                                        if (parseInt(i) % parseInt(10) == 0) {
                                            break;
                                        }
                                        i++;
                                    }
                                    html += "<li><a href ='javascript:void(0)' onclick = 'objReport.SearchAgentWiseTicket(" + (parseInt(i) + parseInt(1)) + ")'   class= '" + ((parseInt(pageCount) - parseInt(PageIndex)) > 10 ? "activeAnchor" : "not-activeAnchor") + " ' >»</a></li>" +
                                    "<li><a href ='javascript:void(0)' onclick = 'objReport.SearchAgentWiseTicket(" + pageCount + ")'   class= '" + (parseInt(PageIndex) < parseInt(pageCount) ? "activeAnchor" : "not-activeAnchor") + "'>Last</a></li>" +
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

    this.SearchTicketWise = function (PageIndex) {
        try {
            var ObjBlReport = {
                FromDate: $('#datepickerfrom').val().trim(),
                ToDate: $('#datepickerto').val().trim(),
                FK_Client: $('#ddlClient option:selected').val(),
                FK_Product: $('#ddlProduct option:selected').val(),
                FK_Agent: $('#ddlAgent option:selected').val(),
                Status: $('#ddlStatus option:selected').val(),
                PageIndex: PageIndex,
                Search: $('#txtSearch').val().trim()
            };

            var DATA = JSON.stringify(ObjBlReport);
            $.ajax({
                url: api_url + '/Reports/SelectTicketWiseReport',
                cache: false,
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                data: DATA,
                dataType: 'json',
                success: function (data) {
                    try {
                        var Mydata = JSON.parse(data);
                        var RecordCount = "0";
                        var html = "";
                        if (Mydata.length > 0) {
                            $("#divView").show();
                            html += "<table width = '100%' id='example1' class='table table-bordered table-striped'>" +
                                      "<thead background-color='rgb(60, 141, 188)'>" +
                                          "<tr>" +
                                          "<th style = 'display:none' width  = '10%' >ID_Tickets</th>" +
                                           "<th width  = '10%' >SlNo</th>" +
                                          "<th width  = '20%' >Ticket No</th>" +
                                          "<th width  = '10%' >Ticket Date</th>" +
                                          "<th width  = '15%' >Product</th>" +
                                          "<th width  = '15%' >Ticket Subject</th>" +
                                          "<th width  = '15%' >Client</th>" +
                                          "</tr>" +
                                      "</thead>";

                            $.each(Mydata, function (key, val) {
                                html += "<tr>" +
                                            "<td style = 'display:none'>" + val.ID_Tickets + "</td>" +
                                            "<td>" + val.SlNo + "</td>" +
                                            "<td><a target='_blank' href='../Tickets/Tickets?ID_Tickets=" + val.ID_Tickets + "'>" + val.TickNo + "</a>" + "&nbsp&nbsp" +
                               (val.UserCount > 0 ? "<a class='link-black text-sm'style='color:#05C335;'><i class='fa fa-comments' style='color:#05C335;'></i>&nbsp" + val.UserCount + "</a>" : "") + "&nbsp" +
                               (val.AgentCount > 0 ? "<a class='link-black text-sm'style='color:#0cc5d2;'><i class='fa fa-comments' style='color:#0cc5d2;'></i>&nbsp" + val.AgentCount + "</a>" : "");
                               if (val.TicketStatus==1) {
                                   html += "<span class='pull-right-container'> <small class='label pull-right bg-red'>Open</small></span>";
                               }
                               else if (val.TicketStatus == 2) { html += "<span class='pull-right-container'> <small class='label pull-right label-warning'>Resolved</small></span>" }
                               else if (val.TicketStatus == 3) {
                                   html += "<span class='pull-right-container'> <small class='label pull-right label-success'>Closed</small></span>";
                               }
                               html += "</td>";
                                     html +=       "<td>" + val.TickDate + "</td>" +
                                            "<td>" + val.ProdName + "</td>" +
                                            "<td>" + val.TickSubject + "</td>" +
                                            "<td>" + val.CliName + "</td>" +
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
                                        "<li><a href ='javascript:void(0)' onclick = 'objReport.SearchTicketWise(1)' class= '" + (parseInt(PageIndex) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>First</a></li>" +
                                   "<li><a href ='javascript:void(0)'  onclick = 'objReport.SearchTicketWise(" + (parseInt(i) - parseInt(10)) + ")'   class= '" + (parseInt(i) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>«</a></li>"
                                    while (parseInt(i) <= parseInt(pageCount)) {
                                        html += "<li><a href ='javascript:void(0)' onclick = 'objReport.SearchTicketWise(" + i + ")'  class='" + (parseInt(i) != parseInt(PageIndex) ? "activeAnchor" : "not-activeAnchorSelected") + "'   >" + i + "</a></li>"
                                        if (parseInt(i) % parseInt(10) == 0) {
                                            break;
                                        }
                                        i++;
                                    }
                                    html += "<li><a href ='javascript:void(0)' onclick = 'objReport.SearchTicketWise(" + (parseInt(i) + parseInt(1)) + ")'   class= '" + ((parseInt(pageCount) - parseInt(PageIndex)) > 10 ? "activeAnchor" : "not-activeAnchor") + " ' >»</a></li>" +
                                    "<li><a href ='javascript:void(0)' onclick = 'objReport.SearchTicketWise(" + pageCount + ")'   class= '" + (parseInt(PageIndex) < parseInt(pageCount) ? "activeAnchor" : "not-activeAnchor") + "'>Last</a></li>" +
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


    this.SearchClientWiseTicket = function (PageIndex) {
        //alert('hai');
        try {
            var ObjBlReport = {
                FromDate: $('#datepickerfrom').val().trim(),
                ToDate: $('#datepickerto').val().trim(),
                FK_Client: $('#ddlClient option:selected').val(),
                FK_Product: $('#ddlProduct option:selected').val(),
                //Agent: $('#ddlAgent option:selected').val(),
                PageIndex: PageIndex,
                Search: $('#txtSearch').val().trim()
            };

            var DATA = JSON.stringify(ObjBlReport);

            $.ajax({
                url: api_url + '/Reports/SelectClientWiseReport',
                cache: false,
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                data: DATA,
                dataType: 'json',
                success: function (data) {
                    try {
                        var Mydata = JSON.parse(data);
                        var RecordCount = "0";
                        var html = "";
                        if (Mydata.length > 0) {
                            $("#divView").show();
                            html += "<table width = '100%' id='example1' class='table table-bordered table-striped'>" +
                                      "<thead background-color='rgb(60, 141, 188)'>" +
                                          "<tr>" +
                                          "<th style = 'display:none' width  = '10%' >ID_Tickets</th>" +
                                           "<th width  = '10%' >SlNo</th>" +
                                          "<th width  = '20%' >Client</th>" +
                                          "<th width  = '10%' >Total</th>" +
                                          "<th width  = '10%' >Open</th>" +
                                          "<th width  = '10%' >Resolved</th>" +
                                           "<th width  = '10%' >Closed</th>" +
                                          "<th width  = '10%' >OverDue</th>" +
                                          "</tr>" +
                                      "</thead>";

                            $.each(Mydata, function (key, val) {
                                html += "<tr>" +

                                            "<td style = 'display:none'>" + val.ID_Tickets + "</td>" +
                                            "<td>" + val.SlNo + "</td>" +
                                            "<td><a href='#'>" + val.ClientName + "</a>" +
                                            "</td>" +
                                            "<td>" + val.TotalTickets + "</td>" +
                                            "<td>" + val.OpenedTickets + "</td>" +
                                            "<td>" + val.ResolvedTickets + "</td>" +
                                            "<td>" + val.ClosedTickets + "</td>" +
                                            "<td>" + val.ClientOverDueTickets + "</td>" +
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
                                        "<li><a href ='javascript:void(0)' onclick = 'objReport.SearchClientWiseTicket(1)' class= '" + (parseInt(PageIndex) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>First</a></li>" +
                                   "<li><a href ='javascript:void(0)'  onclick = 'objReport.SearchClientvWiseTicket(" + (parseInt(i) - parseInt(10)) + ")'   class= '" + (parseInt(i) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>«</a></li>"
                                    while (parseInt(i) <= parseInt(pageCount)) {
                                        html += "<li><a href ='javascript:void(0)' onclick = 'objReport.SearchClientWiseTicket(" + i + ")'  class='" + (parseInt(i) != parseInt(PageIndex) ? "activeAnchor" : "not-activeAnchorSelected") + "'   >" + i + "</a></li>"
                                        if (parseInt(i) % parseInt(10) == 0) {
                                            break;
                                        }
                                        i++;
                                    }
                                    html += "<li><a href ='javascript:void(0)' onclick = 'objReport.SearchClientWiseTicket(" + (parseInt(i) + parseInt(1)) + ")'   class= '" + ((parseInt(pageCount) - parseInt(PageIndex)) > 10 ? "activeAnchor" : "not-activeAnchor") + " ' >»</a></li>" +
                                    "<li><a href ='javascript:void(0)' onclick = 'objReport.SearchClientWiseTicket(" + pageCount + ")'   class= '" + (parseInt(PageIndex) < parseInt(pageCount) ? "activeAnchor" : "not-activeAnchor") + "'>Last</a></li>" +
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

    this.SearchProductWiseTicket = function (PageIndex) {
        //alert('hai');
        try {
            var ObjBlReport = {
                FromDate: $('#datepickerfrom').val().trim(),
                ToDate: $('#datepickerto').val().trim(),
                FK_Product: $('#ddlProductOnly option:selected').val(),
                //FK_Product: $('#ddlProduct option:selected').val(),
                //Agent: $('#ddlAgent option:selected').val(),
                PageIndex: PageIndex,
                Search: $('#txtSearch').val().trim()
            };

            var DATA = JSON.stringify(ObjBlReport);

            $.ajax({
                url: api_url + '/Reports/SelectProductWiseReport',
                cache: false,
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                data: DATA,
                dataType: 'json',
                success: function (data) {
                    try {
                        var Mydata = JSON.parse(data);
                        var RecordCount = "0";
                        var html = "";
                        if (Mydata.length > 0) {
                            $("#divView").show();
                            html += "<table width = '100%' id='example1' class='table table-bordered table-striped'>" +
                                      "<thead background-color='rgb(60, 141, 188)'>" +
                                          "<tr>" +
                                          "<th style = 'display:none' width  = '10%' >ID_Tickets</th>" +
                                           "<th width  = '10%' >SlNo</th>" +
                                          "<th width  = '20%' >Product</th>" +
                                          "<th width  = '10%' >Total</th>" +
                                          "<th width  = '10%' >Open</th>" +
                                          "<th width  = '10%' >Resolved</th>" +
                                           "<th width  = '10%' >Closed</th>" +
                                          "<th width  = '10%' >OverDue</th>" +
                                          "</tr>" +
                                      "</thead>";

                            $.each(Mydata, function (key, val) {
                                html += "<tr>" +

                                            "<td style = 'display:none'>" + val.ID_Tickets + "</td>" +
                                            "<td>" + val.SlNo + "</td>" +
                                            "<td><a href='#'>" + val.ProductName + "</a>" +
                                            "</td>" +
                                            "<td>" + val.TotalTickets + "</td>" +
                                            "<td>" + val.OpenedTickets + "</td>" +
                                            "<td>" + val.ResolvedTickets + "</td>" +
                                            "<td>" + val.ClosedTickets + "</td>" +
                                            "<td>" + val.ClientOverDueTickets + "</td>" +
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
                                        "<li><a href ='javascript:void(0)' onclick = 'objReport.SearchProductWiseTicket(1)' class= '" + (parseInt(PageIndex) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>First</a></li>" +
                                   "<li><a href ='javascript:void(0)'  onclick = 'objReport.SearchProductWiseTicket(" + (parseInt(i) - parseInt(10)) + ")'   class= '" + (parseInt(i) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>«</a></li>"
                                    while (parseInt(i) <= parseInt(pageCount)) {
                                        html += "<li><a href ='javascript:void(0)' onclick = 'objReport.SearchProductWiseTicket(" + i + ")'  class='" + (parseInt(i) != parseInt(PageIndex) ? "activeAnchor" : "not-activeAnchorSelected") + "'   >" + i + "</a></li>"
                                        if (parseInt(i) % parseInt(10) == 0) {
                                            break;
                                        }
                                        i++;
                                    }
                                    html += "<li><a href ='javascript:void(0)' onclick = 'objReport.SearchProductWiseTicket(" + (parseInt(i) + parseInt(1)) + ")'   class= '" + ((parseInt(pageCount) - parseInt(PageIndex)) > 10 ? "activeAnchor" : "not-activeAnchor") + " ' >»</a></li>" +
                                    "<li><a href ='javascript:void(0)' onclick = 'objReport.SearchProductWiseTicket(" + pageCount + ")'   class= '" + (parseInt(PageIndex) < parseInt(pageCount) ? "activeAnchor" : "not-activeAnchor") + "'>Last</a></li>" +
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



    this.CompareDate = function () {
      
        var selectedDate=$('#datepickerfrom').val();

        objReport.set(selectedDate);
      
   

    }

    this.Clear = function () {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();
        if (dd < 10) { dd = '0' + dd } if (mm < 10) { mm = '0' + mm } today = dd + '/' + mm + '/' + yyyy;

        $('#datepickerfrom').val(today);
        $('#datepickerto').val(today);
        //$('#datepickerto').('value', today);
        $("#datepickerfrom").removeClass("validateerror");
        $("#datepickerto").removeClass("validateerror");
        $('#ddlStatus').val(0);
        $('#ddlClient').val(0);
        $('#ddlProduct').val(0);
        $('#ddlAgent').val(0);
        $("#divView").hide();
        $('#ddlClient').val("0");
        $('#ddlProductOnly').val("0");
        $("#select2-ddlProductOnly-container").text("All");
        $("#select2-ddlClient-container").text("All");
        $("#select2-ddlAgent-container").text("All");
        isValidation = 0;
    };

   
    this.set = function (selectedDate) {
      
        $("#datepickerto").datepicker("option", "startDate", selectedDate);
    };





}