
import promoPhone from '@/assets/images/phonepromotion.png'; 
import { useEffect, useState, useMemo } from 'react';

export default function BannerPromotion() {
 
    const deadline = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 10);
    return d;
  }, []);

  
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });


  useEffect(() => {
    const timerId = setInterval(() => {
      const now = new Date().getTime();
      const distance = deadline.getTime() - now;

      if (distance <= 0) {
        clearInterval(timerId);
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      
      const fmt = (n: number) => String(n).padStart(2, '0');

      setTimeLeft({
        days: fmt(days),
        hours: fmt(hours),
        minutes: fmt(minutes),
        seconds: fmt(seconds),
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [deadline]);


  return (  
    <div data-aos="zoom-in"  className="w-full bg-blue-50 rounded-lg overflow-hidden py-8 px-6 md:px-12 flex flex-col-reverse md:flex-row items-center justify-between gap-6 mb-30">
      
   
      <div className="flex-[2] text-center md:text-left">
        <span className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
          Giảm giá!
        </span>

        <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-800">
          Giảm giá sốc lên tới <span className="text-orange-500">20%</span>
        </h2>
        <p className="mt-2 text-2xl md:text-3xl text-gray-700">Khám phá ngay!!!</p>

     
        <div className="mt-8 mb-6 flex w-full justify-center gap-6">
          {['days','hours','minutes','seconds'].map((unit, i) => (
            <div key={i} className="bg-white shadow rounded-lg px-4 py-3">
              <div className="text-lg font-bold text-gray-800">
                {timeLeft[unit]}
              </div>
              <div className="text-xs text-gray-500 uppercase">
                {unit === 'days' ? 'Ngày'
                  : unit === 'hours' ? 'Giờ'
                  : unit === 'minutes' ? 'Phút'
                  : 'Giây'}
              </div>
            </div>
          ))}
        </div>

        <button className="mt-6 inline-block bg-gray-800 text-white font-semibold hover:scale-105 px-6 py-2 rounded hover:bg-gray-900 transition">
          Mua ngay
        </button>
      </div>


      <div className="flex-[1] flex justify-center md:justify-end ">
        <img
          src={promoPhone}
          alt="Điện thoại khuyến mãi"
          className="w-48 h-[500px] md:w-64 lg:w-80 object-contain "
        />
      </div>
    </div>
  );
}
