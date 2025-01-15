const {default:SummaryApi}=require("../common")

const fetchCategoryWiseProduct=async(Category)=>{
    const response=await fetch(SummaryApi.categoryWiseProduct.url,{
        method:SummaryApi.categoryWiseProduct.method,
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            "Category":Category
        })
    })
    const dataResponse=await response.json()

    return dataResponse
}
export default fetchCategoryWiseProduct