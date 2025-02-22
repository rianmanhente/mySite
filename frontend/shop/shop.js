// import { api } from '../services/api.js'
import { addCartItemToCart } from '../services/addCartItemToCart.js'
import { getProducts } from '../services/getProducts.js'

getProducts()
    .then(products => addDataToHTML(products))

    const userData = localStorage.getItem("User");
    const cartData = localStorage.getItem("Cart");
    
    // if (!userData || !cartData) {
    //     console.error("Erro: Usuário ou carrinho não encontrado no localStorage!");
    // }
    
    // Convertendo de string JSON para objeto
    const User = JSON.parse(userData);
    const Cart = JSON.parse(cartData);
    
    const userId = User.id;
    const cartId = Cart.id;
    
    

const menuIcon = document.getElementById('menuIcon')
const segundaUl = document.querySelector('.segundaUl')
const primeiraUl = document.querySelector('.primeiraUl')


let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');


let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];

menuIcon.onclick = () => {
    segundaUl.classList.toggle('open')
    primeiraUl.classList.toggle('open')
    menuIcon.classList.toggle('bx-x')

}

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

    const addDataToHTML = (products) => {
    // remove datas default from HTML

        // add new datas
        if(products.length > 0) // if has data
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="../assets/${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Adicionar no Carrinho</button>`;
                listProductHTML.appendChild(newProduct);
            });
        }
    }
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        console.log(positionClick)
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
            console.log(id_product)

            const cartItem = {
                userId: userId,
                cartId: cartId,
                quantity: 1,
                productId: id_product,
            }

            event.preventDefault()
            addCartItemToCart(cartItem);
          
        }
    })

//estou mandando para o carrinho o id do proudto mas na vdd quando clico adcionar ao carrinho preciso fazer uma requisicao para o back para o cartItem

const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    // addCartToHTML();
    // addCartToMemory();
}
// const addCartToMemory = () => {
//     localStorage.setItem('cart', JSON.stringify(cart));
// }
// const addCartToHTML = () => {
//     listCartHTML.innerHTML = '';
//     let totalQuantity = 0;
//     if(cart.length > 0){
//         cart.forEach(item => {
//             totalQuantity = totalQuantity +  item.quantity;
//             let newItem = document.createElement('div');
//             newItem.classList.add('item');
//             newItem.dataset.id = item.product_id;

//             let positionProduct = products.findIndex((value) => value.id == item.product_id);
//             let info = products[positionProduct];
//             listCartHTML.appendChild(newItem);
//             newItem.innerHTML = `
//             <div class="image">
//                     <img src="../assets/${info.image}">
//                 </div>
//                 <div class="name">
//                 ${info.name}
//                 </div>
//                 <div class="totalPrice">$${info.price * item.quantity}</div>
//                 <div class="quantity">
//                     <span class="minus"><</span>
//                     <span>${item.quantity}</span>
//                     <span class="plus">></span>
//                 </div>
//             `;
//         })
//     } else {
//         listCartHTML.classList.add('cartEmpty')
//         listCartHTML.innerHTML = '<p>Your cart is empty.</p>';
//     }
//     iconCartSpan.innerText = totalQuantity;
// }

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

// const initApp = () => {
//     // get data product
//     fetch('products.json')
//     .then(response => response.json())
//     .then(data => {
//         products = data;
//         addDataToHTML();

//         // get data cart from memory
//         if(localStorage.getItem('cart')){
//             cart = JSON.parse(localStorage.getItem('cart'));
//             addCartToHTML();
//         }
//     })
// }
// console.log(products)
// initApp();

//ja sei fazer uma parte do banckend , é fazer esse json e colocar lá o link para fazer um get
//e pegar todos os produtos 

// a diferença é que nao vou fazer esse fetch de um json mas sim de um banco de dados (backend)

// const cartTest = localStorage.getItem('cart')
// console.log("test" + cartTest)




