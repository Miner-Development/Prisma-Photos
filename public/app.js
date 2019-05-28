$.getJSON('/photo', data => {
  for (var i = 0; i < data.length; i++) {
    $('#photos').append(`<img data-id="${data[i]._id}">${data[i].title}<br>`);
  }
});

$(document).on('click', 'p', () => {
  $('#photos').empty();
  var thisId = $(this).attr('data-id');

  $.ajax({
    method: 'GET',
    url: '/photos/' + thisId
  })
    .then(data => {
      console.log(data);

      $('#photos').append(`<h2>${data.title}</h2>`);

      $('#photos').append(`<img data-id="${data[i]._id}" alt="${data[i].title}">`);
    });
});

$(document).on('click', '#download', () => {
  var thisId = $(this).attr('data-id');

  $.ajax({
    method: 'DELETE',
    url: `/photos/${thisId}`
  }).then(data => {
      console.log(data);
    });
  $('#titleinput').val('');
});