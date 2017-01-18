angular.module('templates.app', ['addRocket/list.tpl.html', 'editRocket/list.tpl.html', 'flightCard/list.tpl.html', 'flights/list.tpl.html', 'header.tpl.html', 'myMotors/list.tpl.html', 'myMotors/motor_chooser_form.tpl.html', 'newFlight/list.tpl.html', 'newFlight/motor_chooser_form.tpl.html', 'notifications.tpl.html', 'postFlightData/list.tpl.html', 'preFlightChecklist/list.tpl.html', 'rockets/list.tpl.html', 'settings/list.tpl.html', 'viewFlight/list.tpl.html']);

angular.module("addRocket/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("addRocket/list.tpl.html",
    "<form class=\"form-horizontal\" role=\"form\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"inputRocketName\" class=\"col-sm-3 control-label\">Rocket Name:</label>\n" +
    "    <div class=\"col-sm-7\">\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"inputRocketName\" ng-model=\"rocket.name\" />\n" +
    "    </div>\n" +
    "\n" +
    "    <label for=\"inputRocketMfg\" class=\"col-sm-3 control-label\">Rocket Manufacturer:</label>\n" +
    "    <div class=\"col-sm-7\">\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"inputRocketMfg\" ng-model=\"rocket.mfg\" />\n" +
    "    </div>\n" +
    "\n" +
    "    <label for=\"inputRocketColors\" class=\"col-sm-3 control-label\">Rocket Colors:</label>\n" +
    "    <div class=\"col-sm-7\">\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"inputRocketColors\" ng-model=\"rocket.colors\" />\n" +
    "    </div>\n" +
    "\n" +
    "    <label for=\"inputRecoveryMode\" class=\"col-sm-3 control-label\">Recovery Mode:</label>\n" +
    "    <div class=\"btn-group col-sm-7\" uib-dropdown>\n" +
    "      <button id=\"inputRecoveryMode\" type=\"button\" class=\"btn btn-primary\" uib-dropdown-toggle ng-disabled=\"disabled\">\n" +
    "        {{ rocket.recovery }}\n" +
    "        <span class=\"caret\"></span>\n" +
    "      </button>\n" +
    "      <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"inputRecoveryMode\">\n" +
    "        <li ng-repeat=\"a in recoveries\" role=\"menuitem\"><a ng-click=\"recoveryItemSelected(a)\">{{a}}</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <label for=\"inputRodSize\" class=\"col-sm-3 control-label\">Rod/Rail Size:</label>\n" +
    "    <div class=\"btn-group col-sm-7\" uib-dropdown>\n" +
    "      <button id=\"inputRodSize\" type=\"button\" class=\"btn btn-primary\" uib-dropdown-toggle ng-disabled=\"disabled\">\n" +
    "        {{ rocket.rod }}\n" +
    "        <span class=\"caret\"></span>\n" +
    "      </button>\n" +
    "      <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"inputRodSize\">\n" +
    "        <li ng-repeat=\"a in rods\" role=\"menuitem\"><a ng-click=\"rodItemSelected(a)\">{{a}}</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <label for=\"inputMotorConfig\" class=\"col-sm-3 control-label\">Motor Configuration:</label>\n" +
    "    <div class=\"col-sm-7\">\n" +
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
    "                  {{ motor.diameter }}mm\n" +
    "                  <span class=\"caret\"></span>\n" +
    "                </button>\n" +
    "                <ul class=\"dropdown-menu\" uib-dropdown-menu  aria-labelledby=\"motorSizeBtn\">\n" +
    "                  <li ng-repeat=\"motorSize in motorSizes\" role=\"menuitem\">\n" +
    "                    <a ng-click=\"addMotorSizeToStage($parent.$parent.$index, $parent.$index, motorSize)\">{{ motorSize }}mm</a>\n" +
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
    "    <label for=\"inputPreFlightChecklist\" class=\"col-sm-3 control-label\">Pre-Flight Checklist Items:</label>\n" +
    "    <div class=\"col-sm-7\">\n" +
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
    "    <label for=\"inputNotes\" class=\"col-sm-3 control-label\">Notes:</label>\n" +
    "    <div class=\"col-sm-7\">\n" +
    "      <textarea class=\"form-control\" rows=\"5\" id=\"inputNotes\" ng-model=\"rocket.notes\"></textarea>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <div class=\"col-sm-12\">\n" +
    "      <button ng-click=\"submit()\" class=\"btn btn-default center-block\">\n" +
    "        Create Rocket\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</form>");
}]);

