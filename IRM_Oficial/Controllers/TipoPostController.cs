using IRM_Oficial.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace IRM_Oficial.Controllers
{
    public class TipoPostController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage listarTiposPost()
        {
            try
            {
                TipoPost tpp = new TipoPost();
                return Request.CreateResponse(HttpStatusCode.OK, tpp.listarTiposPost());
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage getTipoPost(TB_TIPO_POST tipo_post)
        {
            try
            {
                TipoPost tpp = new TipoPost();
                return Request.CreateResponse(HttpStatusCode.OK, tpp.getTipoPost(tipo_post));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage cadTipoPost(TB_TIPO_POST tipo_post)
        {
            try
            {
                TipoPost tpp = new TipoPost();
                tpp.cadTipoPost(tipo_post);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage altTipoPost(TB_TIPO_POST tipo_post)
        {
            try
            {
                TipoPost tpp = new TipoPost();
                tpp.altTipoPost(tipo_post);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage delTipoPost(TB_TIPO_POST tipo_post)
        {
            try
            {
                TipoPost tpp = new TipoPost();
                tpp.delTipoPost(tipo_post);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }
    }
}
