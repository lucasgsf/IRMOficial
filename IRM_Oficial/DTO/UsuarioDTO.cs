using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IRM_Oficial.DTO
{
    public class UsuarioDTO
    {
        public string DS_ESTADO { get; set; }
        public string DS_CIDADE { get; set; }
        public string DS_PAIS { get; set; }
        public string DS_PAIS_SIGLA { get; set; }
        public int NR_QUANTIDADE { get; set; }
        public string DS_ESTADO_QUANTIDADE { get; set; }
    }
}