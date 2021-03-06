var Controllers=angular.module('Controllers',[]);
Controllers.controller('LoginCtrl',['$scope','Login','$location',
	function LoginCtrl($scope,Login,$location){
		$scope.stayloggedin=false;
		$scope.loginFunction=function()
		{
			$('#loginbtn').prop('disabled', true);
			var login =$scope.login;
			var password=$scope.password;
			if(login!=undefined && password!=undefined)
			{
				var successfunc=function(){

					$location.path('/dashboard');
					$scope.errors="";
					if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSTOMER" || Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSER"){
						window.Intercom("boot", {
						   app_id: "bf90791k",
						   name: Login.getLoggedUser().userinfo.name+" "+Login.getLoggedUser().userinfo.surname,
						   email: Login.getLoggedUser().userinfo.email, // Email address
						   created_at: new Date().getTime() // Signup date as a Unix timestamp
						});
					}
				};
				var failureFunction=function(mess)
				{
					$scope.errors=mess;
					$('#loginbtn').prop('disabled', false);
				};
				console.log($scope.stayloggedin);
				Login.doLogin(login,password,$scope.stayloggedin,successfunc,failureFunction);
			}
			else if(login===undefined && password!=undefined)
			{

				$scope.errors="Please enter a login";
			}
			else if(password=="" && login!="")
			{
				$scope.errors="Please enter a login";
			}
			else if(password===undefined && login===undefined)
				$scope.errors="Please enter a login and password";

		}
}]);
Controllers.controller("MenuNavCtrl",['$scope','Login',function ($scope,Login){
	if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSTOMER" || Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSER"){
		$scope.showcontact=true;
		if(Login.getLoggedUser().userinfo.keyaccount.photo==null)
			Login.getLoggedUser().userinfo.keyaccount.photo="img/users/profile_default_small.jpg";
		$scope.keyaccount=Login.getLoggedUser().userinfo.keyaccount;
	}

	$scope.logout=function(){
		Login.logout(false);
	}
	$scope.menuCollapse=function()
	{
		$("body").toggleClass("mini-navbar");
	}

}]);
Controllers.controller("SideBarCtrl",['$rootScope','$scope','Login','Chat','Client','Project','$location','Cuser',"Params","Team",
	function SideBarCtrl($rootScope,$scope,Login,Chat,Client,Project,$location,Cuser,Params,Team)
	{

		if($location.path()=="/pdetails")
		{
			$scope.projectactive=true;
		}
		if($location.path()=="/messaging")
		{
			$scope.messageactive=true;
		}
		if($location.path()=="/team")
		{
			$scope.teamactive=true;
		}
		if($location.path()=="/client")
		{
			$scope.clientactive=true;
		}
		if($location.path()=="/cuser")
		{
			$scope.cuseractive=true;
		}
		if($location.path()=="/report")
		{
			$scope.reportactive=true;
		}
		if($location.path()=="/partners")
		{
			$scope.partneractive=true;
		}
		if($location.path()=="/admin/credit")
		{
			$scope.adcommactive=true;
		}
		if($location.path()=="/credit")
		{
			$scope.adcommactive=true;
		}
		$scope.isclient=false;
		$scope.isClientUser=false;
		$scope.noJiraAccount=true;
		$scope.isCreating = false;
		if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSTOMER"){
			$scope.isclient=true;
			if(Login.getLoggedUser().userinfo.pmtools.length >0)
			{
				if(Login.getLoggedUser().userinfo.pmtools.indexOf("Jira") > -1)
				{
					$scope.noJiraAccount=false;
				}
			}
		}
		else if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSER")
		{
			$scope.isClientUser=true;
		}
		else if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_ADMIN")
		{
			$scope.isAdmin=true;
		}
		else if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_KEYACCOUNT")
		{
			$scope.isKeyAccount=true;
			if(Login.getLoggedUser().userinfo.roles.indexOf("ROLE_PARTNER"))
				$scope.isPartner = true;
		}
		else
		{
			$scope.isMember=true;
		}
		$scope.totalmessages=0;
		var getnewMessagesNumber=function()
		{
			var channels =new Array();
			for(i=0;i<$scope.channels.length;i++)
			{
				channels.push({"group_id":$scope.channels[i].id});
			}
			var data={"groups":channels};
			var successfunc=function(data)
			{
				$scope.totalmessages=data.total;
				for(i=0;i<$scope.channels.length;i++)
				{
					for(j=0;j<data.groups.length;j++)
					{
						if(data.groups[j].group_id==$scope.channels[i].id)
							$scope.channels[i].newmessages=data.groups[j].count;
					}
				}
			}

			Chat.getNewMessagesNumber(data,successfunc);
		}
		var getprojects=function()
		{
			var successfunc=function(data)
			{
				$scope.channels=data.channels;
				$scope.projects=data.projects;
				if($scope.isAdmin || $scope.isClientUser || $scope.isclient)
				{
					getnewMessagesNumber();
					var newmessagesinterval=setInterval(getnewMessagesNumber, 50000);
					$scope.$on('$routeChangeStart',function(){
						clearInterval(newmessagesinterval);
					});
				}

			}
			Project.getAllproject(successfunc);
		}
		getprojects();
		$scope.openEditProfil=function(chargeView)
		{
			var userinfo=Login.getLoggedUser().userinfo;
			if($scope.isclient || $scope.isClientUser)
			{
				if(chargeView){
					$("#client_phone_code").select2("val",userinfo.phonecode);

					$scope.client_name=userinfo.name;
					$scope.client_surname=userinfo.surname;
					$scope.client_phonecode=userinfo.phonecode;
					$scope.client_phonenumber=userinfo.telnumber;
					$scope.client_login=userinfo.email;
					if($scope.isclient){
						$("#client_company_country").select2("val",userinfo.address.country);
						$scope.client_company_name=userinfo.compnay_name;
						$scope.client_company_country=userinfo.address.country;
						$scope.client_company_address=userinfo.address.address;
						$scope.client_company_city=userinfo.address.city;
						$scope.client_zipcode=userinfo.address.zipcode;

					}
					if($scope.isClientUser)
					{
						$scope.client_jobtitle=userinfo.title;
					}
				}
				$("#edit-profile-client").modal("show");
			}
			if($scope.isPartner)
			{
				if(chargeView)
				{
					$("#partner_phonecodeselect").select2("val",userinfo.phonecode);
					$scope.partner_name=userinfo.name;
					$scope.partner_surname=userinfo.surname;
					$scope.partner_phonecode=userinfo.phonecode;
					$scope.partner_phonenumber=userinfo.telnumber;
					$scope.partner_email=userinfo.email;
					$("#partner_countryselect").select2("val",userinfo.country);
					$scope.partner_companyname=userinfo.compnay_name;
					$scope.partner_country=userinfo.country;
					$scope.partner_city=userinfo.city;
					$scope.partner_language = userinfo.languages.split(',');
					$("#partner_luanguageselect").select2("val",userinfo.languages.split(','));;
					$("#edit-partner-profile").modal("show");
				}
			}
		}
		var varifypasswordForm=function()
		{
			messages=new Array();
			if($scope.current_password===undefined)
			{
				messages.push("Please add your current password");
			}
			if($scope.new_password===undefined)
			{
				messages.push("Please add your new password");
			}
			if($scope.repeat_new_password===undefined)
			{
				messages.push("Please re-tape your new password");
			}
			if($scope.repeat_new_password!=undefined && $scope.new_password!=undefined && $scope.new_password!=$scope.repeat_new_password)
			{
				messages.push("Passwords miss match");
			}
			return messages;
		}
		$scope.changePassword=function()
		{
			var messages =varifypasswordForm();
			if(messages.length>0)
			{
				swal("Please fill all information",messages.join("\n"),"warning");
			}
			else
			{
				var successfunc=function()
				{
					swal("Password updated successfully","Password updated successfully","success");
					$scope.openEditProfil(false);
					$("#change-password").modal("hide");
				}
				var failureFunction=function(mesg)
				{
					swal("Oops something bad happen",mesg,"error");
				}
				var data={
					"login":Login.getLoggedUser().userinfo.email,
					"new_password":$scope.new_password,
					"current_password":$scope.current_password
				}
				Login.changePassword(data,successfunc,failureFunction);
			}
		}
		var verifyClientForm=function()
		{
			var messages =[];
			if($scope.client_surname===undefined)
			{
				messages.push("Please fill the surname");
			}
			if($scope.client_name===undefined)
			{
				messages.push("Please fill the name");
			}
			if($scope.client_phonecode===undefined)
			{
				messages.push("Please fill the phone code");
			}
			if($scope.client_phonenumber===undefined)
			{
				messages.push("Please fill the phone number");
			}
			if($scope.client_login===undefined)
			{
				messages.push("Please fill the email");
			}
			if($scope.client_company_city===undefined && $scope.isclient)
			{
				messages.push("Please fill the city");
			}
			if($scope.client_company_country===undefined && $scope.isclient)
			{
				messages.push("Please fill the country");
			}
			if($scope.client_company_name===undefined && $scope.isclient)
			{
				messages.push("Please fill the compnay name");
			}

			if($scope.client_company_address===undefined && $scope.isclient)
			{
				messages.push("Please fill the address field");
			}
			if($scope.client_zipcode===undefined && $scope.isclient)
			{
				messages.push("Please fill the zipcode field");
			}
			if($scope.client_jobtitle===undefined && $scope.isClientUser)
			{
				messages.push("Please fill the job title field");
			}

			return messages;
		}
		$scope.updateClientProfil=function()
		{
			var messages=verifyClientForm();
			if(messages.length>0)
			{

				swal("Please fill all information",messages.join("\n"),"warning");
			}
			else{
				var failureFunction=function(msg)
				{
					swal("Oops!!", msg, "error");
				}
				var succesfunc=function(msg)
				{
					var user=Login.getLoggedUser();
					user.userinfo.name=$scope.client_name;
					user.userinfo.surname=$scope.client_surname;
					user.userinfo.phonecode=$scope.client_phonecode;
					user.userinfo.telnumber=$scope.client_phonenumber;
					user.userinfo.email=$scope.client_login;
					if($scope.isclient){
						user.userinfo.compnay_name=$scope.client_company_name;
						user.userinfo.address.country=$scope.client_company_country;					
						user.userinfo.address.address=$scope.client_company_address;
						user.userinfo.address.city=$scope.client_company_city;
						user.userinfo.address.zipcode=$scope.client_zipcode;
					}
					$scope.name=user.userinfo.name;
					$scope.surname=user.userinfo.surname;
					$scope.company=user.userinfo.compnay_name;
					Login.upadteLoggedinUser(user);
					$("#edit-profile-client").modal("hide");
				}
				var client={
					"id":Login.getLoggedUser().userinfo.id,
					"email":$scope.client_login,
					"login":$scope.client_login,
					"name":$scope.client_name,
					"surname":$scope.client_surname,
					"phonecode":$scope.client_phonecode

				};
				if($scope.isclient)
				{
					client.address={
					"city":$scope.client_company_city,
					"country":$scope.client_company_country,
					"address":$scope.client_company_address,
					"zipcode":$scope.client_zipcode
					};
					client.companyname=$scope.client_company_name;
					client.telnumber=$scope.client_phonenumber;
					Client.addClient(client,succesfunc,failureFunction,"PUT");
				}
				if($scope.isClientUser)
				{
					client.title=$scope.client_jobtitle;
					client.phonenumber=$scope.client_phonenumber;
					Cuser.addUser(client,succesfunc,failureFunction,"PUT");
				}
			}

		}
		var validatePartnerForm=function()
		{
			var messages =[];
			if($scope.partner_surname===undefined)
			{
				messages.push("Please fill the surname");
			}
			if($scope.partner_name===undefined)
			{
				messages.push("Please fill the name");
			}
			if($scope.partner_phonecode===undefined)
			{
				messages.push("Please fill the phone code");
			}
			if($scope.partner_phonenumber===undefined)
			{
				messages.push("Please fill the phone number");
			}
			if($scope.partner_email===undefined)
			{
				messages.push("Please fill the email");
			}
			if($scope.partner_city===undefined)
			{
				messages.push("Please fill the city");
			}
			if($scope.partner_country===undefined)
			{
				messages.push("Please fill the country");
			}
			if($scope.partner_language===undefined)
			{
				messages.push("Please fill the language");
			}
			return messages;

		}
		$scope.updatePartnerProfile=function()
		{
			var messages=validatePartnerForm();
			if(messages.length>0)
			{

				swal("Please Fill missing information",messages.join('\n'),"warning");
			}
			else
			{
				var succesfunc=function()
				{
					var user=Login.getLoggedUser();
					user.userinfo.name=$scope.partner_name;
					user.userinfo.surname=$scope.partner_surname;
					user.userinfo.phonecode=$scope.partner_phonecode;
					user.userinfo.telnumber=$scope.partner_phonenumber;
					user.userinfo.email = $scope.partner_email;
					user.userinfo.compnay_name = $scope.partner_companyname;
					user.userinfo.city = $scope.partner_city;
					user.userinfo.country = $scope.partner_country;
					user.userinfo.languages = ""+$scope.partner_language;
					Login.upadteLoggedinUser(user);
					$scope.name=user.userinfo.name;
					$scope.surname=user.userinfo.surname;
					$scope.company=user.userinfo.compnay_name;
					$("#edit-partner-profile").modal("hide");
					
				}
				var failureFunction=function(msg)
				{
					swal("Oops!","Can't add team member please try again later","error");
				}
				var member={
					"email":$scope.partner_email,
					"login":$scope.partner_email,
					"name":$scope.partner_name,
					"surname":$scope.partner_surname,
					"phonecode":$scope.partner_phonecode,
					"phonenumber":$scope.partner_phonenumber,
					"city":$scope.partner_city,
					"country":$scope.partner_country,
					"language":""+$scope.partner_language,
					"ispartner":true
				};
				if($scope.partner_companyname!="")
					member.companyname=$scope.partner_companyname;
				member["id"]=Login.getLoggedUser().userinfo.id;
				Team.updateKeyAccount(member,succesfunc,failureFunction);
				
			}
		}
		$scope.openclosetab=function(id)
		{
			$('#'+id).toggleClass("in");
		}
		var userinf= Login.getLoggedUser().userinfo;
		$scope.name=userinf.name;
		$scope.surname=userinf.surname;
		if(userinf.compnay_name!=undefined)
			$scope.company=userinf.compnay_name;
		else
			$scope.company="flexwork";
		$scope.title=userinf.title;
		$scope.logout=function(){
			Login.logout();
		}
		var openAddprojectModal=function()
		{
			var succsfunc=function(data)
				{
					$scope.skills=data;
				}
				Params.getSkills(succsfunc);
			if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_ADMIN" || Login.getLoggedUser().userinfo.roles[0]=="ROLE_KEYACCOUNT" )
			{
				$scope.canAdd=true;

				var successfunc =function(customers)
				{
					$scope.clients=customers;

					if(customers.length>0){
						var selectdata={"id":0,text:customers[0].companyname};
						$("#clientselection").select2("data",selectdata);
						$scope.selectedClient=customers[0].id;
					}
					else
					{
						$scope.clients={};
						var selectdata={"id":0,text:"No Clients found"};
						$("#clientselection").select2("data",selectdata);
						$scope.selectedClient=null;
					}


				}
				failurefunc=function(data)
				{
					$scope.clients={};
					var selectdata={"id":0,text:"No client found"};
					$("#clientselection").select2("data",selectdata);
					$scope.selectedClient=null;
				}

				Client.getAllClients(successfunc,failurefunc,1);
				$("#clientSelectionArea").show();
			}
			else
			{

				$("#clientSelectionArea").hide();
			}

			$("#add-project").modal('show');

		}
		$scope.$on('openProjectModal', function(event, args) {
			openProjectModal();

		});
		$scope.openAddprojectModel=openAddprojectModal;

		var verifyForm=function()
		{
			var messages=new Array();
			if($scope.projecttitle===undefined)
			{
				messages.push("Please add the project title</br>");

			}
			if($scope.briefing===undefined)
			{
				messages.push("Please add the project description</br>");

			}
			if($scope.projectskills===undefined)
			{
				messages.push("Please add the project required skills</br>");

			}
			if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_ADMIN" || Login.getLoggedUser().userinfo.roles[0]=="ROLE_KEYACCOUNT")
			{
				if($scope.selectedClient===undefined || $scope.selectedClient===null)
				{
					messages.push("Please choose a client</br>");

				}
			}
			return messages;
		}
		$scope.createProject=function()
		{
			var messages =verifyForm();
			if(messages.length>0)
			{
				swal("Complete information",messages,"info");
			}
			else
			{
				$scope.isCreating = true;
				var project={
					"name":$scope.projecttitle,
					"briefing":$scope.briefing,
					"skills":""+$scope.projectskills
				}
				if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_ADMIN" || Login.getLoggedUser().userinfo.roles[0]=="ROLE_KEYACCOUNT")
				{
					project.customer_id=$scope.selectedClient;
				}
				var successFunc=function()
				{
					$("#add-project").modal('hide');
					swal("Project Created", "Project added successfully", "success");
					$scope.isCreating = false;
					getprojects();
				}
				var failureFunc=function()
				{
					$scope.isCreating = false;
					swal("Oops!!", "Something bad happend please try again later", "error");
				}
				Project.createProject(project,successFunc,failureFunc);
			}
		}
		verifyJiraForm=function()
		{
			var messages = [];
			if($scope.jira_url==="" || $scope.jira_url === undefined)
				messages.push("Please enter jira account link");
			if($scope.jira_login==="" || $scope.jira_login === undefined)
				messages.push("Please enter jira account login");
			if($scope.Jira_passeword==="" || $scope.Jira_password === undefined)
				messages.push("Please enter jira account password");
			return messages;
		}
		$scope.saveJiraAccount=function()
		{
			var messages = verifyJiraForm();
			if(messages.length >0)
			{
				swal("missing info",messages.join('\n'),"warning");
			}
			else
			{
				var data = {
					"link": $scope.jira_url,
					"creds": $scope.jira_login+":"+$scope.Jira_password
				}
				var errorfunc = function(status)
				{
					if(status === 401)
						swal("Account not valid","The account information are not valid","error");
					if(status === 400)
						swal("Missing information","You entred missing information","error");
					else
						swal("Server error","Server error please try again later","error");
				}
				var succsfunc =function()
				{
					$scope.noJiraAccount=false;
					$scope.openEditProfil(false);
					var user = Login.getLoggedUser();
					user.userinfo.pmtools.push("Jira");
					Login.upadteLoggedinUser(user);
					$("#jira_form").modal("hide");

				}
				var client_id = Login.getLoggedUser().userinfo.id;
				var client_token = Login.getLoggedUser().token.token;
				Client.linkJiraAccount(succsfunc,errorfunc,client_id,client_token,data);
			}
		}
		$scope.unlikJiraAccount = function()
		{
			var errorfunc = function(status)
			{
				if(status === 401)
					swal("Account not valid","The account information are not valid","error");
				if(status === 400)
					swal("Missing information","You entred missing information","error");
				else
					swal("Server error","Server error please try again later","error");
			}
			var succsfunc =function()
			{
				swal("Success","Account deleted successfully","success");
				$scope.noJiraAccount=true;
				var user = Login.getLoggedUser();
				var index = user.userinfo.pmtools.indexOf("Jira");
				user.userinfo.pmtools.splice(index,1);
				Login.upadteLoggedinUser(user);
			}
			var client_id = Login.getLoggedUser().userinfo.id;
			var client_token = Login.getLoggedUser().token.token;
			Client.unlinkJiraAccount(succsfunc,errorfunc,client_id,client_token);
		}
	}
]);
Controllers.controller('TeamCtrl', ['$scope','Team','Params','$location', function ($scope,Team,Params,$location) {


    $scope.tab="operations";
    var d = new Date();
    $scope.selectedMonth=""+(d.getMonth()+1);;

    $scope.isoperation=true;
    $scope.isexpertise=false;
    $scope.week1=new Array();
	$scope.week2=new Array();
	$scope.week3=new Array();
	$scope.week4=new Array();
	$scope.week5=new Array();
	var roles=null;
	$scope.send=false;
	$scope.$on('$viewContentLoaded', function(){

	    Team.loadRoles(function(data)
		{
			roles=data;
		});
		Team.getAllteamMembers(successfunc);

  	});


    $scope.stateChanged=function()
	{
		if($scope.send)
		{
			$scope.send=false;
		}
		else
			$scope.send=true;
	}
    $scope.selectOperation=function()
    {
    	$scope.tab="operations";
    	$scope.isoperation=true;
    	$scope.isexpertise=false;
    	$scope.isperformance=false;
    }
    $scope.selectExpertise=function()
    {
    	$scope.tab="expertise";
    	$scope.isexpertise=true;
    	$scope.isoperation=false;
    	$scope.isperformance=false;

    }
    $scope.selectPerformance=function()
    {
    	$scope.tab="performance";
    	$scope.isexpertise=false;
    	$scope.isoperation=false;
    	$scope.isperformance=true;
    	$('#monthlyselect').select2();

    }
    $scope.selectWeek=function(week)
    {
    	if(week==1){
    		$scope.selectedweek=$scope.week1;
    		$scope.week1selected=true;
    		$scope.week2selected=false;
    		$scope.week3selected=false;
    		$scope.week4selected=false;
    		$scope.week5selected=false;
    	}
    	if(week==2){
    		$scope.selectedweek=$scope.week2;
    		$scope.week1selected=false;
    		$scope.week2selected=true;
    		$scope.week3selected=false;
    		$scope.week4selected=false;
    		$scope.week5selected=false;
    	}
    	if(week==3){
    		$scope.selectedweek=$scope.week3;
    		$scope.week1selected=false;
    		$scope.week2selected=false;
    		$scope.week3selected=true;
    		$scope.week4selected=false;
    		$scope.week5selected=false;
    	}
    	if(week==4){
    		$scope.selectedweek=$scope.week4;
    		$scope.week1selected=false;
    		$scope.week2selected=false;
    		$scope.week3selected=false;
    		$scope.week4selected=true;
    		$scope.week5selected=false;
    	}
    	if(week==5){
    		$scope.selectedweek=$scope.week5;
    		$scope.week1selected=false;
    		$scope.week2selected=false;
    		$scope.week3selected=false;
    		$scope.week4selected=false;
    		$scope.week5selected=true;
    	}
    }
    weekCreation=function(week)
	{
		weekdata=new Array();
		for(h=0;h<7;h++)
		{
			found=false;
			for(j=0;j<week.days.length;j++)
			{
				if((week.days[j].dayofweek-1)==h)
				{
					weekdata[h]=week.days[j].totalhours;
					found=true;
				}

			}
			if(!found)
			{
				weekdata[h]=0;
			}
		}
		return weekdata;
	}
	createEmptyWeek=function()
	{
		week=new Array(7);
		for(h=0;h<7;h++)
		{
			week[h]=0;
		}
		return week;
	}
	var createWeekPerformance=function(data)
	{
		$scope.week1=new Array();
		$scope.week2=new Array();
		$scope.week3=new Array();
		$scope.week4=new Array();
		$scope.week5=new Array();
		for(i=0;i<data.length;i++)
		{
			if(data[i].workeddays!=undefined)
			{
				if(data[i].workeddays.week1!=undefined)
				{
					week1=weekCreation(data[i].workeddays.week1);
					$scope.week1.push({"data":week1,"total":data[i].workeddays.week1.weekhours,"performance":data[i].workeddays.week1.weekperformance});
				}
				else
				{
					week1=createEmptyWeek();
					$scope.week1.push({"data":week1,"total":0,"performance":0});
				}


				if(data[i].workeddays.week2!=undefined)
				{
					week2=weekCreation(data[i].workeddays.week2);
					$scope.week2.push({"data":week2,"total":data[i].workeddays.week2.weekhours,"performance":data[i].workeddays.week2.weekperformance});
				}
				else
				{
					week2=createEmptyWeek();
					$scope.week2.push({"data":week2,"total":0,"performance":0});
				}

				if(data[i].workeddays.week3!=undefined)
				{
					week3=weekCreation(data[i].workeddays.week3);
					$scope.week3.push({"data":week3,"total":data[i].workeddays.week3.weekhours,"performance":data[i].workeddays.week3.weekperformance});
				}
				else
				{
					week3=createEmptyWeek();
					$scope.week3.push({"data":week3,"total":0,"performance":0});
				}

				if(data[i].workeddays.week4!=undefined)
				{
					week4=weekCreation(data[i].workeddays.week4);
					$scope.week4.push({"data":week4,"total":data[i].workeddays.week4.weekhours,"performance":data[i].workeddays.week4.weekperformance});
				}
				else
				{
					week4=createEmptyWeek();
					$scope.week4.push({"data":week4,"total":0,"performance":0});
				}

				if(data[i].workeddays.week5!=undefined)
				{
					week5=weekCreation(data[i].workeddays.week5);
					$scope.week5.push({"data":week5,"total":data[i].workeddays.week5.weekhours,"performance":data[i].workeddays.week5.weekperformance});
				}
				else
				{
					week5=createEmptyWeek();
					$scope.week5.push({"data":week5,"total":0,"performance":0});
				}
			}
			else
			{
				var week =createEmptyWeek();
				var dataweek={"data":week,"total":0,"performance":0};
				$scope.week1.push(dataweek);
				$scope.week2.push(dataweek);
				$scope.week3.push(dataweek);
				$scope.week4.push(dataweek);
				$scope.week5.push(dataweek);
			}
		}
	}
	var successfunc=function(data){
		$scope.team=data;
		createWeekPerformance(data);
		$scope.selectedweek=$scope.week1;
		$scope.week1selected=true;
		$scope.week2selected=false;
		$scope.week3selected=false;
		$scope.week4selected=false;
		$scope.week5selected=false;
	};
	$scope.loadPerformancebyMonth=function()
	{
		month=$scope.selectedMonth;
		if(month!="0"){
			var sucessFunc=function(data)
			{
				createWeekPerformance(data);
				$scope.selectedweek=$scope.week1;
				$scope.week1selected=true;
				$scope.week2selected=false;
				$scope.week3selected=false;
				$scope.week4selected=false;
				$scope.week5selected=false;
			}
			var failureFunc=function()
			{
				swal("Can't laod performance","Oopps! something bad happen can't load team performance","error");
			}
			Team.getTeamPerformanceByMonth(sucessFunc,failureFunc,month);
		}
	}

	if(Params.getTeamMember()!=null)
	{
		var member=Params.getTeamMember();
		$scope.email=member.email;
		$scope.name=member.name;
		$scope.surname=member.surname;
		$scope.title=member.title;
		$scope.city=member.city;
		$scope.phonenumber=member.phonenumber;
		$scope.phonecode=member.phonecode;
		$scope.country=member.country;
		$scope.status=member.status;
		$scope.photo=member.photo;
		$scope.isedit=true;
		$scope.oldmember=member;
		$scope.totaltasks=member.totaltasks;
		$scope.finishedtasks=member.finishedtasks;
		if(member.role.role!=roles.KeyAccount.role)
		{
			var skills=member.skills.split(",");
			$scope.skills=skills;
			$scope.capacity=member.capacity;
		}
		else
		{
			$scope.capacity=40;
		}
		$scope.call=function()
		{
			parent.location='tel:'+member.phonecode+member.phonenumber;
		}
		$scope.sendemail=function()
		{
			parent.location='mailto:'+member.email;
		}
	}
	$scope.openProfile=function(member)
	{
		Params.setTeamMember(member);
		$location.path("/teamprofile");
	}
	var validateForm=function()
	{
		var messages =[];
		if($scope.surname===undefined)
		{
			messages.push("Please fill the surname");
		}
		if($scope.name===undefined)
		{
			messages.push("Please fill the name");
		}
		if($scope.title===undefined)
		{
			messages.push("Please fill the title");
		}
		if($scope.phonecode===undefined)
		{
			messages.push("Please fill the phone code");
		}
		if($scope.phonenumber===undefined)
		{
			messages.push("Please fill the phone number");
		}
		if($scope.email===undefined)
		{
			messages.push("Please fill the email");
		}
		if($scope.password===undefined)
		{
			messages.push("Please fill the password");
		}
		if($scope.city===undefined)
		{
			messages.push("Please fill the city");
		}
		if($scope.country===undefined)
		{
			messages.push("Please fill the country");
		}
		if($scope.role===undefined)
		{
			messages.push("Please fill the role");
		}
		if($scope.status===undefined)
		{
			messages.push("Please fill the status");
		}
		if($scope.level===undefined)
		{
			messages.push("Please fill the level");
		}
		if($scope.level===undefined)
		{
			messages.push("Please fill the level");
		}
		if($scope.hourrate===undefined)
		{
			messages.push("Please fill the hour rate");
		}
		if($scope.language===undefined)
		{
			messages.push("Please fill the language");
		}
		if($scope.role!=undefined)
		{
			if($scope.role!=roles.KeyAccount.role && $scope.skills===undefined)
			{
				if($scope.skills===undefined)
					messages.push("Please fill the skills");
				if($scope.capacity===undefined)
					messages.push("Please fill the capacity");
			}
		}
		return messages;

	}
	$scope.hideoptions=function()
	{

		if($scope.role===roles.KeyAccount.role)
		{
			$("#skillsselct").prop("disabled",true);
			$("#capacityset").prop("disabled",true);
		}
		else
		{
			$("#skillsselct").prop("disabled",false);
			$("#capacityset").prop("disabled",false);
		}
	}
	$scope.openmemberForm=function(member)
	{

		var succsfunc=function(data)
		{
			$scope.skillsset=data;
		}
		Params.getSkills(succsfunc);
		if(member!=null)
		{
			$scope.email=member.email;
			$scope.password="******";
			$scope.name=member.name;
			$scope.surname=member.surname;
			$scope.capacity=parseInt(member.capacity);
			$scope.title=member.title;
			$scope.city=member.city;
			$scope.phonenumber=member.phonenumber;
			$scope.phonecode=member.phonecode;
			$("#phonecodeselect").select2("val",member.phonecode);
			$scope.country=member.country;
			$("#countryselect").select2("val",member.country);
			$scope.status=member.status;
			$("#statusselct").select2("val",member.status);
			$scope.role=member.role.role;
			$scope.hourrate=member.hourate;
			$scope.language=member.language.split(',');
			$("#luanguageselect").select2("val",member.language.split(','));
			$scope.level=member.level;
			$("#levelselect").select2("val",member.level);
			$("#roleselect").select2("data",{id:-1,"text":member.role.role});
			$("#roleselect").prop("disabled",true);
			if(member.role.role!=roles.KeyAccount.role)
			{
				var skills=member.skills.split(",");
				$scope.skills=skills;
				$("#skillsselct").select2("val",skills);
				$("#capacityset").val(member.capacity);
				$("#skillsselct").prop("disabled",false);
				$("#capacityset").prop("disabled",false);
			}
			else
			{
				$("#skillsselct").prop("disabled",true);
				$("#capacityset").prop("disabled",true);
			}
			$scope.isedit=true;
			$scope.oldmember=member;


		}
		else{
			cleanForm();
			$scope.isedit=false;
			$("#countryselect").select2("data",{id:-1,"text":"Country"});

		}
		$('#add-user').modal('show');
	}
	function cleanForm()
	{
		$scope.email=undefined;
		$scope.password=undefined;
		$scope.name=undefined;
		$scope.surname=undefined;
		$scope.capacity=undefined;
		$scope.phonecode="49";
		$scope.phonenumber=undefined;
		$scope.title=undefined;
		$scope.city=undefined;
		$scope.country=undefined;
		$scope.status=undefined;
		$scope.skills=undefined;
		$scope.hourrate=undefined;
		$scope.language=undefined;
		$scope.level=undefined;
		$("#levelselect").select2("val","Level");
		$("#roleselect").prop("disabled",false);
		$("#capacityset").val("");
		$("#phonecodeselect").select2("val","49");
		$("#countryselect").select2("val","Country");
		$("#statusselct").select2("val","Status");
		$("#roleselect").select2("val","Role");
		$("#skillsselct").select2("val","");
	}
	$scope.createTeamMember=function(oldmember)
	{
		var messages=validateForm();
		if(messages.length>0)
		{

			swal("Please Fill missing information",messages.join('\n'),"warning");
		}
		else
		{
			var succesfunc=function()
			{
				$('#add-user').modal('hide');

				swal("Success","Member Added/Updated successfully","success");
				Team.getAllteamMembers(successfunc);
				cleanForm();

			}
			var failureFunction=function(msg)
			{
				swal("Oops!","Can't add team member please try again later","error");
			}
			var member={
				"email":$scope.email,
				"login":$scope.email,
				"name":$scope.name,
				"surname":$scope.surname,
				"capacity":$scope.capacity,
				"skills":"" +$scope.skills,
				"phonecode":$scope.phonecode,
				"phonenumber":$scope.phonenumber,
				"title":$scope.title,
				"city":$scope.city,
				"country":$scope.country,
				"status":$scope.status,
				"dosend":$scope.send,
				"hourate":$scope.hourrate,
				"language":""+$scope.language,
				"level":$scope.level
			};
			if($scope.password!="******")
				member.password=$scope.password;
			if(oldmember==null){
				if($scope.role===roles.TeamLeader.role)
					Team.createTeamLeader(member,succesfunc,failureFunction);
				if($scope.role===roles.Developer.role)
					Team.createDeveloper(member,succesfunc,failureFunction);
				if($scope.role===roles.SysAdmin.role)
					Team.createSysAdmin(member,succesfunc,failureFunction);
				if($scope.role===roles.Tester.role)
					Team.createTester(member,succesfunc,failureFunction);
				if($scope.role===roles.KeyAccount.role)
					Team.createKeyAccount(member,succesfunc,failureFunction);
				if($scope.role===roles.Designer.role)
					Team.createDesigner(member,succesfunc,failureFunction);
			}
			else
			{
				member["id"]=oldmember.id;
				if($scope.role===roles.TeamLeader.role)
					Team.updateTeamLeader(member,succesfunc,failureFunction);
				if($scope.role===roles.Developer.role)
					Team.updateDeveloper(member,succesfunc,failureFunction);
				if($scope.role===roles.SysAdmin.role)
					Team.updateSysAdmin(member,succesfunc,failureFunction);
				if($scope.role===roles.Tester.role)
					Team.updateTester(member,succesfunc,failureFunction);
				if($scope.role===roles.KeyAccount.role)
					Team.updateKeyAccount(member,succesfunc,failureFunction);
				if($scope.role===roles.Designer.role)
					Team.updateDesigner(member,succesfunc,failureFunction);
			}
		}
	}
	$scope.deleteMember=function(member)
	{
		swal({
                title: "Are you sure?",
                text: 'You deleted it.',
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "cancel",
                confirmButtonColor: "#ed5565",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            }, function () {
            	var succesfunc=function()
				{
					$('#delete').modal('hide');
					$('#add-user').modal('hide');
					swal("Success","Member deleted successfully","success");
					Team.getAllteamMembers(successfunc);
					cleanForm();
					swal.close();

				}
				var failureFunction=function(msg)
				{
					swal("Oops!","Can't delete team member please try again later","error");
				}
				if($scope.role===roles.TeamLeader.role)
					Team.deleteTeamLeader(member,succesfunc,failureFunction);
				if($scope.role===roles.Developer.role)
					Team.deleteDeveloper(member,succesfunc,failureFunction);
				if($scope.role===roles.SysAdmin.role)
					Team.deleteSysAdmin(member,succesfunc,failureFunction);
				if($scope.role===roles.Tester.role)
					Team.deleteTester(member,succesfunc,failureFunction);
				if($scope.role===roles.KeyAccount.role)
					Team.deleteKeyAccount(member,succesfunc,failureFunction);
				if($scope.role===roles.Designer.role)
					Team.deleteDesigner(member,succesfunc,failureFunction);
		 });

	}
	$scope.uploadImage=function(member)
	{
		  var $image = $(".image-crop > img")
		  var successFunc=function()
		  {
		  	$("#change-picture").modal("hide");
		  	Team.getAllteamMembers(successfunc);
		  }
		  var failurefunc=function(msg)
		  {
		  	swal("Oops!","Can't upload team member please try again later","error");
		  }
		  $scope.photo=$image.cropper("getDataURL");
		  Team.uploadMemberImage(member.id,member.role.role,$image.cropper("getDataURL"),successFunc,failurefunc)

	}
	$scope.openImageUplaoder=function(member)
	{
		$("#change-picture").modal("show");
		$scope.oldmember=member;
		$scope.defaultimage=member.bigphoto;

	}

}]);
Controllers.controller('TeamProfilCtrl', ['$scope','Params', function ($scope,Params) {
	var member=Params.getTeamMember();
	$scope.email=member.email;
	$scope.name=member.name;
	$scope.surname=member.surname;

	$scope.title=member.title;
	$scope.city=member.city;
	$scope.phonenumber=member.phonenumber;
	$scope.phonecode=member.phonecode;
	$scope.country=member.country;
	$scope.status=member.status;
	$scope.photo=member.photo;
	if(member.role!="Key Account")
	{
		var skills=member.skills.split(",");
		$scope.skills=skills;
		$scope.capacity=member.capacity;
	}
	else
	{
		$scope.capacity=40;
	}
	$scope.call=function()
	{
		parent.location='tel:'+member.phonecode+member.phonenumber;
	}
	$scope.sendemail=function()
	{
		parent.location='mailto:'+member.email;
	}
}]);

