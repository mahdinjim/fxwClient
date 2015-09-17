var services = angular.module('Services',['ngResource','ngCookies']);
services.factory("Links",[function(){
	var baseUrl="http://127.0.0.1";
	var path="/crmtool/web/app_dev.php/api";
	var LoginLink=baseUrl+path+'/public/login';
	var AllteamMembersLink=baseUrl+path+'/private/team/all';
	
	this.getLoginLink=function()
	{
		return LoginLink;
	}
	this.getAllteamMembersLink=function()
	{
		return AllteamMembersLink;
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
				switch(user.userinfo.roles[0])
				{
					case "ROLE_ADMIN":
						user.userinfo.title="Admin";
						break;
					case "ROLE_TEAMLEADER":
						user.userinfo.title="Team Leader";
						break;
					case "ROLE_DEVELOPER":
						user.userinfo.title="Developer";
						break;
					case "ROLE_TESTER":
						user.userinfo.title="Tester";
						break;
					case "ROLE_DESIGNER":
						user.userinfo.title="UI/UX Designer";
						break;
					case "ROLE_SYSADMIN":
						user.userinfo.title="System Admin";
						break;
					case "ROLE_KEYACCOUNT":
						user.userinfo.title="Account Manager";
						break;
					case "ROLE_CUSTOMER":
						user.userinfo.title="Customer";
						break;
					case "ROLE_CUSER":
						user.userinfo.title="Customer";
						break;
				}
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
			$cookieStore.remove("loggeduser");
			$location.path('/login');
			
		}
		this.haveAccess=function()
		{
			var role=$cookieStore.get('loggeduser').userinfo.roles[0];
			if(role=="ROLE_ADMIN")
				return true;
			else
				return false;
		}
		this.isTokenExpired=function()
		{
			Date.prototype.addHours= function(h){
    			this.setHours(this.getHours()+h);
    			return this;
			}
			exprirationdate=Date.parse($cookieStore.get('loggeduser').token.experationDate.date);
			curentdate=new Date;
			curentdate.setHours(curentdate.getHours()+1);
			if(exprirationdate>curentdate)
			{
				return false;
			}
			else
				this.logout();
		}
		return this;
		
	}]);

services.factory("Team",['$http','$location','$cookieStore',"Login","Links",
	function($http,$location,$cookieStore,Login,Links){
		this.getAllteamMembers=function(funcsuccess,funcfailure)
		{
			if(!Login.isTokenExpired())
			{
				$http({
					method:"GET", 
					url:Links.getAllteamMembersLink(),
					headers: {'x-crm-access-token': $cookieStore.get('loggeduser').token.token}
				}).success(function (data, status, headers, config) {
					for(i=0;i<data.length;i++)
					{
						if(data[i].photo==null)
							data[i].photo="img/users/profile_default_small.jpg"
					}
	                funcsuccess(data);
	            }).error(function (data, status, headers, config) {
	            	
	            });
	        }
		}
		return this;
	}]);