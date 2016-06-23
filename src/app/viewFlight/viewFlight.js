angular.module('viewFlight', ['resources.flights'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/flights/view-flight/:flight_id/', {
    templateUrl:'viewFlight/list.tpl.html',
    controller:'viewFlightCtrl'
  });
}])

.controller('viewFlightCtrl', ['$scope', 'Flights', '$location', '$routeParams', function($scope, Flights, $location, $routeParams){
  Flights.getFlight($routeParams.flight_id).then(function(flight) {
    $scope.flight = flight;
  });

  $scope.submit = function() {
    $location.path('/flights');
  };
}]);