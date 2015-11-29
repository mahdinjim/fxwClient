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
		var path="/backend/web/api";
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
	var updateCustomerLink=baseUrl+path+"/private/customer/update";
	var deleteClientLink=baseUrl+path+"/private/keyaccount/customer/delete";
	var createCuserLink=baseUrl+path+"/private/customer/users/create";
	var updateCuserLink=baseUrl+path+"/private/customer/users/update";
	var listCuserLink=baseUrl+path+"/private/customer/users/all";
	var deleteCuserLink=baseUrl+path+"/private/customer/users/delete";
	var uploadCuserPhotoLink=baseUrl+path+"/private/customer/users/upload/photo";
	var channelInfoLink=baseUrl+path+"/private/chat/info";
	var messageslink=baseUrl+path+"/private/chat/messages";
	var newmessagesLink=baseUrl+path+"/private/chat/new";
	var makreadmessagesLink=baseUrl+path+"/private/chat/mark";
	var newmessagesNumberLink=baseUrl+path+"/private/chat/newmessages/number";
	var sendMessageLink=baseUrl+path+"/private/chat/send";
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
	this.getUpdateCustomerLink=function()
	{
		return updateCustomerLink;
	}
	this.getDeleteClientLink=function()
	{
		return deleteClientLink;
	}
	this.getCreateCuserLink=function()
	{
		return createCuserLink;
	}
	this.getUpdateCuserLink=function()
	{
		return updateCuserLink;
	}
	this.getListCuserLink=function()
	{
		return listCuserLink;
	}
	this.getdeleteCuserLink=function()
	{
		return deleteCuserLink;
	}
	this.getCuserUploadPhotoLink=function()
	{
		return uploadCuserPhotoLink;
	}
	this.getChannelInfoLink=function()
	{
		return channelInfoLink;
	}
	this.getMessagesLink=function()
	{
		return messageslink;
	}
	this.getNewMessagesLink=function()
	{
		return newmessagesLink;
	}
	this.getMakreadmessagesLink=function()
	{
		return makreadmessagesLink;
	}
	this.getNewMessageNumberLink=function()
	{
		return newmessagesNumberLink;
	}
	this.getSendMessageLink=function()
	{
		return sendMessageLink;
	}
	return this;
}]);
services.factory("Login",['$http','$location','$cookies',"$route","Links",
	function($http,$location,$cookies,$route,Links){
		var Admin_Access=["/login","/dashboard","/client","/teamprofile","/team","/messaging"];
		var Client_Access=["/login","/dashboard","/cuser","/cuserprofile","/messaging"];
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
				data.token.experationDate.date=data.token.experationDate.date.replace(".000000","");
				data.token.experationDate.date=data.token.experationDate.date.replace(" ","T");
				user.userinfo=data.user;
				user.token=data.token;
				localStorage.setItem("loggeduser",JSON.stringify(user));
				funcsucess();
               
            }).error(function (data, status, headers, config) {
            	if(status==403)
               		funcfailure(data.errors);
               	else
               		funcfailure("Please try again later");
            });
		
		}
		this.getLoggedUser=function(){
			if(localStorage.loggeduser!=undefined)
			{
				var loggedUser=JSON.parse(localStorage.loggeduser);
				if(loggedUser!=null)
					return loggedUser;
				else
					return false;
			}
			else
			{
				return false;
			}
		}
		this.logout=function(){
			localStorage.removeItem("loggeduser");
			$location.path('/login');
			
		}
		this.haveAccess=function(path)
		{
			if(path==undefined)
			{
				path=$location.path();
			}
			if(this.getLoggedUser())
				var role=this.getLoggedUser().userinfo.roles[0];
			else
				return false;
			if(role=="ROLE_ADMIN")
			{
				if(Admin_Access.indexOf(path)>0 )
					return true;
				else
					return false;
			}
			else if(role=="ROLE_CUSTOMER" || role=="ROLE_CUSER")
			{
				if(Client_Access.indexOf(path)>0 )
					return true;
				else
					return false;
			}
			else
			{
				return false;
			}

		}
		this.isTokenExpired=function()
		{
			var loggedUser=this.getLoggedUser();
			if(loggedUser)
			{

				exprirationdate=new Date(loggedUser.token.experationDate.date);
				curentdate=new Date();
				exprirationdate=this.toUTCdate(exprirationdate,-60);
				curentdate=this.toUTCdate(curentdate,curentdate.getTimezoneOffset());
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
		this.toUTCdate=function(d,offset)
		{
			return d.getTime() - (offset * 60000);
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
					headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
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
					headers: {'Content-Type': 'application/json','x-crm-access-token': Login.getLoggedUser().token.token}
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
					headers: {'Content-Type': 'application/json','x-crm-access-token': Login.getLoggedUser().token.token}
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
					headers: {'Content-Type': 'application/json','x-crm-access-token': Login.getLoggedUser().token.token}
				}).success(function (data, status, headers, config) {
					successFunc();
				}).error(function (data, status, headers, config) {
	            	failurefunc(data.errors);
	            });
			}
		}
		return this;
	}]);
