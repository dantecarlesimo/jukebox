var nextSong;
var player;
var youTubeReady = false;

// create youtube player
function onYouTubePlayerAPIReady() {
  youTubeReady = true;
}

function whenYouTubeReady(fn) {
  if (youTubeReady){
    fn();
  }
  else {
    window.onYouTubePlayerAPIReady = fn;
  }
}

// autoplay video
function onPlayerReady(event) {
  event.target.playVideo();
}

// when video ends
function onPlayerStateChange(event) {        
  if(event.data === 0) { 
    var song_id = $('.song').first().data("song_id");      
    $('.song').first().remove();
    $('.song').first().append(" <img src='../assets/speaker.jpg' width='20' height='20'></img>");
    nextSong = $('.song').first().data("you_tube_id");
    console.log('nextSong: ' + nextSong);
    player.loadVideoById(nextSong, 5, "large");

    $.ajax({
      url: '/songs/'+song_id+'.json',
      type: 'delete',
      dataType: "json",
      data: {'_method': 'delete'}
    });
    $('.jukebox_playlist').html('');
    requestUsersSongs();
  }
}

function requestUsersSongs(){
        
var request = {
  url: '/songs',
  method: 'get',
  dataType: 'json'
}

var response = $.ajax(request);
  
response.done(function(data){
  $(function(){
      whenYouTubeReady(function() {
        console.log('document, AJAX, and YouTube all ready!', data, YT.Player);
        player = new YT.Player('player', {
          height: '390',
          width: '500',
          videoId: data[0].song_ref,
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      });
    console.log('data:', data);
    $.each(data, function (index, song){
      console.log(song["title"]);
      $('.jukebox_playlist').append("<li class='song' data-song_id = " + song.id + " data-you_tube_id = " +song.song_ref+">"+ song.title + "</li>");
    });
    $('.song').first().append(" <img src='../assets/speaker.jpg' width='20' height='20'></img>");
  });


})

}
requestUsersSongs();



   


