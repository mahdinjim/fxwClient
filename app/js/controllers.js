var Controllers=angular.module('Controllers',[]);
Controllers.controller('LoginCtrl',['$scope','Login','$location',
	function LoginCtrl($scope,Login,$location){
		$scope.loginFunction=function()
		{
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
			Login.logout();
		}
	}
	]);
Controllers.controller("SideBarCtrl",['$scope','Login',
	function SideBarCtrl($scope,Login)
	{
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
	}
	]);
Controllers.controller('TeamCtrl', ['$scope','Team','Params','$location', function ($scope,Team,Params,$location) {
    
	var successfunc=function(data){
		$scope.team=data;
	};
	Team.getAllteamMembers(successfunc);
	$scope.send=false;
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
			var selectdata={"id":0,text:data[0].name+ " "+data[0].surname};
			$("#keyaccountselect").select2("data",selectdata);
			selectedKeyaccount=data[0].id;
		}
		failurefunc=function(data)
		{
			$scope.keyaccounts={};
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
Controllers.controller('CuserCtrl',['$scope','Login','Cuser',function($scope,Login,Cuser){
	$scope.isSent=false;
	$scope.isEdit=false;
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

}]);
Controllers.controller('SettingsCtrl', ['$scope','Chat', function ($scope,Chat) {

	$scope.connect_to_chat=Chat.isUserLoggedIn();
	Chat.getChannels();
	$scope.connectToChat=function()
	{
		if($scope.connect_to_chat)
		{
			Chat.loginToChat();
		}
		else{
			Chat.chatloggout();
		}
	}
	
}])