/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tipo_usuario')
      .controller('TipoUsuarioCtrl', TipoUsuarioCtrl);

  angular.module('BlurAdmin.pages.tipos_usuario')
      .controller('TiposUsuarioCtrl', TiposUsuarioCtrl);

  /** @ngInject */
  function TiposUsuarioCtrl($scope, $rootScope, $state, TiposUsuarioService, TipoUsuarioService, toastr, toastrConfig) {
      var openedToasts = [];
      var defaultConfig = angular.copy(toastrConfig);
      $scope.smartTablePageSize = 10;
      $scope.displayedList = [];
      $scope.safeList = [];

      function Listar() {
          $scope.displayedList = [];
          $scope.safeList = [];
          TiposUsuarioService.listarTiposUsuario().then(function (response) {
              $scope.displayedList = response;
              $scope.safeList = response;
          });
      }

      $scope.edit = function (item) {
          $rootScope.tipo_usuario = item;
          $state.go('tipo_usuario', { id: item.ID_TIPO_USUARIO });
      };

      $scope.delete = function (item) {
          TipoUsuarioService.delTipoUsuario(item).then(function (response) {
              if (response)
                  $scope.openToast("success", "Sucesso!", "Exclusão realizada com sucesso!");
              else
                  $scope.openToast("error", "Erro!", "Erro ao realizar a exclusão!");
              Listar();
          });
      }

      Listar();

      $scope.openToast = function (type, title, message) {
          var toastOptions = {
              autoDismiss: true,
              positionClass: 'toast-top-right',
              type: type,
              timeOut: '5000',
              extendedTimeOut: '2000',
              allowHtml: false,
              closeButton: false,
              tapToDismiss: true,
              progressBar: false,
              newestOnTop: true,
              maxOpened: 0,
              preventDuplicates: false,
              preventOpenDuplicates: false,
              title: title,
              msg: message
          };
          angular.extend(toastrConfig, toastOptions);
          openedToasts.push(toastr[toastOptions.type](toastOptions.msg, toastOptions.title));
      };
  }

  /** @ngInject */
  function TipoUsuarioCtrl($scope, $rootScope, $state, $stateParams, TipoUsuarioService, toastr, toastrConfig) {
      var openedToasts = [];
      var defaultConfig = angular.copy(toastrConfig);
      $scope.tipo_usuario = {};

      if ($stateParams != null && $stateParams.id != null) {
          if ($rootScope.tipo_usuario != undefined) {
              $scope.tipo_usuario = $rootScope.tipo_usuario;
          }
          else {
              var tipoUsuario = { ID_TIPO_USUARIO: $stateParams.id };
              TipoUsuarioService.getTipoUsuario(tipoUsuario).then(function (response) {
                  $scope.tipo_usuario = response;
              });
          }
      }

      $scope.salvar = function (item) {
          var tipoUsuario = {};
          angular.copy(item, tipoUsuario);

          if (tipoUsuario.ID_TIPO_USUARIO == undefined) {
              TipoUsuarioService.cadTipoUsuario(tipoUsuario).then(function (response) {
                  if (response)
                      $scope.openToast("success", "Sucesso!", "Cadastro realizado com sucesso!");
                  else 
                      $scope.openToast("error", "Erro!", "Erro ao realizar o cadastro!");
                  $state.go("tipos_usuario");
              });
          }
          else {
              TipoUsuarioService.altTipoUsuario(tipoUsuario).then(function (response) {
                  if (response)
                      $scope.openToast("success", "Sucesso!", "Alteração realizada com sucesso!");
                  else
                      $scope.openToast("error", "Erro!", "Erro ao realizar a alteração!");
                  $state.go("tipos_usuario");
              });
          }
      }

      $scope.openToast = function (type, title, message) {
          var toastOptions = {
              autoDismiss: true,
              positionClass: 'toast-top-right',
              type: type,
              timeOut: '5000',
              extendedTimeOut: '2000',
              allowHtml: false,
              closeButton: false,
              tapToDismiss: true,
              progressBar: false,
              newestOnTop: true,
              maxOpened: 0,
              preventDuplicates: false,
              preventOpenDuplicates: false,
              title: title,
              msg: message
          };
          angular.extend(toastrConfig, toastOptions);
          openedToasts.push(toastr[toastOptions.type](toastOptions.msg, toastOptions.title));
      };
  }
})();
