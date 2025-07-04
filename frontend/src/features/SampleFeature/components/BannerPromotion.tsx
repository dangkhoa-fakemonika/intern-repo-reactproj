import promoPhone from '@/assets/images/phonepromotion.png';
import {useEffect, useState, useMemo} from 'react';

type TimeUnit = 'days' | 'hours' | 'minutes' | 'seconds';

export default function BannerPromotion() {

  const deadline = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 10);
    return d;
  }, []);

  const [timeLeft, setTimeLeft] = useState<Record<TimeUnit, string>>({
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
        setTimeLeft({days: '00', hours: '00', minutes: '00', seconds: '00'});
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

  const units: TimeUnit[] = ['days', 'hours', 'minutes', 'seconds'];

  return (
    <div data-aos="zoom-in"
         className="w-full bg-blue-50 rounded-lg  overflow-hidden py-8 px-6 md:px-12 flex flex-col-reverse md:flex-row items-center justify-center gap-6 mb-30">

      <div className="flex-[2] flex flex-col items-center justify-center text-center">
        <span className="inline-block bg-orange-500   text-white px-4 py-1 rounded-[20px] text-xl font-medium">
          Sale Up!
        </span>

        <h2 className="mt-4 text-4xl md:text-5xl justify-center font-bold text-gray-800">
          Shocking discounts up to <span className="text-orange-500">20%</span>
        </h2>
        <p className="mt-2 text-2xl md:text-3xl items-center text-gray-700">Explore Now!!!</p>

        <div className="mt-8 mb-6 flex justify-center w-full gap-6">
          {units.map((unit, i) => (
            <div key={i} className="bg-white shadow rounded-lg px-4 py-3">
              <div className="text-lg font-bold text-gray-800">
                {timeLeft[unit]}
              </div>
              <div className="text-xs text-gray-500 uppercase">
                {unit === 'days' ? 'Day'
                  : unit === 'hours' ? 'Hour'
                    : unit === 'minutes' ? 'Minute'
                      : 'Second'}
              </div>
            </div>
          ))}
        </div>

        <button
          className="mt-6 inline-block bg-gray-800 text-white font-semibold hover:scale-105 px-6 py-2 rounded hover:bg-gray-900 transition"
          onClick={() => window.location.href = '/products'}>
          Buy Now
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