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

.controller('NewFlightCtrl', ['$scope', 'Flights', 'Rockets', 'Users', '$uibModal', '$routeParams', '$location', function($scope, Flights, Rockets, Users, $uibModal, $routeParams, $location){
  $scope.flight = {};

  Rockets.getAll()
    .then(function(response){
      $scope.rockets = response.data;
      $scope.rocket = $scope.rockets[0];
    });

  $scope.submit = function() {

    for (stage in $scope.rocket.rocket_data.motors) {
      for (motor in $scope.rocket.rocket_data.motors[stage]){
        Users.delMotor($scope.rocket.rocket_data.motors[stage][motor].motor['motor-id']);
      }
    }

    //Users.delMotor(JSON.parse($scope.data.select)['motor']['motor-id']);

    $scope.flight.create = Date.now();
    Flights.newFlight($scope.rocket, $scope.flight).then(function(data) {
      flight_id = data.flight_id;
      $location.path('/flights/pre-flight/' + flight_id);
    });
  };

  $scope.rocketItemSelected = function(rocket) {
    $scope.rocket = rocket;
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
    $scope.rocket.rocket_data.motors[success['stage-index']][success['motor-index']]['motor'] = success['motor'];
    $scope.rocket.rocket_data.motors[success['stage-index']][success['motor-index']]['delay'] = success['delay'];
  };

}]);