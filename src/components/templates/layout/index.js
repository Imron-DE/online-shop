import Footer from "@/components/organism/Footer";
import Navbar from "@/components/organism/Navbar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
