import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.error) {
        setLoading(false);
        setError(data.error);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="p-3 px-5 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-10 text-slate-700">
        ورود به حساب
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          placeholder="نام کاربری"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="گذرواژه"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <button
          disabled={
            loading ||
            !formData.username ||
            !formData.password
          }
          className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80 flex items-center justify-center min-h-12"
        >
          {loading ? <PulseLoader size={10} /> : "ورود"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>حساب ندارید؟</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-800 hover:text-blue-700">ساخت حساب</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
