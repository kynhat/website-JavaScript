import shoppingCart from "../cart/cart.js";
const expect = chai.expect;

describe("function addItemToCart()", function () {
  const result1 = shoppingCart.addItemToCart("KSC-2010-5302", 1);
  const result2 = shoppingCart.addItemToCart("KSC-2010-00999", 1);
  const result3 = shoppingCart.addItemToCart("");

  // add cart
  it("if adding cart has count equal to = 2 then add item and count =  2 is true", function () {
    expect(result1).to.equal(2);
  });

  it("if adding cart has count equal to = 1 then add new item and count =  1 is true", function () {
    expect(result2).to.equal(1);
  });

  it("if adding cart has name equal to= '' then return 0 is false", function () {
    expect(result3).to.equal(0);
  });
});

describe("function removeItemFromCart()", function () {
  const result1 = shoppingCart.removeItemFromCart("KSC-2010-5302");
  const result2 = shoppingCart.removeItemFromCart("KSC-2010-00999");

  // remove cart
  it("delete item and return 2 is true", function () {
    expect(result1).to.equal(2);
  });

  it("delete item and return 0 is false", function () {
    expect(result2).to.equal(0);
  });
});

describe("function totalCount()", function () {
  const result1 = shoppingCart.totalCount();

  it("if totalCount is equal to 6 is true", function () {
    expect(result1).to.equal(6);
  });
});

describe("function sortProduct()", function () {
  let item = [
    {
          date_created: "2009-10-16T00:00:00Z",
    },

    {
          date_created: "2008-10-16T00:00:00Z",
    },

    {
          date_created: "2011-10-16T00:01:11Z",
    },
  ];


  it("should be true if already sorted ", function () {
    const result1 = shoppingCart.sortProduct(item);
    expect(result1).to.be.true;
  });
});