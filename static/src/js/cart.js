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

let shoppingCart = (function () {
  let cart = [];

  // Constructor
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }

  // Save cart
  function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }

  // Load cart
  function loadCart() {
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
  }

  if (localStorage.getItem("shoppingCart") != null) {
    loadCart();
  }

  let obj = {};
  // Add to cart
  obj.addItemToCart = function (name, price, count) {
    for (let item in cart) {
      if (cart[item].name === name) {
        cart[item].count++;
        saveCart();
        return;
      }
    }
    let item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  };

  // Set count from item
  obj.setCountForItem = function (name, count) {
    for (let i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
  obj.removeItemFromCart = function (name) {
    for (let item in cart) {
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
    for (let item in cart) {
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
    let totalCount = 0;
    for (let item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  };

  // Total cart
  obj.totalCart = function () {
    let totalCart = 0;
    for (let item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  };

  // List cart
  obj.listCart = function () {
    let cartCopy = [];
    for (let i in cart) {
      let item = cart[i];
      let itemCopy = {};
      for (let p in item) {
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
  let cartArray = shoppingCart.listCart();
  let output = "";

  for (let i in cartArray) {
    output +=
      "<div class='header__wrapper'>" +
      "<div class='header__cart-desc'>" +
      cartArray[i].name +
      "</div>" +
      "<button class='header__minus-item' onclick='minusItem(this)' value=" +
      cartArray[i].count +
      " data-name=" +
      cartArray[i].name +
      ">-</button>" +
      "<input type='' id='header__cart-count' class='header__cart-count' value=" +
      cartArray[i].count +
      ">" +
      "<button class='header__plus-item' onclick='plusItem(this)' value=" +
      cartArray[i].count +
      " data-name=" +
      cartArray[i].name +
      ">+</button>" +
      "</input>" +
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

const numberCart = document.querySelector(".number-cart");
numberCart.textContent = shoppingCart.totalCount();
const lk_cart = document.querySelector(".header__cart");
displayCart();

function plusItem(event) {
  let name = event.getAttribute("data-name");
  shoppingCart.addItemToCart(name);
  const numberCart = document.querySelector(".number-cart");
  numberCart.textContent = shoppingCart.totalCount();
  displayCart();
}

function minusItem(event) {
  let name = event.getAttribute("data-name");
  shoppingCart.removeItemFromCart(name);
  const numberCart = document.querySelector(".number-cart");
  numberCart.textContent = shoppingCart.totalCount();
  displayCart();
}

let lk_count = document.querySelector(".header__cart-count");
if (document.body.contains(lk_count)) {
  lk_count.addEventListener("click", event => {
    let name = lk_count.getAttribute("name");
    let count = Number(event.target.value);
    shoppingCart.setCountForItem(name, count);
    const numberCart = document.querySelector(".number-cart");
    numberCart.textContent = shoppingCart.totalCount();
    displayCart();
  });
}

