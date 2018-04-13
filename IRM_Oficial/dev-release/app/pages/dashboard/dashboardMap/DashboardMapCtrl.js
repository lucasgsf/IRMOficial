/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardMapCtrl', DashboardMapCtrl);

  /** @ngInject */
  function DashboardMapCtrl($rootScope, $scope, baConfig, layoutPaths, DashboardService) {
    var layoutColors = baConfig.colors;
    var DT_INICIO = new Date('2000/01/01');
    var DT_FIM = new Date();
    buscaDados(DT_INICIO, DT_FIM);

    $scope.$on('dataChange', function(event, args){
        DT_INICIO = new Date(args.DT_INICIO);
        DT_FIM = new Date(args.DT_FIM);
        buscaDados(DT_INICIO, DT_FIM);
    });

    function buscaDados(DT_INICIO, DT_FIM){
        DashboardService.usuariosPorPais(DT_INICIO.toLocaleString('en-US'), DT_FIM.toLocaleString('en-US')).then(function(response){
            geraGrafico(response);
        });
    }

    function geraGrafico(listaData){
        var map = AmCharts.makeChart('amChartMap', {
          type: 'map',
          theme: 'blur',
          zoomControl: { zoomControlEnabled: false, panControlEnabled: false },

          dataProvider: {
            map: 'worldLow',
            zoomLevel: 3.5,
            zoomLongitude: -47.5547,
            zoomLatitude: -15.4647,
            areas: listaData
          },

          areasSettings: {
            rollOverOutlineColor: layoutColors.border,
            rollOverColor: layoutColors.primaryDark,
            alpha: 0.8,
            unlistedAreasAlpha: 0.2,
            unlistedAreasColor: layoutColors.defaultText,
            balloonText: '[[title]]: [[customData]] usuários'
          },


          legend: {
            width: '100%',
            marginRight: 27,
            marginLeft: 27,
            equalWidths: false,
            backgroundAlpha: 0.3,
            backgroundColor: layoutColors.border,
            borderColor: layoutColors.border,
            borderAlpha: 1,
            top: 362,
            left: 0,
            horizontalGap: 10,
            data: [
              {
                title: 'over 1 000 usuários',
                color: layoutColors.primary
              },
              {
                title: '500 - 1 000 usuários',
                color: layoutColors.successLight
              },
              {
                title: '100 - 500 usuários',
                color: layoutColors.success
              },
              {
                title: '0 - 100 usuários',
                color: layoutColors.danger
              }
            ]
          },
          export: {
            enabled: true
          },
          creditsPosition: 'bottom-right',
          pathToImages: layoutPaths.images.amChart
        });
    }
  }
})();