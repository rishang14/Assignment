import { useState, useEffect } from "react";
import axios from 'axios';
import CustomRoute from "./Custom route/CustomRoute";

const App = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products?skip=29');
        setData(response.data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    fetchData();
  }, []);


  return (
    <div> 
      <CustomRoute/>
      {/* <div className="flex flex-row border-2 justify-between flex-wrap" >
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
      </div>  */}
      
    </div>
  );
};

export default App;
