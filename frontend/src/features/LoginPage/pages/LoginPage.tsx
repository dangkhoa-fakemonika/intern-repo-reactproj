import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import bg_login from "@/assets/images/bg_login_register.png";
import { axiosInstance } from "@/shared/services/axios/axios.ts";


export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError(null);

    try {
      interface AuthResponse {
        access_token: string;
        refresh_token: string;
      }
      const response = await axiosInstance.post<AuthResponse>("auth/login", {
        email,
        password,
      });
      const { access_token, refresh_token } = response.data;

      document.cookie = `access_token=${access_token}; path=/`;
      if (remember) {
        const maxAge = 30 * 24 * 60 * 60; 
        document.cookie = `refresh_token=${refresh_token}; max-age=${maxAge}; path=/`;
      }
      navigate("/"); 
      
      window.location.reload();
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.");
      console.error("Lỗi đăng nhập:", err);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex shadow-2xl rounded-3xl overflow-hidden max-w-[900px]">
        <img
          src={bg_login}
          alt="bg"
          className="hidden xl:block w-[450px] object-cover"
        />
        <div className="flex flex-col justify-center bg-white p-12 gap-6 rounded-2xl w-full max-w-[450px]">
          <h1 className="text-3xl font-bold text-[#F09728]">Đăng nhập</h1>
          <p className="text-sm">
            Bạn chưa có tài khoản?{" "}
            <NavLink to="/auth/register" className="text-[#F09728] underline">
              Đăng ký tại đây
            </NavLink>
          </p>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 text-sm">
              <label className="font-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl p-2 border-2 outline-none focus:border-orange-300 focus:bg-slate-50"
                required
              />
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <label className="font-semibold">Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[350px] rounded-xl p-2 border-2 outline-none focus:border-orange-300 focus:bg-slate-50"
                required
              />
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="checkbox"
                  id="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-[#F09728]"
                />
                <label htmlFor="remember" className="text-xs">
                  Ghi nhớ mật khẩu
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 text-base font-medium text-white !rounded-xl !bg-[#F09728] hover:bg-orange-600 transition"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}