const backenddomain=process.env.REACT_APP_BACKEND_URL.trim()

const SummaryApi={
    SignUp:{
        url:`${backenddomain}/api/signup`,
        method:`POST`
    },
    SignIn :{
        url:`${backenddomain}/api/signin`,
        method:`POST`
    },
    current_user:{
        url:`${backenddomain}/api/user-details`,
        method:`GET`

    },
    logout_user:{
        url:`${backenddomain}/api/userLogout`,
        method:`GET`

    },
    allUser:{
        url:`${backenddomain}/api/all-user`,
        method:`GET`


    },
    updateUser:{
        url:`${backenddomain}/api/update-user`,
        method:`POST`
    },
    uploadProduct:{
        url:`${backenddomain}/api/upload-product`,
        method:`POST`
    },
    allProduct:{
        url:`${backenddomain}/api/get-product`,
        method:`GET`
    },
    updateProduct:{
        url:`${backenddomain}/api/update-product`,
        method:`POST`
    },
    categoryProduct:{
        url:`${backenddomain}/api/get-categoryProduct`,
        method:'GET'
    },
    categoryWiseProduct:{
        url:`${backenddomain}/api/category-product`,
        method:'POST'
    },
    productDetails:{
        url:`${backenddomain}/api/product-details`,
        method:'POST'
    },
    addToCartProduct:{
        url:`${backenddomain}/api/addtocart`,
        method:'POST'
    },
    addToCartProductCount:{
        url:`${backenddomain}/api/countAddToCartProduct`,
        method:'GET'
    },
    addToCartProductView:{
        url:`${backenddomain}/api/view-cart-product`,
        method:'GET'
    },
   updateCartProduct:{
    url:`${backenddomain}/api/update-cart-product`,
    method:'POST'
   },
   deleteCartProduct:{
    url:`${backenddomain}/api/delete-cart-product`,
    method:'POST'
   },
   searchProduct:{
    url:`${backenddomain}/api/search`,
    method:'GET'
   },
   filterProduct:{
    url:`${backenddomain}/api/filter-product`,
    method:'POST'
   },
   payment:{
    url:`${backenddomain}/api/checkout`,
    method:'POST'
   },
   getOrder:{
    url:`${backenddomain}/api/order-list`,
    method:'GET'
   }



}


export default SummaryApi