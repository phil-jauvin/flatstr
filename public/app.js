var app = angular.module("flatstr",["ngResource","ngRoute"]);


app.controller("MainController",["$scope","$location","$log",function($scope,$location,$log){

  // Current tab in the navbar
  $scope.tab = 0;

}]);


// Angular routing configuration
app.config(function($routeProvider){

  $routeProvider.when("/",{
    templateUrl:"/views/test.html",
    controller:"MainController"
  });

  $routeProvider.when("/flats",{
    templateUrl:"/views/flat-list.html",
    controller:"MainController"
  });

  $routeProvider.when("/about",{
    templateUrl:"/views/about.html",
    controller:"MainController"
  });

});
