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


namespace SupportTicket.Controllers
{
    [CheckSessionTimeOut]
    public class UserController : Controller
    {
        //
        // GET: /User/

        public ActionResult User()
        {
            return View();
        }
      

        [HttpPost]
        public ActionResult UpdateUser(BlUser ObjBlUser)
        {
            ObjBlUser.UserCode = Convert.ToInt64(Session["ID_Agent"]);
            ObjBlUser.FK_Company = Convert.ToInt64(Session["ID_Company"]);

            BlFunction blfunctions = new BlFunction();
            string AgentPassword = "";
            AgentPassword = blfunctions.EncryptAgent(Convert.ToString(ObjBlUser.UsPassword.Trim()));
            ObjBlUser.UsPassword = AgentPassword;
            blfunctions = null;

            long statusCode = 0;
            if (ObjBlUser.MasterID == 0)
            {
                statusCode = ObjBlUser.InsertData();
            }
            else
            {
                statusCode = ObjBlUser.UpdateData();
            }

            ObjBlUser = null;
            return Json(new { statusCode = "" + statusCode + "" }, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public JsonResult SelectUserAll(string PageIndex = "1")
        {
            try
            {

                int statusCode = 1;
                DataTable dtbl = new DataTable();
                BlUser blUser = new BlUser();
                blUser.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                blUser.FK_Company = Convert.ToInt64(Session["ID_Company"]);



                blUser.PageIndex = Convert.ToInt32(PageIndex);
                dtbl = blUser.SelectAllData();

                return Json(Converttojson(dtbl), JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                ///
                return Json(ex);
            }

        }

        [HttpGet]
        public JsonResult DeleteUser(Int64 ID_User)
        {
            try
            {
                long statusCode = 0;
                BlUser blUser = new BlUser();
                blUser.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                blUser.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                blUser.MasterID = ID_User;
                statusCode = blUser.DeleteData();
                return Json(new { statusCode = "" + statusCode + "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        [HttpGet]
        public JsonResult FillUser(Int64 ID_User)
        {
            try
            {

                DataTable dtbl = new DataTable();
                BlUser blUser = new BlUser();
                blUser.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                blUser.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                blUser.MasterID = ID_User;
                dtbl = blUser.SelectAllData();

                BlFunction blfunctions = new BlFunction();
                dtbl.Rows[0][6] = blfunctions.DecryptAgent(Convert.ToString(dtbl.Rows[0][6].ToString()));
                blfunctions = null;

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
