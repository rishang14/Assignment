import React, { useEffect, useState } from 'react' 
import { useAuth } from '../Authentication/Authcontext';

const Review = () => {    
    const {id,user}=useAuth()
    const [reviews,setReviews]=useState([]); 

    const [newReviews,setNewReviews]=useState('')
  
     
    useEffect(()=>{  
        const storedReview =JSON.parse(localStorage.getItem(`reviews_${id}`)) || [] 
        setReviews(storedReview);
     

    },[id]) 
    const handlereviewSubmit=()=>{ 
        const reviewid= Date.now(); 

        if(newReviews !=="" && user) 
        {
            const updateReview=[...reviews,{id:reviewid,content:newReviews}]; 
            setReviews(updateReview); 
            setNewReviews('') 
            localStorage.setItem(`reviews_${id}`,JSON.stringify(updateReview))

        }else{
            alert("either you are not logged in or textarea is blank") 
            setNewReviews('')
        }

    }
    
  return (
    <>   
    <div className=' flex  flex-col  mt-[50px] '> 
    <h2 className='text-3xl font-bold mb-[40px]'>Write Reviews About Product</h2>

  
    <div className='flex'> 
        
        <textarea className='block p-2.5  w-[50%] h-[50px]  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-300 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'  value={newReviews} onChange={(e)=>setNewReviews(e.target.value)}  cols="10" rows="10" placeholder='Submit review'></textarea> 
    
        <button onClick={handlereviewSubmit} className='bg-violet-800 text-white font-semibold  rounded-xl  p-2 m-2'>Add Review</button>
        
    </div>  
    </div>
    <div>
        <ul>
        
           {
            reviews.map((item) =>{
                return(
                    <li className='border-black  border rounded-xs p-3 w-[70%]  m-3 ' key={item.id}>
                      *  {item.content}
                    </li>
                )
            })
           }
         
        </ul>
    </div> 
    </>
  )
}

export default Review;