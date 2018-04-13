/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.login')
      .controller('LoginCtrl', LoginCtrl);

  /** @ngInject */
  function LoginCtrl($scope, $state, $window, LoginService) {
      $scope.usuario = {};
      $scope.loginFail = false;

      $scope.logar = function (data) {
          var usuario = {};
          angular.copy(data, usuario);
          LoginService.loginUsuario(usuario).then(function (response) {
              if (response) {
                  $window.localStorage["userData"] = JSON.stringify(response);
                  window.location.href = "index.html";
              }
              else
                  $scope.loginFail = true;
          });
      };

      $scope.$watch(function () { return $window.localStorage.userData; }, function (newVal, oldVal) {
          if (newVal != undefined) {
              window.location.href = "index.html";
          }
      });
  }
})();
