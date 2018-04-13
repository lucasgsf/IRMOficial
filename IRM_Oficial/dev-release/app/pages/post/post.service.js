/** @ngInject */
angular.module('BlurAdmin.pages.posts').service('PostsService', function ($http) {
    var PostsService = {
        listarPosts: function () {
            return $http.get('../../../../api/Post/listarPosts').then(function (response) {
	            return response.data;
	        });
	    },
	}
    return PostsService;
});

/** @ngInject */
angular.module('BlurAdmin.pages.post').service('PostService', function ($http) {
    var PostService = {
        getPost: function (post) {
            return $http.get('../../../../api/Post/getPost/' + post).then(function (response) {
                return response.data;
            });
        },
        cadPost: function (post) {
            return $http.post('../../../../api/Post/cadPost', post).then(function (response) {
                return response.data;
            });
        },
        altPost: function (post) {
            return $http.post('../../../../api/Post/altPost', post).then(function (response) {
                return response.data;
            });
        },
        delPost: function (post) {
            return $http.post('../../../../api/Post/delPost', post).then(function (response) {
                return response.data;
            });
        },
    }
    return PostService;
});