angular.module('addRocket', ['resources.rockets'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/rockets/add-rocket', {
    templateUrl:'addRocket/list.tpl.html',
    controller:'AddRocketCtrl'
  });
}])

.controller('AddRocketCtrl', ['$scope', 'Rockets', function($scope, Rockets){
  $scope.recoveries = ['Parachute', 'Streamer', 'Tumble', 'Helicopter', 'Dual-Parachute'];
  $scope.rods = ['1/8"', '3/16"', '1/4"', 'T1010 (rail)'];
  $scope.motorSizes = ['13', '18', '24', '29', '38', '54'];
  $scope.clusterSizes = _.range(1,35);

  $scope.rocket = {};

  $scope.rocket.preflight = [];
  $scope.rocket.motors = [];
  $scope.rocket.motors.push({'diameter': $scope.motorSizes[0]});

  $scope.rocket.recovery = $scope.recoveries[0];
  $scope.rocket.rod = $scope.rods[0];

  $scope.recoveryItemSelected = function (item) {
    $scope.rocket.recovery = item;
  };

  $scope.rodItemSelected = function (item) {
    $scope.rocket.rod = item;
  };

  $scope.submit = function() {
    Rockets.addRocket($scope.rocket);
  };

  $scope.addPreFlightRow = function() {
    $scope.rocket.preflight.push("");
  };

  $scope.addStage = function() {
    $scope.rocket.motors.push({'diameter': $scope.motorSizes[0]});
  };

  $scope.clusterSizeSelected = function(stageIndex, size) {
    $scope.rocket.motors[stageIndex] = new Array(size);
  };

  $scope.addMotorSizeToStage = function(stageIndex, motorIndex, diameter) {
    $scope.rocket.motors[stageIndex][motorIndex]['diameter'] = diameter;
  };
}]);