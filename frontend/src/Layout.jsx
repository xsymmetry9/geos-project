import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Layout = () => {
  return (
    <div className="grid h-screen grid-rows-[70px_auto_90px] grid-cols-1">
      <Header />
      <div className="relative mx-auto w-full bg-gray-100max-w-[1100px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

const LayoutForNonmember = () =>{
  return (
     <div className="grid h-screen grid-rows-[auto_90px] grid-cols-1">
      <div className="relative mx-auto w-full bg-gray-100max-w-[1100px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  )

}

export {Layout, LayoutForNonmember};
