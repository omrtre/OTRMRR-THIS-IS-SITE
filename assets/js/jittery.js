$(function(){
  $('.jittery').each(function() {
    var $jittery = $(this),
        aText    = $jittery.text().split(''),
        letters = '';
    
    for (var i = 0; i < aText.length; i++){
      letters += '<span>' + aText[i] + '</span>';
    }
    
    $jittery.empty().append(letters);

    $.each($('span', $jittery), function(i){
      $(this).addClass('jittery').css('animation-delay', '-' + i + '70ms');
    });
  });
});