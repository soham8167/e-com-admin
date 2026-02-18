import { useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      await api.post("/admin/login", { email, password });
      nav("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow w-96"
      >
        <h2 className="text-2xl font-bold mb-6">Admin Login</h2>

        <input
          className="border w-full p-2 mb-3"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border w-full p-2 mb-4"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="bg-black text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
