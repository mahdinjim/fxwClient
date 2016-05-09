var Controllers=angular.module('Controllers',[]);
Controllers.controller('LoginCtrl',['$scope','Login','$location',
	function LoginCtrl($scope,Login,$location){
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
					setTimeout(function() {
			                toastr.options = {
			                    closeButton: true,
			                    progressBar: true,
			                    showMethod: 'slideDown',
			                    timeOut: 4000
			                };
			                toastr.success('Create your project & start your task', 'Welcome to flexwork.io');

			            }, 1300);
        
				};
				var failureFunction=function(mess)
				{
					$scope.errors=mess;
					$('#loginbtn').prop('disabled', false);
				};
					
				Login.doLogin(login,password,successfunc,failureFunction);
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
		$scope.isclient=true;
		if(Login.getLoggedUser().userinfo.keyaccount.photo==null)
			Login.getLoggedUser().userinfo.keyaccount.photo="img/users/profile_default_small.jpg";
		$scope.keyaccount=Login.getLoggedUser().userinfo.keyaccount;
	}

	$scope.logout=function(){
		Login.logout(false);
	}
	
}]);
Controllers.controller("SideBarCtrl",['$scope','Login','Chat','Client','Project',
	function SideBarCtrl($scope,Login,Chat,Client,Project)
	{
		$scope.canAdd=false;
		$scope.isclient=false;;
		if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSTOMER" || Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSER"){
			$scope.isclient=true;
		}
		if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSTOMER" || Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSER"  ||Login.getLoggedUser().userinfo.roles[0]=="ROLE_ADMIN" || Login.getLoggedUser().userinfo.roles[0]=="ROLE_KEYACCOUNT")
		{
			$scope.canAdd=true;

		}
		$scope.totalmessages=0;
		var getnewMessagesNumber=function()
		{
			
			for(i=0;i<$scope.channels.length;i++)
			{
				var end =$scope.channels.length-1;
				var sum=0;
				var successfunc=function(data,channel,i,end,sum)
				{
					if(data.result)
						channel.newmessages=data.undread_count;
					else
						channel.newmessages=0;
					
					if(i==end)
					{
						$scope.totalmessages=sum;
					}
					
				}
				Chat.getNewMessagesNumber($scope.channels[i],successfunc,i,end);

			}
		}
		var getprojects=function()
		{
			var successfunc=function(data)
			{
				$scope.channels=data.channels;
				$scope.projects=data.projects;
				getnewMessagesNumber();
				var newmessagesinterval=setInterval(getnewMessagesNumber, 20000);
				$scope.$on('$routeChangeStart',function(){
					clearInterval(newmessagesinterval);
				});
			}
			Project.getAllproject(successfunc);
		}
		
		getprojects();
		
		
		
		
		var userinf= Login.getLoggedUser().userinfo;
		$scope.name=userinf.name;
		$scope.surname=userinf.surname;
		if(userinf.compnay_name!=undefined)
			$scope.company=userinf.compnay_name;
		else
			$scope.company="adnatives/Disycs";
		$scope.title=userinf.title;
		$scope.logout=function(){
			Login.logout();
		}
		$scope.doDisplay=function(path)
		{
			return Login.haveAccess(path);
		}

		$scope.openAddprojectModel=function()
		{
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
		var verifyForm=function()
		{
			var messages=new Array();
			if($scope.projecttitle===undefined)
			{
				messages.push("Please add the project title</br>");

			}
			if($scope.description===undefined)
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
				var project={
					"name":$scope.projecttitle,
					"description":$scope.description,
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
					getprojects();
				}
				var failureFunc=function()
				{
					
					swal("Oops!!", "Something bad happend please try again later", "error");
				}
				Project.createProject(project,successFunc,failureFunc);
			}
		}
		
	}
	]);
