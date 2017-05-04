var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);

var retweet =  function () {
  var params = {
    q: '#nodejs, #Nodejs',
    result_type: 'recent',
    lang: 'en'
  }

  Twitter.get('search/tweets', params, function(err, data) {
    //if no errors
    if (!err) {
      var retweetId = data.statuses[0].id_str;
      //tell to retweet
      Twitter.post('statuses/retweet/:id', {
        id: retweetId
      }, function(err, response){
        if (response) {
          console.log('Retweeted!!');
        }
        if (err) {
          console.log('Something went wrong while Retweeting');
        }
      });
    }
    // if unable to search
    else {
      console.log('Something went wrong while Searching');
    }
  });
}
// start Retweeting
retweet();
setInterval(retweet, 3600000); //retweet once an hour
