import React ,{useState}from 'react'
import loginIcons from '../assest/login.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {

  const [showpassword,setshowpassword]=useState(false)

  const[showconfirmpassword,setshowconfirmpassword]=useState(false)

const[data,setdata]=useState({
  email:"",
  password:"",
  name:"",
  confirmPassword:"",
  profilePic:""

})
const navigate=useNavigate()

const handleOnChange=(e)=>{
  const{name,value}=e.target 

  setdata((preve)=>{
    return{
      ...preve,
      [name]:value

    }
  })
}

const handleuploadpic=async(e)=>{
  const file=e.target.files[0]
  const imagePic=await  imageTobase64(file)
  
  setdata((preve)=>{
    return{
      ...preve,
      profilePic:imagePic
    }
  })
  

}

const handleSubmit=async(e)=>{
  e.preventDefault()

  if(data.password===data.confirmPassword){
    // console.log('SummaryApi.signUp.url',SummaryApi.SignUp.url);
    
    const dataResponse=await fetch(SummaryApi.SignUp.url,{
      method:SummaryApi.SignUp.method,
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    })
  
    const dataapi = await dataResponse.json()

    if(dataapi.success){
      toast.success(dataapi.message)
      navigate("/login")
    }

    if(dataapi.error){
      toast.error(dataapi.message)
    }

    
    
  }else{
    toast.error('Please Check Password and confirm password')
    console.log();
    
  }
  
  }

  

  return (
    <section id='signup'>
    <div className='mx-auto container px-4'>

    <div className='bg-white  p-5  w-full max-w-sm mx-auto  '>



    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
    <div>
    <img src={data.profilePic || loginIcons} alt="Profile" className='w-full h-full object-cover' />
    </div>
<form >
<label>
<div className='text-xs bg-slate-200 text-center pb-4 pt-2 absolute bottom-0 w-full bg-opacity-75 cursor-pointer'>
      Upload Photo
    </div>
    <input type='file' className='hidden ' onChange={handleuploadpic}/>
</label>
    
</form>
    </div>
    
    <form className='pt-6 flex flex-col gap-2 ' onSubmit={handleSubmit} >

    <div className='grid'>
        <label>Name:</label>
        
        <div className='bg-slate-100 p-2'>
<input type="text" 
placeholder='Enter Your Name' 
name='name'
value={data.name}
onChange={handleOnChange}
required
className='w-full h-full outline-none bg-transparent' />
        </div>
      </div>

      <div className='grid'>
        <label>Email:</label>
        
        <div className='bg-slate-100 p-2'>
<input type="email" 
placeholder='Enter Email' 
name='email'
value={data.email}
onChange={handleOnChange}
required
className='w-full h-full outline-none bg-transparent' />
        </div>
      </div>

      <div>
        <label>Password:</label>
        <div className='bg-slate-100 p-2 flex'>
        <input type={showpassword ? "text" : "password"} 
       placeholder='Enter Password' 
       value={data.password}
       name='password'
        onChange={handleOnChange}
        required
        className='w-full h-full outline-none bg-transparent' />
        <div className='cursor-pointer text-xl ' onClick={()=>setshowpassword((preve)=>!preve)}>
          <span>
          {
            showpassword ? (
              <FaEyeSlash />
            )
            :
            (
              <FaEye />
            )
          }
         
          

          </span>
        </div>
        </div>

       
      </div>

      <div>
        <label>Confirm Password:</label>
        <div className='bg-slate-100 p-2 flex'>
        <input type={showconfirmpassword ? "text" : "password"} 
       placeholder='Enter Confirm Password' 
       value={data.confirmPassword}
       name='confirmPassword'
        onChange={handleOnChange}
        required
        className='w-full h-full outline-none bg-transparent' />
        <div className='cursor-pointer text-xl ' onClick={()=>setshowconfirmpassword((preve)=>!preve)}>
          <span>
          {
            showconfirmpassword ? (
              <FaEyeSlash />
            )
            :
            (
              <FaEye />
            )
          }
         
          

          </span>
        </div>
        </div>

        
      </div>



      <button
  className='bg-gradient-to-r from-[#3F51B5] to-[#9C27B0] text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'
>
  Sign Up
</button>
    </form>

    <p className='my-5'>Already Have Account ?<Link to={"/login"} className='hover:text-red-800 text-blue-600 hover:underline ' >Login
    </Link> </p>

    </div>

    </div>
   </section>
  )
}

export default SignUp