angular.module("editRocket/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("editRocket/list.tpl.html",
    "<form class=\"form-horizontal\" role=\"form\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"inputRocketName\" class=\"col-sm-3 control-label\">Rocket Name:</label>\n" +
    "    <div class=\"col-sm-7\">\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"inputRocketName\" ng-model=\"rocket.name\" />\n" +
    "    </div>\n" +
    "\n" +
    "    <label for=\"inputRocketMfg\" class=\"col-sm-3 control-label\">Rocket Manufacturer:</label>\n" +
    "    <div class=\"col-sm-7\">\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"inputRocketMfg\" ng-model=\"rocket.mfg\" />\n" +
    "    </div>\n" +
    "\n" +
    "    <label for=\"inputRocketColors\" class=\"col-sm-3 control-label\">Rocket Colors:</label>\n" +
    "    <div class=\"col-sm-7\">\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"inputRocketColors\" ng-model=\"rocket.colors\" />\n" +
    "    </div>\n" +
    "\n" +
    "    <label for=\"inputRecoveryMode\" class=\"col-sm-3 control-label\">Recovery Mode:</label>\n" +
    "    <div class=\"btn-group col-sm-7\" uib-dropdown>\n" +
    "      <button id=\"inputRecoveryMode\" type=\"button\" class=\"btn btn-primary\" uib-dropdown-toggle ng-disabled=\"disabled\">\n" +
    "        {{ rocket.recovery }}\n" +
    "        <span class=\"caret\"></span>\n" +
    "      </button>\n" +
    "      <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"inputRecoveryMode\">\n" +
    "        <li ng-repeat=\"a in recoveries\" role=\"menuitem\"><a ng-click=\"recoveryItemSelected(a)\">{{a}}</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <label for=\"inputRodSize\" class=\"col-sm-3 control-label\">Rod/Rail Size:</label>\n" +
    "    <div class=\"btn-group col-sm-7\" uib-dropdown>\n" +
    "      <button id=\"inputRodSize\" type=\"button\" class=\"btn btn-primary\" uib-dropdown-toggle ng-disabled=\"disabled\">\n" +
    "        {{ rocket.rod }}\n" +
    "        <span class=\"caret\"></span>\n" +
    "      </button>\n" +
    "      <ul class=\"dropdown-menu\" uib-dropdown-menu role=\"menu\" aria-labelledby=\"inputRodSize\">\n" +
    "        <li ng-repeat=\"a in rods\" role=\"menuitem\"><a ng-click=\"rodItemSelected(a)\">{{a}}</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <label for=\"inputMotorConfig\" class=\"col-sm-3 control-label\">Motor Configuration:</label>\n" +
    "    <div class=\"col-sm-7\">\n" +
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
    "                  {{ motor.diameter }}mm\n" +
    "                  <span class=\"caret\"></span>\n" +
    "                </button>\n" +
    "                <ul class=\"dropdown-menu\" uib-dropdown-menu  aria-labelledby=\"motorSizeBtn\">\n" +
    "                  <li ng-repeat=\"motorSize in motorSizes\" role=\"menuitem\">\n" +
    "                    <a ng-click=\"addMotorSizeToStage($parent.$parent.$index, $parent.$index, motorSize)\">{{ motorSize }}mm</a>\n" +
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
    "    <label for=\"inputPreFlightChecklist\" class=\"col-sm-3 control-label\">Pre-Flight Checklist Items:</label>\n" +
    "    <div class=\"col-sm-7\">\n" +
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
    "    <label for=\"inputNotes\" class=\"col-sm-3 control-label\">Notes:</label>\n" +
    "    <div class=\"col-sm-7\">\n" +
    "      <textarea class=\"form-control\" rows=\"5\" id=\"inputNotes\" ng-model=\"rocket.notes\"></textarea>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <div class=\"col-sm-12\">\n" +
    "      <button ng-click=\"submit()\" class=\"btn btn-default center-block\">\n" +
    "        Update Rocket\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</form>");
}]);

