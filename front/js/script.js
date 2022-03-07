
const api="http://localhost:3000/api/products/";
var items=document.getElementById("items");
items.innerHTML="";
 
async function getProduct(){
    const response = await fetch(api);
    const data = await response.json()
    data.forEach(produit => {
        items.innerHTML+="<a href='./product.html?id="+produit._id+"'><article><img src='"+produit.imageUrl+"' alt='"+produit.altTxt+"'><h3 class='productName'>"+produit.name+"</h3><p class='productDescription'>"+produit.description+"</p> </article></a>";

    });
  


}






getProduct();