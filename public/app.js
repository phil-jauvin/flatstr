var app = angular.module("flatstr",["ngResource","ngRoute"]);


app.controller("MainController",["$scope","$location","$http","$log",function($scope,$location,$http,$log){

  $scope.page = 1;

  // Current tab in the navbar
  $scope.tab = 0;

  $scope.changeView = function(view){
    $location.path(view);
  }

  $scope.loadInitial = function(){

    $http.get("/flats/kijiji/" + $scope.page + $scope.beds + $scope.baths).success(function(response){
      $scope.flats = response.flats;
    });


  $scope.loadMore = function(){

    $scope.page = $scope.page + 1;

    console.log($scope.page);

    $http.get("/flats/kijiji/" + $scope.page + $scope.beds + $scope.baths).success(function(response){
      angular.extend($scope.flats,response.flats);
    });

    console.log($scope.flats.length);

  }

  }

}]);


app.directive("landing",function(){

  return{
    templateUrl:"views/landing.html",
    restrict:"E"
  }

});

app.directive("flatList",function(){

  return{
    templateUrl:"views/flat-list.html",
    restrict:"E"
  }

});
