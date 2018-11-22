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
    public class RecruitersController : Controller
    {
        //
        // GET: /Agent/
        public RecruitersController()
        {

            ViewBag.api_url = ConfigurationManager.AppSettings["api-url"];


        }


        public ActionResult Index()
        {
            return View();
        }

        public ActionResult RecruitersProfile()
        {
            return View();
        }

        public ActionResult Recruiters()
        {
            return View();
        }
        public ActionResult RecruitersDashboard()
        {
            return View();
        }

        public ActionResult RecruitersChangePassword()
        {
            return View();
        }

        //[AcceptVerbs(HttpVerbs.Post)]
        [HttpPost]
        public JsonResult UploadFile()
        {
            try
            {
                string _imgname = string.Empty;
                if (System.Web.HttpContext.Current.Request.Files.AllKeys.Any())
                {
                    var pic = System.Web.HttpContext.Current.Request.Files["MyImages"];
                    if (pic.ContentLength > 0)
                    {
                        var fileName = Path.GetFileName(pic.FileName);
                        var _ext = Path.GetExtension(pic.FileName);
                        _ext = _ext.ToLower();
                        if (_ext == ".jpg" || _ext == ".jpeg" || _ext == ".gif" || _ext == ".bmp" || _ext == ".png" || _ext == ".jpe" || _ext == ".jfif" || _ext == ".tif" || _ext == ".tiff")
                        {
                            _imgname = Guid.NewGuid().ToString();
                            var _comPath = Server.MapPath("~/UploadedImages/AgentUpload/Agent_") + DateTime.Now.Ticks.ToString() + fileName;
                            string sikdj = DateTime.Now.Ticks.ToString();
                            _imgname = "Agent_" + DateTime.Now.Ticks.ToString() + fileName;
                            ViewBag.Msg = _comPath;
                            var path = _comPath;

                            // Saving Image in Original Mode
                            pic.SaveAs(path);

                            // resizing image
                            MemoryStream ms = new MemoryStream();
                            WebImage img = new WebImage(_comPath);

                            if (img.Width > 200)
                                img.Resize(200, 200);
                            img.Save(_comPath);
                            // end resize
                        }
                        else
                        {
                            //_imgname = "../Images/avatar_default.png";
                        }
                    }
                }
                return Json(Convert.ToString(_imgname), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(Convert.ToString(ex), JsonRequestBehavior.AllowGet);
            }
        }


      

        [HttpPost]
        public ActionResult UpdateAgent(BlAgent ObjBlAgent)
        {
            ObjBlAgent.UserCode = Convert.ToInt64(Session["ID_Agent"]);
            ObjBlAgent.FK_Company = Convert.ToInt64(Session["ID_Company"]);

            BlFunction blfunctions = new BlFunction();
            string AgentPassword = "";
            AgentPassword = blfunctions.EncryptAgent(Convert.ToString(ObjBlAgent.AgPassword.Trim()));
            ObjBlAgent.AgPassword = AgentPassword;
            blfunctions = null;

            long statusCode = 0;
            if (ObjBlAgent.MasterID == 0)
            {
                statusCode = ObjBlAgent.InsertData();
            }
            else
            {
                statusCode = ObjBlAgent.UpdateData();
            }

            ObjBlAgent = null;
            return Json(new { statusCode = "" + statusCode + "" }, JsonRequestBehavior.AllowGet);
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
        [HttpPost]
        public JsonResult AgentGroupDropDownFill()
        {
            try
            {

                int statusCode = 1;
                BlPopulate blpopulate = new BlPopulate();
                blpopulate.TableName = "AgentGroup";
                blpopulate.ListFields = "AggName";
                blpopulate.ValueFields = "ID_AgentGroup";
                blpopulate.SortFields = "AggName,ID_AgentGroup";
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
        public JsonResult SelectAgentAll(string PageIndex = "1", string SearchItem = "")
        {
            try
            {
                DataSet ds = new DataSet();
                int statusCode = 1;
                DataTable dtbl = new DataTable();
                BlAgent blagent = new BlAgent();
                blagent.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                blagent.FK_Company = Convert.ToInt64(Session["ID_Company"]);

                blagent.AgCode = SearchItem;
                blagent.AgName = SearchItem;
                blagent.DepName = SearchItem;

                blagent.PageIndex = Convert.ToInt32(PageIndex);
                ds = blagent.SelectAllData();
                DataTable Dt = ds.Tables[0];

                return Json(Converttojson(Dt), JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                ///
                return Json(ex);
            }

        }

        [HttpGet]
        public JsonResult DeleteAgent(Int64 ID_Agent)
        {
            try
            {
                long statusCode = 0;
                BlAgent blagent = new BlAgent();
                blagent.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                blagent.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                blagent.MasterID = ID_Agent;
                statusCode = blagent.DeleteData();
                return Json(new { statusCode = "" + statusCode + "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        [HttpGet]
        public JsonResult FillAgent(Int64 ID_Agent)
        {
            try
            {
              DataSet ds = new DataSet();
                DataTable dtbl = new DataTable();
                BlAgent blagent = new BlAgent();
                blagent.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                blagent.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                blagent.MasterID = ID_Agent;
                ds = blagent.SelectAllData();
                DataTable Dt = ds.Tables[0];
                DataTable Dt1 = ds.Tables[1];
              BlFunction blfunctions = new BlFunction();
                Dt.Rows[0]["AgPassword"] = blfunctions.DecryptAgent(Convert.ToString(Dt.Rows[0]["AgPassword"].ToString()));
                blfunctions = null;

             

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



        [HttpPost]
        public ActionResult UpdateAgentChangePassword(BlAgent ObjBlAgent)
        {
            ObjBlAgent.UserCode = Convert.ToInt64(Session["ID_Agent"]);
            ObjBlAgent.FK_Company = Convert.ToInt64(Session["ID_Company"]);
            ObjBlAgent.MasterID = Convert.ToInt64(Session["ID_Agent"]);

            BlFunction blfunctions = new BlFunction();
            string CurrentPassword = "";
            CurrentPassword = blfunctions.EncryptAgent(Convert.ToString(ObjBlAgent.CurrentPassword.Trim()));
            ObjBlAgent.CurrentPassword = CurrentPassword;

            string AgentPassword = "";
            AgentPassword = blfunctions.EncryptAgent(Convert.ToString(ObjBlAgent.AgPassword.Trim()));
            ObjBlAgent.AgPassword = AgentPassword;

            blfunctions = null;

            long statusCode = 0;
            if (ObjBlAgent.MasterID == 0)
            {
                statusCode = ObjBlAgent.ChangePassword();
            }
            else
            {
                statusCode = ObjBlAgent.ChangePassword();
            }

            ObjBlAgent = null;
            return Json(new { statusCode = "" + statusCode + "" }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult FillAgentChangePassword()
        {
            try
            {
                DataSet ds = new DataSet();
                DataTable dtbl = new DataTable();
                BlAgent blagent = new BlAgent();
                blagent.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                blagent.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                blagent.MasterID = Convert.ToInt64(Session["ID_Agent"]);
                ds = blagent.SelectAllData();
                DataTable Dt = ds.Tables[0];


                return Json(Converttojson(Dt), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }


        [HttpGet]
        public JsonResult SelectAgentDashBoard()
        {
            try
            {

                int statusCode = 1;
                DataTable dtbl = new DataTable();
                BlAgent blagent = new BlAgent();
                blagent.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                blagent.FK_Company = Convert.ToInt64(Session["ID_Company"]);

                dtbl = blagent.SelectAgentDashBoard();

                return Json(Converttojson(dtbl), JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                ///
                return Json(ex);
            }

        }
        [HttpGet]
        public JsonResult SelectRecruitersStatusCount()
        {
            try
            {

                int statusCode = 1;
                DataSet dtbl = new DataSet();
                BlAgent blagent = new BlAgent();
                blagent.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                blagent.FK_Company = Convert.ToInt64(Session["ID_Company"]);

                dtbl = blagent.SelectRecruitersStatusCount();
                DataTable Dt = dtbl.Tables[0];
                DataTable Dt1 = dtbl.Tables[1];
                DataTable Dt2 = dtbl.Tables[2];

                return Json(new { table = "" + Converttojson(Dt) + "", table1 = "" + Converttojson(Dt1) + "", table2 = "" + Converttojson(Dt2) + "" }, JsonRequestBehavior.AllowGet);

                

            }
            catch (Exception ex)
            {
                ///
                return Json(ex);
            }

        }


        
        [HttpPost]
        public JsonResult DeparmentDropDownFill()
        {
            try
            {

                int statusCode = 1;
                BlPopulate blpopulate = new BlPopulate();
                blpopulate.TableName = "Department";
                blpopulate.ListFields = "DepName";
                blpopulate.ValueFields = "ID_Department";
                blpopulate.SortFields = "DepName,ID_Department";
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



    }
}
