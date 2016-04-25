angular.module('addRocket', ['resources.rockets'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/rockets/add-rocket', {
    templateUrl:'addRocket/list.tpl.html',
    controller:'AddRocketCtrl'
  });
}])

.controller('AddRocketCtrl', ['$scope', 'Rockets', function($scope, Rockets){
  $scope.submit = function() {
    Rockets.addRocket($scope.rocket)
  };
}]);