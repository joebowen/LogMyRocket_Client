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

  Users.updateSettings = function(settings){
    return $http.put('https://logmyrocket.info/api/settings',
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
    return $http.get('https://logmyrocket.info/api/settings',
      {
        headers: {
          'Authorization': 'Bearer ' + security.getToken(),
          'Content-Type': 'application/json'
        }
      });
  };

  return Users;
}]);