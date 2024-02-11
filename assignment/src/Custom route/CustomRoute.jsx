import {Routes,Route} from"react-router-dom"
import Nav from "../Components/Nav"
import Home from "../Components/Home" 
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import ExploreMore from "../Components/ExploreMore"
import Login from "../Components/Login"; 
import SingleProduct from "../Components/SingleProduct"
import Cart from "../Components/Cart"

const CustomRoute = () => {
  return (
      <>  
       <Routes>
        <Route path="/" element={<Nav />}>
          <Route index element={<Home />} />
           <Route  element={<ProtectedRoute/>}>
             <Route path="exploremore" element={<ExploreMore/>} />
           </Route>
          <Route path="login" element={<Login />} /> 
          <Route path="cart" element={<Cart/>}/>  
          <Route path='products' element={<SingleProduct/>}/> 

          <Route path="*" element={<ExploreMore />} />
        </Route>
      </Routes>
      </>
  )
}

export default CustomRoute