import React from 'react';
import CartHeader from '../components/CartHeader';
import CartItemList from '../components/CartItemList';
import OrderSummary from '../components/OrderSummary';
import EmptyCart from '../components/EmptyCart';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from '../Context/CartContext';

const CartPage = () => {
  const { items } = useCart();

  return (<div>
    <Header />

    <div className="container  px-4 py-8 ">

      <CartHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.length === 0 ? <EmptyCart /> : <CartItemList />}
        </div>
        
        <OrderSummary />
      </div>
      <Footer />

    </div>
    </div>
  );
};

export default CartPage;