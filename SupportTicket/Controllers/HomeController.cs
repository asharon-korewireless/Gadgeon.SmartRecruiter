﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using System.Collections;

using SupportTicket.Business;
using SupportTicket.Business.Masters;
using SupportTicket.Interface.Masters;
using SupportTicket.Filters;

namespace SupportTicket.Controllers
{
    
    public class HomeController : Controller
    {
        public HomeController()
        {

            ViewBag.api_url = ConfigurationManager.AppSettings["api-url"];


        }
     
        public ActionResult RecruitersLogin()
        {
            ViewBag.Message = "Default page.";

            return View();
        }

      
      
        public ActionResult UserLogin()
        {
            return View();
        }
     

        public ActionResult LogOut()
        {
            Session.Abandon();
            return Redirect("~/Home/RecruitersLogin");
        }





        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Default()
        {
            ViewBag.Message = "Default page.";

            return View();
        }
        public ActionResult LogOunt()
        {
            return View();
        }
     
       [HttpPost]
        public JsonResult AgentloginCheck(BlAgent ObjBlAgent)
        {
            try
            {              

                BlFunction blfunctions = new BlFunction();
                string AgentPassword = "";
                AgentPassword = blfunctions.EncryptAgent(Convert.ToString(ObjBlAgent.AgPassword.Trim()));
                ObjBlAgent.AgPassword = AgentPassword;


                ArrayList arrlist = ObjBlAgent.ValidLogin();
                blfunctions = null;
                ObjBlAgent = null;


                if (arrlist.Count > 0)
                {                   
                    Session["ID_Agent"] = arrlist[0].ToString();
                    Session["ID_Company"] = arrlist[1].ToString();
                    Session["AgName"] = arrlist[3].ToString();
                    if (Session["ID_Agent"] != null && Convert.ToString(Session["ID_Agent"]) != "" &&
                        Session["ID_Company"] != null && Convert.ToString(Session["ID_Company"]) != "")
                    {

                        return Json(new { Url = Url.Action("RecruitersDashboard", "Recruiters"), statusCode = 1 }, JsonRequestBehavior.AllowGet);

                    }
                    else
                    {

                        return Json(new { Url = Url.Action("RecruitersLogin", "Home"), statusCode = 2 }, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {

                    return Json(new { Url = Url.Action("RecruitersLogin", "Home"), statusCode = 2 }, JsonRequestBehavior.AllowGet);
                }
               
            }
            catch (Exception ex)
            {
               
                return Json(ex);
            }
        }      
       [HttpPost]
       public JsonResult UserLoginCheck(BlUser ObjBlUser)
       {
           try
           {
               BlFunction blfunctions = new BlFunction();
               string UserPassword = "";
               UserPassword = blfunctions.EncryptAgent(Convert.ToString(ObjBlUser.UsPassword.Trim()));
               ObjBlUser.UsPassword = UserPassword;


               ArrayList arrlist = ObjBlUser.ValidLogin();
               blfunctions = null;
               ObjBlUser = null;


               if (arrlist.Count > 0)
               {
                
                   Session["ID_Users"] = arrlist[0].ToString();
                   Session["ID_Company"] = arrlist[1].ToString();
                   Session["UsName"] = arrlist[3].ToString();
                   //ViewData["ReplayCount"] = arrlist[6].ToString();                    
                   if (Session["ID_Users"] != null && Convert.ToString(Session["ID_Users"]) != "" &&
                       Session["ID_Company"] != null && Convert.ToString(Session["ID_Company"]) != "")
                   {

                       return Json(new { Url = Url.Action("UserDashboard", "UserDashboard"), statusCode = 1 }, JsonRequestBehavior.AllowGet);

                   }
                   else
                   {

                       return Json(new { Url = Url.Action("UserLogin", "Home"), statusCode = 2 }, JsonRequestBehavior.AllowGet);
                   }
               }
               else
               {

                   return Json(new { Url = Url.Action("UserLogin", "Home"), statusCode = 2 }, JsonRequestBehavior.AllowGet);
               }

           }
           catch (Exception ex)
           {
               return Json(ex);
           }


       }




    }
}
