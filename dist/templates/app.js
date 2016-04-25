angular.module('templates.app', ['addRocket/list.tpl.html', 'flights/list.tpl.html', 'header.tpl.html', 'newFlight/list.tpl.html', 'notifications.tpl.html', 'rockets/list.tpl.html']);

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
    "<div ng-repeat=\"flight in flights track by flight.flight_id\">\n" +
    "  {{flight.flight_id}}\n" +
    "</div>");
}]);

angular.module("header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header.tpl.html",
    "<div class=\"navbar\" ng-controller=\"HeaderCtrl\">\n" +
    "    <div class=\"navbar-inner\">\n" +
    "        <div class=\"row\">\n" +
    "            <a class=\"brand\" ng-click=\"home()\">Log My Rocket</a>\n" +
    "            <ul class=\"nav\" ng-show=\"isAuthenticated()\">\n" +
    "                <li ng-class=\"{active:isNavbarActive('rockets')}\"><a href=\"/rockets\">My Rockets</a></li>\n" +
    "                <li ng-class=\"{active:isNavbarActive('flights')}\"><a href=\"/flights\">My Flights</a></li>\n" +
    "            </ul>\n" +
    "            <ul class=\"nav pull-right\" ng-show=\"hasPendingRequests()\">\n" +
    "                <li class=\"divider-vertical\"></li>\n" +
    "                <li><a href=\"#\"><img src=\"/static/img/spinner.gif\"></a></li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            <login-toolbar></login-toolbar>\n" +
    "            <ul ng-show=\"isAuthenticated()\" class=\"nav pull-left\">\n" +
    "                <li>\n" +
    "                    <form class=\"navbar-form\">\n" +
    "                        <a class=\"btn\" href=\"/rockets/add-rocket\">Add Rocket</a>\n" +
    "                    </form>\n" +
    "                </li>\n" +
    "                <li>\n" +
    "                    <form class=\"navbar-form\">\n" +
    "                        <a class=\"btn\" href=\"/flights/new-flight\">New Flight</a>\n" +
    "                    </form>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
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
    "</div>");
}]);

angular.module("newFlight/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("newFlight/list.tpl.html",
    "<h3>New Flight</h3>\n" +
    "\n" +
    "<form class=\"form-horizontal\" role=\"form\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"inputFlightName\" class=\"col-sm-2 control-label\">\n" +
    "      Flight Name:\n" +
    "    </label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"inputFlightName\" ng-model=\"flight.name\" />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"inputRocketId\" class=\"col-sm-2 control-label\">\n" +
    "      Rocket ID:\n" +
    "    </label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"inputRocketId\" ng-model=\"rocket_id\" />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"inputMotorId\" class=\"col-sm-2 control-label\">\n" +
    "      Motor ID:\n" +
    "    </label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"inputMotorId\" ng-model=\"motor.motor_id\" />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "      <button ng-click=\"submit()\" class=\"btn btn-default\">\n" +
    "        Start Flight\n" +
    "      </button>\n" +
    "    </div>\n" +
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
    "<div ng-repeat=\"rocket in rockets track by rocket.rocket_id\">\n" +
    "  {{rocket.rocket_id}}\n" +
    "</div>");
}]);
