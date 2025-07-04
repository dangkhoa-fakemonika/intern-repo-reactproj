import ProductCard from "@/components/ui/ProductCard"

function ProductViewed() {
  return (
    <div className="w-full" >
    <div data-aos="zoom-in" className="flex flex-row justify-between items-center mt-7 px-7 w-full">
    <h4 className="text-xl font-bold">
        Sản phẩm đã xem
    </h4>
    <a href="" className="!text-[#F09728] !no-underline ">
        Xem tất cả sản phẩm
    </a>
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