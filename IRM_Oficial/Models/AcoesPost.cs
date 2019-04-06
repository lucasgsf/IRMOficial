using IRM_Oficial.DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;

namespace IRM_Oficial.Models
{
    public class AcoesPost
    {
        DB_IRMOficial db = new DB_IRMOficial();

        public List<TB_ACOES_POST> listarAcoesPosts()
        {
            return db.TB_ACOES_POST.ToList();
        }

        public TB_ACOES_POST getAcoesPost(TB_ACOES_POST acoes_post)
        {
            return db.TB_ACOES_POST.Find(acoes_post.ID_ACOES_POST);
        }

        public int cadAcoesPost(TB_ACOES_POST acoes_post)
        {
            TB_ACOES_POST tbAcoesPost = db.TB_ACOES_POST.Where(c => c.ID_USUARIO == acoes_post.ID_USUARIO && c.ID_POST == acoes_post.ID_POST).FirstOrDefault();
            if (tbAcoesPost != null)
            {
                altAcoesPost(tbAcoesPost, acoes_post);
                return tbAcoesPost.ID_ACOES_POST;
            }
            else
            {
                db.TB_ACOES_POST.Add(acoes_post);
                db.SaveChanges();
                return acoes_post.ID_ACOES_POST;
            }
        }

        public void altAcoesPost(TB_ACOES_POST acoes_post_old, TB_ACOES_POST acoes_post)
        {
            if(acoes_post_old != null)
            {
                acoes_post.ID_ACOES_POST = acoes_post_old.ID_ACOES_POST;
                db.Entry(acoes_post_old).CurrentValues.SetValues(acoes_post);
                db.SaveChanges();
            }
        }

        public void delAcoesPost(TB_ACOES_POST acoes_post)
        {
            db.TB_ACOES_POST.Remove(db.TB_ACOES_POST.Find(acoes_post.ID_ACOES_POST));
            db.SaveChanges();
        }

        public int totalCurtidas(DateTime inicio, DateTime fim)
        {
            return db.SP_CURTIDAS_AUDIO(inicio, fim).FirstOrDefault().Value;
        }

        public int totalNaoCurtidas(DateTime inicio, DateTime fim)
        {
            return (from ap in db.TB_ACOES_POST
                    where DbFunctions.TruncateTime(ap.DT_ACAO_CURTIR) >= inicio.Date
                        && DbFunctions.TruncateTime(ap.DT_ACAO_CURTIR) <= fim.Date
                        && ap.FL_NAO_CURTIR
                    select new PostDTO
                    {
                        ID_POST = ap.ID_POST
                    }).Count();
        }

        public int totalCompartilhamentos(DateTime inicio, DateTime fim)
        {
            return db.SP_COMPARTILHAMENTOS_AUDIO(inicio, fim).FirstOrDefault().Value;
        }

        public int totalPlays(DateTime inicio, DateTime fim)
        {
            return db.SP_PLAYS_AUDIO(inicio, fim).FirstOrDefault().Value;
        }
    }
}