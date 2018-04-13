/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tipos_usuario', [])
      .config(routeConfigTiposUsuario);

  angular.module('BlurAdmin.pages.tipo_usuario', [])
      .config(routeConfigTipoUsuario);

  /** @ngInject */
  function routeConfigTiposUsuario($stateProvider) {
    $stateProvider
        .state('tipos_usuario', {
            url: '/tipos_usuario',
            templateUrl: 'app/pages/tipo_usuario/tipos_usuario.html',
            title: 'Tipos de Usuário',
            sidebarMeta: {
                icon: 'ion-person',
                order: 5,
            },
        });
  }

  /** @ngInject */
  function routeConfigTipoUsuario($stateProvider) {
    $stateProvider
        .state('tipo_usuario', {
            url: '/tipo_usuario',
            templateUrl: 'app/pages/tipo_usuario/tipo_usuario.html',
            title: 'Tipo de Usuário',
            params: { id: null },
        });
  }

})();
