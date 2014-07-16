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

// when video ends remove song from ul, move speaker icon to next song to play, set next song to play
// to nextSong variable for youtube to loadVideoById
function onPlayerStateChange(event) {        
  if(event.data === 0) { 
    //save id from song that just finished so it can be deleted in following ajax post
    var song_id = $('.song').first().data("song_id");      
    $('.song').first().remove();
    $('.song').first().append(" <img src='../assets/speaker-icon-white.jpg' width='20' height='20'></img>");
    nextSong = $('.song').first().data("you_tube_id");
    player.loadVideoById(nextSong, 5, "large");

    //delete the song that just finished from rails database
    $.ajax({
      url: '/songs/'+song_id+'.json',
      type: 'delete',
      dataType: "json",
      data: {'_method': 'delete'}
    });
    //clear song list and re-append to include any new requests that came in while
    //previous song was playing
    $('.jukebox_playlist').html('');
    requestUsersSongs();
  }
}

//request all songs associated with current user to be played in jukebox
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
        //load data into youtube player after ajax request is complete so that
        //youtube can get the id from the first song in the playlist
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
    //parse data from ajax request and append to playlist  
    console.log('data:', data);
    $.each(data, function (index, song){
      console.log(song["title"]);
      $('.jukebox_playlist').append("<li class='song' data-song_id = " + song.id + " data-you_tube_id = " +song.song_ref+">"+ song.title + "</li>");
    });
    $('.song').first().append(" <img src='/speaker-icon-white.png' width='20' height='16'></img>");
  });


})

}
requestUsersSongs();



   


