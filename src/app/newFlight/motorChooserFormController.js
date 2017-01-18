angular.module('newFlight.motor_chooser_form', ['resources.users'])

.controller('MotorChooserFormController', ['$scope', 'Users', '$uibModalInstance', 'stageIndex', 'motorIndex', 'motorDia', function($scope, Users, $uibModalInstance, stageIndex, motorIndex, motorDia) {
  $scope.stageIndex = stageIndex;
  $scope.motorIndex = motorIndex;
  $scope.motorDia = motorDia;

  Users.getMotors().then(function(response){
      $scope.motors = response.data;

      for (motor in $scope.motors) {
        if (Number($scope.motors[motor]['motor']['diameter']) !== Number($scope.motorDia)) {
          delete $scope.motors[motor];
        }
      }
    });

  $scope.choose = function(){
    $uibModalInstance.close({
      "stage-index": $scope.stageIndex,
      "motor-index": $scope.motorIndex,
      "motor": JSON.parse($scope.data.select)['motor'],
      "delay": JSON.parse($scope.data.select)['delay']
    });
  }
}]);


