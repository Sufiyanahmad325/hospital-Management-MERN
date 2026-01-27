import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPatient = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/hospital/auth/registerPatient",
        formData
      );

      alert(res.data.message);
      navigate("/");

    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-400 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-lg shadow-lg p-6">

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Patient Registration
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Age
            </label>
            <input
              name="age"
              placeholder="Enter age"
              value={formData.age}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone (Optional)
            </label>
            <input
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Address
            </label>
            <textarea
              name="address"
              placeholder="Enter full address"
              value={formData.address}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`sm:col-span-2 mt-4 py-2 rounded font-bold text-white
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }
            `}
          >
            {loading ? "Registering..." : "Register Patient"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default RegisterPatient;
