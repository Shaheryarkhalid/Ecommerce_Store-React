import './Product_Page.css'
import { useEffect, useState } from 'react';
import {useLocation } from 'react-router-dom';
import Remommended_Products from '../Remommended_Products/Remommended_Products.jsx';
import Fetch_From_API from '../../Custom_Hooks/Hooks/Fetch_From_API';
import ACTIONS from '../../Custom_Hooks/Actions/Fetch_API_Actions';
import { useContext } from 'react';
import { CartContext } from '../../App';
import CART_ACTIONS from '../../Custom_Hooks/Actions/Cart_Actions';
import { useNavigate } from 'react-router-dom';

export default function Product_Page()
{
    let navigate=useNavigate();
    let [Product,setProduct]=useState({});
    let location=useLocation();
    let URL=new URLSearchParams(location.search);
    let ID=URL.get('id');
    // alert(Product.title)
    let {cart,Cart_Dispatch}=useContext(CartContext);
    let Cart_Checker=cart&&cart.includes(Product.id);
    useEffect(()=>{
        let Get_Product=async()=>{
            let Result=await Fetch_From_API({action:ACTIONS.GET_PRODUCT_BY_ID,payload:ID});
            setProduct(Result);
        }
        Get_Product();
    },[location.search,ID])






    const stars = document.querySelectorAll(".stars  i");
    stars.forEach((star, index1) => {
    star.addEventListener("mouseover", () => {
        stars.forEach((star, index2) => {
        index1 >= index2
            ? (star.style.transform = "scale(1.2)")
            : (star.style.transform = "scale(1)");
        });
        // star.style.transform = "scale(1.5)";
    });
    star.addEventListener("mouseout", () => {
        star.style.transform = "scale(1)";
    });
    star.addEventListener("click", () => {
        stars.forEach((star, index2) => {
        index1 >= index2
            ? star.classList.add("active")
            : star.classList.remove("active");
        });
    });
    });
    return(<>
            <div className="Product_Page">
                <div className="Top_Section">
                    <img className='Product_Image' src={Product.image} alt="" />
                    <div className="Details">
                        <span className='Product_Title'>{Product.title}</span>
                        <span className='Product_Price'>$ {Product.price}</span>
                        <div  className="Product_Rating">
                            <div className="container">
                                <div className="stars">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </div>
                            </div>
                            <span className='Old_Rating'>
                                    <i className="fa-solid fa-star"></i>
                                   <span> {Product.rating && Product.rating.rate} / {Product.rating && Product.rating.count}</span>
                            </span>
                        </div>
                        <div className='Actions'>
                        <button onClick={()=>{Cart_Dispatch({type:CART_ACTIONS.ADD_TO_CART,id:Product.id})}} disabled={Cart_Checker?true:false} className={Cart_Checker?'Disabled_button Product_Add_To_Cart':'Product_Add_To_Cart'} >Add To Cart</button>
                        <button disabled={cart?(cart.length<=0?true:false):true} className={cart?(cart.length<=0?'Disabled_button Product_Checkout':'Product_Checkout'): ('Disabled_button Product_Checkout')} onClick={()=>{navigate("/CheckOut")}}>Proceed to Checkout</button>

                        </div>
                    </div>
                </div>
                <div className="Bottom_Section">
                    <div className='Product_Description'>
                    {Product.description}
                    </div>
                    <div className="Secutity_Logos">
                        <img src="src/assets/Security-Seal.png" alt="" />
                        <img src="src/assets/Credit_Logo.png" alt="" />
                    </div>
                </div>
                {Product.category &&
                    <Remommended_Products Category={Product.category}></Remommended_Products>
                }
            </div>
    </>)    
}