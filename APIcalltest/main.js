// you will also have to setup the referring domains on your marvel developer portal
var PRIV_KEY = "2594b3a3e1eb34f28ff5d1d7e8b42365f2c3f4bf";
var PUBLIC_KEY = "a65e55ecaa3e74606bacb7f25819f9be";

function getMarvelResponse() {

  // you need a new ts every request                                                                                    
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  
  // the api deals a lot in ids rather than just the strings you want to use
  var characterId = '1009718'; // wolverine                                                                             


  var url = 'http://gateway.marvel.com:80/v1/public/characters';

  console.log(url);
  $.getJSON(url, {
    ts: ts,
    apikey: PUBLIC_KEY,
    hash: hash,
    //characters: characterId
    })
    .done(function(data) {
      // sort of a long dump you will need to sort through
      console.log(data);
    })
    .fail(function(err){
      // the error codes are listed on the dev site
      console.log(err);
    });
};

getMarvelResponse();