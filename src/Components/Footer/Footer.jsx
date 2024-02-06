import './Footer.css'
import { useState,useEffect } from 'react';
import Fetch_From_API from '../../Custom_Hooks/Hooks/Fetch_From_API';
import ACTIONS from '../../Custom_Hooks/Actions/Fetch_API_Actions';
import { useNavigate } from 'react-router-dom';

export default function Footer()
{
    let [Category,setCategory]=useState([]);
    let navigate=useNavigate();
    useEffect(()=>{
        let Call_Fnc= async ()=>{
            let res= await Fetch_From_API({action:ACTIONS.GET_ALL_CATAGORIES,payload:""});
            setCategory(res);
        }
        Call_Fnc();
    },[])
    function Menu_Navigator(URL)
    {
        navigate(URL);
    }
    return(
        <>
            <footer className='Footer'>
                <div className="Left_Section">
                    <ul>
                    <li  onClick={()=> Menu_Navigator('/') } >Home</li>
                        {Category.map((val,index)=>{
                              return  <li  onClick={()=> Menu_Navigator('/Category?Category='+val) }  key={index}>{val.toUpperCase()}</li>
                            })
                        }
                    </ul>
                </div>
                <div className="Center_Section">

                </div>
                <div className="Right_Section">
                    <h1>News Letter</h1>
                    <form action="">
                        <input type="text" placeholder='Email' />
                        <input type="submit" />
                    </form>
                </div>
            </footer>
        </>
    )
}