$(function() {

  //console.log("video frame stuff");
  //var video_id = "m33PlctkFrU";
  var song_id = gon.song_ref

  var song_frame="<iframe width='640' height='385' src='http://www.youtube.com/embed/"+song_id+"' frameborder='0' type='text/html'></iframe>";

  $('#player').append(song_frame);








})