const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category:{
        type: DataTypes.STRING,
        allowNull:false
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0, // Defina um valor padrão para a quantidade
    },
    image:{
         type: DataTypes.STRING,
         allowNull:false
    },  
});

Product.associate = function(models) {
    Product.belongsTo(models.User);
    Product.belongsTo(models.Cart);
    // Producto.belongsTo(models.CartItem);
};


module.exports = Product;