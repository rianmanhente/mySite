export const api = axios.create({
    baseURL: 'http://localhost:3333', 
    timeout: 10000,
    headers: {
     "Content-Type": "application/json",
    }
})

// export const api = axios.create({
//     baseURL: 'http://localhost:3333', 
//     timeout: 10000,
//     withCredentials: true,  // Adicione esta linha
//     headers: {
//         "Content-Type": "application/json",
//     }
// });
