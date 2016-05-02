using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace JobTracker
{
    public static class Globals
    {
        public static string AppVersion { get; set; }
        public static string connStr { get; set; }
        public static Exception lastError { get; set; }
        public static string activeServer { get; set; }
    }

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            GlobalConfiguration.Configuration.Formatters.Remove(GlobalConfiguration.Configuration.Formatters.XmlFormatter);

            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            //GlobalConfiguration.Configure(WebApiConfig.Register);

            string connStrName = "HomeOffice";
            //connStrName = "Grahamson";  
            Globals.connStr = System.Configuration.ConfigurationManager.ConnectionStrings[connStrName].ConnectionString;
            Globals.AppVersion = "v.03.03";
        }
    }
}
