import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import "../index.css";

function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* This renders the current page content */}
    </>
  );
}

export default RootLayout;
