/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('barChart', barChart);

  /** @ngInject */
  function barChart() {
    return {
      restrict: 'E',
      controller: 'BarChartCtrl',
      templateUrl: 'app/pages/dashboard/barChart/barChart.html'
    };
  }
})();