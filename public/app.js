var app = angular.module("flatstr",["ngResource","ngRoute"]);


app.controller("MainController",["$scope","$location","$log",function($scope,$location,$log){

  // Current tab in the navbar
  $scope.tab = 0;

}]);

app.config(function($routeProvider){

  $routeProvider.when("/",{
    templateUrl:"test.html",
    controller:"MainController"
  });

  $routeProvider.when("/flats",{
    templateUrl:"test.html",
    controller:"MainController"
  });

  $routeProvider.when("/about",{
    templateUrl:"about.html",
    controller:"MainController"
  });

});
