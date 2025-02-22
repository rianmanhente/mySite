const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.DB_CONNECTION === 'sqlite') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_HOST + process.env.DB_DATABASE, // Verifique o caminho do banco SQLite
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_DATABASE,  // Nome do banco de dados
    process.env.DB_USERNAME,  // Usuário do banco de dados
    process.env.DB_PASSWORD,  // Senha do banco de dados
    {
      host: process.env.DB_HOST, // Endereço do banco de dados
      port: process.env.DB_PORT, // Porta do banco de dados (se aplicável)
      dialect: process.env.DB_CONNECTION, // Dialeto (mysql, postgres, etc.)
      models: [__dirname + "/../models"], // Caminho para os modelos
    }
  );
}

module.exports = sequelize;

// Importação dos modelos
require('../models/User');
require('../models/Product');  // Se o nome do modelo é "Producto", deve ser esse mesmo
require('../models/Cart');
require('../models/CartItem');

// Associando os modelos
for (let mod in sequelize.models) {
  if (sequelize.models[mod].associate instanceof Function) {
    sequelize.models[mod].associate(sequelize.models);
  }
}

    