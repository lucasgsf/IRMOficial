using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IRM_Oficial.DTO
{
    public class PostDTO
    {
        public int ID_POST { get; set; }
        public string DS_POST { get; set; }
        public System.DateTime DT_CADASTRO { get; set; }
        public int NR_ORDEM { get; set; }
        public int ID_TIPO_POST { get; set; }
        public int ID_IDIOMA { get; set; }
        public string DS_TITULO { get; set; }
        public byte[] IM_IMAGEM { get; set; }
        public string DS_AUDIO { get; set; }
        public byte[] IM_AUDIO { get; set; }
        public string DS_IDIOMA { get; set; }
        public string DS_TIPO_POST{ get; set; }
        public int NR_CURTIDAS { get; set; }
        public int NR_NAO_CURTIDAS { get; set; }
        public int NR_COMPARTILHAMENTOS { get; set; }
        public int NR_PLAYS { get; set; }
        public Nullable<bool> FL_FIXO { get; set; }
    }
}