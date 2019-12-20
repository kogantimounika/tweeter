/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  $(".new-tweet").hide();
  $(".error").hide();
  $(".Arrow").click(function() {
    $(".new-tweet").slideToggle();
  });

  let $button = $('.new-form');
  $button.on('submit', function(event) {
    event.preventDefault();
    console.log($button.serialize());
    let validTweet = $(this).find('textarea').val();
    console.log("tweeet data -=-->>>", validTweet);
    if (validTweet === null || validTweet === "") {
      $(".error").text("Please enter a tweet!!!") .slideDown();
    } else if (validTweet.length > 140) {
      $(".error").text("⚠️The characters are more than 140⚠️") .slideDown();
    } else {
      return $.ajax('/tweets', { method: 'POST', data:$button.serialize()})
        .then(function() {
          loadTweets();
          $(".error").hide();
          $(".textStyle").val("");
        });
    }
  });

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
    $(".border").empty();
    for (let data of tweets) {
      const $tweet = createTweetElement(data);
      $(".border").prepend($tweet);
    }
  };

  const loadTweets = function() {
    $.ajax({
      url: "/tweets"
    }).then(renderTweets);
  };

  loadTweets();

  const createTweetElement = function(tweet) {
    let $tweet = $('<article>').addClass('tweet');
    $tweet = $(
      `<article class="tweet">
      <div class="tweet-owner">
      <div>
        <img class="icon" src=${tweet.user.avatars}>  
        <h3>${tweet.user.name}</h3>
      </div> 
        <h4 class="handle">${tweet.user.handle}</h4>
      </div>
      <p>${escape(tweet.content.text)}</p>
      <div class="footer-area">
        <footer>${moment(tweet.created_at).fromNow()}</footer>
        <div>
          <span class="fas fa-flag"></span>
          <span class="fas fa-retweet"></span>
          <span class="fas fa-heart"></span>
        </div> 
      </div>
    </article>`
    );
    return $tweet;
  };
});