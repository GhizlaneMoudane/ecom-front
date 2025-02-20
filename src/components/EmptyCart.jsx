import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg">
      <ShoppingCart className="h-20 w-20 text-gray-300 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;