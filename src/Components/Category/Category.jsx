import './Category.css'
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Fetch_From_API from '../../Custom_Hooks/Hooks/Fetch_From_API';
import ACTIONS from '../../Custom_Hooks/Actions/Fetch_API_Actions';
import Procuct_Card from '../Procuct_Card/Procuct_Card'


export default function Category()
{
    console.log("Working")
    let [Product,setProduct]=useState([]);
    let location=useLocation();
    const queryParameters = new URLSearchParams(location.search)
    const Search_Category = queryParameters.get("Category").toLowerCase();
    useEffect(()=>{
        let Call_Fnc= async ()=>{
            let res= await Fetch_From_API({action:ACTIONS.GET_CATAGORY_PPRODUCTS,payload:Search_Category});
            setProduct(res);
        }
        Call_Fnc();
    },[location.search])
    return( 
        <>
            <h1 style={{background:"#fff",textTransform:"uppercase",color:"var(--Store-Primary-Color)",fontFamily:" 'Caveat', cursive",textAlign:"center"}}>{Search_Category}</h1>
            <div className="Category">
                { Product.map((val,index)=>{
                    return      <Procuct_Card key={index} Procuct={val}></Procuct_Card>
                    })
                }
            </div>
        </>
    )
}