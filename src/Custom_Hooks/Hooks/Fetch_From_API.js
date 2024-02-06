import ACTIONS from "../Actions/Fetch_API_Actions";


const Base_Url="https://fakestoreapi.com/products";

export default async function Fetch_From_API({action,payload})
{
    switch(action)
    {
        case ACTIONS.GET_ALL_CATAGORIES:
            return await fetch(Base_Url+"/categories")
                        .then(res=>res.json())
                        .then(result=>result);
        case ACTIONS.GET_ALL_PRODUCTS:
            return await fetch(Base_Url)
                        .then(res=>res.json())
                        .then(result=>result);
        case ACTIONS.GET_CATAGORY_PPRODUCTS:
            return await fetch(Base_Url+"/category/"+payload)
                        .then(res=>res.json())
                        .then(result=>result);       
        case ACTIONS.GET_PRODUCT_BY_ID:
            return await fetch(Base_Url+"/"+payload)
                        .then(res=>res.json())
                        .then(result=>result);      
        default:
            return await fetch(Base_Url+"/categories")
                        .then(res=>res.json())
                        .then(result=>result);
    }
}