import React, { useState, useContext } from "react";
import loginIcons from "../assest/login.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showpassword, setshowpassword] = useState(false);

  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  // console.log('generalcontext',generalContext.fetchUserDetails());

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setdata((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.SignIn.url, {
      method: SummaryApi.SignIn.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataapi = await dataResponse.json();

    if (dataapi.success) {
      toast.success(dataapi.message);
      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart();
    }
    if (dataapi.error) {
      toast.error(dataapi.message);
    }
  };
  console.log("data login", data);

  return (
    <section id="login">
      <div className="mx-auto container px-4">
        <div className="bg-white  p-5  w-full max-w-sm mx-auto  ">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcons} alt="login icons" />
          </div>

          <form className="pt-6 flex flex-col gap-2 " onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email:</label>

              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label>Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showpassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={data.password}
                  name="password"
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl "
                  onClick={() => setshowpassword((preve) => !preve)}
                >
                  <span>{showpassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>

              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forgot Password ?
              </Link>
            </div>

            <button className="bg-gradient-to-r from-[#3F51B5] to-[#9C27B0] text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Login
            </button>
          </form>

          <p className="my-5">
            Don't have account ?
            <Link
              to={"/sign-up"}
              className="hover:text-red-800 text-blue-600 hover:underline "
            >
              Sign Up
            </Link>{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
