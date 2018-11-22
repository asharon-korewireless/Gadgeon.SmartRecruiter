﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Text;
using System.Configuration;
using System.Data;

using SupportTicket.Business;
using SupportTicket.Interface;

using SupportTicket.Business.Masters;
using SupportTicket.Interface.Masters;


using SupportTicket.Filters;



namespace SupportTicket.Controllers
{
    [CheckSessionTimeOut]
    public class ProductController : Controller
    {
        //
        // GET: /Masters/
     
        public ProductController()
        {

            ViewBag.api_url = ConfigurationManager.AppSettings["api-url"];
           

        }
        public ActionResult Index()
        {
            return View();
        }

        #region Product Controller
        public ActionResult Product()
        {
          
            ViewBag.Message = "Your app description page.";
            return View();
        }

        [HttpPost]
        public ActionResult UpdateProduct(BlProduct ObjBlProduct)
        {

            long statusCode = 0;
            ObjBlProduct.UserCode = Convert.ToInt64(Session["ID_Agent"]);
            ObjBlProduct.FK_Company = Convert.ToInt64(Session["ID_Company"]);
            if (ObjBlProduct.MasterID == 0)
            {
                statusCode = ObjBlProduct.InsertData();
            }
            else
            {
                statusCode = ObjBlProduct.UpdateData();
            }

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
                blpopulate.Criteria = "Cancelled=0 AND Active=1 AND FK_Company= " + Session["ID_Company"].ToString();
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
        public JsonResult SelectProductAll(string PageIndex = "1", string SearchItem = "")
        {
            try
            {

                int statusCode = 1;
                DataTable dtbl = new DataTable();
                BlProduct blproduct = new BlProduct();
                blproduct.PageIndex = Convert.ToInt32(PageIndex);
                blproduct.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                blproduct.ProdCode = SearchItem;
                blproduct.ProdName = SearchItem;
                dtbl = blproduct.SelectAllData();
                return Json(Converttojson(dtbl), JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                ///
                return Json(ex);
            }

        }

        [HttpGet]
        public JsonResult DeleteProduct(Int64 ID_Product)
        {
            try
            {
                long statusCode = 0;
                BlProduct blproduct = new BlProduct();
                blproduct.MasterID = ID_Product;
                blproduct.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                blproduct.FK_Company = Convert.ToInt64(Session["ID_Company"]);

                statusCode = blproduct.DeleteData();
                return Json(new { statusCode = "" + statusCode + "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
        [HttpGet]
        public JsonResult FillProduct(Int64 ID_Product)
        {
            try
            {

                DataTable dtbl = new DataTable();
                BlProduct blproduct = new BlProduct();
                blproduct.MasterID = ID_Product;
                blproduct.UserCode = Convert.ToInt64(Session["ID_Agent"]);
                blproduct.FK_Company = Convert.ToInt64(Session["ID_Company"]);
                dtbl = blproduct.SelectAllData();
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
        //public HttpResponseMessage OnSuccess(object item, int statusCode)
        //{
        //    MyResponse<object> respm = new MyResponse<object>();
        //    respm.HttpStatusCode = 200;
        //    respm.Message = "Success";
        //    respm.ExMessge = "";
        //    respm.StatusCode = statusCode;
        //    respm.resultList.Add(item);
        //    HttpResponseMessage resp = Request.CreateResponse<MyResponse<object>>(Response.Status.ok, respm);
        //    return resp;
        //}
        #endregion




    }
}
