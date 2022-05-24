function addToCart(name, image, price) {
  localStorage.setItem(name, [name, image, price]);
  updateCartCount();
}

function updateCartCount() {
  count = document.getElementById("checkout_items");
  count.innerHTML = localStorage.length;
}

function darkTheme() {
  document.documentElement.style.setProperty(
    "--cor-primaria",
    "rgb(255, 255, 0)"
  );
  document.documentElement.style.setProperty(
    "--cor-secundaria",
    "rgb(129, 1, 129)"
  );
  document.documentElement.style.setProperty(
    "--cor-secundaria-hover",
    "rgb(212, 5, 212)"
  );
  document.documentElement.style.setProperty(
    "--cor-titulo",
    "rgb(172, 155, 7)"
  );
  document.documentElement.style.setProperty(
    "--cor-bubble-text",
    "rgb(0, 0, 0)"
  );
  document.documentElement.style.setProperty(
    "--cor-select",
    "rgb(255, 255, 0)"
  );
  document.documentElement.style.setProperty(
    "--cor-background",
    "rgb(0, 0, 0)"
  );
  document.documentElement.style.setProperty("--cor-desconto", "rgb(181, 174, 196)");
  
}

function lightTheme() {
  document.documentElement.style.setProperty("--cor-primaria", "rgb(0, 0, 0)");
  document.documentElement.style.setProperty(
    "--cor-bubble-text",
    "rgb(255, 255, 0)"
  );
  document.documentElement.style.setProperty(
    "--cor-select",
    "rgb(255, 255, 0)"
  );
  document.documentElement.style.setProperty("--cor-background", "rgb(195, 203, 214)");
  document.documentElement.style.setProperty("--cor-desconto", "rgb(0, 0, 0)");
  document.documentElement.style.setProperty("--cor-desconto", "rgb(181, 174, 196)");
 
}

function changeTheme() {
  const radio1 = document.getElementById("themeRadio1");
  radio1.addEventListener("click", () => {
	console.log("light");
    lightTheme();
  });
  const radio2 = document.getElementById("themeRadio2");
  radio2.addEventListener("click", () => {
	console.log("dark");
    darkTheme();
  });
}
jQuery(document).ready(function ($) {
  "user strict";

  var mainSlider = $(".main_slider");
  var hamburger = $(".hamburger_container");
  var menu = $(".hamburger_menu");
  var menuActive = false;
  var hamburgerClose = $(".hamburger_close");
  var fsOverlay = $(".fs_menu_overlay");

  initMenu();
  initFavorite();
  initIsotopeFiltering();
  initTimer();
  initSlider();


  function initMenu() {
    if (hamburger.length) {
      hamburger.on("click", function () {
        if (!menuActive) {
          openMenu();
        }
      });
    }
    if (fsOverlay.length) {
      fsOverlay.on("click", function () {
        if (menuActive) {
          closeMenu();
        }
      });
    }
    if (hamburgerClose.length) {
      hamburgerClose.on("click", function () {
        if (menuActive) {
          closeMenu();
        }
      });
    }
    if ($(".menu_item").length) {
      var items = document.getElementsByClassName("menu_item");
      var i;

      for (i = 0; i < items.length; i++) {
        if (items[i].classList.contains("has-children")) {
          items[i].onclick = function () {
            this.classList.toggle("active");
            var panel = this.children[1];
            if (panel.style.maxHeight) {
              panel.style.maxHeight = null;
            } else {
              panel.style.maxHeight = panel.scrollHeight + "px";
            }
          };
        }
      }
    }
  }

  function openMenu() {
    menu.addClass("active");
    fsOverlay.css("pointer-events", "auto");
    menuActive = true;
  }

  function closeMenu() {
    menu.removeClass("active");
    fsOverlay.css("pointer-events", "none");
    menuActive = false;
  }

  function initFavorite() {
    if ($(".favorite").length) {
      var favs = $(".favorite");

      favs.each(function () {
        var fav = $(this);
        var active = false;
        if (fav.hasClass("active")) {
          active = true;
        }
        fav.on("click", function () {
          if (active) {
            fav.removeClass("active");
            active = false;
          } else {
            fav.addClass("active");
            active = true;
          }
        });
      });
    }
  }

  function initIsotopeFiltering() {
    if ($(".grid_sorting_button").length) {
      $(".grid_sorting_button").click(function () {
        $(".grid_sorting_button.active").removeClass("active");
        $(this).addClass("active");

        var selector = $(this).attr("data-filter");
        $(".product-grid").isotope({
          filter: selector,
          animationOptions: {
            duration: 750,
            easing: "linear",
            queue: false,
          },
        });
        return false;
      });
    }
  }

  function initTimer() {
    if ($(".timer").length) {
      let date = new Date();
      let target_date = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 3
      );

      // Variaveis para as unidades de tempo
      var days, hours, minutes, seconds;
      var d = $("#day");
      var h = $("#hour");
      var m = $("#minute");
      var s = $("#second");

      setInterval(function () {
        // Calcula a quantidade de segundos entre agora e o objetivo (target)

        var current_date = new Date().getTime();
        var seconds_left = (target_date - current_date) / 1000;

        days = parseInt(seconds_left / 86400);
        seconds_left = seconds_left % 86400;

        hours = parseInt(seconds_left / 3600);
        seconds_left = seconds_left % 3600;

        minutes = parseInt(seconds_left / 60);
        seconds = parseInt(seconds_left % 60);

        d.text(days > 9 ? days : "0" + days);
        h.text(hours > 9 ? hours : "0" + hours);
        m.text(minutes > 9 ? minutes : "0" + minutes);
        s.text(seconds > 9 ? seconds : "0" + seconds);
      }, 1000);
    }
  }

  function initSlider() {
    if ($(".product_slider").length) {
      var slider1 = $(".product_slider");

      slider1.owlCarousel({
        loop: true,
        dots: false,
        nav: false,
        autoplay: true,
        autoplayTimeout: 500,
        autoplayHoverPause: false,
        smartSpeed: 1000,

        responsive: {
          0: { items: 1 },
          480: { items: 2 },
          768: { items: 3 },
          991: { items: 4 },
          1280: { items: 5 },
          1440: { items: 5 },
        },
      });
      if ($(".product_slider_nav_left").length) {
        $(".product_slider_nav_left").on("click", function () {
          slider1.trigger("prev.owl.carousel");
        });
      }
      if ($(".product_slider_nav_right").length) {
        $(".product_slider_nav_right").on("click", function () {
          slider1.trigger("next.owl.carousel");
        });
      }
    }
  }
});
