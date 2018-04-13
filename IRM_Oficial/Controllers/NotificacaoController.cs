using IRM_Oficial.DTO;
using IRM_Oficial.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace IRM_Oficial.Controllers
{
    public class NotificacaoController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage enviarNotificacao(NotificacaoDTO notificacao)
        {
            try
            {
                bool enviado = Notificacao.enviarNotificacao(notificacao.DS_TITULO, notificacao.DS_MENSAGEM, notificacao.DT_ENVIO);
                return Request.CreateResponse(HttpStatusCode.OK, enviado);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }
    }
}
