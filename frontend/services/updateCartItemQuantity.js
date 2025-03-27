import { api } from "./api.js";

export const updateCartItemsQuantity = async (newQuantity) => {
    try {
        const res = await api.put(`/itemsUpdate/${newQuantity.productId}`, newQuantity);
        const newQuantityInCart = res.data
    } catch(err) {
       return console.error("Erro na requisição:", err.response?.data || err.message);
    }
}