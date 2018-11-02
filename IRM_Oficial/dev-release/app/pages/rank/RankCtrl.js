/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.rank')
      .controller('RankCtrl', RankCtrl);

  /** @ngInject */
  function RankCtrl($scope, $rootScope, $state, RankService, toastr, toastrConfig) {
      var openedToasts = [];
      var defaultConfig = angular.copy(toastrConfig);

      $scope.smartTablePageSize = 100;
      $scope.displayedList = [];
      $scope.safeList = [];
      $scope.excelList = [];

      $scope.listarSemanal = function(){
          $scope.displayedList = [];
          $scope.safeList = [];
          RankService.rankSemanal().then(function (response) {
              $scope.displayedList = response;
              $scope.safeList = response;
          });
      };

      $scope.listarMensal = function(){
          $scope.displayedList = [];
          $scope.safeList = [];
          RankService.rankMensal().then(function (response) {
              $scope.displayedList = response;
              $scope.safeList = response;
          });
      };

      $scope.listarGeral = function(){
          $scope.displayedList = [];
          $scope.safeList = [];
          RankService.rankGeral().then(function (response) {
              $scope.displayedList = response;
              $scope.safeList = response;
          });
      };

      $scope.gerarExcel = function(){
          var csvArray = [{}];
          delete(csvArray[0]);
          angular.forEach($scope.safeList, function(value, key){
	          var obj = {
                    POSICAO_RANK: value.POSICAO_RANK,
                    DS_NOME: value.DS_NOME,
                    COMPARTILHAMENTO: value.COMPARTILHAMENTO,
                    CURTIR: value.CURTIR,
                    PLAY: value.PLAY,
                    TOTAL: value.TOTAL
              };
              csvArray.push(obj);
		  });
          return csvArray;
      };

      $scope.listarSemanal();

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
