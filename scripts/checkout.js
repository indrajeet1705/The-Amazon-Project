import { cart,removeFromCart,totalCartQuantity ,updateDeliveryOption} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./util/money.js"; 
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
  
  const deliveryDate= dayjs();
  console.log(deliveryDate.format("dddd,MMMM-d"));
let cartSummaryHtml='';
cart.forEach((cartItem)=>{

const productId=cartItem.productId;

let matchingItem;
products.forEach((product)=>{

if(product.id===productId){
  matchingItem=product;
}

});

const deliveryOptionId=cartItem.deliveryOptionsId;
let deliveryOption;
 deliveryOptions.forEach(option=>{
  if(deliveryOptionId===option.id){
         deliveryOption=option;
  }
 });
 console.log(deliveryOption)
 const today=dayjs();

 const deliveryDate=today.add(deliveryOption.DeliveryDays,'days');
 const dayString =deliveryDate.format("dddd,MMMM D");


cartSummaryHtml+=
`
          <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: ${dayString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${matchingItem.name}
                </div>
                <div class="product-price">
                $${formatCurrency(matchingItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.Quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary
                  js-delete-link" data-product-id="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingItem,cartItem)}
             
           
              </div>
            </div>
          </div>
`
});
 
function deliveryOptionsHTML(matchingItem,cartItem){
  let html='';
deliveryOptions.forEach((deliveryOption)=>{
   const today=dayjs();

   const deliveryDate=today.add(deliveryOption.DeliveryDays,'days');
   const dayString =deliveryDate.format("dddd,MMMM D");
   const priceString= deliveryOption.priceCents===0 ? "FREE": `$${formatCurrency(deliveryOption.priceCents)}`
   const isChecked= deliveryOption.id===cartItem.deliveryOptionsId;
   html+=
  `   <div class="delivery-option js-delivery-option"
                     data-delivery-option-id="${deliveryOption.id}"
                     data-product-id="${matchingItem.id}">
                  <input type="radio"
                   ${isChecked?'checked':''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dayString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} - Shipping
                    </div>
                  </div>
                </div>
`


});
return html;
}


document.querySelector('.js-order-smmary').innerHTML=cartSummaryHtml;
let totalQuantity=0;
totalQuantity=totalCartQuantity();
document.querySelector('.js-return-to-home-link').innerHTML=`${totalQuantity} Items`;

document.querySelector('.js-return-to-home-link').innerHTML=`${totalQuantity}`;
document.querySelectorAll('.js-delete-link').forEach(link=> {
  link.addEventListener('click',()=>{
   let productId=link.dataset.productId
   removeFromCart(productId);
    const container=document.querySelector(`.js-cart-item-container-${productId}`);
 
    container.remove();
    totalQuantity=totalCartQuantity();
    document.querySelector('.js-return-to-home-link').innerHTML=`${totalQuantity} Items`;

    

    
  });
});
document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click',()=>{
      const{productId,deliveryOptionId}=element.dataset;
   updateDeliveryOption(productId,deliveryOptionId)
  });
});



