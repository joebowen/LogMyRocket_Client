angular.module('preFlightChecklist', ['resources.flights'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/flights/pre-flight/:flight_id/', {
    templateUrl:'preFlightChecklist/list.tpl.html',
    controller:'preFlightChecklistCtrl'
  });
}])

.controller('preFlightChecklistCtrl', ['$scope', 'Flights', '$location', '$routeParams', function($scope, Flights, $location, $routeParams){
  $scope.alerts = [];
  $scope.checked = [];

  Flights.getFlight($routeParams.flight_id).then(function(data) {
    $scope.flight = data;
  });

  $scope.closeAlert = function(index) {
    $scope.alerts = [];
  };

  $scope.submit = function(flight, checked) {
    if (checked.length === flight.rocket_data.rocket_data.preflight.length) {
      $location.path('flights/flight-card/' + flight.flight_id);
    }
    else {
      $scope.alerts = [{ type: 'danger', msg: 'Please complete the checklist.' }];
    }
  };
}]);