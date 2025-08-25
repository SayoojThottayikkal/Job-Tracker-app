import React, { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import image from "../assets/image.jpg";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const url = mode === "login" ? "/auth/login" : "/auth/signup";
      const { data } = await api.post(
        url,
        mode === "login" ? { email: form.email, password: form.password } : form
      );

      login(data.token, data.user);
      navigate("/jobs", { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.msg || err?.response?.data?.message || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex p-8">
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center flex justify-center items-center text-white font-bold text-5xl shadow-lg rounded-md"
        style={{ backgroundImage: `url(${image})` }}
      >
        JOB TRACKER
      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center  px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
            {mode === "login" ? "Login" : "Create account"}
          </h2>

          {error && (
            <div className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Name
                </label>
                <input
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <button
              className="w-full rounded-lg bg-blue-600 py-2 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading
                ? "Please wait…"
                : mode === "login"
                ? "Login"
                : "Sign up"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            {mode === "login" ? (
              <>
                New here?{" "}
                <button
                  type="button"
                  className="font-medium text-blue-600 hover:underline"
                  onClick={() => setMode("signup")}
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="font-medium text-blue-600 hover:underline"
                  onClick={() => setMode("login")}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
