export default {
  // Add to cart
  addItemToCart(name, count) {
    const cart = [
      {
        name: "KSC-2010-5302",
        count: 1,
      },
      {
        name: "banana",
        count: 2,
      },
      {
        name: "KSC-2010-5307",
        count: 3,
      },
    ];

    if (name === "") {
      return 0;
    }

    for (let item in cart) {
      if (cart[item].name === name) {
        cart[item].count++;
        return cart[item].count;
      }

      cart.push({ name, count });
      return cart[item].count;
    }
  },

  removeItemFromCart(name) {
    const cart = [
      {
        name: "KSC-2010-5302",
        count: 1,
      },
      {
        name: "banana",
        count: 2,
      },
      {
        name: "KSC-2010-5307",
        count: 3,
      },
    ];

    for (let item in cart) {
      if (cart[item].name === name) {
        cart[item].count--;

        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }

        return cart[item].count;
      } else {
        return 0;
      }
    }
  },

  // Count cart
  totalCount() {
    const cart = [
      {
        name: "KSC-2010-5302",
        count: 1,
      },
      {
        name: "banana",
        count: 2,
      },
      {
        name: "KSC-2010-5307",
        count: 3,
      },
    ];

    let totalCount = 0;
    for (let item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  },

  sortProduct(dataProduct) {
    let dataTest = [];
    let second_index;

    for (let key in dataProduct) {
      dataTest.push(dataProduct[key]?.date_created);
    }

    let sortByAscending = dataTest.sort((dateA, dateB) => {
      return new Date(dateB).getFullYear() - new Date(dateA).getFullYear();
    });

    let formatArray = [];
    sortByAscending.forEach(element => {
      formatArray.push(new Date(element).getFullYear());
    });

    for (let first_index = 0; first_index < formatArray.length; first_index++) {
      second_index = first_index + 1;
      if (formatArray[second_index] > formatArray[first_index] ) {
        return false;
      }
    }
    return true;
  },
};
