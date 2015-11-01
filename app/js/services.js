var services = angular.module('Services',['ngResource','ngCookies']);
services.factory("Links",[function(){
	var env="dev";
	if(env=="dev")
	{
		var baseUrl="http://127.0.0.1";
		var path="/crmtool/web/app_dev.php/api";
	}
	else
	{
		var baseUrl="http://www.dev.fxw.io";
		var path="/backend/web/app.php/api";
	}
	var LoginLink=baseUrl+path+'/public/login';
	var AllteamMembersLink=baseUrl+path+'/private/team/all';
	var createTeamLeaderLink=baseUrl+path+'/private/super/teamleader/create';
	var createdeveloperLink=baseUrl+path+'/private/super/developer/create';
	var createtesterLink=baseUrl+path+'/private/super/tester/create';
	var createdesignerLink=baseUrl+path+'/private/super/designer/create';
	var createsysadminLink=baseUrl+path+'/private/super/sysadmin/create';
	var createkeyaccountLink=baseUrl+path+'/private/super/keyaccount/create';
	var updatekeyaccountLink=baseUrl+path+'/private/keyaccount/update';
	var updateteamleadertLink=baseUrl+path+'/private/teamleader/update';
	var updatedevelopertLink=baseUrl+path+'/private/developer/update';
	var updatetesterLink=baseUrl+path+'/private/tester/update';
	var updatesysadminLink=baseUrl+path+'/private/sysadmin/update';
	var updatedesignerLink=baseUrl+path+'/private/designer/update';
	var deletekeyaccountLink=baseUrl+path+'/private/super/keyaccount/delete';
	var deleteteamleadertLink=baseUrl+path+'/private/super/teamleader/delete';
	var deletedevelopertLink=baseUrl+path+'/private/super/developer/delete';
	var deletetesterLink=baseUrl+path+'/private/super/tester/delete';
	var deletesysadminLink=baseUrl+path+'/private/super/sysadmin/delete';
	var deletedesignerLink=baseUrl+path+'/private/super/designer/delete';
	var uploadImageLink=baseUrl+path+'/private/team/upload/photo';
	var accountManngerListLink=baseUrl+path+'/private/super/keyaccount/all';
	var createClientLink=baseUrl+path+"/private/keyaccount/customer/create";
	var listcustomersLink=baseUrl+path+"/private/keyaccount/customer/all";
	this.getLoginLink=function()
	{
		return LoginLink;
	}
	this.getAllteamMembersLink=function()
	{
		return AllteamMembersLink;
	}
	this.getcreateTeamLeaderLink=function()
	{
		return createTeamLeaderLink;
	}
	this.getCreatedeveloperLink=function()
	{
		return createdeveloperLink;
	}
	this.getCreatetesterLink=function()
	{
		return createtesterLink;
	}
	this.getCreatedesignerLink=function()
	{
		return createdesignerLink;
	}
	this.getCreatesysadminLink=function()
	{
		return createsysadminLink;
	}
	this.getCreatekeyaccountLink=function()
	{
		return createkeyaccountLink;
	}
	this.getUpdateTeamLeaderLink=function()
	{
		return updateteamleadertLink;
	}
	this.getUpdatedeveloperLink=function()
	{
		return updatedevelopertLink;
	}
	this.getUpdatetesterLink=function()
	{
		return updatetesterLink;
	}
	this.getUpdatedesignerLink=function()
	{
		return updatedesignerLink;
	}
	this.getUpdatesysadminLink=function()
	{
		return updatesysadminLink;
	}
	this.getUpdatekeyaccountLink=function()
	{
		return updatekeyaccountLink;
	}
	this.getDeleteTeamLeaderLink=function()
	{
		return deleteteamleadertLink;
	}
	this.getDeletedeveloperLink=function()
	{
		return deletedevelopertLink;
	}
	this.getDeletetesterLink=function()
	{
		return deletetesterLink;
	}
	this.getDeletedesignerLink=function()
	{
		return deletedesignerLink;
	}
	this.getDeletesysadminLink=function()
	{
		return deletesysadminLink;
	}
	this.getDeletekeyaccountLink=function()
	{
		return deletekeyaccountLink;
	}
	this.getImageUplaodLink=function()
	{
		return uploadImageLink;
	}
	this.getAccountManagersListLink=function()
	{
		return accountManngerListLink;
	}
	this.getCreateClientLink=function()
	{
		return createClientLink;
	}
	this.getListCustomersLink=function()
	{
		return listcustomersLink;
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
			if($cookieStore.get('loggeduser')!=null)
			{
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
		this.createTeamLeader=function(member,successFunc,failureFunc)
		{
			this.addTeamMember(Links.getcreateTeamLeaderLink(),member,successFunc,failureFunc,"POST");
		}
		this.createDeveloper=function(member,successFunc,failureFunc)
		{
			this.addTeamMember(Links.getCreatedeveloperLink(),member,successFunc,failureFunc,"POST");
		}
		this.createTester=function(member,successFunc,failureFunc)
		{
			this.addTeamMember(Links.getCreatetesterLink(),member,successFunc,failureFunc,"POST");
		}
		this.createDesigner=function(member,successFunc,failureFunc)
		{
			this.addTeamMember(Links.getCreatedesignerLink(),member,successFunc,failureFunc,"POST");
		}
		this.createSysAdmin=function(member,successFunc,failureFunc)
		{
			this.addTeamMember(Links.getCreatesysadminLink(),member,successFunc,failureFunc,"POST");
		}
		this.createKeyAccount=function(member,successFunc,failureFunc)
		{
			this.addTeamMember(Links.getCreatekeyaccountLink(),member,successFunc,failureFunc,"POST");
		}
		this.updateTeamLeader=function(member,successFunc,failureFunc)
		{
			this.addTeamMember(Links.getUpdateTeamLeaderLink(),member,successFunc,failureFunc,"PUT");
		}
		this.updateDeveloper=function(member,successFunc,failureFunc)
		{
			this.addTeamMember(Links.getUpdatedeveloperLink(),member,successFunc,failureFunc,"PUT");
		}
		this.updateTester=function(member,successFunc,failureFunc)
		{
			this.addTeamMember(Links.getUpdatetesterLink(),member,successFunc,failureFunc,"PUT");
		}
		this.updateDesigner=function(member,successFunc,failureFunc)
		{
			this.addTeamMember(Links.getUpdatedesignerLink(),member,successFunc,failureFunc,"PUT");
		}
		this.updateSysAdmin=function(member,successFunc,failureFunc)
		{
			this.addTeamMember(Links.getUpdatesysadminLink(),member,successFunc,failureFunc,"PUT");
		}
		this.updateKeyAccount=function(member,successFunc,failureFunc)
		{
			this.addTeamMember(Links.getUpdatekeyaccountLink(),member,successFunc,failureFunc,"PUT");
		}
		this.deleteTeamLeader=function(member,successFunc,failureFunc)
		{
			this.deleteTeamMember(Links.getDeleteTeamLeaderLink(),member,successFunc,failureFunc);
		}
		this.deleteDeveloper=function(member,successFunc,failureFunc)
		{
			this.deleteTeamMember(Links.getDeletedeveloperLink(),member,successFunc,failureFunc);
		}
		this.deleteTester=function(member,successFunc,failureFunc)
		{
			this.deleteTeamMember(Links.getDeletetesterLink(),member,successFunc,failureFunc);
		}
		this.deleteDesigner=function(member,successFunc,failureFunc)
		{
			this.deleteTeamMember(Links.getDeletedesignerLink(),member,successFunc,failureFunc);
		}
		this.deleteSysAdmin=function(member,successFunc,failureFunc)
		{
			this.deleteTeamMember(Links.getDeletesysadminLink(),member,successFunc,failureFunc);
		}
		this.deleteKeyAccount=function(member,successFunc,failureFunc)
		{
			this.deleteTeamMember(Links.getDeletekeyaccountLink(),member,successFunc,failureFunc);
		}
		this.addTeamMember=function(link,member,successFunc,failureFunc,method)
		{
			if(!Login.isTokenExpired())
			{

				$http({
					method:method, 
					url:link,
					data:member, 
					headers: {'Content-Type': 'application/json','x-crm-access-token': $cookieStore.get('loggeduser').token.token}
				}).success(function (data, status, headers, config) {
					successFunc();
				}).error(function (data, status, headers, config) {
	            	failureFunc(data.errors);
	            });
			}
		}
		this.deleteTeamMember=function(link,member,successFunc,failureFunc)
		{
			if(!Login.isTokenExpired())
			{

				$http({
					method:"delete", 
					url:link+"/"+member.id,
					headers: {'Content-Type': 'application/json','x-crm-access-token': $cookieStore.get('loggeduser').token.token}
				}).success(function (data, status, headers, config) {
					successFunc();
				}).error(function (data, status, headers, config) {
	            	failureFunc(data.errors);
	            });
			}
		}
		this.uploadMemberImage=function(id,role,image,successFunc,failurefunc)
		{
			if(!Login.isTokenExpired())
			{

				$http({
					method:"post", 
					url:Links.getImageUplaodLink()+"/"+id+"/"+role,
					data:image,
					headers: {'Content-Type': 'application/json','x-crm-access-token': $cookieStore.get('loggeduser').token.token}
				}).success(function (data, status, headers, config) {
					successFunc();
				}).error(function (data, status, headers, config) {
	            	failurefunc(data.errors);
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
}]);
services.factory('Client', ['$http','Login',"Links",function ($http,Login,Links) {
	
	this.getAllKeyAccounts=function(successFunc,failureFunc,page)
	{
		if(!Login.isTokenExpired())
			{
				$http({
					method:"GET", 
					url:Links.getAccountManagersListLink()+"/"+page,
					headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
				}).success(function (data, status, headers, config) {
					
	                successFunc(data.users);
	            }).error(function (data, status, headers, config) {
	            	failureFunc();
	            });
	        }
	}
	this.addClient=function(client,successFunc,failureFunc,method)
		{
			if(!Login.isTokenExpired())
			{

				$http({
					method:method, 
					url:Links.getCreateClientLink(),
					data:client, 
					headers: {'Content-Type': 'application/json','x-crm-access-token': Login.getLoggedUser().token.token}
				}).success(function (data, status, headers, config) {
					if(method=="POST")
						successFunc("Client added successfully");
					else
						successFunc("Client updated successfully");
				}).error(function (data, status, headers, config) {
	            	failureFunc(data.errors);
	            });
			}
		}
	this.getAllClients=function(successFunc,failureFunc,page)
	{
		if(!Login.isTokenExpired())
			{
				$http({
					method:"GET", 
					url:Links.getListCustomersLink()+"/"+page,
					headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
				}).success(function (data, status, headers, config) {
					
	                successFunc(data.users,data.totalpages,data.current_page);
	            }).error(function (data, status, headers, config) {
	            	
	            });
	        }
	}
	return this;
}])
services.factory('Params',function(){
	var teamMember={};
	return {
		setTeamMember:function(data){
			teamMember=data;
		},
		getTeamMember:function()
		{
			return teamMember;
		}
	}
})