import { api } from "../services/api.js"

export const createCart = async(userId, email) => {
    try {
        const userCart = { userId, email };

        const response = await api.post("/cart", userCart);

        localStorage.setItem("Cart", JSON.stringify(response.data.cart))

        console.log("Resposta Backend (Carrinho):", response);
        
        return response.data;
    } catch (error) {
        console.error("Erro ao criar carrinho:", error);
        throw new Error("Falha ao criar carrinho");
    }
}
