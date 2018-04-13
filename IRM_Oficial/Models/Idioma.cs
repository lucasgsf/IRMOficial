using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IRM_Oficial.Models
{
    public class Idioma
    {
        DB_IRMOficial db = new DB_IRMOficial();

        public List<TB_IDIOMA> listarIdiomas()
        {
            return db.TB_IDIOMA.ToList();
        }

        public TB_IDIOMA getIdioma(TB_IDIOMA idioma)
        {
            return db.TB_IDIOMA.Find(idioma.ID_IDIOMA);
        }

        public void cadIdioma(TB_IDIOMA idioma)
        {
            db.TB_IDIOMA.Add(idioma);
            db.SaveChanges();
        }

        public void altIdioma(TB_IDIOMA idioma)
        {
            TB_IDIOMA idioma_old = db.TB_IDIOMA.Find(idioma.ID_IDIOMA);
            if(idioma_old != null)
            {
                db.Entry(idioma_old).CurrentValues.SetValues(idioma);
                db.SaveChanges();
            }
        }

        public void delIdioma(TB_IDIOMA idioma)
        {
            db.TB_IDIOMA.Remove(db.TB_IDIOMA.Find(idioma.ID_IDIOMA));
            db.SaveChanges();
        }
    }
}