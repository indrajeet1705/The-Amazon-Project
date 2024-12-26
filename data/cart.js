 export let cart= JSON.parse(localStorage.getItem('cart'));
 
 if(!cart){
   cart= [
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

 function saveTOStorage(){
   localStorage.setItem('cart',JSON.stringify(cart));

 }

 export function addToCart(productId){
   
   let selectQuantity=document.querySelector(`.js-quantity-select-${productId}`).value;
   
   let matchingItem;
   cart.forEach((item)=>{
    if(productId===item.productId){
      matchingItem=item;
    }
   });
   if(matchingItem){
    matchingItem.Quantity+= 1;
   }
   else{
    cart.push({
      productId: productId,
      Quantity:Number(selectQuantity),
      deliveryOptionsId:'1'
  
     });
   }
   saveTOStorage();
 
 }

export   function removeFromCart(productId){

     const newCart=[];

     cart.forEach(item=>{
        if(item.productId!==productId){
            newCart.push(item);
        }
     });
     cart=newCart;
     saveTOStorage();
   
  }

  export function totalCartQuantity(){
    let totalQuantity=0;
    cart.forEach(item=>{
      totalQuantity+=item.Quantity;
    });
    return totalQuantity;
  };

  export function updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;
    cart.forEach((item)=>{
     if(productId===item.productId){
       matchingItem=item;
     }
    });
    matchingItem.deliveryOptionsId=deliveryOptionId
     saveTOStorage();

  }





  export function loadCart(fun){
  const xhr= new XMLHttpRequest();
  xhr.addEventListener('load',()=>{
  console.log(xhr.response);
  fun();
  });
  xhr.open('GET','http://supersimplebackend.dev/cart');
  xhr.send();
  }
  

  