using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IRM_Oficial.DTO
{
    public class PopupDTO
    {
        public int ID_POPUP { get; set; }

        public string DS_TITULO { get; set; }

        public string DS_POPUP { get; set; }

        public string DS_IMAGEM { get; set; }

        public Nullable<bool> FL_ATIVO { get; set; }

        public Nullable<System.DateTime> DT_POPUP { get; set; }
    }
}