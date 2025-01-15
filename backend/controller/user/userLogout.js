async function userLogout(req,res){
    try{
        const tokenoption={
            httpOnly:true,

            secure:true,
            sameSite:'None'
           }
        res.clearCookie("token",tokenoption)


        res.json({
            message:"Logged Out Successfully",
            error:false,
            success:true,
            data:[]
        })

    }
    catch(err){
  res.json({
    message:err.message || err,
    error:true,
    success:false,
})


    }
}

module.exports =userLogout