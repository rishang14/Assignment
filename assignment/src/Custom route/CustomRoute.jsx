import {Routes,Route} from"react-router-dom"
import Nav from "../Components/Nav"
import Home from "../Components/Home"

const CustomRoute = () => {
  return (
      <>  
      <Routes>
        <Route path="/" element={<Nav/>} >
         <Route index element={<Home/>}/>
         </Route>
      </Routes>
      </>
  )
}

export default CustomRoute