angular.module('resources.flights', []).factory('Flights', ['$http', 'security', '$location', function ($http, security, $location) {
  var Flights = {};

  Flights.getAll = function(){
    return $http.get('https://ctxsjudlq1.execute-api.us-east-1.amazonaws.com/dev/flights', {
        withCredentials: true,
        headers: {
          'Authorization': 'Bearer ' + security.getToken()
        }
      })
      .then(function(response){
        if (response.status === 200) {
          return response.data;
        }
        else {
          security.showLogin();
        }
      });
  };

  Flights.newFlight = function(rocket, flight){
    return $http.post('https://ctxsjudlq1.execute-api.us-east-1.amazonaws.com/dev/flights',{
        'rocket_data': rocket,
        'flight_data': flight
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
    return $http.get('https://ctxsjudlq1.execute-api.us-east-1.amazonaws.com/dev/flights/' + flight_id, {
        withCredentials: true,
        headers: {
          'Authorization': 'Bearer ' + security.getToken()
        }
      })
      .then(function(response){
        return response.data;
      });
  };

  Flights.updateFlight = function(flight_id, flight_data){
    return $http.put('https://ctxsjudlq1.execute-api.us-east-1.amazonaws.com/dev/flights/' + flight_id,{
        'flight_data': flight_data,
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
    return $http.delete('https://ctxsjudlq1.execute-api.us-east-1.amazonaws.com/dev/flights/' + flight_id, {
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