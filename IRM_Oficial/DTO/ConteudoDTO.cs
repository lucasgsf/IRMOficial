using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IRM_Oficial.DTO
{
    public class ConteudoDTO
    {
        public int ID_CONTEUDO { get; set; }
        public byte[] IM_IMAGEM { get; set; }
        public string DS_LINK { get; set; }
        public string DS_CONTEUDO { get; set; }
        public int NR_ORDEM { get; set; }
        public Nullable<bool> FL_VIDEO { get; set; }
        public int ID_ACOES_CONTEUDO { get; set; }
        public bool FL_CURTIR { get; set; }
        public DateTime DT_ACAO_CURTIR { get; set; }
        public int ID_USUARIO { get; set; }
        public int NR_CURTIDAS { get; set; }
    }
}