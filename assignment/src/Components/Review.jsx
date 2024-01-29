import React, { useEffect, useState } from 'react' 
import { useAuth } from '../Authentication/Authcontext';

const Review = ({productid}) => {    
    const {id}=useAuth()
    const [reviews,setReviews]=useState([]); 

    const [newReviews,setNewReviews]=useState('')
  
     
    useEffect(()=>{  
        const storedReview =JSON.parse(localStorage.getItem(`reviews_${id}`)) || [] 
        setReviews(storedReview);
     

    },[id]) 
    const handlereviewSubmit=()=>{ 
        const reviewid= Date.now();

        const updateReview=[...reviews,{id:reviewid,content:newReviews}]; 
        setReviews(updateReview); 
        setNewReviews('') 
        localStorage.setItem(`reviews_${id}`,JSON.stringify(updateReview))
    }
    
  return (
    <> 
    <div>
        <textarea  value={newReviews} onChange={(e)=>setNewReviews(e.target.value)}  cols="30" rows="10" placeholder='Submit review'></textarea> 
        <button onClick={handlereviewSubmit}>submit review</button>
    </div> 
    <div>
        <ul>
        
           {
            reviews.map((item) =>{
                return(
                    <li key={item.id}>
                       {item.content}
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