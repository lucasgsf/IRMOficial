/** @ngInject */
angular.module('BlurAdmin.pages.dashboard').service('DashboardService', function ($http) {
    var DashboardService = {
        usuariosPorPais: function (inicio, fim) {
            return $http.get('../../../../api/Usuario/usuariosPorPais?inicio=' + inicio + '&fim=' + fim).then(function (response) {
	            return response.data;
	        });
        },
        usuariosPorPaises: function (inicio, fim) {
            return $http.get('../../../../api/Usuario/usuariosPorPaises?inicio=' + inicio + '&fim=' + fim).then(function (response) {
                return response.data;
            });
        },
        usuariosPorEstado: function (inicio, fim) {
            return $http.get('../../../../api/Usuario/usuariosPorEstado?inicio=' + inicio + '&fim=' + fim).then(function (response) {
	            return response.data;
	        });
        },
        usuariosPorEstadoCidade: function (estado, inicio, fim) {
            return $http.get('../../../../api/Usuario/usuariosPorEstadoCidade?estado=' + estado + '&inicio=' + inicio + '&fim=' + fim).then(function (response) {
                return response.data;
            });
        },
        usuariosPorPaisEstado: function (pais, inicio, fim) {
            return $http.get('../../../../api/Usuario/usuariosPorPaisEstado?pais=' + pais + '&inicio=' + inicio + '&fim=' + fim).then(function (response) {
                return response.data;
            });
        },
        postsPorData: function (inicio, fim) {
            return $http.get('../../../../api/Post/postsPorData?inicio=' + inicio + '&fim=' + fim).then(function (response) {
	            return response.data;
	        });
	    },
        totalUsuarios: function (inicio, fim) {
            return $http.get('../../../../api/Usuario/totalUsuarios?inicio=' + inicio + '&fim=' + fim).then(function (response) {
	            return response.data;
	        });
	    },
        totalPosts: function (inicio, fim) {
            return $http.get('../../../../api/Post/totalPosts?inicio=' + inicio + '&fim=' + fim).then(function (response) {
	            return response.data;
	        });
	    },
        totalCurtidas: function (inicio, fim) {
            return $http.get('../../../../api/AcoesPost/totalCurtidas?inicio=' + inicio + '&fim=' + fim).then(function (response) {
	            return response.data;
	        });
	    },
        totalNaoCurtidas: function (inicio, fim) {
            return $http.get('../../../../api/AcoesPost/totalNaoCurtidas?inicio=' + inicio + '&fim=' + fim).then(function (response) {
	            return response.data;
	        });
        },
        totalPlays: function (inicio, fim) {
            return $http.get('../../../../api/AcoesPost/totalPlays?inicio=' + inicio + '&fim=' + fim).then(function (response) {
                return response.data;
            });
        },
        totalCompartilhamentos: function (inicio, fim) {
            return $http.get('../../../../api/AcoesPost/totalCompartilhamentos?inicio=' + inicio + '&fim=' + fim).then(function (response) {
                return response.data;
            });
        },
        acessosHoje: function () {
            return $http.get('../../../../api/Usuario/acessosHoje').then(function (response) {
                return response.data;
            });
        },
        acessosTotais: function () {
            return $http.get('../../../../api/Usuario/acessosTotais').then(function (response) {
                return response.data;
            });
        },
	}
    return DashboardService;
});