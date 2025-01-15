// import React, { useEffect, useState } from 'react'
// import SummaryApi from '../common'
// import { Link } from 'react-router-dom'

// const CategoryList = () => {
//     const[categoryProduct,setCategoryProduct]=useState([])
//     const[loading,setLoading]=useState(true)

//     const categoryLoading=new Array(10).fill(null)

//     const fetchCategoryProduct=async()=>{
//         setLoading(false)
//         const response=await fetch(SummaryApi.categoryProduct.url)
//         const dataResponse=await response.json()
//         setCategoryProduct(dataResponse.data)
//     }
//     useEffect(()=>{
//         fetchCategoryProduct()
//     },[])
//   return (
//     <div className='container mx-auto p-4'>
//     <div className='flex items-center gap-3 justify-between overflow-scroll scrollbar-none'>
//     {

//         loading ?(
            
//                 categoryLoading.map((el,index)=>{
//                     return(
//                         <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading" +index}>

// </div>

//                     )
//                 })
           
           
//         ):(
//             categoryProduct.map((product,index)=>{
//             return(
//                 <Link to={"/product-Category?.category="+product?.Category} className='cursor-pointer' key={product?.Category }>
//                     <div className=' w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
//                         <img src={product?.ProductImage[0]} alt={product?.Category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
//                     </div>
//                     <p className='text-center text-sm md:text-base capitalize'>
//                         {product?.Category}
//                     </p>
//                 </Link>
//             )
//         })
//         )
        
//     }
//     </div>
//     </div>
//   )
// }

// export default CategoryList
import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryLoading = new Array(10).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setCategoryProduct(dataResponse.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-3 justify-between overflow-scroll scrollbar-none">
        {loading ? (
          categoryLoading.map((el, index) => {
            return (
              <div
                className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                key={"categoryLoading" + index}
              ></div>
            );
          })
        ) : (
          categoryProduct.map((product, index) => {
            return (
              <Link
                to={`/product-Category?Category=${encodeURIComponent(product?.Category)}`}
                className="cursor-pointer"
                key={product?.Category}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                  <img
                    src={product?.ProductImage[0]}
                    alt={product?.Category}
                    className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                  />
                </div>
                <p className="text-center text-sm md:text-base capitalize">
                  {product?.Category}
                </p>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CategoryList;
