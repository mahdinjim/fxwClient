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
        if(Login.getLoggedUser() && !Login.haveAccess())
        {
        	$location.path('/login');
        }
        if(Login.getLoggedUser() && $location.path()=="/login" && Login.haveAccess())
        {
        	$location.path("/dashboard");
        	$location.replace();
        }
        
    });
}]);