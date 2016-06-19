angular.module('newFlight', ['resources.flights', 'resources.motors', 'newFlight.motor_chooser_form'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/flights/new-flight/', {
    templateUrl:'newFlight/list.tpl.html',
    controller:'NewFlightCtrl'
  })
  .when('/flights/new-flight/:rocket_id?', {
    templateUrl:'newFlight/list.tpl.html',
    controller:'NewFlightCtrl'
  });
}])

.controller('NewFlightCtrl', ['$scope', 'Flights', 'Rockets', '$uibModal', '$routeParams', '$location', function($scope, Flights, Rockets, $uibModal, $routeParams, $location){
  $scope.flight = {};

  Rockets.getAll()
    .then(function(response){
      $scope.rockets = response.data;
      $scope.rocket = $scope.rockets[0];
      $scope.motor_spec = $scope.rocket.rocket_data.motors;
    });

  $scope.submit = function() {
    $scope.flight.create = Date.now();
    Flights.newFlight($scope.rocket, $scope.flight).then(function(data) {
      flight_id = data.flight_id;
      $location.path('/flights/pre-flight/' + flight_id);
    });
  };

  $scope.rocketItemSelected = function(rocket) {
    $scope.rocket = rocket;
    $scope.motor_spec = rocket.rocket_data.motors;
  };

  var motorChooserDialog = null;
  $scope.openMotorChooser = function(stageIndex, motorIndex, motorDia) {
    if ( motorChooserDialog ) {
      throw new Error('Trying to open a dialog that is already open!');
    }
    motorChooserDialog = $uibModal.open({
      templateUrl: 'newFlight/motor_chooser_form.tpl.html',
      controller: 'MotorChooserFormController',
      resolve: {
        stageIndex: function () { return stageIndex },
        motorIndex: function () { return motorIndex },
        motorDia:function () { return motorDia }
      }
    });

    motorChooserDialog.result.then(onMotorChooserDialogClose);
  };

  function closeMotorChooserDialog(success) {
    if (motorChooserDialog) {
      motorChooserDialog.close(success);
    }
  };

  function onMotorChooserDialogClose(success) {
    motorChooserDialog = null;
    $scope.motor_spec[success['stage-index']][success['motor-index']]['motor'] = success['motor'];
  };

}]);