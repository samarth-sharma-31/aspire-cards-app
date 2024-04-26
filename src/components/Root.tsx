import Navbar from "./Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import useIsMobile from "../hooks/useIsMobile";
import MobileNavbar from "./Navbar/MobileNavbar";

// Outlet component renders the corresponding child components of the matched routes.

const Root = () => {
  const currentLocation = useLocation();
  return (
    <div id='main-root-container' className={`root-container`}>
      <Navbar />
      {
        currentLocation.pathname === "/" ? (
        <div className="ml-20 mt-20">
          This is home section (out of the current scope), Kindly move to cards section to view the app.
        </div>
        ) : <Outlet />
      }
    </div>
  );
};

export default Root;