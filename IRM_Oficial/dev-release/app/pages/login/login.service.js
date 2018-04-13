/** @ngInject */
angular.module('BlurAdmin.login').service('LoginService', function ($http) {
    var LoginService = {
	    loginUsuario: function (usuario) {
            return $http.post('../../../../api/Usuario/loginUsuario', usuario).then(function (response) {
	            return response.data;
	        });
	    },
	}
    return LoginService;
});