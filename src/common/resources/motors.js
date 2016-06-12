angular.module('resources.motors', []).factory('Motors', ['$http', 'security', '$location', function ($http, security, $location) {
  var Motors = {};

  Motors.getMotorsByDiameter = function(diameter){
    return $http.get('https://logmyrocket.info/api/motors/diameter/' + diameter, {
        withCredentials: true,
        headers: {
          'Authorization': 'Bearer ' + security.getToken()
        }
      });
  };

  Motors.getAll = function(){
    return $http.get('https://logmyrocket.info/api/motors', {
        withCredentials: true,
        headers: {
          'Authorization': 'Bearer ' + security.getToken()
        }
      });
  };

  Motors.getMotor = function(motor_id){
    return $http.get('https://logmyrocket.info/api/motors/' + motor_id, {
        withCredentials: true,
        headers: {
          'Authorization': 'Bearer ' + security.getToken()
        }
      })
      .then(function(response){
        return response.data;
      });
  };

  return Motors;
}]);