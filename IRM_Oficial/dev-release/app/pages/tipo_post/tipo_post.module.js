/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tipos_post', [])
      .config(routeConfigTiposPost);

  angular.module('BlurAdmin.pages.tipo_post', [])
      .config(routeConfigTipoPost);

  /** @ngInject */
  function routeConfigTiposPost($stateProvider) {
    $stateProvider
        .state('tipos_post', {
            url: '/tipos_post',
            templateUrl: 'app/pages/tipo_post/tipos_post.html',
            title: 'Tipos de Post',
            sidebarMeta: {
                icon: 'ion-document-text',
                order: 3,
            },
        });
  }

  /** @ngInject */
  function routeConfigTipoPost($stateProvider) {
    $stateProvider
        .state('tipo_post', {
            url: '/tipo_post',
            templateUrl: 'app/pages/tipo_post/tipo_post.html',
            title: 'Tipo de Post',
            params: { id: null },
        });
  }

})();
