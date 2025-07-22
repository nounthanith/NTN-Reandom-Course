import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import NoProfile from './../../assets/Imgs/NoProfile.jpg'

function Register() {
  const userApi =
    "https://script.google.com/macros/s/AKfycbyRQHXGnTILzy4YLfYj5tVFrnSWHeNQ4Wppv-CWsexDcvaK9ONrwh84kEBOy_tZ3R_zcw/exec";
  const [form, setForm] = useState({
    name: "",
    password: "",
    avatar: "https://media.istockphoto.com/id/1208175274/vector/avatar-vector-icon-simple-element-illustrationavatar-vector-icon-material-concept-vector.jpg?s=612x612&w=0&k=20&c=t4aK_TKnYaGQcPAC5Zyh46qqAtuoPcb-mjtQax3_9Xc=",
    phone: "",
    email: "",
    mejor: "None",
    created_at: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function register(e) {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Registering...");

    // Generate a random ID for each registration
    const randomId = Math.floor(Math.random() * 1000 + 1);

    const params = new URLSearchParams({
      action: "insert",
      ...form,
      id: randomId,
      created_at: new Date().toISOString(),
    });

    try {
      const response = await fetch(userApi, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      const result = await response.json();
      if (result.status === "success") {
        toast.success("Registration successful!", { id: toastId });
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error("Registration failed!", { id: toastId });
      }
    } catch (error) {
      toast.error("Error connecting to server.", { id: toastId });
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Toaster position="top-center" />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>
        <form onSubmit={register} className="space-y-4">
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            className={`w-full bg-pink-500 text-white py-3 rounded-lg font-semibold transition duration-300 flex items-center justify-center ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-pink-600"
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-pink-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
