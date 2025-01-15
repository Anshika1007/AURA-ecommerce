// const jwt =require('jsonwebtoken')
// const { TOKEN_SECRET_KEY } = process.env;


// async function authToken(req,res,next){
//     try{
//         const token=req.cookies?.token

//         console.log('token',token);
        

//         if(!token){
//           return res.status(200).json({
//             message:"user not found",
//             error:true,
//             success:false
//           })
//         }

//         jwt.verify(token,process.env.TOKEN_SECRET_KEY, function(err, decoded) {
//             console.log(err);
//             console.log("decoded",decoded);

            

//             if(err){
//               console.log('error auth ',err);
              
//             }

//             req.userId=decoded.userId;

//             next()


            
            
//           });


          
//         // console.log('token/        -',token);
        
//     }
//     catch(err){
//         res.status(400).json({
//             message:err.mesaage||err,
//             data:[],
//             error:true,
//             success:false
//         })

//     }
// }

// module.exports=authToken

const jwt = require('jsonwebtoken');
const { TOKEN_SECRET_KEY } = process.env;

async function authToken(req, res, next) {
    try {
        // const token = req.cookies?.token;
        const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];

        //console.log('Token:', token);

        if (!token) {
            return res.status(401).json({
                message: 'Login is Required..!',
                error: true,
                success: false
            });
        }

        jwt.verify(token, TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log('Error verifying token:', err);
                return res.status(401).json({
                    message: 'Invalid token',
                    error: true,
                    success: false
                });
            }

            console.log('Decoded Token:', decoded);

            req.userId = decoded._id; // Extract userId from decoded token
            next();
        });
    } catch (err) {
        console.error('Error in authToken middleware:', err.message);
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
