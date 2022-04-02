class Template{



    displayProductIndex(produit){
        const $a = document.createElement("a");
        $a.setAttribute("href",`./product.html?id=${produit._id}`);
        const produitCard = 
        `<article>
            <img src="${produit.imageUrl}" alt="${produit.altTxt}">
            <h3 class="productName">${produit.name}</h3>
            <p class="productDescription">${produit.description}</p>
        </article>`;

        $a.innerHTML = produitCard;
        // this.items.appendChild($a);
        return  $a;
    }
    displayProductDetail(product){
        const images=document.getElementsByClassName("item__img");
        for (let i = 0; i < images.length; i++) {

            
            images[i].innerHTML = "<img src='"+product.imageUrl+"' alt='"+product.altTxt+"'>";
        }
      
            const title=document.getElementById("title");   
            title.textContent=product.name;
        

            const price=document.getElementById("price");
            price.textContent=product.price;
            
            const description=document.getElementById("description");
            description.textContent=product.description;

            product.colors.forEach(color => {
                var option = document.createElement("option");
                option.setAttribute("value",color);
                option.textContent=color;
                const colors=document.getElementById("colors");
                colors.appendChild(option);
        
             });

    }
    testproductDetail(){
        if(document.getElementById("colors").value==""||document.getElementById("quantity").value=="0"){
            if(document.getElementById("colors").value==""){
                 alert("veuillez choisir une couleur");   
             }
             if(document.getElementById("quantity").value=="0"){
                 alert("veuillez choisir une quantité"); 
             }
            
        }else{
            return true;
        }

    }
    ProductCart(produit){
        const arti=document.createElement("article");
        arti.setAttribute("class","cart__item");
        arti.setAttribute("data-id",produit._id);
        arti.setAttribute("data-color",produit.colors);
        arti.innerHTML=`<div class="cart__item__img">
        <img src="${produit.imageUrl}" alt="${produit.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${produit.name}</h2>
          <p>${produit.colors}</p>
          <p>${produit.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.Qte}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
      `
       
        return arti;
      }
      validation(){
        var NameValid=/^([_A-zéè~¨-]*\s*)*$/;
        var emailvalid=/^[-a-z_éè~¨0-9]+(\.[-a-z_éè~¨0-9]*)*@[a-z]+\.[a-z]{2,3}$/; 
        var adrvalid=/^\d+(\s[-A-z_éè~¨0-9]+)+\s*$/;
        var FirstName=document.getElementById("firstName");
        var LastName=document.getElementById("lastName");
        var City=document.getElementById("city");
        var Address=document.getElementById("address");
        var Email=document.getElementById("email");
        var emailErrorMsg=document.getElementById("emailErrorMsg");
        var cityErrorMsg=document.getElementById("cityErrorMsg");
        var addressErrorMsg=document.getElementById("addressErrorMsg");
        var lastNameErrorMsg=document.getElementById("lastNameErrorMsg");
        var firstNameErrorMsg=document.getElementById("firstNameErrorMsg");
        if(FirstName.validity.valueMissing){
           firstNameErrorMsg.textContent="vous avez oublier le nom";
           firstNameErrorMsg.style.color="red";
           return false;     
        }else if(NameValid.test(FirstName.value)==false){
        firstNameErrorMsg.textContent="format incorrect ";
        firstNameErrorMsg.style.color="orange";
        return false; 
        }else{
          firstNameErrorMsg.textContent="OK";
          firstNameErrorMsg.style.color="green";
       }
       if(LastName.validity.valueMissing){
           lastNameErrorMsg.textContent="vous avez oublier le prenom";
           lastNameErrorMsg.style.color="red";
       
           return false; 
        }else if(NameValid.test((LastName.value))==false){
          lastNameErrorMsg.textContent="format incorect commencer par majuscule svp";
          lastNameErrorMsg.style.color="orange";
    
          return false; 
       }else{
         lastNameErrorMsg.textContent="OK";
         lastNameErrorMsg.style.color="green";
         
      }
        
        if(Address.validity.valueMissing){
          addressErrorMsg.textContent="vous avez oublier l'adresse";
          addressErrorMsg.style.color="red";
         
          return false; 
       }else if(adrvalid.test((Address.value))==false){
         addressErrorMsg.textContent="format incorect";
         addressErrorMsg.style.color="orange";
     
         return false; 
       }else{
         addressErrorMsg.textContent="OK";
         addressErrorMsg.style.color="green";
       
      }  
        if(City.validity.valueMissing){
           cityErrorMsg.textContent="vous avez oublié la ville ";
           cityErrorMsg.style.color="red";
     
           return false; 
        }else if(NameValid.test((City.value))==false){
          cityErrorMsg.textContent="veuillez entrez un nom de ville valid";
          cityErrorMsg.style.color="orange";
     
          return false; 
       }else{
         cityErrorMsg.textContent="OK";
         cityErrorMsg.style.color="green";
       
      }
         
        if(Email.validity.valueMissing){
           emailErrorMsg.textContent="vous avez oublier l'email";
           emailErrorMsg.style.color="red";
         
           return false; 
        }else if(emailvalid.test(Email.value)==false){
           emailErrorMsg.textContent="veuillez entrer un email valide";
           emailErrorMsg.style.color="orange";
         
           return false; 
            
          }else{
            emailErrorMsg.textContent="OK";
            emailErrorMsg.style.color="green";
         }
         return true;
        }
        options(tab){
          var  req={contact:{  
            firstName:document.getElementById("firstName").value,
            lastName:document.getElementById("lastName").value,
            address:document.getElementById("address").value,
            city:document.getElementById("city").value,
            email:document.getElementById("email").value,
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
          return options;

        }


    


}