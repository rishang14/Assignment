import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Authentication/Authcontext.jsx"; 
import {Elements} from '@stripe/react-stripe-js'; 
import { stripePromise } from "./Stripe/Stripe.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>  
      <Elements stripe={stripePromise} >
      <App />
      </Elements>
    </AuthProvider>
  </BrowserRouter>
);
