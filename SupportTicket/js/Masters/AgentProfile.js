﻿
var ObjAgentProfile = new AgentProfile();
var isValidation = 0;
function AgentProfile() {

    this.init = function () {
        try {
            this.FillAgentProfile();
           
        }
        catch (ex) {
            alert(ex + 'Initialize FillAgentProfile')
        }
    };


    this.FillAgentProfile = function () {
        $.ajax({
            url: api_url + "/Partial/FillMenu",
            cache: false,
            type: 'Get',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
               
                try {
                    var Mydata = JSON.parse(data.table);
                    if (Mydata.length > 0) {
                        $.each(Mydata, function (key, value) {
                           // var ObjBlTopic = value;
                            $('#AgprofileCode').val(Mydata[0].AgCode);
                            $('#AgprofileName').val(Mydata[0].AgentName);
                            $('#AgentMobile').val(Mydata[0].AgMob);
                            $('#AgentEmail').val(Mydata[0].Agemail);
                            $('#AgDepartment').val(Mydata[0].DepName);
                            $('#AgTeam').val(Mydata[0].TeamName);
                            $("#AgprofileCode").attr('disabled', 'disabled');
                            $("#AgprofileName").attr('disabled', 'disabled');
                            $("#AgentMobile").attr('disabled', 'disabled');
                            $("#AgentEmail").attr('disabled', 'disabled');
                            $("#AgDepartment").attr('disabled', 'disabled');
                            $("#AgTeam").attr('disabled', 'disabled');
                            var affiliateCode = Mydata[0].FullImage;
                            
                            $('#pixelpro').attr('src', $('#pixelpro').attr('src') + affiliateCode);
                        }
                        )
                    };
                   
                }
                catch (e) {
                    alert(e + 'FillAgentProfile');
                }

            }
        });

    }


}