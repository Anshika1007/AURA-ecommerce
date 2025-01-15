import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayINRCurrency from '../helpers/displayCurrency'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import { Link } from 'react-router-dom'

const SearchCard = ({loading,data=[]}) => {
    const loadingList=new Array(13).fill(null)
    const {fetchUserAddToCart
    } =useContext(Context)
    const handleAddToCart=async(e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart()
      }
  return (
  
    <div className=" grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] md:gap-4 overflow-x-scroll scrollbar-none transition-all justify-center md:justify-between" >
    

    {
     loading?(
       loadingList.map((product,index)=>{
           return(
               <div className="w-full min-w-[280px] md:min-w-[280px] max-w-[280px] md:max-w-[320px]  bg-slate-100 rounded-sm shadow ">
       <div className="bg-white  p-4 min-w-[120px] md:min-w-[145px] h-44 flex justify-center items-center animate-pulse">
       {/* <img src={product.ProductImage[0]} alt=""  className="object-scale-down h-full hover:scale-110 transition-all"/> */}

       </div>
       <div className="p-4 grid gap-3">
       <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 w-full animate-pulse bg-slate-200 rounded-full py-2"></h2>

       <p className="capitalize text-slate-500 p-1 w-full animate-pulse bg-slate-200 rounded-full py-2"></p>
       <div className="flex gap-3">
       <p className="text-red-600 font-medium p-1 w-full animate-pulse bg-slate-200 rounded-full py-2"></p>
       <p className="text-slate-500 line-through p-1 w-full animate-pulse bg-slate-200 rounded-full py-2"></p>
       </div>

       <button className= "text-white px-3  rounded-full text-sm p-1 w-full animate-pulse bg-slate-200 py-2 "></button>


       </div>
     </div>

           )
       })
     ):(
       data.map((product,index)=>{
           return(
               <Link to={"/product/"+product?._id}  className="w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px]  bg-slate-100 rounded-sm shadow " onClick={scrollTop}  >
       <div className="bg-white  p-4 min-w-[120px] md:min-w-[145px] h-44 flex justify-center items-center">
       <img src={product?.ProductImage[0]} alt=""  className="object-scale-down h-full hover:scale-110 transition-all"/>

       </div>
       <div className="p-4 grid gap-3">
       <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">{product?.ProductName}</h2>

       <p className="capitalize text-slate-500">{product?.Category}</p>
       <div className="flex gap-3">
       <p className="text-red-600 font-medium">{displayINRCurrency(product?.SellingPrice)}</p>
       <p className="text-slate-500 line-through">{displayINRCurrency(product?.Price)}</p>
       </div>

       <button
  onClick={(e) => handleAddToCart(e, product?._id)}
  className="px-3 py-1 rounded-full text-white bg-gradient-to-r from-[#3F51B5] to-[#9C27B0] hover:from-[#9C27B0] hover:to-[#3F51B5]"
>
  Add To Cart
</button>


       </div>
     </Link>

           )
       })
     )
      
     }
    </div>
  )
}

export default SearchCard