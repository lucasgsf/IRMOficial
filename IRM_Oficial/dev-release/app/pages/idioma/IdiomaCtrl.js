/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.idioma')
      .controller('IdiomaCtrl', IdiomaCtrl);

  angular.module('BlurAdmin.pages.idiomas')
      .controller('IdiomasCtrl', IdiomasCtrl);

  /** @ngInject */
  function IdiomasCtrl($scope, $rootScope, $state, IdiomasService, IdiomaService, toastr, toastrConfig) {
      var openedToasts = [];
      var defaultConfig = angular.copy(toastrConfig);
      $scope.smartTablePageSize = 10;
      $scope.displayedList = [];
      $scope.safeList = [];

      function Listar() {
          $scope.displayedList = [];
          $scope.safeList = [];
          IdiomasService.listarIdiomas().then(function (response) {
              $scope.displayedList = response;
              $scope.safeList = response;
          });
      }

      $scope.edit = function (item) {
          $rootScope.idioma = item;
          $state.go('idioma', { id: item.ID_IDIOMA });
      };

      $scope.delete = function (item) {
          IdiomaService.delIdioma(item).then(function (response) {
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
  function IdiomaCtrl($scope, $rootScope, $state, $stateParams, IdiomaService, toastr, toastrConfig) {
      var openedToasts = [];
      var defaultConfig = angular.copy(toastrConfig);
      $scope.idioma = {};

      if ($stateParams != null && $stateParams.id != null) {
          if ($rootScope.idioma != undefined) {
              $scope.idioma = $rootScope.idioma;
          }
          else {
              var idioma = { ID_IDIOMA: $stateParams.id };
              IdiomaService.getIdioma(idioma).then(function (response) {
                  $scope.idioma = response;
              });
          }
      }

      $scope.salvar = function (item) {
          var idioma = {};
          angular.copy(item, idioma);

          if (idioma.ID_IDIOMA == undefined) {
              IdiomaService.cadIdioma(idioma).then(function (response) {
                  if (response)
                      $scope.openToast("success", "Sucesso!", "Cadastro realizado com sucesso!");
                  else 
                      $scope.openToast("error", "Erro!", "Erro ao realizar o cadastro!");
                  $state.go("idiomas");
              });
          }
          else {
              IdiomaService.altIdioma(idioma).then(function (response) {
                  if (response)
                      $scope.openToast("success", "Sucesso!", "Alteração realizada com sucesso!");
                  else
                      $scope.openToast("error", "Erro!", "Erro ao realizar a alteração!");
                  $state.go("idiomas");
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
