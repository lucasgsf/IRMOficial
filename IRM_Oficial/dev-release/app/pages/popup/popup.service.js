/** @ngInject */
angular.module('BlurAdmin.pages.popups').service('PopupsService', function ($http) {
    var PopupsService = {
        listarPopups: function () {
            return $http.get('../../../../api/Popup/listarPopups').then(function (response) {
	            return response.data;
	        });
	    },
	}
    return PopupsService;
});

/** @ngInject */
angular.module('BlurAdmin.pages.popup').service('PopupService', function ($http) {
    var PopupService = {
        getPopup: function (popup) {
            return $http.get('../../../../api/Popup/getPopup/' + popup).then(function (response) {
                return response.data;
            });
        },
        cadPopup: function (popup) {
            return $http.post('../../../../api/Popup/cadPopup', popup).then(function (response) {
                return response.data;
            });
        },
        altPopup: function (popup) {
            return $http.post('../../../../api/Popup/altPopup', popup).then(function (response) {
                return response.data;
            });
        },
        delPopup: function (popup) {
            return $http.post('../../../../api/Popup/delPopup', popup).then(function (response) {
                return response.data;
            });
        },
    }
    return PopupService;
});