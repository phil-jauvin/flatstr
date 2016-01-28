var app = angular.module("flatstr",[]);


app.controller("MainController",["$scope","$http",function($scope,$http){

  // If tab is 1, we don't show the div which contains the flats
  $scope.tab = 1;

  // Default value for beds and bath
  $scope.beds = "1";
  $scope.baths = "1";

  // This variable keeps track of what page of result we're currently looking at.
  $scope.page = 0;

  // Keeps track of whether we pull from CL or Kijiji.
  $scope.kijiji = true;

  // Smooth scrolling effect
  $scope.scrollToBottom = function(){
    // JQuery ahead !
    $('html, body').animate({
      scrollTop: $("#landingbottom").offset().top
    }, 1000);
  }

  // GET request receives the flats from the server and initialises a flats array with $scope.
  $scope.loadInitial = function(){

    $scope.page = $scope.page + 1;

    if($scope.kijiji){
      var url = "/flats/kijiji/";
    }

    else{
      var url = "/flats/craigslist/";
    }


    // Url is in the format /flats/kijiji/xyz
    $http.get(url + $scope.page + $scope.beds + $scope.baths).success(function(response){
      $scope.flats = response.flats;
    });

    // Change the value of tab to reveal the flats after they're loaded into $scope.flats
    $scope.tab = 0;

    setTimeout($scope.scrollToBottom,500);

    if($scope.flats.length < 20){
      $scope.kijiji = false;
      $scope.page = -1;
    }

  }

}]);


// Directives

app.directive("landing",function(){

  return{
    templateUrl:"directives/landing.html",
    restrict:"E"
  }

});

app.directive("flatList",function(){

  return{
    templateUrl:"directives/flat-list.html",
    restrict:"E"
  }

});
