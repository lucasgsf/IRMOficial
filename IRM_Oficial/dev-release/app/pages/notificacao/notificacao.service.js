/** @ngInject */
angular.module('BlurAdmin.pages.notificacao').service('NotificacaoService', function ($http) {
    var NotificacaoService = {
        enviarNotificacao: function (notificacao) {
            return $http.post('../../../../api/Notificacao/enviarNotificacao', notificacao).then(function (response) {
                return response.data;
            });
        },
    }
    return NotificacaoService;
});