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
using SupportTicket.Filters;

namespace SupportTicket.Controllers
{
    
    [CheckSessionTimeOut]
    public class TopicController : Controller
    {
        //
        // GET: /Topic/


         public TopicController()
        {

            ViewBag.api_url = ConfigurationManager.AppSettings["api-url"];
             

        }

        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Topic()
        {
            return View();
        }


        [HttpPost]
        public ActionResult UpdateTopic(BlTopic ObjBlTopic)
        {

            long statusCode = 0;
            ObjBlTopic.UserCode = Convert.ToInt64(Session["ID_Agent"]);
            ObjBlTopic.FK_Company = Convert.ToInt64(Session["ID_Company"]);
            if (ObjBlTopic.MasterID == 0)
            {
                statusCode = ObjBlTopic.InsertData();
            }
            else
            {
                statusCode = ObjBlTopic.UpdateData();
            }

            return Json(new { statusCode = "" + statusCode + "" }, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public JsonResult SelectTopicAll(string PageIndex = "1", string SearchItem = "")
        {
            try
            {

                int statusCode = 1;
                DataTable dtbl = new DataTable();
                BlTopic blTopic = new BlTopic();
                blTopic.PageIndex = Convert.ToInt32(PageIndex);
                blTopic.FK_Company = Convert.ToInt64(Session["ID_Company"]);

                blTopic.TopicCode = SearchItem;
                blTopic.TopicName = SearchItem;

                dtbl = blTopic.SelectAllData();
                return Json(Converttojson(dtbl), JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                ///
                return Json(ex);
            }

        }


        [HttpGet]
        public JsonResult DeleteTopic(Int64 ID_Topic)
        {
            try
            {
                long statusCode = 0;
                BlTopic blTopic = new BlTopic();
                blTopic.MasterID = ID_Topic;
                blTopic.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                blTopic.FK_Company = Convert.ToInt64(Session["ID_Company"]);

                statusCode = blTopic.DeleteData();
                return Json(new { statusCode = "" + statusCode + "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }


        [HttpGet]
        public JsonResult FillTopic(Int64 ID_Topic)
        {
            try
            {

                DataTable dtbl = new DataTable();
                BlTopic bltopic = new BlTopic();
                bltopic.MasterID = ID_Topic;
                bltopic.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                bltopic.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                dtbl = bltopic.SelectAllData();
                return Json(Converttojson(dtbl), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
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


    }
}
