var crmapp=angular.module("crmapp",[
	'ngRoute',
	'Services',
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
			otherwise({
        		redirectTo: '/dashboard'
      		});
	}
]);      		
crmapp.run(['$rootScope', '$location', 'Login', function ($rootScope, $location, Login) {
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
        
    });
}]);