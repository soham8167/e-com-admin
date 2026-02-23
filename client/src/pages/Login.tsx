

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // Email login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // OTP login
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [showOtpInput, setShowOtpInput] = useState(false);


  // Email login handler
  const handleLogin = (e: React.FormEvent) => {
  
    
    e.preventDefault();

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("No user found. Please create an account.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (email === user.email && password === user.password) {
      alert("Login successful");
      navigate("/mywallet");
    } else {
      alert("Incorrect email or password");
    }
  };

  // Send OTP
  const handleSendOtp = () => {
  // check only numbers
  if (!/^\d+$/.test(mobile)) {
    alert("Mobile number must contain only digits");
    return;
  }

  if (mobile.length !== 10) {
    alert("Enter valid 10-digit mobile number");
    return;
  }

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  setGeneratedOtp(otpCode);
  setShowOtpInput(true);

  alert(`Your OTP is ${otpCode}`);
};


  // Verify OTP
  const handleOtpLogin = () => {
    if (otp === generatedOtp) {
      alert("Login successful using OTP");
      navigate("/");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 mt-29">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h2 className="text-center text-xl font-semibold mb-6">
          Login to Bhoomi Store
        </h2>

        {/* EMAIL LOGIN */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-3">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded font-medium"
          >
            LOGIN
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

        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-400">
            Or Login using OTP
          </span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* OTP LOGIN */}
        <div className="space-y-3">
          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />

          {!showOtpInput && (
            <button
              onClick={handleSendOtp}
              className="w-full border border-green-600 text-green-600 py-2 rounded"
            >
              Send OTP
            </button>
          )}

          {showOtpInput && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />

              <button
                onClick={handleOtpLogin}
                className="w-full bg-green-600 text-white py-2 rounded"
              >
                Verify OTP
              </button>
            </>
          )}
        </div>

          {/* login facebook or google */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-400">
            Or Signing using
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
