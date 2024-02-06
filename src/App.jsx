import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import {Cart, Category, Check_Out, Footer, Home_Page, Nav_Bar,  Search,Product_Page} from "./Components"
import { useReducer } from 'react';
import reducer from './Custom_Hooks/Hooks/Cart_Reducer';
import { createContext } from 'react';

let Initial_Cart=[];
let CartContext=createContext();

function App() {
  let [cart,Cart_Dispatch]=useReducer(reducer,Initial_Cart);
  return (
    <>
      <BrowserRouter>
        <CartContext.Provider value={{cart,Cart_Dispatch}}>
          <Nav_Bar />
          <Routes> 
            <Route path='/' element={<Home_Page />} />
            <Route path='/Search' element={<Search/>} />
            <Route path='/CheckOut' element={<Check_Out/>} />
            <Route path='/Category' element={<Category/>} />
            <Route path='/Product_Page' element={<Product_Page/>} />
          </Routes>
          <Cart />
          <Footer />
        </CartContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
export {CartContext}