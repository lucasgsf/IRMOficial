using IRM_Oficial.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IRM_Oficial.Models
{
    public class Conteudo
    {
        DB_IRMOficial db = new DB_IRMOficial();

        public List<ConteudoDTO> listarConteudos()
        {
            List<ConteudoDTO> lstConteudos = new List<ConteudoDTO>();
            lstConteudos = (from ct in db.TB_CONTEUDO
                            let curtidas = (from ac in db.TB_ACOES_CONTEUDO where ac.ID_CONTEUDO == ct.ID_CONTEUDO && ac.FL_CURTIR select ac.ID_ACOES_CONTEUDO).Count()
                            //join ac in db.TB_ACOES_CONTEUDO
                            //    on ct.ID_CONTEUDO equals ac.ID_CONTEUDO into _ap
                            orderby ct.NR_ORDEM ascending
                            select new ConteudoDTO
                            {
                                ID_CONTEUDO = ct.ID_CONTEUDO,
                                DS_CONTEUDO = ct.DS_CONTEUDO,
                                DS_LINK = ct.DS_LINK,
                                FL_VIDEO = ct.FL_VIDEO,
                                IM_IMAGEM = ct.IM_IMAGEM,
                                NR_ORDEM = ct.NR_ORDEM,
                                NR_CURTIDAS = curtidas,
                            }).ToList();
            return lstConteudos;
        }

        public List<ConteudoDTO> listarConteudosResume()
        {
            List<ConteudoDTO> lstConteudos = new List<ConteudoDTO>();
            lstConteudos = (from ct in db.TB_CONTEUDO
                            let curtidas = (from ac in db.TB_ACOES_CONTEUDO where ac.ID_CONTEUDO == ct.ID_CONTEUDO && ac.FL_CURTIR select ac.ID_ACOES_CONTEUDO).Count()
                            orderby ct.NR_ORDEM ascending
                            select new ConteudoDTO
                            {
                                ID_CONTEUDO = ct.ID_CONTEUDO,
                                DS_CONTEUDO = ct.DS_CONTEUDO,
                                DS_LINK = ct.DS_LINK,
                                FL_VIDEO = ct.FL_VIDEO,
                                DS_IMAGEM = Util.urlCDN + ct.DS_IMAGEM,
                                NR_ORDEM = ct.NR_ORDEM,
                                NR_CURTIDAS = curtidas,
                            }).ToList();
            return lstConteudos;
        }

        public TB_CONTEUDO getConteudo(TB_CONTEUDO conteudo)
        {
            return db.TB_CONTEUDO.Find(conteudo.ID_CONTEUDO);
        }

        public void cadConteudo(TB_CONTEUDO conteudo)
        {
            db.TB_CONTEUDO.Add(conteudo);
            db.SaveChanges();
        }

        public void altConteudo(TB_CONTEUDO conteudo)
        {
            TB_CONTEUDO conteudo_old = db.TB_CONTEUDO.Find(conteudo.ID_CONTEUDO);
            if(conteudo_old != null)
            {
                db.Entry(conteudo_old).CurrentValues.SetValues(conteudo);
                db.SaveChanges();
            }
        }

        public void delConteudo(TB_CONTEUDO conteudo)
        {
            db.TB_CONTEUDO.Remove(db.TB_CONTEUDO.Find(conteudo.ID_CONTEUDO));
            db.SaveChanges();
        }
    }
}