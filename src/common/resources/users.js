angular.module('resources.users', []).factory('Users', ['$http', 'security', '$location', function ($http, security, $location) {
  var Users = {};

  Users.createUser = function(user){
    return $http.post('https://ctxsjudlq1.execute-api.us-east-1.amazonaws.com/dev/signup',
      user,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  };

  Users.updateSettings = function(settings){
    return $http.put('https://ctxsjudlq1.execute-api.us-east-1.amazonaws.com/dev/settings',
      {
        'settings': settings,
      },
      {
        headers: {
          'Authorization': 'Bearer ' + security.getToken(),
          'Content-Type': 'application/json'
        }
      });
  };

  Users.getSettings = function(){
    return $http.get('https://ctxsjudlq1.execute-api.us-east-1.amazonaws.com/dev/settings',
      {
        headers: {
          'Authorization': 'Bearer ' + security.getToken(),
          'Content-Type': 'application/json'
        }
      });
  };

  return Users;
}]);