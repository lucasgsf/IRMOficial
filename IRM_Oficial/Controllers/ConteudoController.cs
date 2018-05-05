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
    public class ConteudoController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage listarConteudos()
        {
            try
            {
                Conteudo ctu = new Conteudo ();
                return Request.CreateResponse(HttpStatusCode.OK, ctu.listarConteudos());
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage getConteudo(TB_CONTEUDO conteudo)
        {
            try
            {
                Conteudo ctu = new Conteudo ();
                return Request.CreateResponse(HttpStatusCode.OK, ctu.getConteudo(conteudo));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage cadConteudo(TB_CONTEUDO conteudo)
        {
            try
            {
                Conteudo ctu = new Conteudo ();
                ctu.cadConteudo(conteudo);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage cadConteudoFoto()
        {
            try
            {
                Conteudo ct = new Conteudo();
                HttpRequest httpRequest = HttpContext.Current.Request;
                var form = httpRequest.Form;
                HttpPostedFile arq = httpRequest.Files[0];

                TB_CONTEUDO conteudo = new TB_CONTEUDO();

                if (form["ID_CONTEUDO"] != null)
                {
                    conteudo.ID_CONTEUDO = Convert.ToInt32(form["ID_CONTEUDO"].ToString());
                    conteudo = ct.getConteudo(conteudo);
                }
                else
                {
                    conteudo.DS_LINK = (form["DS_LINK"] != null && !String.IsNullOrEmpty(form["DS_LINK"].ToString())) ? form["DS_LINK"].ToString() : String.Empty;
                    conteudo.DS_CONTEUDO = form["DS_CONTEUDO"].ToString();
                    conteudo.NR_ORDEM = Convert.ToInt32(form["NR_ORDEM"].ToString());
                    conteudo.IM_IMAGEM = new byte[0];
                    conteudo.FL_VIDEO = (form["FL_VIDEO"] != null && Convert.ToBoolean(form["FL_VIDEO"].ToString()));
                }

                if (Path.GetExtension(arq.FileName).ToString() == ".jpg" || Path.GetExtension(arq.FileName).ToString() == ".png" || Path.GetExtension(arq.FileName).ToString() == ".jpeg")
                {
                    byte[] fileData = null;
                    using (var binaryReader = new BinaryReader(arq.InputStream))
                    {
                        fileData = binaryReader.ReadBytes(arq.ContentLength);
                    }
                    conteudo.IM_IMAGEM = fileData;
                }

                if (form["ID_CONTEUDO"] == null)
                    ct.cadConteudo(conteudo);
                else
                    ct.altConteudo(conteudo);

                return Request.CreateResponse(HttpStatusCode.OK, conteudo.ID_CONTEUDO);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage altConteudo(TB_CONTEUDO conteudo)
        {
            try
            {
                Conteudo ctu = new Conteudo ();
                ctu.altConteudo(conteudo);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage delConteudo(TB_CONTEUDO conteudo)
        {
            try
            {
                Conteudo ctu = new Conteudo();
                ctu.delConteudo(conteudo);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }
    }
}
