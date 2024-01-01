import { useState, useEffect } from "react";
import axios from "axios";
import CardCompnent from "./CardCompnent";
import Loader from "./Loader";

const Home = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [loading, setloading] = useState(true);

  // fetchings products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products?limit=51"
        );
        console.log(response.data);
        const products = response.data.products;
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
  }, []);

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
              className="block w-[150%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              placeholder="Search Product"
              onChange={Filter}
            />
          </div>
          <div className="flex justify-center flex-row mt-2 mb-3 flex-wrap">
            {" "}
            <span className=" px-6 py-2 mx-4">Sort via</span>
            <button
              className=" text-black font-[Poppins] duration-500 px-6 py-2 mx-4 hover:bg-cyan-500 rounded border-cyan-100 border-2 "
              onClick={FilterViaPrice500}
            >
              less than 500
            </button>
            <button
              className=" text-black font-[Poppins] duration-500 px-6 py-2 mx-4 hover:bg-cyan-500 rounded border-cyan-100 border-2 "
              onClick={FilterViaPrice1000}
            >
              more than 1000{" "}
            </button>
          </div>

          <div className="flex flex-row  justify-center flex-wrap  ">
            {search.map((item) => (
              <CardCompnent
                title={item.title}
                discount={item.discountPercentage}
                id={item.id}
                price={item.price}
                stock={item.stock}
                rating={item.rating}
                img={item.thumbnail}
                brand={item.brand}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
