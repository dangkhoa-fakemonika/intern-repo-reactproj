import Banner from "@/components/ui/Banner"
import CategoryTrending from "@/features/SampleFeature/components/CategoryTreding"
import AOS from "aos"
import React from "react";
import "aos/dist/aos.css";
import ProductViewed from "../components/ProductViewed";
import BannerPromotion from "../components/BannerPromotion";
import PopularProducts from "../components/PopularProducts";
import Blog from "../components/Blog";
import Policies from "../components/Policies";

export function Home() {
    React.useEffect(() => {
    AOS.init({
        offset:100,
        duration:800,
        easing:"ease-in-sine",
        delay:100,
    });
    AOS.refresh();
   }, []); 
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Banner/>
        <CategoryTrending/>
        <ProductViewed/>
        <BannerPromotion/>
        <PopularProducts/>
        <Blog/>
        <Policies/>
    </div>
    

  )
}

export default Home