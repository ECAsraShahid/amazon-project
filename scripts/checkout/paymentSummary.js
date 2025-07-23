import * as cartModule from '../../data/cart.js';
import {getProducts} from '../../data/products.js';
import {convertCurrency} from '../utils/money.js';
import { getDeliveryOptions } from '../../data/deliveryOptions.js';

export function renderPaymentSummary(){

    let productsPriceCents = 0;
    let productsShippingCents = 0;
    let totalBeforeTaxCents = 0;
    let totalTaxCents = 0;
    let totalOrder = 0; 
    let paymentSummaryHTML = '';
    let totalQuantity = 0;

    cartModule.cart.forEach((item) => {

      totalQuantity += item.quantity;
      const productId = item.productId;
      const matchingItem = getProducts(productId);

      const deliveryOptionId = item.deliveryOptionId;
      const deliveryOption = getDeliveryOptions(deliveryOptionId);

      productsPriceCents += matchingItem.priceCents * item.quantity;
      productsShippingCents += deliveryOption.priceCents;

      
    });

    totalBeforeTaxCents = productsPriceCents + productsShippingCents;
    totalTaxCents = (totalBeforeTaxCents * 10) / 100;
    totalOrder = totalTaxCents + totalBeforeTaxCents;

    paymentSummaryHTML += `<div class="payment-summary">
                            <div class="payment-summary-title">
                              Order Summary
                            </div>

                            <div class="payment-summary-row">
                              <div>Items (${totalQuantity}):</div>
                              <div class="payment-summary-money">$${convertCurrency(productsPriceCents)}</div>
                            </div>

                            <div class="payment-summary-row">
                              <div>Shipping &amp; handling:</div>
                              <div class="payment-summary-money">$${convertCurrency(productsShippingCents)}</div>
                            </div>

                            <div class="payment-summary-row subtotal-row">
                              <div>Total before tax:</div>
                              <div class="payment-summary-money">$${convertCurrency(totalBeforeTaxCents)}</div>
                            </div>

                            <div class="payment-summary-row">
                              <div>Estimated tax (10%):</div>
                              <div class="payment-summary-money">$${convertCurrency(totalTaxCents)}</div>
                            </div>

                            <div class="payment-summary-row total-row">
                              <div>Order total:</div>
                              <div class="payment-summary-money">$${convertCurrency(totalOrder)}</div>
                            </div>

                            <button class="place-order-button button-primary">
                              Place your order
                            </button>
                          </div>`

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

}