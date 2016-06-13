angular.module('resources.users', []).factory('Users', ['$http', 'security', '$location', function ($http, security, $location) {
  var Users = {};

  Users.createUser = function(user){
    return $http.post('https://logmyrocket.info/api/signup',
      user,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  };

  return Users;
}]);