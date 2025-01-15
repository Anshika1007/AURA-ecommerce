import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import VerticalCardProduct from "../components/VerticalCardProduct";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import Context from "../context";
import addToCart from "../helpers/addToCart";

const ProductDetails = () => {
  const [data, setData] = useState({
    ProductName: "",
    BrandName: "",
    Category: "",
    ProductImage: [],
    Description: "",
    Price: "",
    SellingPrice: "",
  });
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const { fetchUserAddToCart } = useContext(Context);

  const navigate = useNavigate();

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.productDetails.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: params?.id }),
      });

      const dataResponse = await response.json();
      setData(dataResponse?.data);
      setActiveImage(dataResponse?.data?.ProductImage[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params.id]);

  const handleMouseEnterProduct = (imgURL) => {
    setActiveImage(imgURL);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({ x, y });
  }, []);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };
  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };
  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-2">
        {/* product image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              alt=""
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />

            {/* product zoom */}
            {zoomImage && (
              <div className="absolute min-w-[500px] min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0 hidden lg:block overflow-hidden">
                <div
                  className="w-full h-full mix-blend-multiply min-h-[400px] min-w-[500px] scale-150"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((_, index) => (
                  <div
                    className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                    key={index}
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.ProductImage?.map((imgURL, index) => (
                  <div
                    key={index}
                    className="h-20 w-20 bg-slate-200 rounded p-1"
                  >
                    <img
                      src={imgURL}
                      className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                      onClick={() => handleMouseEnterProduct(imgURL)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* product details */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse h-6 w-full rounded-full inline-block lg:h-8"></p>
            <h2 className="text-2xl lg:text-2xl font-medium bg-slate-200 animate-pulse h-6 w-full"></h2>
            <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 w-full lg:h-8"></p>

            <div className="text-yellow-400 flex items-center gap-1 bg-slate-200 animate-pulse h-6 w-full lg:h-8"></div>

            <div className="flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl h-6 animate-pulse w-full lg:h-8">
              <p className="text-red-600 bg-slate-200 w-full"></p>
              <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
            </div>

            <div className="flex items-center gap-3 my-2 w-full">
              <button className="bg-slate-200 animate-pulse h-6 rounded w-full lg:h-8"></button>
              <button className="bg-slate-200 animate-pulse h-6 rounded w-full lg:h-8"></button>
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1 h-6 bg-slate-200 animate-pulse rounded w-full lg:h-8"></p>
              <p className="bg-slate-200 animate-pulse h-6 rounded w-full lg:h-12"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-blue-200 text-blue-600 px-2 rounded-full inline-block w-fit">
              {data?.BrandName}
            </p>
            <h2 className="text-2xl lg:text-2xl font-medium">
              {data?.ProductName}
            </h2>
            <p className="capitalize text-slate-400">{data?.Category}</p>

            <div className="text-yellow-400 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl">
              <p className="text-red-600">
                {displayINRCurrency(data.SellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {displayINRCurrency(data.Price)}
              </p>
            </div>

            <div className="flex items-center gap-3 my-2">
              <button
                onClick={(e) => handleBuyProduct(e, data?._id)}
                className="px-3 py-1 min-w-[120px] rounded text-white bg-gradient-to-r from-[#3F51B5] to-[#9C27B0] hover:from-[#9C27B0] hover:to-[#3F51B5] font-medium"
              >
                Buy
              </button>
              <button
                onClick={(e) => handleAddToCart(e, data?._id)}
                className="px-3 py-1 min-w-[120px] rounded text-white bg-gradient-to-r from-[#3F51B5] to-[#9C27B0] hover:from-[#9C27B0] hover:to-[#3F51B5] font-medium"
              >
                Add To Cart
              </button>
            </div>

            <div>
              <p className="text-slate-600 font-medium my-1">Description :</p>
              <p>{data?.Description}</p>
            </div>
          </div>
        )}
      </div>

      {data.Category && (
        <CategoryWiseProductDisplay
          Category={data.Category}
          heading={"Recommended Products"}
        />
      )}
    </div>
  );
};

export default ProductDetails;
