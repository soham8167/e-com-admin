import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    referral: "",
    terms: false,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: "",
  });

  const [loading, setLoading] = useState(false);

  const validName = (name: string) => {
    const trimmedName = name.trim();
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(trimmedName)) return false;
    return trimmedName[0] === trimmedName[0].toUpperCase();
  };

  const validPassword = (password: string) => password.length >= 6;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    let newErrors = {
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: "",
    };

    let isValid = true;

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
      isValid = false;
    } else if (!validName(formData.firstName)) {
      newErrors.firstName = "First letter must be capital";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!validPassword(formData.password)) {
      newErrors.password = "Min 6 chars required";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!formData.terms) {
      newErrors.terms = "Please accept terms & conditions";
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Signup successful");
      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-20 mt-20">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 sm:p-10">
        <h2 className="text-center text-xl font-semibold">
          Create a new account
        </h2>

        <p className="text-center text-sm text-gray-500 mt-1">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-600 cursor-pointer"
          >
            Log in
          </span>
        </p>

        <form onSubmit={handleSignup}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="text-sm text-gray-600">First Name</label>
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded"
              />
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            </div>

            <div>
              <label className="text-sm text-gray-600">Last Name</label>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email ID</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded"
              />
              <p className="text-red-500 text-sm">{errors.email}</p>
            </div>

            <div>
              <label className="text-sm text-gray-600">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded"
              />
              <p className="text-red-500 text-sm">{errors.password}</p>
            </div>

            <div>
              <label className="text-sm text-gray-600">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded"
              />
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              name="terms"
              onChange={handleChange}
              className="w-4 h-4 accent-green-600"
            />
            <span className="text-sm">
              I accept the terms & conditions
            </span>
          </div>

          <p className="text-red-500 text-sm">{errors.terms}</p>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Creating Account..." : "SIGNUP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;