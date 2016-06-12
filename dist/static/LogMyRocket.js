/*! LogMyRocket - v0.0.1-SNAPSHOT - 2016-05-14
 * https://github.com/joebowen/LogMyRocket_Client
 * Copyright (c) 2016 Joe Bowen;
 * Licensed MIT
 */
angular.module('addRocket', ['resources.rockets'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/rockets/add-rocket', {
    templateUrl:'addRocket/list.tpl.html',
    controller:'AddRocketCtrl'
  });
}])

.controller('AddRocketCtrl', ['$scope', 'Rockets', function($scope, Rockets){
  $scope.recoveries = ['Parachute', 'Streamer', 'Tumble', 'Helicopter', 'Dual-Parachute'];
  $scope.rods = ['1/8"', '3/16"', '1/4"', 'T1010 (rail)'];
  $scope.motorSizes = ['13', '18', '24', '29', '38', '54'];
  $scope.clusterSizes = _.range(1,35);

  $scope.rocket = {};

  $scope.rocket.preflight = [];
  $scope.rocket.motors = [];
  $scope.rocket.motors.push({'diameter': $scope.motorSizes[0]});

  $scope.rocket.recovery = $scope.recoveries[0];
  $scope.rocket.rod = $scope.rods[0];

  $scope.recoveryItemSelected = function (item) {
    $scope.rocket.recovery = item;
  };

  $scope.rodItemSelected = function (item) {
    $scope.rocket.rod = item;
  };

  $scope.submit = function() {
    Rockets.addRocket($scope.rocket);
  };

  $scope.addPreFlightRow = function() {
    $scope.rocket.preflight.push("");
  };

  $scope.addStage = function() {
    $scope.rocket.motors.push({'diameter': $scope.motorSizes[0]});
  };

  $scope.clusterSizeSelected = function(stageIndex, size) {
    $scope.rocket.motors[stageIndex] = new Array(size);
  };

  $scope.addMotorSizeToStage = function(stageIndex, motorIndex, diameter) {
    $scope.rocket.motors[stageIndex][motorIndex]['diameter'] = diameter;
  };
}]);
angular.module('app', [
  'ngRoute',
  'ngAnimate',
  'newFlight',
  'addRocket',
  'flights',
  'rockets',
  'services.breadcrumbs',
  'services.i18nNotifications',
  'services.httpRequestTracker',
  'security',
  'templates.app',
  'templates.common',
  'ui.bootstrap']);

//TODO: move those messages to a separate module
angular.module('app').constant('I18N.MESSAGES', {
  'errors.route.changeError':'Route change error',
  'crud.user.save.success':"A user with id '{{id}}' was saved successfully.",
  'crud.user.remove.success':"A user with id '{{id}}' was removed successfully.",
  'crud.user.remove.error':"Something went wrong when removing user with id '{{id}}'.",
  'crud.user.save.error':"Something went wrong when saving a user...",
  'crud.project.save.success':"A project with id '{{id}}' was saved successfully.",
  'crud.project.remove.success':"A project with id '{{id}}' was removed successfully.",
  'crud.project.save.error':"Something went wrong when saving a project...",
  'login.reason.notAuthorized':"You do not have the necessary access permissions.  Do you want to login as someone else?",
  'login.reason.notAuthenticated':"You must be logged in to access this part of the application.",
  'login.error.invalidCredentials': "Login failed.  Please check your credentials and try again.",
  'login.error.serverError': "There was a problem with authenticating: {{exception}}."
});

angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.otherwise({redirectTo:'/rockets'});
}]);

angular.module('app').run(['$route', function() {}]);

angular.module('app').run(['security', function(security) {
  // Get the current user when the application starts
  // (in case they are still logged in from a previous session)
  security.requestCurrentUser();
}]);

angular.module('app').controller('AppCtrl', ['$scope', 'i18nNotifications', 'localizedMessages', function($scope, i18nNotifications, localizedMessages) {

  $scope.notifications = i18nNotifications;

  $scope.removeNotification = function (notification) {
    i18nNotifications.remove(notification);
  };

  $scope.$on('$routeChangeError', function(event, current, previous, rejection){
    i18nNotifications.pushForCurrentRoute('errors.route.changeError', 'error', {}, {rejection: rejection});
  });
}]);

angular.module('app').controller('HeaderCtrl', ['$scope', '$location', '$route', 'security', 'breadcrumbs', 'notifications', 'httpRequestTracker',
  function ($scope, $location, $route, security, breadcrumbs, notifications, httpRequestTracker) {
  $scope.location = $location;
  $scope.breadcrumbs = breadcrumbs;

  $scope.isAuthenticated = security.isAuthenticated;
  $scope.isAdmin = security.isAdmin;

  $scope.home = function () {
    if (security.isAuthenticated()) {
      $location.path('/');
    }
    else {
      security.showLogin();
    }
  };

  $scope.isNavbarActive = function (navBarPath) {
    return navBarPath === breadcrumbs.getFirst().name;
  };

  $scope.hasPendingRequests = function () {
    return httpRequestTracker.hasPendingRequests();
  };
}]);
angular.module('flights', ['resources.flights'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/flights', {
    templateUrl:'flights/list.tpl.html',
    controller:'FlightsListCtrl',
    resolve:{
      flights:['Flights', function(Flights){
        return Flights.getAll();
      }]
    }
  });
}])

.controller('FlightsListCtrl', ['$scope', 'flights', function($scope, flights){
  $scope.flights = flights;
}]);
angular.module('newFlight.motor_chooser_form', [])

