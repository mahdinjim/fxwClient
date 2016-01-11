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
Controllers.controller("MenuNavCtrl",['$scope','Login',
	function SideBarCtrl($scope,Login)
	{
		$scope.logout=function(){
			Login.logout(false);
		}
	}
	]);
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
					channel.newmessages=data.undread_count;
					
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
				$("#warning").modal('show');
				$('#warning').find('p').html(messages);
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
					$("#success").modal('show');
					$('#success').find('p').html("Project added successfully");
					getprojects();
				}
				var failureFunc=function()
				{
					
					$("#failure").modal('show');
					$('#failure').find('p').html("Something bad happend please try again later");
				}
				Project.createProject(project,successFunc,failureFunc);
			}
		}
		
	}
	]);
Controllers.controller('TeamCtrl', ['$scope','Team','Params','$location', function ($scope,Team,Params,$location) {
    
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
		if($scope.role!=undefined)
		{
			if($scope.role!="Key Account" && $scope.skills===undefined)
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

		if($scope.role==="Key Account")
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
			$scope.role=member.role;
			$("#roleselect").select2("val",member.role);
			$("#roleselect").prop("disabled",true);
			if(member.role!="Key Account")
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
			
			$("#warning").modal('show');
			$('#warning').find('p').html(messages);
		}
		else
		{
			var succesfunc=function()
			{
				$('#add-user').modal('hide');
				
				$("#success").modal('show');
				$('#success').find('p').html('Member created successfully');
				Team.getAllteamMembers(successfunc);
				cleanForm();

			}
			var failureFunction=function(msg)
			{
				$("#failure").modal('show');
				$('#failure').find('p').html(msg);
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
			};
			if($scope.password!="******")
				member.password=$scope.password;
			if(oldmember==null){
				if($scope.role==="Teamleader")
					Team.createTeamLeader(member,succesfunc,failureFunction);
				if($scope.role==="Developer")
					Team.createDeveloper(member,succesfunc,failureFunction);
				if($scope.role==="Administrator")
					Team.createSysAdmin(member,succesfunc,failureFunction);
				if($scope.role==="Tester")
					Team.createTester(member,succesfunc,failureFunction);
				if($scope.role==="Key Account")
					Team.createKeyAccount(member,succesfunc,failureFunction);
				if($scope.role==="Designer")
					Team.createDesigner(member,succesfunc,failureFunction);
			}
			else
			{
				member["id"]=oldmember.id;
				if($scope.role==="Teamleader")
					Team.updateTeamLeader(member,succesfunc,failureFunction);
				if($scope.role==="Developer")
					Team.updateDeveloper(member,succesfunc,failureFunction);
				if($scope.role==="Administrator")
					Team.updateSysAdmin(member,succesfunc,failureFunction);
				if($scope.role==="Tester")
					Team.updateTester(member,succesfunc,failureFunction);
				if($scope.role==="Key Account")
					Team.updateKeyAccount(member,succesfunc,failureFunction);
				if($scope.role==="Designer")
					Team.updateDesigner(member,succesfunc,failureFunction);
			}
		}
	}
	$scope.deleteMember=function(member)
	{
		var succesfunc=function()
		{
			$('#delete').modal('hide');
			$('#add-user').modal('hide');
			$("#success").modal('show');
			$('#success').find('p').html('Member deleted successfully');
			Team.getAllteamMembers(successfunc);
			cleanForm();

		}
		var failureFunction=function(msg)
		{
			$("#failure").modal('show');
			$('#failure').find('p').html(msg);
		}
		if($scope.role==="Teamleader")
			Team.deleteTeamLeader(member,succesfunc,failureFunction);
		if($scope.role==="Developer")
			Team.deleteDeveloper(member,succesfunc,failureFunction);
		if($scope.role==="Administrator")
			Team.deleteSysAdmin(member,succesfunc,failureFunction);
		if($scope.role==="Tester")
			Team.deleteTester(member,succesfunc,failureFunction);
		if($scope.role==="Key Account")
			Team.deleteKeyAccount(member,succesfunc,failureFunction);
		if($scope.role==="Designer")
			Team.deleteDesigner(member,succesfunc,failureFunction);
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
		  	$("#failure").modal('show');
			$('#failure').find('p').html("Couldn't uplaod picture please try again later");
		  }
		  $scope.photo=$image.cropper("getDataURL");
		  Team.uploadMemberImage(member.id,member.role,$image.cropper("getDataURL"),successFunc,failurefunc)

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
			$scope.isEdit=true;
			$scope.oldclient=client;
		}
		else
		{
			$scope.isEdit=false;
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
		$("#keyaccountselect").select2("val","Key Account");
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
	$scope.createClient=function(oldclient)
	{
		var messages=verifyForm();
		if(messages.length>0)
		{
			
			$("#warning").modal('show');
			$('#warning').find('p').html(messages);
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
				$("#failure").modal('show');
				$('#failure').find('p').html(msg);
			}
			var succesfunc=function(msg)
				{
					$('#delete').modal('hide');
					$('#add-client').modal('hide');
					$("#success").modal('show');
					$('#success').find('p').html(msg);
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
			$("#success").modal('show');
			$('#success').find('p').html('Member deleted successfully');
			updateView($scope.currentpage);
			clearForm();

		}
		var failureFunction=function(msg)
		{
			$("#failure").modal('show');
			$('#failure').find('p').html(msg);
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
			
			$("#warning").modal('show');
			$('#warning').find('p').html(messages);
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
				$("#failure").modal('show');
				$('#failure').find('p').html(msg);
			}
			var succesfunc=function(msg)
				{
					$('#delete').modal('hide');
					$('#add-user').modal('hide');
					$("#success").modal('show');
					$('#success').find('p').html(msg);
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
			$("#success").modal('show');
			$('#success').find('p').html('Member deleted successfully');
			updateView();
			cleanForm();

		}
		var failureFunction=function(msg)
		{
			$("#failure").modal('show');
			$('#failure').find('p').html(msg);
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
		  	$("#failure").modal('show');
			$('#failure').find('p').html("Couldn't uplaod picture please try again later");
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
Controllers.controller("ProjectCtrl",["$scope","Project","$routeParams","Login","Team",function($scope,Project,$routeParams,Login,Team){
	$scope.isclient=false;
	$scope.isAdmin=false;
	$scope.isTeamLeader=false;
	$scope.isMember=false;
	var project_id=$routeParams.project_id;
	var loadRoles=function(data){
		$scope.teamroles=data;
	}
	Team.loadRoles(loadRoles);
	if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_ADMIN")
	{
		$scope.isAdmin=true;
	}
	if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_TEAMLEADER")
	{
		$scope.isTeamLeader=true;
	}
	if(Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSTOMER" || Login.getLoggedUser().userinfo.roles[0]=="ROLE_CUSER"){
		$scope.isclient=true;
	}
	else{
		$scope.username=Login.getLoggedUser().userinfo.surname+ " "+Login.getLoggedUser().userinfo.name;
	}
	var succesFunc=function(data)
	{
		$scope.company_name=data.customer;
		$scope.project_name=data.name;
		for(i=0;i<data.team.length;i++)
			if(data.team[i].photo==null)
				data.team[i].photo="img/users/profile_default_small.jpg";
		$scope.team=data.team;
		$scope.tickets=data.tickets;
		$scope.projectDescription=data.description;
		$scope.projectSkilss=data.skills;
		$scope.budget=data.budget;
		if(data.tickets.length==0)
		{
			$scope.hasTicket=false;
		}
		else
		{
			$scope.hasTicket=true;
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
	var failureFunc=function(msg)
	{
		alert(msg)
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
	Project.getProjectDetails($routeParams.project_id,succesFunc,failureFunc);
}]);