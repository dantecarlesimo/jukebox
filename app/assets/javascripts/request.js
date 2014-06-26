$(function() {
  //grabs current user id to be associated a song list
  var jukebox_owner = gon.jukebox_owner_id;

  //list all songs with specific users jukebox song list
  $.each(gon.songs, function (index, song){
      console.log(song["title"]);
      $('.jukebox_requests').append("<li class='song' data-song_id = " + song.id + " data-you_tube_id = " +song.song_ref+">"+ song.title + "</li>");
  });
  
  //search box and submit button to search youtube API for music videos
  $('#searchButton').on("click", function(e){
    e.preventDefault();
    $('#results').empty();
    var keyword = $('#searchTerm').val();
    console.log(keyword);
    $('#searchTerm').val("");

    var yt_url='http://gdata.youtube.com/feeds/api/videos?q='+keyword+'&format=5&max-results=10&v=2&alt=jsonc'; 

    var request = {
      url: yt_url,
      type: "get",
      dataType: "jsonp",
    }

    var response = $.ajax(request);

    //list 10 results from youtube API
    response.done(function(data){
      console.log(data);
      $.each(data["data"]["items"], function (index, song){
        console.log(song["title"]);
        $('#results').append("<li class='list-group-item' data-songid = " + song["id"] +"> " + song["title"] + "</li>");
      })
    })
  })

  //select one of the titles that came back from the youtube API to be added to users playlist
  $('#results').delegate("li","click", function(e){
    e.preventDefault();

    var id = $(e.target).data("songid");

    var yt_url_with_id = 'https://gdata.youtube.com/feeds/api/videos/'+ id +'?v=2&alt=jsonc';
  
    var request = {
        url: yt_url_with_id,
        type: "get",
        dataType: "jsonp",
      }

    var response = $.ajax(request);

    //add specific song to the playlist
    response.done(function(data){
      console.log(data["data"]["title"]);
      var song_title = data["data"]["title"];
      $('.jukebox_playlist .jukebox_requests').append("<li>"+ song_title +"</li>");
      $('.jukebox_requests').append("<li>"+ song_title +"</li>");

      //add the songs youtube id to the rails database to be retrieved by users jukebox
      $.ajax({
        url: '/songs',
        method: 'post',
        data: {
          "song": {
          "song_ref": id,
          "title": song_title,
          "user_id": jukebox_owner
          }
        },
        dataType: "json"
      })
    }) 
  })


});





