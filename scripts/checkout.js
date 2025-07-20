import {products} from '../data/products.js';
import {convertCurrency} from './utils/money.js';
import * as cartModule from '../data/cart.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import { updateCartQuantity} from './utils/update-cart-quantity.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


let orderSummaryHTML = '';

cartModule.cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingItem;

  products.forEach((product) => {
    if(product.id === productId){
      matchingItem = product;
    }
  });

  orderSummaryHTML += `
  <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingItem.image}">

      <div class="cart-item-details">
        <div class="product-name">
        ${matchingItem.name}
        </div>
        <div class="product-price">
          $${convertCurrency(matchingItem.priceCents )}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-quantity-link" data-matching-item-id = "${matchingItem.id}">
            Update
          </span>
          <input class="quantity-input quantity-input-${matchingItem.id}" data-matching-item-id = "${matchingItem.id}">
          <span class="save-quantity-link link-primary js-save-quantity-link" data-matching-item-id = "${matchingItem.id}" tabindex="0" 
  role="button">
          Save
          </span>
          <span class="delete-quantity-link link-primary js-delete-link"
          data-matching-item-id = "${matchingItem.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
          ${deliveryOptionsHTML(matchingItem , cartItem)}
        </div>
      </div>
    </div>
  </div>
  `;
});

document.querySelector('.js-order-summary').innerHTML = orderSummaryHTML;

function deliveryOptionsHTML (matchingItem , cartItem) {
  let html = '';
  
  deliveryOptions.forEach((deliveryOption) => {

    const todayDate = dayjs();
    const deliveryDate = todayDate.add(deliveryOption.deliveryDays , 'days');
    const dateString = deliveryDate.format('dddd, MMMM DD');
    const deliveryCharge = deliveryOption.priceCents === 0 ? 'FREE' : `$${convertCurrency(deliveryOption.priceCents)} - ` ;
    const isCChecked = deliveryOption.id === cartItem.deliveryOptionId;

    //console.log(deli);


    html += ` <div class="delivery-option">
                <input type="radio" ${isCChecked ? 'checked' : ''}
                  class="delivery-option-input"
                  name="delivery-option-${matchingItem.id}">
                <div>
                  <div class="delivery-option-date">
                    ${dateString}
                  </div>
                  <div class="delivery-option-price">
                    ${deliveryCharge} Shipping
                  </div>
                </div>
              </div>` ; 
  });

  return html;

}

document.querySelectorAll('.js-delete-link').forEach((link) => {

  link.addEventListener('click' , () => {
    const productId = link.dataset.matchingItemId;

    cartModule.removeProductFromCart(productId);

    const resultantQuantity = updateCartQuantity();  
    document.querySelector('.js-checkout-header-middle-section').innerHTML = `<a class="return-to-home-link" href="amazon.html"> ${resultantQuantity} items</a>`;

    document.querySelector(`.js-cart-item-container-${productId}`).remove();
  })
  
});
      

const resultantQuantity = updateCartQuantity();
document.querySelector('.js-checkout-header-middle-section').innerHTML = `<a class="return-to-home-link" href="amazon.html"> ${resultantQuantity} items</a>`;

    
document.querySelectorAll('.js-update-quantity-link').forEach((updatelink) => {

  updatelink.addEventListener('click' , () => {

    const productId = updatelink.dataset.matchingItemId;
    cartModule.updateLinkQuantity(productId);

  });

});


document.querySelectorAll('.quantity-input').forEach((inputlink) => {

  inputlink.addEventListener('keydown' , () => {

    const productId = inputlink.dataset.matchingItemId;
    cartModule.inputQuantity(productId);

  });

});


document.querySelectorAll('.js-save-quantity-link').forEach((savelink) => {
  
  savelink.addEventListener('click' , () => {

    const productId = savelink.dataset.matchingItemId;
    cartModule.saveQuantity(productId);

    const resultantQuantity = updateCartQuantity();

    console.log(resultantQuantity);

    document.querySelector('.js-checkout-header-middle-section').innerHTML = `<a class="return-to-home-link" href="amazon.html"> ${resultantQuantity} items</a>`;

  });

  //I will try Later 
  
  /*savelink.addEventListener('keydown' , (event) => {

    if(event.key === 'Enter'){

      const productId = savelink.dataset.matchingItemId;
      cartModule.saveQuantity(productId);

      const resultantQuantity = updateCartQuantity();

      console.log(resultantQuantity);

      document.querySelector('.js-checkout-header-middle-section').innerHTML = `<a class="return-to-home-link" href="amazon.html"> ${resultantQuantity} items</a>`;

    }

  });*/

});

/*const todayDate = dayjs();
const deliveryDate = todayDate.format('dddd, MMMM DD');
console.log(deliveryDate);*/



