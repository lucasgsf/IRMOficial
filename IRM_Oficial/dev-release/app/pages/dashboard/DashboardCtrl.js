/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('DashboardCtrl', DashboardCtrl);

    /** @ngInject */
    function DashboardCtrl($q, $scope, $rootScope, $state, $stateParams, $uibModal, DashboardService) {
        $scope.dash = {};
        $scope.modal = {};
        $scope.acessosHoje = 0;
        $scope.acessosTotais = 0;
        $scope.safeList = [];
        $scope.displayedList = [];
        $scope.safeListEstados = [];
        $scope.displayedListEstados = [];
        $scope.safeListCidades = [];
        $scope.displayedListCidades = [];
        $scope.excelList = [];
        var DT_INICIO = new Date('2000/01/01');
        var DT_FIM = new Date();
        DT_FIM.setDate(DT_FIM.getDate() + 1);
        buscaDados(DT_INICIO, DT_FIM);

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

        $scope.$watch('safeList', function () {
            $scope.displayedList = $scope.safeList;
        });

        $scope.$watch('safeListEstados', function () {
            $scope.displayedListEstados = $scope.safeListEstados;
        });

        $scope.$watch('safeListCidades', function () {
            $scope.displayedListCidades = $scope.safeListCidades;
        });

        $scope.gerar = function (inicio, fim) {
            var dtFimInc = new Date();
            dtFimInc.setDate(dtFimInc.getDate() + 1);

            inicio = (inicio && !isNaN(inicio)) ? inicio : new Date('2000/01/01');
            fim = (fim && !isNaN(fim)) ? fim : dtFimInc;
            $scope.$broadcast('dataChange', { DT_INICIO: inicio, DT_FIM: fim });
            buscaDados(inicio, fim);
        };

        function buscaDados(DT_INICIO, DT_FIM) {
            $scope.displayedList = [];
            $scope.safeList = [];
            DashboardService.usuariosPorPaises(DT_INICIO.toLocaleString('en-US'), DT_FIM.toLocaleString('en-US')).then(function (response) {
                $scope.safeList = response;
            });
            DashboardService.acessosHoje().then(function (response) {
                $scope.acessosHoje = response;
            });
            DashboardService.acessosTotais().then(function (response) {
                $scope.acessosTotais = response;
            });
        }

        $scope.openModalEstados = function (page, size, data) {
            if (data.DS_PAIS && data.DS_PAIS != "") {
                $scope.modal = data;
                DashboardService.usuariosPorPaisEstado(data.DS_PAIS, DT_INICIO.toLocaleString('en-US'), DT_FIM.toLocaleString('en-US')).then(function (response) {
                    $scope.safeListEstados = response;
                    $uibModal.open({
                        animation: true,
                        templateUrl: page,
                        scope: $scope,
                        size: size,
                        resolve: {
                            items: function () {
                                return $scope.items;
                            }
                        }
                    });
                });
            }
        };

        $scope.openModalCidades = function (page, size, data) {
            if (data.DS_ESTADO && data.DS_ESTADO != "") {
                $scope.modal = data;
                DashboardService.usuariosPorEstadoCidade(data.DS_ESTADO, DT_INICIO.toLocaleString('en-US'), DT_FIM.toLocaleString('en-US')).then(function (response) {
                    $scope.safeListCidades = response;
                    $uibModal.open({
                        animation: true,
                        templateUrl: page,
                        scope: $scope,
                        size: size,
                        resolve: {
                            items: function () {
                                return $scope.items;
                            }
                        }
                    });
                });
            }
        };
    }
})();
