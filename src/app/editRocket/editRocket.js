angular.module('editRocket', ['resources.rockets'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/rockets/edit-rocket/:rocket_id/', {
    templateUrl:'editRocket/list.tpl.html',
    controller:'EditRocketCtrl'
  });
}])

.controller('EditRocketCtrl', ['$scope', 'Rockets', '$routeParams', '$location', function($scope, Rockets, $routeParams, $location){
  $scope.recoveries = ['Parachute', 'Streamer', 'Tumble', 'Helicopter', 'Dual-Parachute'];
  $scope.rods = ['1/8"', '3/16"', '1/4"', 'T1010 (rail)'];
  $scope.motorSizes = ['13', '18', '24', '29', '38', '54'];
  $scope.clusterSizes = _.range(1,35);

  Rockets.getRocket($routeParams.rocket_id).then(function(rocket) {
    $scope.rocket = rocket.rocket_data;
  });

  $scope.recoveryItemSelected = function (item) {
    $scope.rocket.recovery = item;
  };

  $scope.rodItemSelected = function (item) {
    $scope.rocket.rod = item;
  };

  $scope.submit = function() {
    Rockets.updateRocket($routeParams.rocket_id, $scope.rocket);
    $location.path('/');
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
    if($scope.rocket.motors[stageIndex][motorIndex] === undefined) {
      $scope.rocket.motors[stageIndex][motorIndex] = {};
    }
    $scope.rocket.motors[stageIndex][motorIndex]['diameter'] = diameter;
  };
}]);