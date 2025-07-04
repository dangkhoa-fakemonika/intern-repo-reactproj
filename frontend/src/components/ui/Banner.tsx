import banner1 from '@/assets/images/Banner.png'

function Banner() {

  return (
  <div  className="relative min-h-[550px] sm:min-h-[450px] bg-gray-100 flex items-center justify-center overflow-hidden">
      <div className="container pb-8 sm:pb-0">
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col justify-center items-center text-center sm:items-start sm:text-left gap-4 pt-8 sm:pt-0 order-2 sm:order-1 w-full sm:pl-16">
                  <h1 data-aos="fade-up-right" className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#F09728]">
                    Thỏa sức mua sắm cả ngày
                  </h1>
                  <p data-aos="fade-up-right" className="text-base sm:text-1xl w-full max-w-full sm:max-w-xl lg:max-w-2xl mx-auto sm:mx-0">
                    Từ công nghệ đến thời trang, gia dụng đến làm đẹp - chất lượng đảm bảo, giao hàng siêu tốc, an toàn tuyệt đối.
                  </p>
                  <div>
                    <button data-aos="fade-up-right" className="bg-gradient-to-r from-[#F09728] to-[#F09728] text-white sm:text-2xl rounded-full px-4 py-2 font-bold hover:scale-105 duration-200 transition-all">
                      Mua ngay
                    </button>
                  </div>
                </div>
                <div className="order-1 sm:order-2">
                <div data-aos="fade-up-left" className="relative z-10">
                    <img
                    src={banner1}
                    alt="Banner"
                    className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] sm:scale-125 object-contain mx-auto"
                    />
                </div>
                </div>
            </div>
        </div>
      </div>

    </div>
  )
}

export default Banner
