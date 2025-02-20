import React from "react";
import { Star, ShoppingCart, Heart, BadgePercent } from "lucide-react";

const Spotlight = () => {
  const brands = [
    { 
      name: "Luxe Beauty", 
      img: "https://placehold.co/400x400?text=Luxe+Beauty",
      products: 127,
      rating: 4.8
    },
    { 
      name: "Nature's Essentials", 
      img: "https://placehold.co/400x400?text=Nature's+Essentials",
      products: 93,
      rating: 4.6
    },
    { 
      name: "Urban Style", 
      img: "https://placehold.co/400x400?text=Urban+Style", 
      products: 218,
      rating: 4.9
    },
    { 
      name: "Home Harmony", 
      img: "https://placehold.co/400x400?text=Home+Harmony",
      products: 156,
      rating: 4.7
    },
  ];

  const products = [
    { 
      name: "Premium Face Serum", 
      price: 49.99,
      originalPrice: 69.99,
      rating: 4.9,
      reviews: 128,
      badge: "Bestseller",
      badgeColor: "bg-amber-500",
      img: "https://placehold.co/600x600?text=Premium+Serum" 
    },
    { 
      name: "Designer Handbag", 
      price: 129.00,
      originalPrice: 159.00,
      rating: 4.8,
      reviews: 73,
      badge: "New",
      badgeColor: "bg-emerald-500",
      img: "https://placehold.co/600x600?text=Designer+Bag" 
    },
    { 
      name: "Wireless Earbuds", 
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.7,
      reviews: 209,
      badge: "Limited",
      badgeColor: "bg-indigo-500",
      img: "https://placehold.co/600x600?text=Wireless+Earbuds" 
    },
    { 
      name: "Scented Candle Set", 
      price: 34.99,
      originalPrice: 44.99,
      rating: 4.5,
      reviews: 96,
      badge: "Sale",
      badgeColor: "bg-rose-500",
      img: "https://placehold.co/600x600?text=Candle+Set" 
    },
  ];

  // Function to display star rating
  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16}
            className={`${i < Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"} mr-1`} 
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Brands Spotlight */}
        <div className="mb-20">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Brands</h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Discover our curated selection of premium brands
              </p>
            </div>
            <button className="hidden md:flex items-center text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
              View all brands
              <svg className="w-5 h-5 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={brand.img}
                    alt={brand.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-gray-900 rounded-full px-6 py-2 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-4">
                    View Brand
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{brand.name}</h3>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <StarRating rating={brand.rating} />
                      <span className="ml-2 text-gray-600 text-sm">{brand.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">{brand.products} products</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Store of the Week */}
        <div>
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trending Now</h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Our most popular items this week
              </p>
            </div>
            <button className="hidden md:flex items-center text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
              View all products
              <svg className="w-5 h-5 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative h-64 overflow-hidden">
                  {/* Badge */}
                  <div className={`absolute top-3 left-3 z-10 ${product.badgeColor} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                    {product.badge}
                  </div>
                  
                  {/* Wishlist button */}
                  <button className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 backdrop-blur-sm transition-colors">
                    <Heart size={18} />
                  </button>
                  
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  
                  {/* Quick add */}
                  <div className="absolute -bottom-10 group-hover:bottom-4 left-0 right-0 mx-4 transition-all duration-300 ease-out">
                    <button className="flex items-center justify-center w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                      <ShoppingCart size={18} className="mr-2" />
                      Quick Add
                    </button>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <StarRating rating={product.rating} />
                    <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <>
                        <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice}</span>
                        <span className="ml-2 text-sm font-medium text-emerald-600">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Spotlight;