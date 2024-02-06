import './Cart.css'
import { useContext,useEffect,useState } from 'react'
import { CartContext } from '../../App';
import Fetch_From_API from '../../Custom_Hooks/Hooks/Fetch_From_API';
import ACTIONS from '../../Custom_Hooks/Actions/Fetch_API_Actions';
import CART_ACTIONS from '../../Custom_Hooks/Actions/Cart_Actions'
import Procuct_Card from '../Procuct_Card/Procuct_Card';
import { useNavigate } from 'react-router-dom';


export default function Cart()
{
    let [Products,setProducts]=useState([]);
    let [Cart_Open,set_Cart_Open]=useState(false);
    let {cart,Cart_Dispatch}=useContext(CartContext);
    let navigate=useNavigate();
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

    return(
        <>
            <button onClick={()=>{set_Cart_Open(!Cart_Open)}} className='Cart_Sticky_Button'>
                 <img className='Cart_Icon' src="src/assets/Cart_Logo.svg" alt="" />
            </button>
            <div style={{right:Cart_Open&&"0"}} className='Cart_Slider'>
                    <span className='Cart_Closer'  onClick={()=>{set_Cart_Open(!Cart_Open)}} >X</span>
                    {Products&& Products.map((val,index)=>{
                        return (
                            <Procuct_Card key={index} check={true} Procuct={val}></Procuct_Card>
                        )
                    })}
                <button onClick={()=>{Cart_Dispatch({action:CART_ACTIONS.CLEAR_CART,id:""})}} className='Clear_Cart'>Clear Cart</button>
                {cart&& (cart.length>0&&
                    <button className='Checkout'  onClick={()=>{navigate("/CheckOut")}}>Proceed To Checkout</button>
                )}
            </div>
        </>
    )
}