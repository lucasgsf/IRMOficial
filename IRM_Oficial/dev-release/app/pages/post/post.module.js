/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.posts', [])
      .config(routeConfigPosts);

  angular.module('BlurAdmin.pages.post', ['angularFileUpload'])
      .config(routeConfigPost);

  /** @ngInject */
  function routeConfigPosts($stateProvider) {
    $stateProvider
        .state('posts', {
            url: '/posts',
            templateUrl: 'app/pages/post/posts.html',
            title: 'Posts',
            sidebarMeta: {
                icon: 'ion-document-text',
                order: 1,
            },
        });
  }

  /** @ngInject */
  function routeConfigPost($stateProvider) {
    $stateProvider
        .state('post', {
            url: '/post',
            templateUrl: 'app/pages/post/post.html',
            title: 'Post',
            params: { id: null },
        });
  }

})();