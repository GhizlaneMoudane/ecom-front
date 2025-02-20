import React from 'react';
import { Trash2, Heart, Minus, Plus } from 'lucide-react';
import { useCart } from '../Context/CartContext';

const CartItem = ({ item }) => {
  const { removeProduct, updateQuantity } = useCart();

  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      updateQuantity(item.id, item.quantity + 1);
    } else if (action === 'decrease' && item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4 hover:shadow-md transition-all duration-300">
      <div className="flex items-center space-x-4">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-20 h-20 object-cover rounded-md"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{item.name}</h3>
          <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center border rounded-full">
          <button 
            onClick={() => handleQuantityChange('decrease')}
            className="p-2 hover:bg-gray-100 rounded-l-full"
          >
            <Minus className="h-4 w-4 text-gray-600" />
          </button>
          <span className="px-4 text-gray-700">{item.quantity}</span>
          <button 
            onClick={() => handleQuantityChange('increase')}
            className="p-2 hover:bg-gray-100 rounded-r-full"
          >
            <Plus className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={() => removeProduct(item.id)}
            className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </button>
          <button 
            className="text-pink-500 hover:bg-pink-50 p-2 rounded-full transition-colors"
          >
            <Heart className="h-5 w-5" />
          </button>
        </div>

        <span className="font-bold text-gray-800">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;