import ProductCard from "@/components/ui/ProductCard"
import { NavLink } from "react-router-dom"

function ProductViewed() {
  return (
    <div className="w-full" >
    <div data-aos="zoom-in" className="flex flex-row justify-between items-center mt-7 px-7 w-full">
    <h4 className="text-xl font-bold">
        Products viewed
    </h4>
    <NavLink  className="!text-[#F09728] !no-underline " to={"/products"} >
        View all
    </NavLink>
</div>  
    <div className="flex justify-center py-4 mr-1 mb-30">
        <div>
        <ProductCard limit={5}/>
        </div> 
    </div>
    </div>
  )
}

export default ProductViewed