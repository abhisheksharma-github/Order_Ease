import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen m-2 md:m-0 items-center">
      {/* Navbar */}
      <header>
        <Navbar />
      </header>
      {/* Main Content */}
      <div className="flex-1 w-full flex justify-center">
        <Outlet />
      </div>
      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
