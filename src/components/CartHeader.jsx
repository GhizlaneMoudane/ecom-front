import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../Context/CartContext';

const CartHeader = () => {
  const [isWishlistMode, setIsWishlistMode] = useState(false);
  const { count } = useCart();

  return (
    <div className="flex justify-between items-center p-4 mb-8">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center">
        <ShoppingCart className="mr-3 h-8 w-8 text-orange-500" />
        Your Cart
        <span className="ml-3 text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
          {count} Items
        </span>
      </h1>
      <div className="flex space-x-4">
        <button 
          onClick={() => setIsWishlistMode(false)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            !isWishlistMode 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Cart
        </button>
        <button 
          onClick={() => setIsWishlistMode(true)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            isWishlistMode 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Wishlist
        </button>
      </div>
    </div>
  );
};

export default CartHeader;