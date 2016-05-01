angular.module('newFlight', ['resources.flights'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/flights/new-flight', {
    templateUrl:'newFlight/list.tpl.html',
    controller:'NewFlightCtrl'
  });
}])

.controller('NewFlightCtrl', ['$scope', 'Flights', 'Rockets', function($scope, Flights, Rockets){
  $scope.allMotors = [
    {
      name: "test_motor",
      id : "1"
    }
  ];

  $scope.flight = {};

  Rockets.getAll()
    .then(function(response){
      $scope.rockets = response.data;
      $scope.rocket = $scope.rockets[0];
      $scope.motor = $scope.rockets[0].rocket_data.motors;
    });

  $scope.submit = function() {
    $scope.flight.create = Date.now();
    Flights.newFlight($scope.rocket, $scope.flight, $scope.motor)
  };

  $scope.rocketItemSelected = function(rocket) {
    $scope.rocket = rocket;
    $scope.motor = rocket.rocket_data.motors;
  };

  $scope.addMotorToStage = function(stageIndex, motorIndex, motor) {
    $scope.motor[stageIndex][motorIndex]['motor'] = motor;
  };
}]);