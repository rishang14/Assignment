
import React, { createContext, useContext, useState, useEffect,useRef } from 'react';
import axios from 'axios';

const Context = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(()=>{
    const storeduser= localStorage.getItem('user'); 
    return storeduser ? JSON.parse(storeduser) : null
  });
  const isMounted = useRef(true); // Using a ref to track if the component is mounted 
  const[cart,setCart]=useState(()=>{
    const storedCart=localStorage.getItem('cart'); 
    return storedCart ? JSON.parse(storedCart) :[]
  })  
  const [id,setid] =useState(null) 
  const [count,setCount]=useState(()=>{
    const  storedCount=localStorage.getItem('count'); 
    return storedCount  ? parseInt(storedCount,10) : 0
  }) 
  useEffect(()=>{
    localStorage.setItem('count', count.toString());  
  },[count])

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
        localStorage.setItem('user',JSON.stringify(authenticatedUser))
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
    localStorage.removeItem('user')
  }; 

  const addToCart=(item)=>{
    setCart((prevcart)=>{
      const newCart= [...prevcart,item]; 
      localStorage.setItem('cart',JSON.stringify(newCart)) 
      return newCart
    })  
  } 
  const removeFromCart=(itemId)=>{
    setCart((prevcart)=>{
     const newcart=   prevcart.filter((item)=> item.id !== itemId) 
     localStorage.setItem('cart',JSON.stringify(newcart))  
     setCount(prevcount => prevcount -1)
     return newcart;
})} 
   
  const handleButtonClick=(id)=>{
    setid(id)
  }

  return (
    <
    Context.Provider value={{ user, login, logout ,addToCart,cart,removeFromCart,setCart,handleButtonClick,id,count,setCount}}>
      {children}
    </
  Context.Provider>
  );
};

export const useAuth = () => {
  return useContext(Context);
};