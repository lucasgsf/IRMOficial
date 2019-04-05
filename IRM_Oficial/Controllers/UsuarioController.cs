using IRM_Oficial.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace IRM_Oficial.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsuarioController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage listarUsuarios()
        {
            try
            {
                Usuario usu = new Usuario ();
                return Request.CreateResponse(HttpStatusCode.OK, usu.listarUsuarios());
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage getUsuario(TB_USUARIO usuario)
        {
            try
            {
                Usuario usu = new Usuario ();
                return Request.CreateResponse(HttpStatusCode.OK, usu.getUsuario(usuario));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage loginUsuario(TB_USUARIO usuario)
        {
            try
            {
                Usuario usu = new Usuario();
                return Request.CreateResponse(HttpStatusCode.OK, usu.loginUsuario(usuario));
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage cadLoginUsuario(TB_USUARIO usuario)
        {
            try
            {
                Usuario usu = new Usuario();
                usu.cadLoginUsuario(usuario);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage cadUsuario(TB_USUARIO usuario)
        {
            try
            {
                Usuario usu = new Usuario ();
                usu.cadUsuario(usuario);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage altUsuario(TB_USUARIO usuario)
        {
            try
            {
                Usuario usu = new Usuario ();
                usu.altUsuario(usuario);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpPost]
        public HttpResponseMessage delUsuario(TB_USUARIO usuario)
        {
            try
            {
                Usuario usu = new Usuario();
                usu.delUsuario(usuario);
                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage totalUsuarios(DateTime inicio, DateTime fim)
        {
            try
            {
                Usuario usu = new Usuario();
                return Request.CreateResponse(HttpStatusCode.OK, usu.totalUsuarios(inicio, fim));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage totalAcessos(DateTime inicio, DateTime fim)
        {
            try
            {
                Usuario usu = new Usuario();
                return Request.CreateResponse(HttpStatusCode.OK, usu.totalAcessos(inicio, fim));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage usuariosPorPaises(DateTime inicio, DateTime fim)
        {
            try
            {
                Usuario usu = new Usuario();
                return Request.CreateResponse(HttpStatusCode.OK, usu.usuariosPorPaises(inicio, fim));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage usuariosPorEstado(DateTime inicio, DateTime fim)
        {
            try
            {
                Usuario usu = new Usuario();
                return Request.CreateResponse(HttpStatusCode.OK, usu.usuariosPorEstado(inicio, fim));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage usuariosPorPaisEstado(string pais, DateTime inicio, DateTime fim)
        {
            try
            {
                Usuario usu = new Usuario();
                return Request.CreateResponse(HttpStatusCode.OK, usu.usuariosPorPaisEstado(pais, inicio, fim));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage usuariosPorEstadoCidade(string estado, DateTime inicio, DateTime fim)
        {
            try
            {
                Usuario usu = new Usuario();
                return Request.CreateResponse(HttpStatusCode.OK, usu.usuariosPorEstadoCidade(estado, inicio, fim));
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage usuariosPorPais(DateTime inicio, DateTime fim)
        {
            try
            {
                Usuario usu = new Usuario();
                return Request.CreateResponse(HttpStatusCode.OK, usu.usuariosPorPais(inicio, fim));
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage acessosHoje()
        {
            try
            {
                Usuario usu = new Usuario();
                return Request.CreateResponse(HttpStatusCode.OK, usu.acessosHoje());
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage acessosTotais()
        {
            try
            {
                Usuario usu = new Usuario();
                return Request.CreateResponse(HttpStatusCode.OK, usu.acessosTotais());
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage rankGeral()
        {
            try
            {
                Usuario usu = new Usuario();
                return Request.CreateResponse(HttpStatusCode.OK, usu.rankGeral());
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage rankMensal()
        {
            try
            {
                Usuario usu = new Usuario();
                return Request.CreateResponse(HttpStatusCode.OK, usu.rankMensal());
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage rankSemanal()
        {
            try
            {
                Usuario usu = new Usuario();
                return Request.CreateResponse(HttpStatusCode.OK, usu.rankSemanal());
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage rankGeralUsuario()
        {
            try
            {
                Usuario usu = new Usuario();
                return Request.CreateResponse(HttpStatusCode.OK, usu.rankGeralUsuario());
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage rankMensalUsuario()
        {
            try
            {
                Usuario usu = new Usuario();
                return Request.CreateResponse(HttpStatusCode.OK, usu.rankMensalUsuario());
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }

        [HttpGet]
        public HttpResponseMessage rankSemanalUsuario()
        {
            try
            {
                Usuario usu = new Usuario();
                return Request.CreateResponse(HttpStatusCode.OK, usu.rankSemanalUsuario());
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, false);
            }
        }
    }
}
