import './Check_Out.css'
import Procuct_Card from '../Procuct_Card/Procuct_Card';
import Fetch_From_API from '../../Custom_Hooks/Hooks/Fetch_From_API';
import { CartContext } from '../../App';
import { useState,useContext,useEffect } from 'react'
import ACTIONS from '../../Custom_Hooks/Actions/Fetch_API_Actions';
import { useNavigate } from 'react-router-dom';


export default function Check_Out()
{
    
    let [Products,setProducts]=useState([]);
    let [Total_Price,setTotal_Price]=useState(0);
    let {cart,Cart_Dispatch}=useContext(CartContext);
    let navigate=useNavigate();
    cart.length===0&&navigate('/');
    useEffect(()=>{
        setProducts([])
        cart?cart.map(val=>{
            let Get_Products=async ()=>{
                let result=await Fetch_From_API({action:ACTIONS.GET_PRODUCT_BY_ID,payload:val})
                setProducts(prev=>[...prev,result])
            }
            Get_Products();
        }):setProducts([]);

    },[cart])
    useEffect(()=>{
        setTotal_Price(0);
        Products.map(val=>{
            setTotal_Price(Total_Price+Number(val.price));
        })
    },[Products,cart])
    return(
        <>
            <section>        
                <div className='Check_Out'>
                    <div className="Left_Section">
                        <form>
                            <div className="row">
                                <input type="text" name='First_Name' placeholder='First Name'/>
                                <input type="text" name='Last_Name' placeholder='Last Name'/>
                            </div>
                            <div className="row">
                                <input type="email" name='Email' placeholder='Email' />
                            </div>
                            <div className="row">
                                <input type="text" name='Address_Line_1' placeholder='Address Line One'/>
                            </div>
                            <div className="row">
                                <input type="text" name='Address_Line_2' placeholder='Address Line Two' />
                            </div>
                            <div className="row">
                                <input type="text" name='City' placeholder='City'/>
                                <input type="text" name='Zip_Code' placeholder='Zip Code'/>
                            </div>
                            <div className="row">
                                <input type='submit' className='Submit'/>
                            </div>
                        </form>
                    </div>
                    <div className="Right_Section">
                        <div className="Total">
                            <span className="Total_Text">Total</span>
                            <span className="Total_Price">$ {Total_Price.toFixed(2)}</span>
                        </div>
                        <div className="Products">
                            {Products&& Products.map((val,index)=>{
                                return (
                                    <Procuct_Card key={index} check={true} Procuct={val}></Procuct_Card>
                                )
                             })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}