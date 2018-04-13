/** @ngInject */
angular.module('BlurAdmin.pages.documentos').service('DocumentosService', function ($http) {
    var DocumentosService = {
        listarDocumentos: function () {
            return $http.get('../../../../api/Documento/listarDocumentos').then(function (response) {
	            return response.data;
	        });
	    },
	}
    return DocumentosService;
});

/** @ngInject */
angular.module('BlurAdmin.pages.documento').service('DocumentoService', function ($http) {
    var DocumentoService = {
        getDocumento: function (documento) {
            return $http.get('../../../../api/Documento/getDocumento/' + documento).then(function (response) {
                return response.data;
            });
        },
        cadDocumento: function (documento) {
            return $http.post('../../../../api/Documento/cadDocumento', documento).then(function (response) {
                return response.data;
            });
        },
        altDocumento: function (documento) {
            return $http.post('../../../../api/Documento/altDocumento', documento).then(function (response) {
                return response.data;
            });
        },
        delDocumento: function (documento) {
            return $http.post('../../../../api/Documento/delDocumento', documento).then(function (response) {
                return response.data;
            });
        },
    }
    return DocumentoService;
});