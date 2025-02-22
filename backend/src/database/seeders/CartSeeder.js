const Cart = require("../../models/Cart");

const seedCart = async function () {
  try {
    await Cart.sync({ force: true });

    const cart = [];
    
    Cart.create(({
        name: "'s Cart",
        id: 1,
    }))

    cart.push(Cart)
    console.log("Cart created:", cart);
  } catch (err) {
    console.log(err);
  }
};

module.exports = seedCart;