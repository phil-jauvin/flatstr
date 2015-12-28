var request = require("request");

// Helper function to extract information from pages
function extract(result,start,stop){

  result = result.slice(start);
  end = result.indexOf(stop);

  return result.slice(0,end);

}


/*
  Each function scrapes a page of flat listings
  on a classifieds site and returns them in JSON form. The name of the function
  corresponds to what site they scrape (i.e Kijiji, Craigslist).
*/

var kijiji = function(req,res){

  var page = String(req.params.page);
  var url = "";
  var urlcap = "";

  // Kijiji makes it really painful with their URLs
  if(page[1] == "1"){
    url += "http://www.kijiji.ca/b-1-bedroom-apartments-condos/ottawa";
    urlcap += "/c212l1700185a162";
  }

  else if(page[1] == "2"){
    url += "http://www.kijiji.ca/b-2-bedroom-apartments-condos/ottawa";
    urlcap += "/c214l1700185a133";
  }

  else if(page[1] == "3"){
    url += "http://www.kijiji.ca/b-3-bedroom-apartments-condos/ottawa";
    urlcap += "/c215l1700185a90";
  }

  else if(page[1] == "4"){
    url += "http://www.kijiji.ca/b-4-plus-bedroom-apartments-condos/ottawa";
    urlcap += "/c216l1700185a219";
  }

  if(page[2] == "1"){
    url += "/1+bathroom";
  }

  else{
    url += "/"+page[2]+"+bathrooms";
  }

  url += "/page-"+page[0];
  url += urlcap;

  // GET request to Kijiji
  // "html" is the page source received as a string
  request(url, function (error, response, html){

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

    var thumbnail = "";
    var title = "";
    var link = "";

    for(result of results){

      result = result.trim();

      // Let's get the thumbnail image
      start = result.indexOf('img src="')+9;
      thumbnail = extract(result,start,'"');

      // Listing title
      start = result.indexOf('alt="')+5;
      title = extract(result,start,'"');

      // Link to original listing
      start = result.indexOf('a href="')+8;
      link = "http://www.kijiji.ca"+extract(result,start,'"');

      // Price per month
      start = result.indexOf('class="price">')+14;
      price = extract(result,start,'</td>').trim();


      // And finally push it to the flats array in the listings object
      listings.flats.push({

        link:link,
        thumbnail:thumbnail,
        title:title,
        price:price

      });

    }

    res.send(listings);

  }

});

}

var craigslist = function(req,res){

  // The first page of searches is page 0
  var page = String(req.params.page);

  var url = "http://ottawa.craigslist.ca/search/apa?bedrooms="+page[1]+"&bathrooms="+page[2]+"&housing_type=1&housing_type=2&housing_type=5s="+page[0];

    request(url, function (error, response, html){

      if(!error){

        var start = html.indexOf('<p class="row"');
        var end = html.indexOf('<div id="mapcontainer"');

        html = html.slice(start,end);

        var results = html.split("</p>");

        var listings = {

          source:"Craigslist",
          flats:[]

        }

        var thumbnail = "";
        var title = "";
        var link = "";

        for(result of results){

          result = result.trim();

          // Listing title
          start = result.indexOf('class="hdrlnk">')+15;
          title = extract(result,start,'</a>');

          // Link to original listing
          start = result.indexOf('a href="')+8;
          link = "http://ottawa.craigslist.ca"+extract(result,start,'"');


          // And finally push it to the flats array in the listings object
          listings.flats.push({

            link:link,
            title:title

          });

        }

        res.send(listings);

      }

    });

}

module.exports.craigslist = craigslist;
module.exports.kijiji = kijiji;
