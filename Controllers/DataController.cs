using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JobTracker.Controllers
{
    public class DataController : Controller
    {
        // GET: Data


        public JsonResult GetAllRefs()
        {
            return Json(ADO.PerformReader("select * from JobTracker..Refs"), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetRefs(string refType)
        {
            return Json(ADO.PerformReader("select * from JobTracker..Refs where RefType = '" + refType + "'"), JsonRequestBehavior.AllowGet);
        }
        public JsonResult AddEditRef(string refCode, string refType, string refDescription)
        {
            string success = "ono";
            if (refCode == "0")
            {
                var newRefCode = refDescription.Substring(0, 3).ToUpper();
                string rtn = "0";
                do
                {
                    rtn = ADO.PerformExecuteScalar("select count(*) from JobTracker..Refs where RefCode = '" + newRefCode + "'")[1];
                    if (rtn == "1")
                    {
                        char nextLastChar = newRefCode.Last();
                        if (nextLastChar == ' ') { nextLastChar = 'A'; }
                        if (nextLastChar == 'Z')
                            nextLastChar = 'A';
                        else
                            nextLastChar = (char)(((int)nextLastChar) + 1);
                        newRefCode = newRefCode.Substring(0, 2) + nextLastChar;
                    }
                } while (rtn != "0");
                success = ADO.PerformExecuteNonQuery(string.Format("insert JobTracker..Refs values('{0}','{1}','{2}')", refType, newRefCode, refDescription))[0];
            }
            else
            {
                ADO.PerformExecuteNonQuery(string.Format("update JobTracker..Refs set RefDescription = '{0}' where RefCode = '{1}'", refDescription, refCode));
            }
            success = "ok";
            return Json(success, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCustomers()
        {
            string sql = "select * from JobTracker..Customer order by CustomerName";
            return Json(ADO.PerformReader(sql), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetCustomer(int customerId)
        {
            string sql = "select * from JobTracker..Customer where customerId = " + customerId;
            return Json(ADO.PerformSingleRowReader(sql), JsonRequestBehavior.AllowGet);
        }
        public JsonResult AddEditCustomer(Dictionary<string, string> vm)
        {
            return Json(ADO.PerformStoredProcedure("JobTracker..CustomerAddEdit", vm), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetCustomerProperties()
        {
            string sql = "select * from JobTracker..CustomerProperty order by PropertyName, PropertyAddressCity";
            return Json(ADO.PerformReader(sql), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetCustomerProperty(int propertyId)
        {
            string sql = "select * from JobTracker..CustomerProperty where PropertyId = " + propertyId;
            return Json(ADO.PerformSingleRowReader(sql), JsonRequestBehavior.AllowGet);
        }
        public JsonResult AddEditCustomerProperty(Dictionary<string, string> vm)
        {
            return Json(ADO.PerformStoredProcedure("JobTracker..CustomerPropertyAddEdit", vm), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProperties()
        {
            string sql = "select PropertyId, PropertyName + ' ' + PropertyAddressCity + ', ' + PropertyAddressState Property from JobTracker..CustomerProperty where CustomerId = 3";
            sql = "select PropertyId, PropertyName + ' ' + PropertyAddressCity + ', ' + PropertyAddressState Property from JobTracker..CustomerProperty";
            return Json(ADO.PerformReader(sql), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProject(int projectId)
        {
            return Json(ADO.PerformReader("select * from JobTracker..Project where ProjectId =" + projectId), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetQueueList(string statusTypeCode)
        {
            string sql = "select * from JobTracker..vJobList where Status = (select refdescription from refs where RefCode = '" + statusTypeCode + "')";
            return Json(ADO.PerformReader(sql), JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdateJobStatus(string whichDate, string statusTypeCode, string date, int projectId)
        {
            string sql = string.Format("Update JobTracker..Project set JobStatus = '{0}', {1} = '{2}' where ProjectId = {3}",
                statusTypeCode, whichDate, date, projectId);
            return Json(ADO.PerformExecuteNonQuery(sql), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetStatusCounts()
        {
            return Json(ADO.PerformSingleRowReader("select * from JobTracker..vStatusCounts"), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProjectHeader(int projectId)
        {
            return Json(ADO.PerformReader("select * from JobTracker..vProject where ProjectId =" + projectId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetEstimate(int projectId)
        {
            return Json(ADO.PerformSingleRowReader("select * from JobTracker..Estimate where ProjectId =" + projectId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult AddEditEstimate(Dictionary<string, string> vm)
        {
            return Json(ADO.PerformStoredProcedure("JobTracker..EstimateAddEdit", vm), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetJobCost(int jobCostId)
        {
            return Json(ADO.PerformReader("select * from JobTracker..JobCost where JobCostId =" + jobCostId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetJobCosts(int projectId, string costType)
        {
            string sql = string.Format("select * from JobTracker..JobCost where ProjectId ={0} and CostType = '{1}'", projectId, costType);
            return Json(ADO.PerformReader(sql), JsonRequestBehavior.AllowGet);
        }
        public JsonResult AddJobCosts(Dictionary<string, string> vm)
        {
            return Json(ADO.PerformStoredProcedure("JobTracker..JobCostsAddEdit", vm), JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteJobCost(int id)
        {
            return Json(ADO.PerformExecuteNonQuery("Delete JobTracker..JobCost where JobCostId = " + id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveProject(Dictionary<string, string> vm)
        {
            return Json(ADO.PerformStoredProcedure("JobTracker..ProjectAddEdit", vm), JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateJobDescription(int projectId, string jobDescription)
        {
            string sql = string.Format("Update JobTracker..Project set JobDescription='{0}' where projectId = {1}", jobDescription, projectId);
            return Json(ADO.PerformExecuteNonQuery(sql), JsonRequestBehavior.AllowGet);
        }
    }
}
