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

    // Array of listings
    var listings = html.split("</table>");

    res.send(String(cock[0]));

  }

});

}

module.exports.kijiji =  kijiji;
