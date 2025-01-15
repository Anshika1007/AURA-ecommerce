const addToCartModel=require("../../models/cartProduct")

const deleteAddToCartProduct=async(req,res)=>{
    try{
        const currentUserId=req.userId 
        const AddToCartProductId=req.body._id 

        const deleteProduct=await addToCartModel.deleteOne({_id:AddToCartProductId})

        res.json({
            message:"Product deleted successfully from the cart",
            error:false,
            success:true,
            data:deleteProduct


        })
    }catch(err){
        res.json({
            message:err?.message||err,
            error:true,
            success:false,
        })

    }
}

module.exports=deleteAddToCartProduct