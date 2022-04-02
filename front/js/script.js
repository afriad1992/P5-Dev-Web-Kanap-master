

class index{
    constructor(){
        this.items=document.getElementById("items");
        this.api=new API("products");
        this.template=new Template; 
    }

       async  displayProducts(){
        const data=await this.api.getProducts();
        data.forEach(produit => {this.items.appendChild(this.template.displayProductIndex(produit)) });   
    }    

} 





const Index=new index;

Index.displayProducts();