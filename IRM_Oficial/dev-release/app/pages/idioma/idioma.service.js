/** @ngInject */
angular.module('BlurAdmin.pages.idiomas').service('IdiomasService', function ($http) {
    var IdiomasService = {
	    listarIdiomas: function () {
            return $http.get('../../../../api/Idioma/listarIdiomas').then(function (response) {
	            return response.data;
	        });
	    },
	}
    return IdiomasService;
});

/** @ngInject */
angular.module('BlurAdmin.pages.idioma').service('IdiomaService', function ($http) {
    var IdiomaService = {
        getIdioma: function (idioma) {
            return $http.get('../../../../api/Idioma/getIdioma', idioma).then(function (response) {
                return response.data;
            });
        },
        cadIdioma: function (idioma) {
            return $http.post('../../../../api/Idioma/cadIdioma', idioma).then(function (response) {
                return response.data;
            });
        },
        altIdioma: function (idioma) {
            return $http.post('../../../../api/Idioma/altIdioma', idioma).then(function (response) {
                return response.data;
            });
        },
        delIdioma: function (idioma) {
            return $http.post('../../../../api/Idioma/delIdioma', idioma).then(function (response) {
                return response.data;
            });
        },
    }
    return IdiomaService;
});