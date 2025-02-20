import React, { useState, useRef } from 'react';

const Navigation = () => {
  // Navigation categories data
  const categories = [
    {
      id: 'new-in',
      name: 'New In',
      path: '/c/health-beauty/new',
      hasDropdown: true,
      dropdownItems: ['New Arrivals', 'Trending Now', 'Just Landed'],
    },
    {
      id: 'brands',
      name: 'Brands',
      path: '/c/brands',
      hasDropdown: true,
      brandItems: [
        { id: 'aesop', name: 'Aesop', path: '/c/brands/aesop' },
        { id: 'clinique', name: 'Clinique', path: '/c/brands/clinique' },
        { id: 'marc-jacobs', name: 'Marc Jacobs', path: '/c/brands/marc-jacobs' },
        { id: 'kylie', name: 'Kylie Cosmetics', path: '/c/brands/kylie-cosmetics' },
        { id: 'gucci', name: 'Gucci', path: '/c/brands/gucci' },
      ],
    },
    { id: 'offers', name: 'Offers', path: '/c/offers' },
    { id: 'makeup', name: 'Makeup', path: '/c/health-beauty/make-up' },
    { id: 'skincare', name: 'Skincare', path: '/c/health-beauty/face' },
    { id: 'hair', name: 'Hair', path: '/c/health-beauty/hair' },
    { id: 'body', name: 'Body', path: '/c/health-beauty/body' },
    { id: 'fragrance', name: 'Fragrance', path: '/c/health-beauty/fragrance' },
    { id: 'blog', name: 'Blog', path: '/blog' },
  ];

  // State for active dropdown
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);

  // Handle mouse enter for dropdown
  const handleMouseEnter = (categoryId) => {
    setActiveDropdown(categoryId);
  };

  // Handle mouse leave to hide dropdown
  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav
      ref={navRef}
      className="hidden lg:flex justify-center border-b bg-[#fff7f3]"
    >
      <ul className="flex space-x-6">
        {categories.map((category) => (
          <li
            key={category.id}
            className="relative"
            onMouseEnter={() => category.hasDropdown && handleMouseEnter(category.id)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Main navigation link */}
            <a
              href={category.path}
              className="px-4 py-3 inline-block text-sm tracking-widest hover:text-orange-500 transition-colors"
            >
              {category.name}
            </a>

            {/* New In Dropdown */}
            {category.id === 'new-in' && activeDropdown === 'new-in' && (
              <div className="absolute top-full left-0 bg-white shadow-lg z-50 min-w-[200px] w-auto">
                <ul className="py-2">
                  {category.dropdownItems.map((item, index) => (
                    <li key={index}>
                      <a 
                        href="#" 
                        className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-orange-500"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Brands Dropdown */}
            {category.id === 'brands' && activeDropdown === 'brands' && (
              <div className="absolute top-full left-0 bg-white shadow-lg z-50 w-[500px]">
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-3">
                    {category.brandItems.map((brand) => (
                      <a
                        key={brand.id}
                        href={brand.path}
                        className="text-sm hover:text-orange-500 transition-colors py-1"
                      >
                        {brand.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;