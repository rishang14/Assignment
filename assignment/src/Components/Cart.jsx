import { useState } from "react";
import { useAuth } from "../Authentication/Authcontext"  
import { json, useNavigate } from "react-router-dom";

const Cart = () => { 
    const {cart,removeFromCart,setCart,user,setCount}=useAuth()  
    const [quantity,setQuantity]=useState({})
    const navigate=useNavigate()
    const calculateTotal = (cart) => {
        return cart.reduce((total, item) => total + item.price * (quantity[item.id] || 1), 0);
      };  

      const handleIncrement = (itemId) => {
        setQuantity((prevQuantity) => ({ ...prevQuantity, [itemId]: (prevQuantity[itemId] || 0) + 1 }));
      };
    
      const handleDecrement = (itemId) => {
        if (quantity[itemId] && quantity[itemId] > 1) {
          setQuantity((prevQuantity) => ({ ...prevQuantity, [itemId]: prevQuantity[itemId] - 1 }));
        } 
      };
      const handleCheckout=()=>{
        if(cart.length>0){
            alert("your order successed"); 
            setCount(0) 
            setCart(()=> {

             const newCart=[] 
             localStorage.setItem('cart',JSON.stringify(newCart))
            }
            );   
            navigate("/")

            
        }else{
            alert("Cart is empty")
        }
      }
    
  return ( 
    <div className="h-screen bg-gray-100 pt-20">
    <h1 className="mb-6 text-center text-lg md:text-2xl font-bold">Cart Items</h1>
   
    { 
      user  ?  <div className="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0">  <div className="rounded-lg md:w-2/3">
      {cart.map((item) => (
        <div key={item.id} className="mb-6 bg-white p-4 md:p-6 shadow-md rounded-lg">
          <img src={item.thumbnail} alt={item.title} className="w-full rounded-lg mb-4 md:w-40 md:mb-0" />
          <div className="flex flex-col md:flex-row md:justify-between items-start">
            <div className="flex items-center flex-wrap space-x-4">
              <p>{item.brand}</p>
              <p>{item.title}</p>
              <p className="text-sm">Price:{(quantity[item.id] || 1 ) * item.price}</p> 
            </div> 
            <div>
              <span  className="cursor-pointer p-2" onClick={()=>handleDecrement(item.id)}>⬅️</span>  
              {quantity[item.id] || 1}
              <span className="cursor-pointer p-2" onClick={()=> handleIncrement(item.id)}>➡️</span>
            </div>
            <button
              className="mt-2 md:mt-0 rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
          <p className="mt-2">{item.description}</p>
        </div>
      ))}
    </div> 
    <div className="mt-6 h-full rounded-lg border bg-white p-4 md:p-6 shadow-md md:mt-0 md:w-1/3">
        <hr className="my-4" />
        <div className="flex justify-between mb-4">
          <p className="text-sm md:text-lg font-bold">Total</p>
          <p className="text-sm md:text-lg font-bold">Rs. {calculateTotal(cart)}</p>
        </div>
        <button className="w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={() => handleCheckout()}>
          Check out
        </button>
      </div>
    </div> :   <div className="mt-6 h-[200px] rounded-lg border bg-white p-4 md:p-6 shadow-md md:mt-0 md:w-1/3">
        <hr className="my-4" />
        <div className="flex justify-between mb-4">
          <p className="text-sm md:text-lg font-bold">Total</p>
          <p className="text-sm md:text-lg font-bold">Rs. 0</p>
        </div>
        <button className="w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={()=> alert("you are not logged in and Cart is also empty")}>
          Check out
        </button>
      </div>
    }
     
   
    </div>
  
  
  )
}

export default Cart;