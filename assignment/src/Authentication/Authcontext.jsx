
import React, { createContext, useContext, useState, useEffect,useRef } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const isMounted = useRef(true); // Using a ref to track if the component is mounted

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

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};