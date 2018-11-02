/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.rank', [])
      .config(routeConfigRank);

  /** @ngInject */
  function routeConfigRank($stateProvider) {
    $stateProvider
        .state('rank', {
            url: '/rank',
            templateUrl: 'app/pages/rank/rank.html',
            title: 'Ranking',
            sidebarMeta: {
                icon: 'ion-connection-bars',
                order: 5,
            },
        });
  }

})();
