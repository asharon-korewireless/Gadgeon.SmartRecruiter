﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using System.Data;
using SupportTicket.Business.Masters;
using SupportTicket.Interface.Masters;
using SupportTicket.Filters;

namespace SupportTicket.Controllers
{
    [CheckSessionTimeOut]
    public class DepartmentController : Controller
    {
        //
        // GET: /Department/
        public DepartmentController()
        {
            ViewBag.api_url = ConfigurationManager.AppSettings["api-url"];
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Department()
        {
            return View();
        }
        [HttpPost]
        public ActionResult UpdateDepartment(BlDepartment bldepartment)
        {

            long statusCode = 0;
            bldepartment.UserCode = Convert.ToInt64(Session["ID_Agent"]);
            bldepartment.FK_Company = Convert.ToInt64(Session["ID_Company"]);
            if (bldepartment.MasterID == 0)
            {
                statusCode = bldepartment.InsertData();
            }
            else
            {
                statusCode = bldepartment.UpdateData();
            }

            return Json(new { statusCode = "" + statusCode + "" }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult SelectDepartmentAll(string PageIndex = "1", string SearchItem = "")
        {
            try
            {

                int statusCode = 1;
                DataTable dtbl = new DataTable();
                BlDepartment bldepartment = new BlDepartment();
                bldepartment.PageIndex = Convert.ToInt32(PageIndex);
                bldepartment.DepCode = SearchItem;
                bldepartment.DepName = SearchItem;
                bldepartment.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                dtbl = bldepartment.SelectAllData();
                return Json(Converttojson(dtbl), JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                ///
                return Json(ex);
            }

        }

        [HttpGet]
        public JsonResult DeleteDepartment(Int64 ID_Department)
        {
            try
            {
                long statusCode = 0;
                BlDepartment bldepartment = new BlDepartment();
                bldepartment.MasterID = ID_Department;
                bldepartment.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                bldepartment.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                statusCode = bldepartment.DeleteData();
                return Json(new { statusCode = "" + statusCode + "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [HttpGet]
        public JsonResult FillDepartment(Int64 ID_Department)
        {
            try
            {

                DataTable dtbl = new DataTable();
                BlDepartment bldepartment = new BlDepartment();
                bldepartment.MasterID = ID_Department;
                bldepartment.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                bldepartment.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                dtbl = bldepartment.SelectAllData();
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
