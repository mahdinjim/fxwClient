var directives = angular.module("directives", []);
directives.directive('sideBar', function() {
	return {
    	templateUrl: 'partials/side-bar.html'
  		};
});
directives.directive('navMenu', function() {
	return {
    	templateUrl: 'partials/nav-menu.html'
  		};
});
directives.directive('rightSide', function() {
	return {
    	templateUrl: 'partials/right-side.html'
  		};
});
directives.directive('chatWindow', function() {
	return {
    	templateUrl: 'partials/chat-window.html'
  		};
});
directives.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});