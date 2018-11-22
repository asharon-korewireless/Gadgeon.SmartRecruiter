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
    public class ClientController : Controller
    {
        //
        // GET: /Client/
        public ClientController()
        {

            ViewBag.api_url = ConfigurationManager.AppSettings["api-url"];


        }
        public ActionResult Index()
        {
            return View();
        }

        #region Client Controller
        public ActionResult Client()
        {

            ViewBag.Message = "Your app description page.";
            return View();
        }

        [HttpPost]
        public ActionResult UpdateClient(BlClient ObjBlClient)
        {

            long statusCode = 0;
            ObjBlClient.UserCode = Convert.ToInt64(Session["ID_Agent"]);
            ObjBlClient.FK_Company = Convert.ToInt64(Session["ID_Company"]);
            if (ObjBlClient.MasterID == 0)
            {
                statusCode = ObjBlClient.InsertData();
            }
            else
            {
                statusCode = ObjBlClient.UpdateData();
            }

            return Json(new { statusCode = "" + statusCode + "" }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult ResellerDropDownFill()
        {
            try
            {

                int statusCode = 1;
                BlPopulate blpopulate = new BlPopulate();
                blpopulate.TableName = "Reseller";
                blpopulate.ListFields = "ResName";
                blpopulate.ValueFields = "ID_Reseller";
                blpopulate.SortFields = "ResName,ID_Reseller";
                blpopulate.Criteria = "Cancelled=0 AND Active=1 AND FK_Company= " + Convert.ToInt64(Session["ID_Company"].ToString());
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
        public JsonResult SubscriptionPlanDropDownFill()
        {
            try
            {

                int statusCode = 1;
                BlPopulate blpopulate = new BlPopulate();
                blpopulate.TableName = "SubscriptionPlan";
                blpopulate.ListFields = "SPName";
                blpopulate.ValueFields = "ID_SubscriptionPlan";
                blpopulate.SortFields = "SPName,ID_SubscriptionPlan";
                blpopulate.Criteria = "Cancelled=0 AND Active=1 AND FK_Company= " + Convert.ToInt64(Session["ID_Company"].ToString());
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
        public JsonResult ProductsDropDownFill()
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


        [HttpGet]
        public JsonResult SelectClientAll(string PageIndex = "1", string SearchItem = "")
        {
            try
            {

                int statusCode = 1;
                DataSet ds = new DataSet();
               
                BlClient blclient = new BlClient();
                blclient.PageIndex = Convert.ToInt32(PageIndex);
                blclient.FK_Company = Convert.ToInt64(Session["ID_Company"]);

                blclient.CliCode = SearchItem;
                blclient.CliName = SearchItem;
                blclient.ResName = SearchItem;
                ds = blclient.SelectAllData();
                DataTable dtblClient = ds.Tables[0];
                DataTable dtblClientDetail = ds.Tables[1];
                return Json(Converttojson(dtblClient), JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                ///
                return Json(ex);
            }

        }

        [HttpGet]
        public JsonResult DeleteClient(Int64 ID_Client)
        {
            try
            {
                long statusCode = 0;
                BlClient blclient = new BlClient();
                blclient.MasterID = ID_Client;
                blclient.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                blclient.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                statusCode = blclient.DeleteData();
                return Json(new { statusCode = "" + statusCode + "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        [HttpGet]
        public JsonResult FillClient(Int64 ID_Client)
        {
            try
            {
               DataSet ds=new DataSet();
                DataTable dtbl = new DataTable();
                BlClient blclient = new BlClient();
                blclient.MasterID = ID_Client;
                blclient.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                blclient.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                ds = blclient.SelectAllData();
                DataTable Dt=ds.Tables[0];
                DataTable Dt1=ds.Tables[1];
                return Json(new { table = "" + Converttojson(Dt) + "", table1 = "" + Converttojson(Dt1) + "" }, JsonRequestBehavior.AllowGet);
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
        #endregion

    }
}
