angular.module('security.signup.form', ['resources.users'])

.controller('SignupFormController', ['$scope', 'Users', '$uibModalInstance', function($scope, Users, uibModalInstance) {
  // The model for this form 
  $scope.user = {};

  $scope.signup = function() {
    Users.createUser(this.user).then(function(response){
      uibModalInstance.close();
    });
  };

  $scope.clearForm = function() {
    $scope.user = {};
  };

  $scope.cancelSignup = function() {
    uibModalInstance.close();
  };
}]);
