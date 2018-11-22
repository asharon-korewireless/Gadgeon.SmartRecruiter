﻿
var ObjMenu = new Menu();
var isValidation = 0;
function Menu() {

    this.init = function () {
        try {           
            this.CallMenu();
            this.UserData();
          //  this.GetPostreplayCount();
        }
        catch (ex) {
            alert(ex + 'Initialize Menu')
        }
    };


    this.CallMenu = function () {
        try {
            $.ajax({
                url: api_url + '/Partial/FillMenu',
                cache: false,
                type: "GET",
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    $('#divFillMenu').html(data.statusCode);
                    $('#Notification').html(data.Notification);
                    $('#spanAgNameRight').html(data.statusCodeAgent);
                    $('#strongAgNameRight').html(data.statusCodeAgent);
                    $('#strongAgNameLeft').html(data.statusCodeAgent);
                    
                    var Mydata = JSON.parse(data.table);
                    
                    if (Mydata.length > 0) {
                       $.each(Mydata, function (key, value) {                                             
                           var namendep = Mydata[0].DepCode;
                           $('#dep').html(namendep);
                           var affiliateCode = Mydata[0].FullImage;

                           $('#pixel').attr('src', $('#pixel').attr('src') + affiliateCode);
                           $('#pixel1').attr('src', $('#pixel1').attr('src') + affiliateCode);
                           $('#pixel2').attr('src', $('#pixel2').attr('src') + affiliateCode);

                        
                                });

                    }
                   
                },
                error: function (MenuHtml) {
                    alert(MenuHtml.d + ': CallMenu');
                    //alert('webservice_error');
                }
            });
        }
        catch (ex) {
            alert(ex);
        }
    }


    this.UserData = function (api_url) {       
        try {          
            $.ajax({
                url: api_url + '/Partial/PostreplayCount',
                cache: false,
                type: "GET",
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: function (data) {                    
                    var Mydata = JSON.parse(data);
                    if (Mydata[0].ID_Users > 0) {                    
                        $('#UsName').html(Mydata[0].UsName);
                        $('#UsNamedd').html(Mydata[0].UsName);
                        $('#Mob').html(Mydata[0].UsMob);
                        var affiliateCode = Mydata[0].FullImage;
                        $('#userpic').attr('src', $('#userpic').attr('src') + affiliateCode);
                        $('#userpic1').attr('src', $('#userpic1').attr('src') + affiliateCode);
                    }
                },
                error: function (MenuHtml) {
                    alert(UserDataHtml.d + ': UserData');
                    //alert('webservice_error');
                }
            });
        }
        catch (ex) {
            alert(ex);
        }
    }

    this.GetPostreplayCount = function (api_url) {
        try {         
            $.ajax({
                url: api_url + '/Partial/PostreplayCount',
                cache: false,
                type: "GET",
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: function (data) {                                                                           
                    var Mydata = JSON.parse(data);                   
                    if (Mydata[0].ReplayCount > 0) {
                        $('#SpnUserTickCount').html(Mydata[0].ReplayCount);
                        $('#SpnTickCountTitile').html(Mydata[0].ReplayCount);                        
                    }
                },
                error: function (MenuHtml) {
                    alert(MenuHtml.d + ': Error GetPostreplayCount');
                    //alert('webservice_error');
                }
            }); 
        }
        catch (ex) {
            alert(ex);
        }
    }





    this.CheckResolution = function () {
        var width = screen.width;
        var height = screen.height;
                    if (width > 1600) {         
                        var isChrome = !!window.chrome && !!window.chrome.webstore;
                        var isIE = /*@cc_on!@*/false || !!document.documentMode;
                        var isFirefox = typeof InstallTrigger !== 'undefined';

                        if (isChrome == true) {                  
                                                $('body').css('zoom', '1.2'); //chrome
                                                }                    
                        else if (isFirefox == true)
                                                {
                 
                                                var currFFZoom = 1;
                                                var currIEZoom = 120;
                                                step = 0.05;
                                                currFFZoom += step;
                                                jQuery('body').css('MozTransform', 'scale(' + currFFZoom + ',' + currFFZoom + ')');
                                                jQuery('body').css('transform-origin', '0 0');
                                                }
                        else {
                           

                                             }       
                                        }               

    }


}