.controller('MotorChooserFormController', ['$scope', 'Motors', '$uibModalInstance', 'stageIndex', 'motorIndex', 'motorDia', function($scope, Motors, $uibModalInstance, stageIndex, motorIndex, motorDia) {
  $scope.stageIndex = stageIndex;
  $scope.motorIndex = motorIndex;
  $scope.motorDia = motorDia;

  Motors.getMotorsByDiameter($scope.motorDia)
    .then(function(response){
      $scope.allMotors = response.data[Number($scope.motorDia).toFixed(1).toString()];
    });

  $scope.choose = function(){
    $uibModalInstance.close({
      "stage-index": $scope.stageIndex,
      "motor-index": $scope.motorIndex,
      "motor": JSON.parse($scope.data.multipleSelect)
    })
  }


}]);



angular.module('newFlight', ['resources.flights', 'resources.motors', 'newFlight.motor_chooser_form'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/flights/new-flight', {
    templateUrl:'newFlight/list.tpl.html',
    controller:'NewFlightCtrl'
  });
}])

.controller('NewFlightCtrl', ['$scope', 'Flights', 'Rockets', '$uibModal', function($scope, Flights, Rockets, $uibModal){
  $scope.flight = {};

  Rockets.getAll()
    .then(function(response){
      $scope.rockets = response.data;
      $scope.rocket = $scope.rockets[0];
      $scope.motor_spec = $scope.rocket.rocket_data.motors;
    });

  $scope.submit = function() {
    $scope.flight.create = Date.now();
    Flights.newFlight($scope.rocket, $scope.flight, $scope.motor);
  };

  $scope.rocketItemSelected = function(rocket) {
    $scope.rocket = rocket;
    $scope.motor_spec = rocket.rocket_data.motors;
  };

  var motorChooserDialog = null;
  $scope.openMotorChooser = function(stageIndex, motorIndex, motorDia) {
    if ( motorChooserDialog ) {
      throw new Error('Trying to open a dialog that is already open!');
    }
    motorChooserDialog = $uibModal.open({
      templateUrl: 'newFlight/motor_chooser_form.tpl.html',
      controller: 'MotorChooserFormController',
      resolve: {
        stageIndex: function () { return stageIndex },
        motorIndex: function () { return motorIndex },
        motorDia:function () {  return motorDia }
      }
    });

    motorChooserDialog.result.then(onMotorChooserDialogClose);
  };

  function closeMotorChooserDialog(success) {
    if (motorChooserDialog) {
      motorChooserDialog.close(success);
    }
  };

  function onMotorChooserDialogClose(success) {
    motorChooserDialog = null;
    $scope.motor_spec[success['stage-index']][success['motor-index']]['motor'] = success['motor'];
    debugger;
  };

}]);
angular.module('rockets', ['resources.rockets'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/rockets', {
    templateUrl:'rockets/list.tpl.html',
    controller:'RocketsListCtrl',
    resolve:{
      rockets:['Rockets', function(Rockets){
        return Rockets.getAll().then(function(response){
          return response.data;
        });
      }]
    }
  });
}])

