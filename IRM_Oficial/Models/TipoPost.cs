using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IRM_Oficial.Models
{
    public class TipoPost
    {
        DB_IRMOficial db = new DB_IRMOficial();

        public List<TB_TIPO_POST> listarTiposPost()
        {
            return db.TB_TIPO_POST.ToList();
        }

        public TB_TIPO_POST getTipoPost(TB_TIPO_POST tipo_post)
        {
            return db.TB_TIPO_POST.Find(tipo_post.ID_TIPO_POST);
        }

        public void cadTipoPost(TB_TIPO_POST tipo_post)
        {
            db.TB_TIPO_POST.Add(tipo_post);
            db.SaveChanges();
        }

        public void altTipoPost(TB_TIPO_POST tipo_post)
        {
            TB_TIPO_POST tipo_post_old = db.TB_TIPO_POST.Find(tipo_post.ID_TIPO_POST);
            if(tipo_post_old != null)
            {
                db.Entry(tipo_post_old).CurrentValues.SetValues(tipo_post);
                db.SaveChanges();
            }
        }

        public void delTipoPost(TB_TIPO_POST tipo_post)
        {
            db.TB_TIPO_POST.Remove(db.TB_TIPO_POST.Find(tipo_post.ID_TIPO_POST));
            db.SaveChanges();
        }
    }
}