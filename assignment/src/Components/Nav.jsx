import { Outlet } from "react-router-dom"
import {AiOutlineShoppingCart} from "react-icons/ai" 
import { Link } from "react-router-dom"
import { useState } from "react"

const Nav = () => { 
    const [count,setCount]=useState(0)
  return (
    <>  
      <nav className="p-5 bg-white shadow md:flex md:items-center md:justify-evenly">
    <div className="flex  items-center ">
      <span className="text-2xl font-[Poppins] cursor-pointer">
       Digital Store
      </span>

      <span className="text-3xl cursor-pointer mx-2 md:hidden block">
        <ion-icon name="menu" onclick="Menu(this)"></ion-icon>
      </span>
    </div>

    <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
      <li className="mx-4 my-6 md:my-0">
        <Link href="#" className="text-xl hover:text-cyan-500 duration-500">HOME</Link>
      </li>
      <li className="mx-4 my-6 md:my-0">
        <Link to={"/explore-more"} className="text-xl hover:text-cyan-500 duration-500">Explore More</Link>
      </li> 
      <Link to={"/cart"}>
      <button className="bg-cyan-200 text-white font-[Poppins] duration-500 px-6 py-2 mx-4 hover:bg-cyan-500 rounded ">
        <AiOutlineShoppingCart size={20}/> 
      </button> <span className="relative right-[54px] bottom-[14px]">{count}</span>
      </Link>
    </ul>
  </nav>

    <Outlet/>
    </>
  )
}

export default Nav