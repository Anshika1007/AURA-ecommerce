
import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import Login from './pages/Login';
import router from './routes';
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';


import { store } from './store/store'; // Adjust the path according to your file structure
import AdminPanel from './pages/AdminPanel';
import AllUsers from './pages/AllUsers';
import AllProducts from './pages/AllProducts';
import CategoryProduct from './pages/CategoryProduct';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import SearchProduct from './pages/SearchProduct';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import OrderPage from './pages/OrderPage';

function App() {
const dispatch =useDispatch()
const [cartProductCount,setCartProductCount] =useState(0)

  const fetchUserDetails = async () => {
    try {
      // Making a fetch request to the API endpoint
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: 'GET',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
          
        },
      });

    
      if (!dataResponse.ok) {
       
        throw new Error(`HTTP error! Status: ${dataResponse.status}`);
      }

      const dataApi = await dataResponse.json();

      if(dataApi.success){
dispatch(setUserDetails(dataApi.data))
      }

    
      return dataApi; 

    } catch (error) {
    
      
    }
  };

const fetchUserAddToCart=async()=>{
  const dataResponse=await fetch(SummaryApi.addToCartProductCount.url,{
    method:'GET',
    credentials:'include',
  })
  const dataApi=await dataResponse.json()
  // if(dataApi.success){
  //   dispatch(setUserDetails(dataApi.data))
  // }
  
  setCartProductCount(dataApi?.data?.count)
  
}

  // Using useEffect to fetch user details when the component mounts
  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart()
  }, []); // Empty dependency array means this runs once on component mount

  return (
    
    <Router>
    <div className="App">
    <Context.Provider value={{
       fetchUserDetails,//user details fetch
       cartProductCount,  //current user cart count 
       fetchUserAddToCart

    }}>
    <ToastContainer />
      <Header />
      <main className='min-h-[calc(100vh-120px)] pt-16'>
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="product-Category" element={<CategoryProduct/>} />
            <Route path="product/:id" element={<ProductDetails/>} />
            <Route path="cart" element={<Cart/>} />
            <Route path="success" element={<Success/>} />
            <Route path="cancel" element={<Cancel/>} />

            <Route path="search" element={<SearchProduct/>} />
            <Route path="order" element={<OrderPage/>} />
            <Route path="/admin-panel" element={<AdminPanel />}>
              {/* Nested routes under AdminPanel */}
              <Route path="all-users" element={<AllUsers />} />
              <Route path="all-products" element={<AllProducts />} />
              

            </Route>
            {/* Add more routes as needed */}
          </Routes>
        
      </main>
      <Footer />
      </Context.Provider>
     
    </div>
  </Router>
  );
}

export default App;
