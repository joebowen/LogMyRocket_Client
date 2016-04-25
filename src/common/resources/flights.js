angular.module('resources.flights', []).factory('Flights', ['$http', 'security', function ($http, security) {
  var Flights = {};

  Flights.getAll = function(){
    return $http.get('https://logmyrocket.info/api/flights', {
        withCredentials: true,
        headers: {
          'Authorization': 'Bearer ' + security.getToken()
        }
      })
      .then(function(response){
        return response.data;
      });
  };

  Flights.newFlight = function(rocket_id, flight, motor){
    return $http.post('https://logmyrocket.info/api/flights',{
        'rocket_id': rocket_id,
        'flight_data': flight,
        'motor_data': motor
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

  Flights.getFlight = function(flight_id){
    return $http.get('https://logmyrocket.info/api/flights/' + flight_id, {
        withCredentials: true,
        headers: {
          'Authorization': 'Bearer ' + security.getToken()
        }
      })
      .then(function(response){
        return response.data;
      });
  };

  Flights.updateFlight = function(flight_id, rocket_id, flight, motor){
    return $http.put('https://logmyrocket.info/api/flights/' + flight_id,{
        'rocket_id': rocket_id,
        'flight_data': flight,
        'motor_data': motor
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

  Flights.deleteFlight = function(flight_id){
    return $http.delete('https://logmyrocket.info/api/flights/' + flight_id, {
        withCredentials: true,
        headers: {
          'Authorization': 'Bearer ' + security.getToken()
        }
      })
      .then(function(response){
        return response.data;
      });
  };

  return Flights;
}]);