

import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import productCategory from "../helpers/productCategory";
import { MdCloudUpload } from "react-icons/md";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from 'react-toastify';

const AdminEditProduct = ({ onClose, productData,fetchdata }) => {
  const [data, setData] = useState({
    ...productData,
    ProductName: productData?.ProductName,
    BrandName: productData?.BrandName,
    Category: productData?.Category,
    ProductImage: productData?.ProductImage || [],
    Description: productData?.Description,
    Price: productData?.Price,
    SellingPrice: productData?.SellingPrice,
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => ({
      ...prev,
      ProductImage: [...prev.ProductImage, uploadImageCloudinary.url],
    }));
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.ProductImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({
      ...prev,
      ProductImage: newProductImage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchdata()
    } else {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-slate-200 bg-opacity-35">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Edit Product </h2>
          <div
            className="w-fit ml-auto text-3xl hover:text-red-600 cursor-pointer "
            onClick={onClose}
          >
            <IoCloseSharp />
          </div>
        </div>

        <form className="grid p-4 gap-2 overflow-y-scroll h-full pb-20" onSubmit={handleSubmit}>
          <label htmlFor="ProductName">Product Name :</label>
          <input
            type="text"
            id="ProductName"
            placeholder="Enter Product Name"
            name="ProductName"
            value={data.ProductName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="BrandName" className="mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            id="BrandName"
            placeholder="Enter Brand Name"
            name="BrandName"
            value={data.BrandName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="Category" className="mt-3">
            Category :
          </label>
          <select
            value={data.Category}
            onChange={handleOnChange}
            name="Category"
            className="p-2 bg-slate-100 border rounded"
            required
          >
            <option value="">Select Category</option>
            {productCategory.map((el, index) => (
              <option value={el.value} key={el.value + index}>
                {el.label}
              </option>
            ))}
          </select>

          <label htmlFor="ProductImage" className="mt-3">
            Product Image :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <MdCloudUpload />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  name="uploadImage"
                  onChange={handleUploadProduct}
                  required={!data.ProductImage.length} // conditionally required
                />
              </div>
            </div>
          </label>

          <div>
            {data?.ProductImage.length ? (
              <div className="flex items-center gap-2">
                {data.ProductImage.map((el, index) => (
                  <div className="relative group" key={index}>
                    <img
                      src={el}
                      alt={el}
                      width={80}
                      height={80}
                      className="bg-slate-100 border cursor-pointer"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 p-1 text-white bg-red-500 rounded-full hidden group-hover:block cursor-pointer"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-600 text-xs">*Please upload product image</p>
            )}
          </div>

          <label htmlFor="Price" className="mt-3">Price:</label>
          <input
            type="number"
            id="Price"
            placeholder="Enter Price"
            value={data.Price}
            name="Price"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="SellingPrice" className="mt-3">Selling Price:</label>
          <input
            type="number"
            id="SellingPrice"
            placeholder="Enter Selling Price"
            value={data.SellingPrice}
            name="SellingPrice"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="Description" className="mt-3">Description:</label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="Enter Product Description"
            rows={3}
            onChange={handleOnChange}
            name="Description"
            value={data.Description}
            required
          />

          <button className="px-2 py-2 bg-blue-600 text-white mb-10 hover:bg-blue-700">
            Update Product
          </button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )}
    </div>
  );
};

export default AdminEditProduct;
