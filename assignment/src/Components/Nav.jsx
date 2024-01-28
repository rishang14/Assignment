import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useAuth } from "../Authentication/Authcontext";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const { user, logout,cart } = useAuth(); 
  const handleLogut = () => {
    logout();
  }; 
    
  const calculateTotal = (cart) => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <>
      <div className="shadow-md w-full fixed top-0 left-0 z-[10] ">
        <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
          <Link to={"/"}>
            <div
              className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
            >
              <span className="text-3xl text-violet-600 mr-1 pt-2">
                <ion-icon name="logo-ionic"></ion-icon>
              </span>
              Digital stores
            </div>
          </Link>

          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            <ion-icon name={open ? "close" : "menu"}></ion-icon>
          </div>

          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-20 " : "top-[-490px]"
            }`}
          >
            <li className="mx-4 my-6 md:my-0">
              <Link
                to={"/home"}
                className="text-xl hover:text-violet-500 duration-500"
              >
                HOME
              </Link>
            </li>
            <li className="mx-4 my-6 md:my-0">
              <Link
                to={"/"}
                className="text-xl hover:text-violet-500 duration-500"
              >
                Explore-more
              </Link>
            </li>
            {user ? (
              <>
                <li className="mx-4 my-6 md:my-0">welcome,{user.firstName}!</li>
                <li>
                  <button onClick={handleLogut} className=" hover:text-violet-500">Logout</button>
                </li>
              </>
            ) : (
              <li className="mx-4 my-6 md:my-0">
                <Link
                  to={"/login"}
                  className="text-xl hover:text-violet-500 duration-500"
                >
                  Login
                </Link>
              </li>
            )}
            <Link to={"/cart"}>
              <button className="bg-violet-300 text-white font-semibold  duration-500 px-6 py-2 mx-4 hover:bg-violet-800 rounded ">
                <AiOutlineShoppingCart size={25} />
              </button>
            </Link> 
            <p className="text-xs">items-{cart.length}</p> <br />
            <p className="text-xs">price-Rs.{calculateTotal(cart)}</p><br />
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Nav;
