import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Layout = () => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="mx-auto h-full w-full max-w-[1100px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
