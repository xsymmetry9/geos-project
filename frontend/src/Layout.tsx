import { Link, Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 grid grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="mx-auto w-full max-w-[1100px] h-full">
          <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const ProfileLayout = () =>{
  return (
    <div className="grid h-screen grid-rows-[70px_1fr_90px] grid-cols-1">
      {/* Header */}
      <Header />

      {/* Main section with Sidebar and Content */}
      <div className="grid grid-cols-[250px_1fr]">
        <aside className="bg-white border-r shadow-sm">
          <Sidebar />
        </aside>

        <main className="p-6 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

const LayoutForNonmember = () =>{
  return (
     <div className="grid h-screen grid-rows-[auto_90px] grid-cols-1 relative">
      <Link to="/admin" className="absolute top-2 right-2 z-100 block p-4 border-2 text-center text-black bg-white hover:bg-active hover:text-white">Admin</Link>
      <div className="relative mx-auto w-full bg-gray-100max-w-[1100px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  )

}

export {Layout, LayoutForNonmember, ProfileLayout};
