$(function() {

  console.log("video frame stuff");
  //var video_id = "m33PlctkFrU";
  var song_id = gon.song_ref;

  

  var song_frame="<iframe width='640' height='385' src='http://www.youtube.com/embed/"+song_id+"?rel=0&amp;autoplay=1' frameborder='0' type='text/html'></iframe>";

  $('#player').append(song_frame);

    // var song_id = gon.song_ref;
    // var player;
    //     function onYouTubePlayerAPIReady() {
    //         player = new YT.Player('player', {
    //           height: '390',
    //           width: '640',
    //           videoId: song_id,
    //           events: {
    //             'onReady': onPlayerReady,
    //             'onStateChange': onPlayerStateChange
    //           }
    //         });
    //     }

    //     // autoplay video
    //     function onPlayerReady(event) {
    //         event.target.playVideo();
    //     }

    //     // when video ends
    //     function onPlayerStateChange(event) {        
    //         if(event.data === 0) {          
    //             alert('done');
    //         }
    //     }

})