angular.module("flightCard/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("flightCard/list.tpl.html",
    "<h3>Flight Card</h3>\n" +
    "\n" +
    "<div class=\"col-sm-12\">\n" +
    "  <div class=\"col-sm-12\">\n" +
    "    <label>Date: </label> {{ flight.flight_data.create  | date:'yyyy-MM-dd h:mm a' }}\n" +
    "  </div>\n" +
    "  <div class=\"col-sm-12\">\n" +
    "    <label>Organization: </label> {{ user.organization }}\n" +
    "  </div>\n" +
    "  <div class=\"col-sm-12\">\n" +
    "    <label>Membership Number: </label> {{ user.membership_num }}\n" +
    "  </div>\n" +
    "  <div class=\"col-sm-12\">\n" +
    "    <label>Level: </label> {{ user.level }}\n" +
    "  </div>\n" +
    "  <div class=\"col-sm-12\">\n" +
    "    <label>Rocket Name: </label> {{ flight.rocket_data.rocket_data.name }}\n" +
    "  </div>\n" +
    "  <div class=\"col-sm-12\">\n" +
    "    <label>Rocket Manufacturer: </label> {{ flight.rocket_data.rocket_data.mfg }}\n" +
    "  </div>\n" +
    "  <div class=\"col-sm-12\">\n" +
    "    <label>Rocket Colors: </label> {{ flight.rocket_data.rocket_data.colors }}\n" +
    "  </div>\n" +
    "  <div class=\"col-sm-12\">\n" +
    "    <label class=\"col-sm-2 control-label\">Motor Configuration: </label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "      <ul class=\"list-group\" aria-labelledby=\"inputMotorConfig\">\n" +
    "        <li class=\"list-group-item\" ng-repeat=\"stage in flight.rocket_data.rocket_data.motors track by $index\">\n" +
    "          <label>Stage {{ $index + 1 }}:</label>\n" +
    "          <ul>\n" +
    "            <li ng-repeat=\"motor_spec in stage track by $index\" role=\"menuitem\">\n" +
    "              <label>Diameter: {{ motor_spec.diameter }}mm</label>\n" +
    "              <label>Motor: {{ motor_spec.motor['manufacturer-abbrev'] }} {{ motor_spec.motor['common-name'] }}-{{ motor_spec.delay }}</label>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-sm-12\">\n" +
    "    <label>Launch Rod Size: </label> {{ flight.rocket_data.rocket_data.rod }}\n" +
    "  </div>\n" +
    "  <div class=\"col-sm-12\">\n" +
    "    <label>Rocket Recovery System: </label> {{ flight.rocket_data.rocket_data.recovery }}\n" +
    "  </div>\n" +
    "  <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "    <button ng-click=\"submit(flight)\" class=\"btn btn-default\">\n" +
    "      Launch!\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("flights/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("flights/list.tpl.html",
    "<div class=\"col-sm-12\" ng-repeat=\"flight in flights track by flight.flight_id\">\n" +
    "  <a class=\"btn btn-default col-sm-12\" href=\"/flights/view-flight/{{ flight.flight_id }}/\"><span class=\"pull-left\">{{ flight.flight_data.create  | date:'yyyy-MM-dd h:mm a' }} - {{ flight.rocket_data.rocket_data.name }}</span></a>\n" +
    "</div>\n" +
    "");
}]);

