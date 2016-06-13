angular.module('flightCard', ['resources.flights'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/flights/flightCard/:flight_id/', {
    templateUrl:'flightCard/list.tpl.html',
    controller:'flightCardCtrl'
  });
}])

.controller('flightCardCtrl', ['$scope', 'Flights', 'security', '$location', '$routeParams', function($scope, Flights, security, $location, $routeParams){
  Flights.getFlight($routeParams.flight_id).then(function(data) {
    $scope.flight = data;
  });

  $scope.user = security.parseJwt(security.getToken());

  $scope.submit = function() {
    $location.path('/preflight/' + flight.flight_id);
  };
}]);