$(document).ready(function(){

  // Reminder: if flats.length is less than 20, that's the last page.


  // We give default values to beds and baths in case they aren't initialised by the user.
  var page = 1;
  var beds = 1;
  var baths = 1;

  // This is going to be the markup for each listing
  var html = "";

  function displayFlats(){

    var data = String(page)+String(beds)+String(baths);

    $.getJSON("http://localhost:3000/flats/kijiji/"+data,function(json){

      json.flats.forEach(function(flat){

        // We add each piece of markup to a string called HTML.
        // See bottom of page for a clean version of the markup used in this section.

        html = '<div class="row"><div class="col-xs-12 page-header"><div class="col-sm-6" style="margin-bottom:15px;">';

        html += '<h1>'+flat.title+'</h1>';
        html += '<h2>'+flat.price+'</h2></div>';

        html += '<div class="col-sm-6">';
        html += '<div style="vertical-align:top;margin-bottom:10px;" align="center">';
        html += '<img src='+flat.thumbnail+'></img></div>';

        html += '<div style="vertical-align:bottom" align="center">';
        html += '<a href="'+flat.link+'"><button class="btn btn-primary">Check out this listing</button></a></div></div></div></div>';

        // #emptydiv is literally an empty div, we clone it and append it to the listings div.
        $("#emptydiv").clone().html(html).appendTo("#listings");

      });

    });

  }

  // When the "more" button is pressed.
  $("#morebutton").on("click",function(){

    page++;
    displayFlats();

  });

  // Initial display of flats.
  displayFlats();

});


/*

Clean markup
-------------------


<div class="row">

  <div class="col-xs-12 page-header">

    <div class="col-sm-6" style="margin-bottom:15px;">
      <h1>flat.title</h1>
      <h2>flat.price</h2>
    </div>

    <div class="col-sm-6">

      <div style="vertical-align:top;margin-bottom:10px;" align="center">
        <img ng-src="flat.thumbnail"></img>
      </div>

      <div style="vertical-align:bottom" align="center">
        <a ng-href="flat.link"><button class="btn btn-primary">Check out this listing</button></a>
      </div>

    </div>

  </div>

</div>

*/
