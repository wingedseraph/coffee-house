"use strict";
document.addEventListener("DOMContentLoaded", () => {
  /**
   * script for controlling the loader indicator
   */
  const loaderContainer = document.querySelector(".loader-container");

  loaderContainer.classList.remove("loaded");

  setTimeout(() => {
    loaderContainer.classList.add("loaded");
  }, 1500);

  /**
   * burger menu for mobile layout
   */
  const header = document.querySelector(".header");
  const menuMobileButton = document.querySelector(".menu-mobile-button");
  const navList = document.querySelector(".nav-list");

  if (menuMobileButton) {
    menuMobileButton.addEventListener("click", () => {
      if (header) {
        header.classList.toggle("open");
      }
      if (document.body) {
        document.body.classList.toggle("scroll-hidden");
      }
    });
  }

  if (navList) {
    navList.addEventListener("click", () => {
      console.log("nav list clicked");
      if (header) {
        header.classList.remove("open");
      }
      if (document.body) {
        document.body.classList.remove("scroll-hidden");
      }
    });
  }
  // COFFEE SLIDER
  // COFFEE SLIDER
  const coffeeSlider = document.querySelector(".coffee-slider");
  const sliderContainer = document.querySelector(".slider-container");
  const sliderLine = document.querySelector(".coffee-slider__imgs");
  const sliderImgs = document.querySelectorAll(".coffee-slider__img");
  const prevBtn = document.querySelector(".slider__btn-left");
  const nextBtn = document.querySelector(".slider__btn-right");
  const sliderStrips = document.querySelectorAll(
    ".coffee-slider__pagination-strip",
  );
  let slideNum = 1;
  let sliderLineLeft = 0;
  let sliderWidth = 480;

  let mediaQuery = window.matchMedia("(max-width: 700px)");
  mediaQuery.addEventListener("change", checkMediaQuery);

  let timerId;
  let setTimeoutId;
  let progressIntervalId;

  document.addEventListener("DOMContentLoaded", () => {
    progressFilling();
  });

  //Если убрать курсор со слайдера, он продолжит автоматически менять слайды
  coffeeSlider.addEventListener("mouseleave", () => {
    relaunchProgressFilling();
  });

  //При наведении курсора на слайдер, он останавливает перелистывание слайдов
  coffeeSlider.addEventListener("mouseover", () => {
    pauseSliderSwitching();
    clearInterval(progressIntervalId);
  });

  //Перелистывать слайды при клике на кнопки стрелок в слайдере
  nextBtn.addEventListener("click", () => {
    nextSlide();
    relaunchProgressFilling();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    relaunchProgressFilling();
  });

  //При нажатии на клавиатуре стрелок вправо/влево перелистывать слайды
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      clearTimeout(setTimeoutId);
      nextSlide();
      pauseSliderSwitching();

      setTimeoutId = setTimeout(() => {
        relaunchProgressFilling();
      }, 50);
    }

    if (e.key === "ArrowLeft") {
      clearTimeout(setTimeoutId);
      prevSlide();
      pauseSliderSwitching();

      setTimeoutId = setTimeout(() => {
        relaunchProgressFilling();
      }, 50);
    }
  });

  //При ресайзе ширины экрана изменять ширину слайдера и следовательно изменять расстояние сдвига ленты слайдера
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 700) {
      sliderWidth = 348;
      sliderLine.style.left = 0 + "px";
    } else {
      sliderWidth = 480;
      sliderLine.style.left = 0 + "px";
    }
  });

  //Touch slider swiping
  let touchX1 = 0;
  let toucheX2 = 0;
  let touchY1 = 0;
  let toucheY2 = 0;
  let swipeLengthX;
  let swipeLengthY;

  coffeeSlider.addEventListener("touchstart", (e) => {
    // e.preventDefault();   //prevent zooming
    touchStart(e);
  });

  coffeeSlider.addEventListener("touchmove", (e) => {
    touchMove(e);
  });

  coffeeSlider.addEventListener("touchend", (e) => {
    touchEnd(e);
  });

  function touchStart(e) {
    touchX1 = Math.floor(e.touches[0].clientX);
    touchY1 = Math.floor(e.touches[0].clientY);

    clearInterval(progressIntervalId);
  }

  function touchMove(e) {
    toucheX2 = Math.floor(e.touches[0].clientX);
    toucheY2 = Math.floor(e.touches[0].clientY);

    swipeLengthX = touchX1 - toucheX2;
    swipeLengthY = touchY1 - toucheY2;
  }

  function touchEnd(e) {
    if (Math.abs(swipeLengthY) < Math.abs(swipeLengthX)) {
      if (Math.abs(swipeLengthX) >= 100) {
        if (swipeLengthX > 0) {
          nextSlide();
          pauseSliderSwitching();
        } else {
          prevSlide();
          pauseSliderSwitching();
        }
      }

      clearTimeout(setTimeoutId);
      setTimeoutId = setTimeout(() => {
        relaunchProgressFilling();
      }, 50);
    } else {
      relaunchProgressFilling();
    }
  }

  function pauseSliderSwitching() {
    clearInterval(progressIntervalId);
  }

  // function launchSlider() {
  //     timerId = setInterval(() => {
  //         nextSlide();
  //         relaunchProgressFilling();
  //     }, 5000);
  // }

  function prevSlide() {
    slideNum--;
    sliderLineLeft += sliderWidth;

    if (slideNum < 1) {
      slideNum = 3;
      sliderLineLeft = -2 * coffeeSlider.offsetWidth;
    }
    sliderLine.style.left = sliderLineLeft + "px";
    paginationChangeToActive();
  }

  function nextSlide() {
    slideNum++;
    sliderLineLeft -= coffeeSlider.offsetWidth;

    if (slideNum > 3) {
      slideNum = 1;
      sliderLineLeft = 0;
    }
    sliderLine.style.left = sliderLineLeft + "px";

    paginationChangeToActive();
  }

  function paginationChangeToActive() {
    clearInterval(progressIntervalId);
    sliderStrips.forEach((item) => {
      item.classList.remove("active");
      item.querySelector("div").style.width = "0%";
    });
    sliderStrips[slideNum - 1].classList.add("active");

    relaunchProgressFilling();
  }

  function progressFilling(progressValue = 0) {
    console.log(progressValue);

    const activePagination = document.querySelector(
      ".coffee-slider__pagination-strip.active",
    );
    const progressBar = activePagination.querySelector(
      ".coffee-slider__pagination-strip--status",
    );
    let progressWidth = parseInt(progressValue);

    progressIntervalId = setInterval(() => {
      if (progressWidth > 100) {
        clearInterval(progressIntervalId);
        progressWidth = 0;
        progressBar.style.width = progressWidth + "px";

        clearInterval(progressIntervalId);
        nextSlide();
      } else {
        progressWidth++;
        progressBar.style.width = progressWidth + "%";
      }
    }, 50);
  }

  function relaunchProgressFilling() {
    clearInterval(progressIntervalId);
    progressFilling(
      document.querySelector(".coffee-slider__pagination-strip.active div")
        .style.width,
    );
  }

  function checkMediaQuery(e) {
    if (e.matches) {
      sliderWidth = coffeeSlider.offsetWidth;
    }
  }
});
