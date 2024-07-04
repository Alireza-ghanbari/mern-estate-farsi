import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">پروفایل</h1>
      <form className="flex flex-col gap-4">
        <img src={currentUser.avatar} alt="profile" 
        className="rounded-full h-24 w-24 object-cover cursor-pointer self-center my-2 border border-slate-300"/>
        <input type="text" placeholder="ایمیل" id="username"
        className="border p-3 rounded-lg" />

        <input type="text" placeholder="نام کاربری" id="email"
        className="border p-3 rounded-lg" />

        <input type="text" placeholder="گذرواژه" id="password"
        className="border p-3 rounded-lg" />

        <button className="bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80">
          بروز رسانی
        </button>

      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">پاک کردن حساب</span>
        <span className="text-slate-700 cursor-pointer">خروج از حساب</span>
      </div>
    </div>
  );
}
