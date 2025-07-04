import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import bg_register from '@/assets/images/bg_login_register.png';
import { Users } from '@/shared/services/users';
import { useForm } from 'react-hook-form';
import { type RegisterForm, schema } from '@/features/RegisterPage/pages/common/type';
import {joiResolver} from '@hookform/resolvers/joi';

export function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: joiResolver(schema),
    defaultValues: { name:"", email: "", password: "", avatar:"", }
  });

  const onSubmit = async (data: RegisterForm) => {
    setError(null);
    setLoading(true);
    try {
      await Users.signup(data);
      navigate('/auth/login');
      window.location.reload();
    } catch (err) {
      setError("Đăng ký thất bại");
      console.error("Lỗi đăng ký:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-50">
      <div className="flex shadow-2xl rounded-3xl overflow-hidden w-full max-w-[900px] mx-auto">
        <img
          src={bg_register}
          alt="bg"
          className="hidden xl:block w-[450px] object-cover max-w-full"
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center bg-white p-10 gap-2 rounded-2xl w-full max-w-[450px]"
        >
          <h1 className="text-3xl font-bold text-[#F09728]">Register</h1>
          <p className="text-sm">
            Already have an account?{' '}
            <NavLink to="/auth/login" className="!text-[#F09728] !no-underline">
              Sign in here
            </NavLink>
          </p>

          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="name" className="font-semibold">Full name</label>
            <input
              id="name"
              {...register('name')}
              className="w-full rounded-xl p-2 border-2 outline-none focus:border-orange-300"
            />
            <div className="min-h-[0.5rem]">{errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}</div>
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="email" className="font-semibold">Email</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full rounded-xl p-2 border-2 outline-none focus:border-orange-300"
            />
            <div className="min-h-[0.5rem]">{errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}</div>
            
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="password" className="font-semibold">Password</label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className="w-full rounded-xl p-2 border-2 outline-none focus:border-orange-300"
            />
            <div className="min-h-[0.5rem]">{errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}</div>
            
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="avatar" className="font-semibold">Avatar URL</label>
            <input
              id="avatar"
              {...register('avatar')}
              placeholder="https://picsum.photos/200"
              className="w-full rounded-xl p-2 border-2 outline-none focus:border-orange-300"
            />
            <div className="min-h-[0.5rem]">{errors.avatar && <p className="text-red-500 text-xs">{errors.avatar.message}</p>}</div>
            
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white !bg-[#F09728] !rounded-xl hover:bg-orange-600 transition disabled:opacity-50"
          >
            {loading ? 'Đang xử lý...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
