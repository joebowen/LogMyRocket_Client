angular.module('rockets', ['resources.rockets'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/rockets', {
    templateUrl:'rockets/list.tpl.html',
    controller:'RocketsListCtrl',
    resolve:{
      rockets:['Rockets', function(Rockets){
        return Rockets.getAll().then(function(response){
          return response.data;
        });
      }]
    }
  });
}])

.controller('RocketsListCtrl', ['$scope', 'rockets', function($scope, rockets){
  $scope.rockets = rockets;
}]);