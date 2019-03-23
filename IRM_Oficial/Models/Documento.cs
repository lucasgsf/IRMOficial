using IRM_Oficial.DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace IRM_Oficial.Models
{
    public class Documento
    {
        DB_IRMOficial db = new DB_IRMOficial();

        public List<DocumentoDTO> listarDocumentos()
        {
            List<DocumentoDTO> lstConteudos = new List<DocumentoDTO>();
            lstConteudos = (from ct in db.TB_DOCUMENTO
                            orderby ct.NR_ORDEM ascending
                            select new DocumentoDTO
                            {
                                DS_DESCRICAO = ct.DS_DESCRICAO,
                                DS_NOME = ct.DS_NOME,
                                DT_CADASTRO = ct.DT_CADASTRO,
                                FL_FIXO = ct.FL_FIXO,
                                ID_DOCUMENTO = ct.ID_DOCUMENTO,
                                DS_ARQUIVO = "https://irmoficial.azureedge.net" + ct.DS_ARQUIVO,
                                NR_ORDEM = ct.NR_ORDEM
                            }).ToList();
            return lstConteudos;
        }

        public List<DocumentoDTO> listarDocumentosPorData(DateTime data)
        {
            data = data.Date;
            List<DocumentoDTO> lstConteudos = new List<DocumentoDTO>();
            lstConteudos = (from ct in db.TB_DOCUMENTO
                            where (DbFunctions.TruncateTime(ct.DT_CADASTRO) == data) || (ct.FL_FIXO.HasValue && ct.FL_FIXO.Value)
                            orderby ct.NR_ORDEM ascending
                            select new DocumentoDTO
                            {
                                DS_DESCRICAO = ct.DS_DESCRICAO,
                                DS_NOME = ct.DS_NOME,
                                DT_CADASTRO = ct.DT_CADASTRO,
                                FL_FIXO = ct.FL_FIXO,
                                ID_DOCUMENTO = ct.ID_DOCUMENTO,
                                DS_ARQUIVO = "https://irmoficial.azureedge.net" + ct.DS_ARQUIVO,
                                NR_ORDEM = ct.NR_ORDEM
                            }).ToList();
            return lstConteudos;
        }

        public TB_DOCUMENTO getDocumento(TB_DOCUMENTO documento)
        {
            return db.TB_DOCUMENTO.Find(documento.ID_DOCUMENTO);
        }

        public int cadDocumento(TB_DOCUMENTO documento)
        {
            db.TB_DOCUMENTO.Add(documento);
            db.SaveChanges();
            return documento.ID_DOCUMENTO;
        }

        public void altDocumento(TB_DOCUMENTO documento)
        {
            TB_DOCUMENTO documento_old = db.TB_DOCUMENTO.Find(documento.ID_DOCUMENTO);
            if(documento_old != null)
            {
                documento_old.DS_DESCRICAO = documento.DS_DESCRICAO;
                documento_old.DS_NOME = documento.DS_NOME;
                documento_old.DT_CADASTRO = documento.DT_CADASTRO;
                documento_old.FL_FIXO = documento.FL_FIXO;
                documento_old.NR_ORDEM = documento.NR_ORDEM;
                db.SaveChanges();
            }
        }

        public void delDocumento(TB_DOCUMENTO documento)
        {
            db.TB_DOCUMENTO.Remove(db.TB_DOCUMENTO.Find(documento.ID_DOCUMENTO));
            db.SaveChanges();
        }
    }
}