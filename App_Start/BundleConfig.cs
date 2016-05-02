using System.Web;
using System.Web.Optimization;

namespace JobTracker
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Styles/css").Include(
                "~/Styles/ezList.css",
                "~/Styles/Grahamson*"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery/jquery-{version}.js",
                "~/Scripts/jquery/jquery-ui.js"));

            bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
                "~/Scripts/knockout/knockout-{version}.js"));

            //bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
            //          "~/Scripts/bootstrap.js",
            //          "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Styles/jquery").Include(
                      "~/Styles/jquery/jquery*"));
        }
    }
}
