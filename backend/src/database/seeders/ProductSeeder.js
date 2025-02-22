const Product = require("../../models/Product");

const seedProduct = async function () {
  try {
    await Product.sync({ force: true });

    const products = [];

    const productsData = [
      {
        name: "Camisa cheia de marra",
        price: 129.99,
        id: 1,
        quantity: 10,
        // cartItem: 1,
        category: "T shirt", 
        image: "camisa.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Camisa Pensando um monte",
        price: 119.99,
        id: 2,
        quantity: 10,
        category: "T shirt",
        image: "camisa.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Camisa zero a zero",
        price: 139.99,
        id: 3,
        quantity: 10,
        category: "T shirt",
        image: "camisa.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (let i = 0; i < productsData.length; i++) {
      const product = await Product.create(productsData[i]);
      products.push(product);
    }

    console.log("Products created:", products);
  } catch (err) {
    console.log(err);
  }
};

module.exports = seedProduct;