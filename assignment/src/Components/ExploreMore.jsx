import axios from "axios";
import { useEffect, useState } from "react"; 
import CardCompnent from "./CardCompnent"; 
import Loader from "./Loader"; 
import { useAuth } from "../Authentication/Authcontext";


const ExploreMore = () => {  
    const[category,setCategory]=useState([]); 
    const [categoryData,setCategoryData]=useState([]) 
    const [loader, setloader]= useState(true)  
    const {addToCart,cart,user}=useAuth() 
     
    const itemIsInCart =(itemid)=>{
      return user && cart.some((item)=>  item.id === itemid)
    }

     
    useEffect(()=>{  
      try{
      const fetchResponse= async()=>{ 
        const categoriesResponse=await axios.get(`https://dummyjson.com/products/categories`)  
        console.log(categoriesResponse) 
        setCategory(categoriesResponse.data)
        const initialCategoriesProductResponse= await axios.get(`https://dummyjson.com/products/category/smartphones`) 
        console.log(initialCategoriesProductResponse.data) 
        setCategoryData(initialCategoriesProductResponse.data.products) 
        setloader(false)
      } 
      fetchResponse()
    }catch(error){ 
      alert(error) 
      setloader(false)

      }
       
      
    },[])   
      const handleCategoryClick=async(categoryValues)=>{
        const response= await axios.get(`https://dummyjson.com/products/category/${categoryValues}`) 
        setCategoryData(response.data.products)
      }
    console.log(categoryData) 

    const handleAddToCartButton=(item)=>{  
      if(user){
      if(itemIsInCart(item.id)){
        alert("item already in a cart")
      } else{

        addToCart(item); 
        alert("item added to the cart")
      }
    }else{ 
      alert("please login to access these feature")

    }}
  return (
   <>  
   {
     loader ?   <div className="absolute top-[40%] left-[45%]">
     <Loader/> 
       </div> :  <div className="mt-[40px] mx-auto max-w-[75rem] px-0 py-[4rem] "> 
   <div className="flex flex-wrap justify-center items-center  flex-row gap-2" >
    {
        category.map((item,index)=>{
         return(
            <button className="bg-gray-200 text-black font-[Poppins] duration-500 mx-2 px-2 my-2 py-2 hover:bg-violet-600 rounded" key={index} onClick={()=>handleCategoryClick(item)}>{item}</button>
         )
        })
    }
   </div> 
   <div className="flex flex-row  justify-center flex-wrap  " > 
        {categoryData.map((item) => (  
            <CardCompnent   
            key={item.id}
            title={item.title} 
            discount={item.discountPercentage}
            id={item.id} 
            price={item.price} 
            stock={item.stock} 
            rating={item.rating} 
            img={item.thumbnail} 
            brand={item.brand} 
            description={item.description} 
            handleCartButton={()=>handleAddToCartButton(item)}
            
            />
        ))}
      </div>  
   </div>
   }
   </>
  )
}

export default ExploreMore; 
