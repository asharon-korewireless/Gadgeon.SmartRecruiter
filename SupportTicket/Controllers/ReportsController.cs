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
    public class ReportsController : Controller
    {

        public ReportsController()
        {

            ViewBag.api_url = ConfigurationManager.AppSettings["api-url"];


        }
        //
        // GET: /Reports/

        public ActionResult AgentWiseReport()
        {
            return View();
        }
        public ActionResult TicketWiseReport()
        {
            return View();
        }
        public ActionResult ClientWiseReport()
        {
            return View();
        }
        public ActionResult ProductWiseReport()
        {
            return View();
        }

        [HttpGet]
        public JsonResult ProductDropDownFill(string FK_Client)
        {
            try
            {

                int statusCode = 1;
                BlPopulate blpopulate = new BlPopulate();
                blpopulate.TableName = "Product P JOIN ClientDetails CD ON CD.FK_Product=P.ID_Product";
                blpopulate.ListFields = "P.ProdName";
                blpopulate.ValueFields = "P.ID_Product";
                blpopulate.SortFields = "P.ProdName,P.ID_Product";
                blpopulate.Criteria = "CD.FK_Client=" + Convert.ToInt64(FK_Client) + " AND P.Cancelled=0" + " AND CD.Cancelled=0" +
                "AND P.Active=1 AND P.FK_Company=" + Session["ID_Company"].ToString();
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

        [HttpPost]
        public JsonResult AgentDropDownFill()
        {
            try
            {

                int statusCode = 1;
                BlPopulate blpopulate = new BlPopulate();
                blpopulate.TableName = "Agent";
                blpopulate.ListFields = "AgName";
                blpopulate.ValueFields = "ID_Agent";
                blpopulate.SortFields = "AgName,ID_Agent";
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

        [HttpPost]
        public JsonResult ProductOnlyDropDownFill()
        {
            try
            {
                int statusCode = 1;
                BlPopulate blpopulate = new BlPopulate();
                blpopulate.TableName = "Product";
                blpopulate.ListFields = "ProdName";
                blpopulate.ValueFields = "ID_Product";
                blpopulate.SortFields = "ProdName,ID_Product";
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


        [HttpPost]
        public ActionResult SelectAgentWiseReport(BlReport ObjBlReport)
        {
            try
            {

                int statusCode = 1;
                DataTable dtbl = new DataTable();
                ObjBlReport.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                ObjBlReport.FK_Company = Convert.ToInt64(Session["ID_Company"]);


                dtbl = ObjBlReport.SelectAgentWiseReport();
                return Json(Converttojson(dtbl), JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                ///
                return Json(ex);
            }

        }

        [HttpPost]
        public ActionResult SelectTicketWiseReport(BlReport ObjBlReport)
        {
            try
            {

                int statusCode = 1;
                DataTable dtbl = new DataTable();
                ObjBlReport.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                ObjBlReport.FK_Company = Convert.ToInt64(Session["ID_Company"]);               

                dtbl = ObjBlReport.SelectTicketWiseReport();
                return Json(Converttojson(dtbl), JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                ///
                return Json(ex);
            }

        }

        [HttpPost]
        public ActionResult SelectClientWiseReport(BlReport ObjBlReport)
        {
            try
            {

                int statusCode = 1;
                DataTable dtbl = new DataTable();
                ObjBlReport.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                ObjBlReport.FK_Company = Convert.ToInt64(Session["ID_Company"]);


                dtbl = ObjBlReport.SelectClientWiseReport();
                return Json(Converttojson(dtbl), JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                ///
                return Json(ex);
            }

        }
        [HttpPost]
        public ActionResult SelectProductWiseReport(BlReport ObjBlReport)
        {
            try
            {

                int statusCode = 1;
                DataTable dtbl = new DataTable();
                ObjBlReport.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                ObjBlReport.FK_Company = Convert.ToInt64(Session["ID_Company"]);


                dtbl = ObjBlReport.SelectProductWiseReport();
                return Json(Converttojson(dtbl), JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                ///
                return Json(ex);
            }

        }

    }
}
