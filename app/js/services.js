var services = angular.module('Services',['ngResource','ngCookies']);
services.factory("Login",["$resource",'$location','$cookieStore',"$route",
	function($resource,$location,$cookieStore,$route,Links){
		/*var cred =$resource(Links.getLoginLink()).get(function(data){
				$cookieStore.put('isLoggedin',true);
				var user=data.data.login;
				$cookieStore.put('loggeduser',user);
		
			
		});*/
		this.isLogin=function(){
			//return $cookieStore.get('isLoggedin')
			return false;
			
		}
		this.requireAuth=function(){
			/*if(!$cookieStore.get('isLoggedin'))
				window.open(Links.getLoginPageLink());*/

				
		}
		this.getLoggedUser=function(){
			//return $cookieStore.get('loggeduser');
			return false;
		}
		this.logout=function(){
			var cookies = document.cookie.split(";");
		    for (var i = 0; i < cookies.length; i++) {
		    	var cookie = cookies[i];
		    	var eqPos = cookie.indexOf("=");
		    	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		    	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		    }
			window.open(Links.getLoginPageLink());
			
		}
		return this;
		
	}]);
