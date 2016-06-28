angular.module('resources.motors', []).factory('Motors', ['$http', 'security', '$location', function ($http, security, $location) {
  var Motors = {};

  Motors.getMotorsByDiameter = function(diameter){
    return $http.get('https://ctxsjudlq1.execute-api.us-east-1.amazonaws.com/dev/motors/diameter/' + diameter, {
        withCredentials: true,
        headers: {
          'Authorization': 'Bearer ' + security.getToken()
        }
      });
  };

  Motors.getAll = function(){
    return $http.get('https://ctxsjudlq1.execute-api.us-east-1.amazonaws.com/dev/motors', {
        withCredentials: true,
        headers: {
          'Authorization': 'Bearer ' + security.getToken()
        }
      });
  };

  Motors.getMotor = function(motor_id){
    return $http.get('https://ctxsjudlq1.execute-api.us-east-1.amazonaws.com/dev/motors/' + motor_id, {
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