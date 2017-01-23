var myApp = angular.module('myBookingApp',[]);
myApp.controller('appCtrl', ['$scope', '$http', function($scope, $http) {
    
   
    
    
//Used this method to consume the REST API and display them to user.
    $scope.getBooking = function(time){    
			var date = new Date(time);
			var millTime= date.getTime();
			var unixStartTime = millTime/1000;
			var unixEndTime = unixStartTime+900;
            $http.get('https://challenge.smove.sg/availability?startTime='+unixStartTime+'&endTime='+unixEndTime).success(function(response){
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
	console.log("location"+latLng+"time"+time);
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
	
	$scope.bookCar= function(id,available_cars,location,time){
	console.log("@@@@@@@@");
	console.log("id"+" "+id+"available_cars"+" "+available_cars+"location"+" "+ location+"time"+" "+time);
	var lat = location[0];
		 var lng=location[1];
		var carList1 =[];
		 var date = time;
		 var availablecars=available_cars;
		 availablecars--;
		 var bookCount=available_cars-availablecars;
		 var carId=id;
		carList1.push({
            id:carId, 
            availableCars:availablecars,
            dateTime:date,
			latitude:lat,
			longitute:lng,
			noOfBooking:bookCount});
			var param =JSON.stringify(carList1);
            console.log("Input to insert"+param);
                $http.post('/booking',param).success(function(response){
				
				console.log("RESPONSE FROM SERVER@@@@ after Insert " + response+" "+$scope.carList);
				});
               // refresh();		 
	
	}   
	$scope.getBookingData = function(time){ 
					console.log('got into server');
            $http.get('/BookingData').success(function(response){
            console.log('got data from server');
            $scope.carList1=response;
			// $scope.carList1=response[0];
			$scope.products=response;
			console.log(response);
			
			
           
            $scope.contact=[];
			
			 angular.forEach($scope.products, function(value, key){
                var val = key;
                //console.log("var"+val)
					//$scope.carList1.push({'data':key,'value':value});
                   // $scope.carList1.push({'id':value.id,'carNo':value.car,'end':value.end,'start':value.start,'startLocation':value.start_location,'endLocation':value.end_location});
                
                    /* "car": 61,
    "end": 56,
    "end_location": 36,
    "id": 44,
    "start": 0,
    "start_location": 36 */
                
                //console.log("record"+$scope.records)
                //$scope.products=$scope.records;
				
   });
            });
        
    };
        
	
}]);
 