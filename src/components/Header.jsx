import React from "react";
import HeaderTop from "./HeaderTop"; // your top section with logo, search, cart
import Navigation from "./Navigation";
import Footer from "./Footer";

const Header = () => {
  return (
    <header>
      <HeaderTop />
      <Navigation />
    </header>
  );
};

export default Header;
