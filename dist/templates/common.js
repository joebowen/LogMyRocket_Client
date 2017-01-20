angular.module('templates.common', ['security/login/form.tpl.html', 'security/login/signup.tpl.html', 'security/login/toolbar.tpl.html']);

angular.module("security/login/form.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("security/login/form.tpl.html",
    "<form name=\"form\" novalidate class=\"login-form\">\n" +
    "  <div class=\"modal-header\">\n" +
    "    <div class=\"col-sm-12 intro-header\">\n" +
    "      <div class=\"col-sm-8\">\n" +
    "        <h2>\n" +
    "          <div class=\"row\">\n" +
    "            <strong>Log My Rocket</strong>\n" +
    "          </div>\n" +
    "          <div class=\"row\">\n" +
    "            <small><strong>Model Rocket Flight Log</strong></small>\n" +
    "          </div>\n" +
    "        </h2>\n" +
    "      </div>\n" +
    "      <div class=\"col-sm-4 text-right hidden-xs\">\n" +
    "        <img class=\"logo pull-right\" src=\"static/img/logo.jpg\" alt=\"Log My Rocket\">\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer panel-group\">\n" +
    "    <div class=\"row alert alert-warning\" ng-show=\"authReason\">\n" +
    "      {{authReason}}\n" +
    "    </div>\n" +
    "    <div class=\"row alert alert-error\" ng-show=\"authError\">\n" +
    "      {{authError}}\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8\">\n" +
    "        <div class=\"panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <div class=\"col-sm-12 center-block\">\n" +
    "              <div class=\"row text-left\">\n" +
    "                <ul class=\"list-group\">\n" +
    "                  <li class=\"list-group-item\">\n" +
    "                    Track your fleet of model rockets\n" +
    "                  </li>\n" +
    "                  <li class=\"list-group-item\">\n" +
    "                    Track your rocket motor inventory\n" +
    "                  </li>\n" +
    "                  <li class=\"list-group-item\">\n" +
    "                    Track each flight and record flight details\n" +
    "                  </li>\n" +
    "                </ul>\n" +
    "              </div>\n" +
    "              <div class=\"row text-left\">\n" +
    "                <button class=\"btn btn-primary\" ng-click=\"showSignup()\">Sign Up!</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-sm-4\">\n" +
    "        <div class=\"form-group panel panel-default\">\n" +
    "          <div class=\"panel-body\">\n" +
    "            <div class=\"col-sm-12 center-block\">\n" +
    "              <div class=\"row alert alert-info text-center\">Welcome back</div>\n" +
    "              <div class=\"row\">\n" +
    "                <input class=\"col-lg-12 form-control\" name=\"login\" type=\"text\" ng-model=\"user.username\" placeholder=\"Username\" required autofocus>\n" +
    "              </div>\n" +
    "              <div class=\"row\">\n" +
    "                <input class=\"col-lg-12 form-control\" name=\"pass\" type=\"password\" ng-model=\"user.password\" placeholder=\"Password\"  required>\n" +
    "              </div>\n" +
    "              <div class=\"row text-center\">\n" +
    "                <button class=\"btn btn-primary login\" ng-click=\"login()\">Sign in</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"row text-center hidden-xs\">\n" +
    "      <span class=\"text-muted\"><a href='http://www.freepik.com/free-vector/startup-rocket-launch_764880.htm'>Logo Image Designed by Freepik</a></span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</form>");
}]);

angular.module("security/login/signup.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("security/login/signup.tpl.html",
    "<form name=\"form\" novalidate class=\"login-form\">\n" +
    "  <div class=\"modal-header text-center\">\n" +
    "    <h3>Signup</h3>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <label class=\"col-sm-3\">Username</label>\n" +
    "    <input class=\"col-sm-9\" name=\"login\" type=\"text\" ng-model=\"user.username\" required autofocus>\n" +
    "    <label class=\"col-sm-3\">Password</label>\n" +
    "    <input class=\"col-sm-9\" name=\"pass\" type=\"password\" ng-model=\"user.password\" required>\n" +
    "    <label class=\"col-sm-3\">Email</label>\n" +
    "    <input class=\"col-sm-9\" name=\"email\" type=\"text\" ng-model=\"user.email\" required>\n" +
    "    <label class=\"col-sm-6\">Organization (Optional)</label>\n" +
    "    <input class=\"col-sm-6\" name=\"organization\" type=\"text\" ng-model=\"user.settings.organization\">\n" +
    "    <label class=\"col-sm-6\">Membership Number (Optional)</label>\n" +
    "    <input class=\"col-sm-6\" name=\"membership_num\" type=\"text\" ng-model=\"user.settings.membership_num\">\n" +
    "    <label class=\"col-sm-6\">Level (Optional)</label>\n" +
    "    <input class=\"col-sm-6\" name=\"level\" type=\"text\" ng-model=\"user.settings.level\">\n" +
    "    <button class=\"btn btn-primary login\" ng-click=\"signup()\" ng-disabled='form.$invalid'>Signup!</button>\n" +
    "    <button class=\"btn btn-warning cancel\" ng-click=\"cancelSignup()\">Cancel</button>\n" +
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
