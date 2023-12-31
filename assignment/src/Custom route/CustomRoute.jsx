import {Routes,Route} from"react-router-dom"
import Nav from "../Components/Nav"
import Home from "../Components/Home"
import ExploreMore from "../Components/ExploreMore"

const CustomRoute = () => {
  return (
      <>  
      <Routes>
        <Route path="/" element={<Nav/>} >
         <Route index element={<Home/>}/> 
         <Route path="/categories" element={<ExploreMore/>}/>
         </Route>
      </Routes>
      </>
  )
}

export default CustomRoute