const addToCartModel=require("../../models/cartProduct")

const addToCartController = async(req,res)=>{
    try{
        const {productId}=req?.body 
        const currentUser=req.userId 

        if (!productId || !currentUser) {
            return res.status(400).json({
              message: "Invalid product or user ID",
              success: false,
              error: true,
            });
          }
      

        const isProductAvailable=await addToCartModel.findOne({productId, userId:currentUser })

        if(isProductAvailable){
            return res.json({
                message:"Product is already in your cart",
                success:false,
                error:true
            })
        }

        const payload={
            productId,
            quantity:1,
            userId:currentUser,
        }

        const newAddToCart=await addToCartModel(payload)
        const saveProduct=await newAddToCart.save()

        return res.json({
            data :saveProduct,
            message:"Product added to cart successfully",
            success:true,
            error:false
        })


    }catch(err){
        res.json({
            message:err?.message || err,
            error :true,
            success:false
        })
    }
}

module.exports=addToCartController