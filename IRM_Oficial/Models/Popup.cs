using IRM_Oficial.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IRM_Oficial.Models
{
    public class Popup
    {
        DB_IRMOficial db = new DB_IRMOficial();

        public List<PopupDTO> listarPopups()
        {
            List<PopupDTO> lstConteudos = new List<PopupDTO>();
            lstConteudos = (from p in db.TB_POPUP
                            orderby p.DT_POPUP descending
                            select new PopupDTO
                            {
                                ID_POPUP = p.ID_POPUP,
                                DS_TITULO = p.DS_TITULO,
                                DS_IMAGEM = p.DS_IMAGEM,
                                DS_POPUP = p.DS_POPUP,
                                DT_POPUP = p.DT_POPUP,
                                FL_ATIVO = p.FL_ATIVO
                            }).ToList();
            return lstConteudos;
        }

        public PopupDTO getPopupAtivo()
        {
            PopupDTO popupAtivo = new PopupDTO();
            popupAtivo = (from p in db.TB_POPUP
                          where p.FL_ATIVO.HasValue && p.FL_ATIVO.Value
                          orderby p.DT_POPUP descending
                          select new PopupDTO
                          {
                              ID_POPUP = p.ID_POPUP,
                              DS_TITULO = p.DS_TITULO,
                              DS_IMAGEM = Util.urlCDN + p.DS_IMAGEM,
                              DS_POPUP = p.DS_POPUP,
                              DT_POPUP = p.DT_POPUP,
                              FL_ATIVO = p.FL_ATIVO
                          }).FirstOrDefault();
            return popupAtivo;
        }

        public TB_POPUP getPopup(TB_POPUP popup)
        {
            return db.TB_POPUP.Find(popup.ID_POPUP);
        }

        public void cadPopup(TB_POPUP popup)
        {
            popup.DT_POPUP = DateTime.Now;
            db.TB_POPUP.Add(popup);
            db.SaveChanges();
            
            if (popup.FL_ATIVO.HasValue && popup.FL_ATIVO.Value)
            {
                setUnicoPopupAtivo(popup);
            }
        }

        public void altPopup(TB_POPUP popup)
        {
            TB_POPUP conteudo_old = db.TB_POPUP.Find(popup.ID_POPUP);
            if(conteudo_old != null)
            {
                db.Entry(conteudo_old).CurrentValues.SetValues(popup);
                db.SaveChanges();
            }
            if (popup.FL_ATIVO.HasValue && popup.FL_ATIVO.Value)
            {
                setUnicoPopupAtivo(popup);
            }
        }

        public void delPopup(TB_POPUP popup)
        {
            db.TB_POPUP.Remove(db.TB_POPUP.Find(popup.ID_POPUP));
            db.SaveChanges();
        }

        private void setUnicoPopupAtivo(TB_POPUP popup)
        {
            List<TB_POPUP> lstPopups = db.TB_POPUP.Where(x => x.FL_ATIVO.HasValue && x.FL_ATIVO.Value && x.ID_POPUP != popup.ID_POPUP).ToList();

            foreach(TB_POPUP pop in lstPopups)
            {
                pop.FL_ATIVO = false;
                altPopup(pop);
            }
        }
    }
}