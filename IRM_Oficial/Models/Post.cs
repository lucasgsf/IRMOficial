using IRM_Oficial.DTO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace IRM_Oficial.Models
{
    public class Post
    {
        DB_IRMOficial db = new DB_IRMOficial();

        public List<PostDTO> listarPosts()
        {
            List<PostDTO> lstPosts = new List<PostDTO>();
            lstPosts = (from ps in db.TB_POST
                        join ap in db.TB_ACOES_POST
                            on ps.ID_POST equals ap.ID_POST
                            into _ap
                        orderby ps.DT_CADASTRO descending
                         select new PostDTO
                         {
                             ID_POST = ps.ID_POST,
                             DS_POST = ps.DS_POST,
                             DS_TITULO = ps.DS_TITULO,
                             DT_CADASTRO = ps.DT_CADASTRO,
                             NR_ORDEM = ps.NR_ORDEM,
                             FL_FIXO = ps.FL_FIXO,
                             ID_IDIOMA = ps.ID_IDIOMA,
                             ID_TIPO_POST = ps.ID_TIPO_POST,
                             NR_CURTIDAS = _ap.Count(c => c.FL_CURTIR),
                             NR_COMPARTILHAMENTOS = _ap.Count(c => c.FL_COMPARTILHAR),
                             NR_PLAYS = _ap.Count(c => c.FL_PLAY)
                         }).ToList();
            return lstPosts;
        }

        public TB_POST getPost(TB_POST post)
        {
            return db.TB_POST.Find(post.ID_POST);
        }

        public byte[] getAudioPost(TB_POST post)
        {
            TB_POST tbPost = db.TB_POST.Find(post.ID_POST);
            if (tbPost != null && !String.IsNullOrEmpty(tbPost.DS_AUDIO))
                return File.ReadAllBytes(tbPost.DS_AUDIO);
            else
                return null;
        }

        public List<PostDTO> getFeedResume(DateTime data)
        {
            List<PostDTO> lstPosts = new List<PostDTO>();
            lstPosts = (from ps in db.TB_POST
                        join id in db.TB_IDIOMA
                            on ps.ID_IDIOMA equals id.ID_IDIOMA
                        join tp in db.TB_TIPO_POST
                            on ps.ID_TIPO_POST equals tp.ID_TIPO_POST
                        join ap in db.TB_ACOES_POST
                            on ps.ID_POST equals ap.ID_POST
                            into _ap
                        where (DbFunctions.TruncateTime(ps.DT_CADASTRO) == data.Date || (ps.FL_FIXO.HasValue && ps.FL_FIXO.Value))
                            && (!String.IsNullOrEmpty(ps.DS_AUDIO))
                        orderby ps.NR_ORDEM
                        select new PostDTO
                        {
                            ID_POST = ps.ID_POST,
                            DS_POST = ps.DS_POST,
                            DS_TITULO = ps.DS_TITULO,
                            DS_IDIOMA = id.DS_IDIOMA,
                            ID_IDIOMA = ps.ID_IDIOMA,
                            DS_TIPO_POST = tp.DS_TIPO_POST,
                            ID_TIPO_POST = ps.ID_TIPO_POST,
                            DT_CADASTRO = ps.DT_CADASTRO,
                            NR_ORDEM = ps.NR_ORDEM,
                            FL_FIXO = ps.FL_FIXO,
                            IM_IMAGEM = ps.IM_IMAGEM,
                            NR_CURTIDAS = _ap.Count(c => c.FL_CURTIR),
                            NR_COMPARTILHAMENTOS = _ap.Count(c => c.FL_COMPARTILHAR)
                        }).ToList();
            return lstPosts;
        }

        public List<PostDTO> getFeed(DateTime data){
            List<PostDTO> lstPostDTO = new List<PostDTO>();
            List<TB_POST> lstPost = db.TB_POST.Where(c => DbFunctions.TruncateTime(c.DT_CADASTRO) == data.Date || (c.FL_FIXO.HasValue && c.FL_FIXO.Value)).ToList();

            foreach (TB_POST tbPost in lstPost)
            {
                if(tbPost != null)
                {
                    TB_IDIOMA tbIdioma = db.TB_IDIOMA.Find(tbPost.ID_IDIOMA);
                    TB_TIPO_POST tbTipoPost = db.TB_TIPO_POST.Find(tbPost.ID_TIPO_POST);

                    PostDTO postDTO = new PostDTO();
                    postDTO.DS_POST = tbPost.DS_POST;
                    postDTO.DS_TITULO = tbPost.DS_TITULO;
                    postDTO.DT_CADASTRO = tbPost.DT_CADASTRO;
                    postDTO.NR_ORDEM = tbPost.NR_ORDEM;
                    postDTO.ID_IDIOMA = tbPost.ID_IDIOMA;
                    postDTO.ID_POST = tbPost.ID_POST;
                    postDTO.ID_TIPO_POST = tbPost.ID_TIPO_POST;
                    postDTO.IM_IMAGEM = tbPost.IM_IMAGEM;
                    postDTO.DS_IDIOMA = tbIdioma.DS_IDIOMA;
                    postDTO.DS_TIPO_POST = tbTipoPost.DS_TIPO_POST;
                    postDTO.IM_AUDIO = File.ReadAllBytes(tbPost.DS_AUDIO);

                    lstPostDTO.Add(postDTO);
                }
            }
           return lstPostDTO;
        }

        public int cadPost(TB_POST post)
        {
            db.TB_POST.Add(post);
            db.SaveChanges();
            return post.ID_POST;
        }

        public void altPost(TB_POST post)
        {
            TB_POST post_old = db.TB_POST.Find(post.ID_POST);
            if(post_old != null)
            {
                post_old.DS_POST = post.DS_POST;
                post_old.DS_TITULO = post.DS_TITULO;
                post_old.DT_CADASTRO = post.DT_CADASTRO;
                post_old.NR_ORDEM = post.NR_ORDEM;
                post_old.ID_IDIOMA = post.ID_IDIOMA;
                post_old.ID_TIPO_POST = post.ID_TIPO_POST;
                post_old.FL_FIXO = post.FL_FIXO;
                db.SaveChanges();
            }
        }

        public void delPost(TB_POST post)
        {
            db.TB_POST.Remove(db.TB_POST.Find(post.ID_POST));
            db.SaveChanges();
        }

        public List<PostDTO> postsPorData(DateTime inicio, DateTime fim)
        {
            List<PostDTO> lstPosts = new List<PostDTO>();
            var query = (from ps in db.TB_POST
                         join ac in db.TB_ACOES_POST
                         on ps.ID_POST equals ac.ID_POST
                         where DbFunctions.TruncateTime(ps.DT_CADASTRO) >= inicio.Date
                             && DbFunctions.TruncateTime(ps.DT_CADASTRO) <= fim.Date
                         select new PostDTO
                         {
                             ID_POST = ps.ID_POST,
                             DS_POST = ps.DS_POST,
                             DS_TITULO = ps.DS_TITULO,
                             NR_CURTIDAS = db.TB_ACOES_POST.Count(c => c.ID_POST == ps.ID_POST && c.FL_CURTIR),
                             NR_NAO_CURTIDAS = db.TB_ACOES_POST.Count(c => c.ID_POST == ps.ID_POST && c.FL_NAO_CURTIR)
                         }).ToList().OrderByDescending(c => c.NR_CURTIDAS).ThenBy(c => c.NR_NAO_CURTIDAS);
            lstPosts.Add(query.FirstOrDefault());
            lstPosts.Add(query.LastOrDefault());
            return lstPosts;
        }

        public int totalPosts(DateTime inicio, DateTime fim)
        {
            return db.TB_POST.Where(c => DbFunctions.TruncateTime(c.DT_CADASTRO) >= inicio.Date && DbFunctions.TruncateTime(c.DT_CADASTRO) <= fim.Date).Count();
        }

        public static DateTime PegaHoraBrasilia()
        {
            return TimeZoneInfo.ConvertTime(DateTime.Now, TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time"));
        }
    }
}