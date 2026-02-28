import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  //   Login with Backend
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Store JWT token
      localStorage.setItem("token", data.token);

      alert("Login successful");
      navigate("/");

    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 mt-20">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h2 className="text-center text-xl font-semibold mb-6">
          Login to Bhoomi Store
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-3">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded font-medium hover:bg-green-700 transition"
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between text-sm mt-3">
          <span
            className="text-green-600 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            New User? Create Account
          </span>

          <span
            className="cursor-pointer text-gray-500"
            onClick={() => alert("Forgot password coming soon")}
          >
            Forgot Password?
          </span>
        </div>

        {/* Social Login (UI only) */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-400">
            Or Sign in using
          </span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <div className="flex gap-4 justify-center">
          <button className="border p-2 rounded w-12">
            <FcGoogle size={20} />
          </button>
          <button className="border p-2 rounded w-12 text-blue-600">
            <FaFacebookF size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;