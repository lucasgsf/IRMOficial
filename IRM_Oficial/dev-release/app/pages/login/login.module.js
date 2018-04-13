/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.login', ['ui.router'])
      .config(routeConfigLogin);

  /** @ngInject */
  function routeConfigLogin($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'auth.html',
            title: 'Login',
        });
  }

})();
