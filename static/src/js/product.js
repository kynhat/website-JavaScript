import getSearchList from "../js/api.js";
let data = await getSearchList();
let listProduct = data?.collection?.items ?? {};
const productsPagination = document.querySelector(".products__pagination");
const arrayMenuItem = [
  { id: 1, title: "newest" },
  { id: 2, title: "oldest" },
  { id: 3, title: "a-z" },
  { id: 4, title: "z-a" },
];
const listSortProduct = document.querySelector(".products__sort");
let _outputProduct = "";
for (let i in arrayMenuItem) {
  let title = arrayMenuItem[i]?.title ?? "";
  _outputProduct +=
    "<option class='product__item' value=" + title + ">" + title + "</option>";
}

listSortProduct.innerHTML = _outputProduct;

if (Object.keys(listProduct).length === 0) {
  productsPagination.style.display = "none";
}

(function () {
  const lk__search = document.querySelector(".header__label");
  const productList = document.querySelector(".products__list");
  let rows = 10;
  let page_count = Math.ceil(listProduct.length / rows);

  function SetupPagination() {
    // page_count = 100/5
    let outputPagination = "";
    productsPagination.style.display = "block";

    for (let i = 1; i < page_count; i++) {
      outputPagination +=
        "<li class='products__item' pagram=" + i + ">" + i + "</li>";
    }

    productList.innerHTML = outputPagination;
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
      let id = arrayProductItem[i]?.data?.[0]?.nasa_id ?? "";
      let htmlloadingImage = "";
      let htmlImage = "";

      if (image === "") {
        htmlloadingImage += '<div class="loading"></div>';
      } else {
        htmlloadingImage += '<div class="loading"></div>';
        // htmlloadingImage +=
        // '<img class="products__image-item" alt="" src="' + image + '">';
        setTimeout(() => {
          let myobj = document.querySelector(".loading");
          let hideImage = document.querySelector(".hide-image");
          hideImage.classList.remove("hide-image");
          myobj.remove();
          // let listProductImage = document.querySelectorAll(".products__image");

          // for (let i = 0; i < listProductImage.length; i++) {

          // console.log(listProductImage[i])
          // console.log(htmlImage)
          // listProductImage[i].innerHTML = htmlImage;
          // }
          // htmlloadingImage = htmlImage;
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
    let outputProduct = "";

    for (let i in listDataSearchProduct) {
      let image = listDataSearchProduct[i]?.links[0]?.href ?? "";
      let title = listDataSearchProduct[i]?.data?.[0]?.title ?? "";
      let price = 0;
      let discount = 10;
      let id = listDataSearchProduct[i]?.data?.[0]?.nasa_id ?? "";

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
        "' id=" +
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

  async function sortProduct(pagram, listProduct) {
    let lk_sort = document.querySelector(".products__sort");
    let listDataSort = '';
    const d = new Date();
    let year = d.getFullYear();

    lk_sort.addEventListener("click", async function (event) {
      // console.log(event.target.value)

      switch (event.target.value) {
        case "newest":
          data = await getSearchList(listProduct, year);
          listDataSort = data?.collection?.items ?? {};
          break;

        case "oldest":
          data = await getSearchList(listProduct, year - 10);
          listDataSort = data?.collection?.items ?? {};
          break;

          case "a-z":
          data = await getSearchList(listProduct, year - 10);
          listDataSort = data?.collection?.items ?? {};
          break;

          case "z-a":
          data = await getSearchList(listProduct, year - 10);
          listDataSort = data?.collection?.items ?? {};
          break;

        default:
        // code block
      }

      let outputProduct = "";
      for (let i in listDataSort) {
        console.log(i)
        let image = listDataSort[i]?.links[0]?.href ?? "";
        let title = listDataSort[i]?.data?.[0]?.title ?? "";
        let price = 0;
        let discount = 10;
        let id = listDataSort[i]?.data?.[0]?.nasa_id ?? "";
  
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
          "' id=" +
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
    });


  }

  sortProduct();
  if (document.getElementById("searchBox").value.length === 0) {
    // getProductList();
  }

  lk__search.addEventListener("click", event => {
    let title = document.getElementById("searchBox").value;
    searchProduct(title.toLowerCase());

    if (document.getElementById("searchBox").value.length == 0) {
      // getProductList();
    }
  });

  var init = () => {
    // SetupPagination();
    let firstPage = listProduct.slice(10, 20);
    getProductList(firstPage);
    // document.querySelector(".products__item").classList.add("is-show");
  };

  // giống như ham main()
  window.onload = function () {
    init();
  };
})();
