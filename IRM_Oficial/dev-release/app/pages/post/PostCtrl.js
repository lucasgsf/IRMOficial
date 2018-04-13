/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.post')
      .controller('PostCtrl', PostCtrl);

  angular.module('BlurAdmin.pages.posts')
      .controller('PostsCtrl', PostsCtrl);

  /** @ngInject */
  function PostsCtrl($scope, $rootScope, $state, PostsService, PostService, toastr, toastrConfig) {
      var openedToasts = [];
      var defaultConfig = angular.copy(toastrConfig);
      $scope.smartTablePageSize = 10;
      $scope.displayedList = [];
      $scope.safeList = [];

      function Listar() {
          $scope.displayedList = [];
          $scope.safeList = [];
          PostsService.listarPosts().then(function (response) {
              $scope.displayedList = response;
              $scope.safeList = response;
          });
      }

      $scope.formatData = function (data) {
          return new Date(data).toLocaleDateString("pt-BR");
      };

      $scope.edit = function (item) {
          $rootScope.post = item;
          $state.go('post', { id: item.ID_POST });
      };

      $scope.delete = function (item) {
          PostService.delPost(item).then(function (response) {
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
  function PostCtrl($q, $scope, $rootScope, $state, $stateParams, PostService, TiposPostService, IdiomasService, NotificacaoService, toastr, toastrConfig, FileUploader) {
      var uploader = $scope.uploader = new FileUploader({ removeAfterUpload : true });
      var openedToasts = [];
      var defaultConfig = angular.copy(toastrConfig);
      $scope.sucesso = true;
      $scope.post = {};
      $scope.lstTiposPost = {};
      $scope.lstIdiomas = {};

      if ($stateParams != null && $stateParams.id != null) {
          if ($rootScope.post != undefined) {
              $scope.post = $rootScope.post;
              $scope.post.ID_TIPO_POST = { ID_TIPO_POST: $scope.post.ID_TIPO_POST };
              $scope.post.ID_IDIOMA = { ID_IDIOMA: $scope.post.ID_IDIOMA };
              $scope.post.DT_CADASTRO = new Date($scope.post.DT_CADASTRO);
          }
          else {
              var id = $stateParams.id;
              PostService.getPost(id).then(function (response) {
                  response.ID_TIPO_POST = { ID_TIPO_POST: response.ID_TIPO_POST };
                  response.ID_IDIOMA = { ID_IDIOMA: response.ID_IDIOMA };
                  response.DT_CADASTRO = new Date(response.DT_CADASTRO);
                  $scope.post = response;
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

      TiposPostService.listarTiposPost().then(function (response) {
          $scope.lstTiposPost = response;
      });

      IdiomasService.listarIdiomas().then(function (response) {
          $scope.lstIdiomas = response;
      });

      $scope.salvar = function (item) {
          var post = {};
          angular.copy(item, post);

          post.ID_IDIOMA = (post.ID_IDIOMA && post.ID_IDIOMA.ID_IDIOMA) ? post.ID_IDIOMA.ID_IDIOMA : null;
          post.ID_TIPO_POST = (post.ID_TIPO_POST && post.ID_TIPO_POST.ID_TIPO_POST) ? post.ID_TIPO_POST.ID_TIPO_POST : null;
          post.DT_CADASTRO = (post.DT_CADASTRO) ? post.DT_CADASTRO.toISOString() : null;
          
          $scope.uploader.onBeforeUploadItem = function (item) {
              var form = angular.copy(post, form);
              item.formData.push(form);
              item.url = "../../../../api/Post/cadPostFoto";
          };

          $scope.uploader.onCompleteItem = function (item, response, status, headers) {
              console.log(item, response);
              if (!response)
                  $scope.sucesso = false;
          };

          $scope.uploader.onCompleteAll = function () {
              console.log($scope.sucesso);
              if ($scope.sucesso) {
                  var push = angular.copy(item);
                  push.DT_ENVIO = push.DT_CADASTRO;
                  push.DS_MENSAGEM = push.DS_POST;
                  push.DT_ENVIO.setHours(push.DT_HORARIO.getHours());
                  push.DT_ENVIO.setMinutes(push.DT_HORARIO.getMinutes());
                  push.DT_ENVIO = (push.DT_ENVIO) ? push.DT_ENVIO.toISOString() : null;
                  NotificacaoService.enviarNotificacao(push).then(function (response) {
                      if (response) {
                          $scope.openToast("success", "Sucesso!", "Cadastro realizado com sucesso!");
                          $state.go("posts");
                      }
                      else{
                          $scope.openToast("error", "Erro!", "Erro ao realizar o cadastro!");
                          $state.go("posts");
                      }
                  });
              }
              else {
                  $scope.openToast("error", "Erro!", "Erro ao realizar o cadastro!");
                  $state.go("posts");
              }
          };
          
          if ($scope.uploader.queue.length > 0) {
              PostService.cadPost(post).then(function (response) {
                  if (response.valid) {
                      post.ID_POST = response.id;
                      $scope.uploader.uploadAll();
                  }
                  else
                      $scope.sucesso = false;
              });
          }
          else if (post.ID_POST) {
              PostService.altPost(post).then(function (response) {
                  if (response)
                      $scope.openToast("success", "Sucesso!", "Alteração realizada com sucesso!");
                  else
                      $scope.openToast("error", "Erro!", "Erro ao realizar a alteração!");
                  $state.go("posts");
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
