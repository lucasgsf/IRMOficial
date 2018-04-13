/** @ngInject */
angular.module('BlurAdmin.pages.tipos_usuario').service('TiposUsuarioService', function ($http) {
	var TiposUsuarioService = {
	    listarTiposUsuario: function () {
	        return $http.get('../../../../api/TipoUsuario/listarTiposUsuario').then(function (response) {
	            return response.data;
	        });
	    },
	}
    return TiposUsuarioService;
});

/** @ngInject */
angular.module('BlurAdmin.pages.tipo_usuario').service('TipoUsuarioService', function ($http) {
    var TipoUsuarioService = {
        getTipoUsuario: function (tipoUsuario) {
            return $http.get('../../../../api/TipoUsuario/getTipoUsuario', tipoUsuario).then(function (response) {
                return response.data;
            });
        },
        cadTipoUsuario: function (tipoUsuario) {
            return $http.post('../../../../api/TipoUsuario/cadTipoUsuario', tipoUsuario).then(function (response) {
                return response.data;
            });
        },
        altTipoUsuario: function (tipoUsuario) {
            return $http.post('../../../../api/TipoUsuario/altTipoUsuario', tipoUsuario).then(function (response) {
                return response.data;
            });
        },
        delTipoUsuario: function (tipoUsuario) {
            return $http.post('../../../../api/TipoUsuario/delTipoUsuario', tipoUsuario).then(function (response) {
                return response.data;
            });
        },
    }
    return TipoUsuarioService;
});