angular.module('resources.rockets', []).factory('Rockets', ['$http', 'security', '$location', function ($http, security, $location) {
  var Rockets = {};

  Rockets.getAll = function(){
    return $http.get('https://logmyrocket.info/api/rockets', {
        withCredentials: true,
        headers: {
          'Authorization': 'Bearer ' + security.getToken()
        }
      })
  };

  Rockets.addRocket = function(rocket){
    return $http.post('https://logmyrocket.info/api/rockets',{
        'rocket_data': rocket
      },
      {
        withCredentials: true,
        headers: {
          'Authorization': 'Bearer ' + security.getToken(),
          'Content-Type': 'application/json'
        }
      })
      .then(function(response){
        $location.path('/rockets');
      });
  };

  Rockets.getRocket = function(rocket_id){
    return $http.get('https://logmyrocket.info/api/rockets/' + rocket_id, {
        withCredentials: true,
        headers: {
          'Authorization': 'Bearer ' + security.getToken(),
          'Content-Type': 'application/json'
        }
      })
      .then(function(response){
        return response.data;
      });
  };

  Rockets.updateRocket = function(rocket_id, rocket){
    return $http.put('https://logmyrocket.info/api/rockets/' + rocket_id,{
        'rocket_data': rocket
      },
      {
        withCredentials: true,
        headers: {
          'Authorization': 'Bearer ' + security.getToken(),
          'Content-Type': 'application/json'
        }
      })
      .then(function(response){
        return response.data;
      });
  };

  Rockets.deleteRocket = function(rocket_id){
    return $http.delete('https://logmyrocket.info/api/rockets/' + rocket_id, {
        withCredentials: true,
        headers: {
          'Authorization': 'Bearer ' + security.getToken()
        }
      })
      .then(function(response){
        return response.data;
      });
  };

  return Rockets;
}]);