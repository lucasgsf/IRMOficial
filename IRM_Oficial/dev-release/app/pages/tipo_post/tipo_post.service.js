/** @ngInject */
angular.module('BlurAdmin.pages.tipos_post').service('TiposPostService', function ($http) {
    var TiposPostService = {
	    listarTiposPost: function () {
            return $http.get('../../../../api/TipoPost/listarTiposPost').then(function (response) {
	            return response.data;
	        });
	    },
	}
    return TiposPostService;
});

/** @ngInject */
angular.module('BlurAdmin.pages.tipo_post').service('TipoPostService', function ($http) {
    var TipoPostService = {
        getTipoPost: function (tipoPost) {
            return $http.get('../../../../api/TipoPost/getTipoPost', tipoPost).then(function (response) {
                return response.data;
            });
        },
        cadTipoPost: function (tipoPost) {
            return $http.post('../../../../api/TipoPost/cadTipoPost', tipoPost).then(function (response) {
                return response.data;
            });
        },
        altTipoPost: function (tipoPost) {
            return $http.post('../../../../api/TipoPost/altTipoPost', tipoPost).then(function (response) {
                return response.data;
            });
        },
        delTipoPost: function (tipoPost) {
            return $http.post('../../../../api/TipoPost/delTipoPost', tipoPost).then(function (response) {
                return response.data;
            });
        },
    }
    return TipoPostService;
});