// ************************************************
// Shopping Cart API
// ************************************************
const IMAGE_URL = "/static/src/images/";
const arrayMenuItem = [
  {
    id: 1,
    img: IMAGE_URL + "product-1.png",
    title: "coffe house",
    price: 15,
    discount: 12,
  },

  {
    id: 2,
    img: IMAGE_URL + "product-2.png",
    title: "coffee",
    price: 14,
    discount: 11,
  },

  {
    id: 3,
    img: IMAGE_URL + "product-3.png",
    title: "tea",
    price: 12,
    discount: 10,
  },

  {
    id: 4,
    img: IMAGE_URL + "product-4.png",
    title: "lemon",
    price: 11,
    discount: 8,
  },

  {
    id: 5,
    img: IMAGE_URL + "product-5.png",
    title: "apple tea",
    price: 10,
    discount: 2,
  },

  {
    id: 6,
    img: IMAGE_URL + "product-6.png",
    title: "water",
    price: 8,
    discount: 5,
  },
];

var shoppingCart = (function () {
  cart = [];

  // Constructor
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }

  // Save cart
  function saveCart() {
    sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
  }

  // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem("shoppingCart"));
  }

  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }

  var obj = {};

  // Add to cart
  obj.addItemToCart = function (name, price, count) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  };

  // Set count from item
  obj.setCountForItem = function (name, count) {
    for (var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
  obj.removeItemFromCart = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count--;
        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }
    saveCart();
  };

  // Remove all items from cart
  obj.removeItemFromCartAll = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  };

  // Clear cart
  obj.clearCart = function () {
    cart = [];
    saveCart();
  };

  // Count cart
  obj.totalCount = function () {
    var totalCount = 0;
    for (var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  };

  // Total cart
  obj.totalCart = function () {
    var totalCart = 0;
    for (var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  };

  // List cart
  obj.listCart = function () {
    var cartCopy = [];
    for (i in cart) {
      item = cart[i];
      itemCopy = {};
      for (p in item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy);
    }
    return cartCopy;
  };

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
})();

function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";

  for (var i in cartArray) {
    output +=
      "<div class='header__wrapper'>" +
      "<div class='header__cart-desc'>" +
      cartArray[i].name +
      "</div>" +
      "<div class='header__cart-count'>" +
      cartArray[i].count +
      "</div>" +
      "<div class='header__cart-price'>" +
      cartArray[i].price +
      "</div>" +
      "<div class='header__cart-close'><button type='button' onClick='deleteItemCart(this)' class='btn header__btn-danger' data-name=" +
      cartArray[i].name +
      ">X</button></div>" +
      "<div class='header__total'>" +
      cartArray[i].total +
      "</div>" +
      "</div>";
  }

  const cartContent = document.querySelector(".header__cart-content");
  cartContent.innerHTML = output;
}

function product() {
  var outputProduct = "";

  for (var i in arrayMenuItem) {
    let image = arrayMenuItem[i]?.img ?? "";
    let title = arrayMenuItem[i]?.title ?? "";
    let price = arrayMenuItem[i]?.price ?? "";
    let discount = arrayMenuItem[i]?.discount ?? "";
    let id = arrayMenuItem[i]?.id ?? "";

    outputProduct +=
      "<div class='products__box'>" +
      "<div class='products__products-icons'>" +
      "<div onClick='addToCart(this)' price=" +
      price +
      " name=" +
      title +
      " class='fa fa-shopping-cart products__cart'></div>" +
      "<div class='fa fa-heart products__heart-" +
      id +
      "'" +
      "id=" +
      id +
      " onClick='favoriteItem(this)'></div>" +
      "</div>" +
      "<div class='products__image'>" +
      "<img class='products__image-item' alt='' src=" +
      image +
      ">" +
      "<div class='products__image-cover'></div>"+
      "</div>" +
      "<div class='products__content'>" +
      "<h3 class='products__title'>" +
      title +
      "</h3>" +
      "<div class='products__stars'>" +
      "<i class='fa fa-star'></i>" +
      "<i class='fa fa-star'></i>" +
      "<i class='fa fa-star'></i>" +
      "<i class='fa fa-star'></i>" +
      "<i class='fa fa-star-half-alt'></i>" +
      "</div>" +
      "<div class='products__price'>" +
      price +
      "<span class='products__span-price'>" +
      discount +
      "</span></div>" +
      "</div>" +
      "</div>";
  }

  const productContent = document.querySelector(".products__container");
  productContent.innerHTML = outputProduct;
}