.controller('RocketsListCtrl', ['$scope', 'rockets', function($scope, rockets){
  $scope.rockets = rockets;
}]);
angular.module('resources.flights', []).factory('Flights', ['$http', 'security', '$location', function ($http, security, $location) {
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

  Flights.newFlight = function(rocket, flight, motor){
    return $http.post('https://logmyrocket.info/api/flights',{
        'rocket_data': rocket,
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
        $location.path('/flights');
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
angular.module('resources.rockets', []).factory('Rockets', ['$http', 'security', '$location', function ($http, security, $location) {
  var Rockets = {};

  Rockets.getAll = function(){
    return $http.get('https://logmyrocket.info/api/rockets', {
        withCredentials: true,
        headers: {
          'Authorization': 'Bearer ' + security.getToken()
        }
      });
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
          'Authorization': 'Bearer ' + security.getToken()
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
angular.module('security.authorization', ['security.service'])

// This service provides guard methods to support AngularJS routes.
// You can add them as resolves to routes to require authorization levels
// before allowing a route change to complete
.provider('securityAuthorization', {

  requireAdminUser: ['securityAuthorization', function(securityAuthorization) {
    return securityAuthorization.requireAdminUser();
  }],

  requireAuthenticatedUser: ['securityAuthorization', function(securityAuthorization) {
    return securityAuthorization.requireAuthenticatedUser();
  }],

  $get: ['security', 'securityRetryQueue', function(security, queue) {
    var service = {

      // Require that there is an authenticated user
      // (use this in a route resolve to prevent non-authenticated users from entering that route)
      requireAuthenticatedUser: function() {
        var promise = security.requestCurrentUser().then(function(userInfo) {
          if ( !security.isAuthenticated() ) {
            return queue.pushRetryFn('unauthenticated-client', service.requireAuthenticatedUser);
          }
        });
        return promise;
      },

      // Require that there is an administrator logged in
      // (use this in a route resolve to prevent non-administrators from entering that route)
      requireAdminUser: function() {
        var promise = security.requestCurrentUser().then(function(userInfo) {
          if ( !security.isAdmin() ) {
            return queue.pushRetryFn('unauthorized-client', service.requireAdminUser);
          }
        });
        return promise;
      }

    };

    return service;
  }]
});
// Based loosely around work by Witold Szczerba - https://github.com/witoldsz/angular-http-auth
angular.module('security', [
  'security.service',
  'security.interceptor',
  'security.login',
  'security.authorization']);

angular.module('security.interceptor', ['security.retryQueue'])

// This http interceptor listens for authentication failures
.factory('securityInterceptor', ['$injector', 'securityRetryQueue', function($injector, queue) {
  return function(promise) {
    // Intercept failed requests
    return promise.then(null, function(originalResponse) {
      if(originalResponse.status === 401) {
        // The request bounced because it was not authorized - add a new request to the retry queue
        promise = queue.pushRetryFn('unauthorized-server', function retryRequest() {
          // We must use $injector to get the $http service to prevent circular dependency
          return $injector.get('$http')(originalResponse.config);
        });
      }
      return promise;
    });
  };
}])

// We have to add the interceptor to the queue as a string because the interceptor depends upon service instances that are not available in the config block.
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('securityInterceptor');
}]);
angular.module('security.login.form', ['services.localizedMessages'])

// The LoginFormController provides the behaviour behind a reusable form to allow users to authenticate.
// This controller and its template (login/form.tpl.html) are used in a modal dialog box by the security service.
.controller('LoginFormController', ['$scope', 'security', 'localizedMessages', function($scope, security, localizedMessages) {
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
}]);

angular.module('security.login', ['security.login.form', 'security.login.toolbar']);
angular.module('security.login.toolbar', [])

// The loginToolbar directive is a reusable widget that can show login or logout buttons
// and information the current authenticated user
.directive('loginToolbar', ['security', function(security) {
  var directive = {
    templateUrl: 'security/login/toolbar.tpl.html',
    restrict: 'E',
    replace: true,
    scope: true,
    link: function($scope, $element, $attrs, $controller) {
      $scope.isAuthenticated = security.isAuthenticated;
      $scope.login = security.showLogin;
      $scope.logout = security.logout;
      $scope.$watch(function() {
        return security.currentUser;
      }, function(currentUser) {
        $scope.currentUser = currentUser;
      });
    }
  };
  return directive;
}]);
angular.module('security.retryQueue', [])

// This is a generic retry queue for security failures.  Each item is expected to expose two functions: retry and cancel.
.factory('securityRetryQueue', ['$q', '$log', function($q, $log) {
  var retryQueue = [];
  var service = {
    // The security service puts its own handler in here!
    onItemAddedCallbacks: [],
    
    hasMore: function() {
      return retryQueue.length > 0;
    },
    push: function(retryItem) {
      retryQueue.push(retryItem);
      // Call all the onItemAdded callbacks
      angular.forEach(service.onItemAddedCallbacks, function(cb) {
        try {
          cb(retryItem);
        } catch(e) {
          $log.error('securityRetryQueue.push(retryItem): callback threw an error' + e);
        }
      });
    },
    pushRetryFn: function(reason, retryFn) {
      // The reason parameter is optional
      if ( arguments.length === 1) {
        retryFn = reason;
        reason = undefined;
      }

      // The deferred object that will be resolved or rejected by calling retry or cancel
      var deferred = $q.defer();
      var retryItem = {
        reason: reason,
        retry: function() {
          // Wrap the result of the retryFn into a promise if it is not already
          $q.when(retryFn()).then(function(value) {
            // If it was successful then resolve our deferred
            deferred.resolve(value);
          }, function(value) {
            // Othewise reject it
            deferred.reject(value);
          });
        },
        cancel: function() {
          // Give up on retrying and reject our deferred
          deferred.reject();
        }
      };
      service.push(retryItem);
      return deferred.promise;
    },
    retryReason: function() {
      return service.hasMore() && retryQueue[0].reason;
    },
    cancelAll: function() {
      while(service.hasMore()) {
        retryQueue.shift().cancel();
      }
    },
    retryAll: function() {
      while(service.hasMore()) {
        retryQueue.shift().retry();
      }
    }
  };
  return service;
}]);

// Based loosely around work by Witold Szczerba - https://github.com/witoldsz/angular-http-auth
angular.module('security.service', [
  'security.retryQueue',    // Keeps track of failed requests that need to be retried once the user logs in
  'security.login',         // Contains the login form template and controller
  'ui.bootstrap'
])

.factory('security', ['$http', '$q', '$location', 'securityRetryQueue', '$uibModal', '$window', function($http, $q, $location, queue, $uibModal, $window) {

  // Redirect to the given url (defaults to '/')
  function redirect(url) {
    url = url || '/';
    $location.path(url);
  }

  // Login form dialog stuff
  var loginDialog = null;
  function openLoginDialog() {
    if ( loginDialog ) {
      throw new Error('Trying to open a dialog that is already open!');
    }
    loginDialog = $uibModal.open({
      templateUrl: 'security/login/form.tpl.html',
      controller: 'LoginFormController'
    });

    loginDialog.result.then(onLoginDialogClose);
  }
  function closeLoginDialog(success) {
    if (loginDialog) {
      loginDialog.close(success);
    }
  }
  function onLoginDialogClose(success) {
    loginDialog = null;
    if ( success ) {
      queue.retryAll();
    } else {
      queue.cancelAll();
      redirect();
    }
  }

  // Register a handler for when an item is added to the retry queue
  queue.onItemAddedCallbacks.push(function(retryItem) {
    if ( queue.hasMore() ) {
      service.showLogin();
    }
  });

  // The public API of the service
  var service = {

    // Get the first reason for needing a login
    getLoginReason: function() {
      return queue.retryReason();
    },

    // Show the modal login dialog
    showLogin: function() {
      openLoginDialog();
    },

    // Attempt to authenticate a user by the given username and password
    login: function(username, password) {
      var request = $http.post('https://logmyrocket.info/api/login?', {'username': username, 'password': password});
      return request.then(function(response) {
        service.currentUser = response.data;
        $window.localStorage['jwtToken'] = response.data.token;
        if ( service.isAuthenticated() ) {
          closeLoginDialog(true);
        }
        return service.isAuthenticated();
      });
    },

    // Give up trying to login and clear the retry queue
    cancelLogin: function() {
      closeLoginDialog(false);
      redirect();
    },

    // Logout the current user and redirect
    logout: function(redirectTo) {
      currentUser: null;
      $window.localStorage.removeItem('jwtToken');
      service.showLogin();
    },

    // Ask the backend to see if a user is already authenticated - this may be from a previous session.
    requestCurrentUser: function() {
      if ( service.isAuthenticated() ) {
        return $q.when(service.currentUser);
      } else {
        service.showLogin();
      }
    },

    // Information about the current user
    currentUser: null,

    // Is the current user authenticated?
    isAuthenticated: function(){
      var token = service.getToken();
      if(token) {
        var params = service.parseJwt(token);
        return Math.round(new Date().getTime() / 1000) <= params.exp;
      } else {
        return false;
      }
    },

    parseJwt: function(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse($window.atob(base64));
    },
    
    // Is the current user an adminstrator?
    isAdmin: function() {
      return !!(service.currentUser && service.currentUser.admin);
    },

    getToken: function() {
      return $window.localStorage['jwtToken'];
    }
  };

  return service;
}]);

angular.module('services.breadcrumbs', []);
angular.module('services.breadcrumbs').factory('breadcrumbs', ['$rootScope', '$location', function($rootScope, $location){

  var breadcrumbs = [];
  var breadcrumbsService = {};

  //we want to update breadcrumbs only when a route is actually changed
  //as $location.path() will get updated imediatelly (even if route change fails!)
  $rootScope.$on('$routeChangeSuccess', function(event, current){

    var pathElements = $location.path().split('/'), result = [], i;
    var breadcrumbPath = function (index) {
      return '/' + (pathElements.slice(0, index + 1)).join('/');
    };

    pathElements.shift();
    for (i=0; i<pathElements.length; i++) {
      result.push({name: pathElements[i], path: breadcrumbPath(i)});
    }

    breadcrumbs = result;
  });

  breadcrumbsService.getAll = function() {
    return breadcrumbs;
  };

  breadcrumbsService.getFirst = function() {
    return breadcrumbs[0] || {};
  };

  return breadcrumbsService;
}]);
angular.module('services.crud', ['services.crudRouteProvider']);
angular.module('services.crud').factory('crudEditMethods', function () {

  return function (itemName, item, formName, successcb, errorcb) {

    var mixin = {};

    mixin[itemName] = item;
    mixin[itemName+'Copy'] = angular.copy(item);

    mixin.save = function () {
      this[itemName].$saveOrUpdate(successcb, successcb, errorcb, errorcb);
    };

    mixin.canSave = function () {
      return this[formName].$valid && !angular.equals(this[itemName], this[itemName+'Copy']);
    };

    mixin.revertChanges = function () {
      this[itemName] = angular.copy(this[itemName+'Copy']);
    };

    mixin.canRevert = function () {
      return !angular.equals(this[itemName], this[itemName+'Copy']);
    };

    mixin.remove = function () {
      if (this[itemName].$id()) {
        this[itemName].$remove(successcb, errorcb);
      } else {
        successcb();
      }
    };

    mixin.canRemove = function() {
      return item.$id();
    };

    /**
     * Get the CSS classes for this item, to be used by the ng-class directive
     * @param {string} fieldName The name of the field on the form, for which we want to get the CSS classes
     * @return {object} A hash where each key is a CSS class and the corresponding value is true if the class is to be applied.
     */
    mixin.getCssClasses = function(fieldName) {
      var ngModelController = this[formName][fieldName];
      return {
        error: ngModelController.$invalid && ngModelController.$dirty,
        success: ngModelController.$valid && ngModelController.$dirty
      };
    };

    /**
     * Whether to show an error message for the specified error
     * @param {string} fieldName The name of the field on the form, of which we want to know whether to show the error
     * @param  {string} error - The name of the error as given by a validation directive
     * @return {Boolean} true if the error should be shown
     */
    mixin.showError = function(fieldName, error) {
      return this[formName][fieldName].$error[error];
    };

    return mixin;
  };
});

angular.module('services.crud').factory('crudListMethods', ['$location', function ($location) {

  return function (pathPrefix) {

    var mixin = {};

    mixin['new'] = function () {
      $location.path(pathPrefix+'/new');
    };

    mixin['edit'] = function (itemId) {
      $location.path(pathPrefix+'/'+itemId);
    };

    return mixin;
  };
}]);
(function() {

  function crudRouteProvider($routeProvider) {

    // This $get noop is because at the moment in AngularJS "providers" must provide something
    // via a $get method.
    // When AngularJS has "provider helpers" then this will go away!
    this.$get = angular.noop;

    // Again, if AngularJS had "provider helpers" we might be able to return `routesFor()` as the
    // crudRouteProvider itself.  Then we would have a much cleaner syntax and not have to do stuff
    // like:
    //
    // ```
    // myMod.config(function(crudRouteProvider) {
    //   var routeProvider = crudRouteProvider.routesFor('MyBook', '/myApp');
    // });
    // ```
    //
    // but instead have something like:
    //
    //
    // ```
    // myMod.config(function(crudRouteProvider) {
    //   var routeProvider = crudRouteProvider('MyBook', '/myApp');
    // });
    // ```
    //
    // In any case, the point is that this function is the key part of this "provider helper".
    // We use it to create routes for CRUD operations.  We give it some basic information about
    // the resource and the urls then it it returns our own special routeProvider.
    this.routesFor = function(resourceName, urlPrefix, routePrefix) {
      var baseUrl = resourceName.toLowerCase();
      var baseRoute = '/' + resourceName.toLowerCase();
      routePrefix = routePrefix || urlPrefix;

      // Prepend the urlPrefix if available.
      if ( angular.isString(urlPrefix) && urlPrefix !== '' ) {
        baseUrl = urlPrefix + '/' + baseUrl;
      }

      // Prepend the routePrefix if it was provided;
      if (routePrefix !== null && routePrefix !== undefined && routePrefix !== '') {
        baseRoute = '/' + routePrefix + baseRoute;
      }

      // Create the templateUrl for a route to our resource that does the specified operation.
      var templateUrl = function(operation) {
        return baseUrl + '/' + resourceName.toLowerCase() +'-'+operation.toLowerCase()+'.tpl.html';
      };
      // Create the controller name for a route to our resource that does the specified operation.
      var controllerName = function(operation) {
        return resourceName + operation +'Ctrl';
      };

      // This is the object that our `routesFor()` function returns.  It decorates `$routeProvider`,
      // delegating the `when()` and `otherwise()` functions but also exposing some new functions for
      // creating CRUD routes.  Specifically we have `whenList(), `whenNew()` and `whenEdit()`.
      var routeBuilder = {
        // Create a route that will handle showing a list of items
        whenList: function(resolveFns) {
          routeBuilder.when(baseRoute, {
            templateUrl: templateUrl('List'),
            controller: controllerName('List'),
            resolve: resolveFns
          });
          return routeBuilder;
        },
        // Create a route that will handle creating a new item
        whenNew: function(resolveFns) {
          routeBuilder.when(baseRoute +'/new', {
            templateUrl: templateUrl('Edit'),
            controller: controllerName('Edit'),
            resolve: resolveFns
          });
          return routeBuilder;
        },
        // Create a route that will handle editing an existing item
        whenEdit: function(resolveFns) {
          routeBuilder.when(baseRoute+'/:itemId', {
            templateUrl: templateUrl('Edit'),
            controller: controllerName('Edit'),
            resolve: resolveFns
          });
          return routeBuilder;
        },
        // Pass-through to `$routeProvider.when()`
        when: function(path, route) {
          $routeProvider.when(path, route);
          return routeBuilder;
        },
        // Pass-through to `$routeProvider.otherwise()`
        otherwise: function(params) {
          $routeProvider.otherwise(params);
          return routeBuilder;
        },
        // Access to the core $routeProvider.
        $routeProvider: $routeProvider
      };
      return routeBuilder;
    };
  }
  // Currently, v1.0.3, AngularJS does not provide annotation style dependencies in providers so,
  // we add our injection dependencies using the $inject form
  crudRouteProvider.$inject = ['$routeProvider'];

  // Create our provider - it would be nice to be able to do something like this instead:
  //
  // ```
  // angular.module('services.crudRouteProvider', [])
  //   .configHelper('crudRouteProvider', ['$routeProvider, crudRouteProvider]);
  // ```
  // Then we could dispense with the $get, the $inject and the closure wrapper around all this.
  angular.module('services.crudRouteProvider', ['ngRoute']).provider('crudRoute', crudRouteProvider);
})();

angular.module('services.exceptionHandler', ['services.i18nNotifications']);

angular.module('services.exceptionHandler').factory('exceptionHandlerFactory', ['$injector', function($injector) {
  return function($delegate) {

    return function (exception, cause) {
      // Lazy load notifications to get around circular dependency
      //Circular dependency: $rootScope <- notifications <- i18nNotifications <- $exceptionHandler
      var i18nNotifications = $injector.get('i18nNotifications');

      // Pass through to original handler
      $delegate(exception, cause);

      // Push a notification error
      i18nNotifications.pushForCurrentRoute('error.fatal', 'error', {}, {
        exception:exception,
        cause:cause
      });
    };
  };
}]);

angular.module('services.exceptionHandler').config(['$provide', function($provide) {
  $provide.decorator('$exceptionHandler', ['$delegate', 'exceptionHandlerFactory', function ($delegate, exceptionHandlerFactory) {
    return exceptionHandlerFactory($delegate);
  }]);
}]);

angular.module('services.httpRequestTracker', []);
angular.module('services.httpRequestTracker').factory('httpRequestTracker', ['$http', function($http){

  var httpRequestTracker = {};
  httpRequestTracker.hasPendingRequests = function() {
    return $http.pendingRequests.length > 0;
  };

  return httpRequestTracker;
}]);
angular.module('services.i18nNotifications', ['services.notifications', 'services.localizedMessages']);
angular.module('services.i18nNotifications').factory('i18nNotifications', ['localizedMessages', 'notifications', function (localizedMessages, notifications) {

  var prepareNotification = function(msgKey, type, interpolateParams, otherProperties) {
     return angular.extend({
       message: localizedMessages.get(msgKey, interpolateParams),
       type: type
     }, otherProperties);
  };

  var I18nNotifications = {
    pushSticky:function (msgKey, type, interpolateParams, otherProperties) {
      return notifications.pushSticky(prepareNotification(msgKey, type, interpolateParams, otherProperties));
    },
    pushForCurrentRoute:function (msgKey, type, interpolateParams, otherProperties) {
      return notifications.pushForCurrentRoute(prepareNotification(msgKey, type, interpolateParams, otherProperties));
    },
    pushForNextRoute:function (msgKey, type, interpolateParams, otherProperties) {
      return notifications.pushForNextRoute(prepareNotification(msgKey, type, interpolateParams, otherProperties));
    },
    getCurrent:function () {
      return notifications.getCurrent();
    },
    remove:function (notification) {
      return notifications.remove(notification);
    }
  };

  return I18nNotifications;
}]);
angular.module('services.localizedMessages', []).factory('localizedMessages', ['$interpolate', 'I18N.MESSAGES', function ($interpolate, i18nmessages) {

  var handleNotFound = function (msg, msgKey) {
    return msg || '?' + msgKey + '?';
  };

  return {
    get : function (msgKey, interpolateParams) {
      var msg =  i18nmessages[msgKey];
      if (msg) {
        return $interpolate(msg)(interpolateParams);
      } else {
        return handleNotFound(msg, msgKey);
      }
    }
  };
}]);
angular.module('services.notifications', []).factory('notifications', ['$rootScope', function ($rootScope) {

  var notifications = {
    'STICKY' : [],
    'ROUTE_CURRENT' : [],
    'ROUTE_NEXT' : []
  };
  var notificationsService = {};

  var addNotification = function (notificationsArray, notificationObj) {
    if (!angular.isObject(notificationObj)) {
      throw new Error("Only object can be added to the notification service");
    }
    notificationsArray.push(notificationObj);
    return notificationObj;
  };

  $rootScope.$on('$routeChangeSuccess', function () {
    notifications.ROUTE_CURRENT.length = 0;

    notifications.ROUTE_CURRENT = angular.copy(notifications.ROUTE_NEXT);
    notifications.ROUTE_NEXT.length = 0;
  });

  notificationsService.getCurrent = function(){
    return [].concat(notifications.STICKY, notifications.ROUTE_CURRENT);
  };

  notificationsService.pushSticky = function(notification) {
    return addNotification(notifications.STICKY, notification);
  };

  notificationsService.pushForCurrentRoute = function(notification) {
    return addNotification(notifications.ROUTE_CURRENT, notification);
  };

  notificationsService.pushForNextRoute = function(notification) {
    return addNotification(notifications.ROUTE_NEXT, notification);
  };

  notificationsService.remove = function(notification){
    angular.forEach(notifications, function (notificationsByType) {
      var idx = notificationsByType.indexOf(notification);
      if (idx>-1){
        notificationsByType.splice(idx,1);
      }
    });
  };

  notificationsService.removeAll = function(){
    angular.forEach(notifications, function (notificationsByType) {
      notificationsByType.length = 0;
    });
  };

  return notificationsService;
}]);
angular.module('templates.app', ['addRocket/list.tpl.html', 'flights/list.tpl.html', 'header.tpl.html', 'newFlight/list.tpl.html', 'newFlight/motor_chooser_form.tpl.html', 'notifications.tpl.html', 'rockets/list.tpl.html']);

angular.module("addRocket/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("addRocket/list.tpl.html",
    "<h3>Add Rocket</h3>\n" +
    "\n" +
    "<form class=\"form-horizontal\" role=\"form\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"inputRocketName\" class=\"col-sm-2 control-label\">Rocket Name:</label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"inputRocketName\" ng-model=\"rocket.name\" />\n" +
    "    </div>\n" +
    "\n" +
    "    <label for=\"inputRecoveryMode\" class=\"col-sm-2 control-label\">Recovery Mode:</label>\n" +
    "    <div class=\"btn-group col-sm-10\" uib-dropdown>\n" +
    "      <button id=\"inputRecoveryMode\" type=\"button\" class=\"btn btn-primary\" uib-dropdown-toggle ng-disabled=\"disabled\">\n" +
    "        {{ rocket.recovery }}\n" +
    "        <span class=\"caret\"></span>\n" +
    "      </button>\n" +
    "      <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"inputRecoveryMode\">\n" +
    "        <li ng-repeat=\"a in recoveries\" role=\"menuitem\"><a ng-click=\"recoveryItemSelected(a)\">{{a}}</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <label for=\"inputRodSize\" class=\"col-sm-2 control-label\">Rod/Rail Size:</label>\n" +
    "    <div class=\"btn-group col-sm-10\" uib-dropdown>\n" +
    "      <button id=\"inputRodSize\" type=\"button\" class=\"btn btn-primary\" uib-dropdown-toggle ng-disabled=\"disabled\">\n" +
    "        {{ rocket.rod }}\n" +
    "        <span class=\"caret\"></span>\n" +
    "      </button>\n" +
    "      <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"inputRodSize\">\n" +
    "        <li ng-repeat=\"a in rods\" role=\"menuitem\"><a ng-click=\"rodItemSelected(a)\">{{a}}</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <label for=\"inputMotorConfig\" class=\"col-sm-2 control-label\">Motor Configuration:</label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "      <ul class=\"list-group\" aria-labelledby=\"inputMotorConfig\">\n" +
    "        <li class=\"list-group-item\" ng-repeat=\"stage in rocket.motors track by $index\">\n" +
    "          <label>Stage ({{ $index + 1 }}):  </label>\n" +
    "          <label>Number of motors: </label>\n" +
    "          <div class=\"btn-group\" uib-dropdown>\n" +
    "            <button id=\"clusterSizeBtn\" type=\"button\" class=\"btn btn-primary\" uib-dropdown-toggle ng-disabled=\"disabled\">\n" +
    "              {{ stage.length }}\n" +
    "              <span class=\"caret\"></span>\n" +
    "            </button>\n" +
    "            <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"clusterSizeBtn\">\n" +
    "              <li ng-repeat=\"clusterSize in clusterSizes\" role=\"menuitem\">\n" +
    "                <a ng-click=\"clusterSizeSelected($parent.$index, clusterSize)\">{{ clusterSize }}</a>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "          <ul>\n" +
    "            <li ng-repeat=\"motor in stage track by $index\" role=\"menuitem\">\n" +
    "              <label>Motor ({{ $index + 1 }}) </label>\n" +
    "              <label>Diameter: </label>\n" +
    "              <div class=\"btn-group\" uib-dropdown>\n" +
    "                <button id=\"motorSizeBtn\" type=\"button\" class=\"btn btn-primary\" uib-dropdown-toggle ng-disabled=\"disabled\">\n" +
    "                  {{ motor }}\n" +
    "                  <span class=\"caret\"></span>\n" +
    "                </button>\n" +
    "                <ul class=\"dropdown-menu\" uib-dropdown-menu  aria-labelledby=\"motorSizeBtn\">\n" +
    "                  <li ng-repeat=\"motorSize in motorSizes\" role=\"menuitem\">\n" +
    "                    <a ng-click=\"addMotorSizeToStage($parent.$parent.$index, $parent.$index, motorSize)\">{{ motorSize }}</a>\n" +
    "                  </li>\n" +
    "                </ul>\n" +
    "              </div>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "        </li>\n" +
    "        <li class=\"list-group-item\">\n" +
    "          <button id=\"inputMotorConfig\" type=\"button\" class=\"btn btn-primary\" ng-click=\"addStage()\">\n" +
    "            Add Stage\n" +
    "          </button>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <label for=\"inputPreFlightChecklist\" class=\"col-sm-2 control-label\">Pre-Flight Checklist Items:</label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "      <ul class=\"list-group\" aria-labelledby=\"inputPreFlightChecklist\">\n" +
    "        <li class=\"list-group-item\" ng-repeat=\"a in rocket.preflight track by $index\">\n" +
    "          <input type=\"text\" class=\"form-control\" ng-model=\"rocket.preflight[$index]\" />\n" +
    "        </li>\n" +
    "        <li class=\"list-group-item\">\n" +
    "          <button id=\"inputPreFlightChecklist\" type=\"button\" class=\"btn btn-primary\" ng-click=\"addPreFlightRow()\">\n" +
    "            Add Pre-Flight Checklist Item\n" +
    "          </button>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <label for=\"inputNotes\" class=\"col-sm-2 control-label\">Notes:</label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "      <textarea class=\"form-control\" rows=\"5\" id=\"inputNotes\" ng-model=\"rocket.notes\"></textarea>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <div class=\"col-sm-12\">\n" +
    "      <button ng-click=\"submit()\" class=\"btn btn-default\">\n" +
    "        Create Rocket\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</form>");
}]);

angular.module("flights/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("flights/list.tpl.html",
    "<h3>My Flights</h3>\n" +
    "\n" +
    "<ul class=\"list-group\">\n" +
    "  <li class=\"list-group-item\" ng-repeat=\"flight in flights track by flight.flight_id\">\n" +
    "    {{ flight.flight_id }}\n" +
    "    <a class=\"btn btn-default\" href=\"/flights/edit-flight?flight_id={{ flight.flight_id }}\">Edit Flight</a>\n" +
    "  </li>\n" +
    "</ul>");
}]);

angular.module("header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header.tpl.html",
    "<div class=\"navbar navbar-default\" ng-controller=\"HeaderCtrl\">\n" +
    "  <div class=\"container-fluid\">\n" +
    "    <div class=\"navbar-header\">\n" +
    "      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\" aria-expanded=\"false\">\n" +
    "        <span class=\"sr-only\">Toggle navigation</span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "      </button>\n" +
    "      <a class=\"navbar-brand\" href=\"#\">Log My Rocket</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Collect the nav links, forms, and other content for toggling -->\n" +
    "    <div class=\"collapse navbar-collapse\">\n" +
    "      <ul class=\"nav navbar-nav\">\n" +
    "        <li ng-class=\"{active:isNavbarActive('rockets')}\" ng-show=\"isAuthenticated()\"><a href=\"/rockets\">My Rockets</a></li>\n" +
    "        <li ng-class=\"{active:isNavbarActive('flights')}\" ng-show=\"isAuthenticated()\"><a href=\"/flights\">My Flights</a></li>\n" +
    "\n" +
    "        <li>\n" +
    "          <ul class=\"nav\" ng-show=\"hasPendingRequests()\">\n" +
    "            <li class=\"divider-vertical\"></li>\n" +
    "            <li><a href=\"#\"><img src=\"/static/img/spinner.gif\"></a></li>\n" +
    "          </ul>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "\n" +
    "      <ul class=\"nav navbar-nav navbar-left\">\n" +
    "        <li ng-show=\"isAuthenticated()\">\n" +
    "          <form class=\"navbar-form\">\n" +
    "            <a class=\"btn btn-default\" href=\"/rockets/add-rocket\">Add Rocket</a>\n" +
    "          </form>\n" +
    "        </li>\n" +
    "        <li ng-show=\"isAuthenticated()\">\n" +
    "          <form class=\"navbar-form\">\n" +
    "            <a class=\"btn btn-default\" href=\"/flights/new-flight\">New Flight</a>\n" +
    "          </form>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      <login-toolbar></login-toolbar>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        <ul class=\"breadcrumb\">\n" +
    "            <li ng-repeat=\"breadcrumb in breadcrumbs.getAll()\">\n" +
    "                <span class=\"divider\">/</span>\n" +
    "                <ng-switch on=\"$last\">\n" +
    "                    <span ng-switch-when=\"true\">{{breadcrumb.name}}</span>\n" +
    "                    <span ng-switch-default><a href=\"{{breadcrumb.path}}\">{{breadcrumb.name}}</a></span>\n" +
    "                </ng-switch>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("newFlight/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("newFlight/list.tpl.html",
    "<h3>New Flight</h3>\n" +
    "\n" +
    "<form class=\"form-horizontal\" role=\"form\">\n" +
    "  <label for=\"inputRocketName\" class=\"col-sm-2 control-label\">Rocket Name:</label>\n" +
    "  <div class=\"btn-group col-sm-10\" uib-dropdown>\n" +
    "    <button id=\"inputRocketName\" type=\"button\" class=\"btn btn-primary\" uib-dropdown-toggle ng-disabled=\"disabled\">\n" +
    "      {{ rocket.rocket_data.name }}\n" +
    "      <span class=\"caret\"></span>\n" +
    "    </button>\n" +
    "    <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"inputRocketName\">\n" +
    "      <li ng-repeat=\"item in rockets\" role=\"menuitem\"><a ng-click=\"rocketItemSelected(item)\">{{ item.rocket_data.name }}</a></li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "  <label class=\"col-sm-2 control-label\">Motor Configuration:</label>\n" +
    "  <div class=\"col-sm-10\">\n" +
    "    <ul class=\"list-group\" aria-labelledby=\"inputMotorConfig\">\n" +
    "      <li class=\"list-group-item\" ng-repeat=\"stage in rocket.rocket_data.motors track by $index\">\n" +
    "        <label>Stage ({{ $index + 1 }}):  </label>\n" +
    "        <label>Number of motors: {{ stage.length }}</label>\n" +
    "        <ul>\n" +
    "          <li ng-repeat=\"motor_spec in stage track by $index\" role=\"menuitem\">\n" +
    "            <label>Motor ({{ $index + 1 }}) </label>\n" +
    "            <label>Diameter: {{ motor_spec.diameter }}mm</label>\n" +
    "            <label>Motor: {{ motor_spec.motor['manufacturer-abbrev'] }} {{ motor_spec.motor['common-name'] }}</label>\n" +
    "            <div class=\"btn-group\">\n" +
    "              <button ng-click=\"openMotorChooser($parent.$index, $index, motor_spec.diameter)\" class=\"btn btn-primary\">\n" +
    "                Pick Motor\n" +
    "              </button>\n" +
    "            </div>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "      <button ng-click=\"submit()\" class=\"btn btn-default\">\n" +
    "        Start Flight\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</form>");
}]);

