angular.module('postFlightData', ['resources.flights'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/flights/post-flight/:flight_id/', {
    templateUrl:'postFlightData/list.tpl.html',
    controller:'postFlightDataCtrl'
  });
}])

.controller('postFlightDataCtrl', ['$scope', 'Flights', '$location', '$routeParams', function($scope, Flights, $location, $routeParams){
  Flights.getFlight($routeParams.flight_id).then(function(data) {
    $scope.flight = data;
  });

  $scope.submit = function(flight) {
    Flights.updateFlight(flight.flight_id, flight.flight_data).then(function() {
      $location.path('flights/');
    });
  };
}]);