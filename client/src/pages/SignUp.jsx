import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-3 px-5 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-10 text-slate-700">
        ساخت حساب
      </h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          placeholder="نام کاربری"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          id="email"
          placeholder="ایمیل"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          id="password"
          placeholder="گذرواژه"
          className="border p-3 rounded-lg"
        />

        <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
          ساخت حساب
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>حساب دارید؟</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-800 hover:text-blue-700">وارد شوید</span>
        </Link>
      </div>
    </div>
  );
}
