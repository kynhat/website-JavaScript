import getSearchList from "../js/api.js";
let dataCallToApi = await getSearchList();
let listProduct = dataCallToApi?.collection?.items ?? {};
const productsPagination = document.querySelector(".products__pagination");
const arrayMenuItem = [
  { id: 1, title: "newest" },
  { id: 2, title: "oldest" },
  { id: 3, title: "a-z" },
  { id: 4, title: "z-a" },
];

const listSortProduct = document.querySelector(".products__sort");
let _outputProduct = "";
const lk__search = document.querySelector(".header__label");
const productList = document.querySelector(".products__list");
let rows = 10;

for (let i in arrayMenuItem) {
  let title = arrayMenuItem[i]?.title ?? "";
  _outputProduct +=
    "<option class='product__item' value=" + title + ">" + title + "</option>";
}

listSortProduct.innerHTML = _outputProduct;

if (Object.keys(listProduct).length === 0) {
  productsPagination.style.display = "none";
}

productList.addEventListener("click", function (e) {
  e.preventDefault();
  let pagram = e.target.getAttribute("pagram");
  let start = rows * pagram;
  let end = start + rows;
  let paginatedItems = listProduct.slice(start, end);
  let checkPagination = e.target.className.includes("is-show");

  if (checkPagination) {
    e.target.classList.remove("is-show");
  } else {
    if (e.target.className === "products__item") {
      e.target.classList.add("is-show");
    }
  }

  if (paginatedItems.length > 0) {
    setTimeout(() => {
      getProductList(paginatedItems);
    }, 5);
  }
});

function getProductList(arrayProductItem) {
  let outputProduct = "";

  for (let i in arrayProductItem) {
    let image = arrayProductItem[i]?.links[0]?.href ?? "";
    let title = arrayProductItem[i]?.data?.[0]?.title ?? "";
    let price = 0;
    let discount = 10;
    let nasa_id = arrayProductItem[i]?.data?.[0]?.nasa_id ?? "";
    let splitId = nasa_id.split("_");
    let id = splitId[0];
    let htmlloadingImage = "";

    if (image === "") {
      htmlloadingImage += '<div class="loading"></div>';
    } else {
      htmlloadingImage += '<div class="loading"></div>';

      setTimeout(() => {
        let myobj = document.querySelector(".loading");
        let hideImage = document.querySelector(".hide-image");
        hideImage.classList.remove("hide-image");
        myobj.remove();
      }, 500);

      htmlloadingImage +=
        '<img class="products__image-item hide-image" alt="" src="' +
        image +
        '">';
    }

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
      htmlloadingImage +
      "<div class='products__image-cover'></div>" +
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

async function searchProduct(pagram) {
  pagram.toUpperCase();
  let dataSearch = await getSearchList(pagram.toUpperCase());
  let listDataSearchProduct = dataSearch?.collection?.items ?? {};
  getProductList(listDataSearchProduct.slice(10, 20));
}

function reverseArray(input) {
  let newArray = new Array();
  for (let i = input.length - 1; i >= 0; i--) {
    newArray.push(input[i]);
  }

  return newArray;
}

function sortProduct(dataProduct) {
  let listDataSort = "";
  let data = "";
  const d = new Date();
  let year = d.getFullYear();
  //tăng dần
  let sortByAscending = dataProduct.sort((dateA, dateB) => {
    return (
      new Date(dateB?.data?.[0]?.date_created).getFullYear() -
      new Date(dateA?.data?.[0]?.date_created).getFullYear()
    );
  });

  //giảm dần
  let sortByDescending = reverseArray(sortByAscending);

  listSortProduct.addEventListener("click", async function (event) {
    switch (event.target.value) {
      case "newest":
        data = await getSearchList(dataProduct, year);
        listDataSort = data?.collection?.items ?? {};
        break;

      case "oldest":
        data = await getSearchList(dataProduct, year - 10);
        listDataSort = data?.collection?.items ?? {};
        break;

      case "a-z":
        listDataSort = sortByAscending;
        break;

      case "z-a":
        listDataSort = sortByDescending;
        break;

      default:
        listDataSort = data?.collection?.items ?? {};
    }

    getProductList(listDataSort);
  });
}

lk__search.addEventListener("click", event => {
  let title = document.getElementById("searchBox").value;
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  searchProduct(title.toLowerCase());

  favorites.forEach(function (favorite) {
    setTimeout(() => {
      if (document.getElementById(favorite) != null) {
        document.getElementById(favorite).classList.add("like");
      }
    }, 2);
  });
});

listSortProduct.addEventListener("click", event => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favorites.forEach(function (favorite) {
    setTimeout(() => {
      if (document.getElementById(favorite) != null) {
        document.getElementById(favorite).classList.add("like");
      }
    }, 500);
  });
});

sortProduct(listProduct.slice(10, 20));
getProductList(listProduct.slice(10, 20));
