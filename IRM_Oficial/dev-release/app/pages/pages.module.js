/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',
    'BlurAdmin.pages.dashboard',
    'BlurAdmin.pages.tipo_usuario',
    'BlurAdmin.pages.tipos_usuario',
    'BlurAdmin.pages.tipo_post',
    'BlurAdmin.pages.tipos_post',
    'BlurAdmin.pages.idioma',
    'BlurAdmin.pages.idiomas',
    'BlurAdmin.pages.post',
    'BlurAdmin.pages.posts',
    'BlurAdmin.pages.usuario',
    'BlurAdmin.pages.usuarios',
    'BlurAdmin.pages.conteudo',
    'BlurAdmin.pages.conteudos',
    'BlurAdmin.pages.notificacao',
    'BlurAdmin.pages.documento',
    'BlurAdmin.pages.documentos',
    'BlurAdmin.pages.rank',
    'BlurAdmin.pages.popup',
    'BlurAdmin.pages.popups',
    //'BlurAdmin.pages.ui',
    //'BlurAdmin.pages.components',
    //'BlurAdmin.pages.form',
    //'BlurAdmin.pages.tables',
    //'BlurAdmin.pages.charts',
    //'BlurAdmin.pages.maps',
    //'BlurAdmin.pages.profile',
  ])
      .config(routeConfig)
      .controller('AuthCtrl', AuthCtrl);

  function AuthCtrl($scope, $window) {
      $scope.userData = {};

      $scope.$watch(function () { return $window.localStorage.userData; }, function (newVal, oldVal) {
          if (newVal == undefined) {
              window.location.href = "auth.html";
          }
          else {
              $scope.userData = JSON.parse(newVal);
          }
      });

      $scope.logOut = function () {
          $window.localStorage.clear();
          window.location.href = "auth.html";
      }
  }

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/dashboard');

    //baSidebarServiceProvider.addStaticItem({
    //  title: 'Pages',
    //  icon: 'ion-document',
    //  subMenu: [{
    //    title: 'Sign In',
    //    fixedHref: 'auth.html',
    //    blank: true
    //  }, {
    //    title: 'Sign Up',
    //    fixedHref: 'reg.html',
    //    blank: true
    //  }, {
    //    title: 'User Profile',
    //    stateRef: 'profile'
    //  }, {
    //    title: '404 Page',
    //    fixedHref: '404.html',
    //    blank: true
    //  }]
    //});
    //baSidebarServiceProvider.addStaticItem({
    //  title: 'Menu Level 1',
    //  icon: 'ion-ios-more',
    //  subMenu: [{
    //    title: 'Menu Level 1.1',
    //    disabled: true
    //  }, {
    //    title: 'Menu Level 1.2',
    //    subMenu: [{
    //      title: 'Menu Level 1.2.1',
    //      disabled: true
    //    }]
    //  }]
    //});
  }

})();
