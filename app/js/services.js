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
	var AllDevteamMembersLink=baseUrl+path+'/private/devteam/all';
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
	var createProjectLink=baseUrl+path+"/private/project/restricted/create";
	var listprojectLink=baseUrl+path+"/private/project/list";
	var projectDetailLink=baseUrl+path+"/private/project/details";
	var isexpiredLink=baseUrl+path+"/private/token/expired";
	var assignTeamLeaderLink=baseUrl+path+"/private/super/project/teamleader/assign";
	var addDeveloperLink=baseUrl+path+"/private/teamleader/project/developer/add";
	var addDesignerLink=baseUrl+path+"/private/teamleader/project/designer/add";
	var addTesterLink=baseUrl+path+"/private/teamleader/project/tester/add";
	var addSysAdminLink=baseUrl+path+"/private/teamleader/project/sysadmin/add";
	var deleteDeveloperFromProjectLink=baseUrl+path+"/private/teamleader/project/developer/delete";
	var deleteTesterFromProjectLink=baseUrl+path+"/private/teamleader/project/tester/delete";
	var deleteDesignerFromProjectLink=baseUrl+path+"/private/teamleader/project/designer/delete";
	var deleteSysAdminFromprojectLink=baseUrl+path+"/private/teamleader/project/sysadmin/delete";
	var getRolesLink=baseUrl+path+"/private/roles";
	var fixProjectBudgetLink=baseUrl+path+"/private/project/restricted/budget";
	var projectConfigsListLink=baseUrl+path+"/private/project/configs/list";
	var deleteprojectConfigLink=baseUrl+path+"/private/project/restricted/config/delete";
	var createProjectConfigLink=baseUrl+path+"/private/project/restricted/config/create";
	var updateProjectConfigLink=baseUrl+path+"/private/project/restricted/config/update";
	var tickettypesLink=baseUrl+path+"/private/ticket/types";
	var createTicketLink=baseUrl+path+"/private/project/restricted/ticket/create";
	var listTicketLink=baseUrl+path+"/private/ticket/list";
	var startEstimationLink=baseUrl+path+"/private/project/restricted/ticket/startestipamtion";
	var acceptEstimationLink=baseUrl+path+"/private/project/restricted/ticket/acceptestipamtion";
	var rejectEstimationLink=baseUrl+path+"/private/project/restricted/ticket/rejectestipamtion";
	var acceptTicketLink=baseUrl+path+"/private/project/restricted/ticket/accept";
	var rejectTicketLink=baseUrl+path+"/private/project/restricted/ticket/reject";
	var deleteTicketLink=baseUrl+path+"/private/project/restricted/ticket/delete";
	var updateTicketLink=baseUrl+path+"/private/project/restricted/ticket/update";
	var createTaskLink=baseUrl+path+"/private/project/task/create";
	var updateTaskLink=baseUrl+path+"/private/project/task/update";
	var listTaskLink=baseUrl+path+"/private/project/task/list";
	var estimationLink=baseUrl+path+"/private/project/task/estimation";
	var deletetasklink=baseUrl+path+"/private/project/task/delete";
	var sentToclientLink=baseUrl+path+"/private/project/ticket/sent";
	var sentToProdLink=baseUrl+path+"/private/project/ticket/production";
	var startTaskLink=baseUrl+path+"/private/project/task/start";
	var finishTaskLink=baseUrl+path+"/private/project/task/finish";
	var realtimeLink=baseUrl+path+"/private/project/task/realtime";
	var delivertoClientLink=baseUrl+path+"/private/project/ticket/acceptance";
	var uploadfilelink=baseUrl+path+"/private/project/restricted/file/uplaod";
	var listdocumentsLink=baseUrl+path+"/private/project/file/list";
	var acceptContractLink=baseUrl+path+"/private/customer/contract/accept";
	var acceptProjectContractLink=baseUrl+path+"/private/project/restricted/accept";
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
	this.getCreateProjectLink=function()
	{
		return createProjectLink;
	}
	this.getListProjectLink=function()
	{
		return listprojectLink;
	}
	this.getProjectDetailLink=function()
	{
		return projectDetailLink;
	}
	this.getIsExpiredLink=function()
	{
		return isexpiredLink;
	}
	this.getAllDevTeamMemberLink=function()
	{
		return AllDevteamMembersLink;
	}
	this.getAssignTealLeaderLink=function()
	{
		return assignTeamLeaderLink;
	}
	this.getAddDeveloperLink=function()
	{
		return addDeveloperLink;
	}
	this.getAddDesignerLink=function()
	{
		return addDesignerLink;
	}
	this.getAddTesterLink=function()
	{
		return addTesterLink;
	}
	this.getAddSysAdminLink=function()
	{
		return addSysAdminLink;
	}
	this.getDeleteDeveloperFromProjectLink=function()
	{
		return deleteDeveloperFromProjectLink;
	}
	this.getDeleteTesterFromProjectLink=function()
	{
		return deleteTesterFromProjectLink;
	}
	this.getDeleteDesignerFromProjectLink=function()
	{
		return deleteDesignerFromProjectLink;
	}
	this.getDeleteSysAdminFromProjectLink=function()
	{
		return deleteSysAdminFromprojectLink;
	}
	this.getGetRolesLink=function()
	{
		return getRolesLink;
	}
	this.getAssignBudgetLink=function()
	{
		return fixProjectBudgetLink;
	}
	this.getProjectConfigsListLink=function()
	{
		return projectConfigsListLink;
	}
	this.getDeleteProjectConfigLink=function()
	{
		return deleteprojectConfigLink;
	}
	this.getCreateProjectConfigLink=function()
	{
		return createProjectConfigLink;
	}
	this.getUpdateProjectConfigLink=function()
	{
		return updateProjectConfigLink;
	}
	this.getTicketTypesLink=function()
	{
		return tickettypesLink;
	}
	this.getCreateTicketLink=function()
	{
		return createTicketLink;
	}
	this.getTicketListLink=function()
	{
		return listTicketLink;
	}
	this.getStartEstimationLink=function()
	{
		return startEstimationLink;
	}
	this.getAcceptEstimationLink=function()
	{
		return acceptEstimationLink;
	}
	this.getRejectEstimationLink=function()
	{
		return rejectEstimationLink;
	}
	this.getAcceptTicketLink=function(){
		return acceptTicketLink;
	}
	this.getRejectionTicketLink=function(){
		return rejectTicketLink;
	}
	this.getDeleteTicketLink=function()
	{
		return deleteTicketLink;
	}
	this.getUpdateTicketLink=function()
	{
		return updateTicketLink;
	}
	this.getCreatetaskLink=function()
	{
		return createTaskLink;
	}
	this.getUpdatetaskLink=function()
	{
		return updateTaskLink;
	}
	this.getListTasksLink=function()
	{
		return listTaskLink;
	}
	this.getEstimationLink=function()
	{
		return estimationLink;
	}
	this.getDeleteTaskLink=function()
	{
		return deletetasklink;
	}
	this.GetSendToClientLink=function()
	{
		return sentToclientLink;
	}
	this.GetSendToProdLink=function()
	{
		return sentToProdLink;
	}
	this.getStartTaskLink=function()
	{
		return startTaskLink;
	}
	this.getFinishTaskLink=function()
	{
		return finishTaskLink;
	}
	this.getRealtimeLink=function()
	{
		return realtimeLink;
	}
	this.GetdeliverToClientLink=function()
	{
		return delivertoClientLink;
	}
	this.getUplaodfileLink=function()
	{
		return uploadfilelink;
	}
	this.getDocumentslistLink=function()
	{
		return listdocumentsLink;
	}
	this.getAcceptContractLink=function()
	{
		return acceptContractLink;
	}
	this.getAcceptProjectContractLink=function()
	{
		return acceptProjectContractLink;
	}
	return this;
}]);
services.factory("Login",['$http','$location','$cookies',"$route","Links",
	function($http,$location,$cookies,$route,Links){
		var lastlink=null;
		var Admin_Access=["/login","/dashboard","/client","/teamprofile","/team","/messaging","/pdetails","/keybox","/stories"];
		var Client_Access=["/login","/dashboard","/cuser","/cuserprofile","/messaging","/pdetails","/keybox","/stories","/acceptcontract"];
		var KeyAccount_Access=["/login","/dashboard","/pdetails","/messaging","/client","/keybox","/stories"];
		var TeamLeader_Access=["/login","/dashboard","/pdetails","/messaging","/keybox","/stories"];
		var TeamMember_Access=["/login","/dashboard","/pdetails","/messaging","/keybox","/stories"];
		this.setLastLink=function(path)
		{
			this.lastlink=path;
		}
		this.contractSigned=function()
		{
			if(this.getLoggedUser()){
				var role=this.getLoggedUser().userinfo.roles[0];
				 if(role=="ROLE_CUSTOMER")
				 	if(!this.getLoggedUser().userinfo.signed)
				 	{
				 		$location.url("/acceptcontract?cid="+this.getLoggedUser().userinfo.id);
				 	}
			}
		}
		this.signContract=function(successFunc,failureFunc,customer_id)
		{
			var me=this;
			if(this.getLoggedUser())
			{
				$http({
					method:"GET", 
					url:Links.getAcceptContractLink()+"/"+customer_id,
					headers: {'x-crm-access-token': this.getLoggedUser().token.token}
				}).success(function (data, status, headers, config) {
					successFunc();
					me.logout(false);
	            }).error(function (data, status, headers, config) {
	            	if(status==403)
	            		me.logout();
	            	else
	            		failureFunc();
	            });
				
			}
		}
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
		this.logout=function(savelast){
			localStorage.removeItem("loggeduser");
			/*if(savelast===undefined || savelast==null)
			 {
			 	savelast=true;
			 }*/
			savelast=false;
			if(savelast)
			{
				var last=$location.path();
				$location.url('/login?last='+last);

			}
			else
				$location.url("/login");
			
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
			else if(role=="ROLE_TEAMLEADER")
			{
				if(TeamLeader_Access.indexOf(path)>0 )
					return true;
				else
					return false;
			}
			else if(role=="ROLE_KEYACCOUNT")
			{
				if(KeyAccount_Access.indexOf(path)>0 )
					return true;
				else
					return false;
			}
			else if(role=="ROLE_DEVELOPER" || role=="ROLE_DESIGNER" || role=="ROLE_TESTER" || role=="ROLE_SYSADMIN")
			{
				if(TeamMember_Access.indexOf(path)>0 )
					return true;
				else
					return false;
			}

		}
		this.isTokenExpired=function(successFunc)
		{
			var loggedUser=this.getLoggedUser();
			var me=this;
			if(loggedUser)
			{
				$http({
					method:"GET", 
					url:Links.getIsExpiredLink(),
					headers: {'x-crm-access-token': this.getLoggedUser().token.token}
				}).success(function (data, status, headers, config) {
					successFunc()
	            }).error(function (data, status, headers, config) {
	            	me.logout();
	            });
				
			}
			else
				$location.url("/login");

		}
		this.toUTCdate=function(d,offset)
		{
			return d.getTime() - (offset * 60000);
		}
		return this;

	}]);

