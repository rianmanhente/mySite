import { api } from "../services/api.js"

export const getCartItems = async() => {
    try {
        const res = await api.get("/items")
        console.log(res.data)

    } catch(error) {
        console.error("Erro na requisição:", error.response?.data || error.message);
    }
}

getCartItems();
