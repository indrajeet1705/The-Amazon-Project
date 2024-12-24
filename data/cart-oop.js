 
 function Cart(localStorageKey){
  const cart={
    cartItem:undefined,
         
       loadFromStorage (){
       this.cartItem= JSON.parse(localStorage.getItem(localStorageKey));
     
     if(!this.cartItem){
       this.cartItem= [
         {
           productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
           Quantity:2,
           deliveryOptionsId:'1'
         },
         {
           productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
           Quantity:2,
           deliveryOptionsId:'2'
         }
       ];
     }
     },
 
     saveTOStorage(){
       localStorage.setItem(localStorageKey,JSON.stringify(this.cartItem));
    
     },
     
   addToCart(productId){
    
   
   
   let matchingItem;
   this.cartItem.forEach((item)=>{
    if(productId===item.productId){
      matchingItem=item;
    }
   });
   if(matchingItem){
    matchingItem.Quantity+= 1;
   }
   else{
    this.cartItem.push({
      productId: productId,
      Quantity:1,
      deliveryOptionsId:'1'
  
     });
   }
   this.saveTOStorage();
 
 },
  removeFromCart(productId){
 
   const newCart=[];
 
   this.cartItem.forEach(item=>{
      if(item.productId!==productId){
          newCart.push(item);
      }
   });
   this.cartItem=newCart;
   this.saveTOStorage();
 
 },
  updateDeliveryOption(productId,deliveryOptionId){
   let matchingItem;
   this.cartItem.forEach((item)=>{
    if(productId===item.productId){
      matchingItem=item;
    }
   });
   matchingItem.deliveryOptionsId=deliveryOptionId
    this.saveTOStorage();
 
 },
  totalCartQuantity(){
   let totalQuantity=0;
   this.cartItem.forEach(item=>{
     totalQuantity+=item.Quantity;
   });
   return totalQuantity;
 }
 
  };

  return cart;
 }
 


const cart =Cart('cart-oop');
const businesscart=Cart('cart-business');
 cart.loadFromStorage();
businesscart.loadFromStorage();
console.log(cart)
console.log(businesscart)

 
 