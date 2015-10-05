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
    var $image = $(".image-crop > img")
    $($image).cropper({
        aspectRatio:  4 / 3,
        preview: ".img-preview",
        done: function(data) {
            // Output the result data for cropping image.
        }
    });

    var $inputImage = $("#inputImage");
    if (window.FileReader) {
        $inputImage.change(function() {
            var fileReader = new FileReader(),
                    files = this.files,
                    file;

            if (!files.length) {
                return;
            }

            file = files[0];

            if (/^image\/\w+$/.test(file.type)) {
                fileReader.readAsDataURL(file);
                fileReader.onload = function () {
                    $inputImage.val("");
                    $image.cropper("reset", true).cropper("replace", this.result);
                };
            } else {
                showMessage("Please choose an image file.");
            }
        });
    } else {
        $inputImage.addClass("hide");
    }

    $("#download").click(function() {
        window.open($image.cropper("getDataURL"));
    });

    $("#zoomIn").click(function() {
        $image.cropper("zoom", 0.1);
    });

    $("#zoomOut").click(function() {
        $image.cropper("zoom", -0.1);
    });

    $("#rotateLeft").click(function() {
        $image.cropper("rotate", 45);
    });

    $("#rotateRight").click(function() {
        $image.cropper("rotate", -45);
    });

    $("#setDrag").click(function() {
        $image.cropper("setDragMode", "crop");
    });

    $('#data_5 .input-daterange').datepicker({
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true
    });

    var elem_3 = document.querySelector('.js-switch_3');
    var switchery_3 = new Switchery(elem_3, { color: '#1AB394' });
    var elem_4 = document.querySelector('.js-switch_4');
    var switchery_4 = new Switchery(elem_4, { color: '#1AB394' });
    

    $('#datepicker').datepicker({
    format: "dd/mm/yyyy"
    });
    //$('select').select2();
	var successfunc=function(data){
		$scope.team=data;
	};
	Team.getAllteamMembers(successfunc);
	$scope.createTeamMember=function()
	{
		alert("hello");
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