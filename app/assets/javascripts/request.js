$(function() {

  var jukebox_owner = gon.jukebox_owner_id;

  $.each(gon.songs, function (index, song){
      console.log(song["title"]);
      $('.jukebox_requests').append("<li class='song' data-song_id = " + song.id + " data-you_tube_id = " +song.song_ref+">"+ song.title + "</li>");
  });

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

    response.done(function(data){
      console.log(data);
      $.each(data["data"]["items"], function (index, song){
        console.log(song["title"]);
        $('#results').append("<li class='list-group-item' data-songid = " + song["id"] +"> " + song["title"] + "</li>");
      })
    })
  })

  $('#results').delegate("li","click", function(e){
    e.preventDefault();
    console.log("IN THE LI");

    var id = $(e.target).data("songid");

    var yt_url_with_id = 'https://gdata.youtube.com/feeds/api/videos/'+ id +'?v=2&alt=jsonc';
  
    var request = {
        url: yt_url_with_id,
        type: "get",
        dataType: "jsonp",
      }

    var response = $.ajax(request);

    response.done(function(data){
      console.log(data["data"]["title"]);
      var song_title = data["data"]["title"];
      $('.jukebox_playlist .jukebox_requests').append("<li>"+ song_title +"</li>");
      $('.jukebox_requests').append("<li>"+ song_title +"</li>");

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