Controllers.controller('TeamCtrl', ['$scope','Team','Params','$location', function ($scope,Team,Params,$location) {
    

    $scope.tab="operations";
    $scope.isoperation=true;
    $scope.isexpertise=false;
    var roles=null;
    Team.loadRoles(function(data)
	{
		roles=data;
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
    }
    $scope.selectExpertise=function()
    {
    	$scope.tab="expertise";
    	$scope.isexpertise=true;
    	$scope.isoperation=false;
    	
    }
	var successfunc=function(data){
		$scope.team=data;
	};
	Team.getAllteamMembers(successfunc);
	$scope.send=false;
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
		//BAD: Is not a very good solution to use jquery to initiate values
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
		$scope.phonecode=undefined;
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
		$("#phonecodeselect").select2("val","+49");
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
	}])

Controllers.controller('ClientCtrl', ['$scope','Client','Login', function ($scope,Client,Login) {
	$scope.isSent=false;
	$scope.currentpage=1;
	$scope.isEdit=false;
	if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_ADMIN")
	{
		$scope.isadmin=true;
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
	updateView($scope.currentpage);
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
			$scope.companyname=client.companyname;
			$scope.zipcode=client.address.zipcode;
			
			var data={"id":0,text:client.keyaccount.name+" "+client.keyaccount.surname};
			$("#keyaccountselect").select2("data",data);
			$scope.selectedKeyaccount=client.keyaccount.id;
			$("#phonecode").select2("val",client.phonecode);
			$("#countryselect").select2("data",{id:-1,text:client.address.country});
			$scope.isEdit=true;
			$scope.oldclient=client;
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
		$scope.phonecode=undefined;
		$scope.phonenumber=undefined;
		$scope.address=undefined;
		$scope.city=undefined;
		$scope.country=undefined;
		$scope.companyname=undefined;
		$scope.zipcode=undefined;
		$scope.selectedKeyaccount===undefined
		
		$("#keyaccountselect").select2("data",{id:-1,text:"Key Account"});
		$("#countryselect").select2("data",{id:-1,text:"Country"});
		$("#phonecode").select2("val","+49");
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
		if($scope.selectedKeyaccount===undefined && Login.getLoggedUser().userinfo.roles[0]=="ROLE_ADMIN")
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
				"isSent":$scope.isSent
			};
			if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_ADMIN")
			{
				client.keyaccount_id=$scope.selectedKeyaccount;
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
		var successfunc=function(cusers)
		{
			$scope.cusers=cusers;
		}
		Cuser.getAllUsers(successfunc,null,1);
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
	function cleanForm()
	{
		$scope.email=undefined;
		$scope.password=undefined;
		$scope.name=undefined;
		$scope.surname=undefined;
		$scope.phonecode=undefined;
		$scope.phonenumber=undefined;
		$scope.title=undefined;
		$("#phonecodeselect").select2("val","+49");
		$scope.issent=false;
		
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
					clearForm();
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

	}
	$scope.openProfile=function(user)
	{
		Params.setCuser(user);
		$location.path("/cuserprofile");
	}

}]);
Controllers.controller('SettingsCtrl', ['$scope','Chat', function ($scope,Chat) {

	
	
}])
Controllers.controller("ChatCtrl",["$scope","$rootScope","Chat","$routeParams","Login",function($scope,$rootScope,Chat,$routeParams,Login){
	$scope.loadingteam=true;
	$scope.loadingmessages=true;
	$scope.messageto=null;
	
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
		console.log($scope.messagetext);
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
		alert(msg);
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
Controllers.controller("ProjectCtrl",["$scope","Project","$routeParams","Login","Team","$location","Ticket","Params",function($scope,Project,$routeParams,Login,Team,$location,Ticket,Params){
	$scope.isclient=false;
	$scope.isAdmin=false;
	$scope.isTeamLeader=false;
	$scope.isMember=false;
	
	$scope.hasteam=true;
	$scope.ticketStatus=Ticket.ticketstatus;
	var channel_id=null;
	var updateTickets=function()
	{
		var successFunc=function(data)
		{
			$scope.hasTicket=true;
			$scope.tickets=data;
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
	else if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_TEAMLEADER")
	{
		$scope.isTeamLeader=true;
	}
	else if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSTOMER" || Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSER"|| Login.getLoggedUser().userinfo.roles[0]=="ROLE_KEYACCOUNT"){
		$scope.isclient=true;
	}
	else{
		$scope.isMember=true;
	}
	$scope.username=Login.getLoggedUser().userinfo.surname+ " "+Login.getLoggedUser().userinfo.name;
	var ticketupdater=null;
	var succesFunc=function(data)
	{
		$scope.company_name=data.customer;
		$scope.project_name=data.name;
		for(i=0;i<data.team.length;i++)
			if(data.team[i].photo==null)
				data.team[i].photo="img/users/profile_default_small.jpg";
		Params.setProject(data);
		$scope.team=data.team;
		$scope.tickets=data.tickets;
		$scope.projectDescription=data.description;
		$scope.projectSkilss=data.skills;
		$scope.budget=data.budget;
		$scope.issigned=data.signed;
		$scope.client=data.client;
		channel_id=data.channel_id;

		if(data.tickets.length==0)
		{
			$scope.hasTicket=false;
		}
		else
		{
			$scope.hasTicket=true;
			ticketupdater=setInterval(updateTickets, 10000);
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
		if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSTOMER" || Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSER"){

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
	var newTealeader=null;
	var oldmembers;
	$scope.openAddMember=function()
	{
		newDevMembers=[];
		newSysMember=[];
		newDesignerMembers=[];
		newTesterMembers=[];
		newTealeader=null;
		oldmembers=$scope.team.slice();
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
	var projectHaveLeader=function()
	{
		for(i=0;i<oldmembers.length;i++)
		{
			if(oldmembers[i].role.role==Team.roles.TeamLeader.role)
				return oldmembers[i];
		}
		return false;
	}
	$scope.adddevmember=function(){
		if(!isOldMember($scope.addedmember))
		{
			var added=false;

			if($scope.addedmember.role.role==Team.roles.TeamLeader.role){
				var oldleader=projectHaveLeader();
				if(oldleader)
				{
					var index =$scope.team.indexOf(oldleader);
					$scope.team.splice(index,1);
				}
				else if(newTealeader!=null && newTealeader!=$scope.addedmember){
					var index =$scope.team.indexOf(newTealeader);
					$scope.team.splice(index,1);
				}
				newTealeader=$scope.addedmember;
				$scope.team.unshift(newTealeader);
				
			}
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
				$('#teamwarning').modal("show");
				$('#teamwarning').find('p').html("Team member is already added");
			}
			else
			{
				if($scope.addedmember.role.role!=Team.roles.TeamLeader.role)
					$scope.team.push($scope.addedmember);
			}
		}
		else
		{
			$('#teamwarning').modal("show");
			$('#teamwarning').find('p').html("Team member is already added");
		}
	}
	$scope.saveTeamMembers=function()
	{
		var success=function()
		{
			$('#add-member').modal('hide');
			console.log("New members added successfully");
		}
		var failure=function()
		{
			$('#teamfailure').modal("show");
			$('#teamfailure').find('p').html("Something wrong happend, please try again");
		}
		if(newTealeader!=null)
		{
			var data={
					"project_id":project_id,
					"teamleader_id":newTealeader.id
				}
			Project.assignTeamLeader(success,failure,data);
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
				console.log("members deleted successfully");
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
		if(newTealeader!=null)
		{
			var data={
					"project_id":project_id,
					"teamleader_id":newTealeader.id
				}
			Project.assignTeamLeader(success,failure,data);
		}
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
		if(newTealeader!=null)
		{
			
			var index=$scope.team.indexOf(newTealeader);
			$scope.team.splice(index, 1);
			var oldleader=projectHaveLeader();
			if(oldleader){
				$scope.team.unshift(oldleader);
			}
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
		$location.url("/keybox").search({"project_id": project_id});;
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
			$location.url("/messaging").search({"channel_id": channel_id});
		}
		else
		{
			swal("No channel","No messaging channel was created for this project","info")
		}
	}
	var editedTicket=null;
	$scope.setFeature=function()
	{
		$scope.conceptselct=false;
		$scope.designselct=false;
		$scope.bugselct=false;
		$scope.devselct=true;
	}
	$scope.setBug=function()
	{
		$scope.conceptselct=false;
		$scope.designselct=false;
		$scope.bugselct=true;
		$scope.devselct=false;
	}
	$scope.setConcept=function()
	{
		$scope.conceptselct=true;
		$scope.designselct=false;
		$scope.bugselct=false;
		$scope.devselct=false;
	}
	$scope.setDesign=function()
	{
		$scope.conceptselct=false;
		$scope.designselct=true;
		$scope.bugselct=false;
		$scope.devselct=false;
	}
	$scope.openCreateTicket=function(ticket)
	{
		if(ticket!=null)
		{
			if(ticket.type==$scope.tickettypes[4].type){
				$scope.conceptselct=false;
				$scope.designselct=true;
				$scope.featureselct=false;
				$scope.bugselct=false;
				$scope.devselct=false;
				//$("#radio3").trigger('click');
				}
			else if(ticket.type==$scope.tickettypes[3].type){
				$scope.conceptselct=true;
				$scope.designselct=false;
				$scope.featureselct=false;
				$scope.bugselct=false;
				$scope.devselct=false;
				$("#radio2").attr("checked", "checked");
				
			}
			else if(ticket.type==$scope.tickettypes[1].type)
			{
				$scope.conceptselct=false;
				$scope.designselct=false;
				
				$scope.bugselct=false;
				$scope.devselct=true;
				//$("#radio1").attr("checked", "checked");
				$("#radio1").prop("checked", true);
				$("#radio2").prop("checked", false);
				$("#radio3").prop("checked", false);
				$("#radio4").prop("checked", false);
				
				
			}
			else if(ticket.type==$scope.tickettypes[2].type)
			{
				$scope.conceptselct=false;
				$scope.designselct=false;
				$scope.featureselct=false;
				$scope.bugselct=true;
				$scope.devselct=false;
				$("#radio1").prop("checked", false);
				$("#radio2").prop("checked", true);
				$("#radio3").prop("checked", false);
				$("#radio4").prop("checked", false);
				
			}
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
			if($scope.designselct){
				data.type=$scope.tickettypes[4].type;
			}
			else if($scope.conceptselct){
				data.type=$scope.tickettypes[3].type;
			}
			else if($scope.devselct)
			{
				data.type=$scope.tickettypes[1].type;
		
			}
			else if($scope.bugselct){
				data.type=$scope.tickettypes[2].type;
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
				Ticket.createTicket(successFunc,failureFunc,data);
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
                title: "You reject the estimation for", 
                //html: '<p><i class="fa fa-star project-type"></i>'+ticket.title+'</p>',
                text:"hello",
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
	                    text: "Estimation rejected successfully", 
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
		$location.path("/stories");
	}
	Project.getProjectDetails($routeParams.project_id,succesFunc,failureFunc);
}]);
Controllers.controller('KeyboxCtrl', ['$scope','KeyBox',"$routeParams","Login","$location", function ($scope,KeyBox,$routeParams,Login,$location) {
	var project_id=$routeParams.project_id;
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
		$location.url("/pdetails").search({"project_id": project_id});
	}
	$scope.saveKeyBox=function()
	{
		for(i=0;i<$scope.configs.length;i++)
		{
			var failureFunc=function()
			{
				console.log("failure");
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
					console.log('success');
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
Controllers.controller('StoriesCtrl', ['$scope','Login','Params','$location','Team','Ticket',"Task", function ($scope,Login,Params,$location,Team,Ticket,Task) {
	$scope.isclient=false;
	$scope.isAdmin=false;
	$scope.isTeamLeader=false;
	$scope.isMember=false;
	var project=Params.getProject();
	var ticket=Params.getTicket();
	$scope.company_name=project.customer;
	$scope.project_name=project.name;
	$scope.team=project.team;
	$scope.ticket_name=ticket.title;
	$scope.ticket_id=ticket.displayId;
	$scope.ticket_type=ticket.type;
	$scope.ticketStatus=Ticket.ticketstatus;
	$scope.ticket_decription=ticket.description;
	$scope.ticket_status=ticket.status;
	$scope.ticket_realtime=ticket.realtime;
	$scope.ticket_estimation=ticket.estimation;
	$scope.username=Login.getLoggedUser().userinfo.surname+ " "+Login.getLoggedUser().userinfo.name;
	$scope.tasks=ticket.tasks;
	$scope.totaltasks=ticket.taskscount;
	$scope.finishedtasks=ticket.finishedtasks;
	$scope.rejectionmessage=ticket.rejectionmessage;
	$scope.docs=project.docs;
	var updateView=function()
	{
		sucessFunc=function(data)
		{
			$scope.tasks=data;
			ticket.tasks=data;
			localStorage.ticket=JSON.stringify(ticket);
		}
		failureFunc=function(err)
		{
			console.log(err);
		}
		Task.getAllTasks(sucessFunc,failureFunc,ticket.id);
	}
	updateView();
	var loadRoles=function(data){
		$scope.teamroles=data;
	}
	var selectedtask;
	$scope.openAddEstimation=function(estimation,task)
	{
		if(estimation!=null)
		{
			if(estimation==1)
				$("#selectest").select2("data",{"id":1,'text':"1 h"});
			if(estimation==2)
				$("#selectest").select2("data",{"id":2,'text':"2 h"});
			if(estimation==3)
				$("#selectest").select2("data",{"id":3,'text':"3 h"});
			if(estimation==4)
				$("#selectest").select2("data",{"id":4,'text':"4 h"});
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
						ticket.estimation=data.estimation;
						$scope.ticket_estimation=ticket.estimation;
						updateStatus(Ticket.ticketstatus.Goproduction);
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
					updateStatus(Ticket.ticketstatus.Production);
					swal.close();
				}
				var failureFunc=function()
				{
					swal("Oops!","Can't send estimation to client");
				}
				Ticket.sendToProd(successFunc,failureFunc,ticket.id);
						
						
	        });
	}
	$scope.acceptTicket=function()
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
					updateStatus(Ticket.ticketstatus.Done);
				}
				var failureFunc=function()
				{
					swal("Can't accept ticket","We couldn't accept the ticket","error");

				}
                Ticket.acceptTicket(successFunc,failureFunc,ticket.id);
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
			updateStatus(Ticket.ticketstatus.Reject);
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
		var data={"ticket_id":ticket.id,"message":rejectionmessage};
        Ticket.rejectTicket(successFunc,failureFunc,data);
           
	}
	$scope.finishTask=function(task)
	{
		swal({   title: "Finishing task..",   text: "This task will be Finish very soon..",   timer: 5000,   showConfirmButton: false });
		var successFunc=function(data)
		{
			ticket.finishedtasks+=1;
			if(data.done)
				updateStatus(Ticket.ticketstatus.Testing)
			updateView();
		}
		var failureFunc=function()
		{
			swal("Oops!","Can't start story please try again later","error");
		}
		Task.finishTask(successFunc,failureFunc,task.id)
	}
	$scope.startTask=function(task)
	{
		swal({   title: "Starting task..",   text: "This task will start very soon..",   timer: 5000,   showConfirmButton: false });
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
	$scope.addStory=function(story)
	{
		if(story==null)
		{
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
			$scope.storytitle=story.title;
			$scope.storydescription=story.description;
			if($scope.team.length==0){
				var selectdata={"id":-1,text:"No team found"};
				$("#selectassign").select2("data",selectdata);
				swal("Add memebers","please add team members before adding stories","error");
			}
			else
			{
				var selectdata={"id":-1,text:story.assignto.name+" "+story.assignto.surname+","+story.assignto.role.role};
				$("#selectassign").select2("data",selectdata);
				$scope.assignto=story.assignto;
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
		if($scope.assignto==undefined || $scope.assignto=="" || $scope.assignto==null)
		{
			messgaes.push("please assign the story to a team member");
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
				"assignedTo":{
					"role":$scope.assignto.role.role,
					"id":$scope.assignto.id
				}
			};
			for(i=0;i<project.team.length;i++)
			{
				if(project.team[i].role.role==$scope.teamroles.TeamLeader.role)
				{
					data.owner=project.team[i].id;
				}
			}
			var successFunc=function()
			{
				swal("Success","Story added/edited successfully","success");
				updateView();
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
				data.ticket_id=ticket.id;
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
						ticket.realtime=data.realtime;
						$scope.ticket_estimation=ticket.realtime;
						updateStatus(Ticket.ticketstatus.Accept);
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
	$scope.startEstimation=function()
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
					updateStatus(Ticket.ticketstatus.Estimation);
				}
				var failureFunc=function()
				{
					swal("Can't start estimation","We couldn't statrt the estimation process","error");

				}
                Ticket.startEstimation(successFunc,failureFunc,ticket.id);
            });
	}
	$scope.acceptEstimation=function()
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
					updateStatus(Ticket.ticketstatus.Waiting);
				}
				var failureFunc=function()
				{
					swal("Can't accept estimation","We couldn't accept the estimation","error");

				}
                Ticket.acceptEstimation(successFunc,failureFunc,ticket.id);
            });
	}
	$scope.rejectEstimation=function()
	{
		
		swal({
                title: "You reject the estimation for", 
                //html: '<p><i class="fa fa-star project-type"></i>'+ticket.title+'</p>',
                text:"hello",
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
	                    text: "Estimation rejected successfully", 
	                    type: "success",
	                    confirmButtonColor: "#1ab394",
	                    confirmButtonText: "close"
	                });
					updateStatus(Ticket.ticketstatus.Estimation);
				}
				var failureFunc=function()
				{
					swal("Can't reject estimation","We couldn't reject the estimation","error");

				}
                Ticket.rejectEstimation(successFunc,failureFunc,ticket.id);
            });
	}
	Team.loadRoles(loadRoles);
	var tikettypes=function(data)
	{
		$scope.tickettypes=data;
	}
	Ticket.loadTicketTypes(tikettypes);
	$scope.backToProject=function()
	{
		$location.url("/pdetails").search({"project_id": project.id});
	}
	$scope.openKeybox=function()
	{
		$location.url("/keybox").search({"project_id": project.id});
	}
	if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_ADMIN")
	{
		$scope.isAdmin=true;
	}
	else if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_TEAMLEADER")
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
	$scope.uploadFile=function()
	{
		var formData = new FormData();
        formData.append('file',  document.getElementById('upfiles').files[0]);
        successFunc=function()
        {
        	$("#upload-file").modal('hide');
        	successFunc=function(data)
        	{
        		$scope.docs=data;
        	}
        	Task.listFiles(successFunc,project.id);
        }
        failureFunc=function()
        {
        	swal("Can't upload file","we can't upload file please try again later","error");
        }
        Task.uploadFile(successFunc,failureFunc,formData,project.id);
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
			swal("Congratulation","Welcome to flexwork please login again","info");
		}
		var failureFunc=function()
		{
			swal("Can't accept terms","Please try again later","error");
		}
		Login.signContract(sucessFunc,failureFunc,customerid);
	}
}]);
Controllers.controller('ClientProjectsCtrl', ['$scope',"Login","$routeParams","Project","$location","Team",function ($scope,Login,$routeParams,Project,$location,Team) {
	var customerid=$routeParams.cid;
	if(customerid==undefined)
		$location.path("/client");
	var loadRoles=function(data){
		$scope.teamroles=data;
	}
	Team.loadRoles(loadRoles);
	var selectedPorject=null;
	updateView=function()
	{
		successFunc=function(data)
		{
			$scope.projects=data;
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
				swal("Oops!","Can't set the rate please try agaib later","error");
			}
			Project.assignProjectRate(successFunc,failureFunc,data);
		}
	}
	updateView();

	var update=setInterval(updateView(), 5000);
	$scope.$on('$routeChangeStart',function(){
					clearInterval(update);
				});
	$scope.openAddprojectModelFromclient=function(project)
	{
		$scope.selectedClient=customerid;
		selectedproject=project;
		if(project==null){
			
			$scope.aprojecttitle=undefined;
			$scope.apdescription=undefined;
			$scope.aprojectskills=undefined;
			$scope.iedit=false;
		}
		else
		{
			$scope.aprojecttitle=project.name;;
			$scope.apdescription=project.description;
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
		if($scope.apdescription===undefined)
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
			var project={
				"name":$scope.aprojecttitle,
				"description":$scope.apdescription,
				"skills":""+$scope.aprojectskills
			}
			if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_ADMIN" || Login.getLoggedUser().userinfo.roles[0]=="ROLE_KEYACCOUNT")
			{
				project.customer_id=$scope.selectedClient;
			}
			var successFunc=function()
			{
				$("#admin-add-project").modal('hide');
				swal("Project added","Project added/updated successfully","success");
				updateView();
			}
			var failureFunc=function()
			{
				
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
	$scope.openAddMember=function(project)
	{
		newDevMembers=[];
		newSysMember=[];
		newDesignerMembers=[];
		newTesterMembers=[];
		newTealeader=null;
		console.log(project.team);
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
	var projectHaveLeader=function()
	{
		for(i=0;i<oldmembers.length;i++)
		{
			if(oldmembers[i].role.role==Team.roles.TeamLeader.role)
				return oldmembers[i];
		}
		return false;
	}
	$scope.adddevmember=function(){
		if(!isOldMember($scope.addedmember))
		{
			var added=false;

			if($scope.addedmember.role.role==Team.roles.TeamLeader.role){
				var oldleader=projectHaveLeader();
				if(oldleader)
				{
					var index =$scope.team.indexOf(oldleader);
					$scope.team.splice(index,1);
				}
				else if(newTealeader!=null && newTealeader!=$scope.addedmember){
					var index =$scope.team.indexOf(newTealeader);
					$scope.team.splice(index,1);
				}
				newTealeader=$scope.addedmember;
				$scope.team.unshift(newTealeader);
				
			}
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
				$('#teamwarning').modal("show");
				$('#teamwarning').find('p').html("Team member is already added");
			}
			else
			{
				if($scope.addedmember.role.role!=Team.roles.TeamLeader.role)
					$scope.team.push($scope.addedmember);
			}
		}
		else
		{
			$('#teamwarning').modal("show");
			$('#teamwarning').find('p').html("Team member is already added");
		}
	}
	$scope.saveTeamMembers=function()
	{
		var success=function()
		{
			$('#add-member').modal('hide');
			console.log("New members added successfully");
		}
		var failure=function()
		{
			$('#teamfailure').modal("show");
			$('#teamfailure').find('p').html("Something wrong happend, please try again");
		}
		if(newTealeader!=null)
		{
			var data={
					"project_id":selectedPorject.id,
					"teamleader_id":newTealeader.id
				}
			Project.assignTeamLeader(success,failure,data);
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
		var success=function()
		{
			var index=$scope.team.indexOf(member);
			$scope.team.splice(index,1);
			console.log("members deleted successfully");
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
	}
	$scope.closeTeamModal=function()
	{
		if(newTealeader!=null)
		{
			var data={
					"project_id":selectedPorject.id,
					"teamleader_id":newTealeader.id
				}
			Project.assignTeamLeader(success,failure,data);
		}
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
		if(newTealeader!=null)
		{
			
			var index=$scope.team.indexOf(newTealeader);
			$scope.team.splice(index, 1);
			var oldleader=projectHaveLeader();
			if(oldleader){
				$scope.team.unshift(oldleader);
			}
		}
		$('#add-member').modal('hide');

	}
}]);