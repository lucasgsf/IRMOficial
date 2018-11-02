/** @ngInject */
angular.module('BlurAdmin.pages.rank').service('RankService', function ($http) {
    var RankService = {
        rankGeral: function () {
            return $http.get('../../../../api/Usuario/rankGeral').then(function (response) {
                return response.data;
            });
        },
        rankMensal: function () {
            return $http.get('../../../../api/Usuario/rankMensal').then(function (response) {
                return response.data;
            });
        },
        rankSemanal: function () {
            return $http.get('../../../../api/Usuario/rankSemanal').then(function (response) {
                return response.data;
            });
        }
    }
    return RankService;
});