function searchProduct(title) {
  var outputProduct = "";

  var listItembyFilter = arrayMenuItem.filter(function (item) {
    if (item.title === null) {
      return;
    }

    return item.title == title;
  });

  for (var i in listItembyFilter) {
    let image = listItembyFilter[i]?.img ?? "";
    let title = listItembyFilter[i]?.title ?? "";
    let price = listItembyFilter[i]?.price ?? "";
    let discount = listItembyFilter[i]?.discount ?? "";
    let id = listItembyFilter[i]?.id ?? "";

    outputProduct +=
      "<div class='products__box'>" +
      "<div class='products__products-icons'>" +
      "<div onClick='addToCart(this)' price=" +
      price +
      " name=" +
      title +
      " class='fa fa-shopping-cart products__cart'></div>" +
      "<div class='fa fa-heart products__heart-"+id+"' id=" +
      id +
      " onClick='favoriteItem(this)'></div>" +
      "</div>" +
      "<div class='products__image'>" +
      "<img alt='' src=" +
      image +
      ">" +
      "</div>" +
      "<div class='products__content'>" +
      "<h3 class='products__title'>" +
      title +
      "</h3>" +
      "<div class='products__stars'>" +
      "<i class='fa fa-star'></i>" +
      "<i class='fa fa-star'></i>" +
      "<i class='fa fa-star'></i>" +
      "<i class='fa fa-star'></i>" +
      "<i class='fa fa-star-half-alt'></i>" +
      "</div>" +
      "<div class='products__price'>" +
      price +
      "<span class='products__span-price'>" +
      discount +
      "</span></div>" +
      "</div>" +
      "</div>";
  }

  const productContent = document.querySelector(".products__container");
  productContent.innerHTML = outputProduct;
}

function addToCart(event) {
  const name = event.getAttribute("name") ?? "";
  const price = event.getAttribute("price") ?? "";
  shoppingCart.addItemToCart(name, price, 1);
  const numberCart = document.querySelector(".number-cart");
  numberCart.textContent = shoppingCart.totalCount();
  displayCart();
}

function deleteItemCart(event) {
  let name = event.getAttribute("data-name") ?? "";
  shoppingCart.removeItemFromCart(name);
  numberCart.textContent = shoppingCart.totalCount();
  displayCart();
}

function deleteAllItemCart() {
  shoppingCart.clearCart();
  numberCart.textContent = 0;
  displayCart();
}

function favoriteItem(event) {
  let id = event?.id ?? 0;
  const products__heart = document.querySelector(".products__heart-" + id);
  products__heart.classList.toggle("like");
}
// *****************************************
// Triggers / Events
// *****************************************
const numberCart = document.querySelector(".number-cart");
numberCart.textContent = shoppingCart.totalCount();
const lk_cart = document.querySelector(".header__cart");
const lk__search = document.querySelector(".header__label");
const checkout = document.querySelector(".header__btn-checkout");

if (document.getElementById("searchBox").value.length == 0) {
  product();
}
//submit form when 'Enter' key is pressed while in myInputID
document
  .getElementById("searchBox")
  .addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      var title = document.getElementById("searchBox").value;
      searchProduct(title.toLowerCase());

      if (document.getElementById("searchBox").value.length == 0) {
        product();
      }
    }
  });

lk__search.addEventListener("click", event => {
  var title = document.getElementById("searchBox").value;
  searchProduct(title.toLowerCase());

  if (document.getElementById("searchBox").value.length == 0) {
    product();
  }
});

lk_cart.addEventListener("click", () => {
  displayCart();
});
