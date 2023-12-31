import { useState, useEffect } from "react";
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);  
  const [search,setSearch]=useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products?limit=51"
        ); 
        console.log(response.data) 
        const products=response.data.products
        setData(products); 
        setSearch(products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []); 
  const Filter = (e) => {
    const searchItem = e.target.value.toLowerCase();
  
    const filteredItems = data.filter(item =>
      item.title.toLowerCase().includes(searchItem)
    );
  
    setSearch(filteredItems);
  }; 

  const FilterViaPrice=()=>{
    const filteredItems= data.filter(item => item.price<500); 
    setSearch(filteredItems)
  }
  
  const FilterViaRating=()=>{
    const filteredItems=data.items(item => item.rating> 3); 
    setSearch(filteredItems)
  }

  return (
    <>  
    <div className="mt-[60px] mx-auto max-w-[75rem] px-0 py-[4rem]"> 
    <div className="flex justify-center items-center w-full md:w-[40px]">
        <input type="text" className="block w-[150%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" placeholder="Search Product" onChange={Filter} /> 
    
</div>
        <div className="flex justify-center flex-row mt-2 mb-3 flex-wrap"> <span className=" px-6 py-2 mx-4">
          Sort via
        </span>
        <button className=" text-black font-[Poppins] duration-500 px-6 py-2 mx-4 hover:bg-cyan-500 rounded border-black border-2" onClick={FilterViaPrice}>less than 500</button> 
        <button className=" text-black font-[Poppins] duration-500 px-6 py-2 mx-4 hover:bg-cyan-500 rounded border-black border-2 " onClick={FilterViaPrice}>3 rating </button> 
        <button className=" text-black font-[Poppins] duration-500 px-6 py-2 mx-4 hover:bg-cyan-500 rounded border-black border-2">more than 1000</button>  
        </div> 

 
    <div className="flex flex-row  justify-center flex-wrap  " > 
        {search.map((item) => (
          <div key={item.id} className="flex  flex-row flex-wrap w-[350px] h-[350px]  border-black  border-2  m-2 p-2">  
          <div className=" border-black border-2">

            <img src={item.thumbnail} alt={item.name} className="object-cover w-full h-[250px]"/>
          </div> 
          <div className="">

            <p className="p-2 text-l"> {item.title}</p>  
            <p className="p-2 "> Rs:{item.price}</p> 
            <p className="p-2">{item.rating}</p>
          </div>
          </div>
        ))}
      </div>  
      </div>
    </>
  )
};

export default Home;
