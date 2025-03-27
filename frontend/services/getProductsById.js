import { api } from "./api.js";

export const getProductsById = async(productId) => {
    try {
        const res = await api.get(`/product/${productId}`)
        console.log("Resposta getProductsById:", res.data);
        return res.data;
    } catch(error) {
        console.error(`Erro ao obter o produto com ID ${productId}:`, error.response?.data || error.message);
    }
}
