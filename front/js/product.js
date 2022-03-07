const api="http://localhost:3000/api/products/";
const urlParams = new URLSearchParams(document.location.search);
const id = urlParams.get('id');
const images=document.getElementsByClassName("item__img");
const title=document.getElementById("title");
const price=document.getElementById("price");
const description=document.getElementById("description");
const colors=document.getElementById("colors");
const addToCart =document.getElementById("addToCart");
addToCart.addEventListener("click",addProduct);

async function getOneProduct(){  
    const urlParams = new URLSearchParams(document.location.search);
    const id = urlParams.get('id');
    const response = await fetch(api+id);
    const product = await response.json();
    return product;
}

async function displayProduct(){  
    product=await getOneProduct();
    for (let i = 0; i < images.length; i++) {
        images[i].innerHTML = "<img src='"+product.imageUrl+"' alt='"+product.altTxt+"'>";;
      }
    title.textContent=product.name;
    price.textContent=product.price;
    description.textContent=product.description;
    product.colors.forEach(color => {
        var option = document.createElement("option");
        option.setAttribute("value",color);
        option.textContent=color;
        colors.appendChild(option);

        
    });
}
 async function addProduct(){
     product= await getOneProduct();
   if(document.getElementById("colors").value==""||document.getElementById("quantity").value=="0"){
    if(document.getElementById("colors").value==""){
         alert("veuillez choisir une couleur");   
     }
     if(document.getElementById("quantity").value=="0"){
         alert("veuillez choisir une quantité"); 
     }
    }else{
        product.colors=document.getElementById("colors").value;
        product.Qte=document.getElementById("quantity").value;
        if(!localStorage.getItem("cart")){
            var tab=[];
            tab.push(product);
            localStorage.setItem("cart",JSON.stringify(tab));
        }else{
            var products=localStorage.getItem("cart"); 
            products=JSON.parse(products);
            
            var compt=0;
            for(i=0;i<products.length;i++){
                console.log(products[i]._id);
                if((products[i]._id==product._id) && (products[i].colors==product.colors)){
                    
                    products[i].Qte=+parseInt(products[i].Qte)+parseInt(product.Qte);
                    compt++;
                }
            }
            if(compt==0){                  
                    products.push(product);
            }
                localStorage.setItem("cart",JSON.stringify(products));             

        }   
    }
 }
 

 displayProduct();
