import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

// import '../data/cart-class.js';
// import '../data/backend-practic.js'


 async function loadPage(){
  try{
    await loadProductsFetch();

    const value= await new Promise((resolve)=>{
     loadCart(()=>{
       resolve();
     })
   });
  }
  catch(error){

    console.log('sorry async error')
  }



renderOrderSummary();
renderPaymentSummary();

}
loadPage();




/*
Promise.all([
  loadProductsFetch()
,
  new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    })
  })
]).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
})
*/

/*
new Promise((resolve)=>{
  loadProducts(()=>{
  resolve();
  });
}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
*/



/*

loadProducts(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*loadProducts(()=>{
 loadCart(()=>{
  renderOrderSummary();
  renderPaymentSummary();
 })
})
*/

