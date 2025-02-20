import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import ProductListPage from "./pages/ProductListPage.jsx";
import CheckoutPage from "./pages/CheckOutPage.jsx";
import {CartProvider} from "./Context/CartContext.jsx";
import SellerLayout from '../src/layouts/SellerLayout.jsx';
import MainLayout from '../src/layouts/MainLayout.jsx';
import SellerDashboard from './pages/seller/SellerDashboard';
import SellerProducts from './pages/seller/SellerProducts';
import SellerProfile from './pages/seller/SellerProfile';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Main Layout Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/products/prod1" element={<ProductPage />} />
            <Route path="/signup" element={<SignUpPage />}/>
            <Route path="/search" element={<ProductListPage />}/>
            <Route path="/cart" element={<CartPage />}/>
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
          
          {/* Seller Layout Routes */}
          <Route path="/seller" element={<SellerLayout />}>
            <Route index element={<SellerDashboard />} />
            <Route path="products" element={<SellerProducts />} />
            <Route path="profile" element={<SellerProfile />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;