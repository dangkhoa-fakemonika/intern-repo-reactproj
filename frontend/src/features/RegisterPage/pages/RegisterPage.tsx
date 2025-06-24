import bg_register from "@/assets/images/bg_login_register.png"

export function RegisterPage() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex shadow-2xl rounded-3xl overflow-hidden max-w-[900px]">

        <img
          src={bg_register}
          alt="bg"
          className="hidden xl:block w-[450px] object-cover"
        />

        <div className="flex flex-col justify-center bg-white p-12 gap-6 rounded-2xl w-full max-w-[450px]">
          <h1 className="text-3xl font-bold text-[#F09728]">Đăng ký</h1>

          <p className="text-sm">
            Bạn đã có tài khoản?{" "}
            <a href="#" className="text-[#F09728] underline">
              Đăng nhập tại đây
            </a>
          </p>

          <div className="flex flex-col gap-1 text-sm">
            <label className="font-semibold">Họ và tên</label>
            <input
              type="text"
              className="w-[350px] rounded-xl p-2 border-2 outline-none focus:border-orange-300 focus:bg-slate-50"
            />
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              className="w-full rounded-xl p-2 border-2 outline-none focus:border-orange-300 focus:bg-slate-50"
            />
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <label className="font-semibold">Mật khẩu</label>
            <input
              type="password"
              className="w-full rounded-xl p-2 border-2 outline-none focus:border-orange-300 focus:bg-slate-50"
            />
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="text-xs">
                Ghi nhớ mật khẩu
              </label>
            </div>
          </div>

          
          <button className="w-full py-2 text-base font-medium text-white !rounded-xl !bg-[#F09728] hover:bg-orange-600 transition">
            Đăng ký
          </button>
        </div>
      </div>
    </section>
  )
}
