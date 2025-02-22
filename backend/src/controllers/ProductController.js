const Producto = require("../models/Product");
const { Op } = require('sequelize');

const index = async (req, res) => {
  try {
    const products = await Producto.findAll();
    return res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Producto.findByPk(id);
    if (!product) return res.status(404).json({ message: "Produto não encontrado" });
    return res.status(200).json({ product });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const newProduct = await Producto.create(req.body);
    return res.status(201).json({ message: "Produto cadastrado com sucesso", product: newProduct });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Producto.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ message: "Produto não encontrado" });
    const updatedProduct = await Producto.findByPk(id);
    return res.status(200).json({ product: updatedProduct });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Producto.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: "Produto não encontrado" });
    return res.status(200).json({ message: "Produto deletado com sucesso" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { index, show, create, update, destroy };
