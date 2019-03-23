using IRM_Oficial.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace IRM_Oficial.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PopupController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage listarPopups()
        {
            try
            {
                Popup pop = new Popup ();
                return Request.CreateResponse(HttpStatusCode.OK, pop.listarPopups());
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage getPopupAtivo()
        {
            try
            {
                Popup pop = new Popup();
                return Request.CreateResponse(HttpStatusCode.OK, pop.getPopupAtivo());
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage getPopup(TB_POPUP popup)
        {
            try
            {
                Popup pop = new Popup ();
                return Request.CreateResponse(HttpStatusCode.OK, pop.getPopup(popup));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage cadPopup(TB_POPUP popup)
        {
            try
            {
                Popup pop = new Popup ();
                pop.cadPopup(popup);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage cadPopupFoto()
        {
            try
            {
                Popup ct = new Popup();
                HttpRequest httpRequest = HttpContext.Current.Request;
                var form = httpRequest.Form;
                HttpPostedFile arq = httpRequest.Files[0];

                TB_POPUP popup = new TB_POPUP();

                if (form["ID_POPUP"] != null)
                {
                    popup.ID_POPUP = Convert.ToInt32(form["ID_POPUP"].ToString());
                    popup = ct.getPopup(popup);
                }
                else
                {
                    popup.DS_POPUP = form["DS_POPUP"].ToString();
                    popup.DS_TITULO = form["DS_TITULO"].ToString();
                    popup.FL_ATIVO = (form["FL_ATIVO"] != null && Convert.ToBoolean(form["FL_ATIVO"].ToString()));
                }

                if (form["ID_POPUP"] == null)
                    ct.cadPopup(popup);
                else
                    ct.altPopup(popup);

                if (popup.ID_POPUP > 0 && (Path.GetExtension(arq.FileName).ToString() == ".jpg" || Path.GetExtension(arq.FileName).ToString() == ".png" || Path.GetExtension(arq.FileName).ToString() == ".jpeg"))
                {
                    // Salvando imagem no disco
                    string path = System.AppDomain.CurrentDomain.BaseDirectory + "//popups//" + popup.ID_POPUP;
                    if (!Directory.Exists(path))
                        Directory.CreateDirectory(path);

                    path += "//" + arq.FileName;
                    arq.SaveAs(path);
                    popup.DS_IMAGEM = "/popups/" + popup.ID_POPUP + "/" + arq.FileName;
                    ct.altPopup(popup);
                }

                return Request.CreateResponse(HttpStatusCode.OK, popup.ID_POPUP);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage altPopup(TB_POPUP popup)
        {
            try
            {
                Popup pop = new Popup ();
                pop.altPopup(popup);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage delPopup(TB_POPUP popup)
        {
            try
            {
                Popup pop = new Popup();
                pop.delPopup(popup);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }
    }
}
