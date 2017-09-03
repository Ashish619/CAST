app.controller('userController',function($scope,dataStore,$routeParams,$http){

$scope.login = $routeParams.login;
$scope.repos = [];
dataStore.getUserDetails($scope.login).then(function(response){
    
     $scope.userDetails = response; 
     $http.get($scope.userDetails.repos_url).then(function(response) {$scope.repos =  response.data});
    

});




});
