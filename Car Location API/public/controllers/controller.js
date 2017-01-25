var myApp = angular.module('myApp',[]);
myApp.controller('appCtrl', ['$scope', '$http', function($scope, $http) {
    
   
    
    
//Used this method to consume the REST API and display them to user.
    $scope.getCar = function(){    
			
				$scope.offTrip=true;
				$scope.onTrip=false;
			
            $http.get('https://challenge.smove.sg/locations').success(function(response){
            console.log('got data from server');
            $scope.carList=[];
			$scope.products=response;
			console.log(response.data);
           
            $scope.contact=[];
			
			 angular.forEach($scope.products, function(value, key){
                var val = value;
              //  console.log("var"+val)
                if(key!=="error")
                    $scope.carList.push({'data':key,'value':value});
                else
                   $window.location.href = '';
                    
                
                //console.log("record"+$scope.records)
                //$scope.products=$scope.records;
				
   });
            });
        
    };
	$scope.getCarOnTrip = function(){
				$scope.offTrip=false;
				$scope.onTrip=true;
	}
	
   // using the relocate button click the user can find the distance between him and the CARS. This will be quiet useful when a person goes for booking.
//Literally the user can find the distance between him(Location Found) and car (Red Marker)   
    $scope.lookLocation= function(latCurr,lngCurr){
         var lat = latCurr;
			 
    var lng = lngCurr;
	console.log(lat);
    var newLatLng = new google.maps.LatLng(lat, lng);

    if (marker != undefined)
        marker.setPosition(newLatLng);
    else
        marker = new google.maps.Marker({
            position: newLatLng,
            map: map
        });
      
    };
    
        
	
}]);
 