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
    public class SubscriptionPlanController : Controller
    {
        //
        // GET: /SubscriptionPlan/

        public SubscriptionPlanController()
        {

            ViewBag.api_url = ConfigurationManager.AppSettings["api-url"];
             

        }
        
        public ActionResult SubscriptionPlan()
        {
            return View();
        }



        [HttpPost]
        public ActionResult UpdateSubscriptionPlan(BlSubscriptionPlan ObjBlSubscriptionPlan)
        {

            long statusCode = 0;
            ObjBlSubscriptionPlan.UserCode = Convert.ToInt64(Session["ID_Agent"]);
            ObjBlSubscriptionPlan.FK_Company = Convert.ToInt64(Session["ID_Company"]);
            if (ObjBlSubscriptionPlan.MasterID == 0)
            {
                statusCode = ObjBlSubscriptionPlan.InsertData();
            }
            else
            {
                statusCode = ObjBlSubscriptionPlan.UpdateData();
            }

            return Json(new { statusCode = "" + statusCode + "" }, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public JsonResult SelectSubscriptionPlanAll(string PageIndex = "1", string SearchItem = "")
        {
            try
            {

                int statusCode = 1;
                DataTable dtbl = new DataTable();
                BlSubscriptionPlan blSubscriptionPlan = new BlSubscriptionPlan();
                blSubscriptionPlan.PageIndex = Convert.ToInt32(PageIndex);
                blSubscriptionPlan.FK_Company = Convert.ToInt64(Session["ID_Company"]);

                blSubscriptionPlan.SubscriptionPlanCode = SearchItem;
                blSubscriptionPlan.SubscriptionPlanName = SearchItem;

                dtbl = blSubscriptionPlan.SelectAllData();
                return Json(Converttojson(dtbl), JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                ///
                return Json(ex);
            }

        }


        [HttpGet]
        public JsonResult DeleteSubscriptionPlan(Int64 ID_SubscriptionPlan)
        {
            try
            {
                long statusCode = 0;
                BlSubscriptionPlan blSubscriptionPlan = new BlSubscriptionPlan();
                blSubscriptionPlan.MasterID = ID_SubscriptionPlan;
                blSubscriptionPlan.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                blSubscriptionPlan.FK_Company = Convert.ToInt64(Session["ID_Company"]);

                statusCode = blSubscriptionPlan.DeleteData();
                return Json(new { statusCode = "" + statusCode + "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }


        [HttpGet]
        public JsonResult FillSubscriptionPlan(Int64 ID_SubscriptionPlan)
        {
            try
            {

                DataTable dtbl = new DataTable();
                BlSubscriptionPlan blSubscriptionPlan = new BlSubscriptionPlan();
                blSubscriptionPlan.MasterID = ID_SubscriptionPlan;
                blSubscriptionPlan.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                blSubscriptionPlan.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                dtbl = blSubscriptionPlan.SelectAllData();
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
