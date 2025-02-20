import React from 'react';
import { useCart } from '../Context/CartContext';

const CheckoutSummary = () => {
  const { items, totalPrice } = useCart();

  return (
    <div className="w-96">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 sticky top-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
          <span className="text-sm text-gray-500">{items.length} items</span>
        </div>

        {/* Items List */}
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="text-green-500 font-semibold">Free</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="font-semibold">${(totalPrice * 0.1).toFixed(2)}</span>
          </div>
          <hr className="border-gray-200" />
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>${(totalPrice * 1.1).toFixed(2)}</span>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Free delivery within 3-5 business days
          </div>
        </div>

        {/* Secure Checkout Badge */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure Checkout
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;