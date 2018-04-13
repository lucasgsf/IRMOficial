using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IRM_Oficial.Models
{
    public class TipoUsuario
    {
        DB_IRMOficial db = new DB_IRMOficial();

        public List<TB_TIPO_USUARIO> listarTiposUsuario()
        {
            return db.TB_TIPO_USUARIO.ToList();
        }

        public TB_TIPO_USUARIO getTipoUsuario(TB_TIPO_USUARIO tipo_usuario)
        {
            return db.TB_TIPO_USUARIO.Find(tipo_usuario.ID_TIPO_USUARIO);
        }

        public void cadTipoUsuario(TB_TIPO_USUARIO tipo_usuario)
        {
            db.TB_TIPO_USUARIO.Add(tipo_usuario);
            db.SaveChanges();
        }

        public void altTipoUsuario(TB_TIPO_USUARIO tipo_usuario)
        {
            TB_TIPO_USUARIO tipo_usuario_old = db.TB_TIPO_USUARIO.Find(tipo_usuario.ID_TIPO_USUARIO);
            if(tipo_usuario_old != null)
            {
                db.Entry(tipo_usuario_old).CurrentValues.SetValues(tipo_usuario);
                db.SaveChanges();
            }
        }

        public void delTipoUsuario(TB_TIPO_USUARIO tipo_usuario)
        {
            db.TB_TIPO_USUARIO.Remove(db.TB_TIPO_USUARIO.Find(tipo_usuario.ID_TIPO_USUARIO));
            db.SaveChanges();
        }
    }
}