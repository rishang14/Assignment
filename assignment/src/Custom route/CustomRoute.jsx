import {Routes,Route} from"react-router-dom"
import Nav from "../Components/Nav"
import Home from "../Components/Home" 
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import ExploreMore from "../Components/ExploreMore"
import Login from "../Components/login"

const CustomRoute = () => {
  return (
      <>  
       <Routes>
        <Route path="/" element={<Nav />}>
          <Route index element={<ExploreMore />} />
           <Route  element={<ProtectedRoute/>}>
             <Route path="/home" element={<Home/>} />
           </Route>
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
      </>
  )
}

export default CustomRoute