import { api } from "../services/api.js"
import { getProductsById } from "./getProductsById.js"

export const getCartItems = async(cartId) => {
    try {
        const res = await api.get(`/itemsUserCart/${cartId}`)
        const items = res.data.items

        if (Array.isArray(items)) {
            // Para cada item do carrinho, obtenha o produto correspondente
            const cartItemsWithProducts = [];
            let totalQuantity = 0;
            let totalValueCart = 0;

            for (const item of items) {
                totalQuantity += item.quantity;
                // totalValueCart += item.price
     
                console.log(`${item.productId} id do produto`);
                console.log(`${item.quantity} quantidade do produto`);

                // Faz a requisição para obter as informações do produto
                const productInfo = await getProductsById(item.productId);
                
                if (productInfo) {
                    // Exibe informações do produto
                    console.log(`Produto: ${productInfo.product.name}`);
                    console.log(`Preço: ${productInfo.product.price}`);

                    totalValueCart += item.quantity * productInfo.product.price;
                    
                    // Adiciona item com informações do produto ao array
                    cartItemsWithProducts.push({
                        ...item,
                        productInfo: productInfo
                    });
                }
            }


            // return {cartItemsWithProducts, totalQuantity}; // Retorna o array com os itens e produtos
            return {cartItemsWithProducts, totalQuantity, totalValueCart};
        } else {
            console.error("A resposta não contém uma lista de itens.");
            return [];
        }
    } catch(error) { // Note que havia um erro na definição da variável (erro vs error)
        console.error("Erro na requisição:", error.response?.data || error.message);
        return [];
    }
}

// Exemplo de uso
getCartItems()