angular.module("header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header.tpl.html",
    "<div class=\"navbar-wrapper\">\n" +
    "  <div class=\"container\">\n" +
    "    <nav class=\"navbar navbar-default\" ng-controller=\"HeaderCtrl\">\n" +
    "      <div class=\"container-fluid\">\n" +
    "        <div class=\"navbar-header\">\n" +
    "          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n" +
    "            <span class=\"sr-only\">Toggle navigation</span>\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "          </button>\n" +
    "          <a class=\"navbar-brand\" href=\"#\">Log My Rocket</a>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Collect the nav links, forms, and other content for toggling -->\n" +
    "        <div id=\"navbar\" class=\"collapse navbar-collapse\">\n" +
    "          <ul class=\"nav navbar-nav\">\n" +
    "            <li ng-class=\"{active:isNavbarActive('rockets')}\" ng-show=\"isAuthenticated()\"><a href=\"/rockets\">Rockets</a></li>\n" +
    "            <li ng-class=\"{active:isNavbarActive('flights')}\" ng-show=\"isAuthenticated()\"><a href=\"/flights\">Flights</a></li>\n" +
    "\n" +
    "            <li>\n" +
    "              <ul class=\"nav\" ng-show=\"hasPendingRequests()\">\n" +
    "                <li class=\"divider-vertical\"></li>\n" +
    "                <li><a href=\"#\"><img src=\"/static/img/spinner.gif\"></a></li>\n" +
    "              </ul>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "\n" +
    "          <ul class=\"nav navbar-nav navbar-left\">\n" +
    "            <li ng-show=\"isAuthenticated()\">\n" +
    "              <form class=\"navbar-form\">\n" +
    "                <a class=\"btn btn-default\" href=\"/rockets/add-rocket\">Add Rocket</a>\n" +
    "                <a class=\"btn btn-default\" href=\"/flights/new-flight\">New Flight</a>\n" +
    "              </form>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "          <login-toolbar></login-toolbar>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <ul class=\"breadcrumb\">\n" +
    "                <li ng-repeat=\"breadcrumb in breadcrumbs.getAll()\">\n" +
    "                    <span class=\"divider\">/</span>\n" +
    "                    <ng-switch on=\"$last\">\n" +
    "                        <span ng-switch-when=\"true\">{{breadcrumb.name}}</span>\n" +
    "                        <span ng-switch-default><a href=\"{{breadcrumb.path}}\">{{breadcrumb.name}}</a></span>\n" +
    "                    </ng-switch>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </nav>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("myMotors/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("myMotors/list.tpl.html",
    "<form class=\"form-horizontal\" role=\"form\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <div class=\"row\">\n" +
    "      <button ng-click=\"openMotorChooser()\" class=\"btn btn-primary\">\n" +
    "        Add Motor\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div>\n" +
    "    <ul class=\"list-group\">\n" +
    "      <li class=\"list-group-item\" ng-repeat=\"motor in motors track by $index\">\n" +
    "        <div>\n" +
    "          <div>\n" +
    "            {{ motor.count }} -\n" +
    "            {{ motor.motor['manufacturer'] }} -\n" +
    "            {{ motor.motor['common-name'] }}-{{ motor.delay }}\n" +
    "            <button ng-click=\"addMotor(motor)\" class=\"btn btn-default\">\n" +
    "              +\n" +
    "            </button>\n" +
    "            <button ng-click=\"delMotor(motor)\" class=\"btn btn-default\">\n" +
    "              -\n" +
    "            </button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</form>");
}]);

