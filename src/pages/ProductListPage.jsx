// AdvancedProductsPage.jsx
'use client'

import { useState } from 'react';
import { ProductGrid } from '../components/ProductGrid';
import { FilterSidebar } from '../components/FilterSidebar';
import { MobileFilters } from '../components/MobileFilters';
import { SearchHeader } from '../components/SearchHeader';
import Header from "../components/Header";
import Footer from "../components/Footer";

// Sample data for sort options, sub-categories, filters, and products
const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
];

const subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },
];

const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
];

const products = [
  {
    id: 1,
    name: 'Wireless Earbuds',
    price: 29.99,
    image: 'https://via.placeholder.com/600x400?text=Wireless+Earbuds',
  },
  {
    id: 2,
    name: 'Stylish T-Shirt',
    price: 19.99,
    image: 'https://via.placeholder.com/600x400?text=Stylish+T-Shirt',
  },
  {
    id: 3,
    name: 'Coffee Maker',
    price: 49.99,
    image: 'https://via.placeholder.com/600x400?text=Coffee+Maker',
  },
  {
    id: 4,
    name: 'Makeup Kit',
    price: 39.99,
    image: 'https://via.placeholder.com/600x400?text=Makeup+Kit',
  },
  {
    id: 5,
    name: 'Action Figure',
    price: 14.99,
    image: 'https://via.placeholder.com/600x400?text=Action+Figure',
  },
];

export default function AdvancedProductsPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);

  return (
    <div className="bg-white">

      <MobileFilters
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
        subCategories={subCategories}
        filters={filters}
      />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SearchHeader setMobileFiltersOpen={setMobileFiltersOpen} sortOptions={sortOptions} />
        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <FilterSidebar subCategories={subCategories} filters={filters} />
            <div className="lg:col-span-3">
              <div className="mb-8">
              
              </div>
              <ProductGrid products={products} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
