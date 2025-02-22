const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },

});

User.associate = function(models) {
    User.hasMany(models.Product);
    // User.hasMany(models.MyOrders, { foreignKey: 'userId' }); // 'userId' é a chave estrangeira em MyOrders que se relaciona com User
};

module.exports = User;