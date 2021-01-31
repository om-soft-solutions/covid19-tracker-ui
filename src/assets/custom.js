/*
$('document').ready(function () {
  let loc = window.location.href.split('/');
  $('.nav-item > a:not(#login)').click(function () {
    console.log(this);
    // $('.nav-item').css({border-width:})
    $('.nav-item').removeClass('active');
    $('.nav-item > a').removeClass('border-red');
    $('#profile').removeClass('border-red')
    $(this).addClass('border-red')
    $(this).parent().addClass('active');
  })

  let ser = '#'+loc[loc.length-1];
  console.log(ser)
  $(ser).addClass('border-red');
  $(ser).parent().addClass('active');
})
*/
