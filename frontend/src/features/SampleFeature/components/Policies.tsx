
import Deleivery from '@/assets/images/Deleivery.svg';
import Payment from '@/assets/images/Payment.svg';
import Personalize from '@/assets/images/Personalize.svg'
function Policies() {
  return (
    <section data-aos="zoom-in" className="py-12 px-4 bg-gray-50 w-full">
      <div>
        <div className="flex flex-col md:flex-row items-center justify-around space-y-8 md:space-y-0 md:space-x-6">      
          <div className="flex-1 flex flex-col items-center text-center px-4">
            <div className="p-4 bg-white rounded-full shadow-md mb-4">
              <img src={Personalize} alt="Quyền riêng tư" className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Quyền riêng tư
            </h4>
            <p className="text-sm text-gray-600">
              Bảo mật quyền riêng tư của khách hàng
            </p>
          </div>

          
          <div className="flex-1 flex flex-col items-center text-center px-4">
            <div className="p-4 bg-white rounded-full shadow-md mb-4">
              <img src={Payment} alt="Thanh toán đa dạng" className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Thanh toán đa dạng
            </h4>
            <p className="text-sm text-gray-600">
              Thanh toán an toàn với nhiều phương thức
            </p>
          </div>

          
          <div className="flex-1 flex flex-col items-center text-center px-4">
            <div className="p-4 bg-white rounded-full shadow-md mb-4">
              <img src={Deleivery} alt="Vận chuyển nhanh chóng" className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Vận chuyển nhanh chóng
            </h4>
            <p className="text-sm text-gray-600">
              Giao hàng nhanh, an toàn
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Policies