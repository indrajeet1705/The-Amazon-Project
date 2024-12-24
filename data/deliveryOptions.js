export const deliveryOptions=[{

id:'1',
DeliveryDays:7,
priceCents:0

},
{
  id:'2',
  DeliveryDays:3,
  priceCents:499
},
{
  id:'3',
  DeliveryDays:1,
  priceCents:999
}]

export function getdeliveryOption(deliveryOptionId){

  let deliveryOption;
 deliveryOptions.forEach(option=>{
  if(deliveryOptionId===option.id){
         deliveryOption=option;
  }
 });

 return deliveryOption || deliveryOptions[0];
}