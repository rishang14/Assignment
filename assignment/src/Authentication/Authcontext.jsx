
import React, { createContext, useContext, useState, useEffect,useRef } from 'react';
import axios from 'axios';

const Context = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const isMounted = useRef(true); // Using a ref to track if the component is mounted 
  const[cart,setCart]=useState([])  
  const [id,setid] =useState(null)

  useEffect(() => {
    return () => {
      // Component will unmount, update the ref
      isMounted.current = false;
    };
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.get('https://dummyjson.com/users');
      const users = response.data.users; 
      console.log(users)

      const authenticatedUser = users.find(
        (item) => item.email === email && item.password === password
      );

      if (authenticatedUser && isMounted.current) {
        setUser(authenticatedUser);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (isMounted.current) {
        alert('Error during login');
      }
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  }; 

  const addToCart=(item)=>{
    setCart([...cart,item])  
  } 
  const removeFromCart=(itemId)=>{
    setCart(cart.filter((item)=> item.id !== itemId))
  } 
   
  const handleButtonClick=(id)=>{
    setid(id)
  }

  return (
    <
    Context.Provider value={{ user, login, logout ,addToCart,cart,removeFromCart,setCart,handleButtonClick,id}}>
      {children}
    </
  Context.Provider>
  );
};

export const useAuth = () => {
  return useContext(Context);
};