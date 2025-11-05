// src/layouts/Layout.tsx
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="min-h-0 min-w-0 overflow-y-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
