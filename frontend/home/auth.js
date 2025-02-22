import { api } from "../services/api.js";

async function responseGoogle(response) {
    try {
        // Decodificar o token JWT
        const responsePayload = JSON.parse(atob(response.credential.split('.')[1]));

        const userData = {
            name: responsePayload.name,
            email: responsePayload.email,
            token: response.credential
        };

        // Atualizar UI imediatamente para feedback visual
        // updateUserInterface(userData.name, userData.email, responsePayload.picture);

        // fazer um get ? para saber se ja ta cadastrado ? mas meu backend ja diz se foi ou nao foi cadastrado
        // preciso do localstorage novamente , ele ser setado novamente se o user ja tive sido cadastrado 

        // Criar usuário e carrinho
        const user = await createUser(userData);
        if (user) {
            const cart = await createCart(user.id, userData.email);
            if (cart) {
                console.log("Usuário e carrinho criados com sucesso!");
                return { user, cart };
            }
        }
    } catch (error) {
        handleError(error);
    }
}

async function createUser(userData) {
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

async function createCart(userId, email) {
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

function updateUserInterface(name, email, profilePic) {
    const userInfo = document.getElementById("user-info");
    const userName = document.getElementById("user-name");
    const userEmail = document.getElementById("user-email");
    const profilePicElement = document.getElementById("profile-pic");

    if (userInfo && userName && userEmail && profilePicElement) {
        userInfo.style.display = "block";
        userName.textContent = `Nome: ${name}`;
        userEmail.textContent = `Email: ${email}`;
        profilePicElement.src = profilePic;
    }
}

function handleError(error) {
    console.error("Erro durante o processo de autenticação:", error);
    // Aqui você pode adicionar uma notificação visual para o usuário
    alert("Ocorreu um erro durante o login. Por favor, tente novamente.");
}

// Inicialização do Google Sign-In
window.onload = function () {
    if (typeof google !== 'undefined' && google.accounts) {
        google.accounts.id.initialize({
            client_id: "531187287976-tgp0osjhvhcg14dm1snpgmpbf1f0gv0g.apps.googleusercontent.com",
            callback: responseGoogle
        });

        const signInButton = document.querySelector(".g_id_signin");
        if (signInButton) {
            google.accounts.id.renderButton(signInButton, {
                theme: "outline",
                size: "large"
            });
            
            google.accounts.id.prompt();
        }
    } else {
        console.error("Google API não carregada corretamente");
    }
};