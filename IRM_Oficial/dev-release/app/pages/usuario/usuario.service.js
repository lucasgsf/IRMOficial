/** @ngInject */
angular.module('BlurAdmin.pages.tipos_usuario').service('UsuariosService', function ($http) {
    var UsuariosService = {
	    listarUsuarios: function () {
	        return $http.get('../../../../api/Usuario/listarUsuarios').then(function (response) {
	            return response.data;
	        });
	    },
	}
    return UsuariosService;
});

/** @ngInject */
angular.module('BlurAdmin.pages.usuario').service('UsuarioService', function ($http) {
    var UsuarioService = {
        getUsuario: function (usuario) {
            return $http.get('../../../../api/Usuario/getUsuario', usuario).then(function (response) {
                return response.data;
            });
        },
        cadUsuario: function (usuario) {
            return $http.post('../../../../api/Usuario/cadUsuario', usuario).then(function (response) {
                return response.data;
            });
        },
        altUsuario: function (usuario) {
            return $http.post('../../../../api/Usuario/altUsuario', usuario).then(function (response) {
                return response.data;
            });
        },
        delUsuario: function (usuario) {
            return $http.post('../../../../api/Usuario/delUsuario', usuario).then(function (response) {
                return response.data;
            });
        },
    }
    return UsuarioService;
});