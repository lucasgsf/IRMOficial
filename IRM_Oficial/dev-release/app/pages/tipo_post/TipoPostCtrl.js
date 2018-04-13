/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tipo_post')
      .controller('TipoPostCtrl', TipoPostCtrl);

  angular.module('BlurAdmin.pages.tipos_post')
      .controller('TiposPostCtrl', TiposPostCtrl);

  /** @ngInject */
  function TiposPostCtrl($scope, $rootScope, $state, TiposPostService, TipoPostService, toastr, toastrConfig) {
      var openedToasts = [];
      var defaultConfig = angular.copy(toastrConfig);
      $scope.smartTablePageSize = 10;
      $scope.displayedList = [];
      $scope.safeList = [];

      function Listar() {
          $scope.displayedList = [];
          $scope.safeList = [];
          TiposPostService.listarTiposPost().then(function (response) {
              $scope.displayedList = response;
              $scope.safeList = response;
          });
      }

      $scope.edit = function (item) {
          $rootScope.tipo_post = item;
          $state.go('tipo_post', { id: item.ID_TIPO_POST });
      };

      $scope.delete = function (item) {
          TipoPostService.delTipoPost(item).then(function (response) {
              if (response)
                  $scope.openToast("success", "Sucesso!", "Exclusão realizada com sucesso!");
              else
                  $scope.openToast("error", "Erro!", "Erro ao realizar a exclusão!");
          });
          Listar();
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
  function TipoPostCtrl($scope, $rootScope, $state, $stateParams, TipoPostService, toastr, toastrConfig) {
      var openedToasts = [];
      var defaultConfig = angular.copy(toastrConfig);
      $scope.tipo_post = {};

      if ($stateParams != null && $stateParams.id != null) {
          if ($rootScope.tipo_post != undefined) {
              $scope.tipo_post = $rootScope.tipo_post;
          }
          else {
              var tipoPost = { ID_TIPO_POST: $stateParams.id };
              TipoPostService.getTipoPost(tipoPost).then(function (response) {
                  $scope.tipo_usuario = response;
              });
          }
      }

      $scope.salvar = function (item) {
          var tipoPost = {};
          angular.copy(item, tipoPost);

          if (tipoPost.ID_TIPO_POST == undefined) {
              TipoPostService.cadTipoPost(tipoPost).then(function (response) {
                  if (response)
                      $scope.openToast("success", "Sucesso!", "Cadastro realizado com sucesso!");
                  else 
                      $scope.openToast("error", "Erro!", "Erro ao realizar o cadastro!");
                  $state.go("tipos_post");
              });
          }
          else {
              TipoPostService.altTipoPost(tipoPost).then(function (response) {
                  if (response)
                      $scope.openToast("success", "Sucesso!", "Alteração realizada com sucesso!");
                  else
                      $scope.openToast("error", "Erro!", "Erro ao realizar a alteração!");
                  $state.go("tipos_post");
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
