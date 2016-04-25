angular.module('newFlight', ['resources.flights'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/flights/new-flight', {
    templateUrl:'newFlight/list.tpl.html',
    controller:'NewFlightCtrl'
  });
}])

.controller('NewFlightCtrl', ['$scope', 'Flights', function($scope, Flights){
  $scope.submit = function() {
    Flights.newFlight($scope.flight)
  };
}]);