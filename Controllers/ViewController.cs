using System.Web.Mvc;

namespace JobTracker.Controllers
{
    public class ViewController : Controller
    {
        // GET: Job
        public ActionResult Menu()
        {
            @ViewBag.ActiveJob = Session["ActiveJob"];
            return View();
        }

        public ActionResult QueueList(string statusType)
        {
            string statusTypeCode = "";
            switch (statusType)
            {
                case "Scope": statusTypeCode = "S00"; break;
                case "Takeoff": statusTypeCode = "S00"; break;
                case "Estimate": statusTypeCode = "S01"; break;
                case "Proposal": statusTypeCode = "S02"; break;
                case "AwardOrCancel": statusTypeCode = "S03"; break;
                case "Schedule": statusTypeCode = "S04"; break;
                case "WorkInProgress": statusTypeCode = "S06"; break;
                case "Invoice": statusTypeCode = "S07"; break;
                case "PaymentReceived": statusTypeCode = "S08"; break;
                default: statusTypeCode = "000"; break;
            }
            @ViewBag.StatusTypeCode = statusTypeCode;
            @ViewBag.StatusType = statusType;
            return View();
        }
        
        public ActionResult JobList()
        {
            return View();
        }
        public ActionResult Project(int? id)
        {
            if (id == null)
                return RedirectToAction("JobList");
            @ViewBag.ProjectId = id;
            return View();
        }
        public ActionResult Takeoff(int? id)
        {
            if (id == null)
                return RedirectToAction("JobList");
            @ViewBag.ProjectId = id;
            return View();
        }
        public ActionResult Scope(int? id)
        {
            if (id == null)
                return RedirectToAction("JobList");
            @ViewBag.ProjectId = id;
            return View();
        }
        public ActionResult Estimate(int? id)
        {
            if (id == null)
                return RedirectToAction("JobList");
            @ViewBag.ProjectId = id;
            return View();
        }
        public ActionResult WorkOrder(int? id)
        {
            if (id == null)
                return RedirectToAction("JobList");
            @ViewBag.ProjectId = id;
            return View();
        }
        public ActionResult AwardOrCancel(int? id)
        {
            if (id == null)
                return RedirectToAction("JobList");
            @ViewBag.ProjectId = id;
            return View();
        }
        public ActionResult Proposal(int? id)
        {
            if (id == null)
                return RedirectToAction("JobList");
            @ViewBag.ProjectId = id;
            return View();
        }
        public ActionResult Schedule(int? id)
        {
            if (id == null)
                return RedirectToAction("JobList");
            @ViewBag.ProjectId = id;
            return View();
        }
        public ActionResult WorkInProgress(int? id)
        {
            if (id == null)
                return RedirectToAction("JobList");
            @ViewBag.ProjectId = id;
            return View();
        }
        public ActionResult Invoice(int? id)
        {
            if (id == null)
                return RedirectToAction("JobList");
            @ViewBag.ProjectId = id;
            return View();
        }
        public ActionResult PaymentReceived(int? id)
        {
            if (id == null)
                return RedirectToAction("JobList");
            @ViewBag.ProjectId = id;
            return View();
        }
        public ActionResult Tables()
        {
            return View();
        }
        public ActionResult Reports()
        {
            return View();
        }

        public void SetActiveJob(string activeJob)
        {
            Session["ActiveJob"] = activeJob;
        }
    }
}