angular.module("myMotors/motor_chooser_form.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("myMotors/motor_chooser_form.tpl.html",
    "<form name=\"form\" novalidate class=\"login-form\">\n" +
    "  <div class=\"modal-header\">\n" +
    "    <h4>Choose a motor</h4>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div>\n" +
    "      <label for=\"selectDia\">Select Motor Diameter: </label><br>\n" +
    "      <select name=\"select\" id=\"selectDia\" ng-model=\"data.selectDia\" ng-change=\"changeDia()\">\n" +
    "        <option ng-repeat=\"dia in allDias | orderBy:sorterFunc\" value=\"{{ dia }}\">{{ dia | number:0 }}mm</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "      <label for=\"selectMotor\">Select Manufacturer: </label><br>\n" +
    "      <select name=\"select\" id=\"selectMfg\" ng-model=\"data.selectMfg\" ng-change=\"changeMfg()\">\n" +
    "        <option ng-repeat=\"mfg in allMfg\" value=\"{{ mfg }}\">{{ mfg }}</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "      <label for=\"selectMotor\">Select Motor: </label><br>\n" +
    "      <select name=\"select\" id=\"selectMotor\" ng-model=\"data.selectMotor\" ng-change=\"changeMotor()\">\n" +
    "        <option ng-repeat=\"motor in motors\" value=\"{{ motor }}\">{{ motor['common-name'] }}</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "      <label for=\"selectMotor\">Select Motor Delay: </label><br>\n" +
    "      <select name=\"select\" id=\"selectMotorDelay\" ng-model=\"data.selectMotorDelay\">\n" +
    "        <option ng-repeat=\"delay in delays\" value=\"{{ delay }}\">{{ delay }}</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "      <label for=\"motorCnt\">Number of Motors: </label><br>\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"motorCnt\" ng-model=\"data.motorCnt\" />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-primary login\" ng-click=\"choose()\" ng-disabled='form.$invalid'>Ok</button>\n" +
    "    <button class=\"btn btn-warning cancel\" ng-click=\"cancel()\">Cancel</button>\n" +
    "  </div>\n" +
    "</form>");
}]);

angular.module("newFlight/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("newFlight/list.tpl.html",
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
    "            <label>Motor: {{ motor_spec.motor['manufacturer-abbrev'] }} {{ motor_spec.motor['common-name'] }}-{{ motor_spec.delay }}</label>\n" +
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
    "        Go To Pre-Flight Checklist\n" +
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
    "    <label for=\"select\"> Select a motor from your collection: </label><br>\n" +
    "    <select name=\"select\" id=\"select\" ng-model=\"data.select\">\n" +
    "      <option ng-repeat=\"motor in motors\" value=\"{{ motor }}\">{{ motor['motor']['manufacturer-abbrev'] }} {{ motor['motor']['common-name'] }}-{{ motor['delay'] }}</option>\n" +
    "    </select>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-primary login\" ng-click=\"choose()\" ng-disabled='form.$invalid'>Ok</button>\n" +
    "    <button class=\"btn btn-warning cancel\" ng-click=\"cancel()\">Cancel</button>\n" +
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

angular.module("postFlightData/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("postFlightData/list.tpl.html",
    "<h3>Post-Flight Data</h3>\n" +
    "\n" +
    "<div class=\"col-sm-12\">\n" +
    "  <div class=\"col-sm-12\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"notes\">Notes:</label>\n" +
    "      <textarea class=\"form-control\" rows=\"5\" id=\"notes\" ng-model=\"flight.flight_data.notes\"></textarea>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "    <button ng-click=\"submit(flight)\" class=\"btn btn-default\">\n" +
    "      Submit Flight Data\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("preFlightChecklist/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("preFlightChecklist/list.tpl.html",
    "<h3>Pre-Flight Checklist</h3>\n" +
    "\n" +
    "<uib-alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</uib-alert>\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"row\">\n" +
    "      <ul class=\"list-group\" aria-labelledby=\"preFlightChecklist\">\n" +
    "        <li class=\"list-group-item\" ng-repeat=\"item in flight.rocket_data.rocket_data.preflight track by $index\">\n" +
    "          <ul>\n" +
    "            <div class=\"checkbox\">\n" +
    "              <label><input type=\"checkbox\" value=\"\" ng-model=\"checked[$index]\">{{ item }}</label>\n" +
    "            </div>\n" +
    "          </ul>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "  </div>\n" +
    "  <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "    <button ng-click=\"submit(flight, checked)\" class=\"btn btn-default\">\n" +
    "      Go To Flight Card\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("rockets/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("rockets/list.tpl.html",
    "<div class=\"col-sm-4\" ng-repeat=\"rocket in rockets track by rocket.rocket_id\">\n" +
    "  <a class=\"btn btn-default col-sm-12\" href=\"/rockets/edit-rocket/{{ rocket.rocket_id }}/\">{{ rocket.rocket_data.name }}</a>\n" +
    "</div>\n" +
    "");
}]);

