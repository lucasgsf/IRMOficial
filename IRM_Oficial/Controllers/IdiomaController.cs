using IRM_Oficial.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace IRM_Oficial.Controllers
{
    public class IdiomaController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage listarIdiomas()
        {
            try
            {
                Idioma idm = new Idioma ();
                return Request.CreateResponse(HttpStatusCode.OK, idm.listarIdiomas());
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage getIdioma(TB_IDIOMA idioma)
        {
            try
            {
                Idioma idm = new Idioma ();
                return Request.CreateResponse(HttpStatusCode.OK, idm.getIdioma(idioma));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage cadIdioma(TB_IDIOMA idioma)
        {
            try
            {
                Idioma idm = new Idioma ();
                idm.cadIdioma(idioma);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage altIdioma(TB_IDIOMA idioma)
        {
            try
            {
                Idioma idm = new Idioma ();
                idm.altIdioma(idioma);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage delIdioma(TB_IDIOMA idioma)
        {
            try
            {
                Idioma idm = new Idioma();
                idm.delIdioma(idioma);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }
    }
}
