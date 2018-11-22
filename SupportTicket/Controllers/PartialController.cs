﻿using SupportTicket.Business;
using SupportTicket.Business.Masters;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace SupportTicket.Controllers
{
    public class PartialController : Controller
    {
        //
        // GET: /Partial/
        public PartialController()
        {

            ViewBag.api_url = ConfigurationManager.AppSettings["api-url"];


        }
        public ActionResult _Layout()
        {
            return View();
        }
        //public ActionResult _LayoutUser()
        //{
        //    return View();
        //}
        [HttpGet]
        public JsonResult FillMenu()
        {

            BlMenu ObjBlmenu = new BlMenu();


            ObjBlmenu.UserCode = Convert.ToInt64(Session["ID_Agent"]);
            ObjBlmenu.FK_Company = Convert.ToInt64(Session["ID_Company"]);

            BlPopulate populate = new BlPopulate();
            //dtblModules = ObjBlmenu.FillModules();

            DataSet ds = new DataSet();
            ds = ObjBlmenu.FillPages();
            DataTable dtblPages = ds.Tables[0];
            DataTable dtblAgent = ds.Tables[1];
            DataTable dtblNotification = ds.Tables[2];
            string strHtml = "", strNotiHtml = "", color = "", pageurl = "";
            Int32 Count=0;
            strHtml="<li class='header'>MAIN NAVIGATION</li>";
            if (dtblPages.Rows.Count > 0)
            {
                ArrayList arr = new ArrayList();
                for (int i = 0; i < dtblPages.Rows.Count; i++)
                {
                    ObjBlmenu.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                    ObjBlmenu.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                    ObjBlmenu.ID_PageModule = Convert.ToInt32(dtblPages.Rows[i][0].ToString());

                    if ((!arr.Contains(dtblPages.Rows[i][0].ToString()) && i != 0))
                    {
                        strHtml = strHtml + "</ul>";
                        strHtml = strHtml + "</li>";
                    }
                    if (!arr.Contains(dtblPages.Rows[i][0].ToString()))
                    {
                        arr.Add(dtblPages.Rows[i][0].ToString());
                        strHtml = strHtml + " <li class='treeview'><a href='#'><i class='fa fa-" + dtblPages.Rows[i][2].ToString() + "'></i><span>" + dtblPages.Rows[i][1].ToString() + "</span><i class='fa fa-angle-left pull-right'></i></a>";
                        strHtml = strHtml + "<ul class='treeview-menu'>";
                    }
                    //String ClientURL = Page.ResolveClientUrl("~/HomePage.aspx");
                    string Ticketpendingcount="";
                    if (Convert.ToInt32(dtblNotification.Rows[0]["Tasks"]) > 0)
                    {
                        Ticketpendingcount += "<span class='pull-right-container'>";
                        if (dtblPages.Rows[i][3].ToString() == "Tickets")
                        {

                            Ticketpendingcount += "<small class='label pull-right bg-green'>" + Convert.ToInt32(dtblNotification.Rows[0]["Tasks"]) + "</small>";
                        }
                       
                    }
                    if (Convert.ToInt32(dtblNotification.Rows[0]["OverDueCount"]) > 0)
                    {
                        if (dtblPages.Rows[i][3].ToString() == "Tickets")
                        {
                            if (Ticketpendingcount=="")
                            {
                                  Ticketpendingcount += "<span class='pull-right-container'>";
                            }
                            Ticketpendingcount += "<small class='label pull-right bg-red'>" + Convert.ToInt32(dtblNotification.Rows[0]["OverDueCount"]) + "</small>";
                        }
                        Ticketpendingcount += "</span>";
                    }
                    string Status = "";
                    if (dtblPages.Rows[i][3].ToString() == "Tickets")
                    {
                        Status = "?Status=0";
                    }
                    strHtml = strHtml + "<li><a href=../" + dtblPages.Rows[i][4].ToString() + "/" + dtblPages.Rows[i][5].ToString() + Status+ "><i class='fa fa-circle-o text-aqua'></i>" + Ticketpendingcount + dtblPages.Rows[i][3].ToString() + "</a></li>";
                    if (i == dtblPages.Rows.Count-1)
                    {
                        strHtml = strHtml + "</ul>";
                        strHtml = strHtml + "</li>";
                    }

                }
            }
            strNotiHtml = strNotiHtml + "<a href='#' class='dropdown-toggle' data-toggle='dropdown'><i class='fa fa-flag-o'></i><span class='label label-danger'>" + Convert.ToInt32(dtblNotification.Rows[0]["Tasks"]) + "</span></a>";
            strNotiHtml = strNotiHtml + "<ul class='dropdown-menu'><li class='header'>You have " + Convert.ToInt32(dtblNotification.Rows[0]["Tasks"]) + " tasks</li><li><ul class='menu'>";
            if (dtblNotification.Rows.Count > 0)
            {
                for (int j = 1; j < 5; j++)
                {
                    if (dtblNotification.Columns[j].ColumnName == "Pendingjobs")
                    {
                        color = "green";
                        pageurl = "/Tickets/Tickets?Status=-1";
                    }
                    else if (dtblNotification.Columns[j].ColumnName == "OpenTickets")
                    {
                        color = "aqua";
                        pageurl = "/Tickets/Tickets?Status=1";
                    }
                    else if (dtblNotification.Columns[j].ColumnName == "ResolvedTickets")
                    {
                        color = "yellow";
                        pageurl = "/Tickets/Tickets?Status=2";
                    }
                    else if (dtblNotification.Columns[j].ColumnName == "OverDue")
                    {
                        color = "red";
                        pageurl = "#";
                    }
                    else
                    {
                        color = "yellow";
                    }
                    Count=Convert.ToInt32(dtblNotification.Rows[0][dtblNotification.Columns[j].ColumnName]);
                    strNotiHtml = strNotiHtml + "<li><a href=" + pageurl + "><h3>" + dtblNotification.Columns[j].ColumnName + "<small class='pull-right'>" + Count + "%";
                    strNotiHtml = strNotiHtml + "</small></h3><div class='progress xs'><div class='progress-bar progress-bar-" + color + "' style='width:" + Count + 
                    "%' role='progressbar' aria-valuenow='20' aria-valuemin='0' aria-valuemax='100'>";
                    strNotiHtml = strNotiHtml + "<span class='sr-only'>20% Complete</span></div></div></a></li>";
                }
            }
            strNotiHtml = strNotiHtml + "</ul></li><li class='footer'><a href='../Tickets/Tickets'>View all tasks</a></li></ul>";
            strNotiHtml = "";
            ObjBlmenu = null;
            return Json(new { statusCode = "" + strHtml + "", Notification = "" + strNotiHtml + "", statusCodeAgent = "" + dtblAgent.Rows[0]["AgentName"].ToString() + "", table = "" + Converttojson(dtblAgent) + "" }, JsonRequestBehavior.AllowGet);
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


        [HttpGet]
        public JsonResult PostreplayCount()
        {
            DataTable dtbl = new DataTable();
            BlUser blUser = new BlUser();
            blUser.UserCode = Convert.ToInt64(Session["ID_Users"]);
            blUser.FK_Company = Convert.ToInt64(Session["ID_Company"]);
            blUser.MasterID = Convert.ToInt64(Session["ID_Users"]);
            dtbl = blUser.SelectReplayCount();
            return Json(Converttojson(dtbl), JsonRequestBehavior.AllowGet);
        }







    }
}
