import React from "react";
import Header from "../components/Header";
import HeroSlider from "../components/HeroSlider";
import Categories from "../components/Categories";
import Spotlight from "../components/Spotlight";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSlider />
      <Categories />
      <Spotlight />
      <Footer />
    </div>
  );
};

export default HomePage;
