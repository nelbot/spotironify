function fetchTracks (event) {
  event.preventDefault();
  console.log(event.target);
  var search = $('.track-name').val();
  var request = $.get('https://api.spotify.com/v1/search?type=track&q=' + search);

  function handleTracks (response) {
  console.debug(response);

  $('.js-artist').text(response.tracks.items[0].artists[0].name);
  $('.js-track').text(response.tracks.items[0].name);
  $('.js-player').prop('src', response.tracks.items[0].preview_url);
  }

  function handleError (err1, err2, err3) {
    console.error('OH NO!!', err1, err2, err3);
  }
  
  request.done(handleTracks); 
  request.fail(handleError);
}

$('.js-search-tracks').on('click', fetchTracks);


  function playTracks (response) {
  console.debug(event.target);
  if ($('.btn-play').hasClass('playing')) {
    $('.btn-play').removeClass('playing')
    $('.js-player').trigger('pause')
   } else {
      $('.btn-play').addClass('playing')
      $('.js-player').trigger('play')
    }
 } 

$('.btn-play').on('click', playTracks);


function printTime () {
  var current = $('.js-player').prop('currentTime');
  console.debug('Current time: ' + current);
  $('.js-progress-bar').prop('value', current)

}

$('.js-player').on('timeupdate', printTime);

// select the progress bar and update the value based on the current time