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
                                ID_DOCUMENTO = ct.ID_DOCUMENTO
,
                            }).ToList();
            return lstConteudos;
        }

        public List<DocumentoDTO> listarDocumentosPorData(DateTime data)
        {
            data = data.Date;
            List<DocumentoDTO> lstConteudos = new List<DocumentoDTO>();
            lstConteudos = (from ct in db.TB_DOCUMENTO
                            where (DbFunctions.TruncateTime(ct.DT_CADASTRO) == data) || ct.FL_FIXO
                            orderby ct.NR_ORDEM ascending
                            select new DocumentoDTO
                            {
                                DS_DESCRICAO = ct.DS_DESCRICAO,
                                DS_NOME = ct.DS_NOME,
                                DT_CADASTRO = ct.DT_CADASTRO,
                                FL_FIXO = ct.FL_FIXO,
                                ID_DOCUMENTO = ct.ID_DOCUMENTO
,
                            }).ToList();
            return lstConteudos;
        }

        public TB_DOCUMENTO getDocumento(TB_DOCUMENTO conteudo)
        {
            return db.TB_DOCUMENTO.Find(conteudo.ID_DOCUMENTO);
        }

        public void cadDocumento(TB_DOCUMENTO conteudo)
        {
            db.TB_DOCUMENTO.Add(conteudo);
            db.SaveChanges();
        }

        public void altDocumento(TB_DOCUMENTO conteudo)
        {
            TB_DOCUMENTO conteudo_old = db.TB_DOCUMENTO.Find(conteudo.ID_DOCUMENTO);
            if(conteudo_old != null)
            {
                conteudo_old.DS_DESCRICAO = conteudo.DS_DESCRICAO;
                conteudo_old.DS_NOME = conteudo.DS_NOME;
                conteudo_old.DT_CADASTRO = conteudo.DT_CADASTRO;
                conteudo_old.FL_FIXO = conteudo.FL_FIXO;
                conteudo_old.NR_ORDEM = conteudo.NR_ORDEM;
                db.SaveChanges();
            }
        }

        public void delDocumento(TB_DOCUMENTO conteudo)
        {
            db.TB_DOCUMENTO.Remove(db.TB_DOCUMENTO.Find(conteudo.ID_DOCUMENTO));
            db.SaveChanges();
        }
    }
}