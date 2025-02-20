import React from 'react';
import { useCart } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const { totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold">Free</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-semibold">$0.00</span>
        </div>
        <hr className="border-gray-200" />
        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
      <button 
        onClick={handleCheckout}
        className="w-full mt-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;