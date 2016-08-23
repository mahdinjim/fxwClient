var crmapp=angular.module("crmapp",[
	'ngRoute',
	'Services',
	'ngSanitize',
	'ngCookies',
	'directives',
	'Controllers'
	]);
crmapp.config(["$routeProvider",
	function($routeProvider){
		
		$routeProvider.
			when('/login',{
				templateUrl:'partials/login.html',
				controller:'LoginCtrl'
			}).
			when('/dashboard',{
				templateUrl:'partials/dashboard.html',
				//controller:'LoginCtrl'
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
			otherwise({
        		redirectTo: '/dashboard'
      		});
	}
]);      		
crmapp.run(['$rootScope', '$location', 'Login','Chat','$templateCache', function ($rootScope, $location, Login,Chat,$templateCache) {
    $rootScope.$on('$routeChangeStart', function (event) {
    	
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