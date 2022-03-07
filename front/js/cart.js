 
 const api="http://localhost:3000/api/products/";
 var products=document.getElementById("cart__items");
 var Total=document.getElementById("totalPrice");
 var TotalQte=document.getElementById("totalQuantity");
 var section=document.getElementById("cart__items");
 var submit=document.getElementById("order");

 var qte=document.getElementsByName("itemQuantity");
 var item=document.getElementsByClassName("cart__item");
 var delet=document.getElementsByClassName("deleteItem");

function getProducts(){
  var Products=localStorage.getItem("cart"); 
  return JSON.parse(Products);
}
 function displayCart(){
    Products=getProducts(); 
    for(i=0;i<Products.length;i++){
     products.innerHTML+="<article class='cart__item' data-id='"+Products[i]._id+"' data-color='"+Products[i].colors+"'>"+
     "<div class='cart__item__img'>"+
       "<img src='"+Products[i].imageUrl+"' alt='"+Products[i].altTxt+"'>"+
     "</div>"+
     "<div class='cart__item__content'>"+
       "<div class='cart__item__content__description'>"+
         "<h2>"+Products[i].name+"</h2>"+
         "<p>"+Products[i].colors+"</p>"+
         "<p>"+Products[i].price+",00 €</p>"+
       "</div>"+
       "<div class='cart__item__content__settings'>"+
         "<div class='cart__item__content__settings__quantity'>"+
           "<p>Qté : </p>"+
           "<input type='number' class='itemQuantity' name='itemQuantity' min='1' max='100' value='"+Products[i].Qte+"'>"+
         "</div>"+
         "<div class='cart__item__content__settings__delete'>"+
           "<p class='deleteItem'>Supprimer</p>"+
         "</div>"+
     "</div>"+
   "</article> ";
   

    }
   Total.textContent=TotalProductQte().total+",00";
   TotalQte.textContent=TotalProductQte().nbr; 
 for(i=0;i<qte.length;i++){  
  qte[i].addEventListener("change",(event)=>{
    id=event.path[4].getAttribute("data-id");
    color=event.path[4].getAttribute("data-color");
    var indice=ChangeQte(id,color);
   Products=getProducts();
    Products[indice].Qte=event.target.value;
    localStorage.setItem("cart",JSON.stringify(Products));

    Total.textContent=TotalProductQte().total+",00";
    TotalQte.textContent=TotalProductQte().nbr; 
 });
 delet[i].addEventListener("click",(event)=>{
  id=event.path[4].getAttribute("data-id");
  color=event.path[4].getAttribute("data-color");
  var indice=ChangeQte(id,color);
  Products=getProducts();
  Products.splice(indice, 1);
  console.log(Products);
  article=event.path[4];
  section.removeChild(article);
  localStorage.setItem("cart",JSON.stringify(Products));
  Total.textContent=TotalProductQte().total+",00";
  TotalQte.textContent=TotalProductQte().nbr; 
}); 
}  
 }

 

 function ChangeQte(id,color){  
  Products=getProducts();
  var indice=null;
  for(i=0;i<Products.length;i++){
    if(Products[i]._id==id && Products[i].colors==color){
      indice=i;
      break;
    }    
  }
  return indice;
 }
 function TotalProductQte(){
  Products=getProducts();
  var total=0;
    var nbr=0;
    for(i=0;i<Products.length;i++){
        nbr+=parseInt(Products[i].Qte);
        total+=Products[i].price*Products[i].Qte;
    }
    return{nbr,total};
  
 }
submit.addEventListener("click",async ()=>{
  var origine=document.location.origin;
  var tab=[];
  Products=getProducts();
  for(i=0;i<Products.length;i++){
   tab.push(Products[i]._id);
}
console.log(tab);
const urlParams = new URLSearchParams(document.location.search);

req={contact:{
                firstName:urlParams.get('firstName'),
                lastName:urlParams.get('lastName'),
                address:urlParams.get('address'),
                city:urlParams.get('city'),
                email:urlParams.get('email'),
 
       },
       products:tab
}
const options={
method:'POST',
headers:{
  'Content-Type':'application/json'

},
body:JSON.stringify(req)

};



try{
  const response = await fetch(api+"order",options);
  const data = await response.json();
 document.location=await origin+"/front/html/confirmation.html?orderId="+data.orderId;
}catch(e){
  alert(e);
}
storage.removeItem("cart");

});


displayCart();
