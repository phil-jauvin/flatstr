var app = angular.module("flatstr",[]);


app.controller("PageController",["$http",function($http){

  var self = this;

  $http.get("/flats/kijiji/111").then(function(response){
    self.source = response.data.source;
    self.flats = response.data.flats;
  });

}]);

app.directive("flatList",function(){

  return{
    "restrict":"E",
    "templateUrl":"flat-list.html"
  };

});

app.directive("about",function(){

  return{
    "restrict":"E",
    "templateUrl":"about.html"
  };

});

app.directive("landingPage",function(){

  return{
    "restrict":"E",
    "templateUrl":"landing.html"
  };

});
