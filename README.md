# smoveChallenge


Booking Availablity API and Booking Data task both are done at the Booking Availablity API itself.

In order to run Booking Availablity API need node js, Angular js, Chart.js and MongoDb. 

1) Once you check out the entire project, First start the MongoDb server. If you don't have mongoDb pls install and Go to Bin folder of MonfoDb and 
fire this command - mongod
2) Need Node js also for this if you don't have please install it. Then move to the root folder of the Booking Availablity API project and type this
command  -  node server.js. This in turn will start server in the port 3300. 
3) For Better User Experience use Latest Chrome or Mozila Fire Fox. Allow browser to Share you location. Very important for finding the best car for you which is near by you.
4) For searching the booking first need to key in the Date and Time. End time is 15 min ahead of the current time. You could find list of Car with details poping out. Once you find the car and Click book car the instances are saved to MongoDb. 
5) Booking Data- I have Enclosed that also as part this project. 
  5.1) Using Get Data one Could find the Data avilable in the REST API. I have Calculated the hours the car used each time. 
  5.2) Get Analysis Data - Calculated the number of times the car have been used within week. created a trend analysis with CarNo vs Frequency. Have tried to plot this into chart.js bar chart. 
6) Car Location API - Using this app we can find cars that are currently free without Trip, Will be adding another button for getting car on trip also while refactoring.
7) Booking Ordering Problem - This will print two list first with linked elements with breaking connections and Second Array with missing elements for the connections. Tried with Python. Will try to Optimize the solution.
