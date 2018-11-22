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

namespace SupportTicket.Controllers
{
    [CheckSessionTimeOut]
    public class ResumesController : Controller
    {
        //
        // GET: /Tickets/
        public static string attname;
        public ResumesController()
        {

            ViewBag.api_url = ConfigurationManager.AppSettings["api-url"];            

        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Resumes(int Status = 0, string ID_Resumes = "")
        {
            if (ID_Resumes != "")
            {
                //
                ViewData["Status"] = Status;
                return View();
               
            }
            else
            {
                ViewData["Status"] = Status;
                return View();
            }
            
        }
        [HttpPost]
        public JsonResult ProductDropDownFill()
        {
            try
            {

                int statusCode = 1;
                BlPopulate blpopulate = new BlPopulate();
                blpopulate.TableName = "Product";
                blpopulate.ListFields = "ProdName";
                blpopulate.ValueFields = "ID_Product";
                blpopulate.SortFields = "ProdName,ID_Product";
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
        public JsonResult StatusDropDownFill()
        {
            try
            {

                int statusCode = 1;
                BlPopulate blpopulate = new BlPopulate();
                blpopulate.TableName = "Status";
                blpopulate.ListFields = "StatusName";
                blpopulate.ValueFields = "ID_Status";
                blpopulate.SortFields = "SortOrder,StatusName,ID_Status";
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
        public JsonResult ClientDropDownFill()
        {
            try
            {
                int statusCode = 1;
                BlPopulate blpopulate = new BlPopulate();
                blpopulate.TableName = "Client";
                blpopulate.ListFields = "CliName";
                blpopulate.ValueFields = "ID_Client";
                blpopulate.SortFields = "CliName,ID_Client";
                blpopulate.Criteria = "Cancelled=0 AND Active=1  AND FK_Company=" + Session["ID_Company"].ToString();
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
        //[HttpPost]
        //public ActionResult Tickets(IEnumerable<HttpPostedFileBase> files)
        //{
        //    foreach (var file in files)
        //    {
        //        if (file != null && file.ContentLength > 0)
        //        {
        //            file.SaveAs(System.IO.Path.Combine(Server.MapPath("/UploadedImages"), Guid.NewGuid() + System.IO.Path.GetExtension(file.FileName)));
        //        }
        //    }
        //    return View();
        //}
        //[HttpPost]
        //public ActionResult Index(List<HttpPostedFileBase> FileData)
        //{
        //string path = Server.MapPath("~/UploadedImages/");
        //foreach (HttpPostedFileBase postedFile in FileData)
        //{
        //    if (postedFile != null)
        //    {
        //        string fileName = Path.GetFileName(postedFile.FileName);
        //        postedFile.SaveAs(path + fileName);
        //    }
        //}
 
        //return View();
        //}

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

                            attname += "<AgentTicketsAttachments>";
                            attname += "<AttachmentName>" + _imgname + "</AttachmentName>";
                            attname += "</AgentTicketsAttachments>";
                        }
                    }
                    attname += "</root>";
                }
                return Json(new { statusCode = "" + attname + "" }, JsonRequestBehavior.AllowGet);
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



        [HttpPost]
        public ActionResult UpdateTickets(BlTickets ObjBlTickets)
        {
            if (Session["ID_Users"] == "" || Session["ID_Users"] == "null")
            {
                Session["ID_Users"] = "0";
            }
            ObjBlTickets.UserCode = Convert.ToInt64(Session["ID_Users"]);
            ObjBlTickets.FK_Company = Convert.ToInt64(Session["ID_Company"]);
            ObjBlTickets.AgentCode = Convert.ToInt64(Session["ID_Agent"]);
            ObjBlTickets.XmlAttachment = attname;

            long statusCode = 0;
            if (ObjBlTickets.MasterID == 0)
            {
                statusCode = ObjBlTickets.InsertData();
            }
            else
            {
                statusCode = ObjBlTickets.UpdateData();
            }

            ObjBlTickets = null;
            attname = "";
            return Json(new { statusCode = "" + statusCode + "" }, JsonRequestBehavior.AllowGet);
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
        public ActionResult UpdateTicketDetails(BlTickets ObjBlTickets)
        {
            ObjBlTickets.FK_Company = Convert.ToInt64(Session["ID_Company"]);
            ObjBlTickets.AgentCode = Convert.ToInt64(Session["ID_Agent"]);
            ObjBlTickets.XmlAttachment = attname;

            long statusCode = 0;
            statusCode = ObjBlTickets.UpdateTicketDetails();
            ObjBlTickets = null;
            attname = "";
            return Json(new { statusCode = "" + statusCode + "" }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult UpdateTicketAssign(BlTickets ObjBlTickets)
        {
            ObjBlTickets.FK_Company = Convert.ToInt64(Session["ID_Company"]);
            ObjBlTickets.AgentCode = Convert.ToInt64(Session["ID_Agent"]);

            long statusCode = 0;
            statusCode = ObjBlTickets.UpdateTicketAssign();
            ObjBlTickets = null;
            return Json(new { statusCode = "" + statusCode + "" }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult SelectTicketsAll(string PageIndex = "1",  string SearchItem = "",string Status="0")
        {
            try
            {
                         
                int statusCode = 1;
                DataTable dtbl = new DataTable();
                BlTickets bltickets = new BlTickets();
                bltickets.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                bltickets.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                bltickets.TickStatus = Convert.ToInt16(Status); 
                bltickets.TickNo = SearchItem;
                bltickets.TickSubject=SearchItem;
                bltickets.ClientName=SearchItem;
                bltickets.PageIndex = Convert.ToInt32(PageIndex);
                dtbl = bltickets.SelectAllData();

                return Json(Converttojson(dtbl), JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                ///
                return Json(ex);
            }

        }
        [HttpGet]
        public JsonResult SelectAgentTicketDetails(string ID_Tickets)
        {
            try
            {

                int statusCode = 1;
                DataTable dtbl = new DataTable();
                BlTickets bltickets = new BlTickets();
                bltickets.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                bltickets.MasterID = Convert.ToInt64(ID_Tickets);
                dtbl = bltickets.SelectAgentTicketDetails();
                return Json(Converttojson(dtbl), JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                ///
                return Json(ex);
            }

        }
        [HttpGet]
        public JsonResult FillTickets(Int64 ID_Tickets)
        {
            try
            {

                DataTable dtbl = new DataTable();
                BlTickets bltickets = new BlTickets();
                bltickets.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                bltickets.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                bltickets.MasterID = ID_Tickets;
                dtbl = bltickets.SelectAllData();

                return Json(Converttojson(dtbl), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
         [HttpPost]
        public JsonResult DepartmentDropDownFill()
        {
            try
            {

                int statusCode = 1;
                BlPopulate blpopulate = new BlPopulate();
                blpopulate.TableName = "Department";
                blpopulate.ListFields = "DepName";
                blpopulate.ValueFields = "ID_Department";
                blpopulate.SortFields = "DepName,ID_Department";
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
         public JsonResult TeamDropDownFill()
        {
            try
            {

                int statusCode = 1;
                BlPopulate blpopulate = new BlPopulate();
                blpopulate.TableName = "Team";
                blpopulate.ListFields = "TeamName";
                blpopulate.ValueFields = "ID_Team";
                blpopulate.SortFields = "TeamName,ID_Team";
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
        [HttpGet]
        public JsonResult AgentDropDownFill(string FK_Department, string FK_Team)
        {
            try
            {

                int statusCode = 1;
                BlPopulate blpopulate = new BlPopulate();
                blpopulate.TableName = "Agent";
                blpopulate.ListFields = "AgName";
                blpopulate.ValueFields = "ID_Agent";
                blpopulate.SortFields = "AgName,ID_Agent";
                blpopulate.Criteria = "FK_Department=" + Convert.ToInt64(FK_Department) + " AND FK_Team=" + Convert.ToInt64(FK_Team) + " AND Cancelled=0" +
                "AND Active=1 AND FK_Company=" + Session["ID_Company"].ToString();
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
    }
}
