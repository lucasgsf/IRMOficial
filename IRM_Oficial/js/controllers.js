angular.module('app.controllers', [])
  
.controller('postCtrl', ['$scope', '$rootScope', '$sce', '$ionicPlatform', '$state',  '$stateParams', '$window', '$timeout', '$ionicPopup', '$filter', 'PostService', 'ConteudoService', 'AcoesPostService', 'angularPlayer', 'BusyService', 'UsuarioService',
function ($scope, $rootScope, $sce, $ionicPlatform, $state, $stateParams, $window, $timeout, $ionicPopup, $filter, PostService, ConteudoService, AcoesPostService, angularPlayer, BusyService, UsuarioService) {

    $scope.data = new Date();
	$scope.data.setHours(0,0,0,0);
	$scope.post = undefined;
	$scope.media = undefined;
	$scope.dataText = $scope.data.toLocaleDateString();
	$scope.usuario = ($window.localStorage["userData"] != undefined) ? JSON.parse($window.localStorage["userData"]) : undefined;
    $scope.playing = false;
    $scope.pause = true;

	if($stateParams && $stateParams.id)
    {
		BusyService.show();
		PostService.getPostDetalhado($stateParams.id).then(function(response){
			BusyService.hide();
            $scope.post = response;
            $scope.post.id = $scope.post.ID_POST;
            $scope.post.title = $scope.post.DS_TITULO;
            $scope.post.artist = $scope.post.DS_TIPO_POST + " - IRM Oficial";
            $scope.post.url = "http://irmoficial.azurewebsites.net/posts/" + $scope.post.ID_POST + "/audio.mp3";
            $timeout(function () {
                angularPlayer.clearPlaylist(function (response) {
                    angularPlayer.addTrack($scope.post);
                });
            }, 0);
		});
	}

    $scope.playAudioPost = function (item) {
        // Reproduz o áudio
        if (!$scope.playing) {
            $timeout(function () {
                angularPlayer.play();
            }, 0);
            $scope.playing = true;
            $scope.pause = false;
            // Salva Estatística
            var acoes = [];
            var acaoPost = {
                ID_USUARIO: $scope.usuario.ID_USUARIO,
                ID_POST: item.ID_POST,
                FL_PLAY: true,
                DT_ACAO_PLAY: new Date().toLocaleString('en-US')
            };
            if ($window.localStorage["acoes"] != undefined) {
                acoes = JSON.parse($window.localStorage["acoes"]);
                var reg = getByValue(acoes, item.ID_POST);
                if (reg != undefined) {
                    reg.FL_PLAY = true;
                    reg.DT_ACAO_PLAY = new Date().toLocaleString('en-US');
                    AcoesPostService.cadAcoesPost(reg).then(function (response) { });
                    $window.localStorage["acoes"] = JSON.stringify(acoes);
                }
                else {
                    acoes.push(acaoPost);
                    AcoesPostService.cadAcoesPost(acaoPost).then(function (response) { });
                    $window.localStorage["acoes"] = JSON.stringify(acoes);
                }
            }
            else {
                acoes.push(acaoPost);
                AcoesPostService.cadAcoesPost(acaoPost).then(function (response) { });
                $window.localStorage["acoes"] = JSON.stringify(acoes);
            }
        }
        else {
            $timeout(function () {
                if (angularPlayer.isPlayingStatus()) {
                    angularPlayer.pause();
                    $scope.pause = true;
                }
                else {
                    angularPlayer.play();
                    $scope.pause = false;
                }
            }, 0);
        }
    };

	$scope.curtirPost = function(item){
		var acoes = [];
		var acaoPost = {
			ID_USUARIO: ($scope.usuario != undefined) ? $scope.usuario.ID_USUARIO : null,
			ID_POST: item.ID_POST,
			FL_CURTIR: true,
			FL_NAO_CURTIR: false,
			DT_ACAO_CURTIR: new Date().toLocaleString('en-US')
		};
		if($window.localStorage["acoes"] != undefined){
			acoes = JSON.parse($window.localStorage["acoes"]);
			var reg = getByValue(acoes, item.ID_POST);
			if(reg != undefined){
				if(!reg.FL_CURTIR)
					item.NR_CURTIDAS++;
				reg.FL_CURTIR = true;
				reg.DT_ACAO_CURTIR = new Date().toLocaleString('en-US');
				AcoesPostService.cadAcoesPost(reg).then(function(response){});
				$window.localStorage["acoes"] = JSON.stringify(acoes);
			}
			else{
				item.NR_CURTIDAS++;
				acoes.push(acaoPost);
				AcoesPostService.cadAcoesPost(acaoPost).then(function(response){});
				$window.localStorage["acoes"] = JSON.stringify(acoes);
			}
		}
		else{
			item.NR_CURTIDAS++;
			acoes.push(acaoPost);
			AcoesPostService.cadAcoesPost(acaoPost).then(function(response){});
			$window.localStorage["acoes"] = JSON.stringify(acoes);
		}
	};

	$scope.getCurtirPost = function(item){
		var acoes = [];
		if($window.localStorage["acoes"] != undefined){
			acoes = JSON.parse($window.localStorage["acoes"]);
			var reg = getByValue(acoes, item.ID_POST);
			return (reg != undefined && (reg.curtir || reg.FL_CURTIR));
		}
		else{
			return false;
		}
	};

	function getByValue(arr, value) {
		var result  = arr.filter(function(o){return o.ID_POST == value;} );
		return result? result[0] : null; // or undefined
	}
}])
 