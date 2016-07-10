$(document).ready(function() {
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

    $('#gifForm').on('submit', function(event) {
        event.preventDefault();
        $('#main *').remove();
        var data = $(this).serialize();
        console.log(data);
        $.getJSON('http://api.giphy.com/v1/gifs/search?' + data, function(result) {
            $.each(result.data, function(index, obj) {
                console.log(obj);
                $('#main').append('<img src="' + obj.images.original.url + '"class="img-responsive img-thumbnail" alt="Responsive image" id="imageBox"/>');
            });
        });
    });

    $('#moneyForm').on('submit', function(event) {
        event.preventDefault();
        $('#main *').remove();
        var data = $(this).serialize().replace('&symbols2=', ',');
        console.log(data);
        $.getJSON('http://api.fixer.io/latest?' + data, function(result) {
            console.log(result.rates);
            $.each(result.rates, function(currency, rate) {
                $('#main').append('<div class="panel panel-info"><div class="panel-heading">' + currency + '</div><div class="panel-body">' + rate + '</div></div>');

                // $('#main').append('<p>' + currency + ': ' + rate + '</p>');
            });
        });
    });

    $('#spotifyForm').on('submit', function(event) {
        event.preventDefault();
        $('#main *').remove();
        var query = $('#spotify').val();
        // console.log(query);
        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: query,
                type: 'track',
                limit: 40
            },
            // success: function(response) {
            //     $.each(response.albums.items, function(index, item) {
            //
            //         $('#main').append('<img src="' + item.images[1].url + '"class="img-responsive img-circle" alt="Responsive image" id="imageBox"/>');
            //         console.log(response.albums.items);
            //     });
            // }
            success: function(result) {
                $.each(result.tracks.items, function(index, item) {
                    $('#main').append('<iframe src="' + 'https://embed.spotify.com/?uri=' + item.uri + '"' + ' width="250" height="330" frameborder="0" allowtransparency="true" id="iframePad"></iframe>');
                    console.log(result.tracks.items);
                });
            }
        });
    });
});
