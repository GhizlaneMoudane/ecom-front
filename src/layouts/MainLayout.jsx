import React from "react";
import { Outlet } from "react-router-dom";  // Make sure this is imported
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />  {/* This is critical - it renders the child routes */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;