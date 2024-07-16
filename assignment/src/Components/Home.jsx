import { useState, useEffect } from "react";
import axios from "axios";
import CardCompnent from "./CardCompnent";
import Loader from "./Loader";
import { useAuth } from "../Authentication/Authcontext";

const Home = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [loading, setloading] = useState(true);
  const { addToCart, cart, user, setCount } = useAuth();
  const [skip, setSkip] = useState(0);
  const [allProduct, setAllProducts] = useState(0);

  const itemIsInCart = (itemid) => {
    return user && cart.some((item) => item.id === itemid);
  };

  // fetchings total no of products
  useEffect(() => {
    const fetchallProduct = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        console.log(response.data.total);
        setAllProducts(response.data.total);
      } catch (error) {
        alert(error);
      }
    };
    fetchallProduct();
    return () => {
      fetchallProduct();
    };
  }, []);

  // fetching products to render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products?limit=18&skip=${skip}`
        );

        const products = response.data.products;
        console.log(products);
        setData(products);
        setSearch(products);
        setloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert(error);
        setloading(false);
      }
    };
    fetchData();
  }, [skip]);

  // filterig items
  const Filter = (e) => {
    const searchItem = e.target.value.toLowerCase();

    const filteredItems = data.filter((item) =>
      item.title.toLowerCase().includes(searchItem)
    );

    setSearch(filteredItems);
  };

  const FilterViaPrice500 = () => {
    const filteredItems = data.filter((item) => item.price < 500);
    setSearch(filteredItems);
  };

  const FilterViaPrice1000 = () => {
    const filteredItems = data.filter((item) => item.price > 1000);
    setSearch(filteredItems);
  };
  const setdefaultpage = () => {
    setSearch(data);
  };
  // Add to cart button
  const handleAddToCartButton = (item) => {
    if (user) {
      if (itemIsInCart(item.id)) {
        alert("item already in a cart");
      } else {
        addToCart(item);
        setCount((prevcount) => prevcount + 1);
        alert("item added to the cart");
      }
    } else {
      alert("please login to access these feature");
    }
  };

  //  handling pagination click
  const handlePaginationClick = (index) => {
    setSkip(index * 18);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {loading ? (
        <div className="absolute top-[40%] left-[45%]">
          <Loader />
        </div>
      ) : (
        <div className="mt-[60px] mx-auto max-w-[75rem] px-0 py-[4rem]">
          <div className="flex justify-center items-center w-full lg:w-[full] ">
            <input
              type="text"
              className="block w-[150%] p-[4px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              placeholder="Search Product"
              onChange={Filter}
            />
          </div>
          <div className="flex justify-center flex-row mt-2 mb-3 flex-wrap">
            {" "}
            <span className=" px-6 py-2 mx-4">Sort via :</span>
            <div className="flex  lg:flex-row flex-col gap-2">
              <button
                className=" text-black font-[Poppins] duration-500 px-6 py-2 mx-4 hover:bg-violet-500 rounded border-violet-200 border-2 "
                onClick={FilterViaPrice500}
              >
                less than 500
              </button>
              <button
                className=" text-black font-[Poppins] duration-500 px-6 py-2 mx-4 hover:bg-violet-500 rounded border-violet-200 border-2 "
                onClick={FilterViaPrice1000}
              >
                more than 1000{" "}
              </button>
              <button
                className=" text-black font-[Poppins] duration-500 px-6 py-2 mx-4  hover:bg-violet-500 rounded border-violet-200 border-2 "
                onClick={setdefaultpage}
              >
                Default Page
              </button>
            </div>
          </div>

          <div className="flex flex-row  justify-center flex-wrap  ">
            {search.map((item) => (
              <CardCompnent
                title={item.title}
                discount={item.discountPercentage}
                key={item.id}
                id={item.id}
                price={item.price}
                stock={item.stock}
                rating={item.rating}
                img={item.thumbnail}
                brand={item.brand}
                handleCartButton={() => handleAddToCartButton(item)}
              />
            ))}
          </div>
          <div className="flex items-center justify-center m-4 gap-[20px]">
            {Array.from({ length: Math.ceil(allProduct / 18) }).map(
              (_, index) => (
                <button
                  key={index + 1}
                  className="border border-cyan-400 p-3 rounded-md"
                  onClick={() => handlePaginationClick(index)}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
