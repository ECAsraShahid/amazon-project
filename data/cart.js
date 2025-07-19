import  { updateCartQuantity} from '../scripts/utils/update-cart-quantity.js';

//localStorage.removeItem('cart');
export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity : 2
 },
 {
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity : 1
  }];


function saveToStorage(){
  localStorage.setItem('cart' , JSON.stringify(cart));
}

export function addToCart(productId){

  let matchingItem;
  const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

  cart.forEach((element) => {
    if( productId === element.productId)
      matchingItem = element;   
  });

  if(matchingItem){
    matchingItem.quantity += quantity;
    }    
  else{
    cart.push({
      productId,
      quantity 
    });
  }

  saveToStorage();

 }

export function removeProductFromCart (productId) {

  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();

 }

export function saveQuantity(productId){

    document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');

    document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing');

    const newQuantity = Number(document.querySelector(`.quantity-input-${productId}`).value);

    if(newQuantity >=0 && newQuantity <1000){
      const quantityLabel = updateQuantity(productId , newQuantity);
      document.querySelector(`.quantity-label-${productId}`).innerHTML = quantityLabel;
    }

}

export function updateLinkQuantity(productId){

  document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');   
 
}

export function inputQuantity(productId) {

  console.log(productId);
  document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing');

}


export function updateQuantity (productId , newQuantity){

  cart.forEach((item) => {
    if(productId === item.productId){
      item.quantity = newQuantity;
    };
  });

  saveToStorage();

  return newQuantity;

 }