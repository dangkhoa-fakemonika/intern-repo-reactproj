import avatar_mac_dinh from "@/assets/images/avatar_mac_dinh.jpg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/shared/stores/store.ts";
import { axiosInstance } from "@/shared/services/services";
import { updateUser } from "@/shared/stores/states/user";

export function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.data);
  const access_token = useSelector((state: RootState) => state.user.access_token);
 useEffect(() => {
    if (!user && access_token) {
      axiosInstance
        .get('/auth/profile')
        .then(res => dispatch(updateUser(res.data)))
        .catch(err => console.error("Can't fetch user info", err));
    }
  }, [user, access_token, dispatch]);
  if (!user) {
    return <div>Loading...</div>;
  }
 return (
  <section className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm w-full justify-center items-center mx-auto my-10">
      <div className="bg-gray-50 h-28 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-md">
          <img
            src={user.avatar}
            alt={avatar_mac_dinh}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center ">
          {user.name}
        </h2>

        <div className="space-y-2 pt-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Email</span>
            <span className="text-gray-800">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Role</span>
            <span className="text-gray-800">{user.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Password</span>
            <span className="text-gray-800">{user.password}</span>
          </div>
        </div>

        
        <div className="pt-4">
          <button className="w-full py-2 text-white !bg-[#F09728] !rounded-lg transition">
            Edit Profile
          </button>
        </div>
      </div>
    </section>
  );
}
 
  