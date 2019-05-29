$(document).ready(() => {

  $('#adminLogin').on('click', () => {
    $("#adminForm").validate({
      rules: {
        username: {
          required: true,
          minlength: 5
        },
        password: {
          required: true,
          minlength: 6
        }
      },
      messages: {
        username: {
          required: "Username Incorrect",
          minlength: "Your username must be at least 5 characters"
        },
        password: {
          required: "Password Incorrect",
          minlength: "Password must be more than 6 characters."
        }
      }
    });

    // Make Admin Function Modal w/ DB Connection and POST/DELETE functionality

  });


  $('#photoSearch').on('click', () => {
    $('#searchForm').validate({
      rules: {
        photoNumber: {
          required: true,
          minlength: 8
        }
      },
      messages: {
        photoNumber: {
          required: 'Photo Number required',
          minlength: 'Photo Number must be at least 8 characters.'
        }
      }
    });

    // Make Preview Modal w/ GET functionality and download capability; DELETE photo(s) after download to save DB space and prevent duplicates

  });

  // VVVVVVVVVV Get all below working somehow with customer preview modal VVVVVVVVVV
  // $.getJSON('/photo', data => {
  //   for (var i = 0; i < data.length; i++) {
  //     $('#previewPhoto').append(`<img data-id="${data[i]._id}">${data[i].number}<br>`);
  //   }
  // });

  // $(document).on('click', 'span', () => {
  //   $('#previewPhoto').empty();
  //   var thisId = $(this).attr('data-id');

  //   $.ajax({
  //     method: 'GET',
  //     url: '/photos/' + thisId
  //   })
  //     .then(data => {
  //       console.log(data);

  //       $('#previewPhoto').append(`<h2>${data.title}</h2>`);

  //       $('#previewPhoto').append(`<img data-id="${data[i]._id}" alt="${data[i].number}">`);
  //     });
  // });

  // $(document).on('click', '#download', () => {
  //   var thisId = $(this).attr('data-id');

  //   $.ajax({
  //     method: 'DELETE',
  //     url: `/photos/${thisId}`
  //   }).then(data => {
  //       console.log(data);
  //     });
  //   $('#titleinput').val('');
  // });
  
});