import ProductCard from '@/components/ui/ProductCard'


function PopularProducts() {

  return (
    <div className="w-full">
      <div data-aos="zoom-in" className="flex flex-row justify-between items-center mt-7 px-7 w-full">
        <h4 className="text-xl font-bold">
          Trending Now
        </h4>
      </div>
      <div className="flex flex-col space-y-4 mb-30">
        <div >
          <ProductCard limit={10} />
        </div>
      </div>
    </div>
  )
}

export default PopularProducts
 