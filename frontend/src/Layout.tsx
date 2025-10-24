// src/layouts/Layout.tsx
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Layout = () => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] overflow-hidden">
      <Header />
      <main className="h-full overflow-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
