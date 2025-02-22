require('../../config/dotenv')();
require('../../config/sequelize');

const seedProduct = require('./ProductSeeder');
// const seedCart = require('./CartSeeder');
// const seedCartItem = require('./CartItemSeeder');


(async () => {
  try {
    // await seedCart();
    await seedProduct();
    // await seedCartItem();



  } catch(err) { console.log(err) }
})();

