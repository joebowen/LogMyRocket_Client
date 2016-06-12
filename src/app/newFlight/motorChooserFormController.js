angular.module('newFlight.motor_chooser_form', [])

.controller('MotorChooserFormController', ['$scope', 'Motors', '$uibModalInstance', 'stageIndex', 'motorIndex', 'motorDia', function($scope, Motors, $uibModalInstance, stageIndex, motorIndex, motorDia) {
  $scope.stageIndex = stageIndex;
  $scope.motorIndex = motorIndex;
  $scope.motorDia = motorDia;

  Motors.getMotorsByDiameter($scope.motorDia)
    .then(function(response){
      $scope.allMotors = response.data[Number($scope.motorDia).toFixed(1).toString()];
    });

  $scope.choose = function(){
    $uibModalInstance.close({
      "stage-index": $scope.stageIndex,
      "motor-index": $scope.motorIndex,
      "motor": JSON.parse($scope.data.multipleSelect)
    })
  }


}]);


