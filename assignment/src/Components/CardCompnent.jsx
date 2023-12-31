

const CardCompnent = ({title,discount,id ,price,rating ,description,img,stock,brand}) => {
  return (
    <>
     <div className="bg-white text-gray-700 w-72 min-h-[8rem] shadow-lg rounded-md overflow-hidden m-2 gap-2" key={id}>
       <img className="w-full h-[200px] object-cover rounded-lg" src={img} alt={title} /> 
       <div className="p-5 flex flex-col gap-3">  

       <div className="flex items-center gap-2">
         <span className="px-3 py-1 rounded-full text-xs bg-gray-100">stock available-{stock}</span> 
         <span className="px-3 py-1 rounded-full text-xs bg-gray-100">{brand}</span>
       </div> 
       <h2 className="font-semibold text-2xl overflow-ellipsis overflow-hidden whitespace-nowrap "> 
        {title}
       </h2>      
       <div>
        <span className="text-xl font-bold">
           Rs- {price}
             </span> 
        <div className="flex items-center gap-2 mt-1">
          <span className="bg-green-400 px-1.5 py-0.5 rounded-md text-xs text-white">
           discount-  {discount}
          </span>
        </div>
       </div>  
       <div className="flex items-center gap-2 mt-1">

       <span className=" bg-green-400 px-1.5 py-0.5  rounded-md text-xs text-white">
       rating- {rating}
       </span> 
        
       </div>
        <div className="mt-5 flex gap-2"> 
        <button className="bg-cyan-500/80 hover:bg-cyan-500/90 px-6 py-2 rounded-md text-white font-medium tracking-wider transition">Add to Cart</button>
            <button className="flex-grow flex justify-center items-center bg-gray-300/60 hover:bg-gray-300/80 transition rounded-md">
            <ion-icon name="eye-outline"></ion-icon>
                </button> 
        </div>

       </div>
     </div>
    
    </>
  )
}

export default CardCompnent