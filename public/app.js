var app = angular.module("flatstr",["ng"]);


app.controller("PageController",["$http",function($http){

  self = this;
  self.page = 1;
  self.beds = 1;
  self.baths = 1;

  self.renderFlats = function(){

    $http.get("/flats/kijiji/"+String(self.page)+String(self.beds)+String(self.baths)).then(function(response){
      self.source = response.data.source;
      self.flats = response.data.flats;
    });

  }
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
