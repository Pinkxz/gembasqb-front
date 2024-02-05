//Scroll do Header
$(document).ready(function () {
    var header = $("header");
    var logo = $(".logo img");
  
    $(window).scroll(function () {
      if ($(this).scrollTop() > 0) {
        header.addClass("scrolled");
        logo.css("max-height", "40px");
      } else {
        header.removeClass("scrolled");
        logo.css("max-height", "70px");
      }
    });
  });
