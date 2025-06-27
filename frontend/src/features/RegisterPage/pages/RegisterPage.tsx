import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import bg_register from '@/assets/images/bg_login_register.png';
import { Users } from '@/shared/services/users';
import Cookies from 'js-cookie';

export function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
  });
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
        const newUser = await Users.signup(form) as Users;

        Cookies.set('register_user', JSON.stringify({
            id: newUser.id,
            name: newUser.name,
            avatar: newUser.avatar,
        }), { expires: 7 });

        navigate('/');
        window.location.reload();
    } catch (err: any) {
        console.error('Signup error:', err.response?.data || err);
        const msg = err.response?.data?.message
            || err.response?.data?.detail
            || 'Đăng ký thất bại';
        setError(Array.isArray(msg) ? msg.join(', ') : msg);
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center bg-white p-12 gap-6 rounded-2xl w-full max-w-[450px]"
        >
          <h1 className="text-3xl font-bold text-[#F09728]">Đăng ký</h1>
          <p className="text-sm">
            Bạn đã có tài khoản?{' '}
            <NavLink to="/auth/login" className="text-[#F09728] underline">
              Đăng nhập tại đây
            </NavLink>
          </p>

          
          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="name" className="font-semibold">Họ và tên</label>
            <input
              id="name" name="name" type="text" value={form.name}
              onChange={handleChange} required
              className="w-full rounded-xl p-2 border-2 outline-none focus:border-orange-300"
            />
          </div>

          
          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="email" className="font-semibold">Email</label>
            <input
              id="email" name="email" type="email" value={form.email}
              onChange={handleChange} required
              className="w-full rounded-xl p-2 border-2 outline-none focus:border-orange-300"
            />
          </div>

          
          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="password" className="font-semibold">Mật khẩu</label>
            <input
              id="password" name="password" type="password" value={form.password}
              onChange={handleChange} required
              className="w-full rounded-xl p-2 border-2 outline-none focus:border-orange-300"
            />
          </div>

          
          <div className="flex flex-col gap-1 text-sm">
            <label htmlFor="avatar" className="font-semibold">Avatar URL</label>
            <input
              id="avatar" name="avatar" type="text" value={form.avatar}
              onChange={handleChange} required
              placeholder="https://picsum.photos/200"
              className="w-full rounded-xl p-2 border-2 outline-none focus:border-orange-300"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white !bg-[#F09728] !rounded-xl hover:bg-orange-600 transition disabled:opacity-50"
          >
            {loading ? 'Đang xử lý...' : 'Đăng ký'}
          </button>
        </form>
      </div>
    </section>
  );
}