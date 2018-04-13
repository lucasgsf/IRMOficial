/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.usuario')
      .controller('UsuarioCtrl', UsuarioCtrl);

  angular.module('BlurAdmin.pages.usuarios')
      .controller('UsuariosCtrl', UsuariosCtrl);

  /** @ngInject */
  function UsuariosCtrl($scope, $rootScope, $state, UsuariosService, UsuarioService, toastr, toastrConfig) {
      var openedToasts = [];
      var defaultConfig = angular.copy(toastrConfig);
      $scope.smartTablePageSize = 10;
      $scope.displayedList = [];
      $scope.safeList = [];
      $scope.excelList = [];

      function Listar() {
          $scope.displayedList = [];
          $scope.safeList = [];
          UsuariosService.listarUsuarios().then(function (response) {
              $scope.displayedList = response;
              $scope.safeList = response;
          });
      }

      $scope.gerarExcel = function(){
          var csvArray = [{}];
          delete(csvArray[0]);
          angular.forEach($scope.safeList, function(value, key){
	          var obj = {
                    DS_NOME: value.DS_NOME,
                    DS_EMAIL: value.DS_EMAIL,
                    DS_PAIS: value.DS_PAIS,
                    DS_ESTADO: value.DS_ESTADO,
                    DS_CIDADE: value.DS_CIDADE
              };
              csvArray.push(obj);
		  });
          return csvArray;
      };

      $scope.edit = function (item) {
          $rootScope.usuario = item;
          $state.go('usuario', { id: item.ID_USUARIO });
      };

      $scope.delete = function (item) {
          UsuarioService.delUsuario(item).then(function (response) {
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
  function UsuarioCtrl($scope, $rootScope, $state, $stateParams, UsuarioService, TiposUsuarioService, toastr, toastrConfig) {
      var openedToasts = [];
      var defaultConfig = angular.copy(toastrConfig);
      $scope.usuario = {};
      $scope.lstTiposUsuario = {};

      if ($stateParams != null && $stateParams.id != null) {
          if ($rootScope.usuario != undefined) {
              $scope.usuario = $rootScope.usuario;
              $scope.usuario.ID_TIPO_USUARIO = { ID_TIPO_USUARIO: $scope.usuario.ID_TIPO_USUARIO };
          }
          else {
              var usuario = { ID_USUARIO : $stateParams.id };
              UsuarioService.getUsuario(usuario).then(function (response) {
                  response.ID_TIPO_USUARIO = { ID_TIPO_USUARIO: response.ID_TIPO_USUARIO };
                  $scope.usuario = response;
              });
          }
      }

      TiposUsuarioService.listarTiposUsuario().then(function (response) {
          $scope.lstTiposUsuario = response;
      });

      // Google Maps Search
      $scope.$on('gmPlacesAutocomplete::placeChanged', function () {
          var place = $scope.usuario.DS_ENDERECO.getPlace();
          $scope.usuario.DS_CIDADE = extractFromAdress(place.address_components, "locality");
          if ($scope.usuario.DS_CIDADE == "")
              $scope.usuario.DS_CIDADE = extractFromAdress(place.address_components, "administrative_area_level_2");
          $scope.usuario.DS_ESTADO = extractFromAdress(place.address_components, "administrative_area_level_1");
          $scope.usuario.DS_PAIS = extractFromAdress(place.address_components, "country");
          $scope.usuario.DS_PAIS_SIGLA = extractFromAdress(place.address_components, "country", true);
          console.log($scope.usuario);
      });

      function extractFromAdress(components, type, long) {
          for (var i = 0; i < components.length; i++)
              for (var j = 0; j < components[i].types.length; j++)
                  if (components[i].types[j] == type) return (long) ? components[i].short_name : components[i].long_name;
          return "";
      }

      $scope.salvar = function (item) {
          var usuario = {};
          angular.copy(item, usuario);
          delete (usuario.DS_ENDERECO);

          usuario.ID_TIPO_USUARIO = (usuario.ID_TIPO_USUARIO && usuario.ID_TIPO_USUARIO.ID_TIPO_USUARIO) ? usuario.ID_TIPO_USUARIO.ID_TIPO_USUARIO : null;
          usuario.DT_CADASTRO = new Date().toISOString();

          if (usuario.ID_USUARIO == undefined) {
              UsuarioService.cadUsuario(usuario).then(function (response) {
                  if (response)
                      $scope.openToast("success", "Sucesso!", "Cadastro realizado com sucesso!");
                  else 
                      $scope.openToast("error", "Erro!", "Erro ao realizar o cadastro!");
                  $state.go("usuarios");
              });
          }
          else {
              UsuarioService.altUsuario(usuario).then(function (response) {
                  if (response)
                      $scope.openToast("success", "Sucesso!", "Alteração realizada com sucesso!");
                  else
                      $scope.openToast("error", "Erro!", "Erro ao realizar a alteração!");
                  $state.go("usuarios");
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
