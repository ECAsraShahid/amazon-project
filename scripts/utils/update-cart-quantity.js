import {cart} from '../../data/cart.js';

export let totalCartQuantity;

export function updateCartQuantity () {
  totalCartQuantity = 0;
  cart.forEach((item) => {
    totalCartQuantity += item.quantity;
  })
  return totalCartQuantity;
}