// services.factory('Chat', ["$http","$location","$cookieStore",function ($http,$location,$cookieStore) {
// 	this.loginToChat=function(code,chatstate){

// 		var state=this.generateString();
// 		var teamid="T09LA070W";
// 		var client_id="9690007030.11132963923";
// 		var client_secret="255fabd7768a518b3dc08be06dcdd883";
// 		var redirecturl="http://127.0.0.1/crmtoolwebclient/app/%23"+$location.path();
// 		console.log(redirecturl);
// 		if(code===undefined && chatstate===undefined)
// 		{
// 			$cookieStore.put("chat_state",state);
// 			$cookieStore.put("chat_location",redirecturl);
// 			var url="https://slack.com/oauth/authorize?client_id="+client_id+"&redirect_uri="+redirecturl+"&team="+teamid+"&state="+state;
// 			window.open(url,"_self");
// 		}
// 		else
// 		{
// 			state=$cookieStore.get("chat_state");
// 			if(state==chatstate)
// 			{
// 				redirecturl=$cookieStore.get("chat_location");
// 				console.log(code);
// 				var apiurl="https://slack.com/api/oauth.access?client_id="+client_id+"&redirect_uri="+redirecturl+"&client_secret="+client_secret+"&code="+code;
// 				console.log(apiurl);
// 				$http({
// 					method:"GET", 
// 					url:apiurl,
// 				}).success(function (data, status, headers, config) {
// 					if(data.ok)
// 					{
// 						$cookieStore.put("chatloggedin",true);
// 						$cookieStore.put("access_token",data.access_token);
// 						$location.search("code",null);
// 						$location.search("state",null);
// 					}
					
// 	            }).error(function (data, status, headers, config) {
	            	
// 	            });
// 			}
// 		}
// 	};
// 	this.chatloggout=function(){
// 		$cookieStore.put("chatloggedin",false);
// 		$cookieStore.remove("access_token");
// 		$cookieStore.remove("chat_location");
// 		$cookieStore.remove("chat_state");
// 	};
// 	this.isUserLoggedIn=function()
// 	{
// 		var loggedin = $cookieStore.get("chatloggedin");
// 		if(!loggedin || loggedin==null)
// 			return false;
// 		else
// 			return true;
// 	}
// 	this.getChannels=function()
// 	{
// 		var url="https://slack.com/api/channels.list?token="+$cookieStore.get("access_token");
// 		$http({
// 					method:"GET", 
// 					url:url,
// 				}).success(function (data, status, headers, config) {
					
// 					if(data.ok)
// 					{
// 						var channels=data.channels;
// 					}
					
// 	            }).error(function (data, status, headers, config) {
	            	
// 	            });

// 	}
// 	/*this.sendmsg=function(channel_id,msg)
// 	{
// 		var url="https://slack.com/api/chat.postMessage?token="+$cookieStore.get("access_token")+"&channel="channel_id+"&text="+msg+"&as_user=true";
// 		$http({
// 					method:"GET", 
// 					url:url,
// 				}).success(function (data, status, headers, config) {
					
// 					if(data.ok)
// 					{
// 						console.log(data);
// 					}
					
// 	            }).error(function (data, status, headers, config) {
	            	
