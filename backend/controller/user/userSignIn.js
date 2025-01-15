const bcrypt=require('bcryptjs')
const userModel=require('../../models/userModel')
const jwt = require('jsonwebtoken');


async function userSignInController(req,res){
    try{
        console.log("reached");
        const {email,password}=req.body 
        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }

        const user =await userModel.findOne({email})

        if(!user){
            throw new Error("User not found")
        }
        const checkpassword= await bcrypt.compare(password,user.password)
        console.log('checkpassword',checkpassword)



        if(checkpassword){
            const tokendata={
                _id:user._id,
                email:user.email,

            }
           const token =  await jwt.sign(tokendata,process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

           const tokenoption={
            httpOnly:true,

            secure:true,
            sameSite:'None'
           }

           res.cookie("token",token,tokenoption).status(200).json({
            message :"Login Successfully",
            data:token,
            success:true,
            error:false
           })
              

        }
        else{
            throw new Error("Please Check Password")
        }
        

        

    }
    catch(err){
        res.json({
            message:err.message||err,
            error:true,
            success:false,
        })
    }

}

module.exports= userSignInController