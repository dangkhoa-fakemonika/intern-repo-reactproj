function Footer() {
  return (
  <footer className=" text-gray-700 px-6 py-8">
      <div className="flex flex-col md:flex-row md:justify-center md:gap-x-8">
       
        <div className="flex-1">    
          <h3 className="text-lg font-bold" style={{ color: '#444444' }}>Address</h3>
           <ul className="space-y-2 text-1xl  pt-1 pl-0 font-bold">
            <li style={{  color:"#A4A4A4" }}>Ecommerce Web</li>
            <li style={{  color:"#A4A4A4" }}>123 Street No. 4 Ward 5 District 6</li>
            <li style={{ color:"#A4A4A4" }}>ThuDuc city</li>
            <li style={{  color:"#A4A4A4" }}>+84123456789</li>
            <li style={{  color:"#A4A4A4" }}>example@email.com</li>
          </ul>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold" style={{ color: '#444444' }}>Service Information</h3>
          <ul className="space-y-2 text-1xl  pt-1 pl-0 font-bold">
            <li style={{  color:"#A4A4A4" }}>Affiliated parties</li>
            <li style={{  color:"#A4A4A4" }}>Product information</li>
            <li style={{  color:"#A4A4A4" }}>Service</li>
          </ul>
        </div>
       
        <div className="flex-1">
          <h3 className="text-lg font-bold" style={{ color: '#444444' }}>CUSTOMER CARE</h3>
          <ul className="space-y-2 text-1xl  pt-1 pl-0 font-bold">
            <li style={{  color:"#A4A4A4" }}>Answer questions</li>
            <li style={{  color:"#A4A4A4" }}>Contact online</li>
            <li style={{  color:"#A4A4A4" }}>Terms & Conditions</li>
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold" style={{ color: '#444444' }}>About Us</h3>
          <ul className="space-y-2 text-1xl pt-1 pl-0 font-bold">
            <li style={{  color:"#A4A4A4" }}>Introduc</li>
            <li style={{  color:"#A4A4A4" }}>News</li>
            <li style={{  color:"#A4A4A4" }}>Contacts</li>
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