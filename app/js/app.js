var crmapp=angular.module("crmapp",[
	'ngRoute',
	'Services',
	'ngSanitize',
	'ngCookies',
	'directives',
	'Controllers',
	'textAngular'
	]);
crmapp.config(["$routeProvider",
	function($routeProvider){

		$routeProvider.
			when('/login',{
				templateUrl:'partials/login.html?v=1.0',
				controller:'LoginCtrl'
			}).
			when('/dashboard',{
				templateUrl:'partials/dashboard.html',
				controller:'DashboardCtrl'
			}).
			when('/team',{
				templateUrl:'partials/team.html',
				controller:'TeamCtrl'
			}).
			when('/teamprofile',{
				templateUrl:'partials/memberprofile.html',
				controller:'TeamCtrl'
			}).
			when('/client',{
				templateUrl:'partials/client.html',
				controller:'ClientCtrl'
			}).
			when('/cuser',{
				templateUrl:'partials/cuser.html',
				controller:'CuserCtrl'
			}).
			when('/cuserprofile',{
				templateUrl:'partials/cuserprofile.html',
				controller:'CuserCtrl'
			}).
			when('/messaging/:project_id/:channel_id',{
				templateUrl:'partials/messaging.html',
				controller:'ChatCtrl'
			}).
			when('/pdetails/:project_id',{
				templateUrl:'partials/pdetails.html',
				controller:'ProjectCtrl'
			}).
			when('/keybox/:project_id',{
				templateUrl:'partials/keybox.html',
				controller:'KeyboxCtrl'
			}).
			when('/stories/:project_id/:ticket_id',{
				templateUrl:'partials/stories.html',
				controller:'StoriesCtrl'
			}).
			when('/acceptcontract/:cid',{
				templateUrl:'partials/terms.html',
				controller:'ContractCtrl'
			}).
			when('/clientprojects/:cid',{
				templateUrl:'partials/clientprojects.html',
				controller:'ClientProjectsCtrl'
			}).
			when('/report/:project_id/:pname',{
				templateUrl:'partials/hourreports.html',
				controller:'ReportCtrl'
			}).
			when('/invoice',{
				templateUrl:'partials/invoice.html',
			}).
			when('/invoicedetails',{
				templateUrl:'partials/invoicedetails.html',
			}).
			when('/invoiceadmin',{
				templateUrl:'partials/adminInvoice.html',
			}).
			when('/admininvoicepaids',{
				templateUrl:'partials/adminInvoicePaids.html',
			}).
			otherwise({
        		redirectTo: '/dashboard'
      		});
	}
]);
crmapp.run(['$rootScope', '$location', 'Login','Chat','$templateCache', function ($rootScope, $location, Login,Chat,$templateCache) {
    $rootScope.$on('$routeChangeStart', function (event) {
    	window.Intercom("update");
    	if(!Login.getLoggedUser())
    	{
    		if($location.path()=="/login")
    			return;
    		else {
    			$location.path('/login');
    		}
    	}
    	else
    	{
    		if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSTOMER" || Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSER"){
				window.Intercom("boot", {
				   app_id: "bf90791k",
				   name: Login.getLoggedUser().userinfo.name+" "+Login.getLoggedUser().userinfo.surname,
				   email: Login.getLoggedUser().userinfo.email, // Email address
				   created_at: new Date().getTime() // Signup date as a Unix timestamp
				});
			}
    		Login.contractSigned();
    		if(!Login.haveAccess())
    		{
    			Login.logout(false);
    		}
    		else if($location.path()=="/login")
    		{
    			$location.path("/dashboard");
		        $location.replace();
    		}
    	}
	    if($location.search().last!=undefined)
	    {
	    	$location.url($location.search().last);

	    }


    });
   //  $rootScope.$on('$viewContentLoaded', function() {
   //    $templateCache.removeAll();
   // });
}]);
crmapp.filter('toTrusted', function ($sce) {
    return function strip_tags(input, allowed) {
      allowed = (((allowed || '') + '')
        .toLowerCase()
        .match(/<[a-z][a-z0-9]*>/g) || [])
        .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
      var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
      return input.replace(commentsAndPhpTags, '')
        .replace(tags, function($0, $1) {
          return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
        });
    }
});
