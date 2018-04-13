/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('BarChartCtrl', BarChartCtrl);

  /** @ngInject */
  function BarChartCtrl($rootScope, $scope, baConfig, $element, layoutPaths, DashboardService) {
    var layoutColors = baConfig.colors;
    var DT_INICIO = new Date('2000/01/01');
    var DT_FIM = new Date();
    $scope.barChart = null;
    buscaDados(DT_INICIO, DT_FIM);

    $scope.$watch("barChart", function (newValue) {
        if (newValue && $scope.barChart.categoryAxis)
            addListeners();
    });

    $scope.$on('dataChange', function(event, args){
        DT_INICIO = new Date(args.DT_INICIO);
        DT_FIM = new Date(args.DT_FIM);
        buscaDados(DT_INICIO, DT_FIM);
    });

    function buscaDados(DT_INICIO, DT_FIM){
        DashboardService.usuariosPorEstado(DT_INICIO.toLocaleString('en-US'), DT_FIM.toLocaleString('en-US')).then(function(response){
            geraGrafico(response);
        });
    }

    function geraGrafico(listaData){
        var id = $element[0].getAttribute('id');
        $scope.barChart = AmCharts.makeChart(id, {
            type: 'serial',
            theme: 'blur',
            color: layoutColors.defaultText,
            dataProvider: listaData,
            valueAxes: [
            {
                axisAlpha: 0,
                position: 'left',
                title: '',
                gridAlpha: 0.5,
                gridColor: layoutColors.border,
            }
            ],
            startDuration: 1,
            graphs: [
            {
                balloonText: '<b>[[category]]: [[value]]</b>',
                //fillColorsField: 'color',
                fillColors: layoutColors.primary,
                fillAlphas: 0.7,
                lineAlpha: 0.2,
                type: 'column',
                //valueField: 'visits'
                valueField: 'NR_QUANTIDADE'
            }
            ],
            chartCursor: {
            categoryBalloonEnabled: false,
            cursorAlpha: 0,
            zoomable: false
            },
            //categoryField: 'country',
            categoryField: 'DS_ESTADO_QUANTIDADE',
            categoryAxis: {
            gridPosition: 'start',
            labelRotation: 45,
            gridAlpha: 0.5,
            gridColor: layoutColors.border,
            },
            export: {
            enabled: true
            },
            creditsPosition: 'top-right',
            pathToImages: layoutPaths.images.amChart
        });
    }

    function addListeners() {
        var categoryAxis = $scope.barChart.categoryAxis;
        categoryAxis.addListener("clickItem", handleClick);
        categoryAxis.addListener("rollOverItem", handleOver);
        categoryAxis.addListener("rollOutItem", handleOut);
    }

    function handleClick(event) {
        var data = angular.copy(event.serialDataItem.dataContext);
        data.DT_INICIO = DT_INICIO;
        data.DT_FIM = DT_FIM;
        $scope.open('app/pages/dashboard/barChart/modal.html', 'md', data);
    }

    function handleOut(event) {
        event.target.setAttr("cursor", "default");
        event.target.setAttr("fill", layoutColors.defaultText);
    }

    function handleOver(event) {
        event.target.setAttr("cursor", "pointer");
        event.target.setAttr("fill", "#004960");
    }
  }
})();
