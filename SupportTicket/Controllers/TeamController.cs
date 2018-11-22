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
    public class TeamController : Controller
    {
        //
        // GET: /Masters/
        public TeamController()
        {

            ViewBag.api_url = ConfigurationManager.AppSettings["api-url"];


        }
        public ActionResult Index()
        {
            return View();
        }

        #region Team Controller
        public ActionResult Team()
        {

            ViewBag.Message = "Your app description page.";
            return View();
        }
        [HttpPost]
        public ActionResult UpdateTeam(BlTeam ObjBlTeam)
        {
            ObjBlTeam.UserCode = Convert.ToInt64(Session["ID_Agent"]);
            ObjBlTeam.FK_Company = Convert.ToInt64(Session["ID_Company"]);
            long statusCode = 0;
            if (ObjBlTeam.MasterID == 0)
            {
                statusCode = ObjBlTeam.InsertData();
            }
            else
            {
                statusCode = ObjBlTeam.UpdateData();
            }

            return Json(new { statusCode = "" + statusCode + "" }, JsonRequestBehavior.AllowGet);
        }       
        [HttpGet]
        public JsonResult SelectTeamAll(string PageIndex = "1", string SearchItem = "")
        {
            try
            {
                
                int statusCode = 1;
                DataTable dtbl = new DataTable();
                BlTeam blTeam = new BlTeam();
                blTeam.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                blTeam.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                blTeam.TeamCode = SearchItem;
                blTeam.TeamName = SearchItem;
                blTeam.PageIndex = Convert.ToInt32(PageIndex);
                dtbl = blTeam.SelectAllData();
                return Json(Converttojson(dtbl), JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                ///
                return Json(ex);
            }

        }

        [HttpGet]
        public JsonResult DeleteTeam(Int64 ID_Team)
        {
            try
            {
                long statusCode = 0;
                BlTeam blTeam = new BlTeam();
                blTeam.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                blTeam.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                blTeam.MasterID = ID_Team;
                statusCode = blTeam.DeleteData();
                return Json(new { statusCode = "" + statusCode + "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        [HttpGet]
        public JsonResult FillTeam(Int64 ID_Team)
        {
            try
            {

                DataTable dtbl = new DataTable();
                BlTeam blTeam = new BlTeam();
                blTeam.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                blTeam.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                blTeam.MasterID = ID_Team;
                dtbl = blTeam.SelectAllData();
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
