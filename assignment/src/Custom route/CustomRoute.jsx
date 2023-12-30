import {Routes,Route} from"react-router-dom"
import Nav from "../Components/Nav"

const CustomRoute = () => {
  return (
      <>  
      <Routes>
        <Route path="/" element={<Nav/>} 
         
         />
      </Routes>
      </>
  )
}

export default CustomRoute