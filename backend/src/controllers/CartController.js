
const Cart = require("../models/Cart");
const { Op } = require('sequelize');
const User = require('../models/User');


const index = async (req, res) => {
  try {
    const carts = await Cart.findAll();
    return res.status(200).json({ carts });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findByPk(id);
    if (!cart) return res.status(404).json({ message: "Carrinho não encontrado" });
    return res.status(200).json({ cart });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// const create = async (req, res) => {
//   try {
//     const { userId, email} = req.body;

//     if (!userId || !email) {
//       return res.status(400).json({ error: "O ID e o Email do usuário sao obrigatórios." });
//     } else {
//       console.log(userId + "USERID")
//       console.log(email + "EMAIL")
//     }


//     // Verifica se o usuário existe
//     const user = await User.findByPk(userId);
//     if (!user) {
//       return res.status(404).json({ error: "Usuário não encontrado." });
//     }

//     // Cria o carrinho associado ao usuário
//     const newCart = await Cart.create({ userId });

//     return res.status(201).json({ message: "Carrinho criado com sucesso", cart: newCart });
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// };

const create = async (req, res) => {
  try {
    const { userId, email } = req.body;
    
    console.log("Dados recebidos na requisição:", {
      body: req.body,
      userId: userId,
      email: email
    });

    if (!userId || !email) {
      console.log("Validação falhou - dados faltando:", { userId, email });
      return res.status(400).json({ error: "O ID e o Email do usuário são obrigatórios." });
    }

    // Verifica se o usuário existe
    const user = await User.findByPk(userId);
    console.log("Resultado da busca do usuário:", user ? "Usuário encontrado" : "Usuário não encontrado");
    
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // Verifica se já existe um carrinho para este usuário
    const existingCart = await Cart.findOne({ where: { userId } });
    if (existingCart) {
      return res.status(400).json({ error: "Usuário já possui um carrinho." });
    }

    // Cria o carrinho associado ao usuário
    const newCart = await Cart.create({ userId, email });
    console.log("Novo carrinho criado com sucesso:", newCart);

    return res.status(201).json({ message: "Carrinho criado com sucesso", cart: newCart });
  } catch (err) {
    console.error("Erro ao criar carrinho:", {
      message: err.message,
      stack: err.stack
    });
    return res.status(500).json({ 
      error: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};


const update = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Cart.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ message: "Carrinho não encontrado" });
    const updatedCart = await Cart.findByPk(id);
    return res.status(200).json({ cart: updatedCart });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Cart.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: "Carrinho não encontrado" });
    return res.status(200).json({ message: "Carrinho deletado com sucesso" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { index, show, create, update, destroy };
