import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { useAuth } from "../Authentication/Authcontext"; 
import Review from "./Review";
import { useNavigate } from "react-router-dom";
const SingleProduct = () => { 
  const [product, setproduct] = useState({});
  const [loading, setloading] = useState(true);
  const [img, setimg] = useState([]);
  const [activeImg, setActiveImage] = useState();
  const { id, addToCart, user, cart } = useAuth();   
  const navigate=useNavigate()
  const itemIsInCart = (itemid) => {
    return user && cart.some((item) => item.id === itemid);
  }; 

  useEffect(() => {
    const SingleProduct = async () => {
      try {
        const { data: data } = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        console.log(data);
        setproduct(data); 
        setloading(false);
        setimg(data.images);
        setActiveImage(data.images[0]);
      } catch (error) { 
     navigate("/home")


      }
    };
    SingleProduct();
  }, [id]);
  const handleAddToCartButton = (item) => {
    if (user) {
      if (itemIsInCart(item.id)) {
        alert("item already in a cart");
      } else {
        addToCart(item);
        alert("item added to the cart");
      }
    } else {
      alert("please login to access these feature");
    }
  };
  return (
    <>
      {loading ? (
        <div className="absolute top-[40%] left-[45%]">
          <Loader />
        </div>
      ) : ( 
   
        <div className="mt-[60px] mx-auto max-w-[75rem] px-0 py-[4rem]">
          <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
            <div className="flex flex-col gap-6 lg:w-2/4">
              <img
                src={activeImg}
                alt=""
                className="w-full h-[400px] aspect-square object-cover rounded-xl"
              />
              <div className="flex flex-row justify-between h-24">
                {img.map((item, index) => {
                  return (
                    <img
                      src={item}
                      alt={product.title}
                      key={index}
                      className="w-24 h-24 rounded-md cursor-pointer"
                      onClick={() => setActiveImage(item)}
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:w-2/4">
              <div>
                <span className=" text-violet-600 font-semibold">
                  {product.title}
                </span>
                <h1 className="text-3xl font-bold">{product.brand}</h1>
              </div>
              <p className="text-gray-700">{product.description}</p>
              <h6 className="text-2xl font-semibold">Rs.{product.price}</h6>
              <div className="flex flex-row items-center gap-12">
                <button
                  className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full"
                  onClick={() => handleAddToCartButton(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div> 
         
        <Review/> 
        </div>  
    
      )}
  </>
  );
};

export default SingleProduct;
