using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Text;

namespace JobTracker.Controllers
{
    public class ListController : Controller
    {
        private void EnsureSessionVars()
        {
            //if (Session["SortColumn"] == null)
            //    Session["SortColumn"] = "Id";
            if (Session["PageRows"] == null)
                Session["PageRows"] = 24;
            if (Session["WhereClause"] == null)
                Session["WhereClause"] = "0=0";
            if (Session["SortDirection"] == null)
                Session["SortDirection"] = "desc";
            if (Session["CurrentStartRow"] == null)
                Session["CurrentStartRow"] = 0;
        }

        public JsonResult GetPage(string pageMove, string viewName, string[] fieldList)
        {
            int errorLine = 0;
            try
            {

                int totalRowCount = 0;
                EnsureSessionVars();
                errorLine = 2;
                totalRowCount = GetTotalRowCount(viewName, Session["WhereClause"].ToString());
                errorLine = 3;

                switch (pageMove)
                {
                    case "Resize":
                        break;
                    case "Init":
                    case "Refresh":
                    case "GoTop":
                        Session["CurrentStartRow"] = 0;
                        break;
                    case "GoPrev":
                        if ((int)Session["CurrentStartRow"] > 0)
                            Session["CurrentStartRow"] = ((int)Session["CurrentStartRow"] - (int)Session["PageRows"]);
                        break;
                    case "GoNext":
                        Session["CurrentStartRow"] = ((int)Session["CurrentStartRow"] + (int)Session["PageRows"]);
                        break;
                    case "GoBott":
                        Session["CurrentStartRow"] = totalRowCount - (int)Session["PageRows"];
                        break;
                }
                errorLine = (int)Session["CurrentStartRow"];
                errorLine = 4;
                if (Session["SortColumn"] == null)
                {
                    Session["SortColumn"] = fieldList[0];
                }

                errorLine = 5;
                var selectList = "*";

                StringBuilder sb = new StringBuilder();
                if (fieldList != null)
                {
                    foreach (string fieldName in fieldList)
                    {
                        sb.Append("[" + fieldName + "],");
                    }
                    errorLine = 6;
                    selectList = sb.ToString();
                    errorLine = 7;

                    selectList = selectList.Substring(0, selectList.Length - 1);
                }
                errorLine = 8;

                if (totalRowCount < (int)Session["CurrentStartRow"])
                {
                    Session["CurrentStartRow"] = Math.Max(0, totalRowCount - (int)Session["PageRows"]);
                }
                var ppr = (int)Session["PageRows"];
                var endRec = Math.Min(totalRowCount, ((int)Session["CurrentStartRow"] + (int)Session["PageRows"]));

                string sql = string.Format("select " + selectList + " from (select row_number() over(order by {0} {1} ) rowCt , * " +
                    "from {2} where {3}) as drvtbl where drvtbl.rowCt between {4} and {5}",
                    Session["SortColumn"].ToString(), Session["SortDirection"].ToString(), viewName, Session["WhereClause"].ToString(),
                    (int)Session["CurrentStartRow"], (int)Session["CurrentStartRow"] + (int)Session["PageRows"]);
                errorLine = 9;

                var rtn = ADO.PerformReader(sql);
                errorLine = 10;

                return Json(new
                {
                    view = rtn,
                    startRec = Session["CurrentStartRow"],
                    endRec = Math.Min(totalRowCount, ((int)Session["CurrentStartRow"] + (int)Session["PageRows"])),
                    totalRecs = string.Format("{0:###,##0}", totalRowCount)
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                var x = new List<Dictionary<string, string>>();
                var y = new Dictionary<string, string>();
                y.Add("ERROR", ex.Message);
                x.Add(y);
                return Json(new
                {
                    view = x,
                    startRec = 0,
                    endRec = -1,
                    totalRecs = "errorLine: " + errorLine

                }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetDefaultColumnList(string viewName)
        {
            var headerDic = new List<Dictionary<string, string>>();
            var lastIndexOfDot = viewName.LastIndexOf('.');
            var dbSchema = viewName.Substring(0, lastIndexOfDot + 1);
            var rawViewName = viewName.Substring(lastIndexOfDot + 1);
            //var fieldList = new List<string>();
            var dics = ADO.PerformReader("select name from " + dbSchema + "syscolumns where id = (select id from " + dbSchema + "sysobjects where name='" + rawViewName + "') order by colorder");
            if (dics[0].ContainsKey("ERROR"))
            {
                headerDic = dics;
            }
            else
            {
                foreach (var dic in dics)
                {
                    var hdic = new Dictionary<string, string>();
                    hdic.Add("FieldName", dic["name"]);
                    hdic.Add("HeaderLabel", dic["name"]);
                    headerDic.Add(hdic);
                }
            }
            //Dictionary<string, string> dic = ADO.PerformSingleRowReader("select top 1 * from " + viewName);
            //foreach (KeyValuePair<string, string> row in dic)
            //{
            //    var hdic = new Dictionary<string, string>();
            //    hdic.Add("FieldName", row.Key);
            //    hdic.Add("HeaderLabel", row.Key);
            //    headerDic.Add(hdic);
            //    //fieldList.Add(row.Key);
            //}
            return Json(headerDic, JsonRequestBehavior.AllowGet);
        }

        public static int GetTotalRowCount(string viewName, string whereClause)
        {
            int rowCount = 0;
            string[] rtn = ADO.PerformExecuteScalar("select count(*) from " + viewName + " where " + whereClause);
            if (rtn[0] == "ok")
                int.TryParse(rtn[1], out rowCount);
            return rowCount;
        }

        public JsonResult ResizeTable(int? rows)
        {
            if (rows == null)
                return null;
            Session["PageRows"] = rows;
            return Json("ok", JsonRequestBehavior.AllowGet);
        }

        // list sort and filter
        public JsonResult ApplySort(string sortColumn, string sortDirection)
        {
            Session["SortColumn"] = "[" + sortColumn + "]";
            Session["SortDirection"] = sortDirection;
            return Json("ok", JsonRequestBehavior.AllowGet);
        }

        public JsonResult ClearSortColumn(string[] fieldList)
        {
            string success = "ono";
            if (fieldList == null)
                success = "fieldList == null";
            else
            {
                Session["SortColumn"] = fieldList[0];
                success = "ok";
            }
            return Json(success, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ClearFilter()
        {
            Session["WhereClause"] = "0=0";
            return Json("ok", JsonRequestBehavior.AllowGet);
        }

        public JsonResult ApplyWhereClause(string whereClause)
        {
            Session["WhereClause"] = whereClause;
            return Json("ok", JsonRequestBehavior.AllowGet);
        }

        public JsonResult ApplyFilter(string filterColumn, string filterValue, string currentUser, string currentUserRole)
        {
            Session["WhereClause"] = filterColumn + " = '" + filterValue + "' ";
            return Json("ok", JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetFilterList(string filterColumn, string viewName)
        {
            var strings = ADO.DicToArray(ADO.PerformReader(string.Format("select distinct {0} filterItem from {1}", filterColumn, viewName)));
            StringBuilder sb = new StringBuilder();
            foreach (string filterItem in strings)
            {
                sb.AppendFormat("<option id='{0}'>{0}</option>", filterItem);
            }

            return Json(sb.ToString(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ApplySearch(string searchField, string searchOperator, string searchValue, string currentUser, string currentUserRole)
        {
            if (searchOperator == "equals") searchOperator = " = '" + searchValue + "'";
            if (searchOperator == "starts with") searchOperator = " like '" + searchValue + "%'";
            if (searchOperator == "contains") searchOperator = " like '%" + searchValue + "%'";
            if (searchOperator == "between") searchOperator = " between '" + searchValue + "'";
            if (searchOperator == "less than") searchOperator = " < '" + searchValue + "'";
            if (searchOperator == "greater than") searchOperator = " > '" + searchValue + "'";
            if (searchOperator == "not equals") searchOperator = " != '" + searchValue + "'";
            string wClause = "[" + searchField + "]" + searchOperator;
            Session["WhereClause"] = wClause;
            return Json("ok", JsonRequestBehavior.AllowGet);
        }
    }
}
