import Banner from "@/components/ui/Banner.tsx"
import CategoryTrending from "@/features/SampleFeature/components/CategoryTreding.tsx"
import AOS from "aos"
import React from "react";
import "aos/dist/aos.css";
import ProductViewed from "./components/ProductViewed.tsx";
import BannerPromotion from "./components/BannerPromotion.tsx";
import PopularProducts from "./components/PopularProducts.tsx";
import Blog from "./components/Blog.tsx";
import Policies from "./components/Policies.tsx";

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
