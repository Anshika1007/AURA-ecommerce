
import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCont).fill(null);

  const fetchData = async () => {
    //setLoading(true);
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoading=async()=>{
   await fetchData();
  }

  useEffect(() => {
    setLoading(true)
    handleLoading()
    setLoading(false)
    
  }, []);

  console.log("cart data", data);

  const increaseQty = async (id, qty) => {
    try {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id:id,quantity: qty + 1 }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        // After successful update, fetch the latest cart data
        fetchData();
      } else {
        console.error("Failed to update quantity:", responseData.message);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const decreaseQty = async (id, qty) => {
    if(qty>=2){try {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id:id,quantity: qty - 1 }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        // After successful update, fetch the latest cart data
        fetchData();
      } else {
        console.error("Failed to update quantity:", responseData.message);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }}


  const deleteCartProduct=async(id)=>{
    const response=await fetch(SummaryApi.deleteCartProduct.url,{
      method:SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(
        {
          _id:id,

        }
      )
    })
    const responseData=await response.json()

    if(responseData.success){
      fetchData()
      context.fetchUserAddToCart()
    }
  }
const handlePayment=async()=>{
  const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
  const response=await fetch(SummaryApi.payment.url,{
    method:SummaryApi.payment.method,
    credentials: "include",
    headers:{
      "Content-Type": "application/json",
    },
    body:JSON.stringify({
      cartItems:data
    })
  })
  const responseData=await response.json()

  if(responseData?.id){
    stripePromise.redirectToCheckout({sessionId:responseData.id})
  }


  console.log("payment response",responseData);
  
}

  const totalQty=data.reduce((previousValue,currentValue)=>previousValue+currentValue.quantity,0)

  const totalPrice=data.reduce((preve,curr)=>preve+(curr.quantity * curr?.productId?.SellingPrice ),0)
  


  

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Item in Cart</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 justify-between p-4">
        {/* view products */}
        <div className="w-full max-w-3xl">
          {loading ? (
            loadingCart?.map((el, index) => (
              <div
                className="w-full bg-white-300 h-32 my-2 border border-slate-300 animate-pulse rounded bg-slate-200"
                key={el+"Add to cart loading"+index}
              ></div>
            ))
          ) : (
            data.map((product) => (
              <div
                key={product?._id}
                className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
              >
                {/* Render product details */}
                <div className="w-28 h-32 bg-slate-200">
                  <img
                    src={product?.productId?.ProductImage[0]}
                    className="w-full h-full object-scale-down mix-blend-multiply"
                  />
                </div>

                <div className="px-4 py-2 relative">
                {/* delete product */}
                <div
                    className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer" onClick={() => deleteCartProduct(product?._id)}
                  >
                <MdDelete />

                </div>
                  <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1 ">
                    {product?.productId?.ProductName}
                  </h2>
                  <p className="capitalize text-slate-500 ">
                    {product?.productId?.Category}
                  </p>
                  <div className="flex items-center justify-between">
                  <p className="text-red-500 font-medium text-lg">
                    {displayINRCurrency(product?.productId?.SellingPrice)}
                  </p>
                  <p className="text-slate-600 font-semibold text-lg">
                    {displayINRCurrency(product?.productId?.SellingPrice*product.quantity)}
                  </p>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <button className="border border-blue-600 text-blue-600 w-6 h-6 flex justify-center items-center rounded hover:bg-blue-600 hover:text-white" onClick={() =>
                        decreaseQty(product?._id,product?.quantity)
                      }>
                      -
                    </button>
                    <span>{product?.quantity}</span>
                    <button
                      className="border border-blue-600 text-blue-600 w-6 h-6 flex justify-center items-center rounded hover:bg-blue-600 hover:text-white"
                      onClick={() =>
                        increaseQty(product?._id,product?.quantity)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* total products */}

        {
          data[0]&&(
            <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse">
              Total
            </div>
          ) : (
            <div className="h-36 bg-white">
            <h2 className="text-white bg-gradient-to-r from-[#3F51B5] to-[#9C27B0] px-4 py-1">
  Summary
</h2>
           <div  className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
            <p>Quantity</p>
            <p> {totalQty} </p>
           </div>
            
            <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
            <p>Total Price</p>
            <p>{displayINRCurrency(totalPrice)}</p>

            </div>

            <button className="bg-gradient-to-r from-[#3F51B5] to-[#9C27B0] text-white p-1 w-full" onClick={handlePayment}>
  Payment
</button>

            </div>
          )}
        </div>

          )
        }
      
      </div>
    </div>
  );
};

export default Cart;
