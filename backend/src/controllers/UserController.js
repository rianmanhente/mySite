const User = require("../models/User");
const { Op } = require('sequelize');

const index = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User não encontrado" });
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
      const { email, name, token } = req.body;

      console.log('Dados recebidos:', req.body);

      if (!email || !name || !token) {
          return res.status(400).json({ error: "Campos obrigatórios faltando." });
      }

      // Verifica se o usuário já existe
      let user = await User.findOne({ where: { email } });

      if (user) {
          return res.status(200).json({ 
              message: "Usuário já cadastrado", 
              user: { id: user.id, email: user.email, name: user.name } 
          });
      }

      // Cria o usuário se não existir
      const newUser = await User.create({ email, name, token });
      console.log("Novo User criado com sucesso:", newUser)

      return res.status(201).json({ 
          message: "User cadastrado com sucesso", 
          user: { id: newUser.id, email: newUser.email, name: newUser.name } 
      });
  } catch (err) {
      console.error('Erro ao criar usuário:', err);
      return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

  

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await User.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ message: "User não encontrado" });
    const updatedUser = await User.findByPk(id);
    return res.status(200).json({ product: updatedUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await User.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: "User não encontrado" });
    return res.status(200).json({ message: "User deletado com sucesso" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { index, show, create, update, destroy };
