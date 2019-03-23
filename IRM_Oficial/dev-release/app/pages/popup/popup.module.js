/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.popups', [])
      .config(routeConfigPopups);

  angular.module('BlurAdmin.pages.popup', ['angularFileUpload'])
      .config(routeConfigPopup);

  /** @ngInject */
  function routeConfigPopups($stateProvider) {
    $stateProvider
        .state('popups', {
            url: '/popups',
            templateUrl: 'app/pages/popup/popups.html',
            title: 'Popups',
            sidebarMeta: {
                icon: 'ion-chatbox-working',
                order: 8,
            },
        });
  }

  /** @ngInject */
  function routeConfigPopup($stateProvider) {
    $stateProvider
        .state('popup', {
            url: '/popup',
            templateUrl: 'app/pages/popup/popup.html',
            title: 'Popup',
            params: { id: null },
        });
  }

})();