// 	            });
// 	}*/
// 	this.generateString=function(){
// 		var text = "";
//     	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
// 	    for( var i=0; i < 5; i++ )
// 	        text += possible.charAt(Math.floor(Math.random() * possible.length));
// 	    return text;
// 	}
// 	return this;
// }]);
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
				if(method=="POST")
					var link =Links.getCreateClientLink();
				else
					var link=Links.getUpdateCustomerLink();
				$http({
					method:method, 
					url:link,
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
	this.deleteClient=function(client,successFunc,failureFunc)
		{
			if(!Login.isTokenExpired())
			{

				$http({
					method:"delete", 
					url:Links.deleteCuserLink()+"/"+client.id,
					headers: {'Content-Type': 'application/json','x-crm-access-token': Login.getLoggedUser().token.token}
				}).success(function (data, status, headers, config) {
					successFunc();
				}).error(function (data, status, headers, config) {
	            	failureFunc(data.errors);
	            });
			}
		}
	return this;
}]);
services.factory("Cuser",["$http",'Login','Links',function($http,Login,Links){
	this.addUser=function(user,successFunc,failureFunc,method)
		{
			if(!Login.isTokenExpired())
			{
				if(method=="POST")
					var link =Links.getCreateCuserLink();
				else
					var link=Links.getUpdateCuserLink();
				$http({
					method:method, 
					url:link,
					data:user, 
					headers: {'Content-Type': 'application/json','x-crm-access-token': Login.getLoggedUser().token.token}
				}).success(function (data, status, headers, config) {
					if(method=="POST")
						successFunc("User added successfully");
					else
						successFunc("User updated successfully");
				}).error(function (data, status, headers, config) {
	            	failureFunc(data.errors);
	            });
			}
		}
		this.getAllUsers=function(successFunc,failureFunc,page)
		{
			if(!Login.isTokenExpired())
				{
					$http({
						method:"GET", 
						url:Links.getListCuserLink()+"/"+page,
						headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
					}).success(function (data, status, headers, config) {
						for(i=0;i<data.users.length;i++)
						{
							if(data.users[i].photo==null)
								data.users[i].photo="img/users/profile_default_small.jpg"
						}
		                successFunc(data.users);
		            }).error(function (data, status, headers, config) {
		            	
		            });
		        }
		}
		this.deleteUser=function(user,successFunc,failureFunc)
			{
				if(!Login.isTokenExpired())
				{

					$http({
						method:"delete", 
						url:Links.getdeleteCuserLink()+"/"+user.id,
						headers: {'Content-Type': 'application/json','x-crm-access-token': Login.getLoggedUser().token.token}
					}).success(function (data, status, headers, config) {
						successFunc();
					}).error(function (data, status, headers, config) {
		            	failureFunc(data.errors);
		            });
				}
			}
		this.uploadCuserImage=function(id,image,successFunc,failurefunc)
		{
			if(!Login.isTokenExpired())
			{

				$http({
					method:"post", 
					url:Links.getCuserUploadPhotoLink()+"/"+id,
					data:image,
					headers: {'Content-Type': 'application/json','x-crm-access-token': Login.getLoggedUser().token.token}
				}).success(function (data, status, headers, config) {
					successFunc();
				}).error(function (data, status, headers, config) {
	            	failurefunc(data.errors);
	            });
			}
		}
		return this;
}])
services.factory('Params',function(){
	var teamMember=null;
	var cuser=null;
	return {
		setTeamMember:function(data){
			teamMember=data;
		},
		getTeamMember:function()
		{
			return teamMember;
		},
		setCuser:function(data){
			cuser=data;
		},
		getCuser:function(){
			return cuser;
		}
	}
})
services.factory('Chat', ["$http",'Login','Links',function($http,Login,Links){
	this.team=null;
	this.first=null;
	this.has_more=false;
	this.newmessagesCount=0;
	this.getChannelInfo=function(channel_id,successFunc,messagingssuccsFunc,failureFunc,start)
	{
		if(!Login.isTokenExpired())
		{
			var me=this;
			$http({
				method:"GET", 
				url:Links.getChannelInfoLink()+"/"+channel_id,
				headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
			}).success(function (data, status, headers, config) {
				me.team=data.members;
                successFunc(data);
                me.getMessages(channel_id,messagingssuccsFunc,failureFunc,start);
            }).error(function (data, status, headers, config) {
            	if(status==403)
            		Login.logout();
            	else
            		failureFunc(data.error);
            });
        }
	}
	this.formatSlackMessages=function(data)
	{
		var deletedItems=new Array();
		this.first=data.messages[data.messages.length-1];
		for (i=0; i<data.messages.length;i++) {
			var mess=this.formatOneSlackMessage(data.messages[i]);
			if(mess.mustdelete)
			{
				deletedItems.push(data.messages[i]);
			}
			else
			{
				data.messages[i]=mess.message;
			}
			
		}
		for(i=0;i<deletedItems.length;i++)
		{
			var index=data.messages.indexOf(deletedItems[i]);
			data.messages.splice(index,1);
		}
		data.messages.reverse();
		return data;
	}
	this.formatOneSlackMessage=function(message)
	{
		var mustdelete=false;
		var time=message.ts.split(".")[0];
		var messdate=new Date(new Number(time)*1000);
		message.hour=messdate.getHours();
		message.minutes=messdate.getMinutes();
		message.day=messdate.getDate();
		message.month=messdate.getMonth()+1;
		message.year=messdate.getFullYear();
		message.date=messdate;
		for (j=0; j<this.team.length;j++) {
			if(message.user!=undefined)
			{
				if(message.user==this.team[j].id)
				{
					message.username=this.team[j].name;
					message.userphoto=this.team[j].profile.image_32;
				}
			}
			else
			{
				message.userphoto="img/users/profile_default_small.jpg";
			}
			if(message.text!=undefined)
			{
				if(message.text.indexOf("<http")>-1)
				{
					var link="";
					var h=message.text.indexOf("<http")+1;
					while(message.text.charAt(h)!='>')
					{
						link+=message.text[h];
						h++;
					}
					message.text=message.text.replace("<"+link+">",'<a href="'+link+'">'+link+'</a>');
				}
				if(message.text.indexOf("<@"+this.team[j].id+">")>-1)
				{
					message.text=message.text.replace("<@"+this.team[j].id+">","@"+this.team[j].name);
				}
				if(message.text.indexOf("<@"+this.team[j].id+"|"+this.team[j].name+">")>-1)
				{
					message.text=message.text.replace("<@"+this.team[j].id+"|"+this.team[j].name+">","@"+"<a>"+this.team[j].name+"</a>");
				}
			}
			else 
			{
				mustdelete=true;
			}
		}
			
		
		return {"message":message,"mustdelete":mustdelete};
	}
	this.getMessages=function(channel_id,successFunc,failureFunc,start)
	{
		if(start!=0)
		{
			if(this.first===undefined)
				return;
			else
				start=this.first.ts;
		}
		if(!Login.isTokenExpired())
		{
			var me =this;
			$http({
				method:"GET", 
				url:Links.getMessagesLink()+"/40/"+channel_id+"/"+start,
				headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
			}).success(function (data, status, headers, config) {
				if(data.messages.length>0)
				{
					data=me.formatSlackMessages(data);
				}
				me.has_more=data.hasmore;
                successFunc(data);
            }).error(function (data, status, headers, config) {
            	if(status==403)
            		Login.logout();
            	else
            		failureFunc(data.error);
            });
        }
	}
	this.isHasMore=function()
	{
		return this.has_more;
	}
	this.getNewMessages=function(channel_id,successFunc,failureFunc,last)
	{
		if(!Login.isTokenExpired())
		{
			var me =this;
			$http({
				method:"GET", 
				url:Links.getNewMessagesLink()+"/"+channel_id+"/"+last,
				headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
			}).success(function (data, status, headers, config) {
				data=me.formatSlackMessages(data);
                successFunc(data);
            }).error(function (data, status, headers, config) {
            	if(status==403)
            		Login.logout();
            	else
            		failureFunc(data.error);
            });
        }
	}
	this.markreadMessages=function(channel_id,mess)
	{
		if(!Login.isTokenExpired())
		{
			var me =this;
			$http({
				method:"GET", 
				url:Links.getMakreadmessagesLink()+"/"+channel_id+"/"+mess,
				headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
			}).success(function (data, status, headers, config) {
            }).error(function (data, status, headers, config) {
            	if(status==403)
            		Login.logout();
            	else
            		alert(data.error);
            });
        }
	}
	this.getNewMessagesNumber=function(channel,successfunction,i,end)
	{
		if(!Login.isTokenExpired())
		{
			
			var me =this;
			$http({
				method:"GET", 
				url:Links.getNewMessageNumberLink()+"/"+channel.id,
				headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
			}).success(function (data, status, headers, config) {
				if(i==0)
				{
					me.newmessagesCount=0;
				}
				me.newmessagesCount+=parseInt(data.undread_count);
				successfunction(data,channel,i,end,me.newmessagesCount);
            }).error(function (data, status, headers, config) {
            	if(status==403)
            		Login.logout();
            	else
            		alert(data.error);
            });
        }
	}
	this.sendMessage=function(group,text,successFunc)
	{
		var me =this;
		if(!Login.isTokenExpired())
		{
			var username;
			if(Login.getLoggedUser().userinfo.compnay_name==undefined)
				username="flexwork";
			else
				username=Login.getLoggedUser().userinfo.compnay_name;
			var postdata={
				"message":text,
				"client":username
			}
			$http({
				method:"POST", 
				data:postdata,
				url:Links.getSendMessageLink()+"/"+group,
				headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
			}).success(function (data, status, headers, config) {
				data.message.userphoto="img/users/profile_default_small.jpg";
				data.message=me.formatOneSlackMessage(data.message);
				successFunc(data);
            }).error(function (data, status, headers, config) {
            	if(status==403)
            		Login.logout();
            	else
            		alert(data.error);
            });
        }

	}
	return this;
}]);