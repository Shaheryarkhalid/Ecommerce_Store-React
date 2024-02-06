import './Remommended_Products.css'
import { useState,useEffect } from 'react';
import Fetch_From_API from '../../Custom_Hooks/Hooks/Fetch_From_API.js';
import ACTIONS from '../../Custom_Hooks/Actions/Fetch_API_Actions.js';
import Procuct_Card from '../Procuct_Card/Procuct_Card.jsx';

export default function Remommended_Products({Category})
{   
    let [products,setProducts]=useState([]);
    console.log(products)
    useEffect(()=>{
        let function_Call=async ()=>{
            setProducts(await Fetch_From_API({action:ACTIONS.GET_CATAGORY_PPRODUCTS,payload:Category+"?limit=4"}))
        }
        function_Call();
    },[Category])
    
    return(<>
            <div className="Recommended_Products">
            {products&& products.map((val,index)=>{
                        return (
                            <Procuct_Card key={index} Procuct={val}></Procuct_Card>
                        )
                    })}
            </div>
    </>)
}