Controllers.controller('ClientCtrl', ['$scope','Client','Login', function ($scope,Client,Login) {
	$scope.isSent=false;
	$scope.currentpage=1;
	$scope.isEdit=false;
	$scope.isPartner = false;
	$scope.referer= {manageClient : true};
	$scope.keyaccount={selectedKeyaccount:null};
	$scope.isCalculatingCredit = false;
	$scope.includemanagement = false;
	$scope.canDelete = true;
	if(Login.getLoggedUser().userinfo.canmanage != undefined)
		$scope.canmanage = Login.getLoggedUser().userinfo.canmanage;
	else
		$scope.canmanage = true;
	$scope.calculateCredit = function()
	{
		
		var succesfunc = function(data)
		{
			$scope.amountnumber = data.ammount;
			$scope.isCalculatingCredit = false;
		}
		var failurefunc = function(data)
		{
			$scope.amountnumber = "error";
			$scope.isCalculatingCredit = false;
		}
		if(!isNaN($scope.hournumber) && $scope.hournumber >0 && !isNaN($scope.ratenumber) && $scope.ratenumber >0)
		{
			$scope.isCalculatingCredit = true;
			Client.calculateCommission(succesfunc,failurefunc,$scope.hournumber,$scope.ratenumber,$scope.includemanagement);
		}
		else
			$scope.amountnumber = "";
	}
	$scope.activateClient=function(client_id,activate)
	{
		swal({
            title: "Are you sure?",
            text: 'You want to activate/desactivate client account?',
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "cancel",
            confirmButtonColor: "#ed5565",
            confirmButtonText: "Yes, just do it!",
            closeOnConfirm: true
	    }, function () {
	    	var sucessFunc=function()
			{
				updateView($scope.currentpage);
			}
			var failurefunc=function()
			{
				swal("Client activate","Can't activate/desactivate this client due to system error","error");
			}
			Client.desactivateClient(sucessFunc,failurefunc,client_id,activate);
	    });
	}
	if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_ADMIN")
	{
		$scope.isadmin=true;
	}
	if(Login.getLoggedUser().userinfo.roles.indexOf("ROLE_PARTNER")>-1)
	{
		$scope.isPartner = true;
	}
	var updateView=function(page){
		var successfunc=function(customers,pagecount,currentpage)
		{
			$scope.customers=customers;
			$scope.currentpage=currentpage;
			$scope.endpage=pagecount;
			var pages = new Array();
			pages.push(">>");
			pages.push(">");

			for (var i = pagecount-1; i<=0; i++) {
					pages.push(i+1);
			};

			pages.push("<");
			pages.push("<<");
			$scope.pagecount=pages;
		}
		Client.getAllClients(successfunc,null,page);
	}

	$scope.$on('$viewContentLoaded', function(){

	   updateView($scope.currentpage);
  	});
	$scope.nextpage=function()
	{
		if($scope.currentpage<scope.endpage)
			updateView(parseInt($scope.currentpage)+1);
	}
	$scope.prevouispage=function()
	{
		if($scope.currentpage>1)
			updateView(parseInt($scope.currentpage)-1);
	}
	$scope.firstpage=function(){
		updateView(1);
	};
	$scope.lastpage=function(){
		updateView($scope.endpage);
	};
	$scope.navigatetopage=function(page){
		updateView(page);
	};
	if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_ADMIN")
	{
		successfunc=function(data)
		{
			$scope.keyaccounts=data;
			if(data.length>0){
				var selectdata={"id":0,text:data[0].name+ " "+data[0].surname};
				$("#keyaccountselect").select2("data",selectdata);
				selectedKeyaccount=data[0].id;
			}
			else
			{
				$scope.keyaccounts={};
				var selectdata={"id":0,text:"No keyaccount found"};
				$("#keyaccountselect").select2("data",selectdata);
				selectedKeyaccount=null;
			}
		}
		failurefunc=function(data)
		{
			$scope.keyaccounts={};
			var selectdata={"id":0,text:"No keyaccount found"};
			$("#keyaccountselect").select2("data",selectdata);
			selectedKeyaccount=null;
		}
		Client.getAllKeyAccounts(successfunc,failurefunc,1);
	}
	else
	{
		$("#keyaccountselect").prop("disabled",true);
	}
	$scope.OpenCreateModal=function(client)
	{
		if(client!=null)
		{
			$scope.email=client.email;
			$scope.password="******";
			$scope.name=client.name;
			$scope.surname=client.surname;
			$scope.vat=client.vat;
			$scope.phonecode=client.phonecode;
			$scope.phonenumber=client.telnumber;
			$scope.address=client.address.address;
			$scope.city=client.address.city;
			$scope.country=client.address.country;
			$("#countryselect").select2("val",client.address.country);
			$scope.companyname=client.companyname;
			$scope.zipcode=client.address.zipcode;
			$scope.referer.manageClient = client.isManager;
			if(client.currency != "")
			{
				$scope.currency = client.currency;
				$("#currencyselect").select2("val",client.currency);
			}
			if(client.tax != "")
			{
				$scope.tax = client.tax;
			}
			if(client.billedFrom != "")
			{
				$scope.billed_from = client.billedFrom;
				$("#billedfromselect").select2("val",client.billedFrom);
			}
			var data={"id":0,text:client.keyaccount.name+" "+client.keyaccount.surname};
			$("#keyaccountselect").select2("data",data);
			$scope.keyaccount.selectedKeyaccount=client.keyaccount.id;
			$("#phonecode").select2("val",client.phonecode);
			//$("#countryselect").select2("data",{id:-1,text:client.address.country});
			$scope.isEdit=true;
			$scope.oldclient=client;
			$scope.canDelete = client.candelete;
		}
		else
		{
			$scope.isEdit=false;
			clearForm();
		}
		$("#add-client").modal('show');
	}
	var clearForm=function()
	{
		$scope.email=undefined;
		$scope.password=undefined;
		$scope.name=undefined;
		$scope.surname=undefined;
		$scope.vat=undefined;
		$scope.phonecode = "49";
		$scope.currency = "EUR";
		$scope.billed_from = "De";
		$scope.phonenumber=undefined;
		$scope.address=undefined;
		$scope.city=undefined;
		$scope.country=undefined;
		$scope.companyname=undefined;
		$scope.zipcode=undefined;
		$scope.keyaccount.selectedKeyaccount=undefined
		$scope.tax = undefined;
		$("#keyaccountselect").select2("data",{id:-1,text:"Key Account"});
		$("#countryselect").select2("data",{id:-1,text:"Country"});
		$("#phonecode").select2("val","49");
		$("#currencyselect").select2("val","EUR");
		$("#billedfromselect").select2("val","De");
		$scope.referer= {manageClient : ""};
	}
	var verifyForm=function()
	{
		var messages =[];
		if($scope.surname===undefined)
		{
			messages.push("Please fill the surname");
		}
		if($scope.name===undefined)
		{
			messages.push("Please fill the name");
		}
		if($scope.vat===undefined)
		{
			messages.push("Please fill the vat");
		}
		if($scope.phonecode===undefined)
		{
			messages.push("Please fill the phone code");
		}
		if($scope.phonenumber===undefined)
		{
			messages.push("Please fill the phone number");
		}
		if($scope.email===undefined)
		{
			messages.push("Please fill the email");
		}
		if($scope.password===undefined)
		{
			messages.push("Please fill the password");
		}
		if($scope.city===undefined)
		{
			messages.push("Please fill the city");
		}
		if($scope.country===undefined)
		{
			messages.push("Please fill the country");
		}
		if($scope.companyname===undefined)
		{
			messages.push("Please fill the compnay name");
		}
		if($scope.keyaccount.selectedKeyaccount===undefined && Login.getLoggedUser().userinfo.roles[0]=="ROLE_ADMIN")
		{
			messages.push("Please choose a key account");
		}
		if($scope.address===undefined)
		{
			messages.push("Please fill the address field");
		}
		if($scope.zipcode===undefined)
		{
			messages.push("Please fill the zipcode field");
		}
		if($scope.tax !==undefined)
		{
			if(isNaN($scope.tax))
				messages.push("Tax should be a numeric value, if you added % please remove it and try again");
		}
		return messages;
	}
	$scope.stateChanged=function()
	{
		if($scope.isSent)
		{
			$scope.isSent=false;
		}
		else
			$scope.isSent=true;
	}
	$scope.createClient=function(oldclient)
	{
		var messages=verifyForm();
		if(messages.length>0)
		{

			swal("Please fill all information",messages.join("\n"),"warning");
		}
		else{
			var address={
			"city":$scope.city,
			"country":$scope.country,
			"zipcode":$scope.zipcode,
			"state":$scope.city,
			"address":$scope.address
			};
			var client={
				"email":$scope.email,
				"login":$scope.email,
				"name":$scope.name,
				"companyname":$scope.companyname,
				"surname":$scope.surname,
				"phonecode":$scope.phonecode,
				"telnumber":$scope.phonenumber,
				"vat":$scope.vat,
				"address":address,
				"tax":$scope.tax,
				"currency":$scope.currency,
				"billedfrom":$scope.billed_from,
				"isSent":$scope.isSent
			};
			if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_ADMIN")
			{
				client.keyaccount_id=$scope.keyaccount.selectedKeyaccount;
			}
			if($scope.isPartner)
			{
				client.createdByPartner = true;
				client.managedbyPartner = $scope.referer.manageClient;
			}
			var failureFunction=function(msg)
			{
				swal("Oops!!", msg, "error");
			}
			var succesfunc=function(msg)
				{
					$('#delete').modal('hide');
					$('#add-client').modal('hide');
					swal("Client Added", msg, "success");
					updateView($scope.currentpage);
					clearForm();
				}
			if(oldclient==null)
			{
				client.password=$scope.password;
				Client.addClient(client,succesfunc,failureFunction,"POST");
			}
			else
			{
				if($scope.password!="******")
					client.password=$scope.password;
				client.id=oldclient.id;
				Client.addClient(client,succesfunc,failureFunction,"PUT");
			}
		}

	}
	$scope.deleteClient=function(oldclient)
	{
		var succesfunc=function()
		{
			$('#delete').modal('hide');
			$('#add-client').modal('hide');
			swal("Member Deleted", 'Member deleted successfully', "success");
			updateView($scope.currentpage);
			clearForm();

		}
		var failureFunction=function(msg)
		{
			swal("Oops!!", msg, "error");
		}
		Client.deleteClient(oldclient,succesfunc,failureFunction);
	}
}]);
Controllers.controller('CuserCtrl',['$scope','Login','Cuser','$location','Params',function($scope,Login,Cuser,$location,Params){
	$scope.isSent=false;
	$scope.isEdit=false;
	function cleanForm()
	{
		$scope.email=undefined;
		$scope.password=undefined;
		$scope.name=undefined;
		$scope.surname=undefined;
		$scope.phonecode="49";
		$scope.phonenumber=undefined;
		$scope.title=undefined;
		$("#phonecodeselect").select2("val","49");
		$scope.issent=false;

	}
	if(Params.getCuser()!=null)
	{
		$scope.email=Params.getCuser().email;
		$scope.password="******";
		$scope.name=Params.getCuser().name;
		$scope.surname=Params.getCuser().surname;
		$scope.title=Params.getCuser().title;
		$scope.phonenumber=Params.getCuser().phonenumber;
		$scope.phonecode=Params.getCuser().phonecode;
		$("#phonecodeselect").select2("val",Params.getCuser().phonecode);
		$scope.isEdit=true;
		$scope.photo=Params.getCuser().photo;
		$scope.olduser=Params.getCuser();
	}
	var updateView=function()
	{
		Client_id=Login.getLoggedUser().userinfo.id;
		var successfunc=function(cusers)
		{
			$scope.cusers=cusers;
		}
		Cuser.getAllUsers(successfunc,null,Client_id);
	}
	updateView();
	$scope.openmemberForm=function(member)
	{
		//BAD: Is not a very good solution to use jquery to initiate values
		if(member!=null)
		{
			$scope.email=member.email;
			$scope.password="******";
			$scope.name=member.name;
			$scope.surname=member.surname;
			$scope.title=member.title;
			$scope.phonenumber=member.phonenumber;
			$scope.phonecode=member.phonecode;
			$("#phonecodeselect").select2("val",member.phonecode);
			$scope.isEdit=true;
			$scope.olduser=member;
		}
		else{
			cleanForm();
			$scope.isEdit=false;

		}
		$('#add-user').modal('show');
	}
	
	var validateForm=function()
	{
		var messages =[];
		if($scope.surname===undefined)
		{
			messages.push("Please fill the surname");
		}
		if($scope.name===undefined)
		{
			messages.push("Please fill the name");
		}
		if($scope.title===undefined)
		{
			messages.push("Please fill the title");
		}
		if($scope.phonecode===undefined)
		{
			messages.push("Please fill the phone code");
		}
		if($scope.phonenumber===undefined)
		{
			messages.push("Please fill the phone number");
		}
		if($scope.email===undefined)
		{
			messages.push("Please fill the email");
		}
		if($scope.password===undefined)
		{
			messages.push("Please fill the password");
		}
		return messages;

	}
	$scope.createClient=function(olduser)
	{
		var messages=validateForm();
		if(messages.length>0)
		{

			swal("Complete information",messages,"info");
		}
		else{
			var user={
				"email":$scope.email,
				"login":$scope.email,
				"name":$scope.name,
				"title":$scope.title,
				"surname":$scope.surname,
				"phonecode":$scope.phonecode,
				"phonenumber":$scope.phonenumber,
				"isSent":$scope.issent
			};

			var failureFunction=function(msg)
			{
				swal("Oops!!", msg, "error");
			}
			var succesfunc=function(msg)
				{
					$('#delete').modal('hide');
					$('#add-user').modal('hide');
					swal("User Created", msg, "success");
					updateView();
					cleanForm();
				}
			if(olduser==null)
			{
				user.password=$scope.password;
				Cuser.addUser(user,succesfunc,failureFunction,"POST");
			}
			else
			{
				if($scope.password!="******")
					user.password=$scope.password;
				user.id=olduser.id;
				Cuser.addUser(user,succesfunc,failureFunction,"PUT");
			}
		}

	}
	$scope.deleteUser=function(olduser)
	{
		var succesfunc=function()
		{
			$('#delete').modal('hide');
			$('#add-user').modal('hide');
			swal("Member deleted", "Member deleted successfully", "success");
			updateView();
			cleanForm();

		}
		var failureFunction=function(msg)
		{
			swal("Oops!!", msg, "error");
		}
		Cuser.deleteUser(olduser,succesfunc,failureFunction);
	}
	$scope.uploadImage=function(user)
	{
		  var $image = $(".image-crop > img")
		  var successFunc=function()
		  {
		  	$("#change-picture").modal("hide");
		  	updateView();
		  }
		  var failurefunc=function(msg)
		  {
		  	swal("Oops!!", "Couldn't uplaod picture please try again later", "error");
		  }
		  $scope.photo=$image.cropper("getDataURL");
		  Cuser.uploadCuserImage(user.id,$image.cropper("getDataURL"),successFunc,failurefunc)

	}
	$scope.openImageUplaoder=function(user)
	{
		$("#change-picture").modal("show");
		$scope.olduser=user;
		$scope.defaultimage=user.bigphoto;

	}
	$scope.openProfile=function(user)
	{
		Params.setCuser(user);
		$location.path("/cuserprofile");
	}

}]);
Controllers.controller('SettingsCtrl', ['$scope','Chat', function ($scope,Chat) {



}]);
Controllers.controller("ChatCtrl",["$scope","$rootScope","Chat","$routeParams","Login","$location",function($scope,$rootScope,Chat,$routeParams,Login,$location){
	$scope.loadingteam=true;
	$scope.loadingmessages=true;
	$scope.messageto=null;
	$scope.messages=[];
	var project_id=$routeParams.project_id;
	$scope.goToProject=function()
	{
		$location.url("/pdetails/"+project_id);
	}
	if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSTOMER" || Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSER")
	{
		$('#messForm').show();
	}
	else
		$('#messForm').hide();

	$scope.sendMessage=function()
	{
		if($scope.messageto!=null)
		{
			$scope.messagetext=$scope.messagetext.replace("@"+$scope.messageto.name+":","<@"+$scope.messageto.id+"|"+$scope.messageto.name+">");
		}
		var successFunc=function(data)
		{
			$scope.messages.push(data.message.message);
		}
		Chat.sendMessage($routeParams.channel_id,$scope.messagetext,successFunc);
		$scope.messageto=null;
		$scope.messagetext="";
	}
	$scope.setMessageTo=function(member)
	{
		$scope.messageto=member;
		 $scope.messagetext='@'+member.name+': ';
	}
	var succesFunc=function(data)
	{
		$scope.groupname=data.name;
		$scope.members=data.members;
		$scope.loadingteam=false;

	}
	var failureFunc=function(msg)
	{
		swal("Oops!!","Can't load messages either the chennel was deleted or something bad happen","error");
	}
	var messagingssuccsFunc=function(data)
	{
		$scope.messages=data.messages;
		$scope.loadingmessages=false;

		$('.chat-discussion').slimScroll({
            scrollTo:"200px"
        });
        var fetchForMessages=function()
        {
        	var succsfunc=function(data)
 			{
 				$scope.messages=$scope.messages.concat(data.messages);
 			}
 			var latest=$scope.messages[$scope.messages.length-1].ts
     		Chat.getNewMessages($routeParams.channel_id,succsfunc,failureFunc,latest);
        }
        var fetcher=setInterval(fetchForMessages, 10000);
        $scope.$on('$routeChangeStart',function(){
			clearInterval(fetcher);
		});
  		$('.chat-discussion').slimScroll().bind('slimscroll', function(e, pos){
     		e.stopPropagation();
     		if(pos=="top" && Chat.isHasMore())
     		{
     			$scope.loadingmessages=true;
     			var succsfunc=function(data)
     			{
     				$scope.messages=data.messages.concat($scope.messages);
     				$scope.loadingmessages=false;

     			}
     			Chat.getMessages($routeParams.channel_id,succsfunc,failureFunc,1);
     		}
     		if(pos=="bottom")
     		{
     			var latest=$scope.messages[$scope.messages.length-1].ts
     			Chat.markreadMessages($routeParams.channel_id,latest)
     		}
		});
	}
	Chat.getChannelInfo($routeParams.channel_id,succesFunc,messagingssuccsFunc,failureFunc,0);
}]);
Controllers.controller("ProjectCtrl",["$scope","Project","$routeParams","Login","Team","$location","Ticket","Params","Task","$rootScope",function($scope,Project,$routeParams,Login,Team,$location,Ticket,Params,Task,$rootScope){
	$scope.isclient=false;
	$scope.isAdmin=false;
	$scope.isTeamLeader=false;
	$scope.isMember=false;
	$scope.isKeyAccount=false;
	$scope.hasteam=true;
	$scope.ticketStatus=Ticket.ticketstatus;
	var channel_id=null;
	var originalticket=new Array();
	$scope.selectedType="all";
	$scope.selectedStatus="all";
	$scope.searchWord="";
	$scope.contractprepared=true;
    var elem_1 = document.querySelector('.js-switch_1');
    var switchery_1 = null;
    $scope.haveJiraAccount=false;
    $scope.jiraprojects=[];
    $scope.linkedToJiraProject = false;
    $scope.linkedJiraProjectName = "";
    $scope.selectedJiraProject={item:null};
    $scope.estimationTotal=0;
    $scope.realtimeTotal=0;
    $scope.ticketfiles=[];
    var timer = null;
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's files collection
            $scope.ticketfiles.push(args.file);
        });
    });
    $scope.sortableOptions={
    	stop: function(e,ui)
    	{
    		changeListPrio();
    	},
    	update:function(e,ui)
    	{
    		if(!$scope.isclient || $scope.selectedStatus!="all")
    		{
    			swal("Can't change priority",'You can only change priority in "all active" mode',"warning");
    			ui.item.sortable.cancel();
    		}
    			
    	}
    }
    changeListPrio = function()
    {
    	var tickets = [];
    	for(i=0;i<$scope.tickets.length;i++)
    	{
    		tickets.push({
    			'id':$scope.tickets[i].displayId,
    			'prio':$scope.tickets.length-i
    		})
    	}
    	Project.setTicketsPrio(tickets);
    }
    $scope.deleteFileTicket = function(index)
    {
    	$scope.ticketfiles.splice(index,1);
    }
    $scope.linkJiraProject = function()
    {
    	var succesfunc = function()
    	{
    		$scope.linkedToJiraProject = true;
    		$scope.linkedJiraProjectName = $scope.selectedJiraProject.name;
    		$("#jira_link").modal("hide");
    	}
    	var failurefunc = function(status)
    	{
    		if(status === 503)
    			swal("Flewwork api failure","Flexwork api failure, please try again later","error");
    		else
    			swal("Bad request","Bad request please verify the information and try again","error");
    	}
    	if($scope.selectedJiraProject.item!=null)
    	{
    		var data = {
    			"fxw_project":project_id,
    			"j_project":$scope.selectedJiraProject.item.project_id,
    			"project_name":$scope.selectedJiraProject.item.name
    		}
    		token = Login.getLoggedUser().token.token;
    		Project.linkJiraProject(succesfunc,failurefunc,data,token);
    	}
    	else
    		swal("Choose project","Please choose a jira project to link","warning");
    }
    $scope.unlinkJiraProject = function()
    {
    	var succesfunc = function()
    	{
    		$scope.linkedToJiraProject = false;
    		$scope.linkedJiraProjectName  = "";
    		if($scope.jiraprojects.length > 0)
    		{
    			var selectdata={"id":-1,text:"Please choose a jira project"};
				$("#jiraprojectselection").select2("data",selectdata);
    		}
    		else
    		{
    			var selectdata={"id":-1,text:"Couldn't load projects"};
    			$("#jiraprojectselection").select2("data",selectdata);
    		}
    	}
    	var failurefunc = function()
    	{
    		if(status === 503)
    			swal("Flewwork api failure","Flexwork api failure, please try again later","error");
    		else
    			swal("Bad request","Bad request please verify the information and try again","error");
    	}
    	token = Login.getLoggedUser().token.token;
    	Project.unLinkJiraProject(succesfunc,failurefunc,project_id,token);
    }
    var loadJiraProjects = function()
    {
    	var sucessFunc = function(data)
    	{
    		$scope.jiraprojects=data;
    		var selectdata={"id":-1,text:"Please choose a jira project"};
			$("#jiraprojectselection").select2("data",selectdata);
    	}
    	var failureFunc = function(status)
    	{
    		var selectdata="";
    		if(status === 401)
    		{
    			selectdata={"id":-1,text:"Flexwork couldn't connect to jira either bad credentials or server is down"};
    		}
			else
				selectdata={"id":-1,text:"Couldn't load projects"};
			$("#jiraprojectselection").select2("data",selectdata);
    	}
    	var client_id = Login.getLoggedUser().userinfo.id;
    	Project.loadJiraProjects(sucessFunc,failureFunc,client_id);
    }
	var filterAll=function()
	{
		result=new Array();
		var est=0;
		var rt=0;
		if($scope.selectedStatus === "all" && $scope.searchWord=="")
		{
			for(i=0;i<originalticket.length;i++)
			{
				if(originalticket[i].status!=$scope.ticketStatus.Done.status)
				{
					if(originalticket[i].estimation!=null)
						est+=originalticket[i].estimation;
					if(originalticket[i].realtime!=null)
						rt+=originalticket[i].realtime;
					result.push(originalticket[i]);
				}
					
			}
		}
		else if($scope.selectedStatus === "all" && $scope.searchWord!="")
		{
			for(i=0;i<originalticket.length;i++)
			{
				if(originalticket[i].status!=$scope.ticketStatus.Done.status && originalticket[i].title.toLowerCase().indexOf($scope.searchWord.toLowerCase())!=-1)
				{
					if(originalticket[i].estimation!=null)
						est+=originalticket[i].estimation;
					if(originalticket[i].realtime!=null)
						rt+=originalticket[i].realtime;
					result.push(originalticket[i]);
				}
			}
		}
		else if($scope.selectedStatus!="all" && $scope.searchWord!="")
		{
			for(i=0;i<originalticket.length;i++)
			{
				if(originalticket[i].status==$scope.selectedStatus && originalticket[i].title.toLowerCase().indexOf($scope.searchWord.toLowerCase())!=-1 )
				{
					if(originalticket[i].estimation!=null)
						est+=originalticket[i].estimation;
					if(originalticket[i].realtime!=null)
						rt+=originalticket[i].realtime;
					result.push(originalticket[i]);
				}
			}

		}
		else if($scope.selectedStatus!="all")
		{
			for(i=0;i<originalticket.length;i++)
			{
				if(originalticket[i].status==$scope.selectedStatus)
				{
					if(originalticket[i].estimation!=null)
						est+=originalticket[i].estimation;
					if(originalticket[i].realtime!=null)
						rt+=originalticket[i].realtime;
					result.push(originalticket[i]);
				}
			}

		}
		else if($scope.searchWord!="")
		{
			for(i=0;i<originalticket.length;i++)
			{
				if(originalticket[i].title.toLowerCase().indexOf($scope.searchWord.toLowerCase())!=-1 )
				{
					if(originalticket[i].estimation!=null)
						est+=originalticket[i].estimation;
					if(originalticket[i].realtime!=null)
						rt+=originalticket[i].realtime;
					result.push(originalticket[i]);
				}
			}

		}
		else
		{
			result=originalticket;
		}
		$scope.estimationTotal=est;
		$scope.realtimeTotal=rt;
		return result;
	}
	$scope.filter=function(status)
	{
		$scope.selectedStatus = status;
		var result=filterAll();
		$scope.tickets=result;
	}
	var updateTickets=function()
	{
		var successFunc=function(data)
		{
			$scope.hasTicket=true;
			originalticket=data;
			$scope.tickets=filterAll($scope.selectedStatus);
		}
		var failureFunc=function()
		{
			swal("Can't update Ticket","We couldn't update tickets status","error");
		}
		Ticket.getTicketList(successFunc,failureFunc,project_id)
	}
	var project_id=$routeParams.project_id;
	var loadRoles=function(data){
		$scope.teamroles=data;
	}
	Team.loadRoles(loadRoles);
	var tikettypes=function(data)
	{
		$scope.tickettypes=data;
	}
	Ticket.loadTicketTypes(tikettypes);
	if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_ADMIN")
	{
		$scope.isAdmin=true;
	}
	else if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSTOMER" || Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSER"|| Login.getLoggedUser().userinfo.roles[0]=="ROLE_KEYACCOUNT"){
		$scope.isclient=true;
		if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSTOMER")
		{
			if(Login.getLoggedUser().userinfo.pmtools.indexOf("Jira") > -1)
			{
				$scope.haveJiraAccount=true;
				loadJiraProjects();
			}
				
		}
	}
	else{
		$scope.isMember=true;
	}
	if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_KEYACCOUNT")
	{
		$scope.isKeyAccount=true;
	}
	$scope.username=Login.getLoggedUser().userinfo.name+ " "+Login.getLoggedUser().userinfo.surname;
	var ticketupdater=null;
	$scope.disableEmailNotif=function()
	{
		var activate=$("#emailNotifCheck").prop("checked");
		var success=function()
		{
			$("#notifications").modal(('hide'));
		}
		var error=function()
		{
			swal("Oops!!","We can't disable project for this project","error");
		}
		Project.disableEmailNotif(success,error,project_id,activate);
	}

	var succesFunc=function(data)
	{
		$scope.company_name=data.customer;
		$scope.project_name=data.name;
		$("#emailNotifCheck").prop("checked",!data.EmailNotifDisabled);
		switchery_1=new Switchery(elem_1, { color: '#1AB394' });
		for(i=0;i<data.team.length;i++)
			if(data.team[i].photo==null)
				data.team[i].photo="img/users/profile_default_small.jpg";
		Params.setProject(data);
		$scope.team=data.team;
		originalticket=data.tickets;
		$scope.originalticket = originalticket;
		$scope.tickets=filterAll();
		$scope.projectDescription=data.briefing;
		$scope.projectrate=data.rate;
		$scope.projectSkilss=data.skills;
		$scope.budget=data.budget;
		$scope.projectrate=data.rate;
		$scope.issigned=data.signed;
		if(data.contractprepared!=null)
			$scope.contractprepared=data.contractprepared;
		$scope.client=data.client;
		if(data.teamLeader!=undefined)
			$scope.teamlead=data.teamLeader;
		channel_id=data.channel_id;

		if(data.tickets.length==0)
		{
			$scope.hasTicket=false;
		}
		else
		{
			$scope.hasTicket=true;
			ticketupdater=setInterval(updateTickets, 20000);
			$scope.$on('$routeChangeStart',function(){
					clearInterval(ticketupdater);
				});
		}
		if(data.team.length==0)
		{
			$scope.hasteam=false;
		}
		else
		{
			$scope.hasteam=true;
		}
		if(data.teamLeader)
			if(data.teamLeader.id==Login.getLoggedUser().userinfo.id && Login.getLoggedUser().userinfo.email==data.teamLeader.email)
			{
				$scope.isTeamLeader=true;
				$scope.isMember=false;
			}
			else
			$scope.isTeamLeader=false;
		else
			$scope.isTeamLeader=false;
		if(data.pmtools.length > 0)
		{
			for(var i = 0;i<data.pmtools.length;i++)
			{
				if(data.pmtools[i].tool === "Jira")
				{
					$scope.linkedToJiraProject = true;
					$scope.linkedJiraProjectName = data.pmtools[i].p_name;
				}
			}
		}
	}
	$scope.acceptContract=function()
	{
		var successFunc=function(){
			$("#see-contract").modal("hide");
			$scope.issigned=true;
		}
		var failureFunc=function()
		{
			swal("Can't accept contract","Sorry please try again later");
		}
		Project.acceptContract(successFunc,failureFunc,project_id);
	}
	var failureFunc=function(msg)
	{
		swal("Oops!!","We can't load project details please refresh the page","error");
	}

	var newDevMembers=new Array();
	var newSysMember=new Array();
	var newDesignerMembers=new Array();
	var newTesterMembers=new Array();
	var oldmembers;
	var oldteamlead;
	var getOldTeamLeader=function()
	{
		for(i=0;i<$scope.team.length;i++)
		{
			if($scope.team[i].isTeamLeader)
				return $scope.team[i];
		}
		return null;
	}
	$scope.openAddMember=function()
	{
		newDevMembers=[];
		newSysMember=[];
		newDesignerMembers=[];
		newTesterMembers=[];
		if($scope.team===undefined)
			oldmembers=new Array();
		else
			oldmembers=$scope.team.slice();
		oldteamlead=getOldTeamLeader();
		var successFunc=function(data)
		{
			if(data.length==0)
			{
				var selectdata={"id":-1,text:"No team found"};
				$("#selectdevmember").select2("data",selectdata);
			}
			else{
				var selectdata={"id":-1,text:"Search Member "};
				$("#selectdevmember").select2("data",selectdata);
				$scope.addedmember=null;
				$scope.devteammembers=data;
			}
		}
		var failureFunc=function()
		{
			var selectdata={"id":-1,text:"Please try again later"};
			$("#selectdevmember").select2("data",selectdata);
		}
		var loadingdata={"id":-1,text:"Loading..."};
		$("#selectdevmember").select2("data",loadingdata);
		Team.getAlldevteamMembers(successFunc,failureFunc);
		$('#add-member').modal('show');
	}
	var isOldMember=function(member)
	{
		for(i=0;i<oldmembers.length;i++)
		{
			if(member.id==oldmembers[i].id && oldmembers[i].role.role==member.role.role)
				return true;
		}
		return false;
	}

	$scope.changeRole=function(member,index)
	{
		if(index==0)
		{
			for(i=0;i<$scope.team.length;i++)
				$scope.team[i].isTeamLeader=false;
			member.isTeamLeader=true;
		}
		else
		{
			member.isTeamLeader=false;
		}
	}
	$scope.adddevmember=function(){
		$scope.addedmember.isTeamLeader=false;
		if(!isOldMember($scope.addedmember))
		{
			var added=false;
			if($scope.addedmember.role.role==Team.roles.Developer.role){

				for(i=0;i<newDevMembers.length;i++)
				{
					if(newDevMembers[i].id==$scope.addedmember.id)
						added=true;
				}
				if(!added)
					newDevMembers.push($scope.addedmember);
			}
			if($scope.addedmember.role.role==Team.roles.Tester.role){
				for(i=0;i<newTesterMembers.length;i++)
				{
					if(newTesterMembers[i].id==$scope.addedmember.id)
						added=true;
				}
				if(!added)
					newTesterMembers.push($scope.addedmember);
			}
			if($scope.addedmember.role.role==Team.roles.Designer.role){
				for(i=0;i<newDesignerMembers.length;i++)
				{
					if(newDesignerMembers[i].id==$scope.addedmember.id)
						added=true;
				}
				if(!added)
					newDesignerMembers.push($scope.addedmember);
			}
			if($scope.addedmember.role.role==Team.roles.SysAdmin.role){
				for(i=0;i<newSysMember.length;i++)
				{
					if(newSysMember[i].id==$scope.addedmember.id)
						added=true;
				}
				if(!added)
					newSysMember.push($scope.addedmember);
			}
			if(added)
			{
				swal("Team member already added","Team member is already added","warning");
			}
			else
			{
				if($scope.addedmember.role.role!=Team.roles.TeamLeader.role)
					$scope.team.push($scope.addedmember);
			}
		}
		else
		{
			swal("Team member already added","Team member is already added","warning");
		}
	}
	$scope.saveTeamMembers=function()
	{
		var success=function()
		{
			$('#add-member').modal('hide');
		}
		var failure=function()
		{
			swal("Oopss!!","Something wrong happend, please try again","error");
		}
		for(i=0;i<$scope.team.length;i++)
		{
			if($scope.team[i].isTeamLeader)
			{
				var data={
					"project_id":project_id,
					"teamleader_id":$scope.team[i].id,
					"teamleader_role":$scope.team[i].role.role
				}
				Project.assignTeamLeader(success,failure,data);
			}
		}
		if(newDevMembers.length>0)
		{
			var members=[];
			for(i=0;i<newDevMembers.length;i++)
			{
				members.push(newDevMembers[i].id);

			}
			var data={
					"project_id":project_id,
					"developers":members
			}
			Project.addDeveloper(success,failure,data);

		}
		if(newTesterMembers.length>0)
		{
			var members=[];
			for(i=0;i<newTesterMembers.length;i++)
			{
				members.push(newTesterMembers[i].id);
			}
			var data={
					"project_id":project_id,
					"testers":members
			}
			Project.addTester(success,failure,data);

		}
		if(newDesignerMembers.length>0)
		{
			var members=[];
			for(i=0;i<newDesignerMembers.length;i++)
			{
				members.push(newDesignerMembers[i].id);
			}
			var data={
					"project_id":project_id,
					"designers":members
			}
			Project.addDesigner(success,failure,data);

		}
		if(newSysMember.length>0)
		{
			var members=[];
			for(i=0;i<newSysMember.length;i++)
			{
				members.push(newSysMember[i].id);
			}
			var data={
					"project_id":project_id,
					"sysadmins":members
			}
			Project.addSystemAdmin(success,failure,data);

		}
	}
	$scope.deleteTeamMember=function(member)
	{
		swal({
            title: "Are you sure?",
            text: 'You want to delete member?',
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "cancel",
            confirmButtonColor: "#ed5565",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
	    }, function () {
	        var success=function()
			{
				var index=$scope.team.indexOf(member);
				$scope.team.splice(index,1);
				oldmembers.splice(index, 1);
			}
			var failure=function()
			{
				$('#teamfailure').modal("show");
				$('#teamfailure').find('p').html("Something wrong happend, please try again later");
			}
			if(isOldMember(member))
			{

				if(member.role.role==Team.roles.Developer.role){
					var data={
						"project_id":project_id,
						"developers":[member.id]
					}
					Project.deleteDeveloperFromProject(success,failure,data);

				}
				if(member.role.role==Team.roles.Tester.role){
					var data={
						"project_id":project_id,
						"testers":[member.id]
					}
					Project.deleteTesterFromProject(success,failure,data);
				}
				if(member.role.role==Team.roles.Designer.role){
					var data={
						"project_id":project_id,
						"designers":[member.id]
					}
					Project.deleteDesignerFromProject(success,failure,data);
				}
				if(member.role.role==Team.roles.SysAdmin.role){
					var data={
						"project_id":project_id,
						"sysadmins":[member.id]
					}
					Project.deleteSysAdminFromProject(success,failure,data);
				}
			}
			else
			{
				if(member.role.role==Team.roles.Developer.role){
					var index=newDevMembers.indexOf(member);
					newDevMembers.splice(index,1);

				}
				if(member.role.role==Team.roles.Tester.role){
					var index=newTesterMembers.indexOf(member);
					newTesterMembers.splice(index,1);
				}
				if(member.role.role==Team.roles.Designer.role){
					var index=newDesignerMembers.indexOf(member);
					newDesignerMembers.splice(index,1);
				}
				if(member.role.role==Team.roles.SysAdmin.role){
					var index=newSysMember.indexOf(member);
					newSysMember.splice(index,1);
				}
				var index=$scope.team.indexOf(member);
				$scope.team.splice(index,1);
			}
	    });

	}
	$scope.closeTeamModal=function()
	{
		if(newDevMembers.length>0)
		{

			for(i=0;i<newDevMembers.length;i++)
			{
				var index=$scope.team.indexOf(newDevMembers[i]);
				$scope.team.splice(index, 1);
			}

		}
		if(newTesterMembers.length>0)
		{
			for(i=0;i<newTesterMembers.length;i++)
			{
				var index=$scope.team.indexOf(newTesterMembers[i]);
				$scope.team.splice(index, 1);
			}
		}
		if(newDesignerMembers.length>0)
		{
			for(i=0;i<newDesignerMembers.length;i++)
			{
				var index=$scope.team.indexOf(newDesignerMembers[i]);
				$scope.team.splice(index, 1);
			}
		}
		if(newSysMember.length>0)
		{
			var members=[];
			for(i=0;i<newSysMember.length;i++)
			{
				var index=$scope.team.indexOf(newSysMember[i]);
				$scope.team.splice(index, 1);
			}
		}

		for(i=0;i<$scope.team.length;i++)
		{
			if(oldteamlead!=null)
				if($scope.team[i].id==oldteamlead.id && $scope.team[i].role.role==oldteamlead.role.role)
				{
					$scope.team[i].isTeamLeader=true;
				}
				else
					$scope.team[i].isTeamLeader=false;
			else
				$scope.team[i].isTeamLeader=false;
		}
		$('#add-member').modal('hide');

	}
	$scope.assignBudget=function()
	{
		var successFunc=function(){
			$("#budgetlimit").modal('hide');
		}
		var failureFunc=function()
		{
			$('#teamfailure').modal("show");
			$('#teamfailure').find('p').html("Something wrong happend, please try again later");
		}
		if($scope.budget>0)
		{
			var data={
				"project_id":project_id,
				"budget":$scope.budget
			}
			Project.assignProjectBudget(successFunc,failureFunc,data);
		}
		else
		{
			$("#teamwarning").modal('show');
			$('#teamwarning').find('p').html("Please choose a number great than zero");
		}
	}
	$scope.openKeybox=function()
	{
		$location.url("/keybox/"+project_id);
	}
	$scope.hideshowForm=function(visible){
		if(visible)
		{
			$("#ticketchoiceform").show();
		}
		else {
			$("#ticketchoiceform").hide();
		}
	}
	var verifTicketForm=function()
	{
		message=new Array();
		if($scope.tickettitle===undefined || $scope.tickettitle==null ||$scope.tickettitle=="")
		{
			message.push("Please enter Ticket title");
		}
		if($scope.ticketdescription===undefined || $scope.ticketdescription==null ||$scope.ticketdescription=="")
		{
			message.push("Please enter Ticket description");
		}
		return message;
	}
	$scope.openmessages=function()
	{
		if(channel_id!=null)
		{
			$location.url("/messaging/"+channel_id);
		}
		else
		{
			swal("No channel","No messaging channel was created for this project","info")
		}
	}
	var editedTicket=null;
	$scope.openCreateTicket=function(ticket)
	{
		if(ticket!=null)
		{
			$scope.isedit=true;
			$scope.tickettitle=ticket.title;
			$scope.ticketdescription=ticket.description;
			editedTicket=ticket;
			$("#add-ticket").modal('show');
		}
		else{
			$scope.conceptselct=false;
			$scope.designselct=false;
			$scope.bugselct=false;
			$scope.devselct=true;
			$("#radio1").prop("checked", true);
			$scope.tickettitle="";
			$scope.ticketdescription="";
			editedTicket=null;
			$scope.isedit=false;
			$scope.ticketfiles=[];
			$("#add-ticket").modal('show');
		}
	}
	$scope.openBuginfo=function(desc)
	{
		$scope.bugdescription=desc;
		$('#bug-info').modal('show');
	}
	$scope.createTicket=function(){
		var messages=verifTicketForm();
		if(messages.length==0)
		{
			var data={
				"project_id":project_id,
				"title":$scope.tickettitle,
				"description":$scope.ticketdescription,
				"createdby":Login.getLoggedUser().userinfo.name+" "+Login.getLoggedUser().userinfo.surname
			}
			if(editedTicket!=null)
			{
				data.ticket_id=editedTicket.id;
			}
			var successFunc=function()
			{
				swal("Ticket Created", "Ticket created successfully", "success");
				$("#add-ticket").modal('hide');
				updateTickets();
			}
			var failureFunc=function()
			{
				swal("Opss", "Something bad happen please try again later", "error");
			}
			if(editedTicket==null)
			{
				data.fileCount = $scope.ticketfiles.length;
				Ticket.createTicket(successFunc,failureFunc,data,$scope.ticketfiles);
			}
			else
				Ticket.updateTicket(successFunc,failureFunc,data);
		}
		else
		{
			swal("Oopss",messages.join("\n"),"warning");
		}
	}
	$scope.openTicketDetails=function(ticket)
	{
		$scope.tasks=ticket.tasks;
		$('#estimation-details').modal("show");
	}
	var ticket=null;
	$scope.openEstimationDetails=function(selectedticket)
	{
		$scope.tasks=selectedticket.tasks;
		ticket=selectedticket;
		$('#send-to-client').modal("show");
	}
	$scope.sendToClient=function()
	{
		var estimation=0;
		var complete=true;
		for(i=0;i<ticket.tasks.length;i++)
		{
			if(ticket.tasks[i].estimation==null)
			{
				complete=false;
			}
			else
				estimation+=ticket.tasks[i].estimation;
		}
		if(complete){
			swal({
	                title: "Are you sure?",
	                text: 'You want to send a total estimation of '+estimation+' h to client.',
	                type: "warning",
	                showCancelButton: true,
	                cancelButtonText: "cancel",
	                confirmButtonColor: "#ed5565",
	                confirmButtonText: "Yes, send it!",
	                closeOnConfirm: false
	            }, function () {

					var successFunc=function(data)
					{
						$('#send-to-client').modal("hide");
						updateTickets();
						swal.close();
					}
					var failureFunc=function()
					{
						swal("Oops!","Can't send estimation to client");
					}
					Ticket.sendToClient(successFunc,failureFunc,ticket.id);


	        });
		}
		else
		{
			swal("Please Complete estimation","Some stories are not estimated yet","info");
		}

	}
	$scope.openSendToProdModal=function(selectedticket)
	{
		$scope.tasks=selectedticket.tasks;
		ticket=selectedticket;
		$('#send-to-production').modal("show");
	}
	$scope.sendToProduction=function()
	{

		swal({
            title: "Are you sure?",
            text: 'You want to send the ticket to production',
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "cancel",
            confirmButtonColor: "#ed5565",
            confirmButtonText: "Yes, send it!",
            closeOnConfirm: false
	        }, function () {

				var successFunc=function(data)
				{
					$('#send-to-production').modal("hide");
					updateTickets();
					swal.close();
				}
				var failureFunc=function()
				{
					swal("Oops!","Can't send estimation to client");
				}
				Ticket.sendToProd(successFunc,failureFunc,ticket.id);


	        });
	}
	$scope.openDeliverToClientModal=function(selectedticket)
	{
		$scope.tasks=selectedticket.tasks;
		ticket=selectedticket;
		$('#deliver-ticket').modal("show");
	}
	$scope.deliverToclient=function()
	{
		var realtime=0;
		var complete=true;
		for(i=0;i<ticket.tasks.length;i++)
		{
			if(ticket.tasks[i].realtime==null)
			{
				complete=false;
			}
			else
				realtime+=ticket.tasks[i].realtime;
		}
		if(complete){
			swal({
	                title: "Are you sure?",
	                text: 'You want to deliver the ticket of total time '+realtime+' h to client.',
	                type: "warning",
	                showCancelButton: true,
	                cancelButtonText: "cancel",
	                confirmButtonColor: "#ed5565",
	                confirmButtonText: "Yes, send it!",
	                closeOnConfirm: false
	            }, function () {

					var successFunc=function(data)
					{
						updateTickets();
						$('#deliver-ticket').modal("hide");
						swal.close();
					}
					var failureFunc=function()
					{
						swal("Oops!","Can't deliver ticket to client");
					}
					Ticket.deliverToClient(successFunc,failureFunc,ticket.id);


	        });
		}
		else
		{
			swal("Please Complete realtime","Real time for some stories is not set yet","info");
		}
	}
	$scope.startEstimation=function(ticket)
	{

		swal({
                title: "You start the ticket:",
                html: '<p><i class="fa fa-star project-type"></i>'+ticket.title+'</p>',
                type: "info",
                showCancelButton: true,
                cancelButtonText: "cancel",
                confirmButtonColor: "#1ab394",
                confirmButtonText: "start now",
                closeOnConfirm: false
            }, function () {
            	var successFunc=function()
				{
					swal(
	                {
	                    title: "Great!",
	                    text: "Your ticket is send successfully to estimation",
	                    type: "success",
	                    confirmButtonColor: "#1ab394",
	                    confirmButtonText: "close"
	                });
					updateTickets();
				}
				var failureFunc=function()
				{
					swal("Can't start estimation","We couldn't statrt the estimation process","error");

				}
                Ticket.startEstimation(successFunc,failureFunc,ticket.id);
            });
	}
	$scope.acceptEstimation=function(ticket)
	{

		swal({
                title: "You confirm the estimation of "+ ticket.estimation+"h for",
                html: '<p><i class="fa fa-star project-type"></i> Contracting Process</p><div class="col-lg-12 acenter mb20"><div class="checkbox checkbox-alert checkbox-primary mt-5 mb-5"><input type="checkbox" id="checkbox3"><label for="checkbox3">I accept the <a href="#" target="_blank">Terms and Conditions</a></label></div></div>',
                type: "info",
                showCancelButton: true,
                cancelButtonText: "cancel",
                confirmButtonColor: "#1ab394",
                confirmButtonText: "i confirm",
                closeOnConfirm: false
            }, function () {
            	var successFunc=function()
				{
					swal(
	                {
	                    title: "Great!",
	                    text: "Your ticket is send successfully to production",
	                    type: "success",
	                    confirmButtonColor: "#1ab394",
	                    confirmButtonText: "close"
	                });
					updateTickets();
				}
				var failureFunc=function()
				{
					swal("Can't accept estimation","We couldn't accept the estimation","error");

				}
                Ticket.acceptEstimation(successFunc,failureFunc,ticket.id);
            });
	}
	$scope.rejectEstimation=function(ticket)
	{

		swal({
                title: "Reedit Ticket",
                //html: '<p><i class="fa fa-star project-type"></i>'+ticket.title+'</p>',
                text:"Your ticket will be saved as draft and you have to restart estimation after reediting this ticket.\n  Would you like to reedit the ticket now?",
                type: "info",
                showCancelButton: true,
                cancelButtonText: "cancel",
                confirmButtonColor: "#1ab394",
                confirmButtonText: "i confirm",
                closeOnConfirm: false
            }, function () {
            	var successFunc=function()
				{
					swal(
	                {
	                    title: "Great!",
	                    text: "Ticket is in draft now you can re-edit and start it again",
	                    type: "success",
	                    confirmButtonColor: "#1ab394",
	                    confirmButtonText: "close"
	                });
					updateTickets();
				}
				var failureFunc=function()
				{
					swal("Can't reject estimation","We couldn't reject the estimation","error");

				}
                Ticket.rejectEstimation(successFunc,failureFunc,ticket.id);
            });
	}
	$scope.acceptTicket=function(ticket)
	{

		swal({
                title: "You accept and close the ticket",
                html: '<p><i class="fa fa-star project-type"></i>'+ticket.title+'</p>',
                type: "info",
                showCancelButton: true,
                cancelButtonText: "cancel",
                confirmButtonColor: "#1ab394",
                confirmButtonText: "accept",
                closeOnConfirm: false
            }, function () {
            	var successFunc=function()
				{
					swal(
	                {
	                    title: "Great!",
	                    text: "Your ticket is successfully closed",
	                    type: "success",
	                    confirmButtonColor: "#1ab394",
	                    confirmButtonText: "close"
	                });
					updateTickets();
				}
				var failureFunc=function()
				{
					swal("Can't accept ticket","We couldn't accept the ticket","error");

				}
                Ticket.acceptTicket(successFunc,failureFunc,ticket.id);
            });
	}
	$scope.openRejectionMessage=function(ticket)
	{
		$scope.rejectiommsg=ticket.rejectionmessage;
		$("#reject-messages").modal("show");
	}
	$scope.openRejectModal=function(ticket)
	{
		$scope.rejectedticket=ticket;
		$scope.rejectionmessage="";
		$("#reject-ticket").modal("show");
	}
	$scope.rejectTicket=function(ticket)
	{

    	var successFunc=function()
		{
			swal(
            {
                 title: "Thank you!",
                text: "Your ticket is successfully rejected",
                type: "success",
                confirmButtonColor: "#1ab394",
                confirmButtonText: "close"
            });
			updateTickets();
		}
		var failureFunc=function()
		{
			swal("Can't reject ticket","We couldn't reject the ticket","error");

		}
		if($scope.rejectionmessage===undefined || $scope.rejectionmessage===null || $scope.rejectionmessage==="")
		{
			var rejectionmessage="No message";
		}
		else
		{
			var rejectionmessage=$scope.rejectionmessage;
		}
		var data={"ticket_id":ticket.id,"message":rejectionmessage};
        Ticket.rejectTicket(successFunc,failureFunc,data);

	}
	$scope.deleteTicket=function(ticket)
	{

		swal({
                title: "Are you sure?",
                html: '<p>You deleted it.</p>',
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "cancel",
                confirmButtonColor: "#ed5565",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            }, function () {
            	var successFunc=function(){
	                swal(
	                {
	                    title: "Deleted!",
	                    text: "You deleted it!",
	                    type: "success",
	                    confirmButtonColor: "#1ab394",
	                    confirmButtonText: "close"
	                });
	                updateTickets();
	            }
	            var failureFunc=function()
	            {
	            	swal("can't delete ticket","Ticket couldn't be deleted please try again later","error");
	            }
	            Ticket.deleteTicket(successFunc,failureFunc,ticket.id);
            });
	}
	$scope.openStoriesView=function(ticket)
	{
		Params.setTicket(ticket);
		$location.path("/stories/"+project_id+"/"+ticket.id);
	}
	$scope.markAsBilled=function(ticket)
	{
		var successfunc=function()
		{
			updateTickets();
		}
		var failurefunc=function()
		{
			swal("Can't bill ticket","We couldn't mark the ticket as billed","error");

		}
		Ticket.markAsbilled(successfunc,failurefunc,ticket.id);
	}
	$scope.markAsPayed=function(ticket)
	{
		var successfunc=function()
		{
			updateTickets();
		}
		var failurefunc=function()
		{
			swal("Can't bill ticket","We couldn't mark the ticket as billed","error");

		}
		Ticket.markAsPayed(successfunc,failurefunc,ticket.id);
	}
	var verifyBugForm=function()
	{
		var messages=[];
		if($scope.storytitle==undefined || $scope.storytitle=="" || $scope.storytitle==null)
		{
			messgaes.push("please enter a bug title");
		}
		if($scope.storydescription==undefined || $scope.storydescription=="" || $scope.storydescription==null)
		{
			messgaes.push("please enter a bug description");
		}
		return messages;
	}
	$scope.openAddBug=function(ticket)
	{
		$('#add-bug').modal("show");
		$scope.storytitle="";
		$scope.storydescription="";
		selectedticket=ticket;
	}
	$scope.createStory=function()
	{
		var messages=verifyBugForm();
		if(messages.length==0)
		{
			var data ={
				"title":$scope.storytitle,
				"description":$scope.storydescription,
				"type":"bug"
			};
			var successFunc=function()
			{

				$('#add-bug').modal("hide");
				swal("Bug added","Your bug has been sent to teamleader for check and acceptance","success");
			}
			var failureFunc=function()
			{
				swal("Oops","Something wrong happend please try again later","error");
			}

			data.ticket_id=selectedticket.id;
			Task.craeteTask(successFunc,failureFunc,data);
		}
		else
		{
			swal("Please fill those information",messages.join('\n'),"warning");
		}
	}
	Project.getProjectDetails($routeParams.project_id,succesFunc,failureFunc);
}]);
Controllers.controller('KeyboxCtrl', ['$scope','KeyBox',"$routeParams","Login","$location", function ($scope,KeyBox,$routeParams,Login,$location) {
	var project_id=$routeParams.project_id;
	$scope.isadding=false;
	if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSTOMER" || Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSER"|| Login.getLoggedUser().userinfo.roles[0]=="ROLE_KEYACCOUNT"){
		$scope.isclient=true;
	}
	else
		$scope.isclient=false;
	if(project_id==undefined)
	{
		$location.path("/dashboard");
	}
	var updateView=function()
	{
		var successFunc=function(data)
		{
			$scope.configs=data;
			$scope.isadding=false;
		}
		KeyBox.getProjectConfigs(project_id,successFunc);
	}

	updateView();
	$scope.addKeyBox=function()
	{
		var conf={
			"id":-1,
			"title":"",
			"config":""
		}
		$scope.configs.unshift(conf);
		$scope.isadding=true;
	}
	$scope.editkeybox=function()
	{
		$scope.isadding=true;
	}
	$scope.deleteKeubox=function(conf)
	{
		swal({
			title: "Are you sure?",
			text: "Do you want to delete keybox "+conf.title,
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, delete it!",
			closeOnConfirm: false },
			function(){
				if(conf.id==-1)
				{
					var index= $scope.configs.indexOf(conf);
					$scope.configs.splice(index, 1);
					$scope.$apply();
					swal("Deleted!", "The Keybox was deleted", "success");
				}
				else
				{
					var successFunc=function()
					{
						var index =$scope.configs.indexOf(conf);
						$scope.configs.splice(index, 1);
						swal("Deleted!", "The Keybox was deleted", "success");
					}
					var failureFunc=function()
					{
						swal("Not Deleted!", "Something bad happen try again later", "error");
					}
					KeyBox.deleteProjectConfig(successFunc,failureFunc,conf.id);
				}

			});
	}
	$scope.resetKeybox=function()
	{
		$location.url("/pdetails/"+project_id);
	}
	$scope.saveKeyBox=function()
	{
		for(i=0;i<$scope.configs.length;i++)
		{
			var failureFunc=function()
			{
			}
			var successFunc=null;
			if(i==$scope.configs.length-1)
			{
				successFunc=function()
				{
					updateView();
				}
			}
			else
			{
				successFunc=function()
				{
				}
			}
			if($scope.configs[i].id==-1)
			{
				if($scope.configs[i].title!="" && $scope.configs[i].config!="")
				{
					var data={
						"project_id":project_id,
						"title":$scope.configs[i].title,
						"config":$scope.configs[i].config
					}
					KeyBox.createProjectConfig(successFunc,failureFunc,data);
				}
			}
			else
			{
				if($scope.configs[i].title!="" && $scope.configs[i].config!="")
				{
					var data={
						"config_id":$scope.configs[i].id,
						"title":$scope.configs[i].title,
						"config":$scope.configs[i].config
					}
					KeyBox.updateProjectConfig(successFunc,failureFunc,data);
				}
			}
		}
	}


}]);
Controllers.controller('StoriesCtrl', ['$scope','Login','Params','$location','Team','Ticket',"Task","$routeParams","Project", function ($scope,Login,Params,$location,Team,Ticket,Task,$routeParams,Project) {
	$scope.isclient=false;
	$scope.isAdmin=false;
	$scope.isTeamLeader=false;
	$scope.isMember=false;
	var clipboard=new Clipboard('.btnCopy');
	$scope.currentUrl=window.location.href;
	clipboard.on('error', function(e) {
    	swal("Safari is not supported","Safari is not supported, please copy link from browser","info");
	});
	var project_id=$routeParams.project_id;
	var ticket_id=$routeParams.ticket_id;
	var getTasktypes=function(data)
	{
		$scope.taskTypes=data;
	}
	Task.loadTaskTypes(getTasktypes);
	var loadProject=function()
	{
		var success=function(project)
		{
			$scope.company_name=project.customer;
			$scope.project_name=project.name;
			//$scope.docs=project.docs;
			$scope.team=project.team;
			if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_ADMIN")
			{
				$scope.isAdmin=true;
			}
			else if(project.teamLeader.id==Login.getLoggedUser().userinfo.id && Login.getLoggedUser().userinfo.email==project.teamLeader.email)
			{

				$scope.isTeamLeader=true;
			}
			else if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSTOMER" || Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSER"|| Login.getLoggedUser().userinfo.roles[0]=="ROLE_KEYACCOUNT"){
				$scope.isclient=true;
			}
			else
			{
				$scope.isMember=true;
			}
		}
		var failure=function()
		{
			swal("Can't load ticket details","Can't load ticket details","error");
		}
		Project.getProjectDetails(project_id,success,failure);
	}
	$scope.ticketStatus=Ticket.ticketstatus;
	$scope.username=Login.getLoggedUser().userinfo.surname+ " "+Login.getLoggedUser().userinfo.name;


	var updateView=function()
	{
		sucessFunc=function(data)
		{
			$scope.ticket_name=data.title;
			$scope.ticket_id=data.displayId;
			$scope.ticket_type=data.type;
			$scope.ticket_decription=data.description;
			$scope.ticket_status=data.status;
			$scope.ticket_realtime=data.realtime;
			$scope.ticket_estimation=data.estimation;
			$scope.tasks=data.tasks;
			$scope.totaltasks=data.taskscount;
			$scope.finishedtasks=data.finishedtasks;
			$scope.rejectionmessage=data.rejectionmessage;
			$scope.docs=data.docs;
			$scope.openbug=data.bugopen;
		}
		failureFunc=function(err)
		{
			swal("Can't load ticket details","Can't load ticket details","error");
		}
		Task.getAllTasks(sucessFunc,failureFunc,ticket_id);
	}

	var loadRoles=function(data){
		$scope.teamroles=data;
		loadProject();
	}
	var selectedtask;
	$scope.openAddEstimation=function(estimation,task)
	{
		$scope.isbackend=false;
		$scope.isfrontend=false;
		if(task.type==$scope.taskTypes.Concept.type || task.type==$scope.taskTypes.Uidesign.type || task.type==$scope.taskTypes.Uicoding.type)
			$scope.isfrontend=true;
		else
			$scope.isbackend=true;
		if(estimation!=null)
		{
			$("#selectest").select2("data",{"id":estimation,'text':estimation+" h"});
		}
		else
			$("#selectest").select2("val","Select");
		selectedtask=task;
		$("#add-estimation").modal("show");
	}
	var updateRealtimes=function(task)
	{
		var successFunc=function(data)
		{
			$scope.realtimes=data.realtimes;
			$scope.totalrealtime=data.total;
			$scope.assigned=task.assignto;
		}
		var failureFunc=function()
		{
			swal("Oops!!","Can't get realtime please try again later","error");
		}
		Task.getAllRealtimes(successFunc,failureFunc,task.id);
	}
	$scope.openAddRealtime=function(realtime,task)
	{
		updateRealtimes(task);
		selectedtask=task;

		$("#add-realtime").modal("show");
	}
	$scope.setEstimation=function()
	{
		var data ={
			"estimation":$scope.estimation,
			"task_id":selectedtask.id
		}
		var successFunc=function()
		{
			updateView();

			$("#add-estimation").modal("hide");
		}
		var failureFunc=function()
		{
			swal("Estimation not set","We couldn't set the estimation please try again later","error");
		}
		Task.setEstimation(successFunc,failureFunc,data);
	}
	var selectedrealtime=null;
	$scope.sendToTl=function()
	{
		data={"task_id":selectedtask.id};
		successFunc=function()
		{
			swal("Realtime sent","Realtime sent successfully to team leader","success");
			updateView();
			$("#add-realtime").modal("hide");
		}
		failurefunc=function()
		{
			swal("Oopss!!","Can't send realtime to team leader please try again later","error");

		}
		Task.setRealtime(successFunc,failurefunc,data);
	}
	$scope.editRealtime=function(realtime)
	{
		selectedrealtime=realtime;
		$scope.editrealtime=realtime.time;
		$("#edit-realtime").modal("show");
	}
	$scope.seteditRealtime=function(){
		if($scope.editrealtime=="" || $scope.editrealtime==undefined || $scope.editrealtime==null)
		{
			swal("Enter a realtime","Please enter a realtime","error");
		}
		else
		{
			if(!isNaN($scope.editrealtime))
			{
				var successFunc=function()
				{
					updateRealtimes(selectedtask);
					$("#edit-realtime").modal("hide");
				}
				var failureFunc=function()
				{
					swal("Realtime not set","We couldn't set the realtime please try again later","error");
				}

				var data ={
				"realtime":$scope.editrealtime,
				"realtime_id":selectedrealtime.id
				}
				Task.updateRealtime(successFunc,failureFunc,data);

			}
			else
				swal("Enter a number","Please enter a number in realtime","warning");

		}
	}
	$scope.deleteRealtime=function(realtime)
	{
		swal({
                title: "Are you sure?",
                html: 'You deleted it.',
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "cancel",
                confirmButtonColor: "#ed5565",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            }, function () {
            	var successFunc=function()
            	{
            		updateRealtimes(selectedtask);
            		swal(
	                {
	                    title: "Deleted!",
	                    text: "You deleted it!",
	                    type: "success",
	                    confirmButtonColor: "#1ab394",
	                    confirmButtonText: "close"
	                });
            	}
            	var failureFunc=function()
            	{
            		swal('Oops!!',"Can't delete realtime please try again later","error");
            	}
            	Task.deleteRealtime(successFunc,failureFunc,realtime.id);

            });
	}
	$scope.setRealtime=function()
	{
		if($scope.realtime=="" || $scope.realtime==undefined || $scope.realtime==null)
		{
			swal("Enter a realtime","Please enter a realtime","error");
		}
		else
		{
			if(!isNaN($scope.realtime))
			{
				var successFunc=function()
				{
					updateRealtimes(selectedtask);
					updateView();
				}
				var failureFunc=function()
				{
					swal("Realtime not set","We couldn't set the realtime please try again later","error");
				}

				var data ={
				"realtime":$scope.realtime,
				"task_id":selectedtask.id
				}
				Task.addRealtime(successFunc,failureFunc,data);

			}
			else
				swal("Enter a number","Please enter a number in realtime","warning");

		}

	}
	$scope.deleteTask=function(task)
	{
		swal({
                title: "Are you sure?",
                text: 'You deleted it.',
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "cancel",
                confirmButtonColor: "#ed5565",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            }, function () {
                var successFunc=function()
                {
                	swal(
	                {
	                    title: "Deleted!",
	                    text: "You deleted it!",
	                    type: "success",
	                    confirmButtonColor: "#1ab394",
	                    confirmButtonText: "close"
	                });
	                updateView();
                }
                var failureFunc=function()
                {
                	swal(
	                {
	                    title: "Oops!",
	                    text: "Task not deleted please try again later",
	                    type: "error",
	                    confirmButtonColor: "#1ab394",
	                    confirmButtonText: "close"
	                });
                }
                Task.deleteTask(successFunc,failureFunc,task.id);

            });

	}
	var updateStatus=function(status)
	{
		ticket.status=status.status;
		$scope.ticket_status=ticket.status;
		localStorage.ticket=JSON.stringify(ticket);

	}
	$scope.sendToClient=function()
	{
		var estimation=0;
		var complete=true;
		for(i=0;i<$scope.tasks.length;i++)
		{
			if($scope.tasks[i].estimation==null || $scope.tasks[i].assignto==null)
			{
				complete=false;
			}
			else
				estimation+=$scope.tasks[i].estimation;
		}
		if(complete){
			swal({
	                title: "Are you sure?",
	                text: 'You want to send a total estimation of '+estimation+' h to client.',
	                type: "warning",
	                showCancelButton: true,
	                cancelButtonText: "cancel",
	                confirmButtonColor: "#ed5565",
	                confirmButtonText: "Yes, send it!",
	                closeOnConfirm: false
	            }, function () {

					var successFunc=function(data)
					{
						updateView();
						swal.close();
					}
					var failureFunc=function()
					{
						swal("Oops!","Can't send estimation to client");
					}
					Ticket.sendToClient(successFunc,failureFunc,ticket_id);


	        });
		}
		else
		{
			swal("Please Complete estimation and assign all stories","Some stories are not estimated or assigned yet","info");
		}

	}
	$scope.sendToProduction=function()
	{

		swal({
            title: "Are you sure?",
            text: 'You want to send the ticket to production',
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "cancel",
            confirmButtonColor: "#ed5565",
            confirmButtonText: "Yes, send it!",
            closeOnConfirm: false
	        }, function () {

				var successFunc=function(data)
				{
					updateView();
					swal.close();
				}
				var failureFunc=function()
				{
					swal("Oops!","Can't send estimation to client");
				}
				Ticket.sendToProd(successFunc,failureFunc,ticket_id);


	        });
	}
	$scope.acceptTicket=function()
	{

		swal({
                title: "You accept and close the ticket",
                type: "info",
                showCancelButton: true,
                cancelButtonText: "cancel",
                confirmButtonColor: "#1ab394",
                confirmButtonText: "accept",
                closeOnConfirm: false
            }, function () {
            	var successFunc=function()
				{
					swal(
	                {
	                    title: "Great!",
	                    text: "Your ticket is successfully closed",
	                    type: "success",
	                    confirmButtonColor: "#1ab394",
	                    confirmButtonText: "close"
	                });
					updateView();
				}
				var failureFunc=function()
				{
					swal("Can't accept ticket","We couldn't accept the ticket","error");

				}
                Ticket.acceptTicket(successFunc,failureFunc,ticket_id);
            });
	}
	$scope.openRejectModal=function()
	{

		$scope.rejectionmessage="";
		$("#reject-ticket").modal("show");
	}
	$scope.rejectTicket=function()
	{

    	var successFunc=function()
		{
			swal(
            {
                 title: "Thank you!",
                text: "Your ticket is successfully rejected",
                type: "success",
                confirmButtonColor: "#1ab394",
                confirmButtonText: "close"
            });
			updateView();
			$("#reject-ticket").modal("hide");
		}
		var failureFunc=function()
		{
			swal("Can't reject ticket","We couldn't reject the ticket","error");

		}
		if($scope.rejectionmessage===undefined || $scope.rejectionmessage===null || $scope.rejectionmessage==="")
		{
			var rejectionmessage="No message";
		}
		else
		{
			var rejectionmessage=$scope.rejectionmessage;
		}
		var data={"ticket_id":ticket_id,"message":rejectionmessage};
        Ticket.rejectTicket(successFunc,failureFunc,data);

	}
	$scope.finishTask=function(task)
	{
		swal({   title: "Finishing task..",   text: "This task will be Finish very soon..",   timer: 2000,   showConfirmButton: false });
		var successFunc=function(data)
		{
			updateView();
		}
		var failureFunc=function()
		{
			swal("Oops!","Can't finish story please try again later","error");
		}
		Task.finishTask(successFunc,failureFunc,task.id)
	}
	$scope.startTask=function(task)
	{
		if(task.estimation!=null)
		{
			if(task.type!="bug" && $scope.ticket_status!=$scope.ticketStatus.Production.status)
			{
				swal("Ticket not in production","This ticket is not in production yet","info");
				return;
			}
			swal({   title: "Starting task..",   text: "This task will start very soon..",   timer: 2000,   showConfirmButton: false });
			var successFunc=function()
			{
				updateView();
			}
			var failureFunc=function()
			{
				swal("Oops!","Can't start story please try again later","error");
			}
			Task.startTask(successFunc,failureFunc,task.id)
		}
		else
		{
			swal("Add estimation","please add estimation before starting story","info");
		}
	}
	$scope.addStory=function(story)
	{
		if(story==null)
		{
			$scope.storytype=$scope.taskTypes.Backend;
			$('#add-story').modal("show");
			$scope.isedit=false;
			$scope.storytitle="";
			$scope.storydescription="";
			if($scope.team.length==0){
				var selectdata={"id":-1,text:"No team found"};
				$("#selectassign").select2("data",selectdata);
				swal("Add memebers","please add team members before adding stories","error");
			}
			else
			{
				var selectdata={"id":-1,text:"Assign to"};
				$("#selectassign").select2("data",selectdata);
			}
			selectedtask=null;
		}
		else
		{
			$('#add-story').modal("show");
			$scope.isedit=true;
			for(i=0;i<$scope.taskTypes.types.length;i++)
			{
				if(story.type==$scope.taskTypes.types[i].type)
				{
					$scope.storytype=$scope.taskTypes.types[i];
				}

			}
			$scope.storytitle=story.title;
			$scope.storydescription=story.description;
			if($scope.team.length==0){
				var selectdata={"id":-1,text:"No team found"};
				$("#selectassign").select2("data",selectdata);
				swal("Add memebers","please add team members before adding stories","error");
			}
			else if(story.assignto!=null)
			{
				var selectdata={"id":-1,text:story.assignto.name+" "+story.assignto.surname+","+story.assignto.role.role};
				$("#selectassign").select2("data",selectdata);
				$scope.assignto=story.assignto;
			}
			else
			{
				var selectdata={"id":-1,text:"Assign to"};
				$("#selectassign").select2("data",selectdata);
			}
			selectedtask=story;
		}
	}

	var verifyForm=function()
	{
		var messages=[];
		if($scope.storytitle==undefined || $scope.storytitle=="" || $scope.storytitle==null)
		{
			messgaes.push("please enter a story title");
		}
		if($scope.storydescription==undefined || $scope.storydescription=="" || $scope.storydescription==null)
		{
			messgaes.push("please enter a story description");
		}
		if($scope.storytype=="empty")
		{
			messgaes.push("please choose a story type");
		}
		return messages;
	}
	$scope.createStory=function()
	{
		var messages=verifyForm();
		if(messages.length==0)
		{
			var data ={
				"title":$scope.storytitle,
				"description":$scope.storydescription,
				"type":$scope.storytype.type
			};
			if($scope.assignto!=undefined)
			{
				data.assignedTo={
					"role":$scope.assignto.role.role,
					"id":$scope.assignto.id
				};
			}
			for(i=0;i<$scope.team.length;i++)
			{
				if($scope.team[i].role.role==$scope.teamroles.TeamLeader.role)
				{
					data.owner=$scope.team[i].id;
				}
			}
			var successFunc=function()
			{
				swal("Success","Story added/edited successfully","success");
				updateView();
				if($scope.storytype==$scope.taskTypes.Bug)
					$('#add-bug').modal("hide");
				else
					$('#add-story').modal("hide");
			}
			var failureFunc=function()
			{
				swal("Oops","Something wrong happend please try again later","error");
			}
			if($scope.isedit)
			{
				data.task_id=selectedtask.id;
				Task.updateTask(successFunc,failureFunc,data);

			}
			else
			{
				data.ticket_id=ticket_id;
				Task.craeteTask(successFunc,failureFunc,data);
			}
		}
		else
		{
			swal("Please fill those information",messages.join('\n'),"warning");
		}
	}
	$scope.deliverToclient=function()
	{
		var realtime=0;
		var complete=true;
		for(i=0;i<$scope.tasks.length;i++)
		{
			if($scope.tasks[i].realtime==null)
			{
				complete=false;
			}
			else
				realtime+=$scope.tasks[i].realtime;
		}
		if(complete){
			swal({
	                title: "Are you sure?",
	                text: 'You want to deliver the ticket of total time '+realtime+' h to client.',
	                type: "warning",
	                showCancelButton: true,
	                cancelButtonText: "cancel",
	                confirmButtonColor: "#ed5565",
	                confirmButtonText: "Yes, send it!",
	                closeOnConfirm: false
	            }, function () {

					var successFunc=function(data)
					{

						updateView();
						swal.close();
					}
					var failureFunc=function()
					{
						swal("Oops!","Can't deliver ticket to client");
					}
					Ticket.deliverToClient(successFunc,failureFunc,ticket_id);


	        });
		}
		else
		{
			swal("Please Complete realtime","Real time for some stories is not set yet","info");
		}
	}
	$scope.startEstimation=function()
	{

		swal({
                title: "You start the ticket:",
                type: "info",
                showCancelButton: true,
                cancelButtonText: "cancel",
                confirmButtonColor: "#1ab394",
                confirmButtonText: "start now",
                closeOnConfirm: false
            }, function () {
            	var successFunc=function()
				{
					swal(
	                {
	                    title: "Great!",
	                    text: "Your ticket is send successfully to estimation",
	                    type: "success",
	                    confirmButtonColor: "#1ab394",
	                    confirmButtonText: "close"
	                });
					updateView();
				}
				var failureFunc=function()
				{
					swal("Can't start estimation","We couldn't statrt the estimation process","error");

				}
                Ticket.startEstimation(successFunc,failureFunc,ticket_id);
            });
	}
	$scope.acceptEstimation=function()
	{

		swal({
                title: "You confirm the estimation of "+ $scope.ticket_estimation+"h for",
                html: '<p><i class="fa fa-star project-type"></i> Contracting Process</p><div class="col-lg-12 acenter mb20"><div class="checkbox checkbox-alert checkbox-primary mt-5 mb-5"><input type="checkbox" id="checkbox3"><label for="checkbox3">I accept the <a href="#" target="_blank">Terms and Conditions</a></label></div></div>',
                type: "info",
                showCancelButton: true,
                cancelButtonText: "cancel",
                confirmButtonColor: "#1ab394",
                confirmButtonText: "i confirm",
                closeOnConfirm: false
            }, function () {
            	var successFunc=function()
				{
					swal(
	                {
	                    title: "Great!",
	                    text: "Your ticket is send successfully to production",
	                    type: "success",
	                    confirmButtonColor: "#1ab394",
	                    confirmButtonText: "close"
	                });
					updateView();
				}
				var failureFunc=function()
				{
					swal("Can't accept estimation","We couldn't accept the estimation","error");

				}
                Ticket.acceptEstimation(successFunc,failureFunc,ticket_id);
            });
	}
	$scope.rejectEstimation=function()
	{

		swal({
                title: "Reedit Ticket",
                //html: '<p><i class="fa fa-star project-type"></i>'+ticket.title+'</p>',
                text:"Your ticket will be saved as draft and you have to restart estimation after reediting this ticket. \nWould you like to reedit the ticket now?",
                type: "info",
                showCancelButton: true,
                cancelButtonText: "cancel",
                confirmButtonColor: "#1ab394",
                confirmButtonText: "i confirm",
                closeOnConfirm: false
            }, function () {
            	var successFunc=function()
				{
					swal(
	                {
	                    title: "Great!",
	                    text: "Your ticket is in draft now you can re-edit and start it again",
	                    type: "success",
	                    confirmButtonColor: "#1ab394",
	                    confirmButtonText: "close"
	                });
					updateView();
				}
				var failureFunc=function()
				{
					swal("Can't reject estimation","We couldn't reject the estimation","error");

				}
                Ticket.rejectEstimation(successFunc,failureFunc,ticket_id);
            });
	}
	Team.loadRoles(loadRoles);
	var tikettypes=function(data)
	{
		$scope.tickettypes=data;
		updateView();
	}
	Ticket.loadTicketTypes(tikettypes);
	$scope.backToProject=function()
	{
		$location.url("/pdetails/"+project_id);
	}
	$scope.openKeybox=function()
	{
		$location.url("/keybox/"+project_id);
	}
	$scope.uploadFile=function()
	{
		var formData = new FormData();
        formData.append('file',  document.getElementById('upfiles').files[0]);
        successFunc=function()
        {
        	$("#upload-file").modal('hide');
        	updateView();
        }
        failureFunc=function()
        {
        	swal("Can't upload file","we can't upload file please try again later","error");
        }
        Task.uploadTicketFile(successFunc,failureFunc,formData,ticket_id);
	}
	$scope.deleteFileTicket=function(file_id)
	{
		swal({
                title: "Are you sure?",
                text: 'You want to delete the file',
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "cancel",
                confirmButtonColor: "#ed5565",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            }, function () {
                var successFunc=function()
                {
                	swal(
	                {
	                    title: "Deleted!",
	                    text: "You deleted it!",
	                    type: "success",
	                    confirmButtonColor: "#1ab394",
	                    confirmButtonText: "close"
	                });
	                updateView();
                }
                var failureFunc=function()
                {
                	swal(
	                {
	                    title: "Oops!",
	                    text: "Task not deleted please try again later",
	                    type: "error",
	                    confirmButtonColor: "#1ab394",
	                    confirmButtonText: "close"
	                });
                }
                Task.deleteFile(successFunc,failureFunc,file_id);

            });
	}
	$scope.openAddBug=function(bug)
	{
		$scope.storytype=$scope.taskTypes.Bug;
		if(bug==null)
		{
			$('#add-bug').modal("show");
			$scope.isedit=false;
			$scope.storytitle="";
			$scope.storydescription="";
			if($scope.team.length==0){
				var selectdata={"id":-1,text:"No team found"};
				$("#selectassignbug").select2("data",selectdata);
				swal("Add memebers","please add team members before adding stories","error");
			}
			else
			{
				var selectdata={"id":-1,text:"Assign to"};
				$("#selectassignbug").select2("data",selectdata);
			}
			selectedtask=null;

		}
		else
		{
			$('#add-bug').modal("show");
			$scope.isedit=true;
			$scope.storytitle=bug.title;
			$scope.storydescription=bug.description;
			if($scope.team.length==0){
				var selectdata={"id":-1,text:"No team found"};
				$("#selectassignbug").select2("data",selectdata);
				swal("Add memebers","please add team members before adding stories","error");
			}
			else if(bug.assignto!=null)
			{
				var selectdata={"id":-1,text:bug.assignto.name+" "+bug.assignto.surname+","+bug.assignto.role.role};
				$("#selectassignbug").select2("data",selectdata);
				$scope.assignto=bug.assignto;
			}
			else
			{
				var selectdata={"id":-1,text:"Assign to"};
				$("#selectassignbug").select2("data",selectdata);
			}
			selectedtask=bug;
		}
	}
	$scope.AcceptBug=function(bug,accepted)
	{
		var successFunc=function()
		{
			updateView();
		}
		var failureFunc=function()
		{
			swal("Oops","Something wrong happend please try again later","error");
		}
		if(accepted)
		{
			var data={
				"task_id":bug.id,
				"accept":true
			}
			Task.acceptBug(successFunc,failureFunc,data);
		}
		else
		{
			$scope.rejectionbugmessage="";
			selectedtask=bug;
			$('#reject-bug').modal("show");
		}
	}
	$scope.rejectBug=function()
	{
		var successFunc=function()
		{
			updateView();
			$('#reject-bug').modal("hide");
		}
		var failureFunc=function()
		{
			swal("Oops","Something wrong happend please try again later","error");
		}

		var data={
			"task_id":selectedtask.id,
			"accept":false,
			"reason":$scope.rejectionbugmessage
		}
		Task.acceptBug(successFunc,failureFunc,data);

	}
	$scope.deliverBugs=function()
	{
		var successFunc=function()
		{
			$scope.openbug=false;
			swal("Bugs delivred","Bugs are successfully delivred to client","success");
		}
		var failurefunc=function()
		{
			swal("Oops","Something wrong happend please try again later","error");
		}
		Task.deliverBugs(successFunc,failurefunc,ticket_id);
	}

}]);
Controllers.controller('ContractCtrl', ['$scope',"Login","$routeParams","$location", function ($scope,Login,$routeParams,$location) {
	var customerid=$routeParams.cid;
	if(customerid==undefined)
		Login.logout();
	$scope.acceptContract=function()
	{
		var sucessFunc=function()
		{
			$location.url("/dashboard");
		}
		var failureFunc=function()
		{
			swal("Can't accept terms","Please try again later","error");
		}
		Login.signContract(sucessFunc,failureFunc,customerid);
	}
}]);
Controllers.controller('ClientProjectsCtrl', ['$scope',"Login","$routeParams","Project","$location","Team","Params",function ($scope,Login,$routeParams,Project,$location,Team,Params) {
	var customerid=$routeParams.cid;
	$scope.isPartner = false;
	$scope.isManager = false;
	$scope.isCreating = false;
	if(Login.getLoggedUser().userinfo.roles.indexOf("ROLE_PARTNER")>-1)
	{
		$scope.isPartner = true;
	}
	if(customerid==undefined)
		$location.path("/client");
	var loadRoles=function(data){
		$scope.teamroles=data;
	}
	var succsfunc=function(data)
	{
		$scope.skills=data;
	}

	var selectedPorject=null;
	var update=null;
	$scope.acceptContract=function(project)
	{
		var successFunc=function(){
			updateView();
		}
		var failureFunc=function()
		{
			swal("Can't accept contract","Sorry please try again later");
		}
		Project.acceptContract(successFunc,failureFunc,project.id);
	}
	updateView=function()
	{
		successFunc=function(data)
		{
			$scope.projects=data.data;
			$scope.isManager = data.isManaged;
			if(update===null)
			{
				var update=setInterval(updateView(), 5000);
				$scope.$on('$routeChangeStart',function(){
					clearInterval(update);
				});
			}
		}
		failureFunc=function()
		{
			swal("Oops","Can't load projects please try again later","error");
		}
		Project.projectsbyclient(successFunc,failureFunc,customerid);
	}
	var selectedproject=null;
	$scope.openRate=function(project)
	{
		if(project.rate!=null)
			$scope.prate=project.rate;
		else
			$scope.prate="";
		$("#add-rate").modal("show");
		selectedproject=project;
	}
	$scope.openAddEstimation=function(project)
	{
		if(project.estimation!=null)
		{
			$scope.pestimation=project.estimation;
			$scope.pperiod=project.period;
		}
		else
		{
			$scope.pestimation="";
			$scope.pperiod="";
		}
		$("#add-estimation").modal("show");
		selectedproject=project;
	}
	$scope.assignEstimation=function()
	{
		if($scope.pperiod!="" && $scope.pperiod!=undefined && $scope.pestimation!="" && $scope.pestimation!=undefined)
		{
			data={
				"project_id":selectedproject.id,
				"estimation":$scope.pestimation,
				"period":$scope.pperiod
			}
			var successFunc=function()
			{
				updateView();
				$("#add-estimation").modal("hide");
			}
			var failureFunc=function()
			{
				swal("Oops!","Can't set the rate please try again later","error");
			}
			Project.assignProjectEstimation(successFunc,failureFunc,data);
		}
		else
		{
			swal("Missing values","Please add project estimation in hours and project period in Months","warning");
		}
	}
	$scope.assignRate=function()
	{
		if($scope.prate!="" && $scope.prate!=null && $scope.prate!=undefined)
		{
			data={
				"project_id":selectedproject.id,
				"rate":$scope.prate
			}
			var successFunc=function()
			{
				updateView();
				$("#add-rate").modal("hide");
			}
			var failureFunc=function()
			{
				swal("Oops!","Can't set the rate please try again later","error");
			}
			Project.assignProjectRate(successFunc,failureFunc,data);
		}
	}
	$scope.$on('$viewContentLoaded', function(){

	   updateView();

		Team.loadRoles(loadRoles);
  	});


	$scope.openPrepareContract=function(project)
	{
		$("#prepare-project").modal('show');
		if(project.rate!=null)
			$scope.prate=project.rate;
		selectedproject=project;
		$scope.projectname=project.name;
		$scope.projectcurrency=project.currency;
	}
	var verifyContractForm=function()
	{
		var messages=[];
		if($scope.apdescription===undefined || $scope.apdescription==null || $scope.apdescription=="")
		{
			messages.push('Please add project description\n');
		}
		if($scope.prate===undefined || $scope.prate==null || $scope.prate=="")
		{
			messages.push('Please add project rate\n');
		}
		if(isNaN($scope.prate))
		{
			messages.push('rate must be a numeric value\n');
		}
		return messages;
	}
	$scope.prepareContract=function()
	{
		var messages=verifyContractForm();
		if(messages.length==0)
		{
			var succsfunc=function()
			{
				updateView();
				$("#prepare-project").modal('hide');
			}
			var failurefunc=function()
			{
				swal("Can't send contract","Can't send contract please try again later");
			}
			var data={
				"project_id":selectedproject.id,
				"description":$scope.apdescription,
				"rate":$scope.prate
			}
			Project.prepareContract(succsfunc,failurefunc,data);
		}
		else
		{
			swal("Form info",messages.join(""),"warning");
		}
	}
	$scope.openAddprojectModelFromclient=function(project)
	{
		Params.getSkills(succsfunc);
		$scope.selectedClient=customerid;
		selectedproject=project;
		if(project==null){

			$scope.aprojecttitle=undefined;
			$scope.apbriefing=undefined;
			$scope.aprojectskills=undefined;
			$scope.iedit=false;
		}
		else
		{
			$scope.aprojecttitle=project.name;;
			$scope.apbriefing=project.briefing;
			$scope.aprojectskills=project.skills.split(",");
			$("#apskillsselct").select2("val",$scope.aprojectskills);
			$scope.iedit=true;
		}
		$("#admin-add-project").modal('show');

	}
	var verifyForm=function()
	{
		var messages=new Array();
		if($scope.aprojecttitle===undefined)
		{
			messages.push("Please add the project title\n");

		}
		if($scope.apbriefing===undefined)
		{
			messages.push("Please add the project description\n");

		}
		if($scope.aprojectskills===undefined)
		{
			messages.push("Please add the project required skills\n");

		}
		return messages;
	}
	$scope.createAdminProject=function()
	{
		var messages =verifyForm();
		if(messages.length>0)
		{
			swal("Please fill all the information",messages.join('\n'),"warning");
		}
		else
		{
			$scope.isCreating = true;
			var project={
				"name":$scope.aprojecttitle,
				"briefing":$scope.apbriefing,
				"skills":""+$scope.aprojectskills
			}
			if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_ADMIN" || Login.getLoggedUser().userinfo.roles[0]=="ROLE_KEYACCOUNT")
			{
				project.customer_id=$scope.selectedClient;
			}
			var successFunc=function()
			{
				$scope.isCreating = false;
				$("#admin-add-project").modal('hide');
				swal("Project added","Project added/updated successfully","success");
				updateView();
			}
			var failureFunc=function()
			{
				$scope.isCreating = false;
				swal("Oops!","Something bad happen please try again later","error");
			}
			if(!$scope.iedit)
				Project.createProject(project,successFunc,failureFunc);
			if($scope.iedit)
			{
				project.project_id=selectedproject.id;
				Project.updateProject(project,successFunc,failureFunc);

			}
		}
	}
	var newDevMembers=new Array();
	var newSysMember=new Array();
	var newDesignerMembers=new Array();
	var newTesterMembers=new Array();
	var newTealeader=null;
	var oldmembers;
	var oldteamlead;
	var getOldTeamLeader=function()
	{
		for(i=0;i<$scope.team.length;i++)
		{
			if($scope.team[i].isTeamLeader)
				return $scope.team[i];
		}
		return null;
	}
	$scope.openAddMember=function(project)
	{
		newDevMembers=[];
		newSysMember=[];
		newDesignerMembers=[];
		newTesterMembers=[];
		oldmembers=project.team.slice();
		$scope.team=project.team;
		selectedPorject=project;
		var successFunc=function(data)
		{
			if(data.length==0)
			{
				var selectdata={"id":-1,text:"No team found"};
				$("#selectdevmember").select2("data",selectdata);
			}
			else{
				var selectdata={"id":-1,text:"Search Member "};
				$("#selectdevmember").select2("data",selectdata);
				$scope.addedmember=null;
				$scope.devteam=data;
			}
		}
		var failureFunc=function()
		{
			var selectdata={"id":-1,text:"Please try again later"};
			$("#selectdevmember").select2("data",selectdata);
		}
		var loadingdata={"id":-1,text:"Loading..."};
		$("#selectdevmember").select2("data",loadingdata);
		Team.getAlldevteamMembers(successFunc,failureFunc);
		$('#add-member').modal('show');
	}
	var isOldMember=function(member)
	{
		for(i=0;i<oldmembers.length;i++)
		{
			if(member.id==oldmembers[i].id && oldmembers[i].role.role==member.role.role)
				return true;
		}
		return false;
	}

	$scope.changeRole=function(member,index)
	{
		if(index==0)
		{
			for(i=0;i<$scope.team.length;i++)
				$scope.team[i].isTeamLeader=false;
			member.isTeamLeader=true;
		}
		else
		{
			member.isTeamLeader=false;
		}
	}
	$scope.adddevmember=function(){
		$scope.addedmember.isTeamLeader=false;
		if(!isOldMember($scope.addedmember))
		{
			var added=false;
			if($scope.addedmember.role.role==Team.roles.Developer.role){

				for(i=0;i<newDevMembers.length;i++)
				{
					if(newDevMembers[i].id==$scope.addedmember.id)
						added=true;
				}
				if(!added)
					newDevMembers.push($scope.addedmember);
			}
			if($scope.addedmember.role.role==Team.roles.Tester.role){
				for(i=0;i<newTesterMembers.length;i++)
				{
					if(newTesterMembers[i].id==$scope.addedmember.id)
						added=true;
				}
				if(!added)
					newTesterMembers.push($scope.addedmember);
			}
			if($scope.addedmember.role.role==Team.roles.Designer.role){
				for(i=0;i<newDesignerMembers.length;i++)
				{
					if(newDesignerMembers[i].id==$scope.addedmember.id)
						added=true;
				}
				if(!added)
					newDesignerMembers.push($scope.addedmember);
			}
			if($scope.addedmember.role.role==Team.roles.SysAdmin.role){
				for(i=0;i<newSysMember.length;i++)
				{
					if(newSysMember[i].id==$scope.addedmember.id)
						added=true;
				}
				if(!added)
					newSysMember.push($scope.addedmember);
			}
			if(added)
			{
				swal("Team member already added","Team member is already added","warning");
			}
			else
			{
				if($scope.addedmember.role.role!=Team.roles.TeamLeader.role)
					$scope.team.push($scope.addedmember);
			}
		}
		else
		{
			swal("Team member already added","Team member is already added","warning");
		}
	}
	$scope.saveTeamMembers=function()
	{
		var success=function()
		{
			$('#add-member').modal('hide');
		}
		var failure=function()
		{
			swal("Oopss!!","Something wrong happend, please try again","error");
		}
		for(i=0;i<$scope.team.length;i++)
		{
			if($scope.team[i].isTeamLeader)
			{
				var data={
					"project_id":selectedPorject.id,
					"teamleader_id":$scope.team[i].id,
					"teamleader_role":$scope.team[i].role.role
				}
				Project.assignTeamLeader(success,failure,data);
			}
		}
		if(newDevMembers.length>0)
		{
			var members=[];
			for(i=0;i<newDevMembers.length;i++)
			{
				members.push(newDevMembers[i].id);

			}
			var data={
					"project_id":selectedPorject.id,
					"developers":members
			}
			Project.addDeveloper(success,failure,data);

		}
		if(newTesterMembers.length>0)
		{
			var members=[];
			for(i=0;i<newTesterMembers.length;i++)
			{
				members.push(newTesterMembers[i].id);
			}
			var data={
					"project_id":selectedPorject.id,
					"testers":members
			}
			Project.addTester(success,failure,data);

		}
		if(newDesignerMembers.length>0)
		{
			var members=[];
			for(i=0;i<newDesignerMembers.length;i++)
			{
				members.push(newDesignerMembers[i].id);
			}
			var data={
					"project_id":selectedPorject.id,
					"designers":members
			}
			Project.addDesigner(success,failure,data);

		}
		if(newSysMember.length>0)
		{
			var members=[];
			for(i=0;i<newSysMember.length;i++)
			{
				members.push(newSysMember[i].id);
			}
			var data={
					"project_id":selectedPorject.id,
					"sysadmins":members
			}
			Project.addSystemAdmin(success,failure,data);

		}
	}
	$scope.deleteTeamMember=function(member)
	{
		swal({
            title: "Are you sure?",
            text: 'You want to delete member?',
            type: "warning",
            showCancelButton: true,
            cancelButtonText: "cancel",
            confirmButtonColor: "#ed5565",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
	    }, function () {
	        var success=function()
			{
				var index=$scope.team.indexOf(member);
				$scope.team.splice(index,1);
				oldmembers.splice(index, 1);
			}
			var failure=function()
			{
				$('#teamfailure').modal("show");
				$('#teamfailure').find('p').html("Something wrong happend, please try again later");
			}
			if(isOldMember(member))
			{

				if(member.role.role==Team.roles.Developer.role){
					var data={
						"project_id":selectedPorject.id,
						"developers":[member.id]
					}
					Project.deleteDeveloperFromProject(success,failure,data);

				}
				if(member.role.role==Team.roles.Tester.role){
					var data={
						"project_id":selectedPorject.id,
						"testers":[member.id]
					}
					Project.deleteTesterFromProject(success,failure,data);
				}
				if(member.role.role==Team.roles.Designer.role){
					var data={
						"project_id":selectedPorject.id,
						"designers":[member.id]
					}
					Project.deleteDesignerFromProject(success,failure,data);
				}
				if(member.role.role==Team.roles.SysAdmin.role){
					var data={
						"project_id":selectedPorject.id,
						"sysadmins":[member.id]
					}
					Project.deleteSysAdminFromProject(success,failure,data);
				}
			}
			else
			{
				if(member.role.role==Team.roles.Developer.role){
					var index=newDevMembers.indexOf(member);
					newDevMembers.splice(index,1);

				}
				if(member.role.role==Team.roles.Tester.role){
					var index=newTesterMembers.indexOf(member);
					newTesterMembers.splice(index,1);
				}
				if(member.role.role==Team.roles.Designer.role){
					var index=newDesignerMembers.indexOf(member);
					newDesignerMembers.splice(index,1);
				}
				if(member.role.role==Team.roles.SysAdmin.role){
					var index=newSysMember.indexOf(member);
					newSysMember.splice(index,1);
				}
				var index=$scope.team.indexOf(member);
				$scope.team.splice(index,1);
			}
	    });

	}
	$scope.closeTeamModal=function()
	{
		if(newDevMembers.length>0)
		{

			for(i=0;i<newDevMembers.length;i++)
			{
				var index=$scope.team.indexOf(newDevMembers[i]);
				$scope.team.splice(index, 1);
			}

		}
		if(newTesterMembers.length>0)
		{
			for(i=0;i<newTesterMembers.length;i++)
			{
				var index=$scope.team.indexOf(newTesterMembers[i]);
				$scope.team.splice(index, 1);
			}
		}
		if(newDesignerMembers.length>0)
		{
			for(i=0;i<newDesignerMembers.length;i++)
			{
				var index=$scope.team.indexOf(newDesignerMembers[i]);
				$scope.team.splice(index, 1);
			}
		}
		if(newSysMember.length>0)
		{
			var members=[];
			for(i=0;i<newSysMember.length;i++)
			{
				var index=$scope.team.indexOf(newSysMember[i]);
				$scope.team.splice(index, 1);
			}
		}

		for(i=0;i<$scope.team.length;i++)
		{
			if(oldteamlead!=null)
				if($scope.team[i].id==oldteamlead.id && $scope.team[i].role.role==oldteamlead.role.role)
				{
					$scope.team[i].isTeamLeader=true;
				}
				else
					$scope.team[i].isTeamLeader=false;
			else
				$scope.team[i].isTeamLeader=false;
		}
		$('#add-member').modal('hide');

	}
}]);
Controllers.controller('ReportCtrl',['$scope','$routeParams','Project','Ticket','Login','Client',function($scope,$routeParams,Project,Ticket,Login,Client)
{
	var project_id = null;
	var ticketStatus=Ticket.ticketstatus;
	$scope.isTicketReport=true;
	$scope.isDateReport=false;
	var d = new Date();
	$scope.month=d.getMonth()+1;
	$('#selectedmonth').val($scope.month);
	$scope.year=d.getFullYear();
	$scope.project_name="No projects";
	var dataObject=null;
	$scope.paymentstatus="all";
	$scope.showMarker=false;
	$scope.showClients=false;
	$scope.showProjects=false;
	$scope.filterData = {
		"selectedproject":null,
		"selectedclient" : {"companyname":"No clients added yet"}
	};
	
	var init={id:-1,text:"selected a project"};
	$('#selectedproject').select2("data",init);
	
	$scope.filterPayment=function()
	{
		$scope.showMarker=false;
		var filtred=new Array();
		if($scope.paymentstatus=="all")
		{
			$scope.data=dataObject.data;
			$scope.totalestimation=dataObject.totalestimated;
			$scope.totalrealtime=dataObject.totalrealtime;
			$scope.btime=dataObject.btime;
		}
		else
		{
			$scope.totalestimation=0;
			$scope.totalrealtime=0;
			$scope.btime=0;
			for(i=0;i<dataObject.data.length;i++)
			{
				if($scope.paymentstatus=="open")
				{
					if(dataObject.data[i].status==ticketStatus.Done.status && dataObject.data[i].open)
					{
						filtred.push(dataObject.data[i]);
						$scope.totalrealtime+=parseFloat(dataObject.data[i].totalhours);
						$scope.totalestimation+=parseFloat(dataObject.data[i].totalestimatedhours);
						if(dataObject.data[i].totalestimatedhours>dataObject.data[i].totalhours)
							$scope.btime+=dataObject.data[i].totalhours;
						else
							$scope.btime+=dataObject.data[i].totalestimatedhours;

					}
					if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_KEYACCOUNT" || Login.getLoggedUser().userinfo.roles[0]=="ROLE_ADMIN")
						$scope.showMarker=true;
				}
				if($scope.paymentstatus=="billed")
				{
					if(dataObject.data[i].billed)
					{
						filtred.push(dataObject.data[i]);
						$scope.totalrealtime+=parseFloat(dataObject.data[i].totalhours);
						$scope.totalestimation+=parseFloat(dataObject.data[i].totalestimatedhours);
						if(dataObject.data[i].totalestimatedhours>dataObject.data[i].totalhours)
							$scope.btime+=dataObject.data[i].totalhours;
						else
							$scope.btime+=dataObject.data[i].totalestimatedhours;
					}
				}
				if($scope.paymentstatus=="payed")
				{
					if(dataObject.data[i].payed)
					{
						filtred.push(dataObject.data[i]);
						$scope.totalrealtime+=parseFloat(dataObject.data[i].totalhours);
						$scope.totalestimation+=parseFloat(dataObject.data[i].totalestimatedhours);
						if(dataObject.data[i].totalestimatedhours>dataObject.data[i].totalhours)
							$scope.btime+=dataObject.data[i].totalhours;
						else
							$scope.btime+=dataObject.data[i].totalestimatedhours;
					}
				}
			}
			$scope.data=filtred;
		}

	}
	$scope.markasAllAsbilled=function()
	{
		var sucessFunc=function()
		{
			$scope.paymentstatus="all";
			$scope.showMarker=false;
			updateTicketView($scope.month,$scope.year);
		}
		var failureFunc=function()
		{
			swal("Can't bill tickets","Oopps!! can't bill the tickets please try again later","error");
		}
		var tickets=new Array();
		for(i=0;i<$scope.data.length;i++)
		{
			tickets.push($scope.data[i].id);
		}
		var obj={"tickets":tickets};
		Ticket.markManyAsBilled(sucessFunc,failureFunc,obj);
	}
	$scope.changeView=function(number){
		if(number==0)
		{
			$scope.isTicketReport=false;
			$scope.isDateReport=true;
			updateDateView($scope.month,$scope.year);
			$scope.showMarker=false;
		}
		else if (number==1) {
			$scope.isTicketReport=true;
			$scope.isDateReport=false;
			updateTicketView($scope.month,$scope.year);
		}
	}
	var successFunc=function(data)
	{
		$scope.data=data.data;
		dataObject=data;
		$scope.totalestimation=data.totalestimated;
		$scope.totalrealtime=data.totalrealtime;
		$scope.btime=data.btime;
	}
	var failureFunc=function()
	{
		swal("Can't generate report","Oopps!! can't generate the report please try again later","error");
	}
	$scope.changeDate=function()
	{
		$scope.month=$('#selectedmonth').val();
		$scope.year=$('#selectedyear').val();
		if($scope.isTicketReport)
		{
			updateTicketView($scope.month,$scope.year);
		}
		else
		{
			updateDateView($scope.month,$scope.year);
		}
	}
	var updateTicketView=function(month,year)
	{
		var d = new Date();
		if(month==null)
		{
			month=d.getMonth()+1;
		}
		if(year==null)
		{
			year=d.getFullYear();
		}
		if(project_id!=null)
			Project.getTicketReportbyMonth(successFunc,failureFunc,month,year,project_id);
	}
	var updateDateView=function(month,year)
	{
		var d = new Date();
		if(month==null)
		{
			month=d.getMonth()+1;
		}
		if(year==null)
		{
			year=d.getFullYear();
		}
		if(project_id!=null)
			Project.getDateReportbyMonth(successFunc,failureFunc,month,year,project_id);
	}
	var loadclients = function()
	{
		var successFunc = function(data)
		{
			if(data.length > 0)
			{
				$scope.clients = data;
				$scope.filterData.selectedclient = data[0];
				$scope.showClients = true;
				loadProjects(false);
			}
			
		}
		var failurefunc = function()
		{
			$scope.showClients = false;
		}
		Client.getAllClients(successFunc,failurefunc,1);

	}
	$scope.LoadByProject = function()
	{
		if($scope.filterData.selectedproject != null)
		{
			project_id = $scope.filterData.selectedproject.id;
			$scope.project_name = $scope.filterData.selectedproject.name;
			if($scope.isTicketReport)
			{
				updateTicketView($scope.month,$scope.year);
			}
			else
			{
				updateDateView($scope.month,$scope.year);
			}
		}
	}
	$scope.loadByClient = function()
	{
		
		loadProjects(false);
	}
	var loadProjects = function(isclient)
	{
		var succesfunc = function(data)
		{
			if(data.data.length > 0)
				hundleProjects(data.data,true);
		}
		var hundleProjects = function(data,showclient)
		{
			var loaddedProjects = data;
			$scope.showClients = showclient;
			$scope.showProjects = true;
			$scope.projects = loaddedProjects;
			$scope.filterData.selectedproject = loaddedProjects[0];
			project_id = loaddedProjects[0].id;
			$scope.project_name = loaddedProjects[0].name;
			if($scope.isTicketReport)
			{
				updateTicketView($scope.month,$scope.year);
			}
			else
			{
				updateDateView($scope.month,$scope.year);
			}
			

		}
		if(isclient)
		{
			Project.getAllproject(function(data){
				hundleProjects(data.projects,false)

			});
		}
		else
		{
			var client_id = $scope.filterData.selectedclient.id;
			var failurefunc = function ()
			{
				$scope.projects=[];
				
			}
			Project.projectsbyclient(succesfunc,failurefunc,client_id);
		}
	}
	if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSTOMER" || Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSER")
	{
		loadProjects(true);
	}
	else
	{
		loadclients();
	}
	
}]);
Controllers.controller('DashboardCtrl',['$scope','$routeParams','Login',function($scope,$routeParams,Login)
{
	$scope.isclient=false;
	$scope.isadmin=false;
	if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_ADMIN")
	{
		$scope.isadmin=true;
	}
	if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSER" || Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSTOMER")
	{
		$scope.isclient=true;
	}
}]);
Controllers.controller('adminDashCtrl',['$scope','$routeParams','Login','Dashboard',function($scope,$routeParams,Login,Dashboard)
{
	console.log("getting data");
	var successFunc=function(data)
	{
		$scope.dashData=data;
	}
	var failurefunc=function()
	{
		swal("Can't generate admin dashboard","Oopps!! can't generate admin dashboard please try again later","error");
	}
	Dashboard.loadAdminDashboard(successFunc,failurefunc);
}]);
Controllers.controller('clientDashCtrl',['$scope','$routeParams','Login','Dashboard','Params',"Project","$location",function($scope,$routeParams,Login,Dashboard,Params,Project,$location)
{
	$scope.name=Login.getLoggedUser().userinfo.name;
	$scope.isCreating = false;
	var openAddprojectModal=function()
		{
			var succsfunc=function(data)
				{
					$scope.skills=data;
				}
				Params.getSkills(succsfunc);
			$("#add-project-dash").modal('show');

		}
		$scope.openAddprojectModel=openAddprojectModal;

		var verifyForm=function()
		{
			var messages=new Array();
			if($scope.projecttitle_dash===undefined)
			{
				messages.push("Please add the project title\n");

			}
			if($scope.briefing_dash===undefined)
			{
				messages.push("Please add the project description\n");

			}
			if($scope.projectskills_dash===undefined)
			{
				messages.push("Please add the project required skills\n");

			}

			return messages;
		}
		$scope.createProject=function()
		{
			var messages =verifyForm();
			if(messages.length>0)
			{
				swal("Complete information",messages,"info");
			}
			else
			{
				$scope.isCreating = true;
				var project={
					"name":$scope.projecttitle_dash,
					"briefing":$scope.briefing_dash,
					"skills":""+$scope.projectskills_dash
				}
				var successFunc=function(data)
				{
					$scope.isCreating = false;
					$("#add-project-dash").modal('hide');
					$location.url("/pdetails/"+data.project_id);
					window.location.reload(false);

				}
				var failureFunc=function()
				{
					$scope.isCreating = false;
					swal("Oops!!", "Something bad happend please try again later", "error");
				}
				Project.createProject(project,successFunc,failureFunc);
			}
		}
}]);
Controllers.controller("InvoiceCtrl",["$scope","Login","Invoice","$location","$routeParams",function($scope,Login,Invoice,$location,$routeParams)
{
	$scope.unpaidTickets = [];
	$scope.unpaidInvoices = [];
	$scope.paidInvoices = [];
	$scope.listLoaded = false;
	getInvoiceList = function()
	{
		var sucessFunc = function(data)
		{
			$scope.unpaidTickets = data.unbilledTicket;
			$scope.unpaidInvoices = data.unpaidInvoices;
			$scope.paidInvoices = data.paidInvoices;
			$scope.listLoaded = true;
		}
		var failurefunc = function()
		{
			$scope.listLoaded = true;
		}
		Invoice.getUnpaidTickets(sucessFunc,failurefunc);
	}
	$scope.createInvoice = function(project_id,index)
	{
		var sucessFunc = function(data)
		{
			$scope.unpaidInvoices.unshift(data);
			$scope.unpaidTickets.splice(index,1);
		}
		var failurefunc = function()
		{
			swal("Error","Can't create invoice please try again later","error");
		}
		Invoice.createInvoice(sucessFunc,failurefunc,project_id);
	}
	$scope.payInvoice = function(invoice_id,index)
	{
		var succsfunc = function()
		{
			var invoice = $scope.unpaidInvoices[index];
			$scope.paidInvoices.unshift(invoice);
			$scope.unpaidInvoices.splice(index,1);
		}
		var failurefunc = function()
		{
			swal("Error","Can't mark invoice as payed please try again later","error");
		}
		Invoice.payInvoice(succsfunc,failurefunc,invoice_id);
	}
	$scope.backToInvoices = function()
	{
		window.history.back();
	}
	if($location.url() == "/admininvoicepaids" || $location.url() == "/invoice")
	{
		var d = new Date();
		$scope.month = d.getMonth()+1;
		$scope.year = d.getFullYear();
		$("#selectedmonth").val($scope.month);
		$scope.allInvoices = [];
		var loadList = function()
		{
			var succsfunc = function(data)
			{
				$scope.allInvoices = data;
			}
			Invoice.getAllInvoiceList(succsfunc,$scope.month,$scope.year);
		}
		loadList();
		$scope.changeDate = function()
		{
			loadList();
		}
	}
	if($location.url().startsWith("/invoicedetails"))
	{
		$scope.invoice = {};
		var invoice_id = $routeParams.invoiceid;
		var succesfunc = function(data)
		{
			$scope.invoice = data;
		}
		var failurefunc = function()
		{
			swal("Error","Couldn't load invoice details please try again later");
			window.history.back();
		}
		Invoice.loadInvoiceInfo(succesfunc,failurefunc,invoice_id);
	}
	if($location.url().startsWith("/invoice/report/"))
	{
		$scope.totalestimation = 0;
		$scope.totalrealtime = 0;
		$scope.btime=0;
		$scope.data=[];
		var successFunc=function(data)
		{
			$scope.data=data.data;
			dataObject=data;
			$scope.totalestimation=data.totalestimated;
			$scope.totalrealtime=data.totalrealtime;
			$scope.btime=data.btime;
		}
		var failurefunc = function()
		{
			swal("Error","Couldn't load invoice report please try again later");
			window.history.back();
		}
		var id = $routeParams.id;
		var isInvoice = false;
		if($routeParams.invoice == "invoice")
			var isInvoice = true;
		Invoice.loadInvoiceReport(successFunc,failurefunc,id,isInvoice);
	}
	if(Login.getLoggedUser().userinfo.roles[0] === "ROLE_ADMIN")
	{
		getInvoiceList();
	}
}]);
Controllers.controller("PartnerCtrl",["$scope","Login","Team","$location","$routeParams",function($scope,Login,Team,$location,$routeParams)
{
	$scope.partners = [];
	$scope.send=false;
	$scope.stateChanged=function()
	{
		if($scope.send)
		{
			$scope.send=false;
		}
		else
			$scope.send=true;
	}
	$scope.canmanage=false;
	var updateAdminView = function()
	{
		var successfunc = function(data)
		{
			$scope.partners = data;
		} 
		Team.getPartnersList(successfunc);
	}
	if(Login.getLoggedUser().userinfo.roles[0] === "ROLE_ADMIN")
	{
		updateAdminView();
	}
	var validateForm=function()
	{
		var messages =[];
		if($scope.surname===undefined)
		{
			messages.push("Please fill the surname");
		}
		if($scope.name===undefined)
		{
			messages.push("Please fill the name");
		}
		if($scope.phonecode===undefined)
		{
			messages.push("Please fill the phone code");
		}
		if($scope.phonenumber===undefined)
		{
			messages.push("Please fill the phone number");
		}
		if($scope.email===undefined)
		{
			messages.push("Please fill the email");
		}
		if($scope.password===undefined)
		{
			messages.push("Please fill the password");
		}
		if($scope.city===undefined)
		{
			messages.push("Please fill the city");
		}
		if($scope.country===undefined)
		{
			messages.push("Please fill the country");
		}
		if($scope.language===undefined)
		{
			messages.push("Please fill the language");
		}
		return messages;

	}
	$scope.openmemberForm=function(member)
	{
		if(member!=null)
		{
			$scope.email=member.email;
			$scope.password="******";
			$scope.name=member.name;
			$scope.surname=member.surname;
			$scope.city=member.city;
			$scope.phonenumber=member.phonenumber;
			$scope.phonecode=member.phonecode;
			$("#phonecodeselect").select2("val",member.phonecode);
			$scope.country=member.country;
			$("#countryselect").select2("val",member.country);
			$scope.language=member.language.split(',');
			$("#luanguageselect").select2("val",member.language.split(','));
			$scope.isedit=true;
			if(member.companyname != null)
				$scope.companyname = member.companyname;
			debugger;
			$scope.canmanage = member.canmanage;
			$scope.oldmember=member;


		}
		else{
			cleanForm();
			$scope.isedit=false;
			$scope.canmanage=false;
			$("#countryselect").select2("data",{id:-1,"text":"Country"});

		}
		$('#add-user').modal('show');
	}
	function cleanForm()
	{
		$scope.email=undefined;
		$scope.password=undefined;
		$scope.name=undefined;
		$scope.surname=undefined;
		$scope.phonecode="+49";
		$scope.phonenumber=undefined;
		$scope.city=undefined;
		$scope.country=undefined;
		$scope.language=undefined;
		$scope.level=undefined;
		$scope.companyname=undefined;
		$scope.canmanage=false;
		$("#phonecodeselect").select2("val","49");
		$("#countryselect").select2("val","Country");
	}
	$scope.createTeamMember=function(oldmember)
	{
		var messages=validateForm();
		if(messages.length>0)
		{

			swal("Please Fill missing information",messages.join('\n'),"warning");
		}
		else
		{
			var succesfunc=function()
			{
				$('#add-user').modal('hide');

				swal("Success","Member Added/Updated successfully","success");
				updateAdminView();
				cleanForm();

			}
			var failureFunction=function(msg)
			{
				swal("Oops!","Can't add team member please try again later","error");
			}
			var member={
				"email":$scope.email,
				"login":$scope.email,
				"name":$scope.name,
				"surname":$scope.surname,
				"phonecode":$scope.phonecode,
				"phonenumber":$scope.phonenumber,
				"city":$scope.city,
				"country":$scope.country,
				"dosend":$scope.send,
				"language":""+$scope.language,
				"ispartner":true,
				"canmanage":$scope.canmanage
			};
			if($scope.companyname!="")
				member.companyname=$scope.companyname;
			if($scope.password!="******")
				member.password=$scope.password;
			if(oldmember==null){
					Team.createKeyAccount(member,succesfunc,failureFunction);
			}
			else
			{
				member["id"]=oldmember.id;
				Team.updateKeyAccount(member,succesfunc,failureFunction);
			}
		}
	}
	$scope.deleteMember=function(member)
	{
		swal({
                title: "Are you sure?",
                text: 'You deleted it.',
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "cancel",
                confirmButtonColor: "#ed5565",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            }, function () {
            	var succesfunc=function()
				{
					$('#delete').modal('hide');
					$('#add-user').modal('hide');
					swal("Success","Member deleted successfully","success");
					updateAdminView();
					cleanForm();
					swal.close();

				}
				var failureFunction=function(msg)
				{
					swal("Oops!","Can't delete team member please try again later","error");
				}
				Team.deleteKeyAccount(member,succesfunc,failureFunction);
		 });

	}
	$scope.uploadImage=function(member)
	{
		  var $image = $(".image-crop > img")
		  var successFunc=function()
		  {
		  	$("#change-picture").modal("hide");
		  	updateAdminView();
		  }
		  var failurefunc=function(msg)
		  {
		  	swal("Oops!","Can't upload team member please try again later","error");
		  }
		  $scope.photo=$image.cropper("getDataURL");
		  Team.uploadMemberImage(member.id,member.role.role,$image.cropper("getDataURL"),successFunc,failurefunc)

	}
	$scope.openImageUplaoder=function(member)
	{
		$("#change-picture").modal("show");
		$scope.oldmember=member;
		$scope.defaultimage=member.bigphoto;

	}
}]);
Controllers.controller("CommissionCtrl",["$scope","Login","Commission","$location","$routeParams",function($scope,Login,Commission,$location,$routeParams)
{
	$scope.uninvoiced = [];
	$scope.unpaids = [];
	$scope.paids = [];
	$scope.listLoaded = false;
	

	getAdminData = function()
	{
		var succesfunc =  function(data)
		{
			$scope.uninvoiced = data.uninvoiced;
			$scope.unpaids = data.unpaid;
			$scope.paids =  data.paid;
			$scope.listLoaded = true;
		}
		var failurefunc = function()
		{
			$scope.listLoaded = true;
		}
		Commission.loadAdminList(succesfunc,failurefunc);

	}
	$scope.payCommission = function(comm,index)
	{
		var succesfunc = function()
		{
			$scope.unpaids.splice(index,1);
			$scope.paids.unshift(comm);
		}
		var failurefunc = function()
		{
			swal("Flexwork error","Can't pay the credit please try again later","error");
		}
		Commission.payCommission(succesfunc,failurefunc,comm.id);
	}
	if($location.url() == "/admin/credit/list" || $location.url() == "/credit")
	{
		var d = new Date();
		$scope.month = d.getMonth()+1;
		$scope.year = d.getFullYear();
		$("#selectedmonth").val($scope.month);
		$scope.commissions = [];
		selectedCommission = null;
		$scope.selectedinvoice=null;
	    $scope.$on("fileSelected", function (event, args) {
	        $scope.$apply(function () {
	        	var extension = args.file.name.split('.').pop().toLowerCase();
	        	if(extension === "pdf")
	            	$scope.selectedinvoice = args.file;
	            else
	            	swal("Wrong format","please upload pdf files only","warning");
	        });
	    });
		var loadList = function()
		{
			var succsfunc = function(data)
			{
				$scope.commissions = data;
			}
			Commission.getAllCommList(succsfunc,$scope.month,$scope.year);
		}
		loadList();
		$scope.changeDate = function()
		{
			loadList();
		}
		$scope.openUploadInvoice = function(commission)
		{
			selectedCommission = commission;
			$scope.selectedinvoice=null;
			$("#upload-file").modal("show");
		}
		$scope.uploadInvoice = function()
		{
			if($scope.selectedinvoice != null)
			{
				var formData = new FormData();
	        	formData.append('file',  $scope.selectedinvoice);
				var succsfunc = function()
				{
					loadList();
					$("#upload-file").modal("hide");
				}
				var failureFunc = function()
				{
					swal("Invoice not uploaded","We couldn't upload your invoice please try again later","error");
				}
				if(selectedCommission != null)
					Commission.uploadCommInvoice(succsfunc,failureFunc,formData,selectedCommission.id);
				else
				{
					swal("No commission selected","Please select a commission to upload invoice","warning");
					$("#upload-file").modal("hide");
				}
			}
			else
			{
				swal("No file selected","Please select a invoice file before uploading","warning");
			}
			
				
		} 
	}
	if(Login.getLoggedUser().userinfo.roles[0] === "ROLE_ADMIN")
	{
		getAdminData();
	}
}]);