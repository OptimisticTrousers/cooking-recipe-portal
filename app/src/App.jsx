import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Hero from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";

function App() {

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
