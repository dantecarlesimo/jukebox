$(function() {
  console.log("video frame stuff");
  //var video_id = "m33PlctkFrU";
   var song_id = gon.song_ref;
   console.log(song_id);


  // var song_frame="<iframe width='640' height='385' src='http://www.youtube.com/embed/"+song_id+"?rel=0&amp;autoplay=1' frameborder='0' type='text/html'></iframe>";

  // $('#player').append(song_frame);


    var request = {
      url: '/songs',
      method: 'get',
      dataType: 'json'
    }

    var response = $.ajax(request);
    //var youTubeId;

    response.done(function(data){
        console.log(data);
        $.each(data, function (index, song){
           console.log(song["title"]);
        $('.jukebox_playlist').append("<li class='song' data-song_id = " + song.id + " data-you_tube_id = " +song.song_ref+">"+ song.title + "</li>");
       
        })

    })


     var firstLi = $('.song').first().data('you_tube_id');

    function deleteSong() {
      alert('in delete song');
      $.ajax({
        url: '/songs/'+song.id,//get id by li.first
        type: 'DELETE',
      
      });
    }

    var testFunc = function() {
      alert("in test");
    };



})