import {cart} from '../../data/cart.js';



export function updateCartQuantity () {
  let totalCartQuantity = 0;
  cart.forEach((item) => {
    totalCartQuantity += item.quantity;
  })
  return totalCartQuantity;
}
