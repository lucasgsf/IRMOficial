/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.notificacao', [])
      .config(routeConfigNotificacao);

  /** @ngInject */
  function routeConfigNotificacao($stateProvider) {
    $stateProvider
        .state('notificacao', {
            url: '/notificacao',
            templateUrl: 'app/pages/notificacao/notificacao.html',
            title: 'Notificação',
            sidebarMeta: {
                icon: 'ion-ios-bell',
                order: 10,
            },
        });
  }

})();