services.factory("Team",['$http','$location','$cookieStore',"Login","Links",
	function($http,$location,$cookieStore,Login,Links){
		this.loadRoles=function(successFunc){ 
			if(localStorage.roles!=null)
			{
				successFunc(JSON.parse(localStorage.roles))
			}
			else{
				if(Login.getLoggedUser() && this.roles==null)
				{
					$http({
						method:"GET", 
						url:Links.getGetRolesLink(),
						headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
					}).success(function (data, status, headers, config) {
						localStorage.roles=JSON.stringify(data.Roles);
						successFunc(data.Roles);
		            }).error(function (data, status, headers, config) {
		            	if(status==403)
	        				Login.logout();
	        	
		            });
		        }
			}
			
		 }
	    this.getRoles=function()
	    {
	    	return JSON.parse(localStorage.roles);
	    }
		this.getAllteamMembers=function(funcsuccess,funcfailure)
		{
			if(Login.getLoggedUser())
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
	            	if(status==403)
        				Login.logout();
        	
	            });
	        }
		}
		this.getAlldevteamMembers=function(funcsuccess,funcfailure)
		{
			if(Login.getLoggedUser())
			{
				$http({
					method:"GET", 
					url:Links.getAllDevTeamMemberLink(),
					headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
				}).success(function (data, status, headers, config) {
					for(i=0;i<data.length;i++)
					{
						if(data[i].photo==null)
							data[i].photo="img/users/profile_default_small.jpg"
					}
	                funcsuccess(data);
	            }).error(function (data, status, headers, config) {
	            	if(status==403)
        				Login.logout();
        			else{
        				funcfailure();
        			}
        	
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
			if(Login.getLoggedUser())
			{

				$http({
					method:method, 
					url:link,
					data:member, 
					headers: {'Content-Type': 'application/json','x-crm-access-token': Login.getLoggedUser().token.token}
				}).success(function (data, status, headers, config) {
					successFunc();
				}).error(function (data, status, headers, config) {
					if(status==403)
        				Login.logout();
        			else
	            		failureFunc(data.errors);
	            });
			}
		}
		this.deleteTeamMember=function(link,member,successFunc,failureFunc)
		{
			if(Login.getLoggedUser())
			{

				$http({
					method:"delete", 
					url:link+"/"+member.id,
					headers: {'Content-Type': 'application/json','x-crm-access-token': Login.getLoggedUser().token.token}
				}).success(function (data, status, headers, config) {
					successFunc();
				}).error(function (data, status, headers, config) {
					if(status==403)
        				Login.logout();
        			else
	            		failureFunc(data.errors);
	            });
			}
		}
		this.uploadMemberImage=function(id,role,image,successFunc,failurefunc)
		{
			if(Login.getLoggedUser())
			{

				$http({
					method:"post", 
					url:Links.getImageUplaodLink()+"/"+id+"/"+role,
					data:image,
					headers: {'Content-Type': 'application/json','x-crm-access-token': Login.getLoggedUser().token.token}
				}).success(function (data, status, headers, config) {
					successFunc();
				}).error(function (data, status, headers, config) {
					if(status==403)
        				Login.logout();
        			else
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
		if(Login.getLoggedUser())
			{
				$http({
					method:"GET", 
					url:Links.getAccountManagersListLink()+"/"+page,
					headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
				}).success(function (data, status, headers, config) {
					
	                successFunc(data.users);
	            }).error(function (data, status, headers, config) {
	            	if(status==403)
        				Login.logout();
        			else
	            		failureFunc();
	            });
	        }
	}
	this.addClient=function(client,successFunc,failureFunc,method)
		{
			if(Login.getLoggedUser())
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
					if(status==403)
        				Login.logout();
        			else
	            		failureFunc(data.errors);
	            });
			}
		}
	this.getAllClients=function(successFunc,failureFunc,page)
	{
		if(Login.getLoggedUser())
			{
				$http({
					method:"GET", 
					url:Links.getListCustomersLink()+"/"+page,
					headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
				}).success(function (data, status, headers, config) {
					
	                successFunc(data.users,data.totalpages,data.current_page);
	            }).error(function (data, status, headers, config) {
	            	if(status==403)
        				Login.logout();
        	
	            	
	            });
	        }
	}
	this.deleteClient=function(client,successFunc,failureFunc)
		{
			if(Login.getLoggedUser())
			{

				$http({
					method:"delete", 
					url:Links.deleteCuserLink()+"/"+client.id,
					headers: {'Content-Type': 'application/json','x-crm-access-token': Login.getLoggedUser().token.token}
				}).success(function (data, status, headers, config) {
					successFunc();
				}).error(function (data, status, headers, config) {
					if(status==403)
        				Login.logout();
        			else
	            		failureFunc(data.errors);
	            });
			}
		}
	return this;
}]);
services.factory("Cuser",["$http",'Login','Links',function($http,Login,Links){
	this.addUser=function(user,successFunc,failureFunc,method)
		{
			if(Login.getLoggedUser())
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
					if(status==403)
        				Login.logout();
        			else
	            	failureFunc(data.errors);
	            });
			}
		}
		this.getAllUsers=function(successFunc,failureFunc,page)
		{
			if(Login.getLoggedUser())
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
		            	if(status==403)
        					Login.logout();
        	
		            });
		        }
		}
		this.deleteUser=function(user,successFunc,failureFunc)
			{
				if(Login.getLoggedUser())
				{

					$http({
						method:"delete", 
						url:Links.getdeleteCuserLink()+"/"+user.id,
						headers: {'Content-Type': 'application/json','x-crm-access-token': Login.getLoggedUser().token.token}
					}).success(function (data, status, headers, config) {
						successFunc();
					}).error(function (data, status, headers, config) {
						if(status==403)
        					Login.logout();
        				else
		            		failureFunc(data.errors);
		            });
				}
			}
		this.uploadCuserImage=function(id,image,successFunc,failurefunc)
		{
			if(Login.getLoggedUser())
			{

				$http({
					method:"post", 
					url:Links.getCuserUploadPhotoLink()+"/"+id,
					data:image,
					headers: {'Content-Type': 'application/json','x-crm-access-token': Login.getLoggedUser().token.token}
				}).success(function (data, status, headers, config) {
					successFunc();
				}).error(function (data, status, headers, config) {
					if(status==403)
        				Login.logout()
        			else
	            		failurefunc(data.errors);
	            });
			}
		}
		return this;
}])
services.factory('Params',function(){
	var teamMember=null;
	var cuser=null;
	var project=null;
	var ticket=null;
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
		},
		setProject:function(data){
			localStorage.project=JSON.stringify(data);
			project=data;

		},
		getProject:function(){
			if(project==null)
			{
				project=JSON.parse(localStorage.project);

			}
			return project;
		},
		setTicket:function(data){
			localStorage.ticket=JSON.stringify(data);
			ticket=data;

		},
		getTicket:function(){
			if(ticket==null)
			{
				ticket=JSON.parse(localStorage.ticket);

			}
			return ticket;
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
		if(Login.getLoggedUser())
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
		if(Login.getLoggedUser())
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
		if(Login.getLoggedUser())
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
		if(Login.getLoggedUser())
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
            	
            });
        }
	}
	this.getNewMessagesNumber=function(channel,successfunction,i,end)
	{
		if(Login.getLoggedUser())
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
            	
            });
        }
	}
	this.sendMessage=function(group,text,successFunc)
	{
		var me =this;
		if(Login.getLoggedUser())
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
            	
            });
        }

	}
	return this;
}]);
services.factory('Project',["$http","Login",'Links',function($http,Login,Links){
	this.acceptContract=function(successFunc,failureFunc,project_id){
		if(Login.getLoggedUser())
		{
			$http({
				method:"GET", 
				url:Links.getAcceptProjectContractLink()+"/"+project_id,
				headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
			}).success(function (data, status, headers, config) {
				successFunc();
				
            }).error(function (data, status, headers, config) {
            	if(status==403)
            		Login.logout();
            	else
            		failureFunc();
            });
			
		}
	}
	this.createProject=function(postdata,successfunc,failurefunc)
	{
		$http({
			method:"POST", 
			data:postdata,
			url:Links.getCreateProjectLink(),
			headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
		}).success(function (data, status, headers, config) {
			successfunc();
        }).error(function (data, status, headers, config) {
        	if(status==403)
        		Login.logout();
        	else
        		failurefunc();
        });
	}
	this.getAllproject=function(successfunc)
	{
		$http({
			method:"GET", 
			url:Links.getListProjectLink()+"/1/all",
			headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
		}).success(function (data, status, headers, config) {
			successfunc(data);
        }).error(function (data, status, headers, config) {
        	if(status==403)
        		Login.logout();
        	
        });
	}
	this.getProjectDetails=function(project_id,successFunc,failureFunc)
	{
		$http({
			method:"GET", 
			url:Links.getProjectDetailLink()+"/"+project_id,
			headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
		}).success(function (data, status, headers, config) {
			successFunc(data);
        }).error(function (data, status, headers, config) {
        	if(status==403)
        		Login.logout();
        	else
        		failureFunc("error");
        	
        });
	}

	this.assignTeamLeader=function(successFunc,failureFunc,data)
	{
		this.ProjectMember(Links.getAssignTealLeaderLink(),data,successFunc,failureFunc);
	}
	this.addDeveloper=function(successFunc,failureFunc,data)
	{
		this.ProjectMember(Links.getAddDeveloperLink(),data,successFunc,failureFunc);
	}
	this.addDesigner=function(successFunc,failureFunc,data)
	{
		this.ProjectMember(Links.getAddDesignerLink(),data,successFunc,failureFunc);
	}
	this.addTester=function(successFunc,failureFunc,data)
	{
		this.ProjectMember(Links.getAddTesterLink(),data,successFunc,failureFunc);
	}
	this.addSystemAdmin=function(successFunc,failureFunc,data)
	{
		this.ProjectMember(Links.getAddSysAdminLink(),data,successFunc,failureFunc);
	}
	this.deleteDeveloperFromProject=function(successFunc,failureFunc,data)
	{
		this.ProjectMember(Links.getDeleteDeveloperFromProjectLink(),data,successFunc,failureFunc);
	}
	this.deleteTesterFromProject=function(successFunc,failureFunc,data)
	{
		this.ProjectMember(Links.getDeleteTesterFromProjectLink(),data,successFunc,failureFunc);
	}
	this.deleteDesignerFromProject=function(successFunc,failureFunc,data)
	{
		this.ProjectMember(Links.getDeleteDesignerFromProjectLink(),data,successFunc,failureFunc);
	}
	this.deleteSysAdminFromProject=function(successFunc,failureFunc,data)
	{
		this.ProjectMember(Links.getDeleteSysAdminFromProjectLink(),data,successFunc,failureFunc);
	}
	this.ProjectMember=function(url,data,successFunc,failureFunc)
	{
		$http({
			method:"POST", 
			url:url,
			data:data,
			headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
		}).success(function (data, status, headers, config) {

			successFunc(data);

        }).error(function (data, status, headers, config) {
        	if(status==403)
        		Login.logout();
        	else
        		failureFunc("error");
        	
        });
	}
	this.assignProjectBudget=function(successFunc,failureFunc,data)
	{
		if(Login.getLoggedUser())
		{
			$http({
				method:"POST", 
				url:Links.getAssignBudgetLink(),
				data:data,
				headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
			}).success(function (data, status, headers, config) {

				successFunc(data);

	        }).error(function (data, status, headers, config) {
	        	if(status==403)
	        		Login.logout();
	        	else
	        		failureFunc("error");
	        	
	        });
	    }
	}
	return this;
}
]);
services.factory('KeyBox', ["$http","Login","Links",function ($http,Login,Links) {
	this.getProjectConfigs=function(project_id,successFunc,failureFunc)
	{
		
		if(Login.getLoggedUser())
		{
			var me =this;
			$http({
				method:"GET", 
				url:Links.getProjectConfigsListLink()+"/"+project_id,
				headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
			}).success(function (data, status, headers, config) {
                successFunc(data);
            }).error(function (data, status, headers, config) {
            	if(status==403)
            		Login.logout();
            	else
            		failureFunc(data.error);
            });
        }
	}
	this.deleteProjectConfig=function(successFunc,failureFunc,config_id)
	{
		if(Login.getLoggedUser())
		{
			var me =this;
			$http({
				method:"DELETE", 
				url:Links.getDeleteProjectConfigLink()+"/"+config_id,
				headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
			}).success(function (data, status, headers, config) {
                successFunc(data);
            }).error(function (data, status, headers, config) {
            	if(status==403)
            		Login.logout();
            	else
            		failureFunc(data.error);
            });
        }
	}
	this.createProjectConfig=function(successFunc,failureFunc,data)
	{
		if(Login.getLoggedUser())
		{
			var me =this;
			$http({
				method:"POST", 
				url:Links.getCreateProjectConfigLink(),
				data:data,
				headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
			}).success(function (data, status, headers, config) {
                successFunc(data);
            }).error(function (data, status, headers, config) {
            	if(status==403)
            		Login.logout();
            	else
            		failureFunc(data.error);
            });
        }
	}
	this.updateProjectConfig=function(successFunc,failureFunc,data)
	{
		if(Login.getLoggedUser())
		{
			var me =this;
			$http({
				method:"PUT", 
				url:Links.getUpdateProjectConfigLink(),
				data:data,
				headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
			}).success(function (data, status, headers, config) {
                successFunc(data);
            }).error(function (data, status, headers, config) {
            	if(status==403)
            		Login.logout();
            	else
            		failureFunc(data.error);
            });
        }
	}
	return this;
}]);
services.service('Ticket', ["$http","Login","Links",function ($http,Login,Links) {
	
	this.ticketypes=null;
	this.ticketstatus={
		"All":{"status":"all","text":"All status"},
		"Draft":{"status":"draft","text":"Draft"},
		"Estimation":{"status":"estimation","text":"Estimation"},
		"Goproduction":{"status":"goproduction","text":"Go production"},
		"Waiting":{"status":"waiting","text":"Waiting"},
		"Production":{"status":"production","text":"Production"},
		"Testing":{"status":"testing","text":"Testing"},
		"Accept":{"status":"accept","text":"Accept"},
		"Reject":{"status":"reject","text":"Reject"},
		"Done":{"status":"done","text":"Done"},
		toArray:function(){
			return [this.All,this.Draft,this.Estimation,this.Goproduction,this.Waiting,this.Production,this.Accept,this.Reject,this.Done];
		}
	}
	var me=this;
	this.loadTicketTypes=function(successFunc)
	{
		
		if(Login.getLoggedUser())
			{
				if(localStorage.tickettypes==null)
				{
					$http({
						method:"GET", 
						url:Links.getTicketTypesLink(),
						headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
					}).success(function (data, status, headers, config) {
						localStorage.ticketypes=JSON.stringify(data);
						successFunc(data);
		            }).error(function (data, status, headers, config) {
		            	if(status==403)
	        				Login.logout();
	        	
		            });
		        }
		        else
		        	successFunc(JSON.parse(localStorage.ticketypes));
	        }
	}
	this.getTicketTypes=function()
	{
		return JSON.parse(localStorage.ticketypes);
	}
	this.createTicket=function(successFunc,failureFunc,data)
	{
		if(Login.getLoggedUser())
			{
				$http({
					method:"POST", 
					data:data,
					url:Links.getCreateTicketLink(),
					headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
				}).success(function (data, status, headers, config) {
					successFunc();
	            }).error(function (data, status, headers, config) {
	            	if(status==403)
        				Login.logout();
        			else
        				failureFunc();

        	
	            });
	        }	
	}
	this.getTicketList=function(successFunc,failureFunc,project_id)
	{
		if(Login.getLoggedUser())
		{
			$http({
				method:"GET", 
				url:Links.getTicketListLink()+"/"+project_id,
				headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
			}).success(function (data, status, headers, config) {
				successFunc(data);
            }).error(function (data, status, headers, config) {
            	if(status==403)
    				Login.logout();
    			else
    				failureFunc();

    	
            });
        }	
	}
	
	this.sendToClient=function(successFunc,failureFunc,ticket_id)
	{
		this.changeTicketStatus(successFunc,failureFunc,ticket_id,Links.GetSendToClientLink());
	}
	this.sendToProd=function(successFunc,failureFunc,ticket_id)
	{
		this.changeTicketStatus(successFunc,failureFunc,ticket_id,Links.GetSendToProdLink());
	}
	this.deliverToClient=function(successFunc,failureFunc,ticket_id)
	{
		this.changeTicketStatus(successFunc,failureFunc,ticket_id,Links.GetdeliverToClientLink());
	}
	this.startEstimation=function(successFunc,failureFunc,ticket_id)
	{
		this.changeTicketStatus(successFunc,failureFunc,ticket_id,Links.getStartEstimationLink());
	}
	this.acceptEstimation=function(successFunc,failureFunc,ticket_id)
	{
		this.changeTicketStatus(successFunc,failureFunc,ticket_id,Links.getAcceptEstimationLink());
	}
	this.rejectEstimation=function(successFunc,failureFunc,ticket_id)
	{
		this.changeTicketStatus(successFunc,failureFunc,ticket_id,Links.getRejectEstimationLink());
	}
	this.acceptTicket=function(successFunc,failureFunc,ticket_id)
	{
		this.changeTicketStatus(successFunc,failureFunc,ticket_id,Links.getAcceptTicketLink());
	}
	this.rejectTicket=function(successFunc,failureFunc,data){
		if(Login.getLoggedUser())
		{
			$http({
				method:"POST", 
				url:Links.getRejectionTicketLink(),
				data:data,
				headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
			}).success(function (data, status, headers, config) {
				successFunc();
            }).error(function (data, status, headers, config) {
            	if(status==403)
    				Login.logout();
    			else
    				failureFunc();

    	
            });
        }	
	}
	this.updateTicket=function(successFunc,failureFunc,data)
	{
		if(Login.getLoggedUser())
			{
				$http({
					method:"PUT", 
					data:data,
					url:Links.getUpdateTicketLink(),
					headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
				}).success(function (data, status, headers, config) {
					successFunc();
	            }).error(function (data, status, headers, config) {
	            	if(status==403)
        				Login.logout();
        			else
        				failureFunc();

        	
	            });
	        }	
	}
	this.deleteTicket=function(successFunc,failureFunc,ticket_id){
		if(Login.getLoggedUser())
		{
			$http({
				method:"DELETE", 
				url:Links.getDeleteTicketLink()+"/"+ticket_id,
				headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
			}).success(function (data, status, headers, config) {
				successFunc();
            }).error(function (data, status, headers, config) {
            	if(status==403)
    				Login.logout();
    			else
    				failureFunc();

    	
            });
        }
	}
	this.changeTicketStatus=function(successFunc,failureFunc,ticket_id,link)
	{
		if(Login.getLoggedUser())
		{
			$http({
				method:"GET", 
				url:link+"/"+ticket_id,
				headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
			}).success(function (data, status, headers, config) {
				successFunc(data);
            }).error(function (data, status, headers, config) {
            	if(status==403)
    				Login.logout();
    			else
    				failureFunc();

    	
            });
        }	
	}
}]);
services.service('Task', ["$http","Login","Links",function ($http,Login,Links) {
	this.craeteTask=function(successFunc,failureFunc,data)
	{
		this.execute(successFunc,failureFunc,data,"POST",Links.getCreatetaskLink());
	}
	this.updateTask=function(successFunc,failureFunc,data)
	{
		this.execute(successFunc,failureFunc,data,"PUT",Links.getUpdatetaskLink());
	}
	
	this.setEstimation=function(successFunc,failureFunc,data)
	{
		this.execute(successFunc,failureFunc,data,"POST",Links.getEstimationLink());
	}
	this.setRealtime=function(successFunc,failureFunc,data)
	{
		this.execute(successFunc,failureFunc,data,"POST",Links.getRealtimeLink());
	}
	this.execute=function(successFunc,failureFunc,data,method,link)
	{
		if(Login.getLoggedUser())
		{
			var me =this;
			$http({
				method:method, 
				url:link,
				data:data,
				headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
			}).success(function (data, status, headers, config) {
                successFunc(data);
            }).error(function (data, status, headers, config) {
            	if(status==403)
            		Login.logout();
            	else
            		failureFunc(data.error);
            });
        }
	}
	this.getAllTasks=function(successFunc,failureFunc,ticket_id)
	{
		if(Login.getLoggedUser())
		{
			var me =this;
			$http({
				method:"GET", 
				url:Links.getListTasksLink()+"/"+ticket_id,
				headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
			}).success(function (data, status, headers, config) {
                successFunc(data);
            }).error(function (data, status, headers, config) {
            	if(status==403)
            		Login.logout();
            	else
            		failureFunc(data.error);
            });
        }
	}
	this.startTask=function(successFunc,failureFunc,task_id)
	{
		if(Login.getLoggedUser())
		{
			var me =this;
			$http({
				method:"GET", 
				url:Links.getStartTaskLink()+"/"+task_id,
				headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
			}).success(function (data, status, headers, config) {
                successFunc(data);
            }).error(function (data, status, headers, config) {
            	if(status==403)
            		Login.logout();
            	else
            		failureFunc(data.error);
            });
        }
	}
	this.finishTask=function(successFunc,failureFunc,task_id)
	{
		if(Login.getLoggedUser())
		{
			var me =this;
			$http({
				method:"GET", 
				url:Links.getFinishTaskLink()+"/"+task_id,
				
				headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
			}).success(function (data, status, headers, config) {
                successFunc(data);
            }).error(function (data, status, headers, config) {
            	if(status==403)
            		Login.logout();
            	else
            		failureFunc(data.error);
            });
        }
	}
	this.deleteTask=function(successFunc,failureFunc,task_id)
	{
		if(Login.getLoggedUser())
		{
			var me =this;
			$http({
				method:"DELETE", 
				url:Links.getDeleteTaskLink()+"/"+task_id,
				headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
			}).success(function (data, status, headers, config) {
                successFunc(data);
            }).error(function (data, status, headers, config) {
            	if(status==403)
            		Login.logout();
            	else
            		failureFunc(data.error);
            });
        }
	}
	this.uploadFile=function(successFunc,failureFunc,data,project_id)
	{
		if(Login.getLoggedUser())
		{
			var me =this;
			$http({
				method:"POST", 
				url:Links.getUplaodfileLink()+"/"+project_id,
				transformRequest: angular.identity,
				data:data,
				headers: {'x-crm-access-token': Login.getLoggedUser().token.token,'Content-Type': undefined}
			}).success(function (data, status, headers, config) {
                successFunc(data);
            }).error(function (data, status, headers, config) {
            	if(status==403)
            		Login.logout();
            	else
            		failureFunc(data.error);
            });
        }
	}
	this.listFiles=function(successFunc,project_id)
	{
		
		if(Login.getLoggedUser())
		{
			var me =this;
			$http({
				method:"GET", 
				url:Links.getDocumentslistLink()+"/"+project_id,
				headers: {'x-crm-access-token': Login.getLoggedUser().token.token}
			}).success(function (data, status, headers, config) {
                successFunc(data);
            }).error(function (data, status, headers, config) {
            	if(status==403)
            		Login.logout();
            });
        }
	}
}]);