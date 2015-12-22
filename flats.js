var request = require("request");

/*
  Each function scrapes a page of flat listings
  on a classifieds site and returns them in JSON form. The name of the function
  corresponds to what site they scrape (i.e Kijiji, Craigslist).
*/

var kijiji = function(req,res){

  var page = req.params.page;
  page = String(page);

  var url = "http://www.kijiji.ca/b-apartments-condos/ottawa/page-"+page+"/c37l1700185";

  // GET request to Kijiji
  // "html" is the page source received as a string
  request(url, function (error, response, html) {

  if (!error) {

    // Let's start by extracting the listings
    var start = html.indexOf('<table class=" regular-ad js-hover');
    var end = html.indexOf('<div class="bottom-bar">');

    html = html.slice(start,end);
    end = html.indexOf('<div class="adsense-top-bar">Sponsored Links:</div>');
    html = html.slice(html[0],end);

    // Array of listings received from Kijiji
    var results = html.split("</table>");

    // This is the object we're sending back
    var listings = {

      source:"Kijiji",
      flats:[]

    }


    function extract(result,start){

      result = result.slice(start);
      end = result.indexOf('"');

      return result.slice(0,end);

    }

    var thumbnail = "";
    var title = "";
    var link = "";

    for(result of results){

      result = result.trim();

      // Let's get the thumbnail image
      start = result.indexOf('img src="')+9;
      thumbnail = extract(result,start);

      // Listing title
      start = result.indexOf('alt="')+5;
      title = extract(result,start);

      // Link to original listing
      start = result.indexOf('a href="')+8;
      link = "http://www.kijiji.ca"+extract(result,start);


      // And finally push it to the flats array in the listings object
      listings.flats.push({

        link:link,
        thumbnail:thumbnail,
        title:title

      });

    }

    res.send(listings);

  }

});

}

module.exports.kijiji = kijiji;
