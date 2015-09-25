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
services.factory('Chat', ["$http","$location","$cookieStore",function ($http,$location,$cookieStore) {
	this.loginToChat=function(code,chatstate){

		var state=this.generateString();
		var teamid="T09LA070W";
		var client_id="9690007030.11132963923";
		var client_secret="255fabd7768a518b3dc08be06dcdd883";
		var redirecturl="http://127.0.0.1/crmtoolwebclient/app/%23"+$location.path();
		console.log(redirecturl);
		if(code===undefined && chatstate===undefined)
		{
			$cookieStore.put("chat_state",state);
			$cookieStore.put("chat_location",redirecturl);
			var url="https://slack.com/oauth/authorize?client_id="+client_id+"&redirect_uri="+redirecturl+"&team="+teamid+"&state="+state;
			window.open(url,"_self");
		}
		else
		{
			state=$cookieStore.get("chat_state");
			if(state==chatstate)
			{
				redirecturl=$cookieStore.get("chat_location");
				console.log(code);
				var apiurl="https://slack.com/api/oauth.access?client_id="+client_id+"&redirect_uri="+redirecturl+"&client_secret="+client_secret+"&code="+code;
				console.log(apiurl);
				$http({
					method:"GET", 
					url:apiurl,
				}).success(function (data, status, headers, config) {
					if(data.ok)
					{
						$cookieStore.put("chatloggedin",true);
						$cookieStore.put("access_token",data.access_token);
						$location.search("code",null);
						$location.search("state",null);
					}
					
	            }).error(function (data, status, headers, config) {
	            	
	            });
			}
		}
	};
	this.chatloggout=function(){
		$cookieStore.put("chatloggedin",false);
		$cookieStore.remove("access_token");
		$cookieStore.remove("chat_location");
		$cookieStore.remove("chat_state");
	};
	this.isUserLoggedIn=function()
	{
		var loggedin = $cookieStore.get("chatloggedin");
		if(!loggedin || loggedin==null)
			return false;
		else
			return true;
	}
	this.getChannels=function()
	{
		var url="https://slack.com/api/channels.list?token="+$cookieStore.get("access_token");
		$http({
					method:"GET", 
					url:url,
				}).success(function (data, status, headers, config) {
					
					if(data.ok)
					{
						var channels=data.channels;
					}
					
	            }).error(function (data, status, headers, config) {
	            	
	            });

	}
	/*this.sendmsg=function(channel_id,msg)
	{
		var url="https://slack.com/api/chat.postMessage?token="+$cookieStore.get("access_token")+"&channel="channel_id+"&text="+msg+"&as_user=true";
		$http({
					method:"GET", 
					url:url,
				}).success(function (data, status, headers, config) {
					
					if(data.ok)
					{
						console.log(data);
					}
					
	            }).error(function (data, status, headers, config) {
	            	
	            });
	}*/
	this.generateString=function(){
		var text = "";
    	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	    for( var i=0; i < 5; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));
	    return text;
	}
	return this;
}])