angular.module("newFlight/motor_chooser_form.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("newFlight/motor_chooser_form.tpl.html",
    "<form name=\"form\" novalidate class=\"login-form\">\n" +
    "  <div class=\"modal-header\">\n" +
    "    <h4>Choose a motor</h4>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "    <label for=\"multipleSelect\"> Multiple select: </label><br>\n" +
    "    <select name=\"multipleSelect\" id=\"multipleSelect\" ng-model=\"data.multipleSelect\" multiple>\n" +
    "      <option ng-repeat=\"motor in allMotors\" value=\"{{ motor }}\">{{ motor['manufacturer-abbrev'] }} - {{ motor['common-name'] }}</option>\n" +
    "    </select>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-primary login\" ng-click=\"choose()\" ng-disabled='form.$invalid'>Ok</button>\n" +
    "    <button class=\"btn clear\" ng-click=\"clearForm()\">Clear</button>\n" +
    "    <button class=\"btn btn-warning cancel\" ng-click=\"cancelLogin()\">Cancel</button>\n" +
    "  </div>\n" +
    "</form>");
}]);

angular.module("notifications.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("notifications.tpl.html",
    "<div ng-class=\"['alert', 'alert-'+notification.type]\" ng-repeat=\"notification in notifications.getCurrent()\">\n" +
    "    <button class=\"close\" ng-click=\"removeNotification(notification)\">x</button>\n" +
    "    {{notification.message}}\n" +
    "</div>\n" +
    "");
}]);

