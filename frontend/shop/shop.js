// import { api } from '../services/api.js'
import { addCartItemToCart } from '../services/addCartItemToCart.js'
import { getProducts } from '../services/getProducts.js'
import { getCartItems } from '../services/getCartItems.js';
import { updateCartItemsQuantity } from '../services/updateCartItemQuantity.js';

const userData = localStorage.getItem("User");
const cartData = localStorage.getItem("Cart");

// Convertendo de string JSON para objeto
const User = JSON.parse(userData);
const Cart = JSON.parse(cartData);

const userId = User.id;
const cartId = Cart.id;

getProducts()
    .then(products => addDataProducts(products))

// if(totalQuantity < 0) {
//     const totalQuantityElement = document.getElementById("totalQuantity");
//     totalQuantityElement.textContent = "0"
// }

//funcao que mostra os itens que estao dentro do carrinho , no shopping cart no front 
getCartItems(cartId)
  .then(response => {
    const cartItems = response.cartItemsWithProducts;
    const totalQuantity = response.totalQuantity;
    const totalValueCart = response.totalValueCart;
    
    // Atualizar o elemento de quantidade total
    const totalQuantityElement = document.getElementById("totalQuantity");
    totalQuantityElement.textContent = totalQuantity;
    
    // Passar os itens do carrinho para a função addDataToCarts
    return addDataToCarts(cartItems, totalValueCart);
  })

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


{/* <div class="cartTab">
<h1>Shopping Cart</h1>
<div class="listCart">
    <div class="itemCartTab">
        <div class="image">
            <img src="../assets/camisa.jpeg" alt="">
        </div>
        <div class="name">
            NAME 
        </div>
        <div class="totalPrice">
            $200
        </div>
        <div class="quantity">
            <span class="minus">-</span>
            <span class="plus">+</span>
        </div>
    </div>
</div>
<div class="btn">
    <button class="close">FECHAR</button>
    <button class="checkOut">FiNALIZAR</button>
</div>
</div> */}

// carttab.apennchild(newCartItem)

    const addDataToCarts = (cartItems, totalValueCart) => {
        if(cartItems.length > 0)
        {
            cartItems.forEach(cartItem => {
                let newCartItem = document.createElement('div')
                newCartItem.classList.add('itemCartTab')
                newCartItem.innerHTML = 
                `  
                <div id="${cartItem.productInfo.product.id}" class="cartProductsContainer">
                     <div class="nameAndPrice">
                        <p class="name">${cartItem.productInfo.product.name}</p>
                        <p class="price">${cartItem.productInfo.product.price}</p>
                     </div>
                <img class="image" src="../assets/${cartItem.productInfo.product.image}" alt="">
                </div>
                <div class="quantity">
                    <span data-id="${cartItem.productInfo.product.id}" class="minus">-</span>
                    <span data-id="${cartItem.productInfo.product.id}"  class="plus">+</span>
                </div> 
                        <p class="price">${totalValueCart}</p>

                `
                listCartHTML.appendChild(newCartItem)
            
                // proxima parada fazer os buttoes de adcionar produto e retirar plus e minus , sendo que tem q ser um update na quatidade ?
                // fzer validacao para se ja tiver produto no carrinho e o user clicar adionar no cart , el esaber q ta no cart e nao fazer requ com o produto todo e so um update inves tmb
            })
            
            addEventListenersToButtons();
        }
    }

    const addEventListenersToButtons = () => {
        document.querySelectorAll(".plus").forEach(button => {
            button.addEventListener("click", (event) => {
                let productId = event.target.getAttribute("data-id");
    
                let newQuantity = {
                    userId: userId,
                    cartId: cartId,
                    quantity: 1,
                    productId: productId
                };
    
                updateCartItemsQuantity(newQuantity);
                //fazer nova funcao para fazer somento Update de quantity .
            });
        });
    
        document.querySelectorAll(".minus").forEach(button => {
            button.addEventListener("click", (event) => {
                let productId = event.target.getAttribute("data-id");
    
                let newQuantity = {
                    userId: userId,
                    cartId: cartId,
                    quantity: -1, // Reduz a quantidade
                    productId: productId
                };
    
                updateCartItemsQuantity(newQuantity);
                //fazer nova funcao para fazer somento Update de quantity .

            });
        });
    };

    const addDataProducts = (products) => {
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
            // addToCart(id_product);
            console.log(id_product)

            const cartItem = {
                userId: userId,
                cartId: cartId,
                quantity: 1,
                productId: id_product,
            }

            // event.preventDefault()
            addCartItemToCart(cartItem);
          
        }
    })


// IMPLEMENTAR O addCartItemToCart no button de + e - dentro do cart para fazer a requisicao dnv para o back

//estou mandando para o carrinho o id do proudto mas na vdd quando clico adcionar ao carrinho preciso fazer uma requisicao para o back para o cartItem

// const addToCart = (cartItem) => {
//     let positionThisProductInCart = itemsCart.findIndex((value) => value.product_id == product_id);
//     if(cart.length <= 0){
//         cart = [{
//             product_id: product_id,
//             quantity: 1
//         }];
//     }else if(positionThisProductInCart < 0){
//         itemsCart.push({
//             product_id: product_id,
//             quantity: 1
//         });
//     }else{
//         itemsCart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
//     }
//     // addCartToHTML();
//     // addCartToMemory();
// }
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

// listCartHTML.addEventListener('click', (event) => {
//     let positionClick = event.target;
//     if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
//         let product_id = positionClick.parentElement.parentElement.dataset.id;
//         let type = 'minus';
//         if(positionClick.classList.contains('plus')){
//             type = 'plus';
//         }
//         changeQuantityCart(product_id, type);
//     }
// })
// const changeQuantityCart = (product_id, type) => {
//     let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
//     if(positionItemInCart >= 0){
//         let info = cart[positionItemInCart];
//         switch (type) {
//             case 'plus':
//                 cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
//                 break;
        
//             default:
//                 let changeQuantity = cart[positionItemInCart].quantity - 1;
//                 if (changeQuantity > 0) {
//                     cart[positionItemInCart].quantity = changeQuantity;
//                 }else{
//                     cart.splice(positionItemInCart, 1);
//                 }
//                 break;
//         }
//     }
//     addCartToHTML();
//     addCartToMemory();
// }

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




