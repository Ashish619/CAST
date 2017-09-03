var app = angular.module('app' , ['ngRoute' ,  'bw.paging']);




angular.module('app')
  .filter('thousandSuffix', function () {
    return function (input, decimals) {
      var exp, rounded,
        suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];

      if(window.isNaN(input)) {
        return null;
      }

      if(input < 1000) {
        return input;
      }

      exp = Math.floor(Math.log(input) / Math.log(1000));

      return (input / Math.pow(1000, exp)).toFixed(decimals) + suffixes[exp - 1];
    };
  });

app.config(function($routeProvider) {
    $routeProvider
    .when("/technologies", {
        templateUrl : "partials/technologies.html",
         controller : "technologiesController"
    }) .when("/repo/:technology", {
        templateUrl : "partials/repo.html",
         controller : "repoController"
    }) .when("/user/:login", {
        templateUrl : "partials/user.html",
         controller : "userController"
    })
  .otherwise("/technologies",{
        templateUrl : "partials/technologies.html",
         controller : "technologiesController"
    });
  
});