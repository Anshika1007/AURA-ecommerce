import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { FaSearch } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

import logoimage from '../assest/logosite.png'

const Header = () => {
  const user = useSelector((state) => state?.user?.user);

  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context=useContext(Context)
  const navigate=useNavigate()
  const searchInput=useLocation()
  const URLsearch=new URLSearchParams(searchInput?.search)
  const searchQuery=URLsearch.getAll("q")
  const[search,setSearch]=useState(searchQuery)


  // console.log("user header", user);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch=(e)=>{
    const {value}=e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)

    }
    else{
      navigate("/search")
    }

  }
  



  return (
    <header className=" h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full bg-white container mx-auto flex items-center justify-between px-4">
        <Link to={"/"}>
          {/* <Logo w={90} h={50} /> */}
          <img src={logoimage} alt=""  className="h-20 w-auto max-w-[180px] object-contain cursor-pointer"/>
        </Link>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search Product here..."
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
        <div className="text-lg min-w-[50px] bg-gradient-to-r from-[#3F51B5] to-[#9C27B0] h-8 flex items-center justify-center rounded-r-full text-white">
  <FaSearch />
</div>
        </div>
        <div className="flex items-center gap-7">
          <div className="relative group flex justify-center ">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => {
                  setMenuDisplay((preve) => !preve);
                }}
              >
                {user?.ProfilePic ? (
                  <img
                    src={user?.ProfilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute  group-hover:block bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded ">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className=" whitespace-nowrap  block  p-2 hover:bg-slate-100"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      Admin-Panel
                    </Link>
                  )}

                  <Link to={'/order'}  className=" whitespace-nowrap  block  p-2 hover:bg-slate-100"  onClick={() => setMenuDisplay((preve) => !preve)}>
                  Order

                  </Link>

                  
                </nav>
              </div>
            )}
          </div>
         
            {
              user?._id && (
                <Link to={"/cart"} className="text-2xl relative">
                <span><FaCartShopping/></span>
                <div className="bg-red-600 text-white w-5 p-1 flex items-center justify-center h-5 rounded-full absolute -top-2 -right-3">
              <p className="text-sm">
                {context?.cartProductCount}
              </p>
            </div>
            </Link>

              )
            }

           
          

          <div>
            {user?._id ? (
              <button
  onClick={handleLogout}
  className="px-3 py-1 rounded-full text-white bg-gradient-to-r from-[#3F51B5] to-[#9C27B0] hover:from-[#9C27B0] hover:to-[#3F51B5]"
>

                Logout
              </button>
            ) : (
              <Link
  to={"/login"}
  className="px-3 py-1 rounded-full text-white bg-gradient-to-r from-[#3F51B5] to-[#9C27B0] hover:from-[#9C27B0] hover:to-[#3F51B5]"
>
  Login
</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
