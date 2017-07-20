var myapp = angular.module('myapp', []);

myapp.controller('MainCtrl', function ($scope) {
	var dept=[];
	var prov = [];
	var district = [];
	
	$scope.openFile = function(event) {
		var file = this.files[0];
		  var reader = new FileReader();
		  reader.onload = function(progressEvent){
			var lines = this.result.split('\n');						
				$scope.$apply(function () {
					processFile(lines);
				});
		  };		  

		  reader.readAsText(file);
	};
	 
	function processFile(lines){			 		 

		 for(var line = 0; line < lines.length; line++){
			 var splitted  = lines[line].split("/");

			 distributeData(splitted);

		}		
		$scope.dept=dept;
		$scope.prov=prov;
		$scope.district=district;

	};
	  
	function distributeData(splitted){
		for (var i= 0;i < splitted.length;i++) {
			if (splitted[i]) {//check if it has data
				splitted[i]= splitted[i].trim();
				var subStr = splitted[i].split(" ");
				var name = (splitted[i]).substr(splitted[i].indexOf(" "));// for complex names
				if (subStr[0]){ //check if it has data
					var numFather ;
					var descFather;
					
					if(i>0){//check if it has father
						numFather = splitted[i-1].trim().split(" ")[0];
						descFather = splitted[i-1].trim().split(" ")[1];
					}
					switch (i){ //distribute data accordingly
						case 0:
								dept.push({num:subStr[0],name: name, numFather: "-", descFather: "-"} );
								break;
						case 1: 
								prov.push({num:subStr[0],name: name, numFather: numFather, descFather: descFather});
								break;
						case 2:
								district.push({num:subStr[0],name: name, numFather: numFather, descFather:descFather });

					}				 
				}
			}
		}
	};


  });
  
 myapp.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeHandler);
    }
  };
});

myapp.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});