import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const userApi =
    "https://script.google.com/macros/s/AKfycbyRQHXGnTILzy4YLfYj5tVFrnSWHeNQ4Wppv-CWsexDcvaK9ONrwh84kEBOy_tZ3R_zcw/exec";
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Logging in...");

    try {
      const response = await fetch(userApi + "?action=read");
      const result = await response.json();

      const email = form.email;
      const password = form.password;

      let found = false;
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i][5] == email && result.data[i][2] == password) {
          found = true;
          localStorage.setItem("user", JSON.stringify(result.data[i]));
          toast.success("Login successful!", { id: toastId });
          setTimeout(() => navigate("/home"), 1200);
          break;
        }
      }
      if (!found) {
        toast.error("Invalid email or password.", { id: toastId });
      }
    } catch (error) {
      toast.error("Error connecting to server.", { id: toastId });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
                disabled={loading}
                className={`w-full bg-pink-500 text-white py-3 rounded-lg font-semibold transition duration-300 flex items-center justify-center ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-pink-600"}`}
            >
                {loading ? (
                <>
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-pink-500 hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
