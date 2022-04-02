class API{
    constructor(val){
        this._url="http://localhost:3000/api/"+val;
       
    }
    async  getProducts(){
        return fetch(this._url).
        then(res=>{return res.json()}).
        catch(err=>console.log(err))
        
    }
    async  getOrder(options){
        return fetch(this._url,options).
        then(res=>{return res.json()}).
        catch(err=>console.log(err))
        
    }

}