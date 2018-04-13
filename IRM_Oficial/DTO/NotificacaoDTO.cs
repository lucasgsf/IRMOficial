using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IRM_Oficial.DTO
{
    public class NotificacaoDTO
    {
        public string DS_TITULO { get; set; }
        public string DS_MENSAGEM { get; set; }
        public DateTime DT_ENVIO { get; set; }
    }
}