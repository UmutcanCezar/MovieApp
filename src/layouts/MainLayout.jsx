import React from "react";
import { NavLink, Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
