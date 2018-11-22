﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Reflection;
using System.Web.Routing;


namespace SupportTicket.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class CheckSessionTimeOutAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(System.Web.Mvc.ActionExecutingContext filterContext)
        {
            HttpSessionStateBase session = filterContext.HttpContext.Session;
            Controller controller = filterContext.Controller as Controller;

            if (controller != null)
            {
                if (session["ID_Agent"] == null || session["ID_Agent"].ToString() == "" || session["ID_Agent"].ToString() == "0"
                    || session["ID_Company"] == null || session["ID_Company"].ToString() == "" || session["ID_Company"].ToString() == "0")
                {
                    session["ID_Users"] = "0";
                    filterContext.Result =
                           new RedirectToRouteResult(
                               new RouteValueDictionary{{ "controller", "Home" },{ "action", "UserLogin" }
                                         });
                }
                
            }

            base.OnActionExecuting(filterContext);
        }
    }


    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class CheckSessionTimeOutUserAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(System.Web.Mvc.ActionExecutingContext filterContext)
        {
            HttpSessionStateBase session = filterContext.HttpContext.Session;
            Controller controller = filterContext.Controller as Controller;

            if (controller != null)
            {
                if (session["ID_Users"] == null || session["ID_Users"].ToString() == "" || session["ID_Users"].ToString() == "0"
                    || session["ID_Company"] == null || session["ID_Company"].ToString() == "" || session["ID_Company"].ToString() == "0")
                {
                    session["ID_Agent"] = "0";
                    filterContext.Result =
                           new RedirectToRouteResult(
                               new RouteValueDictionary{{ "controller", "Home" },{ "action", "UserLogin" }
                                         });
                }
            }

            base.OnActionExecuting(filterContext);
        }
    }
}
