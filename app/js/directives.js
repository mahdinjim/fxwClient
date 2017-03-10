var directives = angular.module("directives", []);
directives.directive('sideBar', function() {
	return {
    	templateUrl: 'partials/side-bar.html?v=1.31'
  		};
});
directives.directive('navMenu', function() {
	return {
    	templateUrl: 'partials/nav-menu.html?v=1.1'
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
directives.directive('anyKey', function () {
    return function (scope, element, attrs) {
        element.bind("keyup keypress", function (event) {
           

                scope.$apply(function (){
                    scope.$eval(attrs.anyKey);
                });

                
            
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
    if(attrs.inittext != undefined)
      $(element).select2("data",{id:-1,text:attrs.inittext});
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
directives.directive('fileUpload', function () {
    return {
        scope: true,        //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0;i<files.length;i++) {
                    //emit event upward
                    scope.$emit("fileSelected", { file: files[i] });
                }                                       
            });
        }
    };
});
