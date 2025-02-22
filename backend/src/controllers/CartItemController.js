// controllers/CartItemController.js
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

const Cart = require("../models/Cart");
const { Op } = require('sequelize');
const User = require('../models/User');

const create = async (req, res) => {
    try {
        const { productId, quantity, userId, cartId } = req.body;

        if (!userId || !productId || !quantity || !cartId) {
            return res.status(400).json({ error: `Faltam infos: ${userId}, ${cartId}, ${productId}, ${quantity}`});
        }


        // Verifica se já existe este item no carrinho
        let cartItem = await CartItem.findOne({
            where: { userId, productId }
        });

        if (cartItem) {
            // Atualiza quantidade se já existe
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // Cria novo item se não existe
            cartItem = await CartItem.create({
                userId,
                productId,
                quantity,
                cartId
            });
        }

        return res.status(201).json(cartItem);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

const list = async (req, res) => {
    try {
        const { id } = req.params;
        
        const items = await CartItem.findAll({
            where: { id },
        });

        return res.json(items);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

const index = async (req, res) => {
    try {
        const items = await CartItem.findAll();
        return res.status(200).res.json({ items })
    } catch(error) {
        console.error(error)
        return res.status(500).json({ error: error.message})
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const cartId = req.user.cartId;

        const cartItem = await CartItem.findOne({
            where: { id, cartId }
        });

        if (!cartItem) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }

        if (quantity <= 0) {
            await cartItem.destroy();
            return res.json({ message: 'Item removido' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        return res.json(cartItem);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { create, list, update, index };