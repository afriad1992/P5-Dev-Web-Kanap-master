


class Product{
    constructor(){
        this.urlParams=new URLSearchParams(document.location.search);
        this.ProductApi= new API("products/"+this.urlParams.get('id'));
        this.template=new Template;
         
    }
    async getProducts(){
        return await this.ProductApi.getProducts();
    }

    async displayProduct(){       
     const product=await this.getProducts();
     this.template.displayProductDetail(product);


       
    }



    
}


const product=new Product;
product.displayProduct();

 document.getElementById("addToCart").addEventListener("click",async (e)=>{
    const produit=new Product;
    const product=await produit.getProducts();
    if(produit.template.testproductDetail()){
        product.colors=document.getElementById("colors").value;
        product.Qte=document.getElementById("quantity").value;
        if(!localStorage.getItem("cart")){
            // delete product.price;
            var tab=[];
            tab.push(product);
            localStorage.setItem("cart",JSON.stringify(tab));
        }else{
            var products=localStorage.getItem("cart"); 
            products=JSON.parse(products);
            
            var compt=0;
            for(i=0;i<products.length;i++){
                if((products[i]._id==product._id) && (products[i].colors==product.colors)){ 
                    products[i].Qte=+parseInt(products[i].Qte)+parseInt(product.Qte);
                    compt++;
                }
            }
            if(compt==0){                  
                    products.push(product);
            }
                localStorage.setItem("cart",JSON.stringify(products));
                alert("produit ajouté dans le panier");



        }

    }

     
    
    
    
    
    
    });


