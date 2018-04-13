/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.usuarios', [])
      .config(routeConfigUsuarios);

  angular.module('BlurAdmin.pages.usuario', ['gm'])
      .config(routeConfigUsuario);

  /** @ngInject */
  function routeConfigUsuarios($stateProvider) {
    $stateProvider
        .state('usuarios', {
            url: '/usuarios',
            templateUrl: 'app/pages/usuario/usuarios.html',
            title: 'Usuários',
            sidebarMeta: {
                icon: 'ion-person',
                order: 4,
            },
        });
  }

  /** @ngInject */
  function routeConfigUsuario($stateProvider) {
    $stateProvider
        .state('usuario', {
            url: '/usuario',
            templateUrl: 'app/pages/usuario/usuario.html',
            title: 'Usuário',
            params: { id: null },
        });
  }

})();
