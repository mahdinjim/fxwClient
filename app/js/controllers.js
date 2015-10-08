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
	}
	]);
Controllers.controller('TeamCtrl', ['$scope','Team', function ($scope,Team) {
    
	var successfunc=function(data){
		$scope.team=data;
	};
	Team.getAllteamMembers(successfunc);
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
	$scope.createTeamMember=function()
	{
		
		if($scope.surname===undefined || $scope.name===undefined || $scope.title===undefined || $scope.phonecode===undefined || $scope.phonenumber===undefined || $scope.email===undefined || $scope.password===undefined || $scope.role===undefined || $scope.city===undefined || $scope.country===undefined  || $scope.status==undefined )
		{
			alert("Plaese complete all information");
		}
		else
		{
			var succesfunc=function()
			{
				$('#add-user').modal('hide');
				alert("user created successfully");
				Team.getAllteamMembers(successfunc);
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
			}
			var failureFunction=function(msg)
			{
				alert(msg);
			}
			var member={
				"email":$scope.email,
				"login":$scope.email,
				"password":$scope.password,
				"name":$scope.name,
				"surname":$scope.surname,
				"capacity":$scope.capacity,
				"skills":"" +$scope.skills,
				"phone":$scope.phonecode+$scope.phonenumber,
				"title":$scope.title,
				"city":$scope.city,
				"country":$scope.country,
				"status":$scope.status 
			};
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