import { getProduct } from "../../data/products.js";
import { cart } from "../../data/cart.js";
import { formatCurrency } from "../util/money.js";
import { getdeliveryOption } from "../../data/deliveryOptions.js";
// import { loadOrders } from "../../data/orders.js";

export function renderPaymentSummary(){
   let productPriceCents=0;
   let productShippingPrice=0;
   cart.forEach(cartItem => {
     const  product=getProduct(cartItem.productId);
     productPriceCents+=product.priceCents*cartItem.Quantity;
      const deliveryOption=getdeliveryOption(cartItem.deliveryOptionsId);
      productShippingPrice+=deliveryOption.priceCents;
    

   });


   const totalBeforeTaxCents=productPriceCents+productShippingPrice;
   const taxCents=totalBeforeTaxCents*0.1;
   const totalCents=totalBeforeTaxCents+taxCents;
    
   const paymentSummaryHTML=`
     <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(productShippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary
          js-place-order">
            Place your order
          </button>
   `;
   


    `GET=to get something from backend
    POST=to create something in backend
    PUT=to update something
    DELETE=to delete something from backend
    
    `
   document.querySelector('.js-payment-summary')
   .innerHTML=paymentSummaryHTML;


   document.querySelector('.js-place-order')
   .addEventListener('click', async () => {
    // loadOrders();
    window.location.href='orders.html';
    
      
   });

}

