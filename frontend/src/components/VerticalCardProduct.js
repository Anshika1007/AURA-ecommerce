import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";
import Context from "../context";

const VerticalCardProduct = ({ Category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(Category);
    setLoading(false);
    // console.log('horizontal data',categoryProduct.data);

    setData(categoryProduct?.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading
          ? loadingList.map((product, index) => {
              return (
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

                    <button className="text-white px-3  rounded-full text-sm p-1 w-full animate-pulse bg-slate-200 py-2 "></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={"product/" + product?._id}
                  className="w-full min-w-[280px] md:min-w-[280px] max-w-[280px] md:max-w-[320px]  bg-slate-100 rounded-sm shadow "
                >
                  <div className="bg-white  p-4 min-w-[120px] md:min-w-[145px] h-44 flex justify-center items-center">
                    <img
                      src={product.ProductImage[0]}
                      alt=""
                      className="object-scale-down h-full hover:scale-110 transition-all"
                    />
                  </div>
                  <div className="p-4 grid gap-3">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                      {product?.ProductName}
                    </h2>

                    <p className="capitalize text-slate-500">
                      {product?.Category}
                    </p>
                    <div className="flex gap-3">
                      <p className="text-red-600 font-medium">
                        {displayINRCurrency(product?.SellingPrice)}
                      </p>
                      <p className="text-slate-500 line-through">
                        {displayINRCurrency(product?.Price)}
                      </p>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(e, product?._id)}
                      className="px-3 py-1 rounded-full text-white bg-gradient-to-r from-[#3F51B5] to-[#9C27B0] hover:from-[#9C27B0] hover:to-[#3F51B5]"
                    >
                      Add To Cart
                    </button>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
