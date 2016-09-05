angular.module('myMotors.motor_chooser_form', [])

.controller('UserMotorChooserFormController', ['$scope', 'Motors', '$uibModalInstance', function($scope, Motors, $uibModalInstance) {
  Motors.getAll()
    .then(function(response){
      $scope.allMotors = response.data;
      $scope.allDias = Object.keys($scope.allMotors);
    });

  var unique = function(xs) {
    return xs.filter(function(x, i) {
      return xs.indexOf(x) === i
    })
  };

  $scope.changeDia = function(){
    $scope.allMfg = [];
    $scope.motors = [];
    $scope.delays = [];
    for (tempMotor of $scope.allMotors[$scope.data.selectDia]) {
      $scope.allMfg.push(tempMotor['manufacturer']);
    }
    $scope.allMfg = unique($scope.allMfg);
  }

  $scope.changeMfg = function() {
    $scope.motors = [];
    $scope.delays = [];
    for (tempMotor of $scope.allMotors[$scope.data.selectDia]) {
      if (tempMotor['manufacturer'] === $scope.data.selectMfg) {
        $scope.motors.push(tempMotor);
      }
    }
  }

  $scope.changeMotor = function() {
    $scope.delays = JSON.parse($scope.data.selectMotor)['delays'].split(",")
  }

  $scope.choose = function(){
    $uibModalInstance.close({
      "motor": JSON.parse($scope.data.selectMotor),
      "delay": $scope.data.selectMotorDelay,
      "count": $scope.data.motorCnt
    })
  };

  $scope.cancel = function() {
    $uibModalInstance.close({});
  };
}]);


