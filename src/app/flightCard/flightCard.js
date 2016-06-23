angular.module('flightCard', ['resources.flights'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/flights/flight-card/:flight_id/', {
    templateUrl:'flightCard/list.tpl.html',
    controller:'flightCardCtrl'
  });
}])

.controller('flightCardCtrl', ['$scope', 'Flights', '$location', '$routeParams', 'Users', function($scope, Flights, $location, $routeParams, Users){
  Flights.getFlight($routeParams.flight_id).then(function(flight) {
    $scope.flight = flight;
  });

  Users.getSettings().then(function(user) {
    $scope.user = user.data;
  });

  $scope.submit = function(flight) {
    $location.path('/flights/post-flight/' + flight.flight_id);
  };
}]);