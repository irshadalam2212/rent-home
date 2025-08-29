import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";

function App() {
  const location = useLocation();

  // hide navbar on login/signup routes
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="relative">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
      {!hideNavbar && <Navbar />}
      <div className="w-11/12 mx-auto pb-3 mt-8">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default App;
