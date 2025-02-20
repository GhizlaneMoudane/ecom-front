import React, { useContext } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../Context/CartContext';

export function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-100">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button 
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-100"
        >
          <Heart className="h-5 w-5 text-gray-500 hover:text-red-500" />
        </button>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800 truncate max-w-[70%]">
            {product.name}
          </h3>
          <span className="text-xl font-bold text-orange-600">
            €{product.price.toFixed(2)}
          </span>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 group"
        >
          <ShoppingCart className="h-5 w-5 group-hover:animate-bounce" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}