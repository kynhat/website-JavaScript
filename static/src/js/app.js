(function () {
  // insret image
  const IMAGE_URL = "/static/src/images/";
  const image = document.querySelector("img");

  //create arrayObject
  const arrayObject = {
    type: "search",
    id: "searchBox",
    placeholder: "search here...",
  };

  image.setAttribute("src", IMAGE_URL + "logo.png");
  //search
  const divSearch = document.createElement("div");
  const input = document.createElement("input");
  const label = document.createElement("i");

  // input
  divSearch.classList.add("header__search-input");
  setAttributes(input, arrayObject);
  divSearch.appendChild(input);

  // label
  label.className = "fa fa-search header__label";
  divSearch.appendChild(label);

  //class header
  const header = document.querySelector(".header");
  header.appendChild(divSearch);

  //lk = click
  const lk_search = document.querySelector(".header__search");
  const lk_cart = document.querySelector(".header__cart");
  const lk_menu = document.querySelector(".header__menu-bar");
  //selector class
  const searchInput = document.querySelector(".header__search-input");
  const cartItem = document.querySelector(".header__cart-item-container");
  const menuNav = document.querySelector(".header__nav");

  lk_search.addEventListener("click", () => {
    searchInput.classList.toggle("is-active");
    cartItem.classList.remove("is-active");
    menuNav.classList.remove("is-active");
  });

  lk_cart.addEventListener("click", () => {
    cartItem.classList.toggle("is-active");
    searchInput.classList.remove("is-active");
    menuNav.classList.remove("is-active");
  });

  lk_menu.addEventListener("click", () => {
    menuNav.classList.toggle("is-active");
    searchInput.classList.remove("is-active");
    cartItem.classList.remove("is-active");
  });

  function setAttributes(el, attrs) {
    for (var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

  function handleClickOutMenu(event) {
    if (
      !lk_menu.contains(event.target) &&
      !event.target.matches(".header__nav")
    ) {
      menuNav.classList.remove("is-active");
    }

    if (
      !lk_cart.contains(event.target) &&
      !event.target.matches(".header__cart-item-container") &&
      !event.target.matches(".header__cart-desc") &&
      !event.target.matches(".header__cart-count") &&
      !event.target.matches(".header__cart-price") &&
      !event.target.matches(".header__cart-close") &&
      !event.target.matches(".header__total") &&
      !event.target.matches(".header__wrapper") &&
      !event.target.matches(".header__btn-danger") &&
      !event.target.matches(".header__minus-item")&&
      !event.target.matches(".header__plus-item")
    ) {
      cartItem.classList.remove("is-active");
    }
  }
  //when click out close searh and cart and  menu
  document.addEventListener("click", handleClickOutMenu);

  // giống như ham main()
  var init = () => {
    //  setAttributes();
  };

  window.onload = function () {
    init();
  };
})();
