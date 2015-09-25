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