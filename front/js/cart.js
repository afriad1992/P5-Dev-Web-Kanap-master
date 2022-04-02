 class Cart{
  constructor(){
    
    this.api=new API("products");
    this.Api= new API("products/order");
    this.template=new Template; 
    this.Products= JSON.parse(localStorage.getItem("cart"));
   
  }

  async displayCart(){ 
    if(this.Products!==null){
      this.Products.forEach(item => {
        document.getElementById("cart__items").appendChild(this.template.ProductCart(item))
      });
    }
    const {nbr,total}=this.TotalProductQte();
    console.log(nbr);

    document.getElementById("totalPrice").textContent=this.TotalProductQte().total+",00";
    document.getElementById("totalQuantity").textContent=this.TotalProductQte().nbr; 
    document.getElementsByName("itemQuantity").forEach(item => {item.addEventListener('change',e=>{this.changQte(e)});});
    for(var i=0;i<document.getElementsByClassName("deleteItem").length;i++){document.getElementsByClassName("deleteItem")[i].addEventListener("click",e=>{this.remove(e)});}  
  }

  changQte(event){
    const id=event.path[4].getAttribute("data-id");
    const color=event.path[4].getAttribute("data-color");
    var indice=this.GetIndice(id,color); 
    this.Products[indice].Qte=event.target.value;
    localStorage.setItem("cart",JSON.stringify(this.Products));
    document.getElementById("totalPrice").textContent=this.TotalProductQte().total+",00";
    document.getElementById("totalQuantity").textContent=this.TotalProductQte().nbr; 
  }
  remove(event){
    var id=event.path[4].getAttribute("data-id");
    var color=event.path[4].getAttribute("data-color");
    var indice=this.GetIndice(id,color);
    this.Products.splice(indice, 1);
    var article=event.path[4];
    document.getElementById("cart__items").removeChild(article);
    localStorage.setItem("cart",JSON.stringify(this.Products));
    document.getElementById("totalPrice").textContent=this.TotalProductQte().total+",00";
    document.getElementById("totalQuantity").textContent=this.TotalProductQte().nbr; 
  }
  GetIndice(id,color){  
    var indice=null;
    for(var i=0;i<this.Products.length;i++){
      if(this.Products[i]._id==id && this.Products[i].colors==color){
        indice=i;
        break;
      }    
    }
    return indice;
   }
  async TotalProductQte(){ 
    var total=0;
    var nbr=0;
    if(this.Products!==null){
      this.Products.forEach(item=>{ 
        // var AP=new API("products/"+item._id);
        // console.log(item._id);
        // var price=await AP.getProducts().price;
        // console.log(await price);
        console.log(item.price);
        console.log(item.Qte);
        nbr+=parseInt(item.Qte);
        total+= parseInt(item.price)*parseInt(item.Qte);
      })

    }
      return{nbr,total};
    
  }

 }
 
 
 
 


const cart=new Cart;
cart.displayCart();

document.getElementById("order").addEventListener("click",async (e)=>{
  const Order=new Cart; 
  if(Order.template.validation()==true && Order.Products!==null ){
    var tab=[];
    Order.Products.forEach(item=>{tab.push(item._id);})
    var options=Order.template.options(tab); 
    if (confirm("confirmez votre commande") == true) {
      var test= await Order.Api.getOrder(options);
      var origine=document.location.origin;
      document.location=await origine+"/front/html/confirmation.html?orderId="+test.orderId;
      localStorage.removeItem("cart");
    }
  }
  e.preventDefault();
})

