/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.idiomas', [])
      .config(routeConfigIdiomas);

  angular.module('BlurAdmin.pages.idioma', [])
      .config(routeConfigIdioma);

  /** @ngInject */
  function routeConfigIdiomas($stateProvider) {
    $stateProvider
        .state('idiomas', {
            url: '/idiomas',
            templateUrl: 'app/pages/idioma/idiomas.html',
            title: 'Idiomas',
            sidebarMeta: {
                icon: 'ion-chatbubble',
                order: 6,
            },
        });
  }

  /** @ngInject */
  function routeConfigIdioma($stateProvider) {
    $stateProvider
        .state('idioma', {
            url: '/idioma',
            templateUrl: 'app/pages/idioma/idioma.html',
            title: 'Idioma',
            params: { id: null },
        });
  }

})();
