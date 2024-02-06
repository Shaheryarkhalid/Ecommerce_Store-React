import './Procuct_Card.css'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { CartContext } from '../../App';
import CART_ACTIONS from '../../Custom_Hooks/Actions/Cart_Actions';

export default function Procuct_Card({Procuct,check})
{
    let {cart,Cart_Dispatch}=useContext(CartContext);
    let Cart_Checker=cart&&cart.includes(Procuct.id);
    let navigate=useNavigate();
    return (
    <>
        <div className="Product_Card">
            <img  onClick={()=>{navigate("/Product_Page?id="+Procuct.id)}}  className='Product_Image' src={Procuct.image} alt="" />
            <div className="Product_Details">
                <span  onClick={()=>{navigate("/Product_Page?id="+Procuct.id)}}  className='Product_Title'>{Procuct.title}</span>
                <span  onClick={()=>{navigate("/Product_Page?id="+Procuct.id)}}  className='Product_Price'><span>${Procuct.price}</span></span>
                
                {check?(<button onClick={()=>Cart_Dispatch({type:CART_ACTIONS.REMOVE_FROM_CART,id:Procuct.id})} >Remove From Cart</button>)
                    :(<button onClick={()=>Cart_Dispatch({type:CART_ACTIONS.ADD_TO_CART,id:Procuct.id})} disabled={Cart_Checker?true:false} className={Cart_Checker&&'Disabled_button'} >Add To Cart</button>)
                }
            </div>
        </div>
    </>
    )
}