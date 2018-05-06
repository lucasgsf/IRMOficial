angular.module('app.services', [])

// IP TESTE 1: http://192.168.1.103:8888
// IP TESTE 2: http://192.168.25.2:8888
// IP TESTE 3: http://localhost:49773
// IP HOST: http://irmoficial.azurewebsites.net

.service('UsuarioService', function ($http) {
    var UsuarioService = {
	    loginUsuario: function (usuario) {
            return $http.post('../api/Usuario/loginUsuario', usuario).then(function (response) {
	            return response.data;
	        });
	    },
	    cadUsuario: function (usuario) {
            return $http.post('../api/Usuario/cadUsuario', usuario).then(function (response) {
	            return response.data;
	        });
	    },
	    cadLoginUsuario: function (usuario) {
            return $http.post('../api/Usuario/cadLoginUsuario', usuario).then(function (response) {
	            return response.data;
	        });
	    },
	    altUsuario: function (usuario) {
            return $http.post('../api/Usuario/altUsuario', usuario).then(function (response) {
	            return response.data;
	        });
	    },
	}
    return UsuarioService;
})

.service('PostService', function ($http) {
    var PostService = {
	    getFeed: function (data) {
            return $http.get('../api/Post/getFeed?data=' + data).then(function (response) {
	            return response.data;
	        });
	    },
	    getFeedResume: function (data) {
            return $http.get('../api/Post/getFeedResume?data=' + data).then(function (response) {
	            return response.data;
	        });
	    },
	    getAudioPost: function (idPost) {
            return $http.get('../api/Post/getAudioPost?id=' + idPost).then(function (response) {
	            return response.data;
	        });
	    },
	    getPostDetalhado: function (idPost) {
            return $http.get('../api/Post/getPostDetalhado?id=' + idPost).then(function (response) {
	            return response.data;
	        });
	    },
	}
    return PostService;
})

.service('AcoesPostService', function ($http) {
    var AcoesPostService = {
	    getAcoesPost: function (idPost) {
            return $http.get('../api/AcoesPost/getAcoes?idPost=' + idPost).then(function (response) {
	            return response.data;
	        });
	    },
	    cadAcoesPost: function (acoesPost) {
            return $http.post('../api/AcoesPost/cadAcoesPost', acoesPost).then(function (response) {
	            return response.data;
	        });
	    }
	}
    return AcoesPostService;
})

.service('AcoesConteudoService', function ($http) {
    var AcoesConteudoService = {
	    getAcoesConteudo: function (idConteudo) {
            return $http.get('../api/AcoesConteudo/getAcoes?idConteudo=' + idConteudo).then(function (response) {
	            return response.data;
	        });
	    },
	    cadAcoesConteudo: function (acoesConteudo) {
            return $http.post('../api/AcoesConteudo/cadAcoesConteudo', acoesConteudo).then(function (response) {
	            return response.data;
	        });
	    }
	}
    return AcoesConteudoService;
})

.service('ConteudoService', function ($http) {
    var ConteudoService = {
	    getConteudo: function () {
            return $http.get('../api/Conteudo/listarConteudos').then(function (response) {
	            return response.data;
	        });
	    },
	}
    return ConteudoService;
})

.service('DocumentoService', function ($http) {
    var DocumentoService = {
	    getDocumentoPorData: function (data) {
            return $http.get('../api/Documento/listarDocumentosPorData?data=' + data).then(function (response) {
	            return response.data;
	        });
	    },
	    enviarDocumento: function (idDocumento, idUsuario) {
            return $http.get('../api/Documento/enviarDocumento?idDocumento=' + idDocumento + '&idUsuario=' + idUsuario).then(function (response) {
	            return response.data;
	        });
	    },
	}
    return DocumentoService;
})


;