﻿
var ObjAgent = new Agent();
var isValidation = 0;
function Agent() {

    this.init = function () {

        try {
            this.Show(1);
            this.Clear();
            this.FillAgentGroupDropdown();
            this.FillTeamDropdown();
            this.FillDepartmentDropdown();
            this.FillGrid();
            this.FillDepartmentMultipleDropdown();
  
        }
        catch (ex) {
            alert(ex + 'Initialize Agent')
        }
    };


    this.Clear = function () {

        $('#AgentId').val("");
        $('#txtAgentCode').val("");
        $("#txtAgentCode").removeClass("validateerror");
        $('#txtAgentName').val("");
        $('#txtImgNameTemp').val("");
        $('#fileUpload').val("");
        $('#ImageAgent').attr('src', '../Images/avatar_default.png');
       
        $("#txtAgentName").removeClass("validateerror");
        $('#txtAgentMobile').val("");
        $("#txtAgentMobile").removeClass("validateerror");
        $('#txtAgentEmailId').val("");
        $("#txtAgentEmailId").removeClass("validateerror");
        $('#txtAgentUserName').val("");
        $("#txtAgentUserName").removeClass("validateerror");
        $('#txtAgentPassword').val("");
        $("#txtAgentPassword").removeClass("validateerror");
        $('#ddlDepartment').val(0);
        $("#ddlDepartment").removeClass("validateerror");
        $('#ddlmultiDepartment').val("0");
        $('#ddlTeam').val(0);
        $("#ddlTeam").removeClass("validateerror");
        $('#ddlAgentGroup').val(0);
        $("#ddlAgentGroup").removeClass("validateerror");
        $('#txtAgentSortOrder').val("");
        $("#txtAgentSortOrder").removeClass("validateerror");
        $('#chkActive').prop("checked", true);
        $('#chkManager').prop("checked", false);
        $('#chkTeamLead').prop("checked", false);
        $('#chkAdministrator').prop("checked", false);
        $("#txtAgentPassword").removeAttr("disabled");
        var $Multi = $("#ddlmultiDepartment.form-control").select2();
        $Multi.val('').trigger("change");


        document.getElementById('btnRemove').style.display = "none";
        document.getElementById('fileUpload').style.display = "block";
        isValidation = 0;
    };


    this.Show = function (id) {

        if (id == 1) {
            $("#AddAgent").hide();
            $("#ViewAgent").show();

        }
        else {
            $("#ViewAgent").hide();
            $("#AddAgent").show();

        }
    };
    this.Validate = function () {

        if (isValidation == 1) {
            var _Error = 0;
          
            if ($('#txtAgentCode').val().trim() == "") {
                $('#txtAgentCode').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtAgentCode').removeClass("validateerror");
            }

            if ($('#txtAgentName').val().trim() == "") {
                $('#txtAgentName').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtAgentName').removeClass("validateerror");
            }

            if ($('#txtAgentMobile').val() == "" || CheckMobileNumberSubmit('txtAgentMobile') ) {
                $('#txtAgentMobile').addClass("validateerror");
                _Error++;
              
            }
            else {
                $('#txtAgentMobile').removeClass("validateerror");
            }

            if ($('#txtAgentEmailId').val() == "" || CheckEmailSubmit('txtAgentEmailId')) {
                $('#txtAgentEmailId').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtAgentEmailId').removeClass("validateerror");
            }

            if ($('#txtAgentUserName').val().trim() == "") {
                $('#txtAgentUserName').addClass("validateerror");
                _Error++;
            }
            else {
                $('#txtAgentUserName').removeClass("validateerror");
            }

            if ($('#AgentId').val() == '' || $('#AdminId').val()==1) {

                if ($('#txtAgentPassword').val() == "" || CheckPasswordSubmit('txtAgentPassword')) {
                    $('#txtAgentPassword').addClass("validateerror");
                    _Error++;
                 
                }
                else {
                    $('#txtAgentPassword').removeClass("validateerror");
                }
            }


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
            if ($('#ddlAgentGroup option:selected').val() == '0') {
                $('#ddlAgentGroup').addClass("validateerror");
                _Error++;
            }
            else {
                $('#ddlAgentGroup').removeClass("validateerror");
            }
           

            return _Error;
        }

    }

    this.Submit = function () {
        isValidation = 1;
        if (this.Validate() <= 0) {
            ObjAgent.Save();
        }
        else {

            return false;
        }
    };


    this.Save = function () {
        try {
            var e = document.getElementById("ddlmultiDepartment");
            var MulDep = "";
            if (e.selectedOptions.length > 0) {
                MulDep += "<root>";
                for (var i = 0; i < e.selectedOptions.length; i++) {
                    MulDep += "<Department>";
                    MulDep += "<ID_Department>";
                    MulDep += e.selectedOptions[i].value;
                    MulDep += "</ID_Department>";
                    MulDep += "</Department>";
                }
                MulDep += "</root>";

            }
            
            var ObjBlAgent = {
                MasterID: $('#AgentId').val() == '' ? '0' : $('#AgentId').val(),
                ImageName: $('#txtImgNameTemp').val().trim(),
                AgCode: $('#txtAgentCode').val().trim(),
                AgName: $('#txtAgentName').val().trim(),
                AgMob: $('#txtAgentMobile').val(),
                Agemail: $('#txtAgentEmailId').val(),
                AgUserName: $('#txtAgentUserName').val().trim(),
                AgPassword: $('#txtAgentPassword').val(),
                FK_Department: $('#ddlDepartment option:selected').val(),
                FK_Team: $('#ddlTeam option:selected').val(),
                FK_AgentGroup: $('#ddlAgentGroup option:selected').val(),
                SortOrder: $('#txtAgentSortOrder').val(),
                Active: $('#chkActive').is(":checked"),
                Administrator: $('#chkAdministrator').is(":checked"),
                Manager: $('#chkManager').is(":checked"),
                TeamLead: $('#chkTeamLead').is(":checked"),
                XMLDepartment: MulDep
            };
            
            var DATA = JSON.stringify(ObjBlAgent);
            $.ajax({
                url: api_url + '/Recruiters/UpdateAgent',
                cache: false,
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                data: DATA,
                dataType: 'json',
                success: function (data) {
                    try {
                        if (data.statusCode > 0) {
                            if ($('#AgentId').val() == '' ? '0' : $('#AgentId').val() == 0) {
                                MessageText(data.statusCode, 'Saved Successfully', '#txtAgentCode');
                            }
                            else {
                                MessageText(data.statusCode, 'Updated Successfully', '#txtAgentCode');
                            }

                            ObjAgent.init();
                        }
                        else {
                            MessageText(data.statusCode, '', '#txtAgentCode');
                        }
                    }
                    catch (ex) {
                        alert(ex + 'return issue');
                    }
                },
                error: function (error) {
                    alert(error + ' : UpdateAgent');

                }

            });
        }
        catch (e) {
            alert(e + '   : /Recruiters/UpdateAgent');
        }




    }

    this.FillTeamDropdown = function () {
        try {
            $.ajax({
                
                url: api_url + '/Recruiters/TeamDropDownFill',
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
                url: api_url + '/Recruiters/DepartmentDropDownFill',
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



    this.FillAgentGroupDropdown = function () {
        try {
            $.ajax({

                url: api_url + '/Recruiters/AgentGroupDropDownFill',
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
                                optionhtml += '<option value=' + value.ID_AgentGroup + '>' + value.AggName + '</option>';
                            });
                        }
                        catch (exx) {
                            alert(exx);
                        }
                    }
                    $('#ddlAgentGroup').html(optionhtml);
                },

                error: function (xhr, status, error) {
                    var err = eval('(' + xhr.responseText + ')');
                    alert(err.Message);
                }

            });
        }
        catch (ex) {
            alert(ex + ' Exception FillAgentGroupDropdown');
        }
    }


    this.FillGrid = function (PageIndex) {

        try {
            $.ajax({
                url: api_url + "/Recruiters/SelectAgentAll",
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
                                          "<th style = 'display:none' width  = '10%' >ID_Agent</th>" +
                                          "<th style = 'display:none' width  = '10%' >ID_Department</th>" +
                                          "<th style = 'display:none' width  = '10%' >ID_Team</th>"+
                                           "<th width  = '20%' >SlNo</th>" +
                                          "<th width  = '20%' >Code</th>" +
                                          "<th width  = '25%' >Name</th>" +
                                          "<th width  = '15%' >Department</th>" +
                                          "</tr>" +
                                      "</thead>";

                            $.each(Mydata, function (key, val) {
                                var htmlActionTd = "<td>" +
                                                   "<a href ='javascript:void(0)' onclick = 'ObjAgent.FillAgent(" + val.ID_Agent + ")' class='edit'><i class='glyphicon glyphicon-edit'></i>" + "</a>" +
                                                   "<a href ='javascript:void(0)' onclick = 'ObjAgent.DeleteAgent(" + val.ID_Agent + ")' class='remove'><i class='glyphicon glyphicon-trash'></i>" + "</a>" +
                                                   "</td>";
                                html += "<tr>" +

                                            "<td style = 'display:none'>" + val.ID_Agent + "</td>" +
                                            "<td style = 'display:none'>" + val.FK_Department + "</td>" +
                                            "<td style = 'display:none'>" + val.FK_Team + "</td>"+
                                            "<td>" + val.SlNo + "</td>" +
                                            "<td>" + val.AgCode + "</td>" +
                                            "<td>" + val.AgName + "</td>" +
                                            "<td>" + val.DepName + "</td>" +
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
                                        "<li><a href ='javascript:void(0)' onclick = 'ObjAgent.FillGrid(1)' class= '" + (parseInt(PageIndex) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>First</a></li>" +
                                   "<li><a href ='javascript:void(0)'  onclick = 'ObjAgent.FillGrid(" + (parseInt(i) - parseInt(10)) + ")'   class= '" + (parseInt(i) > parseInt(1) ? "activeAnchor" : "not-activeAnchor") + " '>«</a></li>"
                                    while (parseInt(i) <= parseInt(pageCount)) {
                                        html += "<li><a href ='javascript:void(0)' onclick = 'ObjAgent.FillGrid(" + i + ")'  class='" + (parseInt(i) != parseInt(PageIndex) ? "activeAnchor" : "not-activeAnchorSelected") + "'   >" + i + "</a></li>"
                                        if (parseInt(i) % parseInt(10) == 0) {
                                            break;
                                        }
                                        i++;
                                    }
                                    html += "<li><a href ='javascript:void(0)' onclick = 'ObjAgent.FillGrid(" + (parseInt(i) + parseInt(1)) + ")'   class= '" + ((parseInt(pageCount) - parseInt(PageIndex)) > 10 ? "activeAnchor" : "not-activeAnchor") + " ' >»</a></li>" +
                                    "<li><a href ='javascript:void(0)' onclick = 'ObjAgent.FillGrid(" + pageCount + ")'   class= '" + (parseInt(PageIndex) < parseInt(pageCount) ? "activeAnchor" : "not-activeAnchor") + "'>Last</a></li>" +
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


    this.FillAgent = function (ID_Agent) {
        $.ajax({
            url: api_url + "/Recruiters/FillAgent",
            data: { 'ID_Agent': ID_Agent },
            cache: false,
            type: 'Get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                try {
                    var Mydata = JSON.parse(data.table);
                    if (Mydata.length > 0) {
                        $.each(Mydata, function (key, value) {
                           
                            var ObjBlAgent = value;
                            $('#AgentId').val(ObjBlAgent.ID_Agent);
                            $('#AdminId').val(ObjBlAgent.adminbit);
                            $('#txtImgNameTemp').val(ObjBlAgent.ImageName);
                            $('#ImageAgent').attr('src', ObjBlAgent.FullImage);
                            $('#txtAgentCode').val(ObjBlAgent.AgCode);
                            $('#txtAgentName').val(ObjBlAgent.AgName);
                            $('#txtAgentMobile').val(ObjBlAgent.AgMob);
                            $('#txtAgentEmailId').val(ObjBlAgent.Agemail);
                            $('#txtAgentUserName').val(ObjBlAgent.AgUserName);
                            $('#txtAgentPassword').val(ObjBlAgent.AgPassword);
                            $('#ddlDepartment').val(ObjBlAgent.FK_Department);
                            $('#ddlTeam').val(ObjBlAgent.FK_Team);
                            $('#ddlAgentGroup').val(ObjBlAgent.FK_AgentGroup);
                            $('#txtAgentSortOrder').val(ObjBlAgent.SortOrder);
                          
                            if (ObjBlAgent.ImageName != null ) {
                                document.getElementById('btnRemove').style.display = "block";
                                document.getElementById('fileUpload').style.display = "none";
                            }
                            else {
                                document.getElementById('btnRemove').style.display = "none";
                                document.getElementById('fileUpload').style.display = "block";
                            }
                            
                            if (ObjBlAgent.Active == true) {
                                $('#chkActive').prop("checked", true);
                            }
                            else {
                                $('#chkActive').prop("checked", false);
                            }
                            if (ObjBlAgent.Administrator == true) {
                                $('#chkAdministrator').prop("checked", true);
                            }
                            else {
                                $('#chkAdministrator').prop("checked", false);
                            }
                            if (ObjBlAgent.Manager == true) {
                                $('#chkManager').prop("checked", true);
                            }
                            else {
                                $('#chkManager').prop("checked", false);
                            }
                            if (ObjBlAgent.TeamLead == true) {
                                $('#chkTeamLead').prop("checked", true);
                            }
                            else {
                                $('#chkTeamLead').prop("checked", false);
                            }
                            if (ObjBlAgent.adminbit == 0) {
                                $("#txtAgentPassword").attr("disabled", "disabled");
                            }
                        }
                        )
                       


                        var MyDepartment = JSON.parse(data.table1);
                        var options = '';
                        var arraytest = [];
                        if (MyDepartment.length > 0) {
                            var i = 0;
                            $.each(MyDepartment, function (key, value) {
                                arraytest[i] = value.FK_Department;
                                i++;
                            }
                            )
                        }
                        var $Multi = $("#ddlmultiDepartment.form-control").select2();
                        $Multi.val(arraytest).trigger("change");


                    };
                    ObjAgent.Show(2);
                }
                catch (e) {
                    alert(e + 'FillAgent');
                }

            }
        });

    }

    this.DeleteAgent = function (ID_Agent) {
        if (confirm('Do you want to delete..?')) {
            $.ajax({
                url: api_url + "/Recruiters/DeleteAgent",
                data: { 'ID_Agent': ID_Agent },
                cache: false,
                type: 'Get',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    if (data.statusCode > 0) {
                        MessageText(data.statusCode, 'Deleted Successfully', '#txtAgentCode');
                    }
                    else {
                        MessageText(data.statusCode, '', '#txtAgentCode');
                    }
                    ObjAgent.init();


                }
            });
        }


    }

    this.UploadImg = function () {
        try{
            var data = new FormData();
            var files = $("#fileUpload").get(0).files;
            if (files.length > 0) {
                data.append("MyImages", files[0]);
                document.getElementById('btnRemove').style.display = "block";
                document.getElementById('fileUpload').style.display = "none";
            }
            $.ajax({
                url: api_url + '/Recruiters/UploadFile',
                type: "POST",
                processData: false,
                contentType: false,
                data: data,
                success: function (response) {
                    //code after success
                    if (response != '') {
                        $("#txtImgNameTemp").val(response);
                        $("#ImageAgent").attr('src', '../UploadedImages/AgentUpload/' + response);
                    }
                    else {
                        //$("#txtImgNameTemp").val(response);
                       
                        $("#ImageAgent").attr('src', '../Images/avatar_default.png');
                        document.getElementById('btnRemove').style.display = "none";
                        document.getElementById('fileUpload').style.display = "block";
                        $('#fileUpload').val("");
                        MessageText('-32', '', '#fileUpload');
                    }
                },
                error: function (er) {
                    $("#ImageAgent").attr('src', '../Images/avatar_default.png');
                    document.getElementById('btnRemove').style.display = "none";
                    document.getElementById('fileUpload').style.display = "block";
                    $('#fileUpload').val("");
                    MessageText('-32', '', '#fileUpload');
                }

            });
        }
        catch (ex)
        {

            alert(ex + ': UploadImg');
            $("#ImageAgent").attr('src', '../Images/avatar_default.png');
            document.getElementById('btnRemove').style.display = "none";
            document.getElementById('fileUpload').style.display = "block";
            $('#fileUpload').val("");
        }
    }

    this.Remove = function () {
        var data = new FormData();
        var files = $("#fileUpload").get(0).files;
            $('#txtImgNameTemp').val("");
            $('#fileUpload').val("");
            $('#ImageAgent').attr('src', '../Images/avatar_default.png');
            document.getElementById('btnRemove').style.display = "none";
            document.getElementById('fileUpload').style.display = "block";
    }

    this.FillDepartmentMultipleDropdown = function () {
       
        try {
            $.ajax({

                url: api_url + '/Recruiters/DeparmentDropDownFill',
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
                                optionhtml += '<option value=' + value.ID_Department + '>' + value.DepName + '</option>';
                            });
                        }
                        catch (exx) {
                            alert(exx);
                        }
                    }
                    $('#ddlmultiDepartment').html(optionhtml);
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



}