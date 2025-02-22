import { api } from "../services/api.js"

export const createUser = async(userData) => {
    try {
        const response = await api.post("/user", userData);
        localStorage.setItem("User", JSON.stringify(response.data.user))
        console.log("Resposta Backend (Usuário):", response);

        if(response.data.message == "Usuário já cadastrado") {
            localStorage.setItem("user", JSON.stringify(response.data.user))
        }
        
        return response.data.user;

    
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw new Error("Falha ao criar usuário");
    }
}