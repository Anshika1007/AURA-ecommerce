const productModel=require("../../models/productModel")

const getCategoryProduct=async(req,res)=>{
    try{
        const product=await productModel.distinct("Category")
        console.log('category',product);
        //array to store one product from each category
        const productByCategory=[]
        for(const Category of product){
            const product=await productModel.findOne({Category:Category})
            if(product){
                productByCategory.push(product)
            }
        }

        res.json({
            message:"category product",
            data:productByCategory,
            success:true,
            error:false
        })
        
    }catch(err){
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}

module.exports=getCategoryProduct;
