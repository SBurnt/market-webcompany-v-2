/*svg4everybody({
   nosvg: true, // shiv <svg> and <use> elements and use image fallbacks
 	polyfill: true // polyfill <use> elements for External Content
 });*/

var menuBtn = document.querySelector("#mobile-menu-btn");
var mobileMenu = document.querySelector("#header-mobile-menu");
menuBtn.addEventListener("click", function () {
  this.classList.toggle("open");
  mobileMenu.classList.toggle("open");
});

var menuItemsDropdown = document.querySelectorAll(".header-mobile__menu__drop");
for (var i = 0; i < menuItemsDropdown.length; i++) {
  menuItemsDropdown[i].addEventListener("click", function () {
    this.nextElementSibling.classList.add("active");
  });
}

var sublistClose = document.querySelectorAll(".sublist-back");
for (var x = 0; x < sublistClose.length; x++) {
  sublistClose[x].addEventListener("click", function () {
    console.log(this.parentElement.classList);
    this.parentElement.classList.remove("active");
  });
}

$(".main-banner").slick({
  arrows: true,
  dots: true,
  prevArrow:
    '<div class="prev-slide"><svg width="8" height="10" viewBox="0 0 8 10" xmlns="http://www.w3.org/2000/svg"><path d="M7.0835 8.75L3.25016 5L7.0835 1.16667L5.91683 0L0.91683 5L5.91683 10L7.0835 8.75Z" /></svg></div>',
  nextArrow:
    '<div class="next-slide"><svg width="8" height="10" viewBox="0 0 8 10" xmlns="http://www.w3.org/2000/svg"><path d="M0.916504 8.75L4.74984 5L0.916504 1.16667L2.08317 0L7.08317 5L2.08317 10L0.916504 8.75Z" /></svg></div>',
  appendArrows: ".slider__container",
});

$(document).ready(function () {
  $(".menu__sm").flexMenu({
    linkText: "&bull;&nbsp;&bull;&nbsp;&bull;",
    popupClass: "menu__sm__popup",
  });
  $(".menu").flexMenu({
    linkText: "&bull;&nbsp;&bull;&nbsp;&bull;",
  });

  // var slider1 = $(".main-banner.under");
  // if (slider1.length) {
  //   $(".header").addClass("header_white");
  //   // $(".header").css("background", "linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)");
  // }

  // $(".main-banner.under").on("afterChange", function (slick, currentSlide) {
  //   if ($(".slick-current").hasClass("light-slide")) {
  //     if ($(".header").hasClass("header_white")) {
  //       $(".header").removeClass("header_white");
  //       $(".header").css(
  //         "background",
  //         "linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0) 100%), linear-gradient(180deg, rgba(250, 250, 250, 0.8) 0%, rgba(250, 250, 250, 0) 100%)"
  //       );
  //     }
  //   } else {
  //     if (!$(".header").hasClass("header_white")) {
  //       $(".header").addClass("header_white");
  //       $(".header").css(
  //         "background",
  //         "linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)"
  //       );
  //     }
  //   }
  // });

  $(".main-banner.under").on("afterChange", function (slick, currentSlide) {
    if ($(".slick-current").hasClass("light-slide")) {
      if ($(".header").hasClass("header_white")) {
        $(".header").removeClass("header_white");
      }
    } else {
      if (!$(".header").hasClass("header_white")) {
        $(".header").addClass("header_white");
      }
    }
  });
});

function Tabs() {
  var counter = 1;
  var bindAll = function () {
    var menuElements = document.querySelectorAll("[data-tab]");
    var swTabs = document.querySelectorAll("[switch-tab]");
    for (var i = 0; i < menuElements.length; i++) {
      menuElements[i].addEventListener("click", change, false);
    }
    for (var y = 0; y < swTabs.length; y++) {
      swTabs[y].addEventListener("click", changeTab, false);
    }
  };

  var clear = function () {
    var menuElements = document.querySelectorAll("[data-tab]");
    for (var i = 0; i < menuElements.length; i++) {
      menuElements[i].parentElement.classList.remove("active");
      var id = menuElements[i].getAttribute("data-tab");
      document.getElementById(id).classList.remove("active");
    }
  };

  var change = function (e) {
    clear();
    e.target.parentElement.classList.add("active");
    var menuElements = document.querySelectorAll("[data-tab]");
    for (var i = 0; i < menuElements.length; i++) {
      if (menuElements[i] == e.target) {
        counter = i + 1;
        break;
      }
    }
    var id = e.currentTarget.getAttribute("data-tab");
    document.getElementById(id).classList.add("active");
  };

  var changeTab = function (e) {
    var swCount = document.querySelectorAll("[data-tab]");
    var side = e.currentTarget.getAttribute("switch-tab");
    var swActive = document.querySelector(".services-ten__tabs__switch.active");
    swActive.classList.remove("active");
    if (side == "next" && counter < swCount.length) {
      swActive.nextElementSibling.classList.add("active");
      swActive.nextElementSibling.firstElementChild.click();
    } else if (side == "next" && counter >= swCount.length) {
      swCount[0].click();
      counter = 1;
    } else if (side == "prev" && counter > 1) {
      swActive.previousElementSibling.classList.add("active");
      swActive.previousElementSibling.firstElementChild.click();
    } else {
      swCount[swCount.length - 1].click();
      counter = swCount.length;
    }
  };
  bindAll();
}

var connectTabs = new Tabs();

// присваивание названия в шапке при клике по элементам в меню (header-mobile-1)
function setNameHeader() {
  var item = document.querySelectorAll(".js-set-name-header a");
  var title = document.querySelector(".header-mobile__title-item");

  item.forEach(function (items) {
    items.addEventListener("click", function (e) {
      title.innerHTML = e.target.innerText;
    });
  });
}

setNameHeader();
