var myApp = angular.module('myBookingApp',[]);
myApp.controller('bookingAPICtrl', ['$scope', '$http',function($scope, $http) {    
   
    $scope.carList=[];
	
	 $scope.myVariableTest=0;
	 var sumOfCar=[];
	 var sumOfCarFrequencyArray=[];
	 $scope.refresh = function(){
	 $scope.bookingFlag=false;
	 $scope.dataAnalysisFlag=true;
	 $scope.detailedAnalysis=false;
	 //console.log('got into server');
            $http.get('/BookingData').success(function(response){
            console.log('got data from server');
            $scope.carList1=response;
			// $scope.carList1=response[0];
			$scope.products=response;
			//console.log(response.data);
			
			
           
           $scope.sumOfCar=[];
		   sumOfCar=[];
			var carHoursUsedMap = [] ;
			
			
			 angular.forEach($scope.products, function(value, key){
					if(value.car!=null){
					var hoursUsed= (value.end-value.start)/4;
					sumOfCar.push(value.car);
					carHoursUsedMap.push({carId:value.car,hrs:hoursUsed});
					}
					
               // console.log(carHoursUsedMap);
                
                    
				
   });
				$scope.sumOfCar=sumOfCar.sort(function(a,b){
				return a-b;
				});
					//console.log($scope.sumOfCar);
   
				   var counts = {};

				for(var i = 0; i< $scope.sumOfCar.length; i++) {
					var num = $scope.sumOfCar[i];
					counts[num] = counts[num] ? counts[num]+1 : 1;
				}
				var countMap = [];
				
				for(var t=1;t<140;t++){
						//console.log("Count of "+t+" -"+ counts[t]);
						countMap.push({id:t,count:counts[t]});
						sumOfCarFrequencyArray.push(counts[t]);
						//console.log(" count of "+counts[t]);
						}
						$scope.counts=countMap;
						$scope.countArray=sumOfCarFrequencyArray;
				
            });
        
	 }
	
	$scope.getDataAnalysis= function(){
	 $scope.bookingFlag=false;
	 $scope.dataAnalysisFlag=false;
	 $scope.detailedAnalysis=true;
	 $scope.countArray=sumOfCarFrequencyArray;
	 
	 
	
	}
    
//Used this method to consume the REST API and display them to user.
    $scope.getBooking = function(time){    
			var date = new Date(time);
			var millTime= date.getTime();
			var unixStartTime = millTime/1000;
			console.log(unixStartTime);
			var unixEndTime = unixStartTime+900;
			 $scope.bookingFlag=true;
			 $scope.dataAnalysisFlag=false;
			 $scope.detailedAnalysis=false;
            $http.get('https://challenge.smove.sg/availability?startTime='+unixStartTime+'&endTime='+unixEndTime).success(function(response){
            console.log('got data from server');
           	$scope.products=response;
			//console.log(response.data);
			
			
			
           
            $scope.contact=[];
			
			 angular.forEach($scope.products, function(value, key){
                var val = value;
                //console.log("var"+val)
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
	
	$scope.bookCar= function(id,available_cars,location,time,carIndex){
	console.log("@@@@@@@@");
	console.log("id"+" "+id+"available_cars"+" "+available_cars+"location"+" "+ location+"time"+" "+time+" carIndex"+carIndex);
	var lat = location[0];
		 var lng=location[1];
		var carList1 =[];
		 var date = time;
		 var availablecars=available_cars;
		 availablecars--;
		 var bookCount=available_cars-availablecars;
		 var carId=id;
		 var carIndex1= carIndex;
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
				$scope.products=response;
				
				 angular.forEach($scope.products, function(value, key){
				 console.log(value);
				
				 //$scope.myVariableTest=value;
				alert("Congrats your Booking have been placed Successfully !! , Cars Available for Car Id "+ carIndex1+"after booking  is "+value);
				//$scope.carList.push({'data':key,'value':value});
				 });
				
				console.log("RESPONSE FROM SERVER@@@@ after Insert "+response.data + response+" "+$scope.carList);
				});
               // refresh();		 
	
	}   
	
	$scope.getBookingData = function(time){ 
					
    };
	/* $scope.$watch('myVariableTest',function(newValue,oldValue){
	console.log("Watched");
	$scope.myVariableTest=newValue;
	},true); */
	



        
	
}]);
 