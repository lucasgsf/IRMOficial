using IRM_Oficial.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace IRM_Oficial.Controllers
{
    public class TipoUsuarioController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage listarTiposUsuario()
        {
            try
            {
                TipoUsuario tpu = new TipoUsuario ();
                return Request.CreateResponse(HttpStatusCode.OK, tpu.listarTiposUsuario());
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage getTipoUsuario(TB_TIPO_USUARIO tipo_usuario)
        {
            try
            {
                TipoUsuario tpu = new TipoUsuario ();
                return Request.CreateResponse(HttpStatusCode.OK, tpu.getTipoUsuario(tipo_usuario));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage cadTipoUsuario (TB_TIPO_USUARIO tipo_usuario)
        {
            try
            {
                TipoUsuario tpu = new TipoUsuario ();
                tpu.cadTipoUsuario (tipo_usuario);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage altTipoUsuario(TB_TIPO_USUARIO tipo_usuario)
        {
            try
            {
                TipoUsuario tpu = new TipoUsuario ();
                tpu.altTipoUsuario(tipo_usuario);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage delTipoUsuario(TB_TIPO_USUARIO tipo_usuario)
        {
            try
            {
                TipoUsuario tpu = new TipoUsuario();
                tpu.delTipoUsuario (tipo_usuario);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }
    }
}
