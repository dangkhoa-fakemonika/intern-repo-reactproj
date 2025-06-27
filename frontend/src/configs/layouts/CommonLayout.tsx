import NavBar from "@/components/ui/NavBar.tsx";
import Footer from "@/components/ui/Footer.tsx";
import {Outlet} from "react-router-dom";

export function CommonLayout() {
  return (
    <div className={"w-screen overflow-hidden"}>
      <div className="flex flex-col min-h-screen">
        <div className="relative z-20">
          <NavBar/>
        </div>
        <div className="flex flex-col">
          {/*<Home/>*/}
          <Outlet/>
        </div>
        <div className="relative z-20">
          <Footer/>
        </div>
      </div>
    </div>
  )
}
