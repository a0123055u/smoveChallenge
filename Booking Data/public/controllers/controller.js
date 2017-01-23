var myApp = angular.module('myBookingApp',[]);
myApp.controller('appCtrl', ['$scope', '$http', function($scope, $http) {
    
   
    
    
//Used this method to consume the REST API and display them to user.
    $scope.getBookingData = function(){ 
					console.log('got into server');
            $http.get('/BookingData').success(function(response){
            console.log('got data from server');
            $scope.carList=[];
			$scope.products=response;
			console.log(response.data);
			
			
           
            $scope.contact=[];
			
			 angular.forEach($scope.products, function(value, key){
                var val = value;
                console.log("var"+val)
                if(key!=="error")
                    $scope.carList.push({'data':key,'value':value});
                else
                   $window.location.href = '';
                    
                
                //console.log("record"+$scope.records)
                //$scope.products=$scope.records;
				
   });
            });
        
    };
   // using the relocate button click the user can find the distance between him and the CARS. This will be quiet useful when a person goes for booking.
//Literally the user can find the distance between him(Location Found) and car (Red Marker)   
    $scope.lookLocation= function(latLng,time){
	console.log(latLng);
         var lat = latLng[0];
		 var lng=latLng[1];
		 $scope.time=time;
		 var date = new Date(time);
		 var unixTime = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
		 
			 console.log(date.getTime()/1000);
   
	console.log(lat);
    var newLatLng = new google.maps.LatLng(lat,lng);

    if (marker != undefined)
        marker.setPosition(newLatLng);
    else
        marker = new google.maps.Marker({
            position: newLatLng,
            map: map
        });
      
    };
    
        
	
}]);
 