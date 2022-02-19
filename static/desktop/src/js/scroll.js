(function () {
  const mybutton = document.getElementById("back-top");
  const searchInput = document.querySelector(".header__search-input");
  const cartItem = document.querySelector(".header__cart-item-container");
  const menuNav = document.querySelector(".header__nav");

  function scrollToTop() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
      searchInput.classList.remove("is-active");
      cartItem.classList.remove("is-active");
      menuNav.classList.remove("is-active");
    } else {
      mybutton.style.display = "none";
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  mybutton.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

  window.onscroll = function () {
    scrollToTop();
  };
})();
