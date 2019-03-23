/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.popup')
      .controller('PopupCtrl', PopupCtrl);

  angular.module('BlurAdmin.pages.popups')
      .controller('PopupsCtrl', PopupsCtrl);

  /** @ngInject */
  function PopupsCtrl($scope, $rootScope, $state, PopupsService, PopupService, toastr, toastrConfig) {
      var openedToasts = [];
      var defaultConfig = angular.copy(toastrConfig);
      $scope.smartTablePageSize = 10;
      $scope.displayedList = [];
      $scope.safeList = [];

      function Listar() {
          $scope.displayedList = [];
          $scope.safeList = [];
          PopupsService.listarPopups().then(function (response) {
              $scope.displayedList = response;
              $scope.safeList = response;
          });
      }

      $scope.formatData = function (data) {
          return new Date(data).toLocaleDateString("pt-BR");
      };

      $scope.edit = function (item) {
          $rootScope.popup = item;
          $state.go('popup', { id: item.ID_POPUP });
      };

      $scope.delete = function (item) {
          PopupService.delPopup(item).then(function (response) {
              Listar();

              if (response)
                  $scope.openToast("success", "Sucesso!", "Exclusão realizada com sucesso!");
              else
                  $scope.openToast("error", "Erro!", "Erro ao realizar a exclusão!");
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
  function PopupCtrl($q, $scope, $rootScope, $state, $stateParams, PopupService, toastr, toastrConfig, FileUploader) {
      var uploader = $scope.uploader = new FileUploader({ removeAfterUpload : true });
      var openedToasts = [];
      var defaultConfig = angular.copy(toastrConfig);
      $scope.sucesso = true;
      $scope.popup = {};

      if ($stateParams != null && $stateParams.id != null) {
          if ($rootScope.popup != undefined) {
              $scope.popup = $rootScope.popup;
          }
          else {
              var id = $stateParams.id;
              PopupService.getPopup(id).then(function (response) {
                  $scope.popup = response;
              });
          }
      }

      $scope.salvar = function (item) {
          var popup = {};
          angular.copy(item, popup);
          
          $scope.uploader.onBeforeUploadItem = function (item) {
              var form = angular.copy(popup, form);
              item.formData.push(form);
              item.url = "../../../../api/Popup/cadPopupFoto";
          };

          $scope.uploader.onCompleteItem = function (item, response, status, headers) {
              console.log(response);
              popup.ID_POPUP = response;
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
                  $state.go("popups");
              };
          }
          else if (popup.ID_POPUP) {
              PopupService.altPopup(popup).then(function (response) {
                  if (response)
                      $scope.openToast("success", "Sucesso!", "Alteração realizada com sucesso!");
                  else
                      $scope.openToast("error", "Erro!", "Erro ao realizar a alteração!");
                  $state.go("popups");
              });
          }
          else {
              PopupService.cadPopup(popup).then(function (response) {
                  if (response)
                      $scope.openToast("success", "Sucesso!", "Cadastro realizado com sucesso!");
                  else
                      $scope.openToast("error", "Erro!", "Erro ao realizar o cadastro!");
                  $state.go("popups");
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
