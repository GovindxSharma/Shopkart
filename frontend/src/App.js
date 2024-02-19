import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/layout/Nav/Nav.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";
import Home from "./components/Home/Home.jsx";

//toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from "./components/Product/ProductDetails.jsx";
import Products from "./components/Product/Products.js";
import LoginSignUp from "./components/User/LoginSignUp/LoginSignUp.js";
import { useEffect, useState } from "react";
import store from "./redux/store";
import { loadUser } from "./redux/reducers/user/userReducer.js";
import Profile from "./components/User/Profile/Profile.jsx";
import ProtectedRoute from "./components/Route/ProtectedRoute.js";
import { useSelector } from "react-redux";
import axios from "axios";

import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import CartSlide from "./components/Carts/Cart.js";
import Shipping from "./components/Carts/Shipping.js";
import ConfirmOrder from "./components/Carts/ConfirmOrder.js";
import Payment from "./components/Carts/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Carts/OrderSuccess.js";
import MyOrders from "./components/Orders/MyOrder.js";
import OrderDetails from "./components/Orders/OrderDetails.js";

import Dashboard from "./components/Admin/Dashboard.js";
import ProductList from "./components/Admin/ProductList.js";
import NewProduct from "./components/Admin/NewProduct.js";
import UpdateProduct from "./components/Admin/UpdateProduct.js";
import OrderList from "./components/Admin/OrderList.js";
import ProcessOrder from "./components/Admin/ProcessOrder.js";
import UsersList from "./components/Admin/UserList.js";
import UpdateUser from "./components/Admin/UpdateUser.js";
// import ProductReviews from './components/Admin/ProductReview.js';
// import { API_URL } from './redux/BaseUrl.js';

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [stripApiKey, setStripeApiKey] = useState("");
  // console.log(stripApiKey)

  async function getStripeApiKey() {
    try {
      const response = await axios.get(`/api/v1/stripeapikey`);
      console.log(response.data.stripeApiKey, "stripeApiKey");
      setStripeApiKey(response.data.stripeApiKey);
    } catch (error) {
      console.error("Error fetching Stripe API key:", error);
      // Handle error if necessary
    }
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/cart" element={<CartSlide />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />

          {/* PROTECTED */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/account" element={<Profile />} />
            <Route path="/me/update" element={<UpdateProfile />} />
            <Route path="/password/update" element={<UpdatePassword />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />

            {stripApiKey && (
              <Route
                path="/process/payment"
                element={
                  <Elements stripe={loadStripe(stripApiKey)}>
                    <Payment />
                  </Elements>
                }
              />
            )}

            <Route path="/success" element={<OrderSuccess />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/order/:id" element={<OrderDetails />} />

            <Route
              path="/admin/dashboard"
              isAdmin={true}
              element={<Dashboard />}
            />
            <Route
              path="/admin/products"
              isAdmin={true}
              element={<ProductList />}
            />
            <Route
              path="/admin/product"
              isAdmin={true}
              element={<NewProduct />}
            />
            <Route
              path="/admin/product/:id"
              isAdmin={true}
              element={<UpdateProduct />}
            />

            <Route
              path="/admin/orders"
              isAdmin={true}
              element={<OrderList />}
            />
            <Route
              path="/admin/order/:id"
              isAdmin={true}
              element={<ProcessOrder />}
            />

            <Route path="/admin/users" isAdmin={true} element={<UsersList />} />
            <Route
              path="/admin/user/:id"
              isAdmin={true}
              element={<UpdateUser />}
            />

            {/* <Route path='/admin/reviews' isAdmin={true} element={<ProductReviews/>} /> */}
          </Route>
        </Routes>

        <Footer />

        <ToastContainer autoClose={3000} />
      </BrowserRouter>
      ;
    </>
  );
}

export default App;
