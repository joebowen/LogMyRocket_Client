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

  function closeMotorChooserDialog(success) {
    if (motorChooserDialog) {
      motorChooserDialog.close(success);
    }
  };

  function onMotorChooserDialogClose(success) {
    motorChooserDialog = null;
    if ('motor' in success) {
      Users.addMotor(success['motor']);
      Users.getMotors().then(function(motors) {
        $scope.motors = motors.data;
      });
    }
  };

  $scope.finish = function() {
    $location.path('/');
  };
}]);