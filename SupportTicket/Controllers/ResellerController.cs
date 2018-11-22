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
    public class ResellerController : Controller
    {
        //
        // GET: /Reseller/
        public ResellerController()
        {

            ViewBag.api_url = ConfigurationManager.AppSettings["api-url"];


        }
        public ActionResult Index()
        {
            return View();
        }

        #region Reseller Controller
        public ActionResult Reseller()
        {

            ViewBag.Message = "Your app description page.";
            return View();
        }

        [HttpPost]
        public ActionResult UpdateReseller(BlReseller ObjBlReseller)
        {

            long statusCode = 0;
            ObjBlReseller.UserCode = Convert.ToInt64(Session["ID_Agent"]);
            ObjBlReseller.FK_Company = Convert.ToInt64(Session["ID_Company"]);
            if (ObjBlReseller.MasterID == 0)
            {
                statusCode = ObjBlReseller.InsertData();
            }
            else
            {
                statusCode = ObjBlReseller.UpdateData();
            }

            return Json(new { statusCode = "" + statusCode + "" }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult SelectResellerAll(string PageIndex = "1", string SearchItem = "")
        {
            try
            {

                int statusCode = 1;
                DataTable dtbl = new DataTable();
                BlReseller blReseller = new BlReseller();
                blReseller.PageIndex = Convert.ToInt32(PageIndex);
                blReseller.FK_Company = Convert.ToInt64(Session["ID_Company"]);

                blReseller.ResCode = SearchItem;
                blReseller.ResName = SearchItem;
                blReseller.ResEmail = SearchItem;

                dtbl = blReseller.SelectAllData();
                return Json(Converttojson(dtbl), JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                ///
                return Json(ex);
            }

        }

        [HttpGet]
        public JsonResult DeleteReseller(Int64 ID_Reseller)
        {
            try
            {
                long statusCode = 0;
                BlReseller blclient = new BlReseller();
                blclient.MasterID = ID_Reseller;
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
        public JsonResult FillReseller(Int64 ID_Reseller)
        {
            try
            {

                DataTable dtbl = new DataTable();
                BlReseller blclient = new BlReseller();
                blclient.MasterID = ID_Reseller;
                blclient.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                blclient.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                dtbl = blclient.SelectAllData();
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
        #endregion

    }
}
