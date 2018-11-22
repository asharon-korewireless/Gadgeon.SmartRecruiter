﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using SupportTicket.Business;
using SupportTicket.Interface;

using SupportTicket.Business.Masters;
using SupportTicket.Interface.Masters;
using System.Text;
using System.Configuration;
using SupportTicket.Models;
using SupportTicket.Filters;
using System.IO;
using System.Web.Helpers;


namespace SupportTicket.Controllers
{
    [CheckSessionTimeOutUser]
    public class UserRegisterController : Controller
    {
        //
        // GET: /User/
        public static string attname;
        public UserRegisterController()
        {
            ViewBag.api_url = ConfigurationManager.AppSettings["api-url"];
           // ViewData["Xml"] = "";
        }
        public ActionResult UserRegister(int Status=0,int createlink=0)
        {
            ViewBag.createlink = createlink;
            ViewData["Status"] = Status;
            return View();
        }
        

        
        [HttpPost]
        public ActionResult UploadAction()
        {

            attname = "";

            try
            {
                string _imgname = string.Empty;
                if (System.Web.HttpContext.Current.Request.Files.AllKeys.Any())
                {
                    attname += "<root>";
                    int a = System.Web.HttpContext.Current.Request.Files.Count;
                    for (int i = 0; i < a; i++)
                    {
                        var pic = System.Web.HttpContext.Current.Request.Files["MyImages" + i];
                        if (pic.ContentLength > 0)
                        {
                            var fileName = Path.GetFileName(pic.FileName);
                            //var _ext = Path.GetExtension(pic.FileName);
                            _imgname = "TKT_" + DateTime.Now.Ticks.ToString() + "_" + fileName;
                            var _comPath = Server.MapPath("~/UploadedAttachments/") + _imgname;                         
                          //  _imgname = DateTime.Now.Ticks.ToString() + fileName;   
                            pic.SaveAs(_comPath);                        

                            attname += "<UserTicketsAttachments>";
                            attname += "<AttachmentName>" + _imgname + "</AttachmentName>";
                            attname += "</UserTicketsAttachments>";
                        }
                    }
                    attname += "</root>";
                }
                return Json(Convert.ToString(attname), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(Convert.ToString(ex), JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public ActionResult Remove()
        {

            attname = "0";


            return Json(new { statusCode = "" + attname + "" }, JsonRequestBehavior.AllowGet);
            
        }

        [HttpGet]
        public JsonResult GetTicketDetails(Int64 FK_Tickets)
        {
            try
            {

                int statusCode = 1;
                DataTable dtbl = new DataTable();
                BlUserTickets blusertickets = new BlUserTickets();
                blusertickets.UserCode = Convert.ToInt64(Session["ID_Users"]);
                blusertickets.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                blusertickets.MasterID = Convert.ToInt64(FK_Tickets);
                dtbl = blusertickets.SelectGetTicketDetails();
                return Json(Converttojson(dtbl), JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                ///
                return Json(ex);
            }

        }

        [HttpGet]
        public JsonResult SelectAllTickets(string PageIndex = "1", string Status = "0", string SearchItem = "")
        {
            try
            {
                
                int statusCode = 1;
                DataTable dtbl = new DataTable();
                BlUserTickets blusertickets = new BlUserTickets();
                blusertickets.UserCode = Convert.ToInt64(Session["ID_Users"]);
                blusertickets.FK_Company = Convert.ToInt64(Session["ID_Company"]);

                blusertickets.TickNo = SearchItem;
                blusertickets.TickSubject = SearchItem;
                blusertickets.ProdName = SearchItem;


                blusertickets.TickStatus = Convert.ToInt16(Status);
                blusertickets.PageIndex = Convert.ToInt32(PageIndex);
                dtbl = blusertickets.SelectAllData();
                return Json(Converttojson(dtbl), JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                ///
                return Json(ex);
            }

        }

        [HttpGet]
        public JsonResult AutoGenTktNo()
        {
            try
            {
                DataTable dt = new DataTable();
                BlUserTickets blUserTickets = new BlUserTickets();
                blUserTickets.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                blUserTickets.FK_Company = Convert.ToInt64(Session["ID_Company"]);

                dt = blUserTickets.AutoGenTktNo();
                return Json(Converttojson(dt), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }


        [HttpPost]
        public JsonResult ProductDropDownFill()
        {
            try
            {

                int statusCode = 1;
                BlPopulate blpopulate = new BlPopulate();
                blpopulate.TableName = "Product P LEFT JOIN ClientDetails CD ON CD.FK_Product=P.ID_Product LEFT JOIN Client C ON C.ID_Client=CD.FK_Client LEFT JOIN Users U ON U.FK_Client=C.ID_Client";
                blpopulate.ListFields = "P.ProdName";
                blpopulate.ValueFields = "P.ID_Product";
                blpopulate.SortFields = "P.ProdName,P.ID_Product";
                blpopulate.Criteria = "U.Cancelled=0 AND P.Cancelled=0 AND CD.Cancelled=0 AND P.Active=1 AND C.Cancelled=0 AND U.ID_Users=" + Session["ID_Users"].ToString() + " AND U.FK_Company=" + Session["ID_Company"].ToString();
                DataTable dt = new DataTable();
                dt = blpopulate.PopulateData();
                return Json(Converttojson(dt), JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                ///
                return Json(ex);
            }

        }

        [HttpPost]
        public JsonResult TopicDropDownFill()
        {
            try
            {

                int statusCode = 1;
                BlPopulate blpopulate = new BlPopulate();
                blpopulate.TableName = "Topic";
                blpopulate.ListFields = "TopicName";
                blpopulate.ValueFields = "ID_Topic";
                blpopulate.SortFields = "TopicName,ID_Topic";
                blpopulate.Criteria = "Cancelled=0 AND Active=1 AND FK_Company=" + Session["ID_Company"].ToString();
                DataTable dt = new DataTable();
                dt = blpopulate.PopulateData();
                return Json(Converttojson(dt), JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                ///
                return Json(ex);
            }

        }
        [HttpPost]
        public ActionResult UpdateUserTickets(BlUserTickets Objblusertickets)
        {
            if (Session["ID_Agent"] == "" || Session["ID_Agent"] == "null")
            {
                Session["ID_Agent"] = "0";
            }
            Objblusertickets.UserCode = Convert.ToInt64(Session["ID_Users"]);
            Objblusertickets.FK_Company = Convert.ToInt64(Session["ID_Company"]);
            Objblusertickets.AgentCode = Convert.ToInt64(Session["ID_Agent"]);
            Objblusertickets.XmlAttachment = attname;
            try
            {
                Objblusertickets.UserIPAddress = Request.ServerVariables["REMOTE_ADDR"];
            }
            catch (Exception ex)
            {
                Objblusertickets.UserIPAddress = ":01";
            }

            long statusCode = 0;
            if (Objblusertickets.MasterID > 0)
            {
                statusCode = Objblusertickets.UpdateDescriptionData();
            }
            Objblusertickets = null;
            attname = "";
            return Json(new { statusCode = "" + statusCode + "" }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult UpdateTickets(BlUserTickets Objblusertickets)
        {
            if (Session["ID_Agent"] == "" || Session["ID_Agent"] == "null")
            {
                Session["ID_Agent"] = "0";
            }
            Objblusertickets.UserCode = Convert.ToInt64(Session["ID_Users"]);
            Objblusertickets.FK_Company = Convert.ToInt64(Session["ID_Company"]);
            Objblusertickets.AgentCode = Convert.ToInt64(Session["ID_Agent"]);
            Objblusertickets.XmlAttachment = attname;
            try
            {
                Objblusertickets.UserIPAddress = Request.ServerVariables["REMOTE_ADDR"];
            }
            catch (Exception ex)
            {
                Objblusertickets.UserIPAddress = ":01";
            }

            long statusCode = 0;
            if (Objblusertickets.MasterID == 0)
            {
                statusCode = Objblusertickets.InsertData();
            }
            else
            {
                statusCode = Objblusertickets.UpdateData();
            }

            Objblusertickets = null;
            attname = "";
            return Json(new { statusCode = "" + statusCode + "" }, JsonRequestBehavior.AllowGet);
        }


        public string Converttojson(DataTable table)
        {
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            foreach (DataRow dr in table.Rows)
            {
                row = new Dictionary<string, object>();
                foreach (DataColumn col in table.Columns)
                {
                    row.Add(col.ColumnName, dr[col]);
                }
                rows.Add(row);
            }
            return serializer.Serialize(rows);

        }



    }
}
