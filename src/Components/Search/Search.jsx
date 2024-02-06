import './Search.css'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import Fetch_From_API from '../../Custom_Hooks/Hooks/Fetch_From_API';
import ACTIONS from '../../Custom_Hooks/Actions/Fetch_API_Actions';
import Procuct_Card from "../../Components/Procuct_Card/Procuct_Card.jsx"

export default function Search()
{
    let [Matching_Products,set_Matching_Products]=useState([]);
    let location=useLocation();
    let URL=new URLSearchParams(location.search);
    let Search_Term=URL.get("Search");
    let x=document.getElementById("Search_Page");
    useEffect(()=>{
        if(x){ x.innerHTML="";}
        let Async_Call=async()=>{
            let result=await Fetch_From_API({action:ACTIONS.GET_ALL_PRODUCTS,payload:""});
            result.map(val=>{
                if(val.title.toLowerCase().includes(Search_Term.toLowerCase()))
                {
                    console.log(val.title)
                    set_Matching_Products(prevValue=>[...prevValue,val]  )
                }
            })
        }
        Async_Call();
    },[location.search])

    return(
        <>
            <div style={{width:"100%",display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
                <h1 style={{textAlign:"center",display:"inline",fontFamily:"'Caveat', cursive",padding:"10px"}}>Showing Results for</h1><span style={{padding:"20px 10px",textAlign:"center",fontFamily:"'Caveat', cursive",color:"var(--Store-Primary-Color)"}}>{Search_Term}</span>
            </div>
            <div className="Search_Page" id='Search_Page'>
                    {Matching_Products && Matching_Products.map((val,index)=>{return(<>
                        <Procuct_Card key={index} Procuct={val} ></Procuct_Card>
                    </>)})

                    }
            </div> 
        </>
    )
}