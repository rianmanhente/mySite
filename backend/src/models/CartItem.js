// models/CartItem.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart')

const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// CartItem.associate = function(models) {
//     Cart.belongsToMany(Product, { through: CartItem });
//     Product.belongsToMany(Cart, { through: CartItem });
// };

CartItem.associate = function(models) {
  CartItem.belongsTo(models.Cart, { foreignKey: 'cartId' });
  CartItem.belongsTo(models.Product, { foreignKey: 'productId' });
};


module.exports = CartItem;