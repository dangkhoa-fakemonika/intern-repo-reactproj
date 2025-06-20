import React from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import blog1 from '@/assets/images/blog1.jpg';
import blog2 from '@/assets/images/blog2.png';
import blog3 from '@/assets/images/blog3.jpg';

const BlogSection: React.FC = () => {
  const today1 = '15-06-2025';
  const today2 = '16-06-2025';
  const today3 = '17-06-2025';

  return (
    <section data-aos="zoom-in" className="px-6 py-8 mb-30">
      <h4 className="text-2xl font-bold text-gray-800 mb-8">
        Blog và sự kiện
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <a
          href="/blog/1"
          className="block bg-white rounded-xl border-2 !no-underline border-gray-200 overflow-hidden shadow-sm hover:border-orange-200 transition-all duration-200"
        >
          <div className="w-full h-48 overflow-hidden">
            <img
              src={blog1}
              alt="Blog 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-4 py-3">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <FaRegCalendarAlt className="mr-2" />
              <span>{today1}</span>
            </div>
            <h5 className="text-base !no-underline !text-gray-700 font-medium  truncate">
              Phụ kiện tốt cho trải nghiệm làm việc tuyệt vời
            </h5>
          </div>
        </a>

        <a
          href="/blog/2"
          className="block bg-white rounded-xl border-2 !no-underline border-gray-200 overflow-hidden shadow-sm hover:border-orange-200 transition-all duration-200"
        >
          <div className="w-full h-48 overflow-hidden">
            <img
              src={blog2}
              alt="Blog 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-4 py-3">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <FaRegCalendarAlt className="mr-2" />
              <span>{today2}</span>
            </div>
            <h5 className="text-base font-medium !no-underline !text-gray-700 truncate">
              Phụ kiện tốt cho trải nghiệm làm việc tuyệt vời
            </h5>
          </div>
        </a>

        <a
          href="/blog/3"
          className="block bg-white rounded-xl border-2 !no-underline border-gray-200 overflow-hidden shadow-sm hover:border-orange-200 transition-all duration-200"
        >
          <div className="w-full h-48 overflow-hidden">
            <img
              src={blog3}
              alt="Blog 3"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-4 py-3">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <FaRegCalendarAlt className="mr-2" />
              <span>{today3}</span>
            </div>
            <h5 className="text-base font-medium  !text-gray-700 truncate">
              Phụ kiện tốt cho trải nghiệm làm việc tuyệt vời
            </h5>
          </div>
        </a>
      </div>
    </section>
  );
};

export default BlogSection;
