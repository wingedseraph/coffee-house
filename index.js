"use strict";
// alert("Уважаемый Ревьюер!\nРабота не доделана. Пожалуйста, вернитесь завтра.");

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
  /**
   * coffee slider
   */
  const coffeeSlider = document.querySelector(".coffee-slider");
  const sliderLine = document.querySelector(".coffee-slider-images");
  const previousButton = document.querySelector(".slider-button-left");
  const nextButton = document.querySelector(".slider-button-right");
  const sliderControl = document.querySelectorAll(".favorite-tools-control");
  let sliderNumber = 1;
  let sliderLineLeft = 0;
  let sliderWidth = 480;
  let smallScreenWidth = 348;
  let largeScreenWidth = 480;
  let mediaQuery = window.matchMedia("(max-width: 700px)");
  mediaQuery.addEventListener("change", checkMediaQuery);

  let setTimeoutId;
  let progressIntervalId;

  document.addEventListener("DOMContentLoaded", () => {
    progressFilling();
  });

  coffeeSlider.addEventListener("mouseleave", () => {
    relaunchProgressFilling();
  });

  coffeeSlider.addEventListener("mouseover", () => {
    pauseSliderSwitching();
    clearInterval(progressIntervalId);
  });

  nextButton.addEventListener("click", () => {
    nextSlide();
    relaunchProgressFilling();
  });

  previousButton.addEventListener("click", () => {
    prevSlide();
    relaunchProgressFilling();
  });

  document.addEventListener("keydown", handleArrowKey);

  function handleArrowKey(args) {
    clearTimeout(setTimeoutId);

    if (args.key === "ArrowRight" || args.key === "ArrowLeft") {
      navigateSlide(args.key === "ArrowRight" ? 1 : -1);
    }

    pauseSliderSwitching();
    setTimeoutId = setTimeout(relaunchProgressFilling, 50);
  }

  function navigateSlide(direction) {
    if (direction === 1) {
      nextSlide();
    } else {
      prevSlide();
    }
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 700) {
      sliderWidth = smallScreenWidth;
      sliderLine.style.left = 0 + "px";
    } else {
      sliderWidth = largeScreenWidth;
      sliderLine.style.left = 0 + "px";
    }
  });

  let touchX1 = 0;
  let touchX2 = 0;
  let touchY1 = 0;
  let touchY2 = 0;
  let swipeLengthX;
  let swipeLengthY;

  coffeeSlider.addEventListener("touchstart", (args) => {
    touchStart(args);
  });

  coffeeSlider.addEventListener("touchmove", (args) => {
    touchMove(args);
  });

  coffeeSlider.addEventListener("touchend", (args) => {
    touchEnd(args);
  });

  function touchStart(args) {
    touchX1 = Math.floor(args.touches[0].clientX);
    touchY1 = Math.floor(args.touches[0].clientY);

    clearInterval(progressIntervalId);
  }

  function touchMove(args) {
    touchX2 = Math.floor(args.touches[0].clientX);
    touchY2 = Math.floor(args.touches[0].clientY);

    swipeLengthX = touchX1 - touchX2;
    swipeLengthY = touchY1 - touchY2;
  }

  function touchEnd() {
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

  function prevSlide() {
    sliderNumber--;
    sliderLineLeft += sliderWidth;

    if (sliderNumber < 1) {
      sliderNumber = 3;
      sliderLineLeft = -2 * coffeeSlider.offsetWidth;
    }
    sliderLine.style.left = sliderLineLeft + "px";
    paginationChangeToActive();
  }

  function nextSlide() {
    sliderNumber++;
    sliderLineLeft -= coffeeSlider.offsetWidth;

    if (sliderNumber > 3) {
      sliderNumber = 1;
      sliderLineLeft = 0;
    }
    sliderLine.style.left = sliderLineLeft + "px";

    paginationChangeToActive();
  }

  function paginationChangeToActive() {
    clearInterval(progressIntervalId);
    sliderControl.forEach((item) => {
      item.classList.remove("active");
      item.querySelector("div").style.width = "0%";
    });
    sliderControl[sliderNumber - 1].classList.add("active");

    relaunchProgressFilling();
  }

  function progressFilling(progressValue = 0) {
    console.log(progressValue);

    const activePagination = document.querySelector(
      ".favorite-tools-control.active",
    );
    const progressBar = activePagination.querySelector(
      ".favorite-tools-control--status",
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
      document.querySelector(".favorite-tools-control.active div").style.width,
    );
  }

  function checkMediaQuery(args) {
    if (args.matches) {
      sliderWidth = coffeeSlider.offsetWidth;
    }
  }
});
