import React,{useEffect,useState} from 'react'
import SummaryApi from '../common'
import {toast} from 'react-toastify'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {

  const[allUser,setAllUsers] = useState([])
  const [openUpdateRole,setOpenUpdateRole]=useState(false)
  const [updateUserDetails,setUpdateUserDetails]=useState({
    email:"",
    name:"",
    role:"",
    UserId:""
    
  })

  const fetchAllUsers= async()=>{
    // setAllUsers([]);
    const fetchData=await fetch(SummaryApi.allUser.url,{
      method:SummaryApi.allUser.method,
      credentials:'include'
    })

    const dataResponse=await fetchData.json()
    console.log("Fetched Users:", dataResponse);

    if (dataResponse.success){
      setAllUsers(dataResponse.data)
      console.log("State after setting users:", allUser); 
    }

    if(dataResponse.error){
      toast.error(dataResponse.message)
    }
    // console.log(dataResponse);
    
  }

  useEffect(()=>{
    fetchAllUsers()

  },[openUpdateRole])
  
  useEffect(() => {
    console.log("State after setting users:", allUser); 
  }, [allUser]);
  return (
   <div className='bg-white pb-4'>
    <table className='w-full usertable'>
      <thead>
      <tr> 
        <th>Sr.</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
        {/* <th>Created Date</th> */}
        </tr>
      </thead>

      <tbody className=''>
{
  allUser.map((el,index)=>{
    return (
      <tr className='bg-black text-white' >
        <td>{index+1}</td>
        <td>{el?.name}</td>
        <td>{el?.email}</td>
        <td> {el?.role} </td>
        <td>
          <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white ' onClick={()=>{
            setUpdateUserDetails(el)
            setOpenUpdateRole(true)
          }}
          
          >
          <MdModeEdit />
          </button>
        </td>
        {/* <td> {el?.createdAt} </td> */}
      </tr>
    )
  })
}
      </tbody>
    </table>
{
  openUpdateRole && (
    <ChangeUserRole 
    onClose={()=> setOpenUpdateRole(false)} 
    name={updateUserDetails.name}
      email={updateUserDetails.email}
      role={updateUserDetails.role}
      UserId={updateUserDetails._id}
      callFunc={fetchAllUsers}
    />

  )
}

   
   </div>
  )
}

export default AllUsers