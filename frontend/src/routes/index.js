import{BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App'
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import SearchProduct from '../pages/SearchProduct';
import Success from '../pages/Success';
import Cancel from '../pages/Cancel';
import OrderPage from '../pages/OrderPage';
const router = () => {
    return (
      <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="product-Category" element={<CategoryProduct/>} />
          <Route path="product/:id" element={<ProductDetails/>} />
          <Route path="cart" element={<Cart/>} />
          <Route path="success" element={<Success/>} />
          <Route path="cancel" element={<Cancel/>} />

          <Route path="search" element={<SearchProduct/>} />
          <Route path="order" element={<OrderPage/>} />




          {/* AdminPanel Route with Nested Routes */}
          <Route path="admin-panel" element={<AdminPanel />}>
            <Route path="all-users" element={<AllUsers />} />
            <Route path="all-products" element={<AllProducts />} />
          </Route>
        </Route>
      </Routes>
    </Router>
    );
 }

 
export default router;