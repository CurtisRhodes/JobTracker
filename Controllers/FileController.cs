using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JobTracker.Controllers
{
    public class FileController : Controller
    {
        [HttpPost]
        public ActionResult Upload(IEnumerable<HttpPostedFileBase> files)
        {
            string success = "ono";
            int filesUploaded = 0;
            var projectId = Request.Params["projectId"];

            if (files != null)
            {
                try
                {
                    var mapPath = Path.Combine(Server.MapPath("~/Upload"), projectId);
                    Directory.CreateDirectory(mapPath);
                    foreach (var file in files)
                    {
                        if (file != null && file.ContentLength > 0)
                        {
                            //string path = Path.Combine(Server.MapPath("~/Images"), Path.GetFileName(file.FileName));
                            //file.SaveAs(path);

                            file.SaveAs(Path.Combine(mapPath, Guid.NewGuid() + Path.GetExtension(file.FileName)));
                            filesUploaded++;
                        }
                    }
                    if (filesUploaded == 1)
                        success = "File uploaded successfully";
                    else
                        success = filesUploaded + " Files uploaded successfully";
                }
                catch (Exception ex)
                {
                    success = "ERROR:" + ex.Message.ToString();
                }
            }
            else
            {
                success = "You have not specified a file.";
            }
            ViewBag.Message = success;
            return RedirectToAction("Takeoff", "View", new { id = projectId });
        }

        public JsonResult GetImages(string projectId)
        {
            string[] files = new string[0];
            var mapPath = Path.Combine(Server.MapPath("~/Upload"), projectId);
            if (Directory.Exists(mapPath))
            {
                DirectoryInfo di = new DirectoryInfo(mapPath);
                FileInfo[] fis = di.GetFiles();
                files = fis.Select(fi => fi.Name).ToArray();
                //string[] files = Directory.GetFiles(mapPath);
            }
            return Json(files, JsonRequestBehavior.AllowGet);
        }
                
        public JsonResult DeleteImage(string fileName)
        {
            string success = "ono";
            try
            {
                var fname = Path.GetFileName(fileName);
                var fpath = Path.GetDirectoryName(fileName);
                var mapPath = Server.MapPath("~");
                var mm = mapPath + fpath;
                FileInfo[] df = new DirectoryInfo(mm).GetFiles();
                FileInfo fi = df.Where(ff => ff.Name == fname).FirstOrDefault();
                fi.Delete();
                success = "ok";
            }
            catch (Exception ex)
            {
                success = ex.Message;
            }
            return Json(success, JsonRequestBehavior.AllowGet);
        }
    }
}