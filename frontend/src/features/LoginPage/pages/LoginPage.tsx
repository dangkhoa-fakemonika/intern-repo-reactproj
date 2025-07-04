import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import bg_login from "@/assets/images/bg_login_register.png";
import { axiosInstance } from "@/shared/services/axios/axios.ts";
import { useForm } from "react-hook-form";
import { type LoginForm, schema} from "@/features/LoginPage/pages/common/type";
import {joiResolver} from '@hookform/resolvers/joi';

export function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: joiResolver(schema),
    defaultValues: { email: "", password: "", remember: false }
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();     

  const onSubmit = async (data: LoginForm) => {
    setError(null);

    try {
      interface AuthResponse {
        access_token: string;
        refresh_token: string;
      }

      const response = await axiosInstance.post<AuthResponse>("auth/login", {
        email: data.email,
        password: data.password
      });
      const { access_token, refresh_token } = response.data;
      document.cookie = `access_token=${access_token}; path=/`;
      if (data.remember) {
        const maxAge = 30 * 24 * 60 * 60;
        document.cookie = `refresh_token=${refresh_token}; max-age=${maxAge}; path=/`;
      }

      const profileRes = await axiosInstance.get("auth/profile", {
        headers: { Authorization: `Bearer ${access_token}` }
      }); 
      const user = profileRes.data;
      document.cookie = `current_user=${JSON.stringify(user)}; path=/`;

      navigate("/");
      window.location.reload();
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.");
      console.error("Lỗi đăng nhập:", err);
    }
  };

  return (
    <section className="w-full min-h-screen bg-gray-50 flex items-center">
      <div className="w-full max-w-[900px] mx-auto flex shadow-2xl rounded-3xl overflow-hidden">
        <img
          src={bg_login}
          alt="bg"
          className="hidden xl:block xl:w-[450px] object-cover"
        />
        <div className="flex-1 flex flex-col justify-center bg-white p-12 gap-2 rounded-2xl">
          <h1 className="text-3xl font-bold text-[#F09728]">Login</h1>
          <p className="text-sm">
            Don't have an account?{' '}
            <NavLink to="/auth/register" className="!text-[#F09728] !no-underline">
              Register here
            </NavLink>
          </p>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 text-sm">
              <label className="font-semibold">Email</label>
              <input
                type="email"
                {...register('email')}
                className="w-full rounded-xl p-2 border-2 outline-none focus:border-orange-300 focus:bg-slate-50"
              />
              <div className="min-h-[0.5rem]">{errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}</div>
              
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <label className="font-semibold">Password</label>
              <input
                type="password"
                {...register('password')}
                className="w-full rounded-xl p-2 border-2 outline-none focus:border-orange-300 focus:bg-slate-50"
              />
              <div className="min-h-[0.5rem]">{errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}</div>
              
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="checkbox"
                  {...register('remember')}
                  id="remember"
                  className="accent-[#F09728]"
                />
                <label htmlFor="remember" className="text-xs">
                  Remember me
                </label>
              </div>
            </div>
            <button
              type="submit"
              className=" py-2 text-base font-medium text-white !rounded-xl !bg-[#F09728] hover:bg-orange-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
