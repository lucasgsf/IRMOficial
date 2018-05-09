using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using IRM_Oficial.DTO;

namespace IRM_Oficial.Models
{
    public class Usuario
    {
        DB_IRMOficial db = new DB_IRMOficial();

        public List<TB_USUARIO> listarUsuarios()
        {
            return db.TB_USUARIO.ToList();
        }

        public TB_USUARIO getUsuario(TB_USUARIO usuario)
        {
            return db.TB_USUARIO.Find(usuario.ID_USUARIO);
        }

        public TB_USUARIO loginUsuario(TB_USUARIO usuario)
        {
            //return db.TB_USUARIO.Where(c => c.DS_EMAIL == usuario.DS_EMAIL && c.DS_SENHA == usuario.DS_SENHA).First();
            TB_USUARIO usuarioLogado = db.TB_USUARIO.Where(c => c.DS_EMAIL == usuario.DS_EMAIL).FirstOrDefault();
            if (usuarioLogado != null)
            {
                cadLoginUsuario(usuarioLogado);
            }
            usuarioLogado.TB_USUARIO_LOGIN = null;
            return usuarioLogado;
        }

        public void cadLoginUsuario(TB_USUARIO usuario)
        {
            TB_USUARIO_LOGIN login = new TB_USUARIO_LOGIN();
            login = db.TB_USUARIO_LOGIN.Where(c => c.ID_USUARIO == usuario.ID_USUARIO).OrderByDescending(c => c.DT_LOGIN).FirstOrDefault();

            if (usuario.ID_USUARIO != 0 && login != null && login.DT_LOGIN.Date != DateTime.Now.Date)
            {
                login = new TB_USUARIO_LOGIN();
                login.ID_USUARIO = usuario.ID_USUARIO;
                login.DT_LOGIN = DateTime.Now;
                db.TB_USUARIO_LOGIN.Add(login);
                db.SaveChanges();
            }
            else if (usuario.ID_USUARIO == 0)
            {
                login = new TB_USUARIO_LOGIN();
                login.DT_LOGIN = DateTime.Now;
                db.TB_USUARIO_LOGIN.Add(login);
                db.SaveChanges();
            }
        }
        
        public void cadUsuario(TB_USUARIO usuario)
        {
            db.TB_USUARIO.Add(usuario);
            db.SaveChanges();
        }

        public void altUsuario(TB_USUARIO usuario)
        {
            TB_USUARIO usuario_old = db.TB_USUARIO.Find(usuario.ID_USUARIO);
            if(usuario_old != null)
            {
                db.Entry(usuario_old).CurrentValues.SetValues(usuario);
                db.SaveChanges();
            }
        }

        public void delUsuario(TB_USUARIO usuario)
        {
            db.TB_USUARIO.Remove(db.TB_USUARIO.Find(usuario.ID_USUARIO));
            db.SaveChanges();
        }

        public List<UsuarioDTO> usuariosPorPaises(DateTime inicio, DateTime fim)
        {
            List<UsuarioDTO> lstUsuarios = new List<UsuarioDTO>();
            lstUsuarios = (from u in db.TB_USUARIO
                           where DbFunctions.TruncateTime(u.DT_CADASTRO) >= inicio.Date
                              && DbFunctions.TruncateTime(u.DT_CADASTRO) <= fim.Date
                           group u by u.DS_PAIS into g
                           select new UsuarioDTO
                           {
                               DS_PAIS = g.Key,
                               NR_QUANTIDADE = g.Count(),
                               DS_ESTADO_QUANTIDADE = g.Key + " (" + g.Count() + ")"
                           }).ToList();
            return lstUsuarios;
        }

        public List<UsuarioDTO> usuariosPorEstado(DateTime inicio, DateTime fim)
        {
            List<UsuarioDTO> lstUsuarios = new List<UsuarioDTO>();
            lstUsuarios = (from u in db.TB_USUARIO
                             where DbFunctions.TruncateTime(u.DT_CADASTRO) >= inicio.Date
                                && DbFunctions.TruncateTime(u.DT_CADASTRO) <= fim.Date
                             group u by u.DS_ESTADO into g
                             select new UsuarioDTO
                             {
                                 DS_ESTADO = g.Key,
                                 NR_QUANTIDADE = g.Count(),
                                 DS_ESTADO_QUANTIDADE = g.Key + " (" + g.Count() + ")"
                             }).ToList();
            return lstUsuarios;
        }

        public List<UsuarioDTO> usuariosPorPaisEstado(string pais, DateTime inicio, DateTime fim)
        {
            List<UsuarioDTO> lstUsuarios = new List<UsuarioDTO>();
            lstUsuarios = (from u in db.TB_USUARIO
                           where DbFunctions.TruncateTime(u.DT_CADASTRO) >= inicio.Date
                              && DbFunctions.TruncateTime(u.DT_CADASTRO) <= fim.Date
                           where u.DS_PAIS == pais
                           group u by u.DS_ESTADO into g
                           select new UsuarioDTO
                           {
                               DS_ESTADO = g.Key,
                               NR_QUANTIDADE = g.Count()
                           }).OrderByDescending(c => c.NR_QUANTIDADE).ToList();
            return lstUsuarios;
        }

        public List<UsuarioDTO> usuariosPorEstadoCidade(string estado, DateTime inicio, DateTime fim)
        {
            List<UsuarioDTO> lstUsuarios = new List<UsuarioDTO>();
            lstUsuarios = (from u in db.TB_USUARIO
                           where DbFunctions.TruncateTime(u.DT_CADASTRO) >= inicio.Date
                              && DbFunctions.TruncateTime(u.DT_CADASTRO) <= fim.Date
                           where u.DS_ESTADO == estado
                           group u by u.DS_CIDADE into g
                           select new UsuarioDTO
                           {
                               DS_CIDADE = g.Key,
                               NR_QUANTIDADE = g.Count()
                           }).OrderByDescending(c => c.NR_QUANTIDADE).ToList();
            return lstUsuarios;
        }

        public List<UsuarioEstatisticaDTO> usuariosPorPais(DateTime inicio, DateTime fim)
        {
            List<UsuarioEstatisticaDTO> lstUsuarios = new List<UsuarioEstatisticaDTO>();
            lstUsuarios = (from u in db.TB_USUARIO
                             where DbFunctions.TruncateTime(u.DT_CADASTRO) >= inicio.Date
                                && DbFunctions.TruncateTime(u.DT_CADASTRO) <= fim.Date
                             group u by u.DS_PAIS_SIGLA into g
                             select new UsuarioEstatisticaDTO
                             {
                                 id = g.Key,
                                 title = g.FirstOrDefault().DS_PAIS,
                                 customData = g.Count()
                             }).ToList();
            return lstUsuarios;
        }

        public int totalUsuarios(DateTime inicio, DateTime fim)
        {
            return db.TB_USUARIO.Where(c => DbFunctions.TruncateTime(c.DT_CADASTRO) >= inicio.Date && DbFunctions.TruncateTime(c.DT_CADASTRO) <= fim.Date).Count();
        }

        public int acessosHoje()
        {
            DateTime hoje = PegaHoraBrasilia().Date;
            return db.TB_USUARIO_LOGIN.Where(c => DbFunctions.TruncateTime(c.DT_LOGIN) >= hoje).Count();
        }

        public int acessosTotais()
        {
            return db.TB_USUARIO_LOGIN.ToList().Count();
        }

        public static DateTime PegaHoraBrasilia()
        {
            return TimeZoneInfo.ConvertTime(DateTime.Now, TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time"));
        }
    }
}