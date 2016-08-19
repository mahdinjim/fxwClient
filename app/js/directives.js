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
directives.directive("activateTab",function(){
  return function(scope,element,attrs){
    var selected=element;
    element.bind("click",function(event){
      
      selected.addClass("active");
    });
  }
});
directives.directive("selectTwo",function(){
  return function(scope,element,attrs)
  {
    $(element).select2();
  }
});
directives.directive('scrollBottom', function () {
  return {
    scope: {
      scrollBottom: "="
    },
    link: function (scope, element) {
      scope.$watchCollection('scrollBottom', function (newValue) {
        if (newValue)
        {
          $(element).scrollTop($(element)[0].scrollHeight);
        }
      });
    }
  }
});