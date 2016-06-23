angular.module('settings', ['resources.rockets'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/settings', {
    templateUrl:'settings/list.tpl.html',
    controller:'SettingsCtrl'
  });
}])

.controller('SettingsCtrl', ['$scope', 'Users', '$location', function($scope, Users, $location){
  Users.getSettings().then(function(user) {
    $scope.user = user.data;
  });

  $scope.submit = function() {
    Users.updateSettings($scope.user);
    $location.path('/');
  };
}]);