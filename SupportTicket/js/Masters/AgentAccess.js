﻿var ObjAgentAccess = new AgentAccess();
var isValidation = 0;
function AgentAccess() {

    this.init = function () {

        try {
            this.Show(1);
            this.Clear();
            this.FillAgentDropdown();
            this.FillGrid();
           
           


        }
        catch (ex) {
            alert(ex + 'Initialize Agent Access')
        }
    };
    this.checkboxAllcheck = function () {
        try
        {
            setTimeout(function () {
                ObjAgentAccess.CheckAllAdd();
                ObjAgentAccess.CheckAllUpdate();
                ObjAgentAccess.CheckAllDelete();
                ObjAgentAccess.CheckAllView();
            }, 1000);
        }
        catch (ex)
        {
            alert(ex + 'checkboxAllcheck')
        }
    };

    this.Clear = function () {
        $('#AgentAccessId').val("");
        $('#ddlAgent').val(0);
        $("#ddlAgent").removeClass("validateerror");
        $('[id*= checkAllAdd]').prop("checked", false);
        $('[id*= checkAllUpdate]').prop("checked", false);
        $('[id*= checkAllDelete]').prop("checked", false);
        $('[id*= checkAllView]').prop("checked", false);

        $('[id*= checkAdd]').prop("checked", false);
        $('[id*= checkUpdate]').prop("checked", false);
        $('[id*= checkDelete]').prop("checked", false);
        $('[id*= checkView]').prop("checked", false);
        isValidation = 0;
    };


    this.CheckAllAdd = function () {
        //alert('a');

        $('[id*= checkAllAdd]').bind('click', function () {
            if ($('[id*= checkAllAdd]').prop('checked') == true) {
                $('[id*= checkAdd]').prop('checked', true);
            }
            else {
                $('[id*= checkAdd]').prop('checked', false);
            }

        });
        $('[id*= checkAdd]').bind('click', function () {
            if ($(this).prop('checked') == false) {
                $('[id*= checkAllAdd]').prop('checked', false);
            }
            if ($('[id*= "checkAdd"]:checked').length == $('[id*= checkAdd]').length) {
                $('[id*= checkAllAdd]').prop('checked', true);
            }
        });
        if ($('[id*= "checkAdd"]:checked').length == $('[id*= checkAdd]').length) {
            $('[id*= checkAllAdd]').prop('checked', true);
        }
        else { $('[id*= checkAllAdd]').prop('checked', false); }
    };

    this.CheckAllUpdate = function () {
        //alert('a');

        $('[id*= checkAllUpdate]').bind('click', function () {
            if ($('[id*= checkAllUpdate]').prop('checked') == true) {
                $('[id*= checkUpdate]').prop('checked', true);
            }
            else {
                $('[id*= checkUpdate]').prop('checked', false);
            }

        });
        $('[id*= checkUpdate]').bind('click', function () {
            if ($(this).prop('checked') == false) {
                $('[id*= checkAllUpdate]').prop('checked', false);
            }
            if ($('[id*= "checkUpdate"]:checked').length == $('[id*= checkUpdate]').length) {
                $('[id*= checkAllUpdate]').prop('checked', true);
            }
        });
        if ($('[id*= "checkUpdate"]:checked').length == $('[id*= checkUpdate]').length) {
            $('[id*= checkAllUpdate]').prop('checked', true);
        }
        else { $('[id*= checkAllUpdate]').prop('checked', false); }
    };

    this.CheckAllDelete = function () {
        //alert('a');

        $('[id*= checkAllDelete]').bind('click', function () {
            if ($('[id*= checkAllDelete]').prop('checked') == true) {
                $('[id*= checkDelete]').prop('checked', true);
            }
            else {
                $('[id*= checkDelete]').prop('checked', false);
            }

        });
        $('[id*= checkDelete]').bind('click', function () {
            if ($(this).prop('checked') == false) {
                $('[id*= checkAllDelete]').prop('checked', false);
            }
            if ($('[id*= "checkDelete"]:checked').length == $('[id*= checkDelete]').length) {
                $('[id*= checkAllDelete]').prop('checked', true);
            }
        });
        if ($('[id*= "checkDelete"]:checked').length == $('[id*= checkDelete]').length) {
            $('[id*= checkAllDelete]').prop('checked', true);
        }
        else { $('[id*= checkAllDelete]').prop('checked', false); }
    };

    this.CheckAllView = function () {
        //alert('a');

        $('[id*= checkAllView]').bind('click', function () {
            if ($('[id*= checkAllView]').prop('checked') == true) {
                $('[id*= checkView]').prop('checked', true);
            }
            else {
                $('[id*= checkView]').prop('checked', false);
            }

        });
        $('[id*= checkView]').bind('click', function () {
            if ($(this).prop('checked') == false) {
                $('[id*= checkAllView]').prop('checked', false);
            }
            if ($('[id*= "checkView"]:checked').length == $('[id*= checkView]').length) {
                $('[id*= checkAllView]').prop('checked', true);
            }
        });
        if ($('[id*= "checkView"]:checked').length == $('[id*= checkView]').length) {
            $('[id*= checkAllView]').prop('checked', true);
        }
        else { $('[id*= checkAllView]').prop('checked', false); }
    };


    this.Show = function (id) {

        if (id == 1) {
            
            $("#AddAgentAccess").show();

        }
        else {
            $("#AddAgentAccess").hide();
            

        }
    };
    this.Validate = function () {
        if (isValidation == 1) {
            var _Error = 0;
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
            ObjAgentAccess.Save();
        }
        else {

            return false;
        }
    };


    this.Save = function () {
        try {
            var str = "";
            str += "<root>"
            $('#example1').find('tr').each(function () {
                var row = $(this);
                if (row[0].id != "headtr") {
                    str += "<AgentAccess>";
                    str += "<ID_Pages>" + row[0].cells[0].innerText + "</ID_Pages>";
                    str += "<Add>" + row.find('input[id = "checkAdd"]').is(':checked') + "</Add>";
                    str += "<Update>" + row.find('input[id = "checkUpdate"]').is(':checked') + "</Update>";
                    str += "<Delete>" + row.find('input[id = "checkDelete"]').is(':checked') + "</Delete>";
                    str += "<View>" + row.find('input[id = "checkView"]').is(':checked') + "</View>";
                    str += "</AgentAccess>";
                }
            });

            str += "</root>"
            var ObjBlAgentAccess = {
                MasterID: $('#AgentAccessId').val() == '' ? '0' : $('#AgentAccessId').val(),
                FK_Agent: $('#ddlAgent option:selected').val(),
                XmlAgentAccess: str
            };
            var DATA = JSON.stringify(ObjBlAgentAccess);
            $.ajax({
                url: api_url + '/RecruitersAccess/UpdateAgentAccess',
                cache: false,
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                data: DATA,
                dataType: 'json',
                success: function (data) {
                    try {
                        if (data.statusCode > 0) {
                            if ($('#AgentAccessId').val() == '' ? '0' : $('#AgentAccessId').val() == 0) {
                                MessageText(data.statusCode, 'Saved Successfully', '#ddlAgent');
                            }
                            else {
                                MessageText(data.statusCode, 'Updated Successfully', '#ddlAgent');
                            }

                            ObjAgentAccess.init();
                        }
                        else {
                            MessageText(data.statusCode, '', '#ddlAgent');
                        }
                    }
                    catch (ex) {
                        alert(ex + 'return issue');
                    }
                },
                error: function (error) {
                    alert(error + ' : UpdateAgentAccess');

                }

            });
        }
        catch (e) {
            alert(e + '   : /RecruitersAccess/UpdateAgentAccess');
        }




    }

    this.FillAgentDropdown = function () {
        try {
            $.ajax({
                
                url: api_url + '/RecruitersAccess/AgentDropDownFill',
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

 
  

    this.FillGrid = function (PageIndex) {
        try {
            $.ajax({
                url: api_url + "/RecruitersAccess/SelectPagesAll",
                cache: false,
                type: "GET",
                data: { 'PageIndex': PageIndex, 'FK_DropDownAgent': $('#ddlAgent option:selected').val() },
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
                                          "<tr id='headtr'>" +
                                          "<th style = 'display:none' width  = '10%' >ID_Pages</th>" +
                                           "<th width  = '10%' >SlNo</th>" +
                                          "<th width  = '20%' >PageName</th>" +
                                          "<th><input type='checkbox' id='checkAllAdd'   />  Add </th>" +
                                           "<th><input type='checkbox' id='checkAllUpdate'/>  Update </th>" +
                                          "<th><input type='checkbox' id='checkAllDelete' />  Delete </th>" +
                                          "<th><input type='checkbox' id='checkAllView' />  View </th>" +
                                          "</tr>" +
                                      "</thead>";

                            $.each(Mydata, function (key, val) {
                                var htmlActionTd = "<td>" +
                                                   "<input type ='checkbox' class='icheck' id = 'checkAdd' " + val.Add + ">" + "</input>" +
                                                   "</td>" +
                                                   "<td>" +
                                                   "<input type ='checkbox' class='icheck' id = 'checkUpdate' " + val.Update + ">" + "</input>" +
                                                   "</td>" +
                                                   "<td>" +
                                                   "<input type ='checkbox' class='icheck' id = 'checkDelete' " + val.Delete + ">" + "</input>" +
                                                   "</td>" +
                                                    "<td>" +
                                                   "<input type ='checkbox' class='icheck' id = 'checkView' " + val.View + ">" + "</input>" +
                                                   "</td>";
                                html += "<tr>" +

                                            "<td style = 'display:none' >" + val.ID_Pages+ "</td>" +
                                            "<td>" + val.SlNo + "</td>" +
                                            "<td>" + val.PageName+"(" +val.ModuleName +")</td>" +
                                            htmlActionTd +
                                            "</tr>";
                                RecordCount = val.RecordCount;

                            });


                            $("#Grid").html(html);
                        }
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
}