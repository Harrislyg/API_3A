$(document).ready(function () {
  // $("#myForm").on('submit', function (event) {
  //     event.preventDefault();
  //     // prevent refresh because we do it the ajax way
  //     var data = $(this).serialize();
  //     console.log(data);
  //
  //     $.ajax({
  //       type: 'GET',
  //       url: 'http://api.giphy.com/v1/gifs/search?'+data,
  //       data: data
  //     }).done(function (response) {
  //       $('#main').html('<img src="'+response.data[1].images.fixed_height_downsampled.url+'"/>');
  //       console.log(response.data[1].embed_url);
  //     }).fail(function (jqXHR, textStatus, errorThrown) {
  //       console.log(errorThrown);
  //     });
  //
  // });

$('#gifForm').on('submit', function (event) {
  console.log("Hello");
  event.preventDefault();
  $('#main *').remove();
  var data = $(this).serialize();
  $.getJSON('http://api.giphy.com/v1/gifs/search?' + data, function (result) {
    $.each(result.data, function (index, obj) {
      console.log(obj);
      $('#main').append('<img src="' + obj.images.original.url + '"/>');
    });
  });
});


});
