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
    "          <li ng-repeat=\"motor in stage track by $index\" role=\"menuitem\">\n" +
    "            <label>Motor ({{ $index + 1 }}) </label>\n" +
    "            <label>Diameter: {{ motor.diameter }}mm</label>\n" +
    "            <div class=\"btn-group\" uib-dropdown>\n" +
    "              <button id=\"motorBtn\" type=\"button\" class=\"btn btn-primary\" uib-dropdown-toggle ng-disabled=\"disabled\">\n" +
    "                {{ motor.motor.name }}\n" +
    "                <span class=\"caret\"></span>\n" +
    "              </button>\n" +
    "              <ul class=\"dropdown-menu\" uib-dropdown-menu  aria-labelledby=\"motorBtn\">\n" +
    "                <li ng-repeat=\"motor in allMotors\" role=\"menuitem\">\n" +
    "                  <a ng-click=\"addMotorToStage($parent.$parent.$index, $parent.$index, motor)\">{{ motor.name }}</a>\n" +
    "                </li>\n" +
    "              </ul>\n" +
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
    "  </li>\n" +
    "</ul>\n" +
    "");
}]);
