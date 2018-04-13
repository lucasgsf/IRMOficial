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
    public class AcoesConteudoController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage listarAcoesConteudo()
        {
            try
            {
                AcoesConteudo ctd = new AcoesConteudo ();
                return Request.CreateResponse(HttpStatusCode.OK, ctd.listarAcoesConteudos());
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage getAcoesConteudo(int id)
        {
            try
            {
                AcoesConteudo ctd = new AcoesConteudo ();
                TB_ACOES_CONTEUDO acoes_conteudo = new TB_ACOES_CONTEUDO();
                acoes_conteudo.ID_ACOES_CONTEUDO = id;
                return Request.CreateResponse(HttpStatusCode.OK, ctd.getAcoesConteudo(acoes_conteudo));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage cadAcoesConteudo(TB_ACOES_CONTEUDO acoes_conteudo)
        {
            try
            {
               AcoesConteudo ctd = new AcoesConteudo();
                ctd.cadAcoesConteudo(acoes_conteudo);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage delAcoesConteudo(TB_ACOES_CONTEUDO acoes_conteudo)
        {
            try
            {
               AcoesConteudo ctd = new AcoesConteudo();
                ctd.delAcoesConteudo(acoes_conteudo);
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
                AcoesConteudo ctd = new AcoesConteudo();
                return Request.CreateResponse(HttpStatusCode.OK, ctd.totalCurtidas(inicio, fim));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }
    }
}
