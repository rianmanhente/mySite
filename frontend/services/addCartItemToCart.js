import { api } from "../services/api.js"

export const addCartItemToCart = async(cartItem) => {
    try {
        const res = await api.post("/items", cartItem)
        const cartItems = res.data.cartItems
        return cartItems
    } catch(error) {
        console.error("Erro na requisição:", error.response?.data || error.message);
    }
}

addCartItemToCart();