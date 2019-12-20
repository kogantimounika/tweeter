$(document).ready(function() {
  $('.textStyle').keyup(function () {
    const lengthAllowed = 140;
    let Count = $(this).val().length;
    remaining = lengthAllowed - Count;
    $('.counter').text(remaining);
    if (remaining <= 0) {
      $(this).siblings("span").text(remaining).addClass('exceeded');
    } else {
      $(this).siblings("span").text(remaining).removeClass('exceeded');
    }
  })
});