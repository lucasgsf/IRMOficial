angular.module('app.routes', [])

.config(function($stateProvider, $locationProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('post', {
    url: '/pilula/:id',
    templateUrl: 'templates/post.html',
    controller: 'postCtrl'
  });
    
  $urlRouterProvider.otherwise('/pacoca');
  $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
  });
});