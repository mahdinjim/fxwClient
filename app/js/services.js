var services = angular.module('Services',['ngResource','ngCookies']);
services.factory("Links",[function(){
	var baseUrl="http://127.0.0.1";
	var path="/crmtool/web/app_dev.php/api";
	var LoginLink=baseUrl+path+'/public/login';
	
	
	this.getLoginLink=function()
	{
		return LoginLink;
	}
	
	return this;
}]);
services.factory("Login",['$http','$location','$cookieStore',"$route","Links",
	function($http,$location,$cookieStore,$route,Links){
		this.doLogin=function(login,password,funcsucess,funcfailure)
		{
			postdata={
				"grant_type":"password",
				"password":password,
				"login":login
			};
			$http({
				method:"POST", 
				url:Links.getLoginLink(),
				data:postdata, 
				headers: {'Content-Type': 'application/json'}
			}).success(function (data, status, headers, config) {
				var user={};
				user.userinfo=data.user;
				user.token=data.token;
				$cookieStore.put('loggeduser',user);
                funcsucess();
            }).error(function (data, status, headers, config) {
            	if(status==403)
               		funcfailure(data.errors);
               	else
               		funcfailure("Please try again later");
            });
		
		}
		this.getLoggedUser=function(){
			if($cookieStore.get('loggeduser')!=null)
				return $cookieStore.get('loggeduser');
			else
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
		this.haveAccess=function()
		{
			var role=$cookieStore.get('loggeduser').userinfo.roles[0];
			if(role=="ROLE_ADMIN")
				return true;
			else
				return false;
		}
		return this;
		
	}]);

