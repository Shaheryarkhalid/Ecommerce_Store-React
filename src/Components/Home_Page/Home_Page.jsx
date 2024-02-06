import './Home_Page.css'
import { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Fetch_From_API from '../../Custom_Hooks/Hooks/Fetch_From_API.js';
import ACTIONS from '../../Custom_Hooks/Actions/Fetch_API_Actions';
import Procuct_Card from '../Procuct_Card/Procuct_Card';

export default function Home_Page()
{
    let [products,setProducts]=useState([]);
    let navigate=useNavigate();
    useEffect(()=>{
        let function_Call=async ()=>{
            setProducts(await Fetch_From_API({action:ACTIONS.GET_CATAGORY_PPRODUCTS,payload:"jewelery?limit=4"}))
        }
        function_Call();
    },[])
    return(
        <>
        <div>

            <section className='Home_Page_Section_1'>
                <div className="Left_Section">
                   <img className='Center_Section_Image' src='src/assets/Section_1_Image_1.jpg' alt='Fashion' />
                    <div className="Details">
                        <span>MEN'S</span>
                        <button onClick={()=>{navigate('/Category?Category='+"men's clothing")}}>Shop Now</button>
                    </div>
                </div>
                <div className="Center_Section">
                    <img className='Left_Section_Image' src='src/assets/Section_1_Image_2.jpg' alt='Fashion' />
                    <div className="Details">
                        <span>WOMEN'S</span>
                        <button  onClick={()=>{navigate('/Category?Category='+"women's clothing")}}>Shop Now</button>
                    </div>
                </div>
                <div className="Right_Section">
                    <img className='Left_Section_Image' src='src/assets/Section_1_Image_3.jpg' alt='Fashion' />
                    <div className="Details">
                        <span>JEWELLERY</span>
                        <button   onClick={()=>{navigate('/Category?Category='+"jewelery")}}>Shop Now</button>
                    </div>
                </div>
            
            </section>
            <section className='Home_Page_Section_2'>
                <div className='Inner'>
                    {products&& products.map((val,index)=>{
                        return (
                            <Procuct_Card key={index} Procuct={val}></Procuct_Card>
                        )
                    })}

                </div>
            </section>
            <section className='Home_Page_Section_3'>
                <div className="Left_Section">
                </div>
                <div className="Right_Section">
                    <p>Visit our Electronics For</p>
                    <h1>Best Electronics Collection</h1>
                    <button    onClick={()=>{navigate('/Category?Category='+"electronics")}}>Shop Now</button>
                </div>
            </section>
        </div>
        </>
    )
}