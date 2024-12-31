import { products,getProduct } from "./products.js";
import { cart } from "./cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions,getdeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../scripts/util/money.js";
import { totalCartQuantity } from "./cart.js";


export const orders=JSON.parse(localStorage.getItem('orders')) || [];

function saveTOStorage(){
  localStorage.setItem('orders',JSON.stringify(orders))
}

document.addEventListener('DOMContentLoaded', () => {
  loadOrders();
  loadOrderHeader();
});
let orderHtml='';
function loadOrders(){
  let matchingItem;
cart.forEach((cartItem)=>{

  const productId=cartItem.productId;
  matchingItem=getProduct(productId);

const deliveryOptionId=cartItem.deliveryOptionsId;
let deliveryOption=getdeliveryOption(deliveryOptionId);

 
 const today=dayjs();

 const deliveryDate=today.add(deliveryOption.DeliveryDays,'days');
 const dayString =deliveryDate.format("MMMM D");



  orderHtml+=  

  `
              <div class="product-image-container">
              <img src=${matchingItem.image}>
            </div>

            <div class="product-details">
              <div class="product-name">
               ${matchingItem.name}
              </div>
              <div class="product-delivery-date">
                Arriving on:${dayString}
              </div>
              <div class="product-quantity">
                Quantity: ${cartItem.Quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
           
                <button class="track-package-button button-secondary js-track-order" data-product-id="${productId}">
                  Track package
                </button>
            
            </div>
  `



});
document.querySelector('.js-order-details-grid').innerHTML=orderHtml;
document.querySelectorAll('.js-track-order').forEach(but=>{
 but.addEventListener('click',()=>{
  let productId=but.dataset.productId;
  localStorage.setItem('productId',productId)
   
   window.location.href='tracking.html';
  
 })
})


saveTOStorage();
}

export function loadOrderHeader(){

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
   const orderPlaced=dayjs();
   const placedDate=orderPlaced.format('MMMM D');
   document.querySelector('.js-header-total').innerHTML=`$${formatCurrency(totalCents)}`;
   document.querySelector('.js-header-date').innerHTML=placedDate
   const orderId=Math.floor(Math.random()*1000000000000000);
  document.querySelector('.js-header-order-id').innerHTML=orderId;
  let totalQuantity=totalCartQuantity();
  
  document.querySelector('.js-order-quantity').innerHTML=totalQuantity;

}



