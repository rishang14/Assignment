import { useState, useEffect } from "react";
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products?limit=33&skip=29"
        ); 
        console.log(response.data)
        setData(response.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>  
    <div className="mt-[60px] mx-auto max-w-[75rem] px-0 py-[4rem]"> 
    <div className="flex justify-center items-center w-full flex-row">
    <form>
        <input type="text" className="block w-[150%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" placeholder="Search Product" />
    </form>
</div>

 
    <div className="flex flex-row  justify-center flex-wrap  " > 
        {data.map((item) => (
          <div key={item.id} className="flex  flex-col flex-wrap w-[350px] h-[350px]  border-black  border-2  m-2 p-2">  
          <div className=" border-black border-2">

            <img src={item.thumbnail} alt={item.name} className="object-cover w-full h-[250px]"/>
          </div> 
          <div className="flex">

            <p className="p-2 w-[full] "> {item.title}</p>  
            <p className="p-2 "> Rs:{item.price}</p>
          </div>
          </div>
        ))}
      </div>  
      </div>
    </>
  )
};

export default Home;