angular.module("rockets/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("rockets/list.tpl.html",
    "<h3>My Rockets</h3>\n" +
    "\n" +
    "<ul class=\"list-group\">\n" +
    "  <li class=\"list-group-item\" ng-repeat=\"rocket in rockets track by rocket.rocket_id\">\n" +
    "    {{ rocket.rocket_data.name }}\n" +
    "    <a class=\"btn btn-default\" href=\"/flights/new-flight?rocket_id={{ rocket.rocket_id }}\">New Flight</a>\n" +
    "    <a class=\"btn btn-default\" href=\"/flights/edit-rocket?rocket_id={{ rocket.rocket_id }}\">Edit Rocket</a>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module('templates.common', ['security/login/form.tpl.html', 'security/login/toolbar.tpl.html']);

angular.module("security/login/form.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("security/login/form.tpl.html",
    "<form name=\"form\" novalidate class=\"login-form\">\n" +
    "  <div class=\"modal-header\">\n" +
    "    <h4>Sign in</h4>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div class=\"alert alert-warning\" ng-show=\"authReason\">\n" +
    "      {{authReason}}\n" +
    "    </div>\n" +
    "    <div class=\"alert alert-error\" ng-show=\"authError\">\n" +
    "      {{authError}}\n" +
    "    </div>\n" +
    "    <div class=\"alert alert-info\">Please enter your login details</div>\n" +
    "    <label>Username</label>\n" +
    "    <input name=\"login\" type=\"text\" ng-model=\"user.username\" required autofocus>\n" +
    "    <label>Password</label>\n" +
    "    <input name=\"pass\" type=\"password\" ng-model=\"user.password\" required>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-primary login\" ng-click=\"login()\" ng-disabled='form.$invalid'>Sign in</button>\n" +
    "    <button class=\"btn clear\" ng-click=\"clearForm()\">Clear</button>\n" +
    "    <button class=\"btn btn-warning cancel\" ng-click=\"cancelLogin()\">Cancel</button>\n" +
    "  </div>\n" +
    "</form>");
}]);

angular.module("security/login/toolbar.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("security/login/toolbar.tpl.html",
    "<ul class=\"nav navbar-nav navbar-right\">\n" +
    "  <li class=\"divider-vertical\"></li>\n" +
    "  <li ng-show=\"isAuthenticated()\" class=\"logout\">\n" +
    "      <form class=\"navbar-form\">\n" +
    "          <button class=\"btn logout\" ng-click=\"logout()\">Log out</button>\n" +
    "      </form>\n" +
    "  </li>\n" +
    "  <li ng-hide=\"isAuthenticated()\" class=\"login\">\n" +
    "      <form class=\"navbar-form\">\n" +
    "          <button class=\"btn login\" ng-click=\"login()\">Log in</button>\n" +
    "      </form>\n" +
    "  </li>\n" +
    "</ul>");
}]);
