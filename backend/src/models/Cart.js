// const DataTypes = require("sequelize");
// const sequelize = require("../config/sequelize");

// const Cart = sequelize.define('Cart', {
//     userName: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     userEmail: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// });

// Cart.associate = function(models) {
//     Cart.belongsTo(models.User)
//     Cart.hasMany(models.Product)
//     // Cart.hasMany(models.CartItem)

// };


// module.exports = Cart;

const sequelize = require("../config/sequelize");
const DataTypes = require("sequelize");
const User = require('../models/User');

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users', // Nome da tabela de usuários
            key: 'id'
        },
        allowNull:false
        
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false
    }
});

// // Definir o relacionamento
// Cart.belongsTo(models.User, { foreignKey: 'userId' });
// User.hasOne(models.Cart, { foreignKey: 'userId' });

Cart.associate = function(models) {
    Cart.belongsTo(models.User, {foreignKey: 'userId'})
    Cart.hasMany(models.Product)
    User.hasOne(models.Cart, { foreignKey: 'userId' });
    // Cart.hasMany(models.CartItem)

};

module.exports = Cart;