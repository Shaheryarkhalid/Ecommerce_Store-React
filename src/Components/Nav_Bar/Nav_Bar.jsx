import './Nav_Bar.css'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Fetch_From_API from '../../Custom_Hooks/Hooks/Fetch_From_API';
import ACTIONS from '../../Custom_Hooks/Actions/Fetch_API_Actions';

export default function Nav_Bar()
{
    let [mobMenu,setMobMenu]=useState(false);
    let [SearchBox,setSearchBox]=useState(false);
    let [Category,setCategory]=useState([]);
    let [Search_Term,set_Search_Term]=useState("");
    let Navigate_To_Search=useNavigate();
    let navigate=useNavigate();
    useEffect(()=>{
        let Call_Fnc= async ()=>{
            let res= await Fetch_From_API({action:ACTIONS.GET_ALL_CATAGORIES,payload:""});
            setCategory(res);
        }
        Call_Fnc();
    },[])
    let Perform_Search=(event)=>{
        event.preventDefault(); 
        Navigate_To_Search("/Search?Search="+Search_Term);
    }
    function Menu_Navigator(URL)
    {
        navigate(URL);
    }
    return(
        <>
            <nav className='Top_Navbar'>
                    <div onClick={()=> Menu_Navigator('/')}  className='Logo_Section'>
                        <img className='Logo' src="src/assets/Store_Logo_Icon.png" alt="E-Comerce" />
                        <span>Ecommerce Store</span>
                    </div>
                    <ul className='BG_menu'>
                        <li onClick={()=> Menu_Navigator('/')}>Home</li>
                        {Category.map((val,index)=>{
                              return  <li onClick={()=> Menu_Navigator('/Category?Category='+val) }  key={index}>{val.toUpperCase()}</li>
                            })
                        }
                    </ul>
                    <div className='Actions'>
                        <img onClick={()=>{setSearchBox(!SearchBox)}} className='Search_Icon' src="src/assets/search-icon.svg" alt="" />
                    </div>
                    <i onClick={()=>setMobMenu(!mobMenu)} id='Mobile_Menu_Button' className="fa-solid fa-bars"></i>
                    {SearchBox&& 
                        <form onSubmit={Perform_Search} className='Search_From'>
                            <a onClick={()=>{setSearchBox(!SearchBox)}}  style={{cursor:"pointer",position:"absolute",top:"10px",right:"50px",color:"#fff",fontSize:"1.5rem"} }>X</a>
                            <input onChange={e=>set_Search_Term(e.target.value)} type="text" name='Search' placeholder='Search Here' id='Search' className='Search' />
                            <button   name='Submit' id='Submit' className='Submit' type='submit'>
                                <img src="src/assets/search-icon.svg" alt="" />
                            </button>
                        </form>
                    }
                    {mobMenu && 
                        <ul id='Mobile_Menu' className='Mobile_Menu'>
                            <div>
                                <li onClick={()=> Menu_Navigator('/')}>Home</li>
                                {Category.map((val,index)=>{
                                    return  <li onClick={()=> Menu_Navigator('/Category?Category='+val) } key={index}>{val.toUpperCase()}</li>
                                    })
                                }
                            </div>
                        </ul>
                    }
            </nav>
        </>
    )
}