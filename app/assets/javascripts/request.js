$(function() {
   $('#searchButton').on("click", function(e){
      e.preventDefault();
      var keyword = $('#searchTerm').val();
      console.log(keyword);
      $('#searchTerm').val("");

      var yt_url='http://gdata.youtube.com/feeds/api/videos?q='+keyword+'&format=5&max-results=10&v=2&alt=jsonc'; 

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
        $('#results').append("<li class='list-group-item' data-songid = " + song["id"] +"> " + song["title"] + "</li>");
        //li.data('imdbid', movie["imdbID"]);---same as adding to li above
        //ANOTHER WAY TO BUILD LI INSTEAD OF CONCATINATION
        //var li = $('<li></li>')  ***needs $ so that you can call jquery methods on the li
        // li.data('imdbid', value["imdbID"]);
        // li.append(value["Title"]);
        //$('#results').append(li);
        })
      })
    })



  $('#results').delegate("li","click", function(e){
    e.preventDefault();
    console.log("IN THE LI");

    // var userSelection = $(e.target).text();
    var id = $(e.target).data("songid");
    // console.log(userSelection);
    // console.log(id);
    
    var yt_url_with_id = 'https://gdata.youtube.com/feeds/api/videos/'+ id +'?v=2&alt=jsonc';
  
    var request = {
        //url: "http://ajax.googleapis.com/ajax/services/search/video",
        url: yt_url_with_id,
        type: "get",
        dataType: "jsonp",
        //data: {q: keyword}
      }

    var response = $.ajax(request);

      response.done(function(data){
        console.log(data["data"]["title"]);
        $('#playlist').append("<li>"+ data["data"]["title"] +"</li>");
      // $('#moviePlot').append(data["Plot"]);
      // $('#moviePoster').append("<img src = '" + data["Poster"] + "'>");
      //could use .html instead of .append so that all of this info is REPLACED instead of appended. This
      //will eliminate the need for a clear poster function!
      //ANOTHER WAY TO DO POSTER:
      //var img = $('<img/>');
      //img.attr('src', data["Poster"]);
      //$('#moviePoster').html(img);


    $.ajax({
      url: '/songs',
      method: 'post',
      // could use attr('post') but method allows you to do multiple things such as edit

      // below is how we send the data to the private/params method in the controller. must have the 
      // attributes in a hash inside of todo since we "require" todo as the form which contains "title" and "description"
      data: {
        "song": {
          "song": id,
          "user_id": 1
        }
      },
      dataType: "json"
      // success: function(data) {
      //   console.log(data);
      //   var ul = $('ul')
      //   //          ^ refers to the ul on the new.html.erb page to add new todo to list
      //   var todo =  "<li><b>"+data.title+"</b> - " +data.description + "</li>";
      //   //           ^same code as the new.html.erb page to make it match up
      //   ul.append(todo);
      //  // todo.appendTo(ul) does th same thing as ul.append(todo);
      //   $(':text').val('');
      //   // ^ can also do this: 
      //   // $('#todo_title').val('');
      //   // $('#todo_description').val('');
      // },
      // error: function(){
      //   alert("Server is broken!");
      // }


    })
    })
    
  })




});






  //CODE TO SEND AJAX TO RUBY

  // (document).ready(function(){
  // $('#new_todo').on('submit', function(event){
  //   event.preventDefault();
  //   var form = $(this); 
  //   //            ^ same as calling the form with the form id $("new_todo") -- find this id by inspecting element in chrome
  //   var title = $('#todo_title').val();
  //   var description = $('#todo_description').val();

  //   $.ajax({
  //     url: form.attr('action'),
  //     method: form.attr('method'),
  //     // could use attr('post') but method allows you to do multiple things such as edit

  //     // below is how we send the data to the private/params method in the controller. must have the 
  //     // attributes in a hash inside of todo since we "require" todo as the form which contains "title" and "description"
  //     data: {
  //       "todo": {
  //         "title": title,
  //         "description": description
  //       }
  //     },
  //     dataType: "json",
  //     success: function(data) {
  //       console.log(data);
  //       var ul = $('ul')
  //       //          ^ refers to the ul on the new.html.erb page to add new todo to list
  //       var todo =  "<li><b>"+data.title+"</b> - " +data.description + "</li>";
  //       //           ^same code as the new.html.erb page to make it match up
  //       ul.append(todo);
  //      // todo.appendTo(ul) does th same thing as ul.append(todo);
  //       $(':text').val('');
  //       // ^ can also do this: 
  //       // $('#todo_title').val('');
  //       // $('#todo_description').val('');
  //     },
  //     error: function(){
  //       alert("Server is broken!");
  //     }
  //   });