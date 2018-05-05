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
    public class PostController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage listarPosts()
        {
            try
            {
                Post pst = new Post ();
                return Request.CreateResponse(HttpStatusCode.OK, pst.listarPosts());
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage getPost(int id)
        {
            try
            {
                Post pst = new Post ();
                TB_POST post = new TB_POST();
                post.ID_POST = id;
                return Request.CreateResponse(HttpStatusCode.OK, pst.getPost(post));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage getPostDetalhado(int id)
        {
            try
            {
                Post pst = new Post();
                TB_POST post = new TB_POST();
                post.ID_POST = id;
                return Request.CreateResponse(HttpStatusCode.OK, pst.getPostDetalhado(post));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        /*[HttpGet]
        public HttpResponseMessage getAudioPost(int id)
        {
            try
            {
                Post pst = new Post();
                TB_POST post = new TB_POST();
                post.ID_POST = id;
                return Request.CreateResponse(HttpStatusCode.OK, pst.getAudioPost(post));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }*/

        [HttpGet]
        public HttpResponseMessage getAudioPost(int id)
        {
            try
            {
                HttpResponse Response = HttpContext.Current.Response;
                if (IsGZipSupported())
                {
                    string AcceptEncoding = HttpContext.Current.Request.Headers["Accept-Encoding"];
                    if (AcceptEncoding.Contains("gzip"))
                    {
                        Response.Filter = new System.IO.Compression.GZipStream(Response.Filter,
                                                  System.IO.Compression.CompressionMode.Compress);
                        Response.AppendHeader("Content-Encoding", "gzip");
                    }
                    else
                    {
                        Response.Filter = new System.IO.Compression.DeflateStream(Response.Filter,
                                                  System.IO.Compression.CompressionMode.Compress);
                        Response.AppendHeader("Content-Encoding", "deflate");
                    }
                }
                Post pst = new Post();
                TB_POST post = new TB_POST();
                post.ID_POST = id;
                return Request.CreateResponse(HttpStatusCode.OK, pst.getAudioPost(post));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage getFeedResume(DateTime data)
        {
            try
            {
                Post pst = new Post();
                return Request.CreateResponse(HttpStatusCode.OK, pst.getFeedResume(data));
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage getFeed(DateTime data)
        {
            try
            {
                Post pst = new Post();
                return Request.CreateResponse(HttpStatusCode.OK, pst.getFeed(data));
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage cadPost(TB_POST post)
        {
            try
            {
                Post pst = new Post();
                int Id = pst.cadPost(post);
                return Request.CreateResponse(HttpStatusCode.OK, new { valid = true, id = Id });
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage cadPostFoto()
        {
            try
            {
                Post pst = new Post();
                HttpRequest httpRequest = HttpContext.Current.Request;
                var form = httpRequest.Form;
                HttpPostedFile arq = httpRequest.Files[0];
                
                TB_POST post = new TB_POST();

                if (form["ID_POST"] != null)
                {
                    post.ID_POST = Convert.ToInt32(form["ID_POST"].ToString());
                    post = pst.getPost(post);

                    if (Path.GetExtension(arq.FileName).ToString() == ".jpg" || Path.GetExtension(arq.FileName).ToString() == ".png" || Path.GetExtension(arq.FileName).ToString() == ".jpeg")
                    {
                        byte[] fileData = null;
                        using (var binaryReader = new BinaryReader(arq.InputStream))
                        {
                            fileData = binaryReader.ReadBytes(arq.ContentLength);
                        }
                        post.IM_IMAGEM = fileData;
                    }

                    if (Path.GetExtension(arq.FileName).ToString() == ".mp3")
                    {
                        string path = System.AppDomain.CurrentDomain.BaseDirectory + "//posts//" + post.ID_POST;
                        if (!Directory.Exists(path))
                            Directory.CreateDirectory(path);
                        path += "//audio.mp3";
                        arq.SaveAs(path);
                        post.DS_AUDIO = path;
                    }

                    pst.altPost(post);
                    return Request.CreateResponse(HttpStatusCode.OK, true);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, false);
                }
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage altPost(TB_POST post)
        {
            try
            {
                Post pst = new Post ();
                pst.altPost(post);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage delPost(TB_POST post)
        {
            try
            {
                Post pst = new Post();
                pst.delPost(post);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage postsPorData(DateTime inicio, DateTime fim)
        {
            try
            {
                Post pst = new Post();
                return Request.CreateResponse(HttpStatusCode.OK, pst.postsPorData(inicio, fim));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage totalPosts(DateTime inicio, DateTime fim)
        {
            try
            {
                Post pst = new Post();
                return Request.CreateResponse(HttpStatusCode.OK, pst.totalPosts(inicio, fim));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        private static bool IsGZipSupported()
        {
            string AcceptEncoding = HttpContext.Current.Request.Headers["Accept-Encoding"];
            if (!string.IsNullOrEmpty(AcceptEncoding) &&
                 (AcceptEncoding.Contains("gzip") || AcceptEncoding.Contains("deflate")))
                return true;
            return false;
        }
    }
}
