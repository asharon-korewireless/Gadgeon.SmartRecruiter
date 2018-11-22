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
using System.Net;
using System.Web.Helpers;

namespace SupportTicket.Controllers
{
    [CheckSessionTimeOut]
    public class RecruitersAccessController : Controller
    {
        //
        // GET: /Agent/
        public RecruitersAccessController()
        {

            ViewBag.api_url = ConfigurationManager.AppSettings["api-url"];

        }

        public ActionResult RecruitersAccess()
        {
            return View();
        }

        [HttpPost]
        public ActionResult UpdateAgentAccess(BlAgent ObjBlAgentAccess)
        {
            ObjBlAgentAccess.UserCode = Convert.ToInt64(Session["ID_Agent"]);
            ObjBlAgentAccess.FK_Company = Convert.ToInt64(Session["ID_Company"]);

            long statusCode = 0;
            if (ObjBlAgentAccess.MasterID == 0)
            {
                statusCode = ObjBlAgentAccess.InsertAgentAccess();
            }
            else
            {
                statusCode = ObjBlAgentAccess.UpdateAgentAccess();
            }

            ObjBlAgentAccess = null;
            return Json(new { statusCode = "" + statusCode + "" }, JsonRequestBehavior.AllowGet);
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
                blpopulate.Criteria = "Cancelled=0  AND FK_Company=" + Session["ID_Company"].ToString();
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
        public JsonResult SelectPagesAll(string PageIndex = "1", string FK_DropDownAgent = "0")
        {
            try
            {

                int statusCode = 1;

                DataSet dts = new DataSet();
               
                BlMenu blmenu = new BlMenu();
                blmenu.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                blmenu.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                blmenu.FK_DropDownAgent = Convert.ToInt64(FK_DropDownAgent == "" ? "0" : FK_DropDownAgent);
                blmenu.PageIndex = Convert.ToInt32(PageIndex);
                dts = blmenu.FillPagesAccess();
                DataTable dtblAllPages = dts.Tables[0];
                return Json(Converttojson(dtblAllPages), JsonRequestBehavior.AllowGet);

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

    }
}
