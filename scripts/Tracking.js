import { getProduct } from "../data/products.js";
import {cart, totalCartQuantity} from '../data/cart.js';
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { getdeliveryOption } from "../data/deliveryOptions.js";

document.addEventListener('DOMContentLoaded',()=>{
 const productId =localStorage.getItem('productId');
  let trackingHTML='';

let matchingItem=getProduct(productId);
let cartitem;
let dayString='';
cart.forEach(cartItem=>{
  if(cartItem.productId===productId){cartitem=cartItem
  
  const deliveryOptionId=cartItem.deliveryOptionsId;
  let deliveryOption=getdeliveryOption(deliveryOptionId);
  
   
   const today=dayjs();
  
   const deliveryDate=today.add(deliveryOption.DeliveryDays,'days');
  dayString +=deliveryDate.format("MMMM D");
  }
});


trackingHTML+=`
   
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dayString}
        </div>

        <div class="product-info">
          ${matchingItem.name}
        </div>

        <div class="product-info">
          Quantity: ${cartitem.Quantity}
        </div>

        <img class="product-image" src=${matchingItem.image}>

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
  
`;


document.querySelector('.js-order-tracking').innerHTML=trackingHTML;
const cartQuantity=totalCartQuantity();
document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;

})
 
