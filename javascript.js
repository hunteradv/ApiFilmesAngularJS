//module
angular.module('Curso', []).run(function ($rootScope) {
    $rootScope.titulo = 'Curso';
    $rootScope.nome = 'Roger';
})

//service
.service('BuscaFilmeApi', function($http, $q) {
    var service = this;

    service.BuscarFilme = function(sNome) {
        var resultado = $q.defer();

        var urlApi = 'http://www.omdbapi.com/?apikey=d008962c&t=';

        $http({
            url: urlApi + sNome
        }).then(function(response) {
            console.log(response);

            var oFilmeApi = response.data;
            resultado.resolve(oFilmeApi);

        }, function() {
            resultado.reject();
        });

        return resultado.promise;
    }
})

//controller
.controller('ListaController', function(BuscaFilmeApi) {
    var ctrl = this;
    ctrl.titulo = 'Lista';

    ctrl.titulo = 'Encontre seu filme';
    ctrl.textBusca = null;
    ctrl.filmes = null;

    ctrl.Buscar = function() {
        BuscaFilmeApi.BuscarFilme(ctrl.textBusca).then(function(oFilme) {
            ctrl.filmes = oFilme;
        });
    }
});