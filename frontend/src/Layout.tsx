import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="mx-auto w-full max-w-[1100px] h-full">
          <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
