var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);

var retweet =  function () {
  var params = {
    q: '#nodejs, #Nodejs, #JavaScript',
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

// Twitter favorite bot

// find a random tweet and 'favorite' it
var favoriteTweet = function(){
  var params = {
      q: '#nodejs, #Nodejs',  // REQUIRED
      result_type: 'recent',
      lang: 'en'
  }
  // find the tweet
  Twitter.get('search/tweets', params, function(err,data){

    // find tweets
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);   // pick a random tweet

    // if random tweet exists
    if(typeof randomTweet != 'undefined'){
      // Tell TWITTER to 'favorite'
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
        // if there was an error while 'favorite'
        if(err){
          console.log('CANNOT BE FAVORITE... Error');
        }
        else{
          console.log('FAVORITED... Success!!!');
        }
      });
    }
  });
}
// grab & 'favorite' as soon as program is running...
favoriteTweet();
// 'favorite' a tweet in every 60 minutes
setInterval(favoriteTweet, 3600000);

// function to generate a random tweet tweet
function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};

// tweet at followers
var stream = Twitter.stream('user');
stream.on('follow', followed);
// when someone followers
function followed(event) {
  console.log ('follow event is running');
  // get screen name
  var name = event.source.name;
  var screenName = event.source.screen_name;
  //reply to user
  tweetNow('@'+screenName +' '+'Thank you for the follow!');
}
function tweetNow(tweetTxt) {
  var tweet = {
    status: tweetTxt
  }
  Twitter.post('statuses/update', tweet, function(err, data, response){
    if(err){
      console.log("error in replying");
    }
    else{
    console.log("gratitude shown successfully");
  }
});
}
