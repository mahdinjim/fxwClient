var crmapp=angular.module("crmapp",[
	'ngRoute',
	'Services',
	'directives',
	]);
crmapp.config(["$routeProvider",
	function($routeProvider){
		
		$routeProvider.
			when('/login',{
				templateUrl:'partials/login.html',
				//controller:'LoginCtrl'
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

        /*if (!Login.getLoggedUser()) {
            console.log('DENY');
            event.preventDefault();
            $location.path('/login');
        }
        else {
            console.log('ALLOW');
            $location.path('/dashboard');
        }*/
    });
}]);