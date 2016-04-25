angular.module('flights', ['resources.flights'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/flights', {
    templateUrl:'flights/list.tpl.html',
    controller:'FlightsListCtrl',
    resolve:{
      flights:['Flights', function(Flights){
        return Flights.getAll();
      }]
    }
  });
}])

.controller('FlightsListCtrl', ['$scope', 'flights', function($scope, flights){
  $scope.flights = flights;
}]);