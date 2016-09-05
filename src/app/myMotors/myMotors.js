angular.module('myMotors', ['resources.users', 'myMotors.motor_chooser_form'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/my-motors', {
    templateUrl:'myMotors/list.tpl.html',
    controller:'MyMotorsCtrl'
  });
}])

.controller('MyMotorsCtrl', ['$scope', 'Users', '$location', '$uibModal', function($scope, Users, $location, $uibModal){
  Users.getMotors().then(function(motors) {
    $scope.motors = motors.data;
  });

  var motorChooserDialog = null;
  $scope.openMotorChooser = function() {
    if ( motorChooserDialog ) {
      throw new Error('Trying to open a dialog that is already open!');
    }
    motorChooserDialog = $uibModal.open({
      templateUrl: 'myMotors/motor_chooser_form.tpl.html',
      controller: 'UserMotorChooserFormController',
      resolve: {}
    });

    motorChooserDialog.result.then(onMotorChooserDialogClose);
  };

  $scope.addMotor = function(motor) {
    Users.addMotor(motor.motor);
    motor.count++;
  };

  $scope.delMotor = function(motor) {
    Users.delMotor(motor.motor['motor-id'] + '-' + motor.delay);
    motor.count--;
    if (motor.count <= 0) {
        delete $scope.motors[motor.motor['motor-id'] + '-' + motor.delay];
    }
  };

  function closeMotorChooserDialog(success) {
    if (motorChooserDialog) {
      motorChooserDialog.close(success);
    }
  };

  function onMotorChooserDialogClose(success) {
    motorChooserDialog = null;
    if ('motor' in success) {
      for (cnt = 0; cnt < success['count']; cnt++) {
        Users.addMotor(success['motor'], success['delay']);
      }
      Users.getMotors().then(function(motors) {
        $scope.motors = motors.data;
      });
    }
  };
}]);