const productModel = require("../../models/productModel")

const searchProduct=async(req,res)=>{
    try{
        const query=req.query.q 
        const regex=new RegExp(query,'i','g')

        const product=await productModel.find({
            "$or":[
                {
                    ProductName :regex
                },{
                    Category:regex
                }
            ]
        })

        res.json({
            data:product,
            message:"Product found successfully",
            error:false,
            success:true
        })


    }catch(err){
        res.json({
            message:err.message || err,
            err:true,
            success:false
        })
    }
}

module.exports=searchProduct