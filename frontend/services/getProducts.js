import { api } from "../services/api.js"

export const getProducts = async() => {
    try {
        const res = await api.get("/product")
        const products = res.data.products
        return products
    }catch(error) {
        console.error("Erro na requisição:", error.response?.data || error.message);
        throw error
    }
}

getProducts();