using IRM_Oficial.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace IRM_Oficial.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DocumentoController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage listarDocumentos()
        {
            try
            {
                Documento doc = new Documento();
                return Request.CreateResponse(HttpStatusCode.OK, doc.listarDocumentos());
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage listarDocumentosPorData(DateTime data)
        {
            try
            {
                Documento doc = new Documento ();
                return Request.CreateResponse(HttpStatusCode.OK, doc.listarDocumentosPorData(data));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage getDocumento(TB_DOCUMENTO documento)
        {
            try
            {
                Documento doc = new Documento ();
                return Request.CreateResponse(HttpStatusCode.OK, doc.getDocumento(documento));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage cadDocumento(TB_DOCUMENTO documento)
        {
            try
            {
                Documento doc = new Documento ();
                doc.cadDocumento(documento);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage cadDocumentoFile()
        {
            try
            {
                Documento ct = new Documento();
                HttpRequest httpRequest = HttpContext.Current.Request;
                var form = httpRequest.Form;
                HttpPostedFile arq = httpRequest.Files[0];

                TB_DOCUMENTO documento = new TB_DOCUMENTO();

                if (form["ID_DOCUMENTO"] != null)
                {
                    documento.ID_DOCUMENTO = Convert.ToInt32(form["ID_DOCUMENTO"].ToString());
                    documento = ct.getDocumento(documento);
                }
                else
                {
                    documento.DS_DESCRICAO = form["DS_DESCRICAO"].ToString();
                    documento.DS_NOME = form["DS_NOME"].ToString();
                    documento.NR_ORDEM = Convert.ToInt32(form["NR_ORDEM"].ToString());
                    documento.FL_FIXO = Convert.ToBoolean(form["FL_FIXO"].ToString());
                    documento.IM_DOCUMENTO = new byte[0];
                    documento.DT_CADASTRO = DateTime.Parse(form["DT_CADASTRO"].ToString());
                }

                if (Path.GetExtension(arq.FileName).ToString() == ".pdf")
                {
                    byte[] fileData = null;
                    using (var binaryReader = new BinaryReader(arq.InputStream))
                    {
                        fileData = binaryReader.ReadBytes(arq.ContentLength);
                    }
                    documento.IM_DOCUMENTO = fileData;
                }

                if (form["IM_DOCUMENTO"] == null)
                    ct.cadDocumento(documento);
                else
                    ct.altDocumento(documento);

                return Request.CreateResponse(HttpStatusCode.OK, documento.ID_DOCUMENTO);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage altDocumento(TB_DOCUMENTO documento)
        {
            try
            {
                Documento doc = new Documento ();
                doc.altDocumento(documento);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage delDocumento(TB_DOCUMENTO documento)
        {
            try
            {
                Documento doc = new Documento();
                doc.delDocumento(documento);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }
    }
}
