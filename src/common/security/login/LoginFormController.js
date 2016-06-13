angular.module('security.login.form', ['services.localizedMessages', 'security.signup.form'])

// The LoginFormController provides the behaviour behind a reusable form to allow users to authenticate.
// This controller and its template (login/form.tpl.html) are used in a modal dialog box by the security service.
.controller('LoginFormController', ['$scope', 'security', 'localizedMessages', '$uibModal', function($scope, security, localizedMessages, $uibModal) {
  // The model for this form 
  $scope.user = {};

  // Any error message from failing to login
  $scope.authError = null;

  // The reason that we are being asked to login - for instance because we tried to access something to which we are not authorized
  // We could do something diffent for each reason here but to keep it simple...
  $scope.authReason = null;
  if ( security.getLoginReason() ) {
    $scope.authReason = ( security.isAuthenticated() ) ?
      localizedMessages.get('login.reason.notAuthorized') :
      localizedMessages.get('login.reason.notAuthenticated');
  }

  // Attempt to authenticate the user specified in the form's model
  $scope.login = function() {
    // Clear any previous security errors
    $scope.authError = null;

    // Try to login
    security.login($scope.user.username, $scope.user.password).then(function(loggedIn) {
      if ( !loggedIn ) {
        // If we get here then the login failed due to bad credentials
        $scope.authError = localizedMessages.get('login.error.invalidCredentials');
      }
    }, function(x) {
      // If we get here then there was a problem with the login request to the server
      $scope.authError = localizedMessages.get('login.error.serverError', { exception: x });
    });
  };

  $scope.clearForm = function() {
    $scope.user = {};
  };

  $scope.cancelLogin = function() {
    security.cancelLogin();
  };

  // Signup form dialog stuff
  var signupDialog = null;
  function openSignupDialog() {
    if ( signupDialog ) {
      throw new Error('Trying to open a dialog that is already open!');
    }
    signupDialog = $uibModal.open({
      templateUrl: 'security/login/signup.tpl.html',
      controller: 'SignupFormController'
    });

    signupDialog.result.then(onSignupDialogClose);
  }
  function closeSignupDialog(success) {
    if (signupDialog) {
      signupDialog.close(success);
    }
  }
  function onSignupDialogClose(success) {
    signupDialog = null;
  }

  // Show the modal sign-up dialog
  $scope.showSignup = function() {
    openSignupDialog();
  };
}]);
