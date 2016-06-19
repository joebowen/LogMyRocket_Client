angular.module('flightCard', ['resources.flights'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/flights/flight-card/:flight_id/', {
    templateUrl:'flightCard/list.tpl.html',
    controller:'flightCardCtrl'
  });
}])

.controller('flightCardCtrl', ['$scope', 'Flights', 'security', '$location', '$routeParams', function($scope, Flights, security, $location, $routeParams){
  Flights.getFlight($routeParams.flight_id).then(function(data) {
    $scope.flight = data;
  });

  $scope.user = security.parseJwt(security.getToken());

  $scope.submit = function(flight) {
    $location.path('/flights/post-flight/' + flight.flight_id);
  };
}]);