$('document').ready(function () {
  $('.nav-item > a').click(function () {
    $('.nav-item').removeClass('active');
    $(this).parent().addClass('active');
  })
})