angular.module("settings/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("settings/list.tpl.html",
    "<form class=\"form-horizontal\" role=\"form\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"organization\" class=\"col-sm-4 control-label\">Organization (NAR/Tripoli): </label>\n" +
    "    <div class=\"col-sm-6\">\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"organization\" ng-model=\"user.organization\" />\n" +
    "    </div>\n" +
    "    <label for=\"membershipNum\" class=\"col-sm-4 control-label\">Membership Number: </label>\n" +
    "    <div class=\"col-sm-6\">\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"membershipNum\" ng-model=\"user.membership_num\" />\n" +
    "    </div>\n" +
    "    <label for=\"level\" class=\"col-sm-4 control-label\">Level: </label>\n" +
    "    <div class=\"col-sm-6\">\n" +
    "      <input type=\"text\" class=\"form-control\" id=\"level\" ng-model=\"user.level\" />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <div class=\"col-sm-12\">\n" +
    "      <button ng-click=\"submit()\" class=\"btn btn-default center-block\">\n" +
    "        Update Settings\n" +
    "      </button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</form>");
}]);

angular.module("viewFlight/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("viewFlight/list.tpl.html",
    "<div class=\"row\">\n" +
    "  <div class=\"row\">\n" +
    "    <h3>Flight</h3>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <a class=\"btn btn-primary\" href=\"/flights/post-flight/{{ flight.flight_id }}/\">Add Data</a>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"row\">\n" +
    "    <label>Date: </label> {{ flight.flight_data.create  | date:'yyyy-MM-dd h:mm a' }}\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <label>Rocket Name: </label> {{ flight.rocket_data.rocket_data.name }}\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <label>Rocket Manufacturer: </label> {{ flight.rocket_data.rocket_data.mfg }}\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <label>Rocket Colors: </label> {{ flight.rocket_data.rocket_data.colors }}\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <label class=\"col-sm-2 control-label\">Motor Configuration: </label>\n" +
    "    <div class=\"col-sm-10\">\n" +
    "      <ul class=\"list-group\" aria-labelledby=\"inputMotorConfig\">\n" +
    "        <li class=\"list-group-item\" ng-repeat=\"stage in flight.rocket_data.rocket_data.motors track by $index\">\n" +
    "          <label>Stage {{ $index + 1 }}:</label>\n" +
    "          <ul>\n" +
    "            <li ng-repeat=\"motor_spec in stage track by $index\" role=\"menuitem\">\n" +
    "              <label>Diameter: {{ motor_spec.diameter }}mm</label>\n" +
    "              <label>Motor: {{ motor_spec.motor['manufacturer-abbrev'] }} {{ motor_spec.motor['common-name'] }}</label>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <label>Launch Rod Size: </label> {{ flight.rocket_data.rocket_data.rod }}\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <label>Rocket Recovery System: </label> {{ flight.rocket_data.rocket_data.recovery }}\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <label>Notes: </label> {{ flight.flight_data.notes }}\n" +
    "  </div>\n" +
    "  <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "    <button ng-click=\"submit()\" class=\"btn btn-default\">\n" +
    "      Return to Flights\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</div>");
}]);
