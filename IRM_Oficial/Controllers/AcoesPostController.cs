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
    public class AcoesPostController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage listarAcoesPost()
        {
            try
            {
                AcoesPost pst = new AcoesPost ();
                return Request.CreateResponse(HttpStatusCode.OK, pst.listarAcoesPosts());
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage getAcoesPost(int id)
        {
            try
            {
                AcoesPost pst = new AcoesPost ();
                TB_ACOES_POST acoes_post = new TB_ACOES_POST();
                acoes_post.ID_ACOES_POST = id;
                return Request.CreateResponse(HttpStatusCode.OK, pst.getAcoesPost(acoes_post));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage cadAcoesPost(TB_ACOES_POST acoes_post)
        {
            try
            {
               AcoesPost pst = new AcoesPost();
                pst.cadAcoesPost(acoes_post);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        //[HttpPost]
        //public HttpResponseMessage altAcoesPost(TB_ACOES_POST acoes_post)
        //{
        //    try
        //    {
        //       AcoesPost pst = new AcoesPost ();
        //        pst.altAcoesPost(acoes_post);
        //        return Request.CreateResponse(HttpStatusCode.OK, true);
        //    }
        //    catch (Exception)
        //    {
        //        return Request.CreateResponse(HttpStatusCode.OK, false);
        //    }
        //}

        [HttpPost]
        public HttpResponseMessage delAcoesPost(TB_ACOES_POST acoes_post)
        {
            try
            {
               AcoesPost pst = new AcoesPost();
                pst.delAcoesPost(acoes_post);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage totalCurtidas(DateTime inicio, DateTime fim)
        {
            try
            {
                AcoesPost pst = new AcoesPost();
                return Request.CreateResponse(HttpStatusCode.OK, pst.totalCurtidas(inicio, fim));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage totalNaoCurtidas(DateTime inicio, DateTime fim)
        {
            try
            {
                AcoesPost pst = new AcoesPost();
                return Request.CreateResponse(HttpStatusCode.OK, pst.totalNaoCurtidas(inicio, fim));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage totalCompartilhamentos(DateTime inicio, DateTime fim)
        {
            try
            {
                AcoesPost pst = new AcoesPost();
                return Request.CreateResponse(HttpStatusCode.OK, pst.totalCompartilhamentos(inicio, fim));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage totalPlays(DateTime inicio, DateTime fim)
        {
            try
            {
                AcoesPost pst = new AcoesPost();
                return Request.CreateResponse(HttpStatusCode.OK, pst.totalPlays(inicio, fim));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }
    }
}
