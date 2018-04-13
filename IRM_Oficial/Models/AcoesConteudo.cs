using IRM_Oficial.DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;

namespace IRM_Oficial.Models
{
    public class AcoesConteudo
    {
        DB_IRMOficial db = new DB_IRMOficial();

        public List<TB_ACOES_CONTEUDO> listarAcoesConteudos()
        {
            return db.TB_ACOES_CONTEUDO.ToList();
        }

        public TB_ACOES_CONTEUDO getAcoesConteudo(TB_ACOES_CONTEUDO acoes_conteudo)
        {
            return db.TB_ACOES_CONTEUDO.Find(acoes_conteudo.ID_ACOES_CONTEUDO);
        }

        public int cadAcoesConteudo(TB_ACOES_CONTEUDO acoes_conteudo)
        {
            TB_ACOES_CONTEUDO tbAcoesConteudo = db.TB_ACOES_CONTEUDO.Where(c => c.ID_USUARIO == acoes_conteudo.ID_USUARIO && c.ID_CONTEUDO == acoes_conteudo.ID_CONTEUDO).FirstOrDefault();
            if (tbAcoesConteudo != null)
            {
                altAcoesConteudo(tbAcoesConteudo, acoes_conteudo);
                return tbAcoesConteudo.ID_ACOES_CONTEUDO;
            }
            else
            {
                db.TB_ACOES_CONTEUDO.Add(acoes_conteudo);
                db.SaveChanges();
                return acoes_conteudo.ID_ACOES_CONTEUDO;
            }
        }

        public void altAcoesConteudo(TB_ACOES_CONTEUDO acoes_conteudo_old, TB_ACOES_CONTEUDO acoes_conteudo)
        {
            if(acoes_conteudo_old != null)
            {
                acoes_conteudo.ID_ACOES_CONTEUDO = acoes_conteudo_old.ID_ACOES_CONTEUDO;
                db.Entry(acoes_conteudo_old).CurrentValues.SetValues(acoes_conteudo);
                db.SaveChanges();
            }
        }

        public void delAcoesConteudo(TB_ACOES_CONTEUDO acoes_conteudo)
        {
            db.TB_ACOES_CONTEUDO.Remove(db.TB_ACOES_CONTEUDO.Find(acoes_conteudo.ID_ACOES_CONTEUDO));
            db.SaveChanges();
        }

        public int totalCurtidas(DateTime inicio, DateTime fim)
        {
            return (from ap in db.TB_ACOES_CONTEUDO
                    where DbFunctions.TruncateTime(ap.DT_ACAO_CURTIR) >= inicio.Date
                        && DbFunctions.TruncateTime(ap.DT_ACAO_CURTIR) <= fim.Date
                        && ap.FL_CURTIR
                    select new ConteudoDTO
                    {
                        ID_CONTEUDO = ap.ID_CONTEUDO
                    }).Count();
        }
    }
}