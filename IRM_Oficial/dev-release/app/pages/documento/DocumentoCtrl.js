/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.documento')
      .controller('DocumentoCtrl', DocumentoCtrl);

  angular.module('BlurAdmin.pages.documentos')
      .controller('DocumentosCtrl', DocumentosCtrl);

  /** @ngInject */
  function DocumentosCtrl($scope, $rootScope, $state, DocumentosService, DocumentoService, toastr, toastrConfig) {
      var openedToasts = [];
      var defaultConfig = angular.copy(toastrConfig);
      $scope.smartTablePageSize = 10;
      $scope.displayedList = [];
      $scope.safeList = [];

      function Listar() {
          $scope.displayedList = [];
          $scope.safeList = [];
          DocumentosService.listarDocumentos().then(function (response) {
              $scope.displayedList = response;
              $scope.safeList = response;
          });
      }

      $scope.edit = function (item) {
          $rootScope.documento = item;
          $state.go('documento', { id: item.ID_DOCUMENTO });
      };

      $scope.delete = function (item) {
          DocumentoService.delDocumento(item).then(function (response) {
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
  function DocumentoCtrl($q, $scope, $rootScope, $state, $stateParams, DocumentoService, toastr, toastrConfig, FileUploader) {
      var uploader = $scope.uploader = new FileUploader({ removeAfterUpload : true });
      var openedToasts = [];
      var defaultConfig = angular.copy(toastrConfig);
      $scope.sucesso = true;
      $scope.documento = {};

      if ($stateParams != null && $stateParams.id != null) {
          if ($rootScope.documento != undefined) {
              $scope.documento = $rootScope.documento;
              $scope.documento.DT_CADASTRO = new Date($scope.documento.DT_CADASTRO);
          }
          else {
              var id = $stateParams.id;
              DocumentoService.getDocumento(id).then(function (response) {
                  response.DT_CADASTRO = new Date(response.DT_CADASTRO);
                  $scope.documento = response;
              });
          }
      }

      // Configurações Date Picker
      $scope.modelDatePicker = {};
      $scope.optionsDatePicker = {
          showWeeks: false
      };
      $scope.openDatePicker = function ($event, elementOpened) {
          $event.preventDefault();
          $event.stopPropagation();
          $scope.modelDatePicker[elementOpened] = !$scope.modelDatePicker[elementOpened];
      };

      $scope.salvar = function (item) {
          var documento = {};
          angular.copy(item, documento);
          
          $scope.uploader.onBeforeUploadItem = function (item) {
              var form = angular.copy(documento, form);
              item.formData.push(form);
              item.url = "../../../../api/Documento/cadDocumentoFile";
          };

          $scope.uploader.onCompleteItem = function (item, response, status, headers) {
              console.log(response);
              documento.ID_DOCUMENTO = response;
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
                  $state.go("documentos");
              };
          }
          else if (conteudo.ID_CONTEUDO) {
              DocumentoService.altDocumento(documento).then(function (response) {
                  if (response)
                      $scope.openToast("success", "Sucesso!", "Alteração realizada com sucesso!");
                  else
                      $scope.openToast("error", "Erro!", "Erro ao realizar a alteração!");
                  $state.go("documentos");
              });
          }
          else {
              DocumentoService.cadDocumento(conteudo).then(function (response) {
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
