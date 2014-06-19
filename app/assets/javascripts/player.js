
$(function() {
   $('#searchButton').on("click", function(e){
     e.preventDefault();
     var keyword = $('#searchTerm').val();
     console.log(keyword);
     $('#searchTerm').val("");

      url: var yt_url='http://gdata.youtube.com/feeds/api/videos?q='+keyword+'&format=5&max-results=10&v=2&alt=jsonc'; 

      var request = {
        //url: "http://ajax.googleapis.com/ajax/services/search/video",
        url: yt_url,
        type: "get",
        dataType: "jsonp",
        //data: {q: keyword}
      }

      var response = $.ajax(request);

      response.done(function(data){
               console.log(data);
        $.each(data["data"]["items"], function (index, song){
           console.log(song["title"]);
        //$('#results').append("<li class='list-group-item' data-imdbid = " + movie["imdbID"] +"> " + movie["Title"] + "</li>");
        //li.data('imdbid', movie["imdbID"]);---same as adding to li above
        //ANOTHER WAY TO BUILD LI INSTEAD OF CONCATINATION
        //var li = $('<li></li>')  ***needs $ so that you can call jquery methods on the li
        // li.data('imdbid', value["imdbID"]);
        // li.append(value["Title"]);
        //$('#results').append(li);
        })
      })
    })

});


  