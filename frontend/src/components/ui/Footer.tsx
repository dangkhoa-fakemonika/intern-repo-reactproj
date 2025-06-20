function Footer() {
  return (
  <footer className=" text-gray-700 px-6 py-8">
      <div className="flex flex-col md:flex-row gap-8">
       
        <div className="flex-1">    
          <h3 className="text-lg font-bold" style={{ color: '#444444' }}>LIÊN HỆ</h3>
           <ul className="space-y-2 text-sm pl-0 font-bold">
            <li style={{ marginLeft: '-30px', color:"#A4A4A4" }}>Ecommerce Web</li>
            <li style={{ marginLeft: '-30px', color:"#A4A4A4" }}>123 Đường số 4 Phường 5 Quận 6</li>
            <li style={{ marginLeft: '-30px', color:"#A4A4A4" }}>Thành Phố Thủ Đức</li>
            <li style={{ marginLeft: '-30px', color:"#A4A4A4" }}>+84123456789</li>
            <li style={{ marginLeft: '-30px', color:"#A4A4A4" }}>example@email.com</li>
          </ul>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold" style={{ color: '#444444' }}>THÔNG TIN DỊCH VỤ</h3>
          <ul className="space-y-2 text-sm pl-0 font-bold">
            <li style={{ marginLeft: '-30px', color:"#A4A4A4" }}>Các bên liên kết</li>
            <li style={{ marginLeft: '-30px', color:"#A4A4A4" }}>Thông tin sản phẩm</li>
            <li style={{ marginLeft: '-30px', color:"#A4A4A4" }}>Các bên liên kết</li>
          </ul>
        </div>
       
        <div className="flex-1">
          <h3 className="text-lg font-bold" style={{ color: '#444444' }}>CHĂM SÓC KHÁCH HÀNG</h3>
          <ul className="space-y-2 text-sm pl-0 font-bold">
            <li style={{ marginLeft: '-30px', color:"#A4A4A4" }}>Giải đáp thắc mắc</li>
            <li style={{ marginLeft: '-30px', color:"#A4A4A4" }}>Liên hệ trực tuyến</li>
            <li style={{ marginLeft: '-30px', color:"#A4A4A4" }}>Điều khoản & Quy định</li>
          </ul>
        </div>
      </div>
      
      <div className="text-xs text-center mt-8 font-bold" style={{ color: '#A4A4A4' }}>
        Internship Project HPT @2025
      </div>
    </footer>
  )
}

export default Footer