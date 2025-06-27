// src/pages/RegisterPage.tsx
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import bg_register from "@/assets/images/bg_login_register.png";
import { Users } from "@/shared/services/users";

export function RegisterPage() {
  const navigate = useNavigate();

  // 1. State để lưu giá trị input và lỗi/loading
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 2. onChange cập nhật state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 3. onSubmit gọi API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await Users.signup({
        name: form.name,
        email: form.email,
        password: form.password,
        avatar: form.avatar, 
      });
      // nếu muốn auto-login, tiếp tục gọi Users.login(...)
      navigate("/"); // chuyển hướng sau khi đăng ký
    } catch (err: any) {
      console.error("Signup error:", err.response?.data || err);
      setError(
        err.response?.data?.message ||
        err.response?.data?.detail ||
        "Đăng ký thất bại"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex shadow-2xl rounded-3xl overflow-hidden max-w-[900px]">
        <img
          src={bg_register}
          alt="bg"
          className="hidden xl:block w-[450px] object-cover"
        />

        {/* 4. Dùng <form> và gắn handleSubmit */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center bg-white p-12 gap-6 rounded-2xl w-full max-w-[450px]"
        >
          <h1 className="text-3xl font-bold text-[#F09728]">Đăng ký</h1>
          <p className="text-sm">
            Bạn đã có tài khoản?{" "}
            <NavLink to="/auth/login" className="text-[#F09728] underline">
              Đăng nhập tại đây
            </NavLink>
          </p>

          {/* Họ và tên */}
          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="name" className="font-semibold">
              Họ và tên
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl p-2 border-2 outline-none focus:border-orange-300 focus:bg-slate-50"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl p-2 border-2 outline-none focus:border-orange-300 focus:bg-slate-50"
            />
          </div>

          {/* Mật khẩu */}
          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="password" className="font-semibold">
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-xl p-2 border-2 outline-none focus:border-orange-300 focus:bg-slate-50"
            />
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="avatar" className="font-semibold">Avatar URL</label>
            <input
              id="avatar"
              name="avatar"
              type="text"
              value={form.avatar}
              onChange={handleChange}
              placeholder="https://example.com/your-avatar.jpg"
              required                                // nếu thật sự muốn bắt buộc
              className="w-full rounded-xl p-2 border-2 outline-none focus:border-orange-300 focus:bg-slate-50"
            />
          </div>
          {/* Hiển thị lỗi nếu có */}
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          {/* Nút submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-base font-medium text-white !rounded-xl !bg-[#F09728] hover:bg-orange-600 transition"
          >
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>
      </div>
    </section>
  );
}
