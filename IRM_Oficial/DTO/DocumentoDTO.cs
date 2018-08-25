using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IRM_Oficial.DTO
{
    public class DocumentoDTO
    {
        public int ID_DOCUMENTO { get; set; }
        public string DS_NOME { get; set; }
        public string DS_DESCRICAO { get; set; }
        public System.DateTime DT_CADASTRO { get; set; }
        public Nullable<bool> FL_FIXO { get; set; }
        public int NR_ORDEM { get; set; }
        public string DS_ARQUIVO { get; set; }
    }
}