import axios from "axios";
import { useEffect, useState } from "react";


const ExploreMore = () => {  
    const[category,setCategory]=useState([]); 
    const [categoryData,setCategoryData]=useState([])
     
    useEffect(()=>{
      const fetchResponse= async()=>{ 
        const categoriesResponse=await axios.get(`https://dummyjson.com/products/categories`)  
        // console.log(categoriesResponse) 
        setCategory(categoriesResponse.data)
        const initialCategoriesProductResponse= await axios.get(`https://dummyjson.com/products/category/smartphones`) 
        console.log(initialCategoriesProductResponse.data) 
        setCategoryData(initialCategoriesProductResponse.data.products)
       
      } 
      fetchResponse()
    },[])   
      const handleCategoryClick=async(categoryValues)=>{
        const response= await axios.get(`https://dummyjson.com/products/category/${categoryValues}`) 
        setCategoryData(response.data.products)
      }
    console.log(categoryData)
  return (
   <> 
   <div className="mt-[40px] mx-auto max-w-[75rem] px-0 py-[4rem] "> 
   <div className="flex flex-wrap justify-center items-center  flex-row gap-2" >
    {
        category.map((item)=>{
         return(
            <button className="bg-gray-200 text-black font-[Poppins] duration-500 mx-2 px-2 my-2 py-2 hover:bg-cyan-600 rounded" key={item} onClick={()=>handleCategoryClick(item)}>{item}</button>
         )
        })
    }
   </div> 
   <div> 
    {
        categoryData.map((item)=>{
            return(
                <div key={item.id}>
                    {item.title}
                </div>
            )
        })
    }
   </div>
   </div>
   </>
  )
}

export default ExploreMore; 
