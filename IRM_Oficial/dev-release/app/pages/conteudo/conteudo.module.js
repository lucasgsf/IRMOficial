/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.conteudos', [])
      .config(routeConfigConteudos);

  angular.module('BlurAdmin.pages.conteudo', ['angularFileUpload'])
      .config(routeConfigConteudo);

  /** @ngInject */
  function routeConfigConteudos($stateProvider) {
    $stateProvider
        .state('conteudos', {
            url: '/conteudos',
            templateUrl: 'app/pages/conteudo/conteudos.html',
            title: 'Conteúdos',
            sidebarMeta: {
                icon: 'ion-images',
                order: 7,
            },
        });
  }

  /** @ngInject */
  function routeConfigConteudo($stateProvider) {
    $stateProvider
        .state('conteudo', {
            url: '/conteudo',
            templateUrl: 'app/pages/conteudo/conteudo.html',
            title: 'Conteúdo',
            params: { id: null },
        });
  }

})();
