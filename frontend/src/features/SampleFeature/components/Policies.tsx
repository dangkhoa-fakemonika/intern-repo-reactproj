
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
              Privacy
            </h4>
            <p className="text-sm text-gray-600">
              Protecting Your Privacy
            </p>
          </div>

          
          <div className="flex-1 flex flex-col items-center text-center px-4">
            <div className="p-4 bg-white rounded-full shadow-md mb-4">
              <img src={Payment} alt="Thanh toán đa dạng" className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Pay Your Way
            </h4>
            <p className="text-sm text-gray-600">
              Flexible Payment Options
            </p>
          </div>

          
          <div className="flex-1 flex flex-col items-center text-center px-4">
            <div className="p-4 bg-white rounded-full shadow-md mb-4">
              <img src={Deleivery} alt="Vận chuyển nhanh chóng" className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Fast & Reliable Shipping
            </h4>
            <p className="text-sm text-gray-600">
              Fast & Secure Delivery
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Policies