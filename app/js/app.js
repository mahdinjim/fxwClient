var crmapp=angular.module("crmapp",[
	'ngRoute',
	'Services',
	'ngSanitize',
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
			when('/messaging',{
				templateUrl:'partials/messaging.html',
				controller:'ChatCtrl'
			}).
			when('/pdetails',{
				templateUrl:'partials/pdetails.html',
				controller:'ProjectCtrl'
			}).
			otherwise({
        		redirectTo: '/dashboard'
      		});
	}
]);      		
crmapp.run(['$rootScope', '$location', 'Login','Chat', function ($rootScope, $location, Login,Chat) {
    $rootScope.$on('$routeChangeStart', function (event) {

        if (!Login.getLoggedUser() && $location.path()!="/login") {
           
            $location.path('/login');
        }
        else
        {

        	Login.isTokenExpired()
	        if(Login.getLoggedUser() && !Login.haveAccess())
	        {
	        	$location.path('/login');
	        }
	        if(Login.getLoggedUser() && $location.path()=="/login" && Login.haveAccess())
	        {
	        	$location.path("/dashboard");
	        	$location.replace();
	        }
	    }
	    if($location.search().code!=undefined && $location.search().state!=undefined)
	    {
	    	Chat.loginToChat($location.search().code,$location.search().state);
	    }
        
    });
}]);