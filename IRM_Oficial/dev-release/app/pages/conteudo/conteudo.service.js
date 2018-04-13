/** @ngInject */
angular.module('BlurAdmin.pages.conteudos').service('ConteudosService', function ($http) {
    var ConteudosService = {
        listarConteudos: function () {
            return $http.get('../../../../api/Conteudo/listarConteudos').then(function (response) {
	            return response.data;
	        });
	    },
	}
    return ConteudosService;
});

/** @ngInject */
angular.module('BlurAdmin.pages.conteudo').service('ConteudoService', function ($http) {
    var ConteudoService = {
        getConteudo: function (conteudo) {
            return $http.get('../../../../api/Conteudo/getConteudo/' + conteudo).then(function (response) {
                return response.data;
            });
        },
        cadConteudo: function (conteudo) {
            return $http.post('../../../../api/Conteudo/cadConteudo', conteudo).then(function (response) {
                return response.data;
            });
        },
        altConteudo: function (conteudo) {
            return $http.post('../../../../api/Conteudo/altConteudo', conteudo).then(function (response) {
                return response.data;
            });
        },
        delConteudo: function (conteudo) {
            return $http.post('../../../../api/Conteudo/delConteudo', conteudo).then(function (response) {
                return response.data;
            });
        },
    }
    return ConteudoService;
});