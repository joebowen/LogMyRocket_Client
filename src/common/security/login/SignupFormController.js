angular.module('security.signup.form', ['resources.users'])

.controller('SignupFormController', ['$scope', 'Users', '$modalInstance', function($scope, Users, modalInstance) {
  // The model for this form 
  $scope.user = {};

  $scope.signup = function() {
    Users.createUser(this.user).then(function(response){
      modalInstance.close();
    });
  };

  $scope.clearForm = function() {
    $scope.user = {};
  };

  $scope.cancelSignup = function() {
    modalInstance.close();
  };
}]);
