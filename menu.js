import menuitemjson from "./products.json" assert { type: "json" };
("use strict");
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleButton");
  const toggleButtonDessert = document.getElementById("toggleButton-dessert");
  if (toggleButton) {
    toggleButton.addEventListener("click", togglePreviewItems);
    toggleButtonDessert.addEventListener("click", togglePreviewItems);
  } else {
    console.error("button not found");
  }

  function togglePreviewItems() {
    const buttonMobile = document.getElementById("toggleButton");
    const toggleButtonDessert = document.getElementById("toggleButton-dessert");
    const previewItems = document.querySelectorAll(".preview-item");

    if (buttonMobile) {
      buttonMobile.classList.toggle("open");
      toggleButtonDessert.classList.toggle("open");
    }

    previewItems.forEach((item) => {
      item.classList.toggle("open");
    });
  }
});
/*
 * change coffee, tea and dessert images
 */
document.addEventListener("DOMContentLoaded", function () {
  const isClickEnabled = true;

  document.body.addEventListener("click", function (event) {
    if (!isClickEnabled) return;

    if (event.target.id === "toggleLogo") {
      console.log("click");
      event.preventDefault();
      event.stopPropagation();
      event.target.classList.toggle("active");

      isClickEnabled = false;
      setTimeout(() => {
        isClickEnabled = true;
      }, 500);
    }
  });
});
/*
 * change tabs menu page
 */
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".button-preview");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabSection = this.classList[3];

      buttons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      document.querySelectorAll(".tab-content").forEach((tabContent) => {
        tabContent.classList.remove("active-tab");
      });

      document.querySelector(`.tab-${tabSection}`).classList.add("active-tab");
    });
  });
});
/**
 * modal menu page
 */
document.addEventListener("DOMContentLoaded", function () {
  const previewItem = document.querySelectorAll(".preview-item");
  const modal = document.querySelector(".modal");
  const modalBox = document.querySelector(".modal-box");

  previewItem.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      console.log(item, index, menuitemjson[index]);
      modal.classList.add("open");
      document.querySelector("body").classList.add("scroll-hidden");
      modalBox.innerHTML = "";
      modalBox.innerHTML = `<div class="modal-left">
                    <div class="modal-img-wrapper">
                        <img src=${menuitemjson[index]["img-src"]} alt="" class="modal-img">
                    </div>
                </div>

                <div class="modal-right">
                    <div class="modal-desc">
                        <h4 class="modal-title">${menuitemjson[index].name}</h4>
                        <p class="modal-desc-text">${menuitemjson[index].description}</p>
                    </div>

                    <div class="modal-sizes">
                        <h5 class="modal-sizes-title">Size</h5>
                        <div class="sizes-buttons">
                            <button class="sizes-button chosen"><span class="size-letter">S</span><span class="size-desc">${menuitemjson[index].sizes.s.size}</span></button>

                            <button class="sizes-button"><span class="size-letter">M</span><span class="size-desc">${menuitemjson[index].sizes.m.size}</span></button>

                            <button class="sizes-button"><span class="size-letter">L</span><span class="size-desc">${menuitemjson[index].sizes.l.size}</span></button>
                        </div>
                    </div>

                    <div class="modal-additives">
                        <h5 class="modal-additives-title">Additives</h5>
                        <div class="additives-buttons">
                            <button class="additives-button"><span class="additive-num">1</span><span class="additive-desc">${menuitemjson[index].additives[0].name}</span></button>

                            <button class="additives-button"><span class="additive-num">2</span><span class="additive-desc">${menuitemjson[index].additives[1].name}</span></button>

                            <button class="additives-button"><span class="additive-num">3</span><span class="additive-desc">${menuitemjson[index].additives[2].name}</span></button>
                        </div>
                    </div>

                    <div class="modal-total">
                        <p class="total-text">Total:</p>
                        <p class="total-price">$${menuitemjson[index].price}</p>
                    </div>

                    <div class="modal-alert">
                        <svg class="modal-alert-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <g clip-path="url(#clip0_268_12877)">
                              <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8.00004C14.6663 4.31814 11.6816 1.33337 7.99967 1.33337C4.31778 1.33337 1.33301 4.31814 1.33301 8.00004C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                          </svg>

                          <p class="modal-alert-text">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
                    </div>

                    <button class="modal-close-button">Close</button>
                </div>`;

      totalSumModal(modalBox, index);

      const closebutton = modalBox.querySelector(".modal-close-button");
      closebutton.addEventListener("click", closeModal);
    });
  });

  function closeModal() {
    modal.classList.remove("open");
    document.querySelector("body").classList.remove("scroll-hidden");
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  document.addEventListener("click", (e) => {
    let withinBoundaries = e.composedPath().includes(modalBox);

    if (!withinBoundaries && modal.classList.contains("open")) closeModal();
    if (e.target.closest(".preview-item")) {
      modal.classList.add("open");
      document.querySelector("body").classList.add("scroll-hidden");
    }
  });

  function totalSumModal(openedModalBox, cardIndex) {
    const initPrice = Number(menuitemjson[cardIndex].price);
    let totalPrice = 0;
    const priceOutput = openedModalBox.querySelector(".total-price");
    const buttonSize = openedModalBox.querySelectorAll(".sizes-button");
    const buttonAdditives =
      openedModalBox.querySelectorAll(".additives-button");

    buttonSize.forEach((sizesbutton, i) => {
      sizesbutton.addEventListener("click", () => {
        buttonSize.forEach((item) => {
          item.classList.remove("chosen");
        });

        sizesbutton.classList.add("chosen");
        if (i === 0) totalPrice = initPrice;
        if (i === 1) totalPrice = initPrice + 0.5;
        if (i === 2) totalPrice = initPrice + 1;

        priceOutput.innerHTML = `$${totalPrice.toFixed(2)}`;
      });
    });

    buttonAdditives.forEach((item, i) => {
      item.addEventListener("click", () => {
        item.classList.toggle("chosen");
        let currentPrice = +priceOutput.textContent.slice(1);

        if (buttonAdditives[i].classList.contains("chosen"))
          totalPrice = currentPrice + 0.5;
        if (!buttonAdditives[i].classList.contains("chosen"))
          totalPrice = currentPrice - 0.5;

        priceOutput.innerHTML = `$${totalPrice.toFixed(2)}`;
      });
    });
  }
});
