// controllers/CartItemController.js
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

const Cart = require("../models/Cart");
const { Op, where } = require('sequelize');
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

// const updateQuantityItemsInCart = async (req, res) => {
//     try {
//         const { quantity, userId, cartId} = req.body;
//         const { productId } = req.params;

//         let cartItem = await CartItem.findOne({
//             where: { productId }
//         });

//         if(!cartItem) {
//             return res.status(404).json({erro: 'Item nao econtradro'});
//         }

//         if (quantity <= 0) {
//             await cartItem.destroy();
//             return res.json({ message: 'Item removido' });
//         }

//     } catch(erro) {

//     }
// }


const updateCartItemsQuantity = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity, cartId, userId } = req.body;

        if(!userId || !cartId || !quantity) {
            return res.status(403).json({err : "Sem permissao para modificar cart"})
        }
        // const { productId, quantity, userId, cartId } = req.body;

        const cartItem = await CartItem.findOne({
            where: { productId, cartId }
        });

        if (!cartItem) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }

        if(cartItem) {
            cartItem.quantity += quantity;
            if(cartItem.quantity == 0) {
                await cartItem.destroy();
                return res.json({ message: 'Item removido' });
            }
            await cartItem.save();
        } else {
            cartItem.quantity = quantity;
            await cartItem.save();
    
            return res.json(cartItem);
        }

        // if (quantity == 0) {
        //     await cartItem.destroy();
        //     return res.json({ message: 'Item removido' });
        // }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

const getItemsByCartId = async (req, res) => {
    try {
        const { id : cartId } = req.params; // Pegando o cartId da URL

        if (!cartId || isNaN(cartId)) {
            return res.status(400).json({ error: "ID do carrinho inválido" });
        }

        const cartExists = await Cart.findByPk(cartId);
        if(!cartExists) {
            return res.status(404).json({error : "Carrinho nao encontrado ou nao existe"})
        }

        const items = await CartItem.findAll({
            where: { cartId }
        });

        return res.status(200).json({ items });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar itens do carrinho", details: error.message });
    }
};






module.exports = { create, list, updateCartItemsQuantity, getItemsByCartId };