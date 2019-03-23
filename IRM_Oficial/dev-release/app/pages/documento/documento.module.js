/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.documentos', [])
      .config(routeConfigDocumentos);

  angular.module('BlurAdmin.pages.documento', ['angularFileUpload'])
      .config(routeConfigDocumento);

  /** @ngInject */
  function routeConfigDocumentos($stateProvider) {
    $stateProvider
        .state('documentos', {
            url: '/documentos',
            templateUrl: 'app/pages/documento/documentos.html',
            title: 'Documentos',
            sidebarMeta: {
                icon: 'ion-document-text',
                order: 9,
            },
        });
  }

  /** @ngInject */
  function routeConfigDocumento($stateProvider) {
    $stateProvider
        .state('documento', {
            url: '/documento',
            templateUrl: 'app/pages/documento/documento.html',
            title: 'Documento',
            params: { id: null },
        });
  }

})();
