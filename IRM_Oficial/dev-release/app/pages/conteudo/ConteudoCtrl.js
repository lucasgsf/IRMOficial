/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.conteudo')
      .controller('ConteudoCtrl', ConteudoCtrl);

  angular.module('BlurAdmin.pages.conteudos')
      .controller('ConteudosCtrl', ConteudosCtrl);

  /** @ngInject */
  function ConteudosCtrl($scope, $rootScope, $state, ConteudosService, ConteudoService, toastr, toastrConfig) {
      var openedToasts = [];
      var defaultConfig = angular.copy(toastrConfig);
      $scope.smartTablePageSize = 10;
      $scope.displayedList = [];
      $scope.safeList = [];

      function Listar() {
          $scope.displayedList = [];
          $scope.safeList = [];
          ConteudosService.listarConteudos().then(function (response) {
              $scope.displayedList = response;
              $scope.safeList = response;
          });
      }

      $scope.edit = function (item) {
          $rootScope.conteudo = item;
          $state.go('conteudo', { id: item.ID_CONTEUDO });
      };

      $scope.delete = function (item) {
          ConteudoService.delConteudo(item).then(function (response) {
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
  function ConteudoCtrl($q, $scope, $rootScope, $state, $stateParams, ConteudoService, toastr, toastrConfig, FileUploader) {
      var uploader = $scope.uploader = new FileUploader({ removeAfterUpload : true });
      var openedToasts = [];
      var defaultConfig = angular.copy(toastrConfig);
      $scope.sucesso = true;
      $scope.conteudo = {};

      if ($stateParams != null && $stateParams.id != null) {
          if ($rootScope.conteudo != undefined) {
              $scope.conteudo = $rootScope.conteudo;
          }
          else {
              var id = $stateParams.id;
              ConteudoService.getConteudo(id).then(function (response) {
                  $scope.conteudo = response;
              });
          }
      }

      $scope.salvar = function (item) {
          var conteudo = {};
          angular.copy(item, conteudo);
          
          $scope.uploader.onBeforeUploadItem = function (item) {
              var form = angular.copy(conteudo, form);
              item.formData.push(form);
              item.url = "../../../../api/Conteudo/cadConteudoFoto";
          };

          $scope.uploader.onCompleteItem = function (item, response, status, headers) {
              console.log(response);
              conteudo.ID_CONTEUDO = response;
              if (!response)
                  $scope.sucesso = false;
          };
          
          if ($scope.uploader.queue.length > 0) {
              $scope.uploader.uploadAll();

              $scope.uploader.onCompleteAll = function () {
                  if ($scope.sucesso)
                      $scope.openToast("success", "Sucesso!", "Cadastro realizado com sucesso!");
                  else
                      $scope.openToast("error", "Erro!", "Erro ao realizar o cadastro!");
                  $state.go("conteudos");
              };
          }
          else if (conteudo.ID_CONTEUDO) {
              ConteudoService.altConteudo(conteudo).then(function (response) {
                  if (response)
                      $scope.openToast("success", "Sucesso!", "Alteração realizada com sucesso!");
                  else
                      $scope.openToast("error", "Erro!", "Erro ao realizar a alteração!");
                  $state.go("conteudos");
              });
          }
          else {
              ConteudoService.cadConteudo(conteudo).then(function (response) {
                  if (response)
                      $scope.openToast("success", "Sucesso!", "Cadastro realizado com sucesso!");
                  else
                      $scope.openToast("error", "Erro!", "Erro ao realizar o cadastro!");
                  $state.go("conteudos");
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
