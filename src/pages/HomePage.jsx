import React from "react";
import HeroSlider from "../components/HeroSlider";
import Categories from "../components/Categories";
import Spotlight from "../components/Spotlight";
import { ArrowRight } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="bg-indigo-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-indigo-600 rounded-2xl overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12 lg:p-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Join Our Newsletter
              </h2>
              <p className="text-indigo-100 mb-8 text-lg">
                Subscribe to get exclusive offers, new arrivals, and insider-only discounts.
              </p>
              
              <form className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-colors w-full md:w-auto"
                >
                  Subscribe
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </form>
            </div>
            
            <div className="hidden md:block md:w-1/2 bg-indigo-800 relative">
              <div className="absolute inset-0 bg-[url('https://placehold.co/800x600?text=Newsletter+Image')] bg-cover bg-center opacity-50"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



const HomePage = () => {
  return (
    <>
      <HeroSlider />
      <Categories />
      <Spotlight />
      <Newsletter />
    </>
  );
};

export default HomePage;