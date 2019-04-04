/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

  /** @ngInject */
  function DashboardPieChartCtrl($q, $rootScope, $scope, $timeout, baConfig, baUtil, DashboardService) {
    var DT_INICIO = new Date('2000/01/01');
    var DT_FIM = new Date();
    DT_FIM.setDate(DT_FIM.getDate() + 1);
    buscaDados(DT_INICIO, DT_FIM);

    $scope.totalUsuarios = 0;
    $scope.totalPosts = 0;
    $scope.totalCurtidas = 0;
    $scope.totalPlays = 0;
    $scope.totalCompartilhamentos = 0;
    //$scope.totalNaoCurtidas = 0;

    $scope.$on('dataChange', function(event, args){
        DT_INICIO = new Date(args.DT_INICIO);
        DT_FIM = new Date(args.DT_FIM);
        buscaDados(DT_INICIO, DT_FIM);
    });

    function buscaDados(DT_INICIO, DT_FIM){
        $q.all([
            DashboardService.totalUsuarios(DT_INICIO.toLocaleString('en-US'), DT_FIM.toLocaleString('en-US')), 
            DashboardService.totalCurtidas(DT_INICIO.toLocaleString('en-US'), DT_FIM.toLocaleString('en-US')),
            DashboardService.totalPlays(DT_INICIO.toLocaleString('en-US'), DT_FIM.toLocaleString('en-US')),
            DashboardService.totalCompartilhamentos(DT_INICIO.toLocaleString('en-US'), DT_FIM.toLocaleString('en-US'))
            //DashboardService.totalNaoCurtidas(DT_INICIO.toLocaleString('en-US'), DT_FIM.toLocaleString('en-US'))
            //DashboardService.totalPosts(DT_INICIO.toLocaleString('en-US'), DT_FIM.toLocaleString('en-US')),
        ])
        .then(function(values) {
            $scope.totalUsuarios = values[0];
            $scope.totalCurtidas = values[1];
            $scope.totalPlays = values[2];
            $scope.totalCompartilhamentos = values[3];
            //$scope.totalPosts = values[1];
            //$scope.totalNaoCurtidas = values[3];

            geraGrafico(values[0], values[1], values[2], values[3]);
        });
    }

    function geraGrafico(v1, v2, v3, v4){
        $scope.charts = [{
          color: pieColor,
          description: 'Acessos',
          stats: v1,
          icon: 'person',
        }, {
            color: pieColor,
            description: 'Curtidas',
            stats: v2,
            icon: 'thumbsup',
        }, {
          color: pieColor,
          description: 'Reproduções',
          stats: v3,
          icon: 'person',
        }, {
          color: pieColor,
          description: 'Compart.',
          stats: v4,
          icon: 'person',
        }
        ];
        $timeout(function () {
          loadPieCharts();
          updatePieCharts();
        }, 1000);
    }

    var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function loadPieCharts() {
      $('.chart').each(function () {
        var chart = $(this);
        chart.easyPieChart({
          easing: 'easeOutBounce',
          onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
          },
          barColor: chart.attr('rel'),
          trackColor: 'rgba(0,0,0,0)',
          size: 84,
          scaleLength: 0,
          animation: 2000,
          lineWidth: 9,
          lineCap: 'round',
        });
      });

      $('.refresh-data').on('click', function () {
        updatePieCharts();
      });
    }

    function updatePieCharts() {
      $('.pie-charts .chart').each(function(index, chart) {
        var percent = 0;
        percent = 100;
        $(chart).data('easyPieChart').update(percent);
      });
    }
  }
})();