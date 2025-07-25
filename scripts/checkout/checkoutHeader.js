import { updateCartQuantity} from '../utils/update-cart-quantity.js';

export function renderCheckoutHeader(){
  let checkOutHeaderHTML = '';
  let totalQuantity = 0; 
  totalQuantity = updateCartQuantity();
  checkOutHeaderHTML += `
                        <div class="header-content">
                          <div class="checkout-header-left-section">
                            <a href="amazon.html">
                              <img class="amazon-logo" src="images/amazon-logo.png">
                              <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
                            </a>
                          </div>

                          <div class="checkout-header-middle-section js-checkout-header-middle-section">
                            Checkout (<a class="return-to-home-link" href="amazon.html">${totalQuantity} items</a>)
                          </div>

                          <div class="checkout-header-right-section">
                            <img src="images/icons/checkout-lock-icon.png">
                          </div>
                        </div>`;
 
  document.querySelector('.js-checkout-header').innerHTML = checkOutHeaderHTML;
  
}