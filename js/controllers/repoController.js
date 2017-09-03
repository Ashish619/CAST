app.controller('repoController',function($scope,dataStore,$routeParams){

//language,search,sort,order,page
$scope.technologies = ["JavaScript", "Java", "Python", "Php", "Ruby"];
$scope.noresults = false;
$scope.filters = [{ name : "Sort : Best Match", sort:"best match" , order : "desc"},
{ name : "Sort : Most Stars", sort:"stars" , order : "desc"},
{ name : "Sort : Fewest Stars", sort:"stars" , order : "asc"},
{ name : "Sort : Most Forks", sort:"forks" , order : "desc"},
{ name : "Sort : Fewest Forks", sort:"forks" , order : "asc"},

 ]
 $scope.currentFilter =  $scope.filters[0];
$scope.searchKeyword = '';
$scope.sort =  $scope.currentFilter.sort ;
$scope.order = $scope.currentFilter.order ;

$scope.pageSize = 9;
$scope.currentPage = 1;
$scope.technology = $routeParams.technology;
$scope.results = [];

dataStore.getRepository($scope.technology).then(function(response){

$scope.results = response.data.items;
$scope.lastPage = dataStore.lastPage;
$scope.total = $scope.pageSize* $scope.lastPage;

})

$scope.getRepoByIndex = function(index){
$scope.currentPage = index;

dataStore.getRepository($scope.technology,$scope.searchKeyword,$scope.sort,$scope.order,$scope.currentPage ).then(function(response){
    
$scope.results = response.data.items;


})

}

$scope.updateList = function(filter) {
     $scope.currentFilter =filter;
$scope.sort =filter.sort;
$scope.order = filter.order;


dataStore.getRepository($scope.technology,$scope.searchKeyword,$scope.sort,$scope.order,$scope.currentPage ).then(function(response){
    
$scope.results = response.data.items;
$scope.lastPage = dataStore.lastPage;
$scope.total = $scope.pageSize* $scope.lastPage;

})
}


$scope.updateSearchList = function(search) {
$scope.searchKeyword= search;

dataStore.getRepository($scope.technology,$scope.searchKeyword,$scope.sort,$scope.order,$scope.currentPage ).then(function(response){
    
$scope.results = response.data.items;
$scope.lastPage = dataStore.lastPage;
$scope.total = $scope.pageSize* $scope.lastPage;